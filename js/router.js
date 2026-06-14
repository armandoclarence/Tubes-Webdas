// Base Subfolder Registry Configuration Mapping Mappings
const routes = {
    "/": { title: "紫禁城 | Home", template: "home" },
    "/history": { title: "紫禁城 | History", template: "history.html" },
    "/architecture": { title: "紫禁城 | Architecture", template: "architecture.html" },
    "/festival": { title: "紫禁城 | Festival", template: "festival.html" },
    "/life": { title: "紫禁城 | Court Life", template: "life.html" },
    "/faq": { title: "紫禁城 | Frequently Asked Questions", template: "faq.html" }
};

// Automatically evaluates context directory prefixes (GitHub Repositories vs Localhost)
function getBaseBasenamePrefix() {
    const path = window.location.pathname;
    if (path.includes('/Tubes-Webdas')) {
        return '/Tubes-Webdas';
    }
    return '';
}

// Pure JS App Shell Layout Dynamic Injection Configuration Engine
function injectGlobalLayoutComponents() {
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");
    const basePrefix = getBaseBasenamePrefix();
    
    let currentRoute = window.location.pathname;
    if (basePrefix && currentRoute.startsWith(basePrefix)) {
        currentRoute = currentRoute.slice(basePrefix.length);
    }
    if (!currentRoute) currentRoute = "/";

    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top shadow">
            <div class="container">
                <a class="navbar-brand fw-bold fs-4" href="${basePrefix}/">🏯 紫禁城 <span class="fs-6 fw-normal text-gold">The Forbidden City</span></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span class="navbar-toggler-icon" style="filter: invert(1);"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        <li class="nav-item mx-1">
                            <a class="nav-link ${currentRoute === '/' ? 'active' : ''}" href="${basePrefix}/">Home</a>
                        </li>
                        <li class="nav-item mx-1">
                            <a class="nav-link ${currentRoute === '/history' ? 'active' : ''}" href="${basePrefix}/history">History</a>
                        </li>
                        <li class="nav-item mx-1">
                            <a class="nav-link ${currentRoute === '/architecture' ? 'active' : ''}" href="${basePrefix}/architecture">Architecture</a>
                        </li>
                        <li class="nav-item mx-1">
                            <a class="nav-link ${currentRoute === '/festival' ? 'active' : ''}" href="${basePrefix}/festival">Festival</a>
                        </li>
                        <li class="nav-item mx-1">
                            <a class="nav-link ${currentRoute === '/life' ? 'active' : ''}" href="${basePrefix}/life">Court Life</a>
                        </li>
                        <li class="nav-item mx-1">
                            <a class="nav-link ${currentRoute === '/faq' ? 'active' : ''}" href="${basePrefix}/faq">FAQ</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>`;
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
        <footer class="text-center py-4 text-white mt-auto footer-custom">
            <div class="container-fluid px-4">
                <p class="mb-0 small">© 2026 Forbidden City Cultural Exploration Space. All Rights Reserved.</p>
            </div>
        </footer>`;
    }
}

// Bidirectional Timeline Scroll Observer Engine
function initTimelineScrollObserver() {
    const blocks = document.querySelectorAll('.timeline-block');
    if (blocks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px', 
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
            } else {
                entry.target.classList.remove('scroll-visible');
            }
        });
    }, observerOptions);

    blocks.forEach(block => observer.observe(block));
}

