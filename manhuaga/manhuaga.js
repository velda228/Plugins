const popularUrl = "https://manhuaga.com/manga/?order=popular";
const latestUrl = "https://manhuaga.com/manga/?order=update";

function fetchHtml(url) {
    const response = fetch(url);
    if (response && typeof response.text === 'function') {
        return response.text();
    }
    return "";
}

function parseMangaList(html) {
    const mangas = [];
    const bsxRegex = /<div class="bsx">([\s\S]*?)<\/div>\s*<\/div>/g;
    let match;
    while ((match = bsxRegex.exec(html)) !== null) {
        const mangaBlock = match[1];
        const aRegex = /<a href="([^"]+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*>[\s\S]*?<div class="tt">\s*([^<]+)\s*<\/div>/;
        const aMatch = aRegex.exec(mangaBlock);
        if (aMatch) {
            mangas.push({
                title: decodeHtml(aMatch[3].trim()),
                url: aMatch[1],
                cover: aMatch[2]
            });
        }
    }
    return mangas;
}

function decodeHtml(html) {
    var txt = (typeof document !== 'undefined') ? document.createElement('textarea') : {innerHTML: ''};
    txt.innerHTML = html;
    return txt.value || txt.innerHTML;
}

function getPopularManga() {
    let allManga = [];
    for (let page = 1; page <= 5; page++) {
        let url = page === 1 ? popularUrl : popularUrl + "&page=" + page;
        let html = fetchHtml(url);
        let mangas = parseMangaList(html);
        mangas.forEach(m => {
            if (!allManga.some(x => x.url === m.url)) allManga.push(m);
        });
    }
    return allManga;
}

function getLatestManga() {
    let allManga = [];
    for (let page = 1; page <= 5; page++) {
        let url = page === 1 ? latestUrl : latestUrl + "&page=" + page;
        let html = fetchHtml(url);
        let mangas = parseMangaList(html);
        mangas.forEach(m => {
            if (!allManga.some(x => x.url === m.url)) allManga.push(m);
        });
    }
    return allManga;
} 
