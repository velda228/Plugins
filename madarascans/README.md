# MadaraScans Plugin

Плагин для источника манги [MadaraScans.com](https://madarascans.com/)

## Описание

MadaraScans - популярный источник манги с большим каталогом. Плагин предоставляет доступ к:

- **Популярная манга** - отсортированная по популярности
- **Последние обновления** - новые главы
- **Поиск манги** - по названию
- **Фильтры** - по жанрам, статусу, типу и сортировке

## Особенности

- ✅ Полная поддержка пагинации
- ✅ Парсинг обложек, названий и ссылок
- ✅ Защита от дубликатов
- ✅ Отладочные сообщения
- ✅ Логотип источника
- ✅ Система фильтров

## Фильтры

### Жанры (множественный выбор)
Action, Adult, Adventure, Bloody, Comedy, crime, Death Game, Demon, demons, Doujinshi, Drama, Ecchi, Fantasy, Harem, Hentai, Historical, Horror, Josei, Magic, Manga, Manhwa, Martial Arts, Mature, Murim, Mystery, Plot, Psychological, Reincarnation, Romance, School, School Life, Sci-fi, Seinen, Sexual Violence, Shoujo, Shounen, Slice of Life, Supernatural, Survival, System, Webtoon

### Статус
All, Ongoing, Completed, Hiatus, Dropped, Coming Soon!, Cancelled, Mass Released

### Тип
All, Manga, Manhwa, Manhua, Comic, Novel, Russian

### Сортировка
Default, A-Z, Z-A, Update, Added, Popular

## Структура файлов

```
madarascans/
├── manifest.json      # Метаданные плагина
├── madarascans.js     # Основной код плагина
├── filters.json       # Конфигурация фильтров
└── README.md         # Документация
```

## URL структура

- **Базовый URL**: `https://madarascans.com/`
- **Популярная манга**: `https://madarascans.com/series/?order=popular`
- **Последние обновления**: `https://madarascans.com/series/?order=update`
- **Поиск**: `https://madarascans.com/series/`

## Установка

1. Скопируйте папку `madarascans` в директорию `Plugins/`
2. Перезапустите приложение
3. Плагин будет автоматически обнаружен и загружен

## Поддерживаемые функции

- [x] Получение списка манги
- [x] Поиск манги
- [x] Система фильтров
- [ ] Детали манги
- [ ] Чтение глав
- [ ] Загрузка изображений

## Лицензия

MIT License 
