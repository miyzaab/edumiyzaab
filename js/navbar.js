fetch('navbar.html')
  .then(res => res.text())
  .then(html => {
    // Inject navbar
    document.getElementById('navbar').innerHTML = html;

    /* =========================
       HAMBURGER MENU
    ========================= */
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');

    if (hamburger && menu) {
      hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
      });
    }

    /* =========================
       ACTIVE MENU
    ========================= */
    const page = document.body.dataset.page;
    const activeLink = document.querySelector(`a[data-page="${page}"]`);
    if (activeLink) activeLink.classList.add('active');

    /* =========================
       DARK MODE (GLOBAL)
    ========================= */
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const body = document.body;

    // Function to update UI for all toggles
    const updateThemeUI = (isDark) => {
      const icon = isDark ? '☀️' : '🌙';
      const text = isDark ? '☀️ Mode Terang' : '🌙 Mode Gelap';

      if (themeToggle) themeToggle.textContent = icon;
      if (mobileThemeToggle) {
        mobileThemeToggle.textContent = text;
        // Optional: Update styling for active state if needed
      }
    };

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark');
      updateThemeUI(true);
    } else {
      updateThemeUI(false);
    }

    // Toggle function
    const toggleTheme = () => {
      const isDark = body.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeUI(isDark);
    };

    // Attach to both toggles
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    if (mobileThemeToggle) {
      mobileThemeToggle.addEventListener('click', toggleTheme);
    }
  });

/* =========================
   FIREBASE AUTH STATE
========================= */
import('./auth.js').then(({ checkAuth, logout }) => {
  checkAuth((user) => {
    const loginBtn = document.querySelectorAll('.btn-login');

    if (user) {
      // User is logged in - show logout button
      loginBtn.forEach(btn => {
        btn.textContent = 'Keluar';
        btn.href = '#';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('user_email');
          window.location.reload();
        });
      });
    }

  });
