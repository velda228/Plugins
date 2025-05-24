// JS-плагин только экспортирует функции, вся логика и ссылки в Swift/manifest.json
function getPopularManga() {
    if (typeof fetchPopularMangaFromSwift === 'function') {
        return fetchPopularMangaFromSwift();
    } else {
        return [];
    }
} 
function getLatestManga() { return []; } 
