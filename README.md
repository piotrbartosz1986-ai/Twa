# TWA Hello World — wersja pod GitHub Pages (/Twa/)

Ta paczka jest już poprawiona pod Twoje repo **Twa** na GitHub Pages:
- start_url/scope w manifeście: `/Twa/`
- ścieżki ikon: `/Twa/icons/...`
- Service Worker cache: `/Twa/...`
- rejestracja SW: `navigator.serviceWorker.register('sw.js')` (relatywnie)

## Co zrobić
1. Podmień pliki w repo (zostaw strukturę taką samą).
2. Odczekaj chwilę aż GitHub Pages zdeployuje.
3. Na telefonie:
   - odśwież stronę,
   - kliknij „Sprawdź Service Workera” → powinno być ✅

Jeśli dalej jest ❌, zrób w Chrome:
- Ustawienia witryny → **Wyczyść dane** (dla tej domeny) i spróbuj ponownie.
