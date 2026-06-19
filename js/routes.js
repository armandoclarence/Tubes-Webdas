const routes = {
    "/": { title: "故宫 | Home", template: "home" },
    "/architecture": { title: "故宫 | Architecture", template: "architecture.html" },
    "/history": { title: "故宫 | History", template: "history.html" },
    "/festival": { title: "故宫 | Festival", template: "festival.html" },
    "/culture": { title: "故宫 | Scholarly Arts", template: "culture.html" },
    "/life": { title: "故宫 | Court & Modern Life", template: "life.html" },
    "/culinary": { title: "故宫 | Imperial Culinary", template: "culinary.html" },
    "/museum": { title: "故宫 | Museum", template: "museum.html" },
    "/faq": { title: "故宫 | FAQ", template: "faq.html" },
};

function getBaseBasenamePrefix() {
    const path = window.location.pathname;
    if (path.includes('/Tubes-Webdas')) {
        return '/Tubes-Webdas';
    }
    return '';
}

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
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Celebration</span>
                        <h2 class="h3 h1-md fw-bold mb-2">1. Lunar New Year</h2>
                        <p class="small text-light d-none d-md-block">The grandest festival marking family reunions and vibrant spring traditions.</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore</a>
                    </div>
                </div>
            </div>

            <div class="carousel-item carousel-custom-item">
                <div class="parallax-zoom-frame">
                    <img src="${basePrefix}/img/home-lantern.avif" alt="Lantern Festival">
                </div>
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Tradition</span>
                        <h2 class="h3 h1-md fw-bold mb-2">2. Lantern Festival</h2>
                        <p class="small text-light d-none d-md-block">A stunning display of silk lanterns symbolizing peace and renewal.</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore</a>
                    </div>
                </div>
            </div>

            <div class="carousel-item carousel-custom-item">
                <div class="parallax-zoom-frame">
                    <img src="${basePrefix}/img/home-moon.avif" alt="Mid Autumn Festival">
                </div>
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Harvest</span>
                        <h2 class="h3 h1-md fw-bold mb-2">3. Mid-Autumn Festival</h2>
                        <p class="small text-light d-none d-md-block">Celebrating the full moon with family gatherings and mooncakes.</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore</a>
                    </div>
                </div>
            </div>

            <div class="carousel-item carousel-custom-item">
                <div class="parallax-zoom-frame">
                    <img src="${basePrefix}/img/home-dragon.avif" alt="Dragon Boat Racing">
                </div>
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Rhythm</span>
                        <h2 class="h3 h1-md fw-bold mb-2">4. Dragon Boat Festival</h2>
                        <p class="small text-light d-none d-md-block">Competitive races rowed to the beat of thunderous drums.</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore</a>
                    </div>
                </div>
            </div>

            <div class="carousel-item carousel-custom-item">
                <div class="parallax-zoom-frame">
                    <img src="${basePrefix}/img/Qingming.webp" alt="Qingming Festival">
                </div>
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Honor</span>
                        <h2 class="h3 h1-md fw-bold mb-2">5. Qingming Festival</h2>
                        <p class="small text-light d-none d-md-block">A day of ancestral veneration and connecting with nature.</p>
                        <a href="${basePrefix}/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore</a>
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
                    <img src="${basePrefix}/img/history-xia.webp" class="card-img-top" alt="History Showcase">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-danger mb-2">📜 Palace History</h5>
                        <p class="card-text text-muted small flex-grow-1">Trace 4,000 years of dynastic transitions, imperial declarations, and historical triumphs across the core Chinese eras.</p>
                        <a href="${basePrefix}/history" class="btn btn-outline-danger btn-sm w-100 fw-bold mt-3">Read Timeline</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-10 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm welcome-card" style="--card-index: 1;">
                    <img src="${basePrefix}/img/history-qing.webp" class="card-img-top" alt="Architecture Showcase">
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
        <div class="container my-5 py-4 animate-route-in">
            <div class="card shadow-lg bg-imperial-dark text-light" style="border: 2px solid var(--imperial-gold);">
                
                <div class="card-header text-center py-4" style="border-bottom: 1px solid rgba(241, 196, 15, 0.3);">
                    <h2 class="fw-bold font-script text-effect-gold mb-0 fs-1">The Imperial Guestbook</h2>
                    <p class="small text-muted mt-2 mb-0">Record your passage through the Forbidden City</p>
                </div>
                
                <div class="card-body p-4 p-md-5">
                    <form action="#" method="POST" id="visitorForm">
                        <div class="row g-4">
                            
                            <div class="col-md-6">
                                <label for="visitorName" class="form-label text-warning small fw-bold">Honored Name</label>
                                <input type="text" class="form-control bg-dark text-light border-secondary" id="visitorName" placeholder="Enter your name" required>
                            </div>
                            
                            <div class="col-md-6">
                                <label for="visitorOrigin" class="form-label text-warning small fw-bold">Province / Country of Origin</label>
                                <input type="text" class="form-control bg-dark text-light border-secondary" id="visitorOrigin" placeholder="Where are you traveling from?" required>
                            </div>
                            
                            <div class="col-12">
                                <label for="favoriteArea" class="form-label text-warning small fw-bold">Favorite Area of the Palace</label>
                                <select class="form-select bg-dark text-light border-secondary" id="favoriteArea" required>
                                    <option value="" selected disabled>Select your favorite...</option>
                                    <option value="architecture">Architecture & Engineering</option>
                                    <option value="history">Palace History</option>
                                    <option value="festival">Grand Festivals</option>
                                    <option value="culture">Scholarly Arts</option>
                                </select>
                            </div>
                            
                            <div class="col-12">
                                <label for="visitorMessage" class="form-label text-warning small fw-bold">Your Message (Decree)</label>
                                <textarea class="form-control bg-dark text-light border-secondary" id="visitorMessage" rows="3" placeholder="Leave your thoughts on the cultural archive..." required></textarea>
                            </div>
                            
                            <div class="col-12 text-center mt-4">
                                <button type="submit" class="btn btn-warning fw-bold px-5 py-2 text-dark">Submit Scroll</button>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
    `;
}