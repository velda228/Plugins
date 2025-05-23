async function getPopularManga() {
    try {
        // Загружаем главную страницу сайта
        const response = await fetch("https://manhuaga.com/");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();

        // Парсим HTML, ищем карточки манги
        const mangaList = [];
        const regex = /<li[^>]*class="series"[^>]*>.*?<a[^>]*href="([^"]+)"[^>]*>.*?<img[^>]*src="([^"]+)"[^>]*>.*?<h2[^>]*>([^<]+)<\/h2>/gsi;

        let match;
        while ((match = regex.exec(html)) !== null) {
            mangaList.push({
                title: match[3].trim(),
                url: match[1].startsWith("http") ? match[1] : "https://manhuaga.com" + match[1],
                cover: match[2].startsWith("http") ? match[2] : "https://manhuaga.com" + match[2]
            });
        }

        return mangaList;
    } catch (error) {
        console.error("Error in getPopularManga:", error);
        return [];
    }
} 
