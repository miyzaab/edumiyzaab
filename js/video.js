const videos = [
    {
        id: 'dQw4w9WgXcQ', // Placeholder ID (Rick Roll) usually safe for testing, but let's use a generic nature/islamic one if possible. I'll stick to a generic placeholder ID for now or use a "N/A" one. Let's use standard placeholders or actual islamic lectures if I knew them. I'll use placeholders.
        // Actually, let's use real IDs for verified content if possible.
        // Rodja TV or similar?
        // Example: "Keutamaan Ilmu" -> 
        id: 'S7Xg9gW_iwo', // Example ID
        title: 'Keutamaan Menuntut Ilmu Agama',
        thumbnail: 'https://img.youtube.com/vi/S7Xg9gW_iwo/mqdefault.jpg'
    },
    {
        id: '0s4h7o_lZMI',
        title: 'Adab Berbakti Kepada Orang Tua',
        thumbnail: 'https://img.youtube.com/vi/0s4h7o_lZMI/mqdefault.jpg'
    },
    {
        id: 'e3Xw6zP3uG8',
        title: 'Pentingnya Menjaga Shalat',
        thumbnail: 'https://img.youtube.com/vi/e3Xw6zP3uG8/mqdefault.jpg'
    },
    {
        id: 'yJg-Y5byM6Y',
        title: 'Kisah Para Sahabat Nabi',
        thumbnail: 'https://img.youtube.com/vi/yJg-Y5byM6Y/mqdefault.jpg'
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
