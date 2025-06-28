# ThunderScans Plugin

Плагин для источника манги [ThunderScans.com](https://thunderscans.com/)

## Описание

ThunderScans - популярный источник манги с большим каталогом. Плагин предоставляет доступ к:

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
Academy, Action, Adaptation, Adventure, Ancient Style, Apocalypse, Artifact, Based On A Novel, Blood, Bloody, brain hiole, Cheat system, Comedy, Conspiracy, Cooking, Cultivation, demons, Drama, Drama Seinen, Dungeon, Ecchi, excitement, Fantasy, fantasy، Martial arts, Fighting, Fusion, future era, Game, Gender Bender, Growth, Harem, Historical, Horror, hunters, Inspection, isekai, Josei, Joseon Dynasty, Kingdom Building, Magic, Manga, Manhua, Manhwa, Manhwa Hot, Martial Arts, Mature, Medical, Monster, Monsters, Murim, Mystery, One shot, Parenting, passionate, Player, Powered Armor, Psychological, Rebirth, Reborn, Revenge, Romance, School Life, Sci-fi, Seinen, Shoujo, Shounen, Slice of Life, Sports, Summons, Supernatural, superpower, Survival, System, Tamer, Taming, Thriller, Thrilling, time travel, Tragedy, Unknown, War, Weak-to-Strong, Webtoons, Xianxia, zombie

### Статус
All, Ongoing, Completed, Hiatus

### Тип
All, Manga, Manhwa, Manhua, Comic, Novel

### Сортировка
Default, A-Z, Z-A, Update, Added, Popular

## Структура файлов

```
thunderscans/
├── manifest.json      # Метаданные плагина
├── thunderscans.js    # Основной код плагина
├── filters.json       # Конфигурация фильтров
├── icon.png          # Иконка источника
└── README.md         # Документация
```

## URL структура

- **Базовый URL**: `https://thunderscans.com/`
- **Популярная манга**: `https://thunderscans.com/series/?order=popular`
- **Последние обновления**: `https://thunderscans.com/series/?order=update`
- **Поиск**: `https://thunderscans.com/series/`

## Установка

1. Скопируйте папку `thunderscans` в директорию `Plugins/`
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
