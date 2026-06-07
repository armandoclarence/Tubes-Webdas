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
        <footer class="text-center py-5 text-white mt-auto footer-custom">
            <div class="container px-4">
                <div class="row g-3 justify-content-center mb-4">
                    <div class="col-auto">
                        <span class="font-script fs-4 text-gold">紫禁城</span>
                        <span class="text-white opacity-50 ms-2 small">The Forbidden City</span>
                    </div>
                </div>
                <div class="d-flex justify-content-center gap-3 flex-wrap mb-4">
                    <a href="${basePrefix}/" class="text-white opacity-50 small text-decoration-none hover-gold">Home</a>
                    <a href="${basePrefix}/architecture" class="text-white opacity-50 small text-decoration-none">Architecture</a>
                    <a href="${basePrefix}/history" class="text-white opacity-50 small text-decoration-none">History</a>
                    <a href="${basePrefix}/festival" class="text-white opacity-50 small text-decoration-none">Festivals</a>
                    <a href="${basePrefix}/culture" class="text-white opacity-50 small text-decoration-none">Scholarly Arts</a>
                    <a href="${basePrefix}/life" class="text-white opacity-50 small text-decoration-none">Court Life</a>
                </div>
                <div class="divider-bar mx-auto mb-4"></div>
                <p class="mb-0 small opacity-25">© 2026 Forbidden City Cultural Exploration Space. All Rights Reserved.</p>
                <p class="mb-0 mt-1 small opacity-15" style="font-size:10px;">UNESCO World Heritage Site · Est. 1406 CE · 故宫博物院</p>
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
            // Ganti baris fetch Anda dengan ini untuk debugging
            const url = `${basePrefix}/content/${route.template}`;
            console.log("Mencoba mengambil file dari:", url); // Cek ini di Console DevTools

            const response = await fetch(url);

            if (!response.ok) {
                console.error("Gagal! Status:", response.status, "Path:", url);
            }
            let rawHtml = await response.text();
            
            const imgRegex = /<img\s+([^>]*?)src=["'](?!http|\/)([^"']+)["']/g;
            rawHtml = rawHtml.replace(imgRegex, `<img $1src="${basePrefix}/$2"`);
            
            contentView.innerHTML = rawHtml;
        } catch (err) {
            contentView.innerHTML = `<div class="container my-5 text-center"><h2 class="text-danger">Failed to load panel contents.</h2></div>`;
        }
    }

    // Inject layout components, init animations & enhancements
    injectGlobalLayoutComponents();
    initTimelineScrollObserver();
    initTimelineScrollSpy();
    initCarouselAutoPlay();
    initImageZoom();
    wrapImages();
    initForm();

    // NEW: run enhancement layer after every page load
    if (typeof initAllEnhancements === 'function') {
        initAllEnhancements();
    }

    if (loadingScreen) {
        loadingScreen.classList.add("fade-hide");
    }

    // Smooth scroll to hash target
    if (window.location.hash) {
        const targetId = window.location.hash;
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
                    console.warn("Smooth scroll failed:", targetId);
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
            
            if (href.startsWith('#')) {
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
                    console.warn("Selector tidak valid:", href);
                }
                return;
            }

            e.preventDefault();

            const navbarCollapseButton = document.querySelector('.navbar-collapse.show');
            const activeDropdown = document.querySelector('.dropdown-menu.show');

            if (activeDropdown) activeDropdown.classList.remove('show');

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

            if (basePrefix && href.startsWith(basePrefix)) {
                href = href.slice(basePrefix.length);
            }
            if (!href.startsWith('/')) href = '/' + href;

            window.history.pushState({}, "", basePrefix + href);
            handleLocationChange();
        }
    });
});

// Gunakan instance modal yang bersih
let zoomModal = null;

function initImageZoom() {
    // Bersihkan listener lama untuk menghindari duplikasi
    document.removeEventListener('click', zoomHandler);
    document.addEventListener('click', zoomHandler);
}

function zoomHandler(e) {
    if (e.target.classList.contains('zoomable')) {
        const zoomedImg = document.getElementById('zoomedImg');
        zoomedImg.src = e.target.src;
        
        // Inisialisasi modal dengan cara yang aman
        if (!zoomModal) {
            zoomModal = new bootstrap.Modal(document.getElementById('imageZoomModal'));
        }
        zoomModal.show();
    }
}

function wrapImages() {
    // Cari semua gambar yang memiliki class 'zoomable'
    const images = document.querySelectorAll('img.zoomable');
    
    images.forEach(img => {
        // Cek apakah gambar sudah dibungkus agar tidak dibungkus berkali-kali
        if (!img.parentElement.classList.contains('zoom-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'zoom-wrapper';
            
            // Masukkan wrapper ke dalam DOM, lalu pindahkan gambar ke dalam wrapper
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
        }
    });
}

function initForm(){
    document.addEventListener('submit', function(e) {
        if (e.target && e.target.id === 'visitorForm') {
            e.preventDefault();

            const visitorData = {
                id: Date.now(),
                name: document.getElementById('visitorName').value,
                origin: document.getElementById('visitorOrigin').value,
                favoriteArea: document.getElementById('favoriteArea').value,
                message: document.getElementById('visitorMessage').value,
                timestamp: new Date().toLocaleString()
            };

            let guestArchive = JSON.parse(localStorage.getItem('imperialGuests')) || [];

            guestArchive.push(visitorData);

            localStorage.setItem('imperialGuests', JSON.stringify(guestArchive));

            alert('Terima kasih! Pesan Anda telah dicatat dalam arsip istana.');
            e.target.reset();
        }
    });
}