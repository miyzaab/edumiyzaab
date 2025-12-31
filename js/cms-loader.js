/**
 * CMS Data Loader
 * Memuat data dari folder content/ yang dikelola oleh Decap CMS
 */

// Cache untuk data
let cmsCache = {
    articles: null,
    videos: null,
    quizzes: null,
    audios: null,
    settings: null
};

/**
 * Fetch semua file JSON dari folder content
 */
async function fetchContentFiles(folder) {
    try {
        // Untuk static hosting, kita perlu tahu nama file
        // Jadi kita gunakan manifest atau fetch langsung
        const response = await fetch(`/content/${folder}/index.json`);
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        console.log(`Manifest not found for ${folder}, trying individual files...`);
    }
    return null;
}

/**
 * Load articles dari CMS atau fallback ke data lama
 */
async function loadArticles() {
    if (cmsCache.articles) return cmsCache.articles;

    try {
        // Coba load dari manifest CMS
        const manifest = await fetch('/content/articles/index.json');
        if (manifest.ok) {
            const data = await manifest.json();
            cmsCache.articles = Array.isArray(data) ? data : data.articles || [];
            return cmsCache.articles;
        }
    } catch (e) {
        console.log('CMS manifest not found, using legacy data');
    }

    // Fallback ke data lama jika CMS belum setup
    if (typeof articles !== 'undefined') {
        cmsCache.articles = articles;
        return articles;
    }

    return [];
}

/**
 * Load videos dari CMS
 */
async function loadVideos() {
    if (cmsCache.videos) return cmsCache.videos;

    try {
        const manifest = await fetch('/content/videos/index.json');
        if (manifest.ok) {
            const data = await manifest.json();
            cmsCache.videos = Array.isArray(data) ? data : data.videos || [];
            return cmsCache.videos;
        }
    } catch (e) {
        console.log('Videos manifest not found');
    }

    return [];
}

/**
 * Load quizzes dari CMS
 */
async function loadQuizzes() {
    if (cmsCache.quizzes) return cmsCache.quizzes;

    try {
        const manifest = await fetch('/content/quizzes/index.json');
        if (manifest.ok) {
            const data = await manifest.json();
            cmsCache.quizzes = Array.isArray(data) ? data : data.quizzes || [];
            return cmsCache.quizzes;
        }
    } catch (e) {
        console.log('Quizzes manifest not found');
    }

    return [];
}

/**
 * Load audios dari CMS
 */
async function loadAudios() {
    if (cmsCache.audios) return cmsCache.audios;

    try {
        const manifest = await fetch('/content/audios/index.json');
        if (manifest.ok) {
            const data = await manifest.json();
            cmsCache.audios = Array.isArray(data) ? data : data.audios || [];
            return cmsCache.audios;
        }
    } catch (e) {
        console.log('Audios manifest not found');
    }

    return [];
}

/**
 * Load site settings
 */
async function loadSettings() {
    if (cmsCache.settings) return cmsCache.settings;

    try {
        const response = await fetch('/content/settings/site.json');
        if (response.ok) {
            cmsCache.settings = await response.json();
            return cmsCache.settings;
        }
    } catch (e) {
        console.log('Settings not found');
    }

    return {
        siteName: 'Miyzaab Edu',
        tagline: 'Berbagi Faidah'
    };
}

// Export untuk digunakan di halaman lain
window.CMS = {
    loadArticles,
    loadVideos,
    loadQuizzes,
    loadAudios,
    loadSettings,
    cache: cmsCache
};

// Dispatch event ketika CMS loader siap
window.dispatchEvent(new Event('cmsReady'));
