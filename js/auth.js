/* Google sign-in (Supabase Auth, PKCE) and threaded comments. Dependency-free; talks to the Supabase
   REST endpoints with the public publishable key. Permissions are enforced by Row Level Security in
   the database; nothing here is a security boundary. Hidden entirely when js/auth-config.js is empty. */
(function () {
    'use strict';
    var SESSION_KEY = 'eyecode.auth.session.v1', PKCE_KEY = 'eyecode.auth.pkce.v1', POSTED_KEY = 'eyecode.comment.last.v1';
    var MAX_DEPTH = 3, MIN_POST_GAP_MS = 8000;
    var all = window.EYECODE_AUTH || {};
    var env = /^(?:preview\.|localhost$|127\.)/.test(location.hostname) ? 'preview' : 'production';
    var cfg = all[env] || {};
    var enabled = !!(cfg.url && cfg.key && /^(?:https:\/\/|http:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?:\/|$))/.test(cfg.url)); // http only for a local `supabase start`
    var base = enabled ? cfg.url.replace(/\/+$/, '') : '';
    // Local development preview (a development-only module that local builds add): only with empty config on localhost.
    var dev = !enabled && window.EYECODE_DEV_PREVIEW && /^(?:localhost|127\.0\.0\.1)$/.test(location.hostname) ? window.EYECODE_DEV_PREVIEW : null;
    var state = { session: null, profile: null };
    var profileRequest = null, sessionRefresh = null, adminExpiryTimer;

    var lang = function () { return document.documentElement.lang === 'en' ? 'en' : 'vi'; };
    function el(tag, attrs, kids) {
        var n = document.createElement(tag);
        Object.keys(attrs || {}).forEach(function (k) { if (k === 'text') n.textContent = attrs[k]; else if (attrs[k] !== false && attrs[k] != null) n.setAttribute(k, attrs[k]); });
        (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
        return n;
    }
    function tx(vi, en, tag) { var n = el(tag || 'span', { 'data-vi': vi, 'data-en': en }); n.textContent = lang() === 'en' ? en : vi; return n; }
    function store(fn) { try { return fn(window.localStorage); } catch (_) { return null; } }

    // ---- pure helpers (also exercised by tests) ----
    function b64url(bytes) { var s = ''; for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
    function randomVerifier() { var a = new Uint8Array(48); crypto.getRandomValues(a); return b64url(a); }
    function challengeFor(verifier) { return crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)).then(function (d) { return b64url(new Uint8Array(d)); }); }
    function buildTree(rows) {
        var byId = {}, roots = [];
        rows.forEach(function (r) { byId[r.id] = { row: r, children: [] }; });
        rows.forEach(function (r) { var n = byId[r.id]; if (r.parent_id && byId[r.parent_id]) byId[r.parent_id].children.push(n); else roots.push(n); });
        function visible(n) { n.children = n.children.filter(visible); return n.row.status === 'visible' || n.children.length > 0; }
        return roots.filter(visible);
    }
    function errorMessage(code) {
        var map = {
            comment_rate_limit: ['Bạn đăng quá nhanh. Vui lòng thử lại sau ít phút.', 'You are posting too quickly. Please try again in a few minutes.'],
            comment_duplicate: ['Bình luận này đã được đăng.', 'You already posted this comment.'],
            comment_too_many_links: ['Bình luận chứa quá nhiều liên kết.', 'The comment contains too many links.'],
            comment_too_deep: ['Không thể trả lời thêm ở cấp này.', 'Replies cannot go deeper here.'],
            setup_missing: ['Hệ thống bình luận chưa sẵn sàng: cơ sở dữ liệu chưa được cập nhật.', 'Comments are not available yet: the database migration has not been applied.'],
            comment_invalid_parent: ['Không thể trả lời bình luận này.', 'This comment can no longer be replied to.']
        };
        return map[code] || ['Không thể thực hiện thao tác. Vui lòng thử lại.', 'The action could not be completed. Please try again.'];
    }
    // The database objects from supabase/migrations are missing: PostgREST answers 404 / PGRST205 / 42P01.
    function isSetupError(e, json) { var code = json && json.code || ''; return e.status === 404 || /^(?:PGRST20[0-9]|42P01)$/.test(code) || /schema cache|does not exist/i.test(e.message || ''); }
    window.EyeCodeAuth = { api: function (p, o) { return api(p, o); }, state: state, el: el, tx: tx, avatar: avatar, lang: lang, signIn: function () { return signIn(); }, signOut: function () { return signOut(); }, freshSession: function () { return freshSession(); }, ready: false, canShowAdmin: canShowAdmin, setProfile: function (patch) { if (state.profile) { var changed = Object.keys(patch).some(function (k) { return state.profile[k] !== patch[k]; }); Object.assign(state.profile, patch); renderHeader(); if (changed) document.dispatchEvent(new Event('eyecode-profile-change')); } }, hintFor: hintFor, isSetupError: isSetupError, buildTree: buildTree, b64url: b64url, errorMessage: errorMessage, enabled: enabled, devPreview: !!dev, environment: env };
    if (!enabled && !dev) return;

    // ---- session ----
    function loadSession() { if (dev) return dev.session(); var raw = store(function (s) { return s.getItem(SESSION_KEY); }); try { return raw ? JSON.parse(raw) : null; } catch (_) { return null; } }
    function saveSession(s) { state.session = s; if (dev) return; store(function (ls) { if (s) ls.setItem(SESSION_KEY, JSON.stringify(s)); else ls.removeItem(SESSION_KEY); }); }
    function toSession(j) { return { access_token: j.access_token, refresh_token: j.refresh_token, expires_at: Math.floor(Date.now() / 1000) + (j.expires_in || 3600), user: { id: j.user && j.user.id } }; }
    function api(path, opts) {
        opts = opts || {};
        if (dev) return dev.api(path, opts);
        var headers = { apikey: cfg.key, 'Content-Type': 'application/json' };
        var token = opts.token === undefined ? (state.session && state.session.access_token) : opts.token;
        headers.Authorization = 'Bearer ' + (token || cfg.key);
        if (opts.prefer) headers.Prefer = opts.prefer;
        return fetch(base + path, { method: opts.method || 'GET', headers: headers, body: opts.body ? JSON.stringify(opts.body) : undefined }).then(function (r) {
            return r.text().then(function (t) {
                var json = null; try { json = t ? JSON.parse(t) : null; } catch (_) { /* non-JSON body */ }
                if (!r.ok) { var e = new Error((json && (json.message || json.msg || json.error_description)) || ('HTTP ' + r.status)); e.status = r.status; e.setup = isSetupError(e, json); throw e; }
                return json;
            });
        });
    }
    function freshSession() {
        var s = state.session; if (!s) return Promise.resolve(null);
        if (s.expires_at - 60 > Date.now() / 1000) return Promise.resolve(s);
        if (sessionRefresh && sessionRefresh.session === s) return sessionRefresh.promise;
        var job = { session: s };
        job.promise = api('/auth/v1/token?grant_type=refresh_token', { method: 'POST', token: null, body: { refresh_token: s.refresh_token } })
            .then(function (j) { if (state.session === s) saveSession(toSession(j)); return state.session; })
            .catch(function () { if (state.session === s) { saveSession(null); state.profile = null; renderAll(); } return state.session; })
            .finally(function () { if (sessionRefresh === job) sessionRefresh = null; });
        sessionRefresh = job;
        return job.promise;
    }
    // ---- sign-in result: the callback may carry `?code=` (success) or `error=...` (query or hash) ----
    function readRedirectError() {
        var u = new URL(location.href), h = new URLSearchParams(u.hash.replace(/^#/, ''));
        var error = u.searchParams.get('error') || h.get('error');
        if (!error) return null;
        var info = { error: error, code: u.searchParams.get('error_code') || h.get('error_code') || '', description: u.searchParams.get('error_description') || h.get('error_description') || '' };
        ['error', 'error_code', 'error_description'].forEach(function (k) { u.searchParams.delete(k); });
        if (h.get('error')) u.hash = '';
        history.replaceState(history.state, '', u.pathname + (u.search || '') + u.hash);
        return info;
    }
    function hintFor(info) {
        var text = (info.description + ' ' + info.code + ' ' + info.error).toLowerCase();
        if (/database error saving new user/.test(text)) return ['Supabase không tạo được người dùng: kiểm tra trigger on_auth_user_created và bảng profiles (migration), xem Logs → Postgres.', 'Supabase could not create the user: check the on_auth_user_created trigger and the profiles table (migration); see Logs → Postgres.'];
        if (/unable to exchange external code|invalid_client|unauthorized_client/.test(text)) return ['Google từ chối mã trao đổi: kiểm tra Client ID / Client Secret của provider Google trong Supabase.', 'Google rejected the code exchange: check the Google provider Client ID / Client Secret in Supabase.'];
        if (/redirect_uri_mismatch/.test(text)) return ['Thêm https://<project>.supabase.co/auth/v1/callback vào Authorized redirect URIs của Google OAuth client.', 'Add https://<project>.supabase.co/auth/v1/callback to the Google OAuth client\'s Authorized redirect URIs.'];
        if (/access_denied/.test(text)) return ['Đăng nhập bị từ chối: nếu ứng dụng Google đang ở chế độ Testing, hãy thêm email của bạn vào Test users.', 'Sign-in was denied: if the Google app is in Testing mode, add your email under Test users.'];
        if (/flow_state|bad_oauth_callback|code verifier|pkce/.test(text)) return ['Phiên đăng nhập (PKCE) không còn: hãy đăng nhập lại trên cùng một địa chỉ (ví dụ http://localhost:8000).', 'The PKCE sign-in state was lost: sign in again from the same address (for example http://localhost:8000).'];
        return null;
    }
    function notice(vi, en, detail, hint) {
        var old = document.querySelector('.v2-auth-alert'); if (old) old.remove();
        var close = el('button', { type: 'button', class: 'v2-auth-alert-close', 'aria-label': 'Close' }, [el('span', { 'aria-hidden': 'true', text: '×' })]);
        var box = el('div', { class: 'v2-auth-alert', role: 'alert' }, [el('strong', {}, [tx(vi, en)]), detail ? el('p', { text: detail }) : null, hint ? el('p', {}, [tx(hint[0], hint[1])]) : null, close]);
        close.addEventListener('click', function () { box.remove(); });
        var header = document.querySelector('.v2-header');
        if (header && header.parentNode) header.parentNode.insertBefore(box, header.nextSibling); else document.body.insertBefore(box, document.body.firstChild);
    }
    window.EyeCodeAuth.lastError = null;
    function completeSignIn() {
        if (dev) return Promise.resolve();
        var failure = readRedirectError();
        if (failure) {
            window.EyeCodeAuth.lastError = failure;
            try { console.warn('[EyeCode auth] sign-in failed:', failure.error, failure.code, failure.description); } catch (_) { /* no console */ }
            notice('Đăng nhập không thành công.', 'Sign-in did not complete.', failure.description || failure.error, hintFor(failure));
            return Promise.resolve();
        }
        var url = new URL(location.href), code = url.searchParams.get('code');
        if (!code) return Promise.resolve();
        var verifier = store(function (ls) { return ls.getItem(PKCE_KEY); });
        url.searchParams.delete('code');
        history.replaceState(history.state, '', url.pathname + (url.search || '') + url.hash);
        if (!verifier) {
            notice('Đăng nhập không thành công.', 'Sign-in did not complete.', null, hintFor({ error: 'pkce', code: '', description: '' }));
            return Promise.resolve();
        }
        store(function (ls) { ls.removeItem(PKCE_KEY); });
        return api('/auth/v1/token?grant_type=pkce', { method: 'POST', token: null, body: { auth_code: code, code_verifier: verifier } })
            .then(function (j) { saveSession(toSession(j)); })
            .catch(function (e) {
                window.EyeCodeAuth.lastError = { error: 'token_exchange', code: String(e.status || ''), description: e.message };
                try { console.warn('[EyeCode auth] code exchange failed:', e.status, e.message); } catch (_) { /* no console */ }
                notice('Không thể hoàn tất đăng nhập.', 'Could not complete sign-in.', e.message, hintFor({ error: '', code: '', description: e.message }));
            });
    }
    function oauthRedirectTo() {
        var origin = new URL(location.origin);
        var local = /^(?:http:|https:)$/.test(origin.protocol) && /^(?:localhost|127\.0\.0\.1)$/.test(origin.hostname);
        var hosted = /^https:\/\/(?:preview\.)?eyecodetech\.com$/.test(origin.origin);
        if (!local && !hosted) throw new Error('Untrusted OAuth origin');
        // Build from the browser origin, never a query parameter, canonical URL or Site URL.
        var back = new URL(origin.origin);
        back.pathname = location.pathname;
        var current = new URL(location.href);
        back.search = current.search;
        back.hash = current.hash;
        ['code', 'error', 'error_code', 'error_description'].forEach(function (key) { back.searchParams.delete(key); });
        return back.href;
    }
    function signIn() {
        if (dev) { dev.set('user'); return; }
        var redirectTo;
        try { redirectTo = oauthRedirectTo(); }
        catch (_) { notice('Không thể đăng nhập từ địa chỉ này.', 'Sign-in is not available from this address.'); return; }
        var verifier = randomVerifier();
        if (!store(function (ls) { ls.setItem(PKCE_KEY, verifier); return true; })) { notice('Trình duyệt chặn lưu trữ cục bộ, không thể đăng nhập.', 'The browser blocks local storage, so sign-in cannot work.'); return; }
        return challengeFor(verifier).then(function (challenge) {
            // redirect_to is the REST equivalent of signInWithOAuth({options:{redirectTo}}).
            // Supabase must allow this origin/path (and query/hash); otherwise its Site URL may be used.
            location.href = base + '/auth/v1/authorize?' + new URLSearchParams({ provider: 'google', redirect_to: redirectTo, code_challenge: challenge, code_challenge_method: 's256' });
        });
    }
    function signOut() {
        if (dev) { dev.set('visitor'); return; }
        var s = state.session;
        // Hide private navigation and purge Atlas immediately, even if logout is slow/offline.
        saveSession(null); state.profile = null; renderAll();
        return s ? api('/auth/v1/logout', { method: 'POST', token: s.access_token }).catch(function () { }) : Promise.resolve();
    }
    function loadProfile() {
        var session = state.session;
        if (!session) { state.profile = null; return Promise.resolve(); }
        if (profileRequest && profileRequest.token === session.access_token) return profileRequest.promise;
        var job = { token: session.access_token };
        function apply(profile) {
            // A late profile response must never restore a signed-out or replaced account.
            if (state.session && state.session.access_token === session.access_token && state.session.user.id === session.user.id) state.profile = profile;
        }
        job.promise = api('/rest/v1/profiles?id=eq.' + encodeURIComponent(session.user.id) + '&select=display_name,avatar_url,role,status', { token: session.access_token })
            .then(function (rows) { apply(rows && rows[0] || { role: 'user', status: 'active', missing: true }); })
            .catch(function () { apply({ role: 'user', status: 'active', missing: true }); })
            .finally(function () { if (profileRequest === job) profileRequest = null; });
        profileRequest = job;
        return job.promise;
    }
    function canShowAdmin() {
        var session = state.session, profile = state.profile;
        return !!(window.EyeCodeAuth.ready && enabled && !dev && session && session.user && session.user.id
            && session.access_token && Number.isFinite(session.expires_at) && session.expires_at * 1000 > Date.now()
            && profile && !profile.missing && profile.role === 'admin' && profile.status === 'active');
    }
    function renderAdminLinks() {
        clearTimeout(adminExpiryTimer);
        var visible = canShowAdmin();
        document.querySelectorAll('[data-admin-only]').forEach(function (link) { link.hidden = !visible; });
        if (visible) adminExpiryTimer = setTimeout(function () {
            renderAdminLinks(); document.dispatchEvent(new Event('eyecode-profile-change'));
        }, Math.min(2147483647, Math.max(1, state.session.expires_at * 1000 - Date.now())));
    }
    function refreshProfile() {
        if (!window.EyeCodeAuth.ready) return Promise.resolve();
        var previous = JSON.stringify(state.profile);
        return freshSession().then(loadProfile).then(function () {
            renderHeader();
            if (JSON.stringify(state.profile) !== previous) document.dispatchEvent(new Event('eyecode-profile-change'));
        });
    }

    // ---- header ----
    function avatar(url, name, cls) {
        var initial = (name || '?').trim().charAt(0).toUpperCase() || '?';
        if (url && /^https:\/\//.test(url)) { var img = el('img', { class: cls, src: url, alt: '', width: 28, height: 28, referrerpolicy: 'no-referrer', loading: 'lazy' }); img.addEventListener('error', function () { img.replaceWith(el('span', { class: cls + ' v2-avatar-fallback', 'aria-hidden': 'true', text: initial })); }); return img; }
        return el('span', { class: cls + ' v2-avatar-fallback', 'aria-hidden': 'true', text: initial });
    }
    function renderHeader() {
        renderAdminLinks();
        document.querySelectorAll('[data-auth]').forEach(function (root) {
            root.hidden = false; root.textContent = '';
            if (!state.session || !state.profile) {
                var b = el('button', { type: 'button', class: 'v2-auth-signin' }, [tx('Đăng nhập', 'Sign in')]); b.addEventListener('click', signIn); root.appendChild(b); return;
            }
            var name = state.profile.display_name || (lang() === 'en' ? 'Account' : 'Tài khoản');
            var panelId = 'v2-auth-panel-' + Math.random().toString(36).slice(2, 8);
            var out = el('button', { type: 'button', class: 'v2-auth-signout' }, [tx('Đăng xuất', 'Sign out')]); out.addEventListener('click', signOut);
            var trigger = el('button', { type: 'button', class: 'v2-auth-trigger', 'aria-haspopup': 'true', 'aria-expanded': 'false', 'aria-controls': panelId, 'aria-label': (lang() === 'en' ? 'Account menu: ' : 'Menu tài khoản: ') + name, title: name }, [avatar(state.profile.avatar_url, name, 'v2-avatar v2-avatar-header')]);
            var panel = el('div', { class: 'v2-auth-panel', id: panelId, hidden: 'hidden' }, [
                el('p', { class: 'v2-auth-meta' }, [el('strong', { text: name }), state.profile.role === 'admin' ? tx('Quản trị viên', 'Admin', 'em') : null, state.profile.missing ? tx('Hồ sơ chưa sẵn sàng (cần áp dụng migration).', 'Profile not ready (migration required).', 'em') : null]),
                el('a', { class: 'v2-auth-link', href: 'profile.html' }, [tx('Hồ sơ của bạn', 'Your profile')]),
                out
            ]);
            var menu = el('div', { class: 'v2-auth-menu' }, [trigger, panel]);
            function setOpen(open, focusTrigger) { panel.hidden = !open; trigger.setAttribute('aria-expanded', String(open)); if (!open && focusTrigger) trigger.focus(); }
            trigger.addEventListener('click', function () { setOpen(panel.hidden); });
            menu.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && !panel.hidden) { ev.stopPropagation(); setOpen(false, true); } });
            menu.addEventListener('focusout', function (ev) { if (!panel.hidden && ev.relatedTarget && !menu.contains(ev.relatedTarget)) setOpen(false); });
            document.addEventListener('click', function outside(ev) { if (!menu.isConnected) { document.removeEventListener('click', outside); return; } if (!menu.contains(ev.target)) setOpen(false); });
            root.appendChild(menu);
        });
    }

    // ---- comments ----
    function when(iso) { try { return new Date(iso).toLocaleString(lang() === 'en' ? 'en-US' : 'vi-VN', { dateStyle: 'medium', timeStyle: 'short' }); } catch (_) { return iso; } }
    function isAdmin() { return !!(state.profile && state.profile.role === 'admin'); }
    function canPost() { return !!(state.session && state.profile && state.profile.status === 'active'); }
    function say(box, vi, en, ok) { box.textContent = ''; if (vi) { var m = tx(vi, en); box.appendChild(m); } box.className = 'v2-comment-status' + (ok ? ' is-ok' : ''); }
    function mutate(promise, box, done) {
        return promise.then(done).catch(function (e) {
            var m = errorMessage(e.setup ? 'setup_missing' : (e.message || '').replace(/^.*?(comment_[a-z_]+).*$/, '$1')); say(box, m[0], m[1]);
        });
    }
    function form(root, page, parentId, onDone) {
        if (!canPost()) {
            var wrap = el('div', { class: 'v2-comment-signin' }, [el('p', {}, [tx(state.profile && state.profile.status === 'suspended' ? 'Tài khoản của bạn hiện không thể bình luận.' : 'Đăng nhập bằng Google để tham gia bình luận.', state.profile && state.profile.status === 'suspended' ? 'Your account cannot comment right now.' : 'Sign in with Google to join the discussion.')])]);
            if (!state.session) { var b = el('button', { type: 'button', class: 'v2-button v2-primary' }, [tx('Đăng nhập với Google', 'Sign in with Google')]); b.addEventListener('click', signIn); wrap.appendChild(b); }
            return wrap;
        }
        var ta = el('textarea', { rows: parentId ? 3 : 4, maxlength: 2000, required: 'required', 'data-placeholder-vi': parentId ? 'Viết phản hồi…' : 'Chia sẻ suy nghĩ của bạn…', 'data-placeholder-en': parentId ? 'Write a reply…' : 'Share your thoughts…', 'aria-label': lang() === 'en' ? 'Comment' : 'Bình luận' });
        ta.placeholder = lang() === 'en' ? ta.dataset.placeholderEn : ta.dataset.placeholderVi;
        var trap = el('input', { type: 'text', name: 'website', tabindex: '-1', autocomplete: 'off', class: 'v2-comment-trap', 'aria-hidden': 'true' });
        var status = el('p', { class: 'v2-comment-status', role: 'status' });
        var submit = el('button', { type: 'submit', class: 'v2-button v2-primary' }, [tx(parentId ? 'Gửi phản hồi' : 'Đăng bình luận', parentId ? 'Post reply' : 'Post comment')]);
        var f = el('form', { class: 'v2-comment-form' }, [ta, trap, el('div', { class: 'v2-comment-actions' }, [submit, status])]);
        f.addEventListener('submit', function (ev) {
            ev.preventDefault();
            var body = ta.value.trim(); if (!body || trap.value) return;
            var last = +store(function (s) { return s.getItem(POSTED_KEY); }) || 0;
            if (Date.now() - last < MIN_POST_GAP_MS) { var m = errorMessage('comment_rate_limit'); say(status, m[0], m[1]); return; }
            submit.disabled = true;
            freshSession().then(function () {
                return mutate(api('/rest/v1/comments', { method: 'POST', prefer: 'return=minimal', body: { page_key: page, parent_id: parentId || null, author_id: state.session.user.id, body: body } }), status, function () { store(function (s) { s.setItem(POSTED_KEY, String(Date.now())); }); ta.value = ''; onDone(); });
            }).then(function () { submit.disabled = false; });
        });
        return f;
    }
    function renderNode(node, depth, page, reload) {
        var r = node.row, mine = state.session && r.author_id === state.session.user.id, shown = r.status === 'visible';
        var li = el('li', { class: 'v2-comment', id: 'comment-' + r.id });
        var head = el('div', { class: 'v2-comment-head' }, shown ? [avatar(r.author_avatar, r.author_name, 'v2-avatar'), el('strong', { text: r.author_name || '' }), el('time', { datetime: r.created_at, text: when(r.created_at) }), r.edited_at ? tx('đã chỉnh sửa', 'edited', 'em') : null] : []);
        li.appendChild(head);
        var body = shown ? el('p', { class: 'v2-comment-body', text: r.body }) : el('p', { class: 'v2-comment-body is-removed' }, [r.status === 'hidden' ? tx('Bình luận đã bị ẩn bởi quản trị viên.', 'This comment was hidden by a moderator.') : tx('Bình luận đã bị xóa.', 'This comment was deleted.')]);
        li.appendChild(body);
        var actions = el('div', { class: 'v2-comment-tools' }), slot = el('div', { class: 'v2-comment-slot' }), msg = el('p', { class: 'v2-comment-status', role: 'status' });
        function tool(vi, en, fn) { var b = el('button', { type: 'button', class: 'v2-comment-tool' }, [tx(vi, en)]); b.addEventListener('click', fn); actions.appendChild(b); }
        if (shown && depth < MAX_DEPTH) tool('Trả lời', 'Reply', function () { if (slot.firstChild) { slot.textContent = ''; return; } slot.appendChild(form(slot, page, r.id, reload)); });
        if (shown && mine) {
            tool('Sửa', 'Edit', function () {
                slot.textContent = ''; var ta = el('textarea', { rows: 3, maxlength: 2000, 'aria-label': 'Edit' }); ta.value = r.body;
                var save = el('button', { type: 'button', class: 'v2-button v2-primary' }, [tx('Lưu', 'Save')]);
                save.addEventListener('click', function () { var v = ta.value.trim(); if (!v) return; mutate(freshSession().then(function () { return api('/rest/v1/comments?id=eq.' + r.id, { method: 'PATCH', prefer: 'return=minimal', body: { body: v } }); }), msg, reload); });
                slot.appendChild(el('div', { class: 'v2-comment-form' }, [ta, el('div', { class: 'v2-comment-actions' }, [save])]));
            });
            tool('Xóa', 'Delete', function () { if (!window.confirm(lang() === 'en' ? 'Delete this comment?' : 'Xóa bình luận này?')) return; mutate(freshSession().then(function () { return api('/rest/v1/comments?id=eq.' + r.id, { method: 'PATCH', prefer: 'return=minimal', body: { status: 'deleted' } }); }), msg, reload); });
        }
        if (shown && isAdmin() && !mine) {
            tool('Ẩn (kiểm duyệt)', 'Hide (moderate)', function () { mutate(freshSession().then(function () { return api('/rest/v1/comments?id=eq.' + r.id, { method: 'PATCH', prefer: 'return=minimal', body: { status: 'hidden' } }); }), msg, reload); });
            tool('Đình chỉ tác giả', 'Suspend author', function () { if (!window.confirm(lang() === 'en' ? 'Suspend this user from commenting?' : 'Đình chỉ người dùng này bình luận?')) return; mutate(freshSession().then(function () { return api('/rest/v1/rpc/admin_set_user_status', { method: 'POST', body: { target: r.author_id, new_status: 'suspended' } }); }), msg, function () { say(msg, 'Đã đình chỉ tác giả.', 'Author suspended.', true); }); });
        }
        li.appendChild(actions); li.appendChild(msg); li.appendChild(slot);
        if (node.children.length) li.appendChild(el('ul', { class: 'v2-comment-list v2-comment-replies' }, node.children.map(function (c) { return renderNode(c, depth + 1, page, reload); })));
        return li;
    }
    function renderComments(root) {
        var page = root.getAttribute('data-page'); if (!page) return;
        root.hidden = false;
        var list = el('ul', { class: 'v2-comment-list' }), count = el('span', { class: 'v2-comment-count' });
        function reload() { return load(); }
        function load() {
            return api('/rest/v1/comment_feed?page_key=eq.' + encodeURIComponent(page) + '&order=created_at.asc&select=id,parent_id,author_id,status,created_at,edited_at,body,author_name,author_avatar', { token: state.session ? state.session.access_token : null }).then(function (rows) {
                var tree = buildTree(rows || []); list.textContent = '';
                var n = (rows || []).filter(function (r) { return r.status === 'visible'; }).length;
                count.textContent = n ? ' (' + n + ')' : '';
                if (!tree.length) list.appendChild(el('li', { class: 'v2-comment-empty' }, [tx('Chưa có bình luận nào. Hãy là người đầu tiên!', 'No comments yet. Be the first!')]));
                tree.forEach(function (node) { list.appendChild(renderNode(node, 0, page, reload)); });
            }).catch(function (e) { list.textContent = ''; var m = e && e.setup ? errorMessage('setup_missing') : ['Không thể tải bình luận lúc này.', 'Comments could not be loaded right now.']; list.appendChild(el('li', { class: 'v2-comment-empty', role: 'alert' }, [tx(m[0], m[1])])); });
        }
        root.textContent = '';
        root.appendChild(el('h2', { id: 'comments-title' }, [tx('Thảo luận', 'Discussion'), count]));
        root.appendChild(form(root, page, null, reload));
        root.appendChild(list);
        load();
    }
    function renderAll() { window.EyeCodeAuth.ready = true; renderHeader(); document.querySelectorAll('[data-comments]').forEach(renderComments); document.dispatchEvent(new Event('eyecode-auth-change')); }

    window.EyeCodeAuth.refresh = function () { window.EyeCodeAuth.ready = false; state.profile = null; state.session = loadSession(); renderAdminLinks(); document.dispatchEvent(new Event('eyecode-profile-change')); return freshSession().then(loadProfile).then(renderAll); };
    window.EyeCodeAuth.refreshProfile = refreshProfile;
    document.addEventListener('eyecode-auth-change', renderAdminLinks);
    document.addEventListener('eyecode-profile-change', renderAdminLinks);
    // Shared role refresh drives navigation visibility only, including on static Atlas pages.
    function revalidateHeader() {
        if (document.visibilityState === 'hidden' || !state.session) return;
        void refreshProfile();
    }
    setInterval(revalidateHeader, 60000);
    document.addEventListener('visibilitychange', revalidateHeader);
    window.addEventListener('storage', function (event) { if (event.key === SESSION_KEY || event.key === null) void window.EyeCodeAuth.refresh(); });
    state.session = loadSession();
    completeSignIn().then(freshSession).then(loadProfile).then(renderAll);
    document.addEventListener('v2-language-change', function () { if (state.session && state.profile) renderHeader(); document.querySelectorAll('[data-comments] textarea[data-placeholder-vi]').forEach(function (t) { t.placeholder = lang() === 'en' ? t.dataset.placeholderEn : t.dataset.placeholderVi; }); });
}());
