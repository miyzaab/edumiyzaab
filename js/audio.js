// Category Definitions
const audioCategories = [
  { id: 'all', name: 'Semua', icon: '🎵' },
  { id: 'sirah', name: 'Sirah Nabawiyah', icon: '📜' },
  { id: 'aqidah', name: 'Aqidah', icon: '☪️' },
  { id: 'fiqih', name: 'Fiqih', icon: '📖' },
  { id: 'hadits', name: 'Hadits', icon: '📿' },
  { id: 'tafsir', name: 'Tafsir', icon: '🕌' }
];

// Audio Tracks with Categories
const tracks = [
  {
    title: 'Kelahiran Rasulullah SAW',
    author: 'Ustadz Abdullah Roy',
    category: 'sirah',
    src: 'assets/audio/sample.mp3',
    color: 'linear-gradient(135deg, #10b981, #059669)'
  },
  {
    title: 'Hijrah ke Madinah',
    author: 'Ustadz Abdullah Roy',
    category: 'sirah',
    src: 'assets/audio/sample.mp3',
    color: 'linear-gradient(135deg, #3b82f6, #2563eb)'
  },
  {
    title: 'Tauhid Rububiyah',
    author: 'Ustadz Abdullah Roy',
    category: 'aqidah',
    src: 'assets/audio/sample.mp3',
    color: 'linear-gradient(135deg, #f59e0b, #d97706)'
  },
  {
    title: 'Rukun Iman',
    author: 'Ustadz Abdullah Roy',
    category: 'aqidah',
    src: 'assets/audio/sample.mp3',
    color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
  },
  {
    title: 'Thaharah dan Wudhu',
    author: 'Ustadz Abdullah Roy',
    category: 'fiqih',
    src: 'assets/audio/sample.mp3',
    color: 'linear-gradient(135deg, #ec4899, #db2777)'
  },
  {
    title: 'Hadits 1: Niat dan Ikhlas',
    author: 'Ustadz Abdullah Roy',
    category: 'hadits',
    src: 'assets/audio/sample.mp3',
    color: 'linear-gradient(135deg, #10b981, #059669)'
  },
  {
    title: 'Hadits 40: Zuhud',
    author: 'Ustadz Abdullah Roy',
    category: 'hadits',
    src: 'assets/audio/sample.mp3',
    color: 'linear-gradient(135deg, #3b82f6, #2563eb)'
  },
  {
    title: 'Tafsir Al-Fatihah',
    author: 'Ustadz Abdullah Roy',
    category: 'tafsir',
    src: 'assets/audio/sample.mp3',
    color: 'linear-gradient(135deg, #f59e0b, #d97706)'
  }
];


let currentIndex = 0;
let isPlaying = false;
let currentCategory = 'all'; // Track selected category
let filteredTracks = tracks; // Tracks to display

// DOM Elements
const audio = document.getElementById('audioElement');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const trackTitle = document.getElementById('trackTitle');
const trackAuthor = document.getElementById('trackAuthor');
const albumArt = document.getElementById('albumArt');
const audioList = document.getElementById('audioList');
const trackCount = document.getElementById('trackCount');
const visualizer = document.getElementById('visualizer');
const categoryTabs = document.getElementById('categoryTabs');

// Initialize
function initPlayer() {
  renderCategoryTabs();
  filterTracksByCategory('all');
  loadTrack(currentIndex);
}


// Render Category Tabs
function renderCategoryTabs() {
  categoryTabs.innerHTML = '';
  audioCategories.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    if (category.id === currentCategory) {
      btn.classList.add('active');
    }
    btn.innerHTML = `<span>${category.icon}</span><span>${category.name}</span>`;
    btn.addEventListener('click', () => filterTracksByCategory(category.id));
    categoryTabs.appendChild(btn);
  });
}

// Filter Tracks by Category
function filterTracksByCategory(categoryId) {
  currentCategory = categoryId;

  if (categoryId === 'all') {
    filteredTracks = tracks;
  } else {
    filteredTracks = tracks.filter(track => track.category === categoryId);
  }

  currentIndex = 0;
  renderCategoryTabs();
  renderPlaylist();
  trackCount.textContent = `${filteredTracks.length} Trek`;

  if (filteredTracks.length > 0) {
    loadTrack(currentIndex);
  }
}

// Load Track
function loadTrack(index) {
  const track = filteredTracks[index];
  trackTitle.textContent = track.title;
  trackAuthor.textContent = track.author;
  audio.src = track.src;

  // Update Album Art Color
  albumArt.style.background = track.color;

  // Highlight Playlist Item
  document.querySelectorAll('.audio-item').forEach((item, i) => {
    if (i === index) item.classList.add('active');
    else item.classList.remove('active');
  });

  // Default visual state
  updatePlayButton();
}

// Render Playlist
function renderPlaylist() {
  audioList.innerHTML = '';
  filteredTracks.forEach((track, index) => {
    const item = document.createElement('div');
    item.className = 'audio-item';
    item.innerHTML = `
      <div class="mini-icon" style="background: ${track.color}">♫</div>
      <div class="info">
        <h4>${track.title}</h4>
        <p>${track.author}</p>
      </div>
      <div class="wave-mini"></div>
    `;
    item.addEventListener('click', () => {
      currentIndex = index;
      loadTrack(currentIndex);
      playAudio();
    });
    audioList.appendChild(item);
  });
}

// Play/Pause Control
function togglePlay() {
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

function playAudio() {
  isPlaying = true;
  audio.play();
  updatePlayButton();
  visualizer.classList.add('active');
}

function pauseAudio() {
  isPlaying = false;
  audio.pause();
  updatePlayButton();
  visualizer.classList.remove('active');
}

function updatePlayButton() {
  playBtn.textContent = isPlaying ? '⏸' : '▶';
}

function nextTrack() {
  currentIndex = (currentIndex + 1) % filteredTracks.length;
  loadTrack(currentIndex);
  playAudio();
}

function prevTrack() {
  currentIndex = (currentIndex - 1 + filteredTracks.length) % filteredTracks.length;
  loadTrack(currentIndex);
  playAudio();
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);
audio.addEventListener('ended', nextTrack);

function updateProgress() {
  const { duration, currentTime } = audio;
  if (isNaN(duration)) return;
  const percent = (currentTime / duration) * 100;
  progress.value = percent;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

function setProgress(e) {
  const width = this.value;
  const duration = audio.duration;
  audio.currentTime = (width / 100) * duration;
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Start
initPlayer();
