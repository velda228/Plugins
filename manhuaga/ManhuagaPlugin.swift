import Foundation

class ManhuagaPlugin: MangaSourcePlugin {
    let id = "manhuaga"
    let name = "Manhuaga"
    let version = "1.0.0"
    let author = "velda228"
    let website = "https://manhuaga.com"
    let icon = "https://manhuaga.com/favicon.ico"

    // Поиск манги
    func searchManga(query: String) async throws -> [Manga] {
        if query.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            return try await getPopularManga()
        }
        // Можно реализовать поиск по сайту, если потребуется
        return []
    }

    // Получение информации о манге
    func getMangaDetails(id: String) async throws -> MangaDetails {
        let url = URL(string: "https://manhuaga.com/manga/\(id)")!
        let (data, _) = try await URLSession.shared.data(from: url)
        // Парсинг страницы манги
        // Верни MangaDetails
        throw NSError(domain: "Not implemented", code: 0)
    }

    // Получение списка глав
    func getChapters(mangaId: String) async throws -> [Chapter] {
        // Аналогично парсинг глав
        return []
    }

    // Получение страниц главы
    func getChapterPages(chapterId: String) async throws -> [ChapterPage] {
        // Аналогично парсинг страниц
        return []
    }

    // Последние обновления
    func getLatestUpdates() async throws -> [Manga] {
        // Парсинг главной страницы или раздела обновлений
        return []
    }

    // Популярная манга
    func getPopularManga() async throws -> [Manga] {
        print("[ManhuagaPlugin] Начало загрузки популярной манги")
        let url = URL(string: "https://manhuaga.com/")!
        do {
            print("[ManhuagaPlugin] Отправка запроса к URL: \(url)")
            let (data, response) = try await URLSession.shared.data(from: url)
            print("[ManhuagaPlugin] Получен ответ от сервера")
            
            guard let httpResponse = response as? HTTPURLResponse else {
                print("[ManhuagaPlugin] Ошибка: неверный тип ответа")
                return []
            }
            print("[ManhuagaPlugin] Получен ответ с кодом: \(httpResponse.statusCode)")
            
            guard httpResponse.statusCode == 200 else {
                print("[ManhuagaPlugin] Ошибка: код ответа \(httpResponse.statusCode)")
                return []
            }
            
            print("[ManhuagaPlugin] Размер полученных данных: \(data.count) байт")
            guard let html = String(data: data, encoding: .utf8) else {
                print("[ManhuagaPlugin] Ошибка: не удалось декодировать HTML")
                return []
            }
            
            print("[ManhuagaPlugin] HTML получен, длина: \(html.count)")
            print("[ManhuagaPlugin] Первые 500 символов HTML: \(String(html.prefix(500)))")
            
            // Парсим карточки манги из элементов li
            let regex = try! NSRegularExpression(pattern: #"<li>.*?<a class=\"series\" href=\"([^"]+)\"[^>]*>.*?<img[^>]+src=\"([^"]+)\"[^>]*>.*?<h2>.*?<a[^>]*>([^<]+)</a>.*?<span><b>Genres</b>:\s*([^<]+)</span>"#, options: [.dotMatchesLineSeparators, .caseInsensitive])
            print("[ManhuagaPlugin] Регулярное выражение скомпилировано")
            
            let matches = regex.matches(in: html, options: [], range: NSRange(location: 0, length: html.utf16.count))
            print("[ManhuagaPlugin] Найдено совпадений: \(matches.count)")
            
            if matches.isEmpty {
                print("[ManhuagaPlugin] Предупреждение: не найдено ни одного совпадения")
                // Попробуем найти любые элементы li для проверки структуры HTML
                let liRegex = try! NSRegularExpression(pattern: "<li>", options: [])
                let liMatches = liRegex.matches(in: html, options: [], range: NSRange(location: 0, length: html.utf16.count))
                print("[ManhuagaPlugin] Найдено элементов li: \(liMatches.count)")
            }
            
            var mangas: [Manga] = []
            for (index, match) in matches.enumerated() {
                guard match.numberOfRanges >= 5 else {
                    print("[ManhuagaPlugin] Пропуск совпадения \(index): недостаточно групп")
                    continue
                }
                
                let urlRange = Range(match.range(at: 1), in: html)
                let coverRange = Range(match.range(at: 2), in: html)
                let titleRange = Range(match.range(at: 3), in: html)
                let genresRange = Range(match.range(at: 4), in: html)
                
                guard let urlStr = urlRange.map({ String(html[$0]) }),
                      let cover = coverRange.map({ String(html[$0]) }),
                      let title = titleRange.map({ String(html[$0]) }) else {
                    print("[ManhuagaPlugin] Пропуск совпадения \(index): не удалось извлечь данные")
                    continue
                }
                
                print("[ManhuagaPlugin] Обработка манги \(index + 1):")
                print("  URL: \(urlStr)")
                print("  Обложка: \(cover)")
                print("  Название: \(title)")
                
                let sourceId = urlStr.replacingOccurrences(of: "https://manhuaga.com/manga/", with: "").trimmingCharacters(in: CharacterSet(charactersIn: "/"))
                let genres = genresRange.map { String(html[$0]) }?.components(separatedBy: ", ").map { $0.trimmingCharacters(in: .whitespacesAndNewlines) } ?? []
                print("  Жанры: \(genres)")
                
                let manga = Manga(
                    title: title,
                    coverURL: cover,
                    author: "",
                    artist: nil,
                    description: "",
                    status: .unknown,
                    genres: genres,
                    chapters: [],
                    source: "manhuaga",
                    sourceId: sourceId,
                    rating: 0.0,
                    lastReadChapter: nil,
                    lastReadDate: nil,
                    isFavorite: false,
                    categories: [],
                    uploader: nil
                )
                mangas.append(manga)
                print("[ManhuagaPlugin] Добавлена манга: \(title)")
            }
            
            print("[ManhuagaPlugin] Всего загружено манги: \(mangas.count)")
            return mangas
        } catch {
            print("[ManhuagaPlugin] Ошибка при загрузке данных: \(error)")
            return []
        }
    }

    // Поиск по жанру
    func getMangaByGenre(genre: String) async throws -> [Manga] {
        // Парсинг по жанру
        return []
    }
} 
