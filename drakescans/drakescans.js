// Базовые функции для работы с контентом
function getPopularManga(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const mangaList = [];
    
    // Находим все элементы манги
    const mangaElements = doc.querySelectorAll('.bsx');
    
    mangaElements.forEach(element => {
        const link = element.querySelector('a');
        const img = element.querySelector('img');
        const title = element.querySelector('.tt');
        const rating = element.querySelector('.numscore');
        
        if (link && img && title) {
            mangaList.push({
                title: title.textContent.trim(),
                url: link.href,
                cover: img.src,
                rating: rating ? parseFloat(rating.textContent) : 0
            });
        }
    });
    
    return mangaList;
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
