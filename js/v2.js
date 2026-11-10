(function () {
    'use strict';
    const readPreference = key => { try { return localStorage.getItem(key); } catch (_) { return null; } };
    const savePreference = (key, value) => { try { localStorage.setItem(key, value); } catch (_) { /* Preference is optional. */ } };
    const header = document.querySelector('.v2-header');
    const menu = document.querySelector('.v2-menu-toggle');
    const nav = document.getElementById('v2-navigation');
    const languageControl = document.querySelector('.v2-language');
    const languageTrigger = document.getElementById('v2-language-trigger');
    const languagePopover = document.getElementById('v2-language-popover');
    const languageOptions = Array.from(document.querySelectorAll('[data-language]'));
    let currentLanguage = 'vi';
    function closeLanguage(restoreFocus = false) {
        if (!languageTrigger || !languagePopover) return;
        languageTrigger.setAttribute('aria-expanded', 'false');
        languagePopover.hidden = true;
        if (restoreFocus) languageTrigger.focus();
    }
    function openLanguage(index = languageOptions.findIndex(option => option.dataset.language === currentLanguage)) {
        if (!languageTrigger || !languagePopover) return;
        document.querySelectorAll('.v2-nav-about[open]').forEach(el => { el.open = false; });
        languageTrigger.setAttribute('aria-expanded', 'true');
        languagePopover.hidden = false;
        languageOptions[Math.max(0, index)]?.focus();
    }
    function closeMenu() {
        closeLanguage();
        if (!menu || !nav) return;
        menu.setAttribute('aria-expanded', 'false');
        nav.removeAttribute('data-open');
    }
    if (menu && nav) {
        menu.addEventListener('click', function () {
            const open = menu.getAttribute('aria-expanded') !== 'true';
            if (!open) closeLanguage();
            menu.setAttribute('aria-expanded', String(open));
            nav.toggleAttribute('data-open', open);
        });
    }
    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        document.querySelectorAll('.v2-nav-about[open]').forEach(el => { el.open = false; el.querySelector('summary').focus(); });
        if (menu && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
    });
    document.addEventListener('click', function (event) {
        document.querySelectorAll('.v2-nav-about[open]').forEach(el => { if (!el.contains(event.target)) el.open = false; });
        if (languageControl && !languageControl.contains(event.target)) closeLanguage();
        if (header && !header.contains(event.target)) closeMenu();
    });
    if (nav) nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    if (header) header.addEventListener('focusout', event => {
        if (event.relatedTarget && !header.contains(event.relatedTarget)) closeMenu();
    });
    if (languageTrigger && languageControl) {
        languageTrigger.addEventListener('click', () => {
            if (languageTrigger.getAttribute('aria-expanded') === 'true') closeLanguage();
            else openLanguage();
        });
        languageControl.addEventListener('keydown', event => {
            const open = languageTrigger.getAttribute('aria-expanded') === 'true';
            if (event.key === 'Escape' && open) {
                event.preventDefault();
                event.stopPropagation();
                closeLanguage(true);
            } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                event.preventDefault();
                let index = languageOptions.indexOf(document.activeElement);
                if (event.key === 'Home' || (!open && event.key === 'ArrowDown')) index = 0;
                else if (event.key === 'End' || (!open && event.key === 'ArrowUp')) index = languageOptions.length - 1;
                else index = (index + (event.key === 'ArrowDown' ? 1 : -1) + languageOptions.length) % languageOptions.length;
                openLanguage(index);
            }
        });
        languageControl.addEventListener('focusout', event => {
            if (!languageControl.contains(event.relatedTarget) || event.relatedTarget === languageTrigger) closeLanguage();
        });
    }

    function alignCareerAnchor() {
        const id = window.location.hash.slice(1);
        if (!['ai-research-intern', 'marketing-intern', 'ai-research-training'].includes(id)) return;
        const target = document.getElementById(id);
        if (target) window.requestAnimationFrame(() => target.scrollIntoView({behavior: 'instant', block: 'start'}));
    }
    window.addEventListener('hashchange', alignCareerAnchor);
    window.addEventListener('load', alignCareerAnchor);

    function applyLanguage(language) {
        const lang = language === 'en' ? 'en' : 'vi';
        currentLanguage = lang;
        document.documentElement.lang = lang;
        savePreference('language', lang);
        document.querySelectorAll('[data-vi][data-en]').forEach(el => { el.textContent = el.dataset[lang]; el.lang = lang; });
        languageOptions.forEach(el => el.setAttribute('aria-checked', String(el.dataset.language === lang)));
        const label = lang === 'en' ? 'English' : 'Tiếng Việt';
        if (languageTrigger) {
            languageTrigger.querySelector('[data-language-label]').textContent = label;
            languageTrigger.setAttribute('aria-label', (lang === 'en' ? 'Language: ' : 'Ngôn ngữ: ') + label);
        }
        document.querySelectorAll('[data-alt-vi][data-alt-en]').forEach(el=>{el.alt=el.dataset[lang==='en'?'altEn':'altVi'];});
        document.querySelectorAll('[data-href-vi][data-href-en]').forEach(el=>{el.href=el.dataset[lang==='en'?'hrefEn':'hrefVi'];});
        document.querySelectorAll('[data-placeholder-vi]').forEach(el => {el.placeholder = el.dataset[lang === 'en' ? 'placeholderEn' : 'placeholderVi'];});
        document.querySelectorAll('[data-label-vi]').forEach(el => {el.setAttribute('aria-label',el.dataset[lang === 'en' ? 'labelEn' : 'labelVi']);});
        document.querySelectorAll('[data-copy-code]').forEach(button => {
            window.clearTimeout(button.copyReset);
            if (button.closest('.v2-tutorial-content')) button.textContent = lang === 'en' ? 'Copy' : 'Sao chép';
        });
        document.dispatchEvent(new Event('v2-language-change'));
        // Older pages already use ?lang=. Keep those URLs consistent without navigating.
        const url = new URL(window.location.href);
        if (url.searchParams.has('lang') && url.searchParams.get('lang') !== lang) {
            url.searchParams.set('lang', lang);
            history.replaceState(history.state, '', url);
        }
        document.querySelectorAll('a[href*="lang="]').forEach(link => {
            const target = new URL(link.href, window.location.href);
            if (target.origin !== url.origin || !target.searchParams.has('lang')) return;
            target.searchParams.set('lang', lang);
            link.href = target.href;
        });
        // Preserve the existing program/careers dictionaries and all stored choices.
        if (document.body.classList.contains('v2-legacy') && typeof window.changeLanguage === 'function') window.changeLanguage(lang);
        alignCareerAnchor();
    }
    const researchPairs={'nghien-cuu-ai.html':'ai-research-en.html','papers.html':'papers-en.html','deadlines.html':'deadlines-en.html'};
    for(const link of document.querySelectorAll('a[href]')){if(link.hasAttribute('data-translation-link'))continue;const target=new URL(link.href,location.href),file=target.pathname.split('/').pop();if(target.origin===location.origin&&researchPairs[file]){link.dataset.hrefVi=link.getAttribute('href');link.dataset.hrefEn=researchPairs[file]+target.search+target.hash;}}
    const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
    applyLanguage(document.body.dataset.routeLanguage || (['vi', 'en'].includes(requestedLanguage) ? requestedLanguage : readPreference('language') || 'vi'));
    // Retained pages initialize their dictionaries on DOMContentLoaded; sync the shared UI afterwards.
    document.addEventListener('DOMContentLoaded', () => applyLanguage(currentLanguage));
    languageOptions.forEach(button => button.addEventListener('click', () => {
        const translation = document.querySelector('[data-translation-link]');
        if (translation?.dataset.translationLanguage === button.dataset.language) {
            const destination = new URL(translation.href, location.href);
            destination.search = location.search;
            destination.searchParams.set('lang', button.dataset.language);
            destination.hash = location.hash;
            savePreference('language', button.dataset.language);
            location.assign(destination.href);
            return;
        }
        applyLanguage(button.dataset.language);
        closeLanguage(true);
    }));

    const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
    document.querySelectorAll('[data-filter-root]').forEach(function (root) {
        const buttons = Array.from(root.querySelectorAll('[data-filter]'));
        const marketButtons = Array.from(root.querySelectorAll('[data-market-filter]'));
        const input = root.querySelector('[data-search-input]');
        const defaultLimit = Number(root.dataset.defaultLimit) || Infinity;
        const params = new URLSearchParams(location.search);
        const initial = buttons.find(b => b.getAttribute('aria-pressed') === 'true');
        const anchorFilter = root.hasAttribute('data-tutorial-library') ? buttons.find(button => button.id && '#'+button.id === location.hash)?.dataset.filter : '';
        let filter = params.has('category') ? params.get('category') : (anchorFilter || (initial ? initial.dataset.filter : ''));
        if (!buttons.some(b => b.dataset.filter === filter)) filter = '';
        let market = params.get('market') || '';
        if (!marketButtons.some(button => button.dataset.marketFilter === market)) market = '';
        if (input) input.value = params.get('q') || '';
        function update(writeUrl) {
            const query = normalize(input ? input.value.trim() : '');
            const topic=root.querySelector('[data-topic-filter]')?.value||'';
            let count = 0, visibleCount = 0;
            root.querySelectorAll('[data-filter-item]').forEach(function (card) {
                const languageMatches = !card.dataset.displayLanguages || card.dataset.displayLanguages.split(' ').includes(currentLanguage);
                const matches = languageMatches && (!filter || card.dataset.category === filter) && (!market || (card.dataset.markets||'').split(' ').includes(market)) && (!topic || (card.dataset.topic||'').split(' ').includes(topic)) && (!query || normalize(card.dataset.search).includes(query));
                const visible = matches && (filter || visibleCount < defaultLimit);
                card.hidden = !visible;
                if (visible) { visibleCount++; if (!card.hasAttribute('data-listing-navigation')) count++; }
            });
            root.querySelectorAll('[data-filter-panel]').forEach(panel => { panel.hidden = panel.dataset.filterPanel !== filter; });
            buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
            marketButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.marketFilter === market)));
            const countElement = root.querySelector('[data-result-count]');
            if (countElement) countElement.textContent = count + ' ' + (countElement.dataset[currentLanguage === 'en' ? 'countEn' : 'countVi'] || 'kết quả');
            const empty = root.querySelector('[data-empty]');
            if (empty) empty.hidden = visibleCount !== 0;
            if (writeUrl) {
                const url = new URL(location.href);
                if (filter) url.searchParams.set('category', filter); else url.searchParams.delete('category');
                if (marketButtons.length) { if (market) url.searchParams.set('market', market); else url.searchParams.delete('market'); }
                if (root.hasAttribute('data-tutorial-library') && buttons.some(button => button.id && '#'+button.id === url.hash)) url.hash = '';
                if (input && input.value.trim()) url.searchParams.set('q', input.value.trim()); else url.searchParams.delete('q');
                history.replaceState(history.state, '', url);
            }
        }
        buttons.forEach(button => button.addEventListener('click', function () { filter = button.dataset.filter; update(true); }));
        marketButtons.forEach(button => button.addEventListener('click', function () { market = button.dataset.marketFilter; update(true); }));
        root.querySelectorAll('[data-career-topic]').forEach(card => card.addEventListener('click', event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            const button = buttons.find(button => button.dataset.filter === card.dataset.careerTopic);
            if (button) { button.click(); button.focus({preventScroll:true}); }
            root.querySelector('#career-articles')?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
        }));
        if (input) input.addEventListener('input', () => update(true));
        for(const name of ['topic']){const select=root.querySelector(`[data-${name}-filter]`);if(select){select.value=Array.from(select.options).some(o=>o.value===params.get(name))?params.get(name):'';select.addEventListener('change',()=>{const url=new URL(location.href);if(select.value)url.searchParams.set(name,select.value);else url.searchParams.delete(name);history.replaceState(history.state,'',url);update(true);});}}
        document.addEventListener('v2-language-change', () => update(false));
        update(false);
    });

    const levels = ['easy', 'basic', 'advanced'];
    function setLevel(level) {
        if (!levels.includes(level)) level = 'basic';
        document.querySelectorAll('[data-depth]').forEach(el => { el.hidden = el.dataset.depth !== level; });
        document.querySelectorAll('[data-reading-levels]').forEach(el => { el.hidden = !el.dataset.readingLevels.split(/\s+/).includes(level); });
        document.querySelectorAll('[data-level]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.level === level)));
        savePreference('eyecode_explanation_level', level);
    }
    if (document.querySelector('[data-level]')) {
        setLevel(readPreference('eyecode_explanation_level') || 'basic');
        document.querySelectorAll('[data-level]').forEach(el => el.addEventListener('click', () => setLevel(el.dataset.level)));
    }
    document.querySelectorAll('[data-copy-code]').forEach(button => button.addEventListener('click', async function () {
        const code = button.closest('.v2-code-block').querySelector('code').textContent;
        try { await navigator.clipboard.writeText(code); button.textContent = currentLanguage === 'en' ? 'Copied' : 'Đã sao chép'; }
        catch (_) { button.textContent = currentLanguage === 'en' ? 'Select text to copy' : 'Chọn nội dung để sao chép'; }
        window.clearTimeout(button.copyReset);
        button.copyReset = window.setTimeout(() => { button.textContent = currentLanguage === 'en' ? 'Copy' : 'Sao chép'; }, 2200);
    }));
}());
