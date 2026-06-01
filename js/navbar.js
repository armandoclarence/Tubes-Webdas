// ==========================================================================
// UNIVERSAL RESPONSIVE IMPERIAL NAVBAR VIEW ENGINE
// ==========================================================================
function getNavbarTemplate(currentRoute, basePrefix) {
    return `
    <nav class="navbar navbar-expand-lg navbar-dark navbar-custom shadow-sm">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2" href="${basePrefix}/">
                <span class="fs-4">⛩️</span>
                <span class="fw-bold tracking-wide">紫禁城 <span class="d-none d-sm-inline text-gold-accent">The Forbidden City</span></span>
            </a>

            <button class="navbar-toggler custom-toggler-btn" type="button" 
                    data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" 
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav ms-auto mt-3 mt-lg-0 align-items-lg-center gap-1 gap-lg-2">
                    <li class="nav-item">
                        <a class="nav-link ${currentRoute === '/' ? 'active' : ''}" href="${basePrefix}/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${currentRoute === '/architecture' ? 'active' : ''}" href="${basePrefix}/architecture">Architecture</a>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle ${currentRoute === '/history' ? 'active' : ''}" 
                           href="#" id="historyNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            History
                        </a>
                        <ul class="dropdown-menu dropdown-menu-custom shadow-lg" aria-labelledby="historyNavbarDropdown">
                            <li><a class="dropdown-item fw-bold text-gold" href="${basePrefix}/history">📜 Full Timeline</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item sub-anchor-link" href="${basePrefix}/history#ming">明 Xia &amp; Ming Dynasty</a></li>
                            <li><a class="dropdown-item sub-anchor-link" href="${basePrefix}/history#qing">清 Qing Imperial Era</a></li>
                            <li><a class="dropdown-item sub-anchor-link" href="${basePrefix}/history#xin">新 Modern Era Revolution</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle ${currentRoute === '/festival' ? 'active' : ''}" 
                           href="#" id="festivalsNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Festivals
                        </a>
                        <ul class="dropdown-menu dropdown-menu-custom shadow-lg" aria-labelledby="festivalsNavbarDropdown">
                            <li><a class="dropdown-item fw-bold text-gold" href="${basePrefix}/festival">🏮 All Events</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item sub-anchor-link" href="${basePrefix}/festival#spring">Spring Festival</a></li>
                            <li><a class="dropdown-item sub-anchor-link" href="${basePrefix}/festival#lantern">Lantern Festival</a></li>
                            <li><a class="dropdown-item sub-anchor-link" href="${basePrefix}/festival#dragon">Dragon Boat Race</a></li>
                            <li><a class="dropdown-item sub-anchor-link" href="${basePrefix}/festival#mid-autumn">Mid-Autumn Moon</a></li>
                            <li><a class="dropdown-item sub-anchor-link" href="${basePrefix}/festival#winter">Winter Solstice</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link ${currentRoute === '/culture' ? 'active' : ''}" href="${basePrefix}/culture">Scholarly Arts</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${currentRoute === '/life' ? 'active' : ''}" href="${basePrefix}/life">Court Life</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `;
}