/**
 * Build Script untuk Miyzaab Edu CMS
 * Menggabungkan file JSON individual menjadi index.json untuk setiap collection
 * 
 * Jalankan: node build-content.js
 */

const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');
const collections = ['articles', 'videos', 'quizzes', 'audios'];

console.log('🔨 Building content indexes...\n');

collections.forEach(collection => {
    const collectionDir = path.join(contentDir, collection);

    if (!fs.existsSync(collectionDir)) {
        console.log(`⚠️  Folder ${collection} tidak ditemukan, skip...`);
        return;
    }

    const files = fs.readdirSync(collectionDir).filter(f => f.endsWith('.json') && f !== 'index.json');
    const items = [];

    files.forEach(file => {
        try {
            const filePath = path.join(collectionDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const data = JSON.parse(content);
            items.push(data);
        } catch (e) {
            console.log(`  ❌ Error reading ${file}: ${e.message}`);
        }
    });

    // Sort by id (descending = terbaru dulu)
    items.sort((a, b) => (b.id || 0) - (a.id || 0));

    // Write index.json
    const indexPath = path.join(collectionDir, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(items, null, 2));

    console.log(`✅ ${collection}: ${items.length} items → index.json`);
});

console.log('\n🎉 Build complete!');
