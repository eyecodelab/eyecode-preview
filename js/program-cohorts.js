(function () {
    const BASE_START_DATE = '2026-09-28';
    const INTERVAL_DAYS = 8 * 7;
    const DAY_MS = 24 * 60 * 60 * 1000;
    const VIETNAM_TIME_ZONE = 'Asia/Ho_Chi_Minh';

    function getVietnamDate(date) {
        if (typeof date === 'string') {
            const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
            if (!match) throw new TypeError('Expected a YYYY-MM-DD date string.');
            return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
        }

        const sourceDate = date instanceof Date ? date : new Date();
        if (Number.isNaN(sourceDate.getTime())) throw new TypeError('Expected a valid date.');
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: VIETNAM_TIME_ZONE,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).formatToParts(sourceDate);
        const values = {};
        parts.forEach(function (part) {
            if (part.type !== 'literal') values[part.type] = Number(part.value);
        });
        return { year: values.year, month: values.month, day: values.day };
    }

    function getAdvertisedCohort(asOfDate) {
        const today = getVietnamDate(asOfDate);
        const [baseYear, baseMonth, baseDay] = BASE_START_DATE.split('-').map(Number);
        const baseUtc = Date.UTC(baseYear, baseMonth - 1, baseDay);
        const todayUtc = Date.UTC(today.year, today.month - 1, today.day);
        const daysSinceBase = Math.floor((todayUtc - baseUtc) / DAY_MS);
        const cohortIndex = daysSinceBase < 0 ? 0 : Math.floor(daysSinceBase / INTERVAL_DAYS) + 1;
        const cohortDate = new Date(baseUtc + cohortIndex * INTERVAL_DAYS * DAY_MS);
        const year = cohortDate.getUTCFullYear();
        const month = cohortDate.getUTCMonth() + 1;
        const day = cohortDate.getUTCDate();
        const pad = function (value) { return String(value).padStart(2, '0'); };

        return {
            startDate: year + '-' + pad(month) + '-' + pad(day),
            displayDate: pad(day) + '/' + pad(month) + '/' + year,
            monthYear: pad(month) + '/' + year,
            analyticsId: 'ai_research_' + year + pad(month)
        };
    }

    function updateDateElements() {
        const cohort = getAdvertisedCohort();
        document.querySelectorAll('[data-cohort-date]').forEach(function (element) {
            element.textContent = cohort.displayDate;
        });
    }

    window.EyeCodeProgramCohorts = {
        baseStartDate: BASE_START_DATE,
        intervalWeeks: 8,
        timeZone: VIETNAM_TIME_ZONE,
        getAdvertisedCohort: getAdvertisedCohort
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateDateElements);
    } else {
        updateDateElements();
    }
    window.setInterval(updateDateElements, 60 * 1000);
}());