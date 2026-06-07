// ==========================================================================
// ENHANCEMENTS.JS — UI/UX LAYER
// Reading progress bar, scroll-to-top, ambient micro-interactions
// ==========================================================================

// --------------------------------------------------------------------------
// 1. READING PROGRESS BAR
// --------------------------------------------------------------------------
function initReadingProgressBar() {
    let bar = document.getElementById('reading-progress-bar');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'reading-progress-bar';
        document.body.prepend(bar);
    }

    const updateProgress = () => {
        const scrollTop    = window.scrollY || document.documentElement.scrollTop;
        const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
        const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width    = Math.min(progress, 100) + '%';
    };

    window.removeEventListener('scroll', window._progressScrollHandler);
    window._progressScrollHandler = updateProgress;
    window.addEventListener('scroll', window._progressScrollHandler, { passive: true });
    updateProgress();
}

// --------------------------------------------------------------------------
// 2. SCROLL-TO-TOP BUTTON
// --------------------------------------------------------------------------
function initScrollToTop() {
    let btn = document.getElementById('scroll-to-top');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'scroll-to-top';
        btn.setAttribute('aria-label', 'Scroll to top');
        btn.innerHTML = '↑';
        document.body.appendChild(btn);
    }

    const toggleVisibility = () => {
        if (window.scrollY > 350) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    };

    // Remove old listeners to prevent stacking after SPA route changes
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    btn = newBtn;

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.removeEventListener('scroll', window._scrollTopHandler);
    window._scrollTopHandler = toggleVisibility;
    window.addEventListener('scroll', window._scrollTopHandler, { passive: true });
    toggleVisibility();
}

// --------------------------------------------------------------------------
// 3. HERO STAT RIBBON (injected after the carousel on home page)
// --------------------------------------------------------------------------
function injectHeroStatRibbon() {
    const carousel = document.getElementById('chinaHighlightsCarousel');
    if (!carousel || document.getElementById('hero-stat-ribbon')) return;

    const ribbon = document.createElement('div');
    ribbon.id = 'hero-stat-ribbon';
    ribbon.className = 'hero-stat-ribbon';
    ribbon.innerHTML = `
        <div class="container">
            <div class="row text-center gy-2">
                <div class="col-6 col-md-3">
                    <div class="hero-stat-item">
                        <span class="stat-icon">🏯</span>
                        <div class="stat-text">
                            <strong>980</strong> Preserved Buildings
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="hero-stat-item">
                        <span class="stat-icon">🏛️</span>
                        <div class="stat-text">
                            <strong>72 Hectares</strong> Total Area
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="hero-stat-item">
                        <span class="stat-icon">📦</span>
                        <div class="stat-text">
                            <strong>1.8 Million</strong> Artifacts
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="hero-stat-item">
                        <span class="stat-icon">📅</span>
                        <div class="stat-text">
                            <strong>600+ Years</strong> of History
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    carousel.insertAdjacentElement('afterend', ribbon);
}

// --------------------------------------------------------------------------
// 4. IMPERIAL STATS SECTION (injected inside the home main grid container)
// --------------------------------------------------------------------------
function injectImperialStatsSection() {
    const mainEl = document.querySelector('main.container.my-5');
    if (!mainEl || document.getElementById('imperial-stats-section')) return;

    const statsSection = document.createElement('section');
    statsSection.id = 'imperial-stats-section';
    statsSection.className = 'imperial-stats-section mt-0';
    statsSection.innerHTML = `
        <div class="container position-relative">
            <div class="page-header mb-5" style="color:#fff;">
                <div style="font-size:clamp(2.5rem,6vw,5rem);font-weight:900;color:rgba(255,255,255,0.05);font-family:'Noto Serif SC',serif;line-height:1;margin-bottom:-8px;">数字奇迹</div>
                <h2 class="fw-bold font-script text-warning fs-3 mt-1">The Palace in Numbers</h2>
                <p class="small mt-2" style="color:rgba(255,255,255,0.45);max-width:500px;margin:0 auto;">Empirical wonders behind the world's largest surviving imperial palace complex.</p>
                <div class="divider-bar" style="background:var(--imperial-gold);"></div>
            </div>

            <div class="row g-3 justify-content-center">
                <div class="col-6 col-md-4 col-lg-2">
                    <div class="stat-card-imperial" style="--stat-index:0;">
                        <span class="stat-number">1406</span>
                        <span class="stat-label">Construction Began</span>
                        <span class="stat-sub">Ming Dynasty</span>
                    </div>
                </div>
                <div class="col-6 col-md-4 col-lg-2">
                    <div class="stat-card-imperial" style="--stat-index:1;">
                        <span class="stat-number">980</span>
                        <span class="stat-label">Buildings</span>
                        <span class="stat-sub">Preserved structures</span>
                    </div>
                </div>
                <div class="col-6 col-md-4 col-lg-2">
                    <div class="stat-card-imperial" style="--stat-index:2;">
                        <span class="stat-number">8,886</span>
                        <span class="stat-label">Total Rooms</span>
                        <span class="stat-sub">Verified by survey</span>
                    </div>
                </div>
                <div class="col-6 col-md-4 col-lg-2">
                    <div class="stat-card-imperial" style="--stat-index:3;">
                        <span class="stat-number">24</span>
                        <span class="stat-label">Emperors Resided</span>
                        <span class="stat-sub">Ming & Qing eras</span>
                    </div>
                </div>
                <div class="col-6 col-md-4 col-lg-2">
                    <div class="stat-card-imperial" style="--stat-index:4;">
                        <span class="stat-number">1.8M</span>
                        <span class="stat-label">Artifacts Held</span>
                        <span class="stat-sub">Palace Museum</span>
                    </div>
                </div>
                <div class="col-6 col-md-4 col-lg-2">
                    <div class="stat-card-imperial" style="--stat-index:5;">
                        <span class="stat-number">200+</span>
                        <span class="stat-label">Earthquakes Survived</span>
                        <span class="stat-sub">Via Dougong joints</span>
                    </div>
                </div>
            </div>
        </div>`;

    // Insert BEFORE the main section, after the carousel ribbon
    const ribbon = document.getElementById('hero-stat-ribbon');
    const target = ribbon || document.getElementById('chinaHighlightsCarousel');
    if (target) {
        target.insertAdjacentElement('afterend', statsSection);
        // Move main after it
        statsSection.insertAdjacentElement('afterend', mainEl);
    }
}

// --------------------------------------------------------------------------
// 5. SMOOTH IMAGE LAZY LOADING (native + fade-in effect)
// --------------------------------------------------------------------------
function initImageLazyLoad() {
    const imgs = document.querySelectorAll('img:not([loading])');
    imgs.forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.style.opacity = img.complete ? '1' : '0';
        img.style.transition = 'opacity 0.5s ease';
        if (!img.complete) {
            img.addEventListener('load', () => { img.style.opacity = '1'; });
            img.addEventListener('error', () => { img.style.opacity = '0.4'; });
        }
    });
}

// --------------------------------------------------------------------------
// 6. DYNASTY CARD HOVER PARALLAX (subtle tilt on mouse move)
// --------------------------------------------------------------------------
function initCardTiltEffect() {
    const cards = document.querySelectorAll('.dynasty-card-panel');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect   = card.getBoundingClientRect();
            const x      = (e.clientX - rect.left) / rect.width  - 0.5;
            const y      = (e.clientY - rect.top)  / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x * 3}deg) rotateX(${-y * 2}deg) translateZ(4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
}

// --------------------------------------------------------------------------
// 7. SECTION DIVIDERS — inject between timeline blocks on non-history pages
// --------------------------------------------------------------------------
function injectSectionDividers() {
    const rows = document.querySelectorAll('.festival-editorial-row');
    rows.forEach((row, i) => {
        if (i < rows.length - 1) {
            const div = document.createElement('div');
            div.className = 'section-divider-imperial';
            div.innerHTML = '<span>✦</span>';
            row.insertAdjacentElement('afterend', div);
        }
    });
}

// --------------------------------------------------------------------------
// 8. ACTIVE NAV HIGHLIGHT on scroll (for architecture page)
// --------------------------------------------------------------------------
function initActiveNavOnScroll() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        const clean = href.replace(/^.*\//, '/');
        const currentPath = window.location.pathname.replace(/^\/Tubes-Webdas/, '');
        if (clean === currentPath || (currentPath === '/' && href.endsWith('/'))) {
            link.classList.add('active');
        }
    });
}

// --------------------------------------------------------------------------
// MASTER INIT — called after every SPA route render
// --------------------------------------------------------------------------
function initAllEnhancements() {
    initReadingProgressBar();
    initScrollToTop();
    initImageLazyLoad();
    initCardTiltEffect();
    initActiveNavOnScroll();

    // Home-page-specific injections
    if (document.getElementById('chinaHighlightsCarousel')) {
        setTimeout(() => {
            injectHeroStatRibbon();
            injectImperialStatsSection();
            // Re-observe new stat cards
            initTimelineScrollObserver();
        }, 50);
    }

    // Editorial pages
    if (document.querySelectorAll('.festival-editorial-row').length > 0) {
        injectSectionDividers();
    }
}