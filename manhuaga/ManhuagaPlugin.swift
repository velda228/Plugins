import Foundation

class ManhuagaPlugin: MangaSourcePlugin {
    let id = "manhuaga"
    let name = "Manhuaga"
    let version = "1.0.0"
    let author = "velda228"
    let website = "https://manhuaga.com"
    let icon = "https://manhuaga.com/favicon.ico"
    
    private let baseURL = "https://manhuaga.com"
    private let headers = [
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Cache-Control": "max-age=0"
    ]

    // Поиск манги
    func searchManga(query: String) async throws -> [Manga] {
        if query.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            return try await getPopularManga()
        }
        
        let encodedQuery = query.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? query
        let url = URL(string: "\(baseURL)/search?q=\(encodedQuery)")!
        
        var request = URLRequest(url: url)
        headers.forEach { request.setValue($0.value, forHTTPHeaderField: $0.key) }
        
        let (data, _) = try await URLSession.shared.data(for: request)
        guard let html = String(data: data, encoding: .utf8) else { return [] }
        
        return try parseMangaList(html: html)
    }

    // Получение информации о манге
    func getMangaDetails(id: String) async throws -> MangaDetails {
        let url = URL(string: "\(baseURL)/manga/\(id)")!
        var request = URLRequest(url: url)
        headers.forEach { request.setValue($0.value, forHTTPHeaderField: $0.key) }
        
        let (data, _) = try await URLSession.shared.data(for: request)
        guard let html = String(data: data, encoding: .utf8) else {
            throw NSError(domain: "ManhuagaPlugin", code: 1, userInfo: [NSLocalizedDescriptionKey: "Failed to decode HTML"])
        }
        
        // TODO: Реализовать парсинг деталей манги
        throw NSError(domain: "Not implemented", code: 0)
    }

    // Получение списка глав
    func getChapters(mangaId: String) async throws -> [Chapter] {
        let url = URL(string: "\(baseURL)/manga/\(mangaId)")!
        var request = URLRequest(url: url)
        headers.forEach { request.setValue($0.value, forHTTPHeaderField: $0.key) }
        
        let (data, _) = try await URLSession.shared.data(for: request)
        guard let html = String(data: data, encoding: .utf8) else { return [] }
        
        // TODO: Реализовать парсинг глав
        return []
    }

    // Получение страниц главы
    func getChapterPages(chapterId: String) async throws -> [ChapterPage] {
        let url = URL(string: "\(baseURL)/chapter/\(chapterId)")!
        var request = URLRequest(url: url)
        headers.forEach { request.setValue($0.value, forHTTPHeaderField: $0.key) }
        
        let (data, _) = try await URLSession.shared.data(for: request)
        guard let html = String(data: data, encoding: .utf8) else { return [] }
        
        // TODO: Реализовать парсинг страниц
        return []
    }

    // Последние обновления
    func getLatestUpdates() async throws -> [Manga] {
        let url = URL(string: "\(baseURL)/latest")!
        var request = URLRequest(url: url)
        headers.forEach { request.setValue($0.value, forHTTPHeaderField: $0.key) }
        
        let (data, _) = try await URLSession.shared.data(for: request)
        guard let html = String(data: data, encoding: .utf8) else { return [] }
        
        return try parseMangaList(html: html)
    }

    // Популярная манга
    func getPopularManga() async throws -> [Manga] {
        print("[ManhuagaPlugin] Начало загрузки популярной манги")
        let url = URL(string: "\(baseURL)/popular")!
        var request = URLRequest(url: url)
        headers.forEach { request.setValue($0.value, forHTTPHeaderField: $0.key) }
        
        do {
            print("[ManhuagaPlugin] Отправка запроса к URL: \(url)")
            let (data, response) = try await URLSession.shared.data(for: request)
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
            
            guard let html = String(data: data, encoding: .utf8) else {
                print("[ManhuagaPlugin] Ошибка: не удалось декодировать HTML")
                return []
            }
            
            return try parseMangaList(html: html)
        } catch {
            print("[ManhuagaPlugin] Ошибка при загрузке данных: \(error)")
            return []
        }
    }
    
    private func parseMangaList(html: String) throws -> [Manga] {
        print("[ManhuagaPlugin] Начало парсинга списка манги")
        
        // Ищем все карточки манги
        let regex = try NSRegularExpression(pattern: #"<div class="bsx">.*?<a href="([^"]+)".*?<img src="([^"]+)".*?<div class="tt">([^<]+)</div>"#, options: [.dotMatchesLineSeparators])
        let matches = regex.matches(in: html, options: [], range: NSRange(location: 0, length: html.utf16.count))
        print("[ManhuagaPlugin] Найдено совпадений: \(matches.count)")
        
        var mangas: [Manga] = []
        for (index, match) in matches.enumerated() {
            guard match.numberOfRanges >= 4 else {
                print("[ManhuagaPlugin] Пропуск совпадения \(index): недостаточно групп")
                continue
            }
            
            let urlRange = Range(match.range(at: 1), in: html)
            let coverRange = Range(match.range(at: 2), in: html)
            let titleRange = Range(match.range(at: 3), in: html)
            
            guard let urlStr = urlRange.map({ String(html[$0]) }),
                  let cover = coverRange.map({ String(html[$0]) }),
                  let title = titleRange.map({ String(html[$0]) }) else {
                print("[ManhuagaPlugin] Пропуск совпадения \(index): не удалось извлечь данные")
                continue
            }
            
            let sourceId = urlStr.replacingOccurrences(of: "\(baseURL)/manga/", with: "").trimmingCharacters(in: CharacterSet(charactersIn: "/"))
            
            let manga = Manga(
                title: title,
                coverURL: cover,
                author: "",
                artist: nil,
                description: "",
                status: .unknown,
                genres: [],
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
    }

    // Поиск по жанру
    func getMangaByGenre(genre: String) async throws -> [Manga] {
        let encodedGenre = genre.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? genre
        let url = URL(string: "\(baseURL)/genre/\(encodedGenre)")!
        var request = URLRequest(url: url)
        headers.forEach { request.setValue($0.value, forHTTPHeaderField: $0.key) }
        
        let (data, _) = try await URLSession.shared.data(for: request)
        guard let html = String(data: data, encoding: .utf8) else { return [] }
        
        return try parseMangaList(html: html)
    }
} 
