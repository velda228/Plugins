// MadaraScans Plugin
// Основные функции для работы с источником MadaraScans

function getMangaList(url) {
    // Заглушка для получения списка манги
    return [];
}

function getMangaDetails(url) {
    // Заглушка для получения деталей манги
    return null;
}

function getChapterPages(url) {
    // Заглушка для получения страниц главы
    return [];
}

function searchManga(query) {
    // Заглушка для поиска манги
    return [];
}

// Функция для формирования URL с фильтрами
function buildFilterURL(filters, page = 1) {
    const baseURL = "https://madarascans.com/series/";
    const params = new URLSearchParams();
    
    // Обработка жанров (множественный выбор)
    if (filters.genre && Array.isArray(filters.genre) && filters.genre.length > 0) {
        // Исключаем "Any" (ID = 0)
        const validGenres = filters.genre.filter(genreId => genreId !== 0);
        if (validGenres.length > 0) {
            validGenres.forEach(genreId => {
                params.append('genre[]', genreId.toString());
            });
        }
    }
    
    // Обработка статуса
    if (filters.status && filters.status !== "all") {
        params.append('status', filters.status);
    }
    
    // Обработка типа
    if (filters.type && filters.type !== "all") {
        params.append('type', filters.type);
    }
    
    // Обработка сортировки
    if (filters.order && filters.order !== "default") {
        params.append('order', filters.order);
    }
    
    // Добавляем номер страницы
    if (page && page > 1) {
        params.append('page', page.toString());
    }
    
    const queryString = params.toString();
    return queryString ? `${baseURL}?${queryString}` : baseURL;
}

// Экспорт функций
module.exports = {
    getMangaList,
    getMangaDetails,
    getChapterPages,
    searchManga,
    buildFilterURL
}; 
