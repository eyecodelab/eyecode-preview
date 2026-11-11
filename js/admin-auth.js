/* Shared advisory gate for private Admin modules. Database RLS is the security boundary.
   No private content, credentials, role overrides or simulated-admin fallback live here.
   Import lazily from the future Atlas UI; existing public pages do not load this module. */
export class AdminAuthorizationError extends Error {
    constructor(reason) {
        super('Admin authorization required');
        this.name = 'AdminAuthorizationError';
        this.reason = reason;
    }
}

export function createAdminAuthorization({
    getAuth = () => globalThis.window?.EyeCodeAuth,
    eventTarget = globalThis.document,
    now = () => Date.now(),
    readyTimeoutMs = 5000,
    verificationTimeoutMs = 15000
} = {}) {
    let generation = 0, disposed = false, verifying = false, verifiedSession = null;
    let state = Object.freeze({status:'idle', authorized:false, reason:null, userId:null});
    const listeners = new Set();
    const notify = next => {
        state = Object.freeze(next);
        for (const listener of listeners) { try { listener(state); } catch (_) { /* UI listeners cannot authorize. */ } }
        return state;
    };
    const denied = reason => Object.freeze({status:'denied', authorized:false, reason, userId:null});
    const fail = (reason, ticket) => {
        if (ticket !== generation) return denied('superseded');
        verifiedSession = null;
        return notify(denied(reason));
    };
    const invalidate = (reason='auth_changed') => {
        generation++;
        verifiedSession = null;
        return notify(denied(reason));
    };
    const current = (auth, session) => getAuth() === auth
        && auth.state?.session?.access_token === session.access_token
        && auth.state?.session?.user?.id === session.user.id
        && Number.isFinite(session.expires_at) && session.expires_at * 1000 > now();
    const authChanged = () => {
        // Initial auth.ready completion need not cancel a check waiting for readiness.
        // Once verification starts, sign-out, refresh and account changes invalidate it.
        // Same-session header/profile renders are followed by a live controller check.
        if (verifiedSession && current(verifiedSession.auth, verifiedSession.session)) return;
        if (state.status !== 'loading' || verifying) invalidate();
    };
    eventTarget?.addEventListener('eyecode-auth-change', authChanged);

    async function waitForReady(auth) {
        const until = Date.now() + readyTimeoutMs;
        while (!auth.ready && !disposed && getAuth() === auth && Date.now() < until) {
            await new Promise(resolve => setTimeout(resolve, 20));
        }
        return auth.ready === true;
    }

    async function verifiedRequest(auth, path, token) {
        let timer;
        try {
            return await Promise.race([
                auth.api(path, {token}),
                new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Verification timed out')), verificationTimeoutMs); })
            ]);
        } finally { clearTimeout(timer); }
    }

    async function check({background = false} = {}) {
        const ticket = ++generation;
        const preserve = background && state.authorized && verifiedSession
            && current(verifiedSession.auth, verifiedSession.session);
        if (!preserve) verifiedSession = null;
        verifying = false;
        if (disposed) return fail('disposed', ticket);
        if (!preserve) notify({status:'loading', authorized:false, reason:null, userId:null});
        const auth = getAuth();
        if (!auth || auth.enabled !== true) return fail('not_configured', ticket);
        if (auth.devPreview) return fail('real_auth_required', ticket);
        if (typeof auth.api !== 'function' || typeof auth.freshSession !== 'function') return fail('auth_unavailable', ticket);
        try {
            if (!await waitForReady(auth)) return fail(disposed?'disposed':'auth_loading', ticket);
            if (ticket !== generation) return denied('superseded');
            verifying = true;
            const session = await auth.freshSession();
            if (ticket !== generation) return denied('superseded');
            if (!session?.access_token || !session.user?.id) return fail('sign_in_required', ticket);
            if (!current(auth, session)) return fail('session_expired', ticket);
            // Verify the token with Supabase Auth; never trust localStorage/JWT metadata as proof.
            const user = await verifiedRequest(auth, '/auth/v1/user', session.access_token);
            if (ticket !== generation) return denied('superseded');
            if (!user || user.id !== session.user.id || user.is_anonymous === true
                || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(user.id)) return fail('invalid_user', ticket);
            if (!current(auth, session)) return fail('session_changed', ticket);
            // Read the authoritative profile again, even if the public header cached an Admin role.
            const rows = await verifiedRequest(auth, '/rest/v1/profiles?id=eq.' + encodeURIComponent(user.id) + '&select=id,role,status', session.access_token);
            if (ticket !== generation) return denied('superseded');
            if (!Array.isArray(rows) || rows.length !== 1 || rows[0].id !== user.id) return fail('profile_unavailable', ticket);
            if (rows[0].role !== 'admin' || rows[0].status !== 'active') return fail('forbidden', ticket);
            if (!current(auth, session)) return fail('session_changed', ticket);
            verifiedSession = {auth, session:{...session,user:{id:user.id}}};
            return notify({status:'authorized', authorized:true, reason:null, userId:user.id});
        } catch (error) {
            // Do not leak backend messages, profile details or tokens into UI state/errors.
            return fail(error?.status === 401?'session_expired':error?.status === 403?'forbidden':'verification_failed', ticket);
        } finally {
            if (ticket === generation) verifying = false;
        }
    }

    return Object.freeze({
        check,
        async requireAdmin() {
            const result = await check({background:true});
            if (!result.authorized) throw new AdminAuthorizationError(result.reason);
            return Object.freeze({userId:result.userId});
        },
        getState() {
            if (state.authorized && (!verifiedSession || !current(verifiedSession.auth, verifiedSession.session))) invalidate('session_changed');
            return state;
        },
        invalidate,
        subscribe(listener) {
            if (disposed) throw new AdminAuthorizationError('disposed');
            if (typeof listener !== 'function') throw new TypeError('A listener is required');
            listeners.add(listener);
            listener(state);
            return () => listeners.delete(listener);
        },
        dispose() {
            disposed = true;
            invalidate('disposed');
            listeners.clear();
            eventTarget?.removeEventListener('eyecode-auth-change', authChanged);
        }
    });
}
