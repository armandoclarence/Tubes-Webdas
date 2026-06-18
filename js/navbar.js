function getNavbarTemplate(currentRoute, basePrefix) {
    return `
    <nav class="navbar navbar-expand-lg navbar-dark navbar-custom shadow-sm">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2" href="${basePrefix}/">
                <span class="fs-4">⛩️</span>
                <span class="fw-bold tracking-wide">中国 <span class="d-none d-sm-inline text-gold-accent">China</span></span>
            </a>

            <button class="navbar-toggler custom-toggler-btn" type="button" 
                    data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" 
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav ms-auto mt-3 mt-lg-0 align-items-lg-center gap-1 gap-lg-2">
                    
                    <li class="nav-item">
                        <a class="nav-link ${currentRoute === '/' ? 'active' : ''}" href="${basePrefix}/">
                            <span class="d-lg-none d-xl-inline me-1 small opacity-75">首页</span> Home
                        </a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link ${currentRoute === '/architecture' ? 'active' : ''}" href="${basePrefix}/architecture">
                            <span class="d-lg-none d-xl-inline me-1 small opacity-75">建筑</span> Architecture
                        </a>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link ${currentRoute === '/history' ? 'active' : ''}" 
                            href="${basePrefix}/history">
                            <span class="d-lg-none d-xl-inline me-1 small opacity-75">历史</span> History
                        </a>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle ${['/culture', '/festival', '/culinary', '/museum', '/life'].includes(currentRoute) ? 'active' : ''}" 
                            href="#" id="cultureNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="d-lg-none d-xl-inline me-1 small opacity-75">文化</span> Culture & Arts
                        </a>
                        <ul class="dropdown-menu dropdown-menu-custom shadow-lg" aria-labelledby="cultureNavbarDropdown">
                            <li><a class="dropdown-item sub-anchor-link ${currentRoute === '/museum' ? 'text-gold' : ''}" href="${basePrefix}/museum">🏛️ 珍藏 Museum & Artifacts</a></li>
                            <li><a class="dropdown-item sub-anchor-link ${currentRoute === '/festival' ? 'text-gold' : ''}" href="${basePrefix}/festival">🏮 节日 Imperial Festivals</a></li>
                            <li><a class="dropdown-item sub-anchor-link ${currentRoute === '/culinary' ? 'text-gold' : ''}" href="${basePrefix}/culinary">🥢 饮食 Gastronomy & Cuisine</a></li>
                            <li><a class="dropdown-item sub-anchor-link ${currentRoute === '/culture' ? 'text-gold' : ''}" href="${basePrefix}/culture">🖌️ 艺术 Scholarly Arts</a></li>
                            <li><a class="dropdown-item sub-anchor-link ${currentRoute === '/life' ? 'text-gold' : ''}" href="${basePrefix}/life">👑 生活 Daily Court Life</a></li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
    `;
}