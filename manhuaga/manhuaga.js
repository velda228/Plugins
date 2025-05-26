// Базовые функции для работы с API
function getPopularManga() {
    return fetch("https://manhuaga.com/manga/?order=popular")
        .then(response => response.text());
}

function getMangaDetails(url) {
    return fetch(url)
        .then(response => response.text());
}

function getChapterPages(url) {
    return fetch(url)
        .then(response => response.text());
}

// Экспортируем функции
module.exports = {
    getPopularManga,
    getMangaDetails,
    getChapterPages
}; 
