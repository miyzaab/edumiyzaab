/* PROTECT PAGE */
// Cek apakah user sudah login
const session = localStorage.getItem('user_session');

if (session !== 'active') {
    alert('Silakan untuk login terlebih dahulu.');
    window.location.href = 'login.html';
}
