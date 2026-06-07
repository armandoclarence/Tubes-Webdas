// ==========================================================================
// SPA ROUTE REGISTRY & BASE CONFIGURATION
// ==========================================================================
const routes = {
    "/": { title: "紫禁城 | Home", template: "home" },
    "/architecture": { title: "紫禁城 | Architecture", template: "architecture.html" },
    "/history": { title: "紫禁城 | History", template: "history.html" },
    "/festival": { title: "紫禁城 | Festival", template: "festival.html" },
    "/culture": { title: "紫禁城 | Scholarly Arts", template: "culture.html" },
    "/life": { title: "紫禁城 | Court & Modern Life", template: "life.html" },
    "/culinary": { title: "紫禁城 | Imperial Culinary", template: "culinary.html" },
    "/museum": { title: "紫禁城 | Museum", template: "museum.html" },
};

// Evaluasi otomatis konteks repositori (GitHub Pages vs Localhost)
function getBaseBasenamePrefix() {
    const path = window.location.pathname;
    if (path.includes('/Tubes-Webdas')) {
        return '/Tubes-Webdas';
    }
    return '';
}

// ==========================================================================
// HOME DASHBOARD MATERIAL UI TEMPLATE (CINEMATIC AUTOMATIC CAROUSEL)
// ==========================================================================
function renderHomeDashboard() {
    const basePrefix = getBaseBasenamePrefix();
    return `
    <section id="chinaHighlightsCarousel" class="carousel slide carousel-fade shadow animate-route-in" data-bs-ride="carousel" data-bs-interval="5000">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide-to="0" class="active"></button>
            <button type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide-to="2"></button>
            <button type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide-to="3"></button>
            <button type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide-to="4"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item carousel-custom-item active">
                <div class="parallax-zoom-frame">
                    <img src="${basePrefix}/img/home-spring.avif" alt="Lunar New Year">
                </div>
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">The Grandest Celebration</span>
                        <h2 class="h3 h1-md fw-bold mb-2">1. The Lunar New Year (Spring Festival)</h2>
                        <p class="small text-light">Experience China's most significant cultural festival. Marked by dragon dances, family reunions, and vibrant decorations, it fills the nation with joy.</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
            <div class="carousel-item carousel-custom-item">
                <div class="parallax-zoom-frame">
                    <img src="${basePrefix}/img/home-lantern.avif" alt="Lantern Festival">
                </div>
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">A Sea of Lights</span>
                        <h2 class="h3 h1-md fw-bold mb-2">2. The Lantern Festival</h2>
                        <p class="small text-light">Concluding the New Year celebrations, thousands of glowing silk lanterns are lit along the palace corridors. This display symbolizes reconciliation, peace, and renewal.</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
            <div class="carousel-item carousel-custom-item">
                <div class="parallax-zoom-frame">
                    <img src="${basePrefix}/img/home-moon.avif" alt="Mid Autumn Festival">
                </div>
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Harvest &amp; Reunion</span>
                        <h2 class="h3 h1-md fw-bold mb-2">3. The Mid-Autumn Festival</h2>
                        <p class="small text-light">A beautiful celebration dedicated to the full moon and harvest reflections. Families gather to admire the moon, light paper decorations, and share sweet mooncakes.</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
            <div class="carousel-item carousel-custom-item">
                <div class="parallax-zoom-frame">
                    <img src="${basePrefix}/img/home-dragon.avif" alt="Dragon Boat Racing">
                </div>
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Rhythm &amp; Racing Power</span>
                        <h2 class="h3 h1-md fw-bold mb-2">4. The Dragon Boat Festival</h2>
                        <p class="small text-light">An energetic festival featuring competitive dragon boat races rowed to the beat of thunderous drums. Celebrated alongside delicious sticky rice dumplings (Zongzi).</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
            <div class="carousel-item carousel-custom-item">
                <div class="parallax-zoom-frame">
                    <img src="${basePrefix}/img/arch-guardian.avif" alt="Qingming Festival">
                </div>
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Honor &amp; Remembrance</span>
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
        <div class="page-header mb-5">
            <div class="header-chinese">故宫博物院</div>
            <h2 class="fw-bold font-script text-danger fs-3 mt-1">The Imperial Pillars of China</h2>
            <p class="text-muted small max-width-600 mx-auto mt-2">Discover the timeless wonders, profound heritage, and cultural legacies preserved within the historic heart of China.</p>
            <div class="divider-bar"></div>
        </div>
        
        <div class="row g-4 justify-content-center">
            <div class="col-sm-10 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm welcome-card" style="--card-index: 0;">
                    <img src="${basePrefix}/img/home-spring.avif" class="card-img-top" alt="History Showcase">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-danger mb-2">📜 Palace History</h5>
                        <p class="card-text text-muted small flex-grow-1">Trace 4,000 years of dynastic transitions, imperial declarations, and historical triumphs across the core Chinese eras.</p>
                        <a href="${basePrefix}/history" class="btn btn-outline-danger btn-sm w-100 fw-bold mt-3">Read Timeline</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-10 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm welcome-card" style="--card-index: 1;">
                    <img src="${basePrefix}/img/arch-guardian.avif" class="card-img-top" alt="Architecture Showcase">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-danger mb-2">📐 Sacred Architecture</h5>
                        <p class="card-text text-muted small flex-grow-1">Explore the brilliant central axis geometry, symbolic imperial colors, and the master engineering of nail-less wooden joints.</p>
                        <a href="${basePrefix}/architecture" class="btn btn-outline-danger btn-sm w-100 fw-bold mt-3">Read Article</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-10 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm welcome-card" style="--card-index: 2;">
                    <img src="${basePrefix}/img/home-spring.avif" class="card-img-top" alt="Festivals Showcase">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-danger mb-2">🏮 Grand Festivals</h5>
                        <p class="card-text text-muted small flex-grow-1">Immerse yourself in grand Lunar New Year rituals, royal wedding processions, and magnificent courtly feasts.</p>
                        <a href="${basePrefix}/festival" class="btn btn-outline-danger btn-sm w-100 fw-bold mt-3">Read Article</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-10 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm welcome-card" style="--card-index: 3;">
                    <img src="${basePrefix}/img/life-cat.avif" class="card-img-top" alt="Court Life Showcase">
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