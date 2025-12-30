const videos = [
    {
        id: '2K3q1YkKkwY',
        title: 'Nasihat Emas: Waktu Mustajab Berdoa - Ustadz Dr. Syafiq Riza Basalamah',
        thumbnail: 'https://img.youtube.com/vi/2K3q1YkKkwY/mqdefault.jpg'
    },
    {
        id: '9N6K1xL3ggU',
        title: 'Ceramah Singkat: Dahsyatnya Sedekah - Ustadz Khalid Basalamah',
        thumbnail: 'https://img.youtube.com/vi/9N6K1xL3ggU/mqdefault.jpg'
    },
    {
        id: 'J_7y7jJ_kO0',
        title: 'Kisah Inspiratif: Adab Terhadap Orang Tua',
        thumbnail: 'https://img.youtube.com/vi/J_7y7jJ_kO0/mqdefault.jpg'
    },
    {
        id: '8v3f2x5Z7zQ',
        title: '5 Menit yang Menginspirasi: Keutamaan Shalat Subuh',
        thumbnail: 'https://img.youtube.com/vi/8v3f2x5Z7zQ/mqdefault.jpg'
    }
];

const mainPlayer = document.getElementById('mainPlayer');
const mainTitle = document.getElementById('mainTitle');
const playlistGrid = document.getElementById('playlistGrid');

// Initialize first video
if (videos.length > 0) {
    loadVideo(videos[0]);
}

// Render Playlist
videos.forEach(video => {
    const card = document.createElement('div');
    card.className = 'playlist-item';
    card.innerHTML = `
    <img src="${video.thumbnail}" alt="${video.title}">
    <div class="info">
      <h4>${video.title}</h4>
      <span class="play-icon">▶ Putar</span>
    </div>
  `;

    card.addEventListener('click', () => {
        loadVideo(video);
        // Visual feedback
        document.querySelectorAll('.playlist-item').forEach(el => el.classList.remove('active'));
        card.classList.add('active');
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    playlistGrid.appendChild(card);
});

function loadVideo(video) {
    mainPlayer.src = `https://www.youtube.com/embed/${video.id}?autoplay=1`;
    mainTitle.textContent = video.title;
}
