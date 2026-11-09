(function () {
    'use strict';
    const layout = document.querySelector('.v2-article-layout');
    if (!layout) return;
    document.documentElement.classList.add('v2-reading-ready');
    const article = layout.querySelector('.v2-article-content');
    const toolbar = document.querySelector('.v2-article-tools');
    const header = document.querySelector('.v2-header');
    const backdrop = document.querySelector('[data-reading-backdrop]');
    const outline = document.querySelector('[data-reading-outline]');
    const desktop = window.matchMedia('(min-width: 1200px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const panels = {topic: document.getElementById('v2-topic-panel'), toc: document.getElementById('v2-toc-panel')};
    const toggles = Object.fromEntries(Array.from(toolbar.querySelectorAll('[data-reading-toggle]'), button => [button.dataset.readingToggle, button]));
    const desktopOpen = {topic: true, toc: true};
    let compactOpen = null;
    let headings = [];
    let signature = '';
    let activeId = '';
    let preferredId = '';
    let frame = 0;
    let outlineFrame = 0;

    const readingOffset = () => header.getBoundingClientRect().height + toolbar.getBoundingClientRect().height + 20;
    function revealCurrentTopic() {
        if (panels.topic.hidden) return;
        const current = panels.topic.querySelector('a[aria-current="page"]');
        if (!current || !current.getClientRects().length) return;
        const bounds = panels.topic.getBoundingClientRect();
        const item = current.getBoundingClientRect();
        if (item.bottom > bounds.bottom - 12) panels.topic.scrollTop += item.bottom - bounds.bottom + 12;
        else if (item.top < bounds.top + 12) panels.topic.scrollTop -= bounds.top + 12 - item.top;
    }
    function syncPanels() {
        for (const name of Object.keys(panels)) {
            const open = desktop.matches ? desktopOpen[name] : compactOpen === name;
            panels[name].hidden = !open;
            layout.dataset[name + 'Open'] = String(open);
            toggles[name].setAttribute('aria-expanded', String(open));
            if (desktop.matches) panels[name].removeAttribute('role');
            else panels[name].setAttribute('role', 'dialog');
        }
        backdrop.hidden = desktop.matches || !compactOpen;
        document.body.classList.toggle('v2-reading-panel-open', !desktop.matches && Boolean(compactOpen));
        activeId = '';
        window.requestAnimationFrame(revealCurrentTopic);
        scheduleActive();
    }
    function closeCompact(restoreFocus) {
        if (!compactOpen) return;
        const name = compactOpen;
        compactOpen = null;
        syncPanels();
        if (restoreFocus) toggles[name].focus({preventScroll: true});
    }
    for (const [name, button] of Object.entries(toggles)) {
        button.addEventListener('click', () => {
            if (desktop.matches) desktopOpen[name] = !desktopOpen[name];
            else compactOpen = compactOpen === name ? null : name;
            syncPanels();
            if (!desktop.matches && compactOpen) {
                const current = panels[name].querySelector('a[aria-current]');
                if (current) current.closest('.v2-topic-group')?.setAttribute('open', '');
                (current || panels[name].querySelector('a, button')).focus({preventScroll: true});
                if (name === 'topic') revealCurrentTopic();
            }
        });
        panels[name].querySelector('[data-reading-close]').addEventListener('click', () => closeCompact(true));
    }
    backdrop.addEventListener('click', () => closeCompact(true));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && compactOpen) { event.preventDefault(); closeCompact(true); }
    });
    // Compact panels are non-modal: the toolbar/header remain available, and moving
    // keyboard focus outside closes the panel instead of trapping the reader.
    document.addEventListener('focusin', event => {
        if (compactOpen && !panels[compactOpen].contains(event.target) && !toolbar.contains(event.target)) closeCompact(false);
    });
    document.addEventListener('click', event => {
        if (compactOpen && !panels[compactOpen].contains(event.target) && !toolbar.contains(event.target)) closeCompact(false);
    });
    desktop.addEventListener('change', () => {
        const focusedPanel = Object.keys(panels).find(name => panels[name].contains(document.activeElement));
        compactOpen = null;
        syncPanels();
        if (focusedPanel && panels[focusedPanel].hidden) toggles[focusedPanel].focus({preventScroll: true});
        refreshOutline();
    });

    function uniqueHeadingId(heading) {
        if (heading.id && document.getElementById(heading.id) === heading) return heading.id;
        const slug = heading.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd')
            .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
        const base = 'heading-' + slug;
        let id = base;
        let suffix = 2;
        while (document.getElementById(id)) id = base + '-' + suffix++;
        heading.id = id;
        return id;
    }
    function refreshOutline() {
        const all = Array.from(article.querySelectorAll('h2, h3'));
        all.forEach(uniqueHeadingId);
        headings = all.filter(heading => !heading.closest('[hidden]') && heading.getClientRects().length).map(heading => {
            const section = heading.closest('.v2-article-section[id]');
            const firstVisibleH2 = section && Array.from(section.querySelectorAll('h2')).find(h2 => !h2.closest('[hidden]'));
            return {heading, id: heading === firstVisibleH2 ? section.id : heading.id, level: heading.tagName.slice(1), title: heading.textContent.trim()};
        });
        const nextSignature = JSON.stringify(headings.map(({id, level, title}) => [id, level, title]));
        if (signature !== nextSignature) {
            signature = nextSignature;
            const fragment = document.createDocumentFragment();
            headings.forEach(({id, level, title}) => {
                const item = document.createElement('li');
                item.dataset.headingLevel = level;
                const link = document.createElement('a');
                link.setAttribute('href', '#' + id);
                link.textContent = title;
                item.append(link);
                fragment.append(item);
            });
            outline.replaceChildren(fragment);
            activeId = '';
        }
        scheduleActive();
    }
    function updateActive() {
        frame = 0;
        if (!headings.length) return;
        const threshold = readingOffset() + 8;
        let active = headings[0];
        let activeTop = -Infinity;
        for (const entry of headings) {
            const top = entry.heading.getBoundingClientRect().top;
            if (top > threshold) break;
            // Comparison cards can place two H3s on the same row. Preserve the
            // explicitly selected heading instead of always marking the last one.
            if (top > activeTop + 1 || (Math.abs(top - activeTop) <= 1 && entry.id === preferredId)) {
                active = entry;
                activeTop = top;
            }
        }
        // A short final section may hit the document's scroll limit before its
        // heading reaches the toolbar. Keep the explicitly selected, visible
        // heading active when the browser cannot scroll any further.
        if (preferredId && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight) {
            const preferred = headings.find(entry => entry.id === preferredId);
            if (preferred && preferred.heading.getBoundingClientRect().top > threshold
                && preferred.heading.getBoundingClientRect().top < window.innerHeight) active = preferred;
        }
        if (active.id === activeId) return;
        activeId = active.id;
        outline.querySelectorAll('a').forEach(link => {
            const current = link.getAttribute('href') === '#' + activeId;
            if (current) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
            // Scroll only the navigation panel, never the article, to expose its active item.
            if (current && !panels.toc.hidden) {
                const bounds = panels.toc.getBoundingClientRect();
                const item = link.getBoundingClientRect();
                if (item.bottom > bounds.bottom - 12) panels.toc.scrollTop += item.bottom - bounds.bottom + 12;
                else if (item.top < bounds.top + 48) panels.toc.scrollTop -= bounds.top + 48 - item.top;
            }
        });
    }
    function scheduleActive() {
        if (!frame) frame = window.requestAnimationFrame(updateActive);
    }
    function goToHeading(target, smooth, focus) {
        const entry = headings.find(({id, heading}) => id === target.id || heading === target);
        const heading = entry ? entry.heading : target;
        if (heading.closest('[hidden]')) return;
        if (entry) preferredId = entry.id;
        closeCompact(false);
        if (focus) {
            heading.setAttribute('tabindex', '-1');
            heading.focus({preventScroll: true});
        }
        window.scrollTo({top: Math.max(0, heading.getBoundingClientRect().top + window.scrollY - readingOffset()), behavior: smooth && !reducedMotion.matches ? 'smooth' : 'instant'});
    }
    outline.addEventListener('click', event => {
        const link = event.target.closest('a');
        if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
        if (!target) return;
        event.preventDefault();
        if (location.hash !== link.hash) history.pushState(history.state, '', link.hash);
        goToHeading(target, true, true);
    });
    function alignHash() {
        let id;
        try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
        const target = id && document.getElementById(id);
        if (target && article.contains(target)) window.requestAnimationFrame(() => goToHeading(target, false, false));
    }
    // Reuse existing language/depth switching. Observe its rendered result, including
    // future headings nested inside depth variants, rather than duplicating that logic.
    const observer = new MutationObserver(() => {
        if (!outlineFrame) outlineFrame = window.requestAnimationFrame(() => { outlineFrame = 0; refreshOutline(); });
    });
    observer.observe(article, {subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['hidden']});
    const sizeObserver = new ResizeObserver(() => {
        document.body.style.setProperty('--v2-article-toolbar-height', toolbar.getBoundingClientRect().height + 'px');
        scheduleActive();
    });
    sizeObserver.observe(toolbar);
    sizeObserver.observe(article);
    window.addEventListener('scroll', scheduleActive, {passive: true});
    window.addEventListener('resize', scheduleActive);
    window.addEventListener('hashchange', alignHash);
    window.addEventListener('load', alignHash);
    syncPanels();
    refreshOutline();
    if (document.fonts) document.fonts.ready.then(revealCurrentTopic);
    if (document.readyState === 'complete') alignHash();
}());
