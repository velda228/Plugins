// Базовые функции для работы с контентом Asura Scans
function getPopularManga(html) {
    let mangas = [];
    // Универсальный парсер для среды с DOMParser (например, в браузере или node с jsdom)
    let doc;
    if (typeof window !== 'undefined' && window.DOMParser) {
        doc = new window.DOMParser().parseFromString(html, 'text/html');
    } else if (typeof require !== 'undefined') {
        // Node.js среда — используем jsdom
        const { JSDOM } = require('jsdom');
        doc = new JSDOM(html).window.document;
    }
    if (!doc) return mangas;
    const elements = doc.querySelectorAll('a[href^="series/"]');
    elements.forEach(el => {
        const url = el.getAttribute('href');
        const titleEl = el.querySelector('span.block, span.font-bold');
        const title = titleEl ? titleEl.textContent.trim() : 'Без названия';
        const img = el.querySelector('img');
        const cover = img ? img.getAttribute('src') : null;
        let rating = 0;
        const ratingEl = el.querySelector('span.text-xs:last-child');
        if (ratingEl) {
            const ratingText = ratingEl.textContent.trim().replace(',', '.');
            rating = parseFloat(ratingText) || 0;
        }
        mangas.push({ title, url, cover, rating });
    });
    return mangas;
}

function getMangaDetails(html) {
    return html;
}

function getChapterPages(html) {
    return html;
}

// Экспортируем функции
module.exports = {
    getPopularManga,
    getMangaDetails,
    getChapterPages
}; 
