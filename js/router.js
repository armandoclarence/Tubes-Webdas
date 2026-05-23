// Route Registry Configuration (Mapping clean paths to target .html filenames)
const routes = {
    "/": { title: "紫禁城 | Home", template: "home" },
    "/history": { title: "紫禁城 | History", template: "history.html" },
    "/architecture": { title: "紫禁城 | Architecture", template: "architecture.html" },
    "/festival": { title: "紫禁城 | Festival", template: "festival.html" },
    "/life": { title: "紫禁城 | Court Life", template: "life.html" }
};

// Global App Shell Element Injection Rules
function injectGlobalLayoutComponents() {
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");
    const currentRoute = window.location.pathname;

    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top shadow">
            <div class="container">
                <a class="navbar-brand fw-bold fs-4" href="/">🏯 紫禁城 <span class="fs-6 fw-normal text-gold">The Forbidden City</span></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span class="navbar-toggler-icon" style="filter: invert(1);"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        <li class="nav-item mx-2">
                            <a class="nav-link ${currentRoute === '/' ? 'active text-gold fw-bold' : ''}" href="/">Home</a>
                        </li>
                        <li class="nav-item dropdown mx-2">
                            <a class="nav-link dropdown-toggle ${currentRoute !== '/' ? 'active text-gold fw-bold' : ''}" href="#" id="categoriesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Explore Categories
                            </a>
                            <ul class="dropdown-menu dropdown-menu-custom dropdown-menu-end shadow-lg" aria-labelledby="categoriesDropdown">
                                <li><a class="dropdown-item ${currentRoute === '/history' ? 'fw-bold text-gold' : ''}" href="/history">📜 Palace History</a></li>
                                <li><a class="dropdown-item ${currentRoute === '/architecture' ? 'fw-bold text-gold' : ''}" href="/architecture">📐 Sacred Architecture</a></li>
                                <li><a class="dropdown-item ${currentRoute === '/festival' ? 'fw-bold text-gold' : ''}" href="/festival">🏮 Grand Festivals</a></li>
                                <li><a class="dropdown-item ${currentRoute === '/life' ? 'fw-bold text-gold' : ''}" href="/life">👑 Daily Court Life</a></li>
                            </ul>
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

// Location Handler (Fetches inner HTML views dynamically)
async function handleLocationChange() {
    const loadingScreen = document.getElementById("loading-screen");
    const contentView = document.getElementById("content-view");
    
    // 1. Instantly display loading overlay during route swap transitions
    if (loadingScreen) {
        loadingScreen.classList.remove("fade-hide");
    }

    let path = window.location.pathname;
    if (!routes[path]) path = "/";

    const route = routes[path];
    document.title = route.title;

    if (!contentView) return;

    // Simulate network delay (e.g., 500ms) so users see your beautiful loading screen animation
    await new Promise(resolve => setTimeout(resolve, 500));

    if (route.template === "home") {
        contentView.innerHTML = renderHomeDashboard();
    } else {
        try {
            // Fetch content dynamically from subfiles ending with .html (Full Snippet Support!)
            const response = await fetch(`/content/${route.template}`);
            if (!response.ok) throw new Error("View not found");
            const rawHtml = await response.text();
            contentView.innerHTML = rawHtml;
        } catch (error) {
            contentView.innerHTML = `
            <div class="container my-5 text-center">
                <div class="content-container animate-route-in">
                    <h2 class="text-danger fw-bold">Error 404</h2>
                    <p class="lead text-muted">Failed to resolve imperial content channel view.</p>
                </div>
            </div>`;
        }
    }

    // 2. Refresh Navigation states and hide the loading screen with a smooth fade
    injectGlobalLayoutComponents();
    if (loadingScreen) {
        loadingScreen.classList.add("fade-hide");
    }
}

// Click interception configuration mapping absolute router links
document.body.addEventListener("click", (e) => {
    const targetLink = e.target.closest("a");
    if (targetLink && targetLink.getAttribute("href") && targetLink.getAttribute("href").startsWith("/")) {
        e.preventDefault();
        window.history.pushState({}, "", targetLink.getAttribute("href"));
        handleLocationChange();
    }
});

window.addEventListener("popstate", handleLocationChange);
window.addEventListener("DOMContentLoaded", handleLocationChange);

// Home template blueprint generator
function renderHomeDashboard() {
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
                <img src="/img/festival2.jpeg" alt="Lunar New Year">
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">The Grandest Celebration</span>
                        <h2 class="h3 h1-md fw-bold mb-2">1. The Lunar New Year (Spring Festival)</h2>
                        <p class="small text-light">Experience China's most significant cultural festival. Marked by dragon dances, family reunions, and vibrant decorations, it fills the nation with joy and wishes for prosperity.</p>
                        <a href="/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
            <div class="carousel-item carousel-custom-item" data-bs-interval="4500">
                <img src="/img/foto1.jpeg" alt="Lantern Festival">
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">A Sea of Lights</span>
                        <h2 class="h3 h1-md fw-bold mb-2">2. The Lantern Festival</h2>
                        <p class="small text-light">Concluding the New Year celebrations, thousands of glowing silk lanterns are released into the night sky. This stunning display symbolizes reconciliation, peace, and new beginnings.</p>
                        <a href="/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
            <div class="carousel-item carousel-custom-item" data-bs-interval="4500">
                <img src="/img/foto3.jpeg" alt="Mid Autumn Festival">
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Harvest & Reunion</span>
                        <h2 class="h3 h1-md fw-bold mb-2">3. The Mid-Autumn Festival</h2>
                        <p class="small text-light">A beautiful celebration dedicated to the full moon and harvest bounties. Families gather to admire the moon, light paper lanterns, and share sweet traditional mooncakes under the night sky.</p>
                        <a href="/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
            <div class="carousel-item carousel-custom-item" data-bs-interval="4500">
                <img src="/img/foto2.jpg.jpeg" alt="Dragon Boat Racing">
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Rhythm & Racing Power</span>
                        <h2 class="h3 h1-md fw-bold mb-2">4. The Dragon Boat Festival</h2>
                        <p class="small text-light">An energetic festival featuring competitive dragon boat races rowed to the beat of thunderous drums. Celebrated alongside delicious sticky rice dumplings (Zongzi) to honor ancient poets.</p>
                        <a href="/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
            <div class="carousel-item carousel-custom-item" data-bs-interval="4500">
                <img src="/img/guardian.jpeg" alt="Qingming Festival">
                <div class="carousel-caption container text-start">
                    <div class="carousel-caption-card col-12 col-md-8 col-lg-7 shadow-lg">
                        <span class="badge bg-warning text-dark mb-2 fw-bold text-uppercase">Honor & Remembrance</span>
                        <h2 class="h3 h1-md fw-bold mb-2">5. The Qingming (Tomb-Sweeping) Festival</h2>
                        <p class="small text-light">A peaceful spring festival focused on honoring ancestors. Families connect with nature, fly kites in the spring breeze, and step outside to celebrate the renewal of life.</p>
                        <a href="/festival" class="btn btn-warning btn-sm fw-bold px-4 mt-1">Explore Festivals</a>
                    </div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span></button>
        <button class="carousel-control-next" type="button" data-bs-target="#chinaHighlightsCarousel" data-bs-slide="next"><span class="carousel-control-next-icon"></span></button>
    </section>

    <main class="container my-5 py-2 animate-route-in">
        <div class="text-center mb-5">
            <h2 class="fw-bold display-5 font-script text-danger">The Imperial Pillars of China</h2>
            <p class="text-muted max-width-600 mx-auto px-2">Discover the timeless wonders, profound heritage, and cultural legacies preserved within the historic heart of China.</p>
            <div class="divider-bar"></div>
        </div>
        
        <div class="row g-4 justify-content-center">
            <div class="col-sm-10 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm welcome-card">
                    <img src="/img/foto2.jpg.jpeg" class="card-img-top" alt="History Showcase">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-danger mb-2">📜 Palace History</h5>
                        <p class="card-text text-muted small flex-grow-1">Trace 500 years of dynastic transitions, imperial declarations, and historical triumphs across the Ming and Qing eras.</p>
                        <a href="/history" class="btn btn-outline-danger btn-sm w-100 fw-bold mt-3">Read Article</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-10 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm welcome-card">
                    <img src="/img/guardian.jpeg" class="card-img-top" alt="Architecture Showcase">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-danger mb-2">📐 Sacred Architecture</h5>
                        <p class="card-text text-muted small flex-grow-1">Explore the brilliant central axis geometry, symbolic imperial colors, and the master engineering of nail-less wooden joints.</p>
                        <a href="/architecture" class="btn btn-outline-danger btn-sm w-100 fw-bold mt-3">Read Article</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-10 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm welcome-card">
                    <img src="/img/festival2.jpeg" class="card-img-top" alt="Festivals Showcase">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-danger mb-2">🏮 Grand Festivals</h5>
                        <p class="card-text text-muted small flex-grow-1">Immerse yourself in grand Lunar New Year rituals, royal wedding processions, and magnificent courtly feasts.</p>
                        <a href="/festival" class="btn btn-outline-danger btn-sm w-100 fw-bold mt-3">Read Article</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-10 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm welcome-card">
                    <img src="/img/foto3.jpeg" class="card-img-top" alt="Court Life Showcase">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-danger mb-2">👑 Daily Court Life</h5>
                        <p class="card-text text-muted small flex-grow-1">Unveil the private world of the inner palaces, household eunuch systems, and the legendary history of pampered royal pets.</p>
                        <a href="/life" class="btn btn-outline-danger btn-sm w-100 fw-bold mt-3">Read Article</a>
                    </div>
                </div>
            </div>
        </div>
    </main>`;
}