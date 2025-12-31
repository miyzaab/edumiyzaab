// Admin CMS JavaScript
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Admin emails whitelist
const ADMIN_EMAILS = ['ziaabdurrofi@gmail.com'];

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const authRequired = document.getElementById('authRequired');
const adminContainer = document.getElementById('adminContainer');
const userEmailSpan = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');

// Tab Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Collection References
const articlesRef = collection(db, 'articles');
const videosRef = collection(db, 'videos');
const audioRef = collection(db, 'audio');
const quizzesRef = collection(db, 'quizzes');

// Data Storage
let articlesData = [];
let videosData = [];
let audioData = [];
let quizzesData = [];

// ==================== AUTH ====================
onAuthStateChanged(auth, async (user) => {
    loadingScreen.style.display = 'none';

    console.log('Auth state changed:', user ? user.email : 'No user');

    if (user) {
        // Check if user is admin
        const isAdmin = ADMIN_EMAILS.includes(user.email);
        console.log('User email:', user.email, 'Is admin:', isAdmin);

        if (isAdmin) {
            // Admin logged in
            adminContainer.style.display = 'block';
            authRequired.style.display = 'none';
            userEmailSpan.textContent = user.email;

            // Load all data
            await loadAllData();
        } else {
            // Logged in but not admin - show their email
            adminContainer.style.display = 'none';
            authRequired.style.display = 'flex';
            authRequired.querySelector('p').innerHTML =
                `Email <strong>${user.email}</strong> tidak memiliki akses admin.<br>` +
                `Admin yang diizinkan: <code>${ADMIN_EMAILS.join(', ')}</code>`;
        }
    } else {
        // Not logged in
        adminContainer.style.display = 'none';
        authRequired.style.display = 'flex';
        authRequired.querySelector('p').textContent = 'Anda harus login sebagai admin untuk mengakses halaman ini.';
    }
});

// Logout
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = 'index.html';
    } catch (error) {
        showToast('Gagal logout: ' + error.message, 'error');
    }
});

// ==================== TABS ====================
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;

        // Update buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update content
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
            }
        });
    });
});

// ==================== LOAD DATA ====================
async function loadAllData() {
    try {
        await Promise.all([
            loadArticles(),
            loadVideos(),
            loadAudio(),
            loadQuizzes()
        ]);
        updateDashboard();
    } catch (error) {
        console.error('Error loading data:', error);
        showToast('Gagal memuat data', 'error');
    }
}

async function loadArticles() {
    try {
        const q = query(articlesRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        articlesData = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
        renderArticlesTable();
        document.getElementById('articleCount').textContent = articlesData.length;
    } catch (error) {
        console.error('Error loading articles:', error);
        articlesData = [];
        renderArticlesTable();
    }
}

async function loadVideos() {
    try {
        const q = query(videosRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        videosData = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
        renderVideosTable();
        document.getElementById('videoCount').textContent = videosData.length;
    } catch (error) {
        console.error('Error loading videos:', error);
        videosData = [];
        renderVideosTable();
    }
}

async function loadAudio() {
    try {
        const q = query(audioRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        audioData = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
        renderAudioTable();
        document.getElementById('audioCount').textContent = audioData.length;
    } catch (error) {
        console.error('Error loading audio:', error);
        audioData = [];
        renderAudioTable();
    }
}

async function loadQuizzes() {
    try {
        const q = query(quizzesRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        quizzesData = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
        renderQuizzesTable();
        document.getElementById('quizCount').textContent = quizzesData.length;
    } catch (error) {
        console.error('Error loading quizzes:', error);
        quizzesData = [];
        renderQuizzesTable();
    }
}

function updateDashboard() {
    document.getElementById('statArticles').textContent = articlesData.length;
    document.getElementById('statVideos').textContent = videosData.length;
    document.getElementById('statAudio').textContent = audioData.length;
    document.getElementById('statQuizzes').textContent = quizzesData.length;
}

// ==================== RENDER TABLES ====================
function renderArticlesTable() {
    const tbody = document.getElementById('articlesTableBody');

    if (articlesData.length === 0) {
        tbody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-state">
          <div class="icon">📝</div>
          <p>Belum ada artikel</p>
        </td>
      </tr>
    `;
        return;
    }

    tbody.innerHTML = articlesData.map(article => `
    <tr>
      <td><strong>${escapeHtml(article.title)}</strong></td>
      <td>${escapeHtml(article.author)}</td>
      <td>${escapeHtml(article.date || '-')}</td>
      <td class="actions">
        <button class="btn btn-secondary btn-sm" onclick="editArticle('${article.docId}')">✏️ Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteArticle('${article.docId}')">🗑️ Hapus</button>
      </td>
    </tr>
  `).join('');
}

function renderVideosTable() {
    const tbody = document.getElementById('videosTableBody');

    if (videosData.length === 0) {
        tbody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-state">
          <div class="icon">🎬</div>
          <p>Belum ada video</p>
        </td>
      </tr>
    `;
        return;
    }

    tbody.innerHTML = videosData.map(video => `
    <tr>
      <td><strong>${escapeHtml(video.title)}</strong></td>
      <td><code>${escapeHtml(video.youtubeId)}</code></td>
      <td>${escapeHtml(video.duration || '-')}</td>
      <td class="actions">
        <button class="btn btn-secondary btn-sm" onclick="editVideo('${video.docId}')">✏️ Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteVideo('${video.docId}')">🗑️ Hapus</button>
      </td>
    </tr>
  `).join('');
}

function renderAudioTable() {
    const tbody = document.getElementById('audioTableBody');

    if (audioData.length === 0) {
        tbody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-state">
          <div class="icon">🎧</div>
          <p>Belum ada audio</p>
        </td>
      </tr>
    `;
        return;
    }

    tbody.innerHTML = audioData.map(audio => `
    <tr>
      <td><strong>${escapeHtml(audio.title)}</strong></td>
      <td>${escapeHtml(audio.speaker || '-')}</td>
      <td>${escapeHtml(audio.duration || '-')}</td>
      <td class="actions">
        <button class="btn btn-secondary btn-sm" onclick="editAudio('${audio.docId}')">✏️ Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteAudio('${audio.docId}')">🗑️ Hapus</button>
      </td>
    </tr>
  `).join('');
}

function renderQuizzesTable() {
    const tbody = document.getElementById('quizzesTableBody');

    if (quizzesData.length === 0) {
        tbody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-state">
          <div class="icon">❓</div>
          <p>Belum ada quiz</p>
        </td>
      </tr>
    `;
        return;
    }

    tbody.innerHTML = quizzesData.map(quiz => `
    <tr>
      <td><strong>${escapeHtml(quiz.title)}</strong></td>
      <td>${quiz.questions ? quiz.questions.length : 0} soal</td>
      <td>${escapeHtml(quiz.category || '-')}</td>
      <td class="actions">
        <button class="btn btn-secondary btn-sm" onclick="editQuiz('${quiz.docId}')">✏️ Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteQuiz('${quiz.docId}')">🗑️ Hapus</button>
      </td>
    </tr>
  `).join('');
}

// ==================== ARTICLE CRUD ====================
window.openArticleModal = function (docId = null) {
    const modal = document.getElementById('articleModal');
    const title = document.getElementById('articleModalTitle');
    const form = document.getElementById('articleForm');

    form.reset();
    document.getElementById('articleId').value = '';

    if (docId) {
        const article = articlesData.find(a => a.docId === docId);
        if (article) {
            title.textContent = 'Edit Artikel';
            document.getElementById('articleId').value = docId;
            document.getElementById('articleTitle').value = article.title;
            document.getElementById('articleAuthor').value = article.author;
            document.getElementById('articleThumb').value = article.thumb || 'thumb-1';
            document.getElementById('articleContent').value = article.content;
        }
    } else {
        title.textContent = 'Tambah Artikel';
    }

    modal.classList.add('active');
};

window.closeArticleModal = function () {
    document.getElementById('articleModal').classList.remove('active');
};

window.editArticle = function (docId) {
    window.openArticleModal(docId);
};

window.saveArticle = async function () {
    const docId = document.getElementById('articleId').value;
    const title = document.getElementById('articleTitle').value.trim();
    const author = document.getElementById('articleAuthor').value.trim();
    const thumb = document.getElementById('articleThumb').value;
    const content = document.getElementById('articleContent').value.trim();

    if (!title || !author || !content) {
        showToast('Mohon isi semua field yang wajib', 'error');
        return;
    }

    const articleData = {
        title,
        author,
        thumb,
        content,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        updatedAt: serverTimestamp()
    };

    try {
        if (docId) {
            // Update existing
            await updateDoc(doc(db, 'articles', docId), articleData);
            showToast('Artikel berhasil diperbarui', 'success');
        } else {
            // Create new
            articleData.createdAt = serverTimestamp();
            await addDoc(articlesRef, articleData);
            showToast('Artikel berhasil ditambahkan', 'success');
        }

        closeArticleModal();
        await loadArticles();
        updateDashboard();
    } catch (error) {
        console.error('Error saving article:', error);
        showToast('Gagal menyimpan artikel: ' + error.message, 'error');
    }
};

window.deleteArticle = async function (docId) {
    if (!confirm('Yakin ingin menghapus artikel ini?')) return;

    try {
        await deleteDoc(doc(db, 'articles', docId));
        showToast('Artikel berhasil dihapus', 'success');
        await loadArticles();
        updateDashboard();
    } catch (error) {
        console.error('Error deleting article:', error);
        showToast('Gagal menghapus artikel: ' + error.message, 'error');
    }
};

// ==================== VIDEO CRUD ====================
window.openVideoModal = function (docId = null) {
    const modal = document.getElementById('videoModal');
    const title = document.getElementById('videoModalTitle');
    const form = document.getElementById('videoForm');

    form.reset();
    document.getElementById('videoId').value = '';

    if (docId) {
        const video = videosData.find(v => v.docId === docId);
        if (video) {
            title.textContent = 'Edit Video';
            document.getElementById('videoId').value = docId;
            document.getElementById('videoTitle').value = video.title;
            document.getElementById('videoYoutubeId').value = video.youtubeId;
            document.getElementById('videoDuration').value = video.duration || '';
            document.getElementById('videoDescription').value = video.description || '';
        }
    } else {
        title.textContent = 'Tambah Video';
    }

    modal.classList.add('active');
};

window.closeVideoModal = function () {
    document.getElementById('videoModal').classList.remove('active');
};

window.editVideo = function (docId) {
    window.openVideoModal(docId);
};

window.saveVideo = async function () {
    const docId = document.getElementById('videoId').value;
    const title = document.getElementById('videoTitle').value.trim();
    const youtubeId = document.getElementById('videoYoutubeId').value.trim();
    const duration = document.getElementById('videoDuration').value.trim();
    const description = document.getElementById('videoDescription').value.trim();

    if (!title || !youtubeId) {
        showToast('Mohon isi judul dan YouTube ID', 'error');
        return;
    }

    const videoData = {
        title,
        youtubeId,
        duration,
        description,
        updatedAt: serverTimestamp()
    };

    try {
        if (docId) {
            await updateDoc(doc(db, 'videos', docId), videoData);
            showToast('Video berhasil diperbarui', 'success');
        } else {
            videoData.createdAt = serverTimestamp();
            await addDoc(videosRef, videoData);
            showToast('Video berhasil ditambahkan', 'success');
        }

        closeVideoModal();
        await loadVideos();
        updateDashboard();
    } catch (error) {
        console.error('Error saving video:', error);
        showToast('Gagal menyimpan video: ' + error.message, 'error');
    }
};

window.deleteVideo = async function (docId) {
    if (!confirm('Yakin ingin menghapus video ini?')) return;

    try {
        await deleteDoc(doc(db, 'videos', docId));
        showToast('Video berhasil dihapus', 'success');
        await loadVideos();
        updateDashboard();
    } catch (error) {
        console.error('Error deleting video:', error);
        showToast('Gagal menghapus video: ' + error.message, 'error');
    }
};

// ==================== AUDIO CRUD ====================
window.openAudioModal = function (docId = null) {
    const modal = document.getElementById('audioModal');
    const title = document.getElementById('audioModalTitle');
    const form = document.getElementById('audioForm');

    form.reset();
    document.getElementById('audioDocId').value = '';

    if (docId) {
        const audio = audioData.find(a => a.docId === docId);
        if (audio) {
            title.textContent = 'Edit Audio';
            document.getElementById('audioDocId').value = docId;
            document.getElementById('audioTitle').value = audio.title;
            document.getElementById('audioSpeaker').value = audio.speaker || '';
            document.getElementById('audioDuration').value = audio.duration || '';
            document.getElementById('audioUrl').value = audio.url || '';
        }
    } else {
        title.textContent = 'Tambah Audio';
    }

    modal.classList.add('active');
};

window.closeAudioModal = function () {
    document.getElementById('audioModal').classList.remove('active');
};

window.editAudio = function (docId) {
    window.openAudioModal(docId);
};

window.saveAudio = async function () {
    const docId = document.getElementById('audioDocId').value;
    const title = document.getElementById('audioTitle').value.trim();
    const speaker = document.getElementById('audioSpeaker').value.trim();
    const duration = document.getElementById('audioDuration').value.trim();
    const url = document.getElementById('audioUrl').value.trim();

    if (!title || !url) {
        showToast('Mohon isi judul dan URL audio', 'error');
        return;
    }

    const audioDataToSave = {
        title,
        speaker,
        duration,
        url,
        updatedAt: serverTimestamp()
    };

    try {
        if (docId) {
            await updateDoc(doc(db, 'audio', docId), audioDataToSave);
            showToast('Audio berhasil diperbarui', 'success');
        } else {
            audioDataToSave.createdAt = serverTimestamp();
            await addDoc(audioRef, audioDataToSave);
            showToast('Audio berhasil ditambahkan', 'success');
        }

        closeAudioModal();
        await loadAudio();
        updateDashboard();
    } catch (error) {
        console.error('Error saving audio:', error);
        showToast('Gagal menyimpan audio: ' + error.message, 'error');
    }
};

window.deleteAudio = async function (docId) {
    if (!confirm('Yakin ingin menghapus audio ini?')) return;

    try {
        await deleteDoc(doc(db, 'audio', docId));
        showToast('Audio berhasil dihapus', 'success');
        await loadAudio();
        updateDashboard();
    } catch (error) {
        console.error('Error deleting audio:', error);
        showToast('Gagal menghapus audio: ' + error.message, 'error');
    }
};

// ==================== QUIZ CRUD ====================
window.openQuizModal = function (docId = null) {
    const modal = document.getElementById('quizModal');
    const title = document.getElementById('quizModalTitle');
    const form = document.getElementById('quizForm');

    form.reset();
    document.getElementById('quizDocId').value = '';

    if (docId) {
        const quiz = quizzesData.find(q => q.docId === docId);
        if (quiz) {
            title.textContent = 'Edit Quiz';
            document.getElementById('quizDocId').value = docId;
            document.getElementById('quizTitle').value = quiz.title;
            document.getElementById('quizCategory').value = quiz.category || '';
            document.getElementById('quizQuestions').value = JSON.stringify(quiz.questions || [], null, 2);
        }
    } else {
        title.textContent = 'Tambah Quiz';
    }

    modal.classList.add('active');
};

window.closeQuizModal = function () {
    document.getElementById('quizModal').classList.remove('active');
};

window.editQuiz = function (docId) {
    window.openQuizModal(docId);
};

window.saveQuiz = async function () {
    const docId = document.getElementById('quizDocId').value;
    const title = document.getElementById('quizTitle').value.trim();
    const category = document.getElementById('quizCategory').value.trim();
    const questionsStr = document.getElementById('quizQuestions').value.trim();

    if (!title) {
        showToast('Mohon isi judul quiz', 'error');
        return;
    }

    let questions = [];
    if (questionsStr) {
        try {
            questions = JSON.parse(questionsStr);
            if (!Array.isArray(questions)) {
                throw new Error('Format harus array');
            }
        } catch (e) {
            showToast('Format soal tidak valid (harus JSON array): ' + e.message, 'error');
            return;
        }
    }

    const quizData = {
        title,
        category,
        questions,
        updatedAt: serverTimestamp()
    };

    try {
        if (docId) {
            await updateDoc(doc(db, 'quizzes', docId), quizData);
            showToast('Quiz berhasil diperbarui', 'success');
        } else {
            quizData.createdAt = serverTimestamp();
            await addDoc(quizzesRef, quizData);
            showToast('Quiz berhasil ditambahkan', 'success');
        }

        closeQuizModal();
        await loadQuizzes();
        updateDashboard();
    } catch (error) {
        console.error('Error saving quiz:', error);
        showToast('Gagal menyimpan quiz: ' + error.message, 'error');
    }
};

window.deleteQuiz = async function (docId) {
    if (!confirm('Yakin ingin menghapus quiz ini?')) return;

    try {
        await deleteDoc(doc(db, 'quizzes', docId));
        showToast('Quiz berhasil dihapus', 'success');
        await loadQuizzes();
        updateDashboard();
    } catch (error) {
        console.error('Error deleting quiz:', error);
        showToast('Gagal menghapus quiz: ' + error.message, 'error');
    }
};

// ==================== UTILITIES ====================
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
    <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
    <span>${message}</span>
  `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
