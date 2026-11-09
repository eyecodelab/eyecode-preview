(function () {
    const headerTranslations = {
        en: {
            home: 'Home',
            about: 'About Us',
            services: 'Expertise',
            careers: 'Careers',
            course: 'Training & Internship',
            blog: 'Technology Blog',
            contact: 'Contact',
            'footer-explore': 'Explore',
            'footer-office': 'Office',
            'footer-contact': 'Contact'
        },
        vi: {
            home: 'Trang Chủ',
            about: 'Giới Thiệu',
            services: 'Năng Lực',
            careers: 'Tuyển Dụng',
            course: 'Đào Tạo & Thực Tập',
            blog: 'Blog Công Nghệ',
            contact: 'Liên Hệ',
            'footer-explore': 'Khám phá',
            'footer-office': 'Văn phòng',
            'footer-contact': 'Liên hệ'
        }
    };

    function applySharedLanguage(lang) {
        const selectedLanguage = headerTranslations[lang] ? lang : 'vi';
        localStorage.setItem('language', selectedLanguage);
        document.querySelectorAll('.header [data-i18n], .site-footer [data-i18n]').forEach(function (element) {
            const translation = headerTranslations[selectedLanguage][element.dataset.i18n];
            if (translation) element.textContent = translation;
        });
        const currentLanguage = document.getElementById('lang-current');
        if (currentLanguage) currentLanguage.textContent = selectedLanguage.toUpperCase();
    }

    function standardizeFooter() {
        const footer = document.querySelector('.footer, .program-footer, [data-site-footer]');
        if (!footer) return;

        footer.outerHTML = '<footer class="site-footer"><div class="site-footer-main"><div class="site-footer-brand"><p>We make technology work for you.</p></div><nav class="site-footer-nav" aria-label="Footer navigation"><h2 data-i18n="footer-explore">Explore</h2><a href="/" data-i18n="home">Home</a><a href="course.html" data-i18n="course">Training &amp; Internship</a><a href="careers.html" data-i18n="careers">Careers</a><a href="/#contact" data-i18n="contact">Contact</a></nav><div class="site-footer-office"><h2 data-i18n="footer-office">Office</h2><div class="footer-office-item"><strong>Ho Chi Minh City</strong><p>95 Nguyen Cong Tru, Sai Gon Ward,<br>Ho Chi Minh City, Vietnam</p></div><div class="footer-office-item"><strong>Da Nang</strong><p>85 Tran Phu, Hai Chau, Da Nang, Vietnam</p></div><div class="footer-office-item"><strong>Ha Noi</strong><p>239 Xuan Thuy, Cau Giay, Ha Noi, Vietnam</p></div></div><div class="site-footer-contact"><h2 data-i18n="footer-contact">Contact</h2><a href="mailto:eyecode@eyecodetech.com">eyecode@eyecodetech.com</a><a href="https://www.facebook.com/eyecodetech.co" target="_blank" rel="noopener noreferrer">EyeCode Tech</a></div></div><div class="site-footer-bottom">Copyright &copy; 2026 EyeCode Tech. All Rights Reserved.</div></footer>';
    }

    document.addEventListener('DOMContentLoaded', function () {
        standardizeFooter();
        const pageChangeLanguage = window.changeLanguage;
        window.changeLanguage = function (lang) {
            const selectedLanguage = headerTranslations[lang] ? lang : 'vi';
            if (typeof pageChangeLanguage === 'function') {
                pageChangeLanguage(selectedLanguage);
            }
            applySharedLanguage(selectedLanguage);
        };
        window.setLanguage = window.changeLanguage;
        window.changeLanguage(localStorage.getItem('language') || 'vi');
    });
}());
