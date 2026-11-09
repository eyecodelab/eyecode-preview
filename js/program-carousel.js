$(document).ready(function () {
    const carousel = $('.cohort-slides');
    if (!carousel.length || !$.fn.owlCarousel) return;

    const container = carousel.closest('.cohort-carousel');
    const dots = container.find('[data-cohort-slide]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    carousel.on('initialized.owl.carousel changed.owl.carousel', function (event) {
        if (!event.item || event.item.index == null) return;
        const index = event.relatedTarget.relative(event.item.index);
        dots.each(function (position) {
            this.setAttribute('aria-pressed', String(position === index));
        });
        container.find('.cohort-slide-status').text((index + 1) + ' / ' + dots.length);
    });

    carousel.owlCarousel({
        items: 1,
        loop: false,
        rewind: true,
        margin: 0,
        nav: false,
        dots: false,
        autoplay: false,
        mouseDrag: true,
        touchDrag: true,
        smartSpeed: reducedMotion ? 0 : 300
    });

    // Owl 2.2.1 can lose its autoplay timer during a long hover. Keep one
    // resettable timer here while reusing Owl for navigation and touch gestures.
    let autoplayTimer;
    let hovering = false;
    let touching = false;
    function resetAutoplay() {
        window.clearTimeout(autoplayTimer);
        if (hovering || touching || document.hidden) return;
        autoplayTimer = window.setTimeout(function () {
            carousel.trigger('next.owl.carousel');
            resetAutoplay();
        }, 4000);
    }

    container.on('mouseenter', function () {
        hovering = window.matchMedia('(hover: hover)').matches;
        resetAutoplay();
    }).on('mouseleave', function () {
        hovering = false;
        resetAutoplay();
    }).on('touchstart', function () {
        touching = true;
        resetAutoplay();
    }).on('touchend touchcancel', function () {
        touching = false;
        resetAutoplay();
    });
    carousel.on('dragged.owl.carousel', resetAutoplay);
    document.addEventListener('visibilitychange', resetAutoplay);
    resetAutoplay();

    container.find('.cohort-carousel-controls').prop('hidden', false);
    container.find('[data-cohort-direction]').on('click', function () {
        carousel.trigger(this.dataset.cohortDirection + '.owl.carousel');
        resetAutoplay();
    });
    dots.on('click', function () {
        carousel.trigger('to.owl.carousel', [Number(this.dataset.cohortSlide)]);
        resetAutoplay();
    });
    container.on('keydown', function (event) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        carousel.trigger((event.key === 'ArrowLeft' ? 'prev' : 'next') + '.owl.carousel');
        resetAutoplay();
    });
});
