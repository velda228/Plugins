// Константы
const BASE_URL = 'https://manhuaga.com';
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

// Кэш для хранения результатов
let cache = {
    popular: {
        data: null,
        timestamp: 0
    },
    search: {},
    mangaDetails: {}
};

// Вспомогательные функции
function log(message) {
    if (typeof logToSwift === 'function') {
        logToSwift(message);
    }
}

function clearCache() {
    cache = {
        popular: {
            data: null,
            timestamp: 0
        },
        search: {},
        mangaDetails: {}
    };
}

// Основные функции
function getPopularManga(page = 1) {
    log('getPopularManga called (REAL)');
    try {
        const response = fetchFromSwift(`${BASE_URL}/popular?page=${page}`);
        if (!response) {
            log('getPopularManga: fetch failed');
            return [];
        }
        // Парсим HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');
        const mangaList = [];
        const items = doc.querySelectorAll('div.bsx');
        log('getPopularManga: найдено блоков: ' + items.length);
        items.forEach(item => {
            try {
                const link = item.querySelector('a');
                const title = item.querySelector('div.tt a');
                const cover = item.querySelector('img');
                if (link && title && cover) {
                    mangaList.push({
                        id: link.href.split('/').pop(),
                        title: title.textContent.trim(),
                        cover: cover.src,
                        url: link.href
                    });
                }
            } catch (e) {
                log('Ошибка парсинга блока: ' + e.message);
            }
        });
        log('getPopularManga: возвращаю манги: ' + mangaList.length);
        return mangaList;
    } catch (error) {
        log('Ошибка в getPopularManga: ' + error.message);
        return [];
    }
}

async function searchManga(query, page = 1) {
    try {
        const cacheKey = `${query}_${page}`;
        
        // Проверяем кэш
        if (cache.search[cacheKey] && (Date.now() - cache.search[cacheKey].timestamp) < CACHE_DURATION) {
            return cache.search[cacheKey].data;
        }

        // Получаем данные
        const response = await fetchFromSwift(`${BASE_URL}/search?q=${encodeURIComponent(query)}&page=${page}`);
        if (!response) {
            throw new Error('Failed to fetch search results');
        }

        // Парсим HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');
        
        const mangaList = [];
        const items = doc.querySelectorAll('div.bsx');
        
        items.forEach(item => {
            try {
                const link = item.querySelector('a');
                const title = item.querySelector('div.tt a');
                const cover = item.querySelector('img');
                
                if (link && title && cover) {
                    mangaList.push({
                        id: link.href.split('/').pop(),
                        title: title.textContent.trim(),
                        cover: cover.src,
                        url: link.href
                    });
                }
            } catch (e) {
                log(`Error parsing search result: ${e.message}`);
            }
        });

        // Обновляем кэш
        cache.search[cacheKey] = {
            data: mangaList,
            timestamp: Date.now()
        };

        return mangaList;
    } catch (error) {
        log(`Error in searchManga: ${error.message}`);
        return [];
    }
}

async function getMangaDetails(mangaId) {
    try {
        // Проверяем кэш
        if (cache.mangaDetails[mangaId] && (Date.now() - cache.mangaDetails[mangaId].timestamp) < CACHE_DURATION) {
            return cache.mangaDetails[mangaId].data;
        }

        // Получаем данные
        const response = await fetchFromSwift(`${BASE_URL}/manga/${mangaId}`);
        if (!response) {
            throw new Error('Failed to fetch manga details');
        }

        // Парсим HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');
        
        const title = doc.querySelector('h1.entry-title')?.textContent.trim();
        const cover = doc.querySelector('div.thumb img')?.src;
        const description = doc.querySelector('div.entry-content p')?.textContent.trim();
        
        const chapters = [];
        const chapterItems = doc.querySelectorAll('div.bixbox.bxcl ul li');
        
        chapterItems.forEach(item => {
            try {
                const link = item.querySelector('a');
                const chapterNumber = item.querySelector('span.chapternum')?.textContent.trim();
                
                if (link && chapterNumber) {
                    chapters.push({
                        id: link.href.split('/').pop(),
                        number: chapterNumber,
                        title: link.textContent.trim(),
                        url: link.href
                    });
                }
            } catch (e) {
                log(`Error parsing chapter: ${e.message}`);
            }
        });

        const details = {
            id: mangaId,
            title,
            cover,
            description,
            chapters
        };

        // Обновляем кэш
        cache.mangaDetails[mangaId] = {
            data: details,
            timestamp: Date.now()
        };

        return details;
    } catch (error) {
        log(`Error in getMangaDetails: ${error.message}`);
        return null;
    }
}

async function getChapterPages(chapterId) {
    try {
        // Получаем данные
        const response = await fetchFromSwift(`${BASE_URL}/chapter/${chapterId}`);
        if (!response) {
            throw new Error('Failed to fetch chapter pages');
        }

        // Парсим HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');
        
        const pages = [];
        const pageItems = doc.querySelectorAll('div#readerarea img');
        
        pageItems.forEach(img => {
            if (img.src) {
                pages.push({
                    url: img.src
                });
            }
        });

        return pages;
    } catch (error) {
        log(`Error in getChapterPages: ${error.message}`);
        return [];
    }
}

// Экспортируем функции
if (typeof window === 'undefined') {
    var window = this;
}

window.mangaPlugin = {
    getPopularManga,
    searchManga,
    getMangaDetails,
    getChapterPages,
    clearCache
};

log('typeof getPopularManga: ' + typeof getPopularManga);
log('typeof window.getPopularManga: ' + typeof window.getPopularManga);
log('typeof window.mangaPlugin: ' + typeof window.mangaPlugin);
log('typeof window.mangaPlugin.getPopularManga: ' + typeof window.mangaPlugin.getPopularManga);
log('window keys: ' + Object.keys(window)); 
