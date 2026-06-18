function initTimelineScrollObserver() {
    const blocks = document.querySelectorAll(".timeline-block");
    if (blocks.length === 0) return;

    const observerOptions = { 
        root: null, 
        rootMargin: "0px 0px -12% 0px", 
        threshold: 0.08 
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("scroll-visible");
            }
        });
    }, observerOptions);

    blocks.forEach((block) => revealObserver.observe(block));
}

let lastScrollTop = 0;

function initSmartNavbarScroll() {
    const navbar = document.querySelector('.navbar-custom');
    if (!navbar) return;

    lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    window.removeEventListener('scroll', window._navbarScrollHandler);

    window._navbarScrollHandler = () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll <= 90) {
            navbar.classList.remove('nav-fade-out');
            return;
        }

        if (currentScroll > lastScrollTop) {
            navbar.classList.remove('nav-fade-out');
        } else {
            navbar.classList.add('nav-fade-out');
        }
        lastScrollTop = currentScroll;
    };

    window.addEventListener('scroll', window._navbarScrollHandler, { passive: true });
}

function initTimelineScrollSpy() {
    const blocks = document.querySelectorAll('.timeline-block'); 
    const tabAnchors = document.querySelectorAll('.era-scroll-wrapper .era-tab-link');
    
    if (blocks.length === 0 || tabAnchors.length === 0) return;

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                if (!currentId) return;

                tabAnchors.forEach(tab => {
                    const href = tab.getAttribute('href');
                    if (href === `#${currentId}`) {
                        tab.classList.add('active');
                        
                        tab.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest', 
                            inline: 'center' 
                        });
                    } else {
                        tab.classList.remove('active');
                    }
                });
            }
        });
    }, { root: null, rootMargin: '-150px 0px -60% 0px', threshold: 0 });

    blocks.forEach(block => spyObserver.observe(block));
}

function initCarouselAutoPlay() {
    const carouselElement = document.querySelector('#chinaHighlightsCarousel');
    if (!carouselElement) return;

    if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
        const instance = bootstrap.Carousel.getInstance(carouselElement) || new bootstrap.Carousel(carouselElement, {
            interval: 5000,
            ride: 'carousel',
            pause: 'hover'
        });
        instance.cycle();

        carouselElement.addEventListener('slide.bs.carousel', function (e) {
            const nextCaption = e.relatedTarget.querySelector('.carousel-caption-card');
            if (nextCaption) {
                nextCaption.style.animation = 'none';
                nextCaption.style.opacity = '0';
            }
        });

        carouselElement.addEventListener('slid.bs.carousel', function (e) {
            const activeCaption = e.relatedTarget.querySelector('.carousel-caption-card');
            if (activeCaption) {
                void activeCaption.offsetWidth; 
                activeCaption.style.animation = '';
            }
        });
    }
}