// Функция для получения популярной манги
function getPopularManga() {
    const url = "https://manhuaga.com/manga/?order=popular";
    return fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const mangaList = [];
            
            // Парсим список манги
            const mangaElements = doc.querySelectorAll("li.series");
            mangaElements.forEach(element => {
                const link = element.querySelector("a.series");
                const img = element.querySelector("img");
                const title = element.querySelector("h2 a");
                const genres = Array.from(element.querySelectorAll(".genxed a")).map(a => a.textContent);
                const rating = element.querySelector(".numscore")?.textContent;
                
                if (link && img && title) {
                    mangaList.push({
                        title: title.textContent.trim(),
                        url: link.href,
                        cover: img.src,
                        genres: genres,
                        rating: parseFloat(rating) || 0
                    });
                }
            });
            
            return mangaList;
        });
}

// Функция для получения деталей манги
function getMangaDetails(url) {
    return fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            
            // Получаем описание
            const description = doc.querySelector(".entry-content.entry-content-single")?.textContent.trim() || "";
            
            // Получаем автора
            const author = doc.querySelector("meta[property=article:author]")?.getAttribute("content") || "";
            
            // Получаем статус
            const status = doc.querySelector("meta[property=article:status]")?.getAttribute("content") || "";
            
            // Получаем жанры
            const genres = Array.from(doc.querySelectorAll(".genxed a")).map(a => a.textContent);
            
            // Получаем рейтинг
            const rating = doc.querySelector(".rating-prc .num")?.textContent || "0";
            
            // Получаем обложку
            const cover = doc.querySelector(".thumb img")?.src || "";
            
            // Получаем главы
            const chapters = [];
            const chapterElements = doc.querySelectorAll(".chapter-list .chapter-item");
            chapterElements.forEach((element, index) => {
                const title = element.querySelector(".chapter-title")?.textContent.trim();
                const chapterUrl = element.querySelector("a")?.href;
                const dateText = element.querySelector(".chapter-date")?.textContent.trim();
                
                if (title && chapterUrl) {
                    chapters.push({
                        number: index + 1,
                        title: title,
                        url: chapterUrl,
                        uploadDate: dateText
                    });
                }
            });
            
            return {
                description: description,
                author: author,
                status: status,
                genres: genres,
                rating: parseFloat(rating) || 0,
                cover: cover,
                chapters: chapters
            };
        });
}

// Функция для получения страниц главы
function getChapterPages(url) {
    return fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const pages = [];
            
            // Парсим страницы главы
            const pageElements = doc.querySelectorAll(".reader-content img");
            pageElements.forEach((img, index) => {
                if (img.src) {
                    pages.push({
                        number: index + 1,
                        url: img.src
                    });
                }
            });
            
            return pages;
        });
}

// Экспортируем функции
module.exports = {
    getPopularManga,
    getMangaDetails,
    getChapterPages
}; 
