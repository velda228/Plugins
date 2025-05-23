function getPopularManga() {
    if (typeof fetchPopularMangaFromSwift === 'function') {
        return fetchPopularMangaFromSwift();
    } else {
        return [];
    }
} 
