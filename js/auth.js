const form = document.getElementById('loginForm');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate API call
    const email = form.querySelector('input[type="email"]').value;

    if (email) {
      localStorage.setItem('user_session', 'active');
      localStorage.setItem('user_email', email);
      alert('Login berhasil!');
      window.location.href = 'index.html';
    }
  });
}
