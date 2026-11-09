(function () {
    // Keep these URLs independent: they represent two separate application pathways.
    const RESEARCH_INTERNSHIP_FORM_URL = 'https://forms.gle/rcUdxac672b1rxYj9';
    const TRAINING_INTERNSHIP_FORM_URL = 'https://forms.gle/K93pWCMpfXfk7P1b7';

    const formUrls = {
        researchInternship: RESEARCH_INTERNSHIP_FORM_URL,
        trainingInternship: TRAINING_INTERNSHIP_FORM_URL
    };

    document.querySelectorAll('[data-form-key]').forEach(function (link) {
        const formUrl = formUrls[link.dataset.formKey];
        if (formUrl) {
            link.href = formUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            return;
        }

        link.setAttribute('aria-disabled', 'true');
        link.addEventListener('click', function (event) {
            event.preventDefault();
        });
    });

    if (document.body.classList.contains('ai-program-page')) {
        const referral = window.EyeCodeReferral;
        const applicationLinks = Array.from(document.querySelectorAll('a')).filter(function (link) {
            return link.dataset.formKey === 'trainingInternship'
                || link.href === TRAINING_INTERNSHIP_FORM_URL;
        });
        function refreshLinks() {
            applicationLinks.forEach(function (link) {
                link.href = referral ? referral.applicationUrl(TRAINING_INTERNSHIP_FORM_URL) : TRAINING_INTERNSHIP_FORM_URL;
            });
        }
        refreshLinks();
        window.addEventListener('pageshow', refreshLinks);
        window.addEventListener('focus', refreshLinks);
        window.addEventListener('storage', refreshLinks);

        function onApply(event) {
            const link = event.target.closest && event.target.closest('a');
            if (!applicationLinks.includes(link)) return;
            // Recheck expiry at activation, including a tab left open for over 30 days.
            refreshLinks();
            if (link.href !== TRAINING_INTERNSHIP_FORM_URL) {
                // Keep prefilled URLs out of automatic outbound-click analytics.
                // Default anchor navigation (including modifier clicks) still works.
                event.stopImmediatePropagation();
            }
            const query = new URLSearchParams(window.location.search);
            const cohort = window.EyeCodeProgramCohorts
                ? window.EyeCodeProgramCohorts.getAdvertisedCohort()
                : null;
            const eventParameters = {
                program: cohort ? cohort.analyticsId : 'ai_research_training_internship',
                page_path: window.location.pathname,
                link_url: TRAINING_INTERNSHIP_FORM_URL,
                utm_source: query.get('utm_source') || '',
                utm_medium: query.get('utm_medium') || '',
                utm_campaign: query.get('utm_campaign') || '',
                utm_content: query.get('utm_content') || ''
            };
            const sendEvent = typeof window.gtag === 'function' ? window.gtag : function () {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push(arguments);
            };
            sendEvent('event', 'apply_click', eventParameters);
        }
        window.addEventListener('click', onApply, true);
        window.addEventListener('auxclick', onApply, true);
        window.addEventListener('contextmenu', refreshLinks, true);
    }
}());
