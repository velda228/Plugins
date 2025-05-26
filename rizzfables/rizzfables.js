function getPopularManga() {
    var mangas = [];
    var cards = document.querySelectorAll('.bs .bsx > a');
    cards.forEach(function(card) {
        var title = card.querySelector('.tt')?.innerText?.trim();
        var url = card.getAttribute('href');
        var img = card.querySelector('img');
        var cover = img ? img.getAttribute('src') : null;
        // Делаем абсолютный путь для обложки, если нужно
        if (cover && cover.startsWith('/')) {
            cover = 'https://rizzfables.com' + cover;
        }
        if (title && url && cover) {
            mangas.push({
                title: title,
                url: url,
                cover: cover
            });
        }
    });
    return mangas;
} 
