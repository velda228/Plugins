function getPopularManga() {
    return new Promise(function(resolve, reject) {
        if (typeof fetchPopularMangaFromSwift === 'function') {
            fetchPopularMangaFromSwift(function(result) {
                console.log("JS: callback fetchPopularMangaFromSwift вызван, result:", result);
                resolve(result);
            });
        } else {
            reject('fetchPopularMangaFromSwift is not defined');
        }
    });
} 
