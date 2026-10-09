/* ==========================================================================
   JUZLY HOLDINGS — GLOBAL NAVIGATION, THEME & ENTITY ARCHITECTURE ENGINE
   Brand:
     - Vibrant Green #20C063 (Emblem)
     - Deep Forest Accent #004F32 (Header, dark components)
     - Rich Charcoal #1A1A1A (Content text)
     - White #FFFFFF (Containers, wordmark on dark)
   ========================================================================== */

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/insights/') || path.endsWith('\\insights\\index.html') || path.endsWith('/insights/index.html')) {
    return '../';
  }
  return './';
}

/* ==========================================================================
   THEME SUBSYSTEM (Independent & Fail-safe)
   ========================================================================== */

function getSavedTheme() {
  return localStorage.getItem('juzly_theme') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  if (theme === 'light') {
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    btn.setAttribute('aria-label', 'Switch to Dark Mode');
  } else {
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    btn.setAttribute('aria-label', 'Switch to Light Mode');
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('juzly_theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme(e) {
  if (e) {
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

function attachThemeListener() {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn && !btn.dataset.boundTheme) {
    btn.dataset.boundTheme = 'true';
    btn.addEventListener('click', toggleTheme);
  }
}

// Global click delegation fallback in case button is dynamically replaced
document.addEventListener('click', (e) => {
  const toggleBtn = e.target.closest('#theme-toggle-btn, .theme-toggle-btn');
  if (toggleBtn) {
    toggleTheme(e);
  }
});

function initTheme() {
  const theme = getSavedTheme();
  applyTheme(theme);
  attachThemeListener();
}

function getHeaderTemplate() {
  const base = getBasePath();
  const isSubdir = base === '../';
  const homeHref = isSubdir ? '../index.html' : 'index.html';
  const brandHref = isSubdir ? '../brandjuzly.html' : './brandjuzly.html';
  const techHref = isSubdir ? '../technologies.html' : './technologies.html';
  const biHref = isSubdir ? '../bi.html' : './bi.html';
  const solutionsHref = isSubdir ? '../digital.html' : './digital.html';
  const expHref = isSubdir ? '../events.html' : './events.html';
  const holidaysHref = isSubdir ? '../holidays.html' : './holidays.html';
  const teamHref = isSubdir ? '../my-team.html' : './my-team.html';
  const aboutHref = isSubdir ? '../about.html' : './about.html';
  const impactHref = isSubdir ? '../impact.html' : './impact.html';
  const esgHref = isSubdir ? '../esg.html' : './esg.html';
  const slaveryHref = isSubdir ? '../modernSlavery.html' : './modernSlavery.html';
  const contactHref = isSubdir ? '../contact.html' : './contact.html';
  const intakeHref = contactHref;

  return `
  <div class="nav_shell">
    <!-- Brand Mark -->
    <a href="${homeHref}" class="brand_mark">JUZLY<span>.</span></a>

    <!-- Primary Navigation Links -->
    <nav class="nav_cluster" aria-label="Primary Navigation">
      <a href="${homeHref}" class="nav_direct_link">Home</a>
      <a href="${brandHref}" class="nav_direct_link" data-i18n="nav_brand">Brand Philosophy</a>

      <!-- Business Dropdown -->
      <div class="menu_node">
        <button type="button" class="menu_trigger" aria-haspopup="true" aria-expanded="false" id="trigger-business">
          Business
          <svg class="chevron_icon" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="dropdown_panel panel_compact" role="region" aria-labelledby="trigger-business">
          <a href="${techHref}" class="dropdown_row">
            <span class="row_title">Juzly Technologies</span>
          </a>
          <a href="${biHref}" class="dropdown_row">
            <span class="row_title">Juzly Business Intelligence</span>
          </a>
          <a href="${solutionsHref}" class="dropdown_row">
            <span class="row_title">Juzly Integrated Solutions</span>
          </a>
          <a href="${expHref}" class="dropdown_row">
            <span class="row_title">Juzly Experiences</span>
          </a>
          <a href="${holidaysHref}" class="dropdown_row">
            <span class="row_title">Juzly Holidays</span>
          </a>
        </div>
      </div>

      <!-- About Us Dropdown -->
      <div class="menu_node">
        <a href="${aboutHref}" class="menu_trigger" aria-haspopup="true" aria-expanded="false" id="trigger-about">
          About Us
          <svg class="chevron_icon" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <div class="dropdown_panel panel_compact" role="region" aria-labelledby="trigger-about">
          <a href="${aboutHref}" class="dropdown_row">
            <span class="row_title" data-i18n="nav_about">About Us</span>
          </a>
          <a href="${teamHref}" class="dropdown_row">
            <span class="row_title">My Team</span>
          </a>
          <a href="${impactHref}" class="dropdown_row">
            <span class="row_title">Social Impact</span>
          </a>
          <a href="${esgHref}" class="dropdown_row">
            <span class="row_title">ESG and Sustainability</span>
          </a>
          <a href="${slaveryHref}" class="dropdown_row">
            <span class="row_title">Modern Slavery Statement</span>
          </a>
        </div>
      </div>

      <!-- Contact Link -->
      <a href="${contactHref}" class="nav_direct_link">Contact</a>
    </nav>

    <!-- Direct Engagement Trigger -->
    <div class="nav_action_slot">
      <a href="${intakeHref}" class="action_button">Request Consultation</a>
      <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle theme">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle></svg>
      </button>
      <button type="button" class="mobile_menu_trigger" id="mobile-menu-trigger" aria-label="Toggle navigation menu" aria-expanded="false">
        <svg class="hamburger_icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
  `;
}

function ensureMobileDrawer() {
  if (document.getElementById('mobile-nav-drawer')) return;
  const base = getBasePath();
  const isSubdir = base === '../';
  const homeHref = isSubdir ? '../index.html' : 'index.html';
  const brandHref = isSubdir ? '../brandjuzly.html' : './brandjuzly.html';
  const techHref = isSubdir ? '../technologies.html' : './technologies.html';
  const biHref = isSubdir ? '../bi.html' : './bi.html';
  const solutionsHref = isSubdir ? '../digital.html' : './digital.html';
  const expHref = isSubdir ? '../events.html' : './events.html';
  const holidaysHref = isSubdir ? '../holidays.html' : './holidays.html';
  const teamHref = isSubdir ? '../my-team.html' : './my-team.html';
  const aboutHref = isSubdir ? '../about.html' : './about.html';
  const impactHref = isSubdir ? '../impact.html' : './impact.html';
  const esgHref = isSubdir ? '../esg.html' : './esg.html';
  const slaveryHref = isSubdir ? '../modernSlavery.html' : './modernSlavery.html';
  const contactHref = isSubdir ? '../contact.html' : './contact.html';
  const intakeHref = contactHref;

  const drawer = document.createElement('div');
  drawer.id = 'mobile-nav-drawer';
  drawer.className = 'mobile_nav_drawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.setAttribute('aria-label', 'Mobile Navigation');
  drawer.innerHTML = `
    <ul class="mobile_nav_links">
      <li class="mobile_nav_item">
        <a href="${homeHref}" class="mobile_nav_link">Home</a>
      </li>
      <li class="mobile_nav_item">
        <a href="${brandHref}" class="mobile_nav_link" data-i18n="nav_brand">Brand Philosophy</a>
      </li>
      <li class="mobile_nav_item">
        <button type="button" class="mobile_accordion_btn" aria-expanded="false">
          <span>Business</span>
          <svg class="chevron_icon" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="mobile_accordion_content">
          <a href="${techHref}" class="mobile_sublink">
            <span class="mobile_sublink_title">Juzly Technologies</span>
          </a>
          <a href="${biHref}" class="mobile_sublink">
            <span class="mobile_sublink_title">Juzly Business Intelligence</span>
          </a>
          <a href="${solutionsHref}" class="mobile_sublink">
            <span class="mobile_sublink_title">Juzly Integrated Solutions</span>
          </a>
          <a href="${expHref}" class="mobile_sublink">
            <span class="mobile_sublink_title">Juzly Experiences</span>
          </a>
          <a href="${holidaysHref}" class="mobile_sublink">
            <span class="mobile_sublink_title">Juzly Holidays</span>
          </a>
        </div>
      </li>
      <li class="mobile_nav_item">
        <button type="button" class="mobile_accordion_btn" aria-expanded="false">
          <span>About Us</span>
          <svg class="chevron_icon" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="mobile_accordion_content">
          <a href="${aboutHref}" class="mobile_sublink">
            <span class="mobile_sublink_title" data-i18n="nav_about">About Us</span>
          </a>
          <a href="${teamHref}" class="mobile_sublink">
            <span class="mobile_sublink_title">My Team</span>
          </a>
          <a href="${impactHref}" class="mobile_sublink">
            <span class="mobile_sublink_title">Social Impact</span>
          </a>
          <a href="${esgHref}" class="mobile_sublink">
            <span class="mobile_sublink_title">ESG and Sustainability</span>
          </a>
          <a href="${slaveryHref}" class="mobile_sublink">
            <span class="mobile_sublink_title">Modern Slavery Statement</span>
          </a>
        </div>
      </li>
      <li class="mobile_nav_item">
        <a href="${contactHref}" class="mobile_nav_link">Contact</a>
      </li>
    </ul>
    <div class="mobile_drawer_actions">
      <a href="${intakeHref}" class="action_button">Request Consultation</a>
    </div>
  `;
  document.body.appendChild(drawer);
}

function renderHeader() {
  let headerEl = document.getElementById('site_header') || document.getElementById('site-header');
  if (!headerEl) {
    headerEl = document.createElement('header');
    headerEl.id = 'site_header';
    headerEl.className = 'site_header site-header';
    document.body.prepend(headerEl);
  }

  if (!headerEl.classList.contains('site_header')) {
    headerEl.classList.add('site_header');
  }
  if (!headerEl.classList.contains('site-header')) {
    headerEl.classList.add('site-header');
  }

  const existingShell = headerEl.querySelector('.nav_shell');
  if (!existingShell) {
    headerEl.innerHTML = getHeaderTemplate();
  } else {
    // If nav_shell is already in HTML, ensure theme toggle & mobile trigger are inside nav_action_slot
    const actionSlot = existingShell.querySelector('.nav_action_slot');
    if (actionSlot) {
      const actionBtn = actionSlot.querySelector('.action_button');
      let themeBtn = actionSlot.querySelector('#theme-toggle-btn');
      if (!themeBtn) {
        themeBtn = document.createElement('button');
        themeBtn.className = 'theme-toggle-btn';
        themeBtn.id = 'theme-toggle-btn';
        themeBtn.setAttribute('aria-label', 'Toggle theme');
        themeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle></svg>';
      }
      if (actionBtn && themeBtn) {
        actionBtn.after(themeBtn);
      } else if (themeBtn && !actionSlot.contains(themeBtn)) {
        actionSlot.appendChild(themeBtn);
      }
      if (!actionSlot.querySelector('.mobile_menu_trigger')) {
        const mobBtn = document.createElement('button');
        mobBtn.type = 'button';
        mobBtn.className = 'mobile_menu_trigger';
        mobBtn.id = 'mobile-menu-trigger';
        mobBtn.setAttribute('aria-label', 'Toggle navigation menu');
        mobBtn.setAttribute('aria-expanded', 'false');
        mobBtn.innerHTML = `
          <svg class="hamburger_icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
        actionSlot.appendChild(mobBtn);
      }
    }

    const base = getBasePath();
    const isSubdir = base === '../';
    const homeHref = isSubdir ? '../index.html' : 'index.html';

    const brandMark = existingShell.querySelector('.brand_mark');
    if (brandMark && (brandMark.getAttribute('href') === '/' || brandMark.getAttribute('href') === './' || !brandMark.getAttribute('href'))) {
      brandMark.href = homeHref;
    }

    const navCluster = existingShell.querySelector('.nav_cluster');
    if (navCluster) {
      const homeLink = navCluster.querySelector('a[href="/"], a[href="./"]');
      if (homeLink) {
        homeLink.href = homeHref;
      }
    }

    if (navCluster && !navCluster.querySelector('a[href*="brandjuzly.html"]')) {
      const brandHref = isSubdir ? '../brandjuzly.html' : 'brandjuzly.html';
      const brandLink = document.createElement('a');
      brandLink.href = brandHref;
      brandLink.className = 'nav_direct_link' + (window.location.pathname.endsWith('brandjuzly.html') ? ' active' : '');
      brandLink.textContent = 'Brand Philosophy';
      const homeLink = navCluster.querySelector('a[href="/"], a[href="./"], a[href*="index.html"]');
      if (homeLink && homeLink.nextSibling) {
        navCluster.insertBefore(brandLink, homeLink.nextSibling);
      } else {
        navCluster.prepend(brandLink);
      }
    }

    if (navCluster && !navCluster.querySelector('a[href*="contact.html"]')) {
      const base = getBasePath();
      const isSubdir = base === '../';
      const contactHref = isSubdir ? '../contact.html' : 'contact.html';
      const contactLink = document.createElement('a');
      contactLink.href = contactHref;
      contactLink.className = 'nav_direct_link' + (window.location.pathname.endsWith('contact.html') ? ' active' : '');
      contactLink.textContent = 'Contact';
      navCluster.appendChild(contactLink);
    }

    // Ensure About Us dropdown panel links are correctly connected
    const aboutNodes = existingShell.querySelectorAll('.menu_node');
    aboutNodes.forEach(node => {
      const trigger = node.querySelector('.menu_trigger');
      if (trigger && trigger.textContent.includes('About Us')) {
        const base = getBasePath();
        const isSubdir = base === '../';
        const aboutHref = isSubdir ? '../about.html' : 'about.html';
        const teamHref = isSubdir ? '../my-team.html' : 'my-team.html';
        const impactHref = isSubdir ? '../impact.html' : 'impact.html';
        const esgHref = isSubdir ? '../esg.html' : 'esg.html';
        const slaveryHref = isSubdir ? '../modernSlavery.html' : 'modernSlavery.html';
        const panel = node.querySelector('.dropdown_panel');
        if (panel) {
          if (!panel.querySelector('a[href*="about.html"]')) {
            const aboutRow = document.createElement('a');
            aboutRow.href = aboutHref;
            aboutRow.className = 'dropdown_row';
            aboutRow.innerHTML = '<span class="row_title" data-i18n="nav_about">About Us</span>';
            panel.prepend(aboutRow);
          }
          panel.querySelectorAll('.dropdown_row').forEach(row => {
            const text = row.textContent.trim();
            if (text.includes('About Us')) {
              row.href = aboutHref;
            } else if (text.includes('My Team')) {
              row.href = teamHref;
            } else if (text.includes('Social Impact')) {
              row.href = impactHref;
            } else if (text.includes('ESG and Sustainability')) {
              row.href = esgHref;
            } else if (text.includes('Modern Slavery')) {
              row.href = slaveryHref;
            }
          });
        }
      }
    });
  }

  ensureMobileDrawer();
  bindNavEvents();
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeIcon(currentTheme);
}

function bindNavEvents() {
  attachThemeListener();

  // 1. Desktop dropdown click & keyboard support
  const menuNodes = document.querySelectorAll('.menu_node');
  menuNodes.forEach(node => {
    const trigger = node.querySelector('.menu_trigger');
    if (!trigger || trigger.dataset.bound) return;
    trigger.dataset.bound = 'true';

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      // Close any other open dropdowns
      menuNodes.forEach(other => {
        if (other !== node) {
          other.classList.remove('open');
          const otherTrigger = other.querySelector('.menu_trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });
      // Toggle current dropdown
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        node.classList.remove('open');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        node.classList.add('open');
      }
    });

    // Keyboard navigation
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        trigger.setAttribute('aria-expanded', 'true');
        node.classList.add('open');
        const firstRow = node.querySelector('.dropdown_row');
        if (firstRow) firstRow.focus();
      }
    });

    node.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        trigger.setAttribute('aria-expanded', 'false');
        node.classList.remove('open');
        trigger.focus();
      }
    });
  });

  // Close dropdowns on outside click
  if (!document.body.dataset.navClickBound) {
    document.body.dataset.navClickBound = 'true';
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.menu_node')) {
        menuNodes.forEach(node => {
          node.classList.remove('open');
          const trigger = node.querySelector('.menu_trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  // 2. Mobile drawer toggle
  const mobileTrigger = document.getElementById('mobile-menu-trigger');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  if (mobileTrigger && mobileDrawer && !mobileTrigger.dataset.bound) {
    mobileTrigger.dataset.bound = 'true';
    mobileTrigger.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileTrigger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Mobile accordion buttons
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('.mobile_accordion_btn').forEach(btn => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        const isExp = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', isExp ? 'false' : 'true');
        btn.classList.toggle('expanded', !isExp);
        const content = btn.nextElementSibling;
        if (content) content.classList.toggle('open', !isExp);
      });
    });
  }

  // 3. Smooth scroll for intake terminal buttons
  document.querySelectorAll('a[href="#intake_terminal"], a[href="#intake-terminal"]').forEach(btn => {
    if (btn.dataset.scrollBound) return;
    btn.dataset.scrollBound = 'true';
    btn.addEventListener('click', (e) => {
      const target = document.getElementById('intake_terminal') || document.getElementById('intake-terminal');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, null, '#intake-terminal');
        if (mobileDrawer && mobileDrawer.classList.contains('open')) {
          mobileDrawer.classList.remove('open');
          if (mobileTrigger) mobileTrigger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      } else {
        e.preventDefault();
        const base = getBasePath();
        window.location.href = base + 'contact.html#intake-terminal';
      }
    });
  });

  // 4. Fallback for offline file:// testing
  if (window.location.protocol === 'file:' || !window.location.origin || window.location.origin === 'null') {
    document.querySelectorAll('.site_header a, .site-header a, .mobile_nav_drawer a').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href === '/') a.setAttribute('href', 'index.html');
      else if (href === '/technologies/') a.setAttribute('href', 'technologies.html');
      else if (href === '/intelligence/') a.setAttribute('href', 'bi.html');
      else if (href === '/solutions/') a.setAttribute('href', 'digital.html');
      else if (href === '/experiences/') a.setAttribute('href', 'events.html');
      else if (href === '/holidays/') a.setAttribute('href', 'holidays.html');
      else if (href === '/about/team.html') a.setAttribute('href', 'my-team.html');
      else if (href === '/about/modern_slavery.html') a.setAttribute('href', 'modernSlavery.html');
      else if (href === '/about/social_impact.html') a.setAttribute('href', 'impact.html');
      else if (href === '/about/esg.html') a.setAttribute('href', 'esg.html');
      else if (href === '/contact.html') a.setAttribute('href', 'contact.html');
      else if (href === '/privacy.html') a.setAttribute('href', 'privacy.html');
      else if (href === '/terms.html') a.setAttribute('href', 'terms.html');
    });
  }
}


/* ==========================================================================
   ENTITY FOOTER COPYRIGHT ARCHITECTURE
   Standardized dynamic entity endorsement & footer resolution
   ========================================================================== */
const ENTITY_STANDARDS = {
  holdings: {
    id: 'holdings',
    key: 'holdings',
    name: 'Juzly Holdings',
    companyName: 'Juzly Holdings Pty Ltd.',
    endorsement: 'Juzly Holdings Pty Ltd.',
    copyrightText: '© 2026 Juzly Holdings Pty Ltd. All rights reserved.',
    route: '/'
  },
  technologies: {
    id: 'technologies',
    key: 'technologies',
    name: 'Juzly Technologies',
    companyName: 'Juzly Technologies',
    endorsement: 'Juzly Technologies. A division of Juzly Holdings Pty Ltd.',
    copyrightText: '© 2026 Juzly Technologies. A division of Juzly Holdings Pty Ltd. All rights reserved.',
    route: '/technologies'
  },
  bi: {
    id: 'bi',
    key: 'bi',
    name: 'Juzly Business Intelligence',
    companyName: 'Juzly Business Intelligence',
    endorsement: 'Juzly Business Intelligence. A division of Juzly Holdings Pty Ltd.',
    copyrightText: '© 2026 Juzly Business Intelligence. A division of Juzly Holdings Pty Ltd. All rights reserved.',
    route: '/bi'
  },
  solutions: {
    id: 'solutions',
    key: 'solutions',
    name: 'Juzly Integrated Solutions',
    companyName: 'Juzly Integrated Solutions',
    endorsement: 'Juzly Integrated Solutions. A division of Juzly Holdings Pty Ltd.',
    copyrightText: '© 2026 Juzly Integrated Solutions. A division of Juzly Holdings Pty Ltd. All rights reserved.',
    route: '/solutions'
  },
  experiences: {
    id: 'experiences',
    key: 'experiences',
    name: 'Juzly Experiences',
    companyName: 'Juzly Experiences',
    endorsement: 'Juzly Experiences. A division of Juzly Holdings Pty Ltd.',
    copyrightText: '© 2026 Juzly Experiences. A division of Juzly Holdings Pty Ltd. All rights reserved.',
    route: '/experiences'
  },
  holidays: {
    id: 'holidays',
    key: 'holidays',
    name: 'Juzly Holidays',
    companyName: 'Juzly Holidays',
    endorsement: 'Juzly Holidays. A division of Juzly Holdings Pty Ltd.',
    copyrightText: '© 2026 Juzly Holidays. A division of Juzly Holdings Pty Ltd. All rights reserved.',
    route: '/holidays'
  }
};

function resolveCurrentEntity() {
  // 1. Explicit data-entity attribute on html, body, or footer
  const explicitAttr = 
    document.documentElement.getAttribute('data-entity') ||
    (document.body && document.body.getAttribute('data-entity')) ||
    (document.getElementById('site-footer') && document.getElementById('site-footer').getAttribute('data-entity'));

  if (explicitAttr && ENTITY_STANDARDS[explicitAttr.toLowerCase()]) {
    return ENTITY_STANDARDS[explicitAttr.toLowerCase()];
  }

  // 2. Query param ?entity=... (for previewing and QA across entities)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('entity');
    if (param && ENTITY_STANDARDS[param.toLowerCase()]) {
      return ENTITY_STANDARDS[param.toLowerCase()];
    }
  } catch (e) {}

  // 3. Meta tag <meta name="entity" content="...">
  const metaTag = document.querySelector('meta[name="entity"]');
  if (metaTag) {
    const content = metaTag.getAttribute('content');
    if (content && ENTITY_STANDARDS[content.toLowerCase()]) {
      return ENTITY_STANDARDS[content.toLowerCase()];
    }
  }

  // 4. URL pathname routing matching
  const path = (window.location.pathname || '').toLowerCase();
  if (path.includes('/technologies') || path.includes('technologies.html')) {
    return ENTITY_STANDARDS.technologies;
  }
  if (path.includes('/bi') || path.includes('bi.html')) {
    return ENTITY_STANDARDS.bi;
  }
  if (path.includes('/solutions') || path.includes('solutions.html') || path.includes('digital.html')) {
    return ENTITY_STANDARDS.solutions;
  }
  if (path.includes('/experiences') || path.includes('experiences.html') || path.includes('events.html')) {
    return ENTITY_STANDARDS.experiences;
  }
  if (path.includes('/holidays') || path.includes('holidays.html')) {
    return ENTITY_STANDARDS.holidays;
  }

  // 5. Default fallback: Root Corporate Pages (Juzly Holdings)
  return ENTITY_STANDARDS.holdings;
}

function renderFooter() {
  let footerEl = document.getElementById('site-footer');
  if (!footerEl) {
    footerEl = document.createElement('footer');
    footerEl.id = 'site-footer';
    footerEl.className = 'site-footer';
    document.body.appendChild(footerEl);
  }
  const base = getBasePath();
  const entity = resolveCurrentEntity();

  footerEl.className = 'site-footer';
  footerEl.setAttribute('data-active-entity', entity.id);
  
  footerEl.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${base}index.html" class="brand_mark">JUZLY<span>.</span></a>
          <p style="margin-top: 1rem; line-height: 1.6; font-size: 0.92rem; color: var(--footer-text);" data-i18n="tagline">
            Juzly Holdings directs institutional governance, integrated enterprise systems, high stakes stagecraft, and autonomous wilderness expeditions across international markets.
          </p>
          <div style="margin-top: 1.25rem;">
            <span class="dual-hub-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <span data-i18n="dual_hub_hq">Australia (HQ) | Sri Lanka</span>
            </span>
          </div>
          <div class="footer-contact-info" style="margin-top: 1.25rem;">
            <p class="footer-company-name">${entity.companyName}</p>
            <p class="footer-email">
              <a href="mailto:hello@juzly.net">hello@juzly.net</a>
            </p>
          </div>
          <div class="footer-social-links" style="margin-top: 1.25rem; display: flex; align-items: center; gap: 0.75rem;">
            <a href="https://www.linkedin.com/company/juzly-holdings/" target="_blank" rel="noopener noreferrer" class="footer-social-icon" aria-label="LinkedIn" title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z"/>
              </svg>
            </a>
            <a href="https://www.x.com/juzly" target="_blank" rel="noopener noreferrer" class="footer-social-icon" aria-label="Twitter / X" title="Twitter / X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <div class="footer-heading" data-i18n="footer_discover">Discover</div>
          <ul class="footer-links">
            <li class="footer-link-item"><a href="${base}about.html" data-i18n="nav_about">About Us</a></li>
            <li class="footer-link-item"><a href="${base}brandjuzly.html" data-i18n="nav_brand">Brand Philosophy</a></li>
            <li class="footer-link-item"><a href="${base}impact.html" data-i18n="footer_social_impact">Social Impact</a></li>
            <li class="footer-link-item"><a href="${base}esg.html" data-i18n="nav_esg">ESG & Sustainability</a></li>
            <li class="footer-link-item"><a href="${base}insights.html" data-i18n="nav_insights">Insights</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-heading" data-i18n="footer_business_operations">Business Operations</div>
          <ul class="footer-links">
            <li class="footer-link-item"><a href="${base}technologies.html" data-i18n="op_technologies">Juzly Technologies</a></li>
            <li class="footer-link-item"><a href="${base}bi.html" data-i18n="op_bi">Juzly Business Intelligence</a></li>
            <li class="footer-link-item"><a href="${base}digital.html" data-i18n="op_solutions">Juzly Integrated Solutions</a></li>
            <li class="footer-link-item"><a href="${base}events.html" data-i18n="op_experiences">Juzly Experiences</a></li>
            <li class="footer-link-item"><a href="${base}holidays.html" data-i18n="op_holidays">Juzly Holidays</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-copyright-statement">&copy; 2026 <span class="footer-endorsement">${entity.endorsement}</span> <span data-i18n="rights_reserved">All rights reserved.</span></div>
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
          <a href="${base}about/modern_slavery.html" data-i18n="footer_modern_slavery">Modern Slavery</a>
          <a href="${base}privacy.html" data-i18n="privacy_policy">Privacy Policy</a>
          <a href="${base}terms.html" data-i18n="terms_service">Terms of Service</a>
          <a href="${base}sitemap.html" data-i18n="sitemap">Sitemap</a>
        </div>
      </div>
    </div>
  `;

  if (window.applyTranslations) {
    window.applyTranslations(footerEl);
  }
}

window.ENTITY_STANDARDS = ENTITY_STANDARDS;
window.resolveCurrentEntity = resolveCurrentEntity;
window.JuzlyEntity = {
  standards: ENTITY_STANDARDS,
  resolve: resolveCurrentEntity,
  setEntity: function(entityKey) {
    if (ENTITY_STANDARDS[entityKey]) {
      document.documentElement.setAttribute('data-entity', entityKey);
      renderFooter();
    }
  }
};

function renderWhatsAppFAB() {
  if (document.getElementById('whatsapp-fab')) return;
  const a = document.createElement('a');
  a.id = 'whatsapp-fab';
  a.className = 'whatsapp-float';
  a.href = 'https://wa.me/94772249433';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.setAttribute('aria-label', 'Chat with Juzly on WhatsApp');
  a.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.077-1.782-.397-1.391-.575-2.28-1.996-2.35-2.09-.07-.094-.564-.75-.564-1.433 0-.683.353-1.02.48-1.16.128-.14.281-.175.375-.175.093 0 .187.002.268.006.086.005.2-.033.313.238.117.28.401.978.436 1.05.035.072.059.156.012.25-.047.094-.07.153-.14.234-.07.082-.148.183-.211.246-.07.07-.143.146-.062.285.082.14.364.601.781.972.538.479.992.628 1.132.698.14.07.222.059.304-.035.082-.094.35-.407.443-.547.093-.14.187-.117.313-.07.128.047.812.383.952.453.14.07.234.105.268.164.035.059.035.342-.109.747zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.982-1.394A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>';
  document.body.appendChild(a);
}

function highlightActiveLinks() {
  const currentPath = window.location.pathname.toLowerCase();
  document.querySelectorAll('.nav_direct_link, .menu_trigger, .dropdown_row, .mobile_nav_link, .mobile_sublink, .nav-link, .dropdown-link, .mobile-nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    const cleanHref = href.replace('../', '').replace('./', '').replace('/', '').toLowerCase();
    const isHome = (cleanHref === '' || cleanHref === 'index.html');
    const isCurrent = (cleanHref !== '' && (currentPath.endsWith(cleanHref) || currentPath.endsWith(cleanHref + '/'))) ||
      (isHome && (currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath === ''));
    if (isCurrent) {
      link.classList.add('active');
      const parentNode = link.closest('.menu_node');
      if (parentNode && parentNode.querySelector('.menu_trigger')) {
        parentNode.querySelector('.menu_trigger').classList.add('active');
      }
      const parentDropdown = link.closest('.nav-item');
      if (parentDropdown && parentDropdown.querySelector('.dropdown-toggle')) {
        parentDropdown.querySelector('.dropdown-toggle').classList.add('active');
      }
    } else {
      link.classList.remove('active');
    }
  });
}

function handleFormSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const form = document.getElementById('rfp-form');
  const feedback = document.getElementById('form-feedback');
  if (feedback) feedback.style.display = 'block';
  if (form) form.reset();
}
window.handleFormSubmit = handleFormSubmit;

function initNav() {
  try { initTheme(); } catch (err) { console.error('Theme init error:', err); }
  try { renderHeader(); } catch (err) { console.error('Header render error:', err); }
  try { renderFooter(); } catch (err) { console.error('Footer render error:', err); }
  try { renderWhatsAppFAB(); } catch (err) { console.error('FAB render error:', err); }
  try { highlightActiveLinks(); } catch (err) { console.error('Link highlight error:', err); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNav);
} else {
  initNav();
}