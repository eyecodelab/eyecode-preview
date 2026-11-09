/* Bookmarks (saved articles) and the private Profile page. Builds on js/auth.js; stores everything in Supabase
   (RLS: each person sees only their own rows). Nothing is kept in localStorage as a source of truth. */
(function () {
    'use strict';
    var A = window.EyeCodeAuth;
    if (!A || !(A.enabled || A.devPreview)) return;
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-bookmark]'));
    var profileRoot = document.querySelector('[data-profile]');
    if (!buttons.length && !profileRoot) return;
    var el = A.el, tx = A.tx, lang = A.lang;
    var marks = null, order = [], busy = {}, setupMissing = false;
    var AUTOSIGNIN_KEY = 'eyecode.auth.autosignin.v1';

    var catalog = {};
    try { catalog = JSON.parse((document.getElementById('bookmark-catalog') || {}).textContent || '{}'); } catch (_) { catalog = {}; }
    function isSetup(e) { return !!(e && (e.setup || e.status === 404)); }
    function signedIn() { return !!(A.state.session && A.state.profile); }
    function msg(code, e) {
        if (isSetup(e)) return ['Tính năng lưu bài chưa sẵn sàng: cơ sở dữ liệu chưa được cập nhật.', 'Saving is not available yet: the database migration has not been applied.'];
        if (/bookmark_limit/.test((e && e.message) || '')) return ['Bạn đã đạt giới hạn 500 bài đã lưu.', 'You have reached the limit of 500 saved articles.'];
        return ['Không thể thực hiện thao tác. Vui lòng thử lại.', 'The action could not be completed. Please try again.'];
    }
    function loadMarks() {
        if (!signedIn()) { marks = new Set(); order = []; return Promise.resolve(); }
        return A.api('/rest/v1/bookmarks?select=article_key,created_at&order=created_at.desc').then(function (rows) {
            order = (rows || []).map(function (r) { return { key: r.article_key, at: r.created_at }; });
            marks = new Set(order.map(function (r) { return r.key; })); setupMissing = false;
        }).catch(function (e) { marks = new Set(); order = []; setupMissing = isSetup(e); });
    }

    // ---- bookmark buttons ----
    function setLabel(btn, saved) {
        var label = btn.querySelector('.v2-bookmark-label');
        label.dataset.vi = saved ? 'Đã lưu' : 'Lưu bài'; label.dataset.en = saved ? 'Saved' : 'Save';
        label.textContent = lang() === 'en' ? label.dataset.en : label.dataset.vi;
        btn.setAttribute('aria-label', lang() === 'en' ? (saved ? 'Remove from saved articles' : 'Save this article') : (saved ? 'Bỏ lưu bài viết' : 'Lưu bài viết này'));
    }
    function renderButtons() {
        buttons.forEach(function (btn) {
            var wrap = btn.closest('[data-bookmark-wrap]'); if (wrap) wrap.hidden = false;
            var saved = !!(marks && marks.has(btn.dataset.bookmark));
            btn.setAttribute('aria-pressed', String(saved)); btn.classList.toggle('is-saved', saved); setLabel(btn, saved);
        });
    }
    function hint(btn, kind, text) {
        var wrap = btn.closest('[data-bookmark-wrap]'), old = wrap.querySelector('.v2-bookmark-hint'); if (old) old.remove();
        if (!kind) return;
        var box = el('span', { class: 'v2-bookmark-hint', role: 'status' }, [tx(text[0], text[1])]);
        if (kind === 'signin') { var go = el('button', { type: 'button', class: 'v2-button v2-primary v2-bookmark-signin' }, [tx('Đăng nhập với Google', 'Sign in with Google')]); go.addEventListener('click', function () { A.signIn(); }); box.appendChild(go); }
        wrap.appendChild(box);
    }
    function toggle(key, on) {
        if (busy[key]) return Promise.resolve(); busy[key] = true;
        var uid = A.state.session.user.id;
        var call = on
            ? A.api('/rest/v1/bookmarks?on_conflict=user_id,article_key', { method: 'POST', prefer: 'resolution=ignore-duplicates,return=minimal', body: { article_key: key } })
            : A.api('/rest/v1/bookmarks?article_key=eq.' + encodeURIComponent(key) + '&user_id=eq.' + encodeURIComponent(uid), { method: 'DELETE', prefer: 'return=minimal' });
        return A.freshSession().then(function () { return call; }).then(function () {
            if (on) { if (!marks.has(key)) { marks.add(key); order.unshift({ key: key, at: new Date().toISOString() }); } }
            else { marks.delete(key); order = order.filter(function (r) { return r.key !== key; }); }
            busy[key] = false; renderButtons(); renderProfile();
        }, function (e) { busy[key] = false; throw e; });
    }
    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (!signedIn()) { var open = btn.closest('[data-bookmark-wrap]').querySelector('.v2-bookmark-hint'); hint(btn, open ? null : 'signin', ['Đăng nhập để lưu bài viết này.', 'Sign in to save this article.']); return; }
            hint(btn, null);
            toggle(btn.dataset.bookmark, btn.getAttribute('aria-pressed') !== 'true').catch(function (e) { var m = msg('', e); hint(btn, 'error', m); });
        });
    });

    // ---- profile page ----
    function entryFor(key) { var c = catalog[key]; if (!c) return null; var row = c[lang()] || c.vi || c.en; return row ? { title: row.t, url: row.u, kind: c.k } : null; }
    function when(iso) { try { return new Date(iso).toLocaleDateString(lang() === 'en' ? 'en-US' : 'vi-VN', { dateStyle: 'medium' }); } catch (_) { return ''; } }
    var extra = { email: null, comments: null, loaded: false, note: null };
    function loadExtra() {
        var uid = A.state.session.user.id;
        return Promise.all([
            A.api('/rest/v1/profiles?id=eq.' + encodeURIComponent(uid) + '&select=email').then(function (r) { extra.email = r && r[0] && r[0].email || ''; }).catch(function () { extra.email = ''; }),
            A.api('/rest/v1/comments?author_id=eq.' + encodeURIComponent(uid) + '&status=eq.visible&order=created_at.desc&limit=50&select=id,page_key,body,created_at').then(function (r) { extra.comments = r || []; }).catch(function () { extra.comments = []; })
        ]).then(function () { extra.loaded = true; });
    }
    function card(titleVi, titleEn, kids) { return el('section', { class: 'v2-profile-card' }, [el('h2', {}, [tx(titleVi, titleEn)])].concat(kids)); }
    function renderProfile() {
        if (!profileRoot) return;
        var fallback = document.querySelector('[data-profile-fallback]'); if (fallback) fallback.hidden = true;
        profileRoot.hidden = false; profileRoot.textContent = '';
        if (!signedIn()) {
            var go = el('button', { type: 'button', class: 'v2-button v2-primary' }, [tx('Đăng nhập với Google', 'Sign in with Google')]); go.addEventListener('click', function () { A.signIn(); });
            profileRoot.appendChild(card('Đăng nhập để xem hồ sơ', 'Sign in to see your profile', [el('p', { class: 'v2-profile-note' }, [tx('Hồ sơ là riêng tư và chỉ hiển thị cho tài khoản của bạn.', 'Your profile is private and only visible to your own account.')]), go]));
            return;
        }
        var p = A.state.profile, name = p.display_name || (lang() === 'en' ? 'Account' : 'Tài khoản');
        // identity
        var input = el('input', { type: 'text', id: 'v2-display-name', maxlength: 80, required: 'required', autocomplete: 'nickname', value: p.display_name || '' });
        var status = el('p', { class: 'v2-comment-status', role: 'status' });
        var save = el('button', { type: 'submit', class: 'v2-button v2-primary' }, [tx('Lưu tên', 'Save name')]);
        var form = el('form', { class: 'v2-profile-form' }, [el('label', { for: 'v2-display-name' }, [tx('Tên hiển thị', 'Display name')]), el('div', { class: 'v2-profile-row' }, [input, save]), status]);
        form.addEventListener('submit', function (ev) {
            ev.preventDefault(); var v = input.value.trim().slice(0, 80);
            if (!v) { status.textContent = ''; status.appendChild(tx('Tên hiển thị không được để trống.', 'The display name cannot be empty.')); return; }
            save.disabled = true;
            A.freshSession().then(function () { return A.api('/rest/v1/profiles?id=eq.' + encodeURIComponent(A.state.session.user.id), { method: 'PATCH', prefer: 'return=minimal', body: { display_name: v } }); })
                .then(function () { A.setProfile({ display_name: v }); renderProfile(); var s = profileRoot.querySelector('.v2-profile-form .v2-comment-status'); if (s) { s.className = 'v2-comment-status is-ok'; s.appendChild(tx('Đã lưu.', 'Saved.')); } })
                .catch(function () { save.disabled = false; status.textContent = ''; status.appendChild(tx('Không thể lưu tên. Vui lòng thử lại.', 'Could not save the name. Please try again.')); });
        });
        var head = el('div', { class: 'v2-profile-head' }, [A.avatar(p.avatar_url, name, 'v2-avatar v2-avatar-xl'), el('div', { class: 'v2-profile-id' }, [
            el('p', { class: 'v2-profile-name' }, [el('strong', { text: name }), p.role === 'admin' ? tx('Quản trị viên', 'Admin', 'span') : null]),
            el('p', { class: 'v2-profile-email', text: extra.email || '' }),
            el('p', { class: 'v2-profile-note' }, [tx('Email chỉ hiển thị với bạn, không bao giờ xuất hiện công khai.', 'Your email is visible only to you and is never shown publicly.')])
        ])]);
        if (p.role === 'admin') head.querySelector('.v2-profile-name span').className = 'v2-profile-badge';
        profileRoot.appendChild(el('div', { class: 'v2-profile-grid' }, [
            card('Tài khoản', 'Account', [head, form]),
            card('Bài viết đã lưu', 'Saved articles', [savedList()]),
            card('Bình luận của bạn', 'Your comments', [commentList()]),
            card('Cài đặt tài khoản', 'Account settings', [settings()])
        ]));
    }
    function savedList() {
        if (setupMissing) return el('p', { class: 'v2-profile-note', role: 'alert' }, [tx(msg('', { setup: true })[0], msg('', { setup: true })[1])]);
        if (!order.length) return el('p', { class: 'v2-profile-note' }, [tx('Bạn chưa lưu bài viết nào. Chọn “Lưu bài” ở đầu mỗi bài AI Knowledge hoặc AI Skills.', 'Nothing saved yet. Use “Save” at the top of any AI Knowledge or AI Skills article.')]);
        var list = el('ul', { class: 'v2-profile-list' });
        order.forEach(function (r) {
            var e = entryFor(r.key), li = el('li', {});
            li.appendChild(el('div', { class: 'v2-profile-item' }, [
                e ? el('a', { href: e.url, text: e.title }) : el('span', { class: 'v2-profile-gone' }, [tx('Bài viết không còn khả dụng', 'Article no longer available')]),
                el('span', { class: 'v2-profile-meta' }, [e ? tx(e.kind === 'skills' ? 'Kỹ năng AI' : 'Kiến thức AI', e.kind === 'skills' ? 'AI Skills' : 'AI Knowledge') : null, document.createTextNode(' · ' + when(r.at))])
            ]));
            var rm = el('button', { type: 'button', class: 'v2-profile-remove', 'aria-label': (lang() === 'en' ? 'Remove from saved: ' : 'Bỏ lưu: ') + (e ? e.title : r.key) }, [tx('Bỏ lưu', 'Remove')]);
            rm.addEventListener('click', function () { rm.disabled = true; toggle(r.key, false).catch(function () { rm.disabled = false; }); });
            li.appendChild(rm); list.appendChild(li);
        });
        return list;
    }
    function commentList() {
        if (!extra.loaded) return el('p', { class: 'v2-profile-note' }, [tx('Đang tải…', 'Loading…')]);
        if (!extra.comments.length) return el('p', { class: 'v2-profile-note' }, [tx('Bạn chưa có bình luận nào.', 'You have not posted any comments yet.')]);
        var list = el('ul', { class: 'v2-profile-list' });
        extra.comments.forEach(function (c) {
            var e = entryFor(c.page_key), excerpt = c.body.length > 140 ? c.body.slice(0, 140) + '…' : c.body;
            list.appendChild(el('li', {}, [el('div', { class: 'v2-profile-item' }, [
                el('span', { class: 'v2-profile-excerpt', text: excerpt }),
                el('span', { class: 'v2-profile-meta' }, [e ? el('a', { href: e.url + '#comment-' + c.id, text: e.title }) : document.createTextNode(c.page_key), document.createTextNode(' · ' + when(c.created_at))])
            ])]));
        });
        return list;
    }
    function settings() {
        var out = el('button', { type: 'button', class: 'v2-button' }, [tx('Đăng xuất', 'Sign out')]); out.addEventListener('click', function () { A.signOut(); });
        return el('div', { class: 'v2-profile-settings' }, [
            el('p', { class: 'v2-profile-note' }, [tx('Ngôn ngữ và giao diện sáng/tối được chọn trên thanh đầu trang.', 'Language and light/dark theme are chosen in the header.')]),
            el('p', {}, [el('a', { href: 'privacy.html' }, [tx('Chính sách quyền riêng tư', 'Privacy Policy')]), document.createTextNode(' · '), el('a', { href: 'terms.html' }, [tx('Điều khoản dịch vụ', 'Terms of Service')]), document.createTextNode(' · '), el('a', { href: 'mailto:eyecode@eyecodetech.com?subject=Account%20deletion%20request' }, [tx('Yêu cầu xóa tài khoản', 'Request account deletion')])]),
            out
        ]);
    }
    function maybeAutoSignIn() {
        if (!profileRoot || signedIn() || A.devPreview || A.lastError) return;
        var last = 0; try { last = +sessionStorage.getItem(AUTOSIGNIN_KEY) || 0; } catch (_) { /* optional */ }
        if (Date.now() - last < 120000 || document.querySelector('.v2-auth-alert')) return;
        try { sessionStorage.setItem(AUTOSIGNIN_KEY, String(Date.now())); } catch (_) { return; }
        A.signIn();
    }

    function sync() {
        loadMarks().then(function () {
            renderButtons();
            if (profileRoot) {
                renderProfile(); maybeAutoSignIn();
                if (signedIn() && !extra.loaded) loadExtra().then(renderProfile);
            }
        });
    }
    document.addEventListener('eyecode-auth-change', function () { extra.loaded = false; sync(); });
    document.addEventListener('v2-language-change', function () { renderButtons(); renderProfile(); });
    if (A.ready) sync();
}());
