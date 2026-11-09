(function () {
    'use strict';
    const STORAGE_KEY = 'eyecode_referral';
    const VALID_FOR = 30 * 24 * 60 * 60 * 1000;
    const GOOGLE_FORM_REFERRAL_ENTRY = 'entry.1896336087';
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScYnGtOCneif6wgh0v7xrSBsKSD5lhvzj5Vu2tIq3jQKAP6bg/viewform';
    const validCode = code => typeof code === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(code);
    let memory = null;
    let memoryOnly = false;

    function read() {
        try {
            if (!memoryOnly) memory = JSON.parse(localStorage.getItem(STORAGE_KEY));
        } catch (_) { /* Storage can be unavailable; retain this visit's referral. */ }
        const value = memory;
        if (!value || !validCode(value.code) || !Number.isSafeInteger(value.firstSeen)
            || value.firstSeen < 0 || value.firstSeen > Date.now()) return null;
        return { code: value.code, firstSeen: value.firstSeen };
    }
    function active() {
        const value = read();
        // First-touch expires exactly 30 days after capture, not after the last visit.
        return value && Date.now() - value.firstSeen < VALID_FOR ? value : null;
    }
    const url = new URL(window.location.href);
    const code = url.searchParams.get('ref');
    if (!active() && validCode(code)) {
        memory = { code: code, firstSeen: Date.now() };
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(memory)); } catch (_) { memoryOnly = true; }
    }
    // Remove only ref before analytics or external resources load; preserve UTMs and anchors.
    if (url.searchParams.has('ref')) {
        url.searchParams.delete('ref');
        window.history.replaceState(window.history.state, '', url.href);
    }
    window.EyeCodeReferral = {
        applicationUrl: function (normalUrl) {
            const referral = active();
            if (!referral || !/^entry\.\d+$/.test(GOOGLE_FORM_REFERRAL_ENTRY)) return normalUrl;
            // Prefill only the configured Google Form field; never submit the form here.
            const form = new URL(GOOGLE_FORM_URL);
            form.searchParams.set('usp', 'pp_url');
            form.searchParams.set(GOOGLE_FORM_REFERRAL_ENTRY, referral.code);
            return form.href;
        },
        debug: function () {
            const value = read();
            return {
                code: value ? value.code : null,
                firstSeen: value ? value.firstSeen : null,
                expiresAt: value ? value.firstSeen + VALID_FOR : null,
                valid: !!value && Date.now() - value.firstSeen < VALID_FOR,
                expired: value ? Date.now() - value.firstSeen >= VALID_FOR : false,
                configured: /^entry\.\d+$/.test(GOOGLE_FORM_REFERRAL_ENTRY)
            };
        }
    };
    window.eyeCodeReferralDebug = window.EyeCodeReferral.debug;
}());
