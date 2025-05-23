function getPopularManga() {
    return new Promise(function(resolve, reject) {
        if (typeof fetchPopularMangaFromSwift === 'function') {
            fetchPopularMangaFromSwift(function(result) {
                resolve(result);
            });
        } else {
            reject('fetchPopularMangaFromSwift is not defined');
        }
    });
} 
