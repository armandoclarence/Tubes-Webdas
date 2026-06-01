// ==========================================================================
// CORE LAYOUT INJECTION SCRIPT (ROUTER CORE ENGINE)
// ==========================================================================
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
        navbarPlaceholder.innerHTML = getNavbarTemplate(currentRoute, basePrefix);
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

// MANAGEMENT SIKLUS UTAMA TRANSISI HALAMAN SPA (ID: LOADING-SCREEN FIXED)
async function handleLocationChange() {
    const contentView = document.getElementById("content-view");
    const loadingScreen = document.getElementById("loading-screen");
    const basePrefix = getBaseBasenamePrefix();
    
    if (!contentView) return;

    let path = window.location.pathname;
    if (basePrefix && path.startsWith(basePrefix)) {
        path = path.slice(basePrefix.length);
    }
    
    const route = routes[path] || { title: "404 | Not Found", template: "404.html" };
    document.title = route.title;

    if (loadingScreen) {
        loadingScreen.classList.remove("fade-hide");
    }

    await new Promise(resolve => setTimeout(resolve, 350));

    if (route.template === "home") {
        contentView.innerHTML = renderHomeDashboard();
    } else {
        try {
            const response = await fetch(`${basePrefix}/content/${route.template}`);
            if (!response.ok) throw new Error("Network fragment error");
            let rawHtml = await response.text();
            
            const imgRegex = /<img\s+([^>]*?)src=["'](?!http|\/)([^"']+)["']/g;
            rawHtml = rawHtml.replace(imgRegex, `<img $1src="${basePrefix}/$2"`);
            
            contentView.innerHTML = rawHtml;
        } catch (err) {
            contentView.innerHTML = `<div class="container my-5 text-center"><h2 class="text-danger">Failed to load panel contents.</h2></div>`;
        }
    }

    // Selalu injeksi komponen baru sebelum inisialisasi observer & menutup loading screen
    injectGlobalLayoutComponents();
    initTimelineScrollObserver();
    initTimelineScrollSpy();
    initCarouselAutoPlay(); 

    if (loadingScreen) {
        loadingScreen.classList.add("fade-hide");
    }

    // PERBAIKAN: Proteksi querySelector dari hash ilegal saat deep linking
    if (window.location.hash) {
        const targetId = window.location.hash;
        // Abaikan jika hanya berupa '#' atau '#/' biasa
        if (targetId !== '#' && !targetId.startsWith('#/')) {
            setTimeout(() => {
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const combinedNavbarHeights = 80; 
                        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - combinedNavbarHeights;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    }
                } catch (e) {
                    console.warn("Gagal mengeksekusi smooth scroll, selector hash tidak valid:", targetId);
                }
            }, 120);
        }
    }
}

// INTERSEPTOR KLIK GLOBAL DAN SIKLUS EVENT BINDINGS
window.addEventListener("popstate", handleLocationChange);
window.addEventListener("DOMContentLoaded", () => {
    handleLocationChange();

    document.body.addEventListener("click", (e) => {
        const targetLink = e.target.closest("a");
        if (targetLink && targetLink.getAttribute("href")) {
            let href = targetLink.getAttribute("href");
            const basePrefix = getBaseBasenamePrefix();
            
            if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            
            // PERBAIKAN: Antisipasi crash querySelector untuk link hash
            if (href.startsWith('#')) {
                // Jika hanya '#' atau '#/' lewatkan agar tidak crash
                if (href === '#' || href.startsWith('#/')) return; 

                e.preventDefault();
                try {
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        window.history.pushState(null, null, href);
                        
                        const combinedNavbarHeights = 80;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - combinedNavbarHeights;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    }
                } catch (selectorError) {
                    console.warn("Selector jangkar tidak valid:", href);
                }
                return;
            }

            e.preventDefault();

            // AMANKAN KONDISI MOBILE SEBELUM NAVBAR DIHANCURKAN OLEH INJECTOR
            const navbarCollapseButton = document.querySelector('.navbar-collapse.show');
            const activeDropdown = document.querySelector('.dropdown-menu.show');

            if (activeDropdown) {
                activeDropdown.classList.remove('show');
            }

            if (navbarCollapseButton) {
                if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                    const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapseButton);
                    if (collapseInstance) {
                        collapseInstance.hide();
                    } else {
                        navbarCollapseButton.classList.remove('show');
                    }
                } else {
                    navbarCollapseButton.classList.remove('show');
                }
            }

            // Eksekusi pemindahan state URL
            if (basePrefix && href.startsWith(basePrefix)) {
                href = href.slice(basePrefix.length);
            }
            if (!href.startsWith('/')) href = '/' + href;

            window.history.pushState({}, "", basePrefix + href);
            handleLocationChange();
        }
    });
});