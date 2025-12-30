// Fetch articles from JSON file (Decap CMS compatible)
async function getArticles() {
  try {
    const response = await fetch('data/articles.json');
    if (!response.ok) throw new Error('Failed to fetch articles');
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

// Global variable for backward compatibility (best effort)
let articles = [];
getArticles().then(data => {
  articles = data;
  // Dispatch event so other scripts know data is ready
  window.dispatchEvent(new Event('articlesLoaded'));
});
