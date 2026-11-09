(function () {
    const careerTranslations = {
    "vi": {
        "marketing-eyebrow": "MARKETING INTERNSHIP",
        "marketing-title": "Marketing Internship — Technology & Education",
        "marketing-description": "Dành cho sinh viên muốn có trải nghiệm thực tế về Digital Marketing, Content, Social Media, phát triển cộng đồng và các hoạt động marketing trong môi trường công nghệ.",
        "marketing-format": "Remote Internship",
        "marketing-apply": "Ứng tuyển Marketing Internship",
        "research-pathway-label": "RESEARCH INTERNSHIP",
        "research-title": "Thực tập Nghiên cứu AI & Robotics",
        "research-desc": "Dành cho ứng viên có nền tảng tốt về AI, Computer Vision, Robotics hoặc các lĩnh vực liên quan và sẵn sàng tham gia trực tiếp vào các research projects tại EyeCode Tech.",
        "research-selection": "Ứng viên được đánh giá dựa trên nền tảng kỹ thuật, kinh nghiệm research, technical skills và mức độ phù hợp với từng research project.",
        "research-cta": "Ứng tuyển Research Internship",
        "training-pathway-label": "TRAINING + INTERNSHIP · 8 TUẦN",
        "program-heading": "Chương trình Đào tạo Nghiên cứu AI & Robotics kết hợp Thực tập",
        "program-desc": "Chương trình 8 tuần dành cho sinh viên muốn xây dựng nền tảng AI Research thông qua training, research project thực tế, mentoring hàng tuần và project review tại EyeCode Tech.",
        "program-highlight-training": "Đào tạo AI Research & Research Methodology",
        "program-highlight-mentoring": "Weekly Mentoring & Project Review",
        "program-highlight-project": "Research Project thực tế",
        "program-highlight-confirmation": "Hỗ trợ xác nhận quá trình thực tập sau khi hoàn thành yêu cầu chương trình",
        "program-cta": "Xem chương trình Training + Internship"
    },
    "en": {
        "marketing-eyebrow": "MARKETING INTERNSHIP",
        "marketing-title": "Marketing Internship — Technology & Education",
        "marketing-description": "For students who want hands-on experience in Digital Marketing, Content, Social Media, community development, and marketing activities in a technology-focused environment.",
        "marketing-format": "Remote Internship",
        "marketing-apply": "Apply for Marketing Internship",
        "research-pathway-label": "RESEARCH INTERNSHIP",
        "research-title": "AI & Robotics Research Internship",
        "research-desc": "For candidates with a strong foundation in AI, Computer Vision, Robotics, or related fields who are ready to contribute directly to research projects at EyeCode Tech.",
        "research-selection": "Candidates are evaluated based on technical background, research experience, technical skills, and fit with each research project.",
        "research-cta": "Apply for Research Internship",
        "training-pathway-label": "TRAINING + INTERNSHIP · 8 WEEKS",
        "program-heading": "AI & Robotics Research Training + Internship Program",
        "program-desc": "An 8-week structured program for students who want to build AI Research foundations through research training, real projects, weekly mentoring, and project review at EyeCode Tech.",
        "program-highlight-training": "AI Research Training & Methodology",
        "program-highlight-mentoring": "Weekly Mentoring & Project Review",
        "program-highlight-project": "Real Research Project",
        "program-highlight-confirmation": "Internship Process Confirmation Support After Completing Program Requirements",
        "program-cta": "View Training + Internship Program"
    }
};
    const existingChangeLanguage = window.changeLanguage;
    window.changeLanguage = function (lang) {
        const selectedLanguage = careerTranslations[lang] ? lang : 'vi';
        if (typeof existingChangeLanguage === 'function') existingChangeLanguage(selectedLanguage);
        document.querySelectorAll('.research-internship-card [data-i18n], .training-career-card [data-i18n]').forEach(function (element) {
            const value = careerTranslations[selectedLanguage][element.dataset.i18n];
            if (value) element.textContent = value;
        });
    };
    document.querySelectorAll('#ai-research-intern, #marketing-intern, #ai-research-training').forEach(function (card) {
        card.addEventListener('click', function (event) {
            // Leave nested links and controls to their normal navigation behavior.
            if (event.target.closest('a, button, input, select, textarea, [contenteditable]')) return;
            const hash = '#' + card.id;
            if (window.location.hash !== hash) {
                window.history.pushState(window.history.state, '', hash);
            }
        });
    });
    // header-i18n.js initializes this handler with the saved language and wraps it.
}());