// Custom internal page offset scroll tracker for timeline panels
function initAnchorScrollOffsets() {
    const anchors = document.querySelectorAll('.timeline-nav-scroll a');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Combined Navbar (~60px) + Sticky Timeline Ribbon (~52px) + Padding (~18px)
                const combinedNavbarHeights = 130;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - combinedNavbarHeights;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// Master Location Change Router Engine Loop
async function handleLocationChange() {
    const loadingScreen = document.getElementById("loading-screen");
    const contentView = document.getElementById("content-view");
    
    if (loadingScreen) {
        loadingScreen.classList.remove("fade-hide");
    }

    const basePrefix = getBaseBasenamePrefix();
    const urlParams = new URLSearchParams(window.location.search);
    const redirectedPath = urlParams.get('p');

    if (redirectedPath) {
        let targetCleanUrl = basePrefix + '/' + redirectedPath.replace(/\/+/g, '/');
        targetCleanUrl = targetCleanUrl.replace(/\/+/g, '/');
        window.history.replaceState({}, "", targetCleanUrl);
    }

    let cleanPath = window.location.pathname;
    if (basePrefix && cleanPath.startsWith(basePrefix)) {
        cleanPath = cleanPath.slice(basePrefix.length);
    }
    if (!cleanPath) cleanPath = "/";

    if (!routes[cleanPath]) {
        cleanPath = "/";
    }

    const route = routes[cleanPath];
    document.title = route.title;

    if (!contentView) return;

    await new Promise(resolve => setTimeout(resolve, 400));

    if (route.template === "home") {
        contentView.innerHTML = renderHomeDashboard();
    } else {
        try {
            const response = await fetch(`${basePrefix}/content/${route.template}`);
            if (!response.ok) throw new Error("File stream read issue.");
            let rawHtml = await response.text();
            
            if (basePrefix) {
                rawHtml = rawHtml.replace(/src="\/img\//g, `src="${basePrefix}/img/`);
                rawHtml = rawHtml.replace(/src="img\//g, `src="${basePrefix}/img/`);
            }
            
            contentView.innerHTML = rawHtml;
        } catch (error) {
            contentView.innerHTML = `
            <div class="container my-5 text-center">
                <div class="content-container animate-route-in">
                    <h2 class="text-danger fw-bold font-script">View Error 404</h2>
                    <p class="lead text-muted">Failed to locate or stream the requested page channel.</p>
                </div>
            </div>`;
        }
    }

    injectGlobalLayoutComponents();
    initTimelineScrollObserver();
    initAnchorScrollOffsets();
    
    if (loadingScreen) {
        loadingScreen.classList.add("fade-hide");
    }
}

// Catch layout link click activities globally
document.body.addEventListener("click", (e) => {
    const targetLink = e.target.closest("a");
    if (targetLink && targetLink.getAttribute("href")) {
        let href = targetLink.getAttribute("href");
        const basePrefix = getBaseBasenamePrefix();
        
        if (href.startsWith('#')) return;
        if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

        e.preventDefault();

        if (basePrefix && href.startsWith(basePrefix)) {
            href = href.slice(basePrefix.length);
        }
        if (!href.startsWith('/')) href = '/' + href;

        window.history.pushState({}, "", basePrefix + href);
        handleLocationChange();
    }
});

window.addEventListener("popstate", handleLocationChange);
window.addEventListener("DOMContentLoaded", handleLocationChange);

function renderHomeDashboard() {
    const basePrefix = getBaseBasenamePrefix();
    return `
    <section id="chinaHighlightsCarousel" class="carousel slide carousel-fade shadow animate-route-in" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide-to="0" class="active"></button>
            <button type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide-to="2"></button>
            <button type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide-to="3"></button>
            <button type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide-to="4"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item carousel-custom-item active" data-bs-interval="4500">
                <img src="${basePrefix}/img/festival2.jpeg" alt="Lunar New Year">
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">The Grandest Celebration</span>
                        <h2 class="h3 h1-md fw-bold mb-2">1. The Lunar New Year (Spring Festival)</h2>
                        <p class="small text-light">Experience China's most significant cultural festival. Marked by dragon dances, family reunions, and vibrant decorations, it fills the nation with joy.</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
            <div class="carousel-item carousel-custom-item" data-bs-interval="4500">
                <img src="${basePrefix}/img/foto1.jpeg" alt="Lantern Festival">
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">A Sea of Lights</span>
                        <h2 class="h3 h1-md fw-bold mb-2">2. The Lantern Festival</h2>
                        <p class="small text-light">Concluding the New Year celebrations, thousands of glowing silk lanterns are lit along the palace corridors. This display symbolizes reconciliation, peace, and renewal.</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
            <div class="carousel-item carousel-custom-item" data-bs-interval="4500">
                <img src="${basePrefix}/img/foto3.jpeg" alt="Mid Autumn Festival">
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Harvest & Reunion</span>
                        <h2 class="h3 h1-md fw-bold mb-2">3. The Mid-Autumn Festival</h2>
                        <p class="small text-light">A beautiful celebration dedicated to the full moon and harvest reflections. Families gather to admire the moon, light paper decorations, and share sweet mooncakes.</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
            <div class="carousel-item carousel-custom-item" data-bs-interval="4500">
                <img src="${basePrefix}/img/foto2.jpg.jpeg" alt="Dragon Boat Racing">
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Rhythm & Racing Power</span>
                        <h2 class="h3 h1-md fw-bold mb-2">4. The Dragon Boat Festival</h2>
                        <p class="small text-light">An energetic festival featuring competitive dragon boat races rowed to the beat of thunderous drums. Celebrated alongside delicious sticky rice dumplings (Zongzi).</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
            <div class="carousel-item carousel-custom-item" data-bs-interval="4500">
                <img src="${basePrefix}/img/guardian.jpeg" alt="Qingming Festival">
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Honor & Remembrance</span>
                        <h2 class="h3 h1-md fw-bold mb-2">5. The Qingming (Tomb-Sweeping) Festival</h2>
                        <p class="small text-light">A peaceful spring festival focused on ancestral veneration. Families connect with nature, fly kites in the spring breeze, and step outside to celebrate the renewal of life.</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span></button>
        <button class="carousel-control-next" type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide="next"><span class="carousel-control-next-icon"></span></button>
    </section>

    <main class="container my-5 py-2 animate-route-in">
        
        <div class="history-header mb-5">
            <div class="header-chinese">故宫博物院</div>
            <h2 class="fw-bold font-script text-danger fs-3 mt-1">The Imperial Pillars of China</h2>
            <p class="text-muted small max-width-600 mx-auto mt-2">Discover the timeless wonders, profound heritage, and cultural legacies preserved within the historic heart of China.</p>
            <div class="divider-bar"></div>
        </div>
        
        <div class="row g-4 justify-content-center">
            <div class="col-sm-10 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm welcome-card">
                    <img src="${basePrefix}/img/foto2.jpg.jpeg" class="card-img-top" alt="History Showcase">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-danger mb-2">📜 Palace History</h5>
                        <p class="card-text text-muted small flex-grow-1">Trace 4,000 years of dynastic transitions, imperial declarations, and historical triumphs across the core Chinese eras.</p>
                        <a href="${basePrefix}/history" class="btn btn-outline-danger btn-sm w-100 fw-bold mt-3">Read Timeline</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-10 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm welcome-card">
                    <img src="${basePrefix}/img/guardian.jpeg" class="card-img-top" alt="Architecture Showcase">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-danger mb-2">📐 Sacred Architecture</h5>
                        <p class="card-text text-muted small flex-grow-1">Explore the brilliant central axis geometry, symbolic imperial colors, and the master engineering of nail-less wooden joints.</p>
                        <a href="${basePrefix}/architecture" class="btn btn-outline-danger btn-sm w-100 fw-bold mt-3">Read Article</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-10 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm welcome-card">
                    <img src="${basePrefix}/img/festival2.jpeg" class="card-img-top" alt="Festivals Showcase">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-danger mb-2">🏮 Grand Festivals</h5>
                        <p class="card-text text-muted small flex-grow-1">Immerse yourself in grand Lunar New Year rituals, royal wedding processions, and magnificent courtly feasts.</p>
                        <a href="${basePrefix}/festival" class="btn btn-outline-danger btn-sm w-100 fw-bold mt-3">Read Article</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-10 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm welcome-card">
                    <img src="${basePrefix}/img/foto3.jpeg" class="card-img-top" alt="Court Life Showcase">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-danger mb-2">👑 Daily Court Life</h5>
                        <p class="card-text text-muted small flex-grow-1">Unveil the private world of the inner palaces, household eunuch systems, and the legendary history of pampered royal pets.</p>
                        <a href="${basePrefix}/life" class="btn btn-outline-danger btn-sm w-100 fw-bold mt-3">Read Article</a>
                    </div>
                </div>
            </div>
        </div>
    </main>
    `;
}