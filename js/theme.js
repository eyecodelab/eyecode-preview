/* Load synchronously before styles: the saved theme is applied before first paint.
   Only Light and Dark exist. Missing, invalid or legacy "system" values resolve to Light. */
(function () {
    'use strict';
    const key = 'eyecode_theme';
    const root = document.documentElement;
    const normalize = value => (value === 'dark' ? 'dark' : 'light');
    let theme = 'light';
    try { theme = normalize(localStorage.getItem(key)); } catch (_) { /* Storage may be unavailable. */ }

    function apply() {
        root.dataset.theme = theme;
        root.style.colorScheme = theme;
        const color = document.querySelector('meta[name="theme-color"]');
        if (color) color.content = theme === 'dark' ? '#0f172a' : '#152b47';
        document.dispatchEvent(new Event('eyecode-theme-change'));
    }
    apply();
    window.addEventListener('storage', event => {
        if (event.key !== key && event.key !== null) return;
        theme = normalize(event.newValue);
        apply();
    });

    function initialize() {
        const trigger = document.querySelector('[data-theme-trigger]');
        if (!trigger) return;
        function sync() {
            const dark = theme === 'dark', english = root.lang === 'en';
            trigger.setAttribute('aria-pressed', String(dark));
            trigger.setAttribute('aria-label', dark
                ? (english ? 'Switch to Light mode' : 'Chuyển sang giao diện Sáng')
                : (english ? 'Switch to Dark mode' : 'Chuyển sang giao diện Tối'));
            trigger.querySelectorAll('[data-theme-icon]').forEach(icon => { icon.hidden = icon.dataset.themeIcon !== (dark ? 'sun' : 'moon'); });
        }
        trigger.addEventListener('click', () => {
            theme = theme === 'dark' ? 'light' : 'dark';
            try { localStorage.setItem(key, theme); } catch (_) { /* The current page still switches. */ }
            apply();
        });
        document.addEventListener('eyecode-theme-change', sync);
        document.addEventListener('v2-language-change', sync);
        sync();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
    else initialize();
})();
