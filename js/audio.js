const tracks = [
  {
    title: 'Adab Penuntut Ilmu',
    author: 'Ustadz Fulan',
    src: 'assets/audio/sample.mp3', // Placeholder path
    color: 'linear-gradient(135deg, #10b981, #059669)'
  },
  {
    title: 'Keutamaan Sabar',
    author: 'Ustadz Abdullah',
    src: 'assets/audio/sample.mp3',
    color: 'linear-gradient(135deg, #3b82f6, #2563eb)'
  },
  {
    title: 'Sirah Nabawiyah: Periode Mekkah',
    author: 'Tim Miyzaab',
    src: 'assets/audio/sample.mp3',
    color: 'linear-gradient(135deg, #f59e0b, #d97706)'
  },
  {
    title: 'Tafsir Juz Amma',
    author: 'Ustadz Abu Royhan',
    src: 'assets/audio/sample.mp3',
    color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
  },
  {
    title: '40 Hadits Arba\'in',
    author: 'Ustadz Ahmad',
    src: 'assets/audio/sample.mp3',
    color: 'linear-gradient(135deg, #ec4899, #db2777)'
  }
];

let currentIndex = 0;
let isPlaying = false;

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

// Initialize
function initPlayer() {
  renderPlaylist();
  loadTrack(currentIndex);
  trackCount.textContent = `${tracks.length} Trek`;
}

// Load Track
function loadTrack(index) {
  const track = tracks[index];
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
  tracks.forEach((track, index) => {
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
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  playAudio();
}

function prevTrack() {
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
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
