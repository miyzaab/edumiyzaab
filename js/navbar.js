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
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark');
      themeToggle.textContent = '☀️';
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');

      if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
      } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
      }
    });

    /* =========================
       AUTH STATE
    ========================= */
    const isLoggedIn = localStorage.getItem('user_session') === 'active';
    const loginBtn = document.querySelector('.btn-login');

    if (isLoggedIn && loginBtn) {
      loginBtn.textContent = 'Keluar';
      loginBtn.href = '#';
      loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('user_session');
        localStorage.removeItem('user_email');
        window.location.reload();
      });
    }
  });
