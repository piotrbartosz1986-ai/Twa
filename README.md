# TWA Hello World (GitHub Pages)

To jest ultraminimalny „Hello World” przygotowany pod **Trusted Web Activity** (TWA):
- `manifest.webmanifest`
- `sw.js` (cache + offline fallback)
- ikony 192/512

## 1) Wrzuć na GitHuba i włącz GitHub Pages
1. Utwórz repo (np. `twa-hello`).
2. Skopiuj pliki z tego katalogu do repo.
3. Wejdź w **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: `main` / folder `/root`
4. Po publikacji dostaniesz URL typu:  
   `https://<twoj-login>.github.io/<repo>/`

## 2) Przetestuj jako zwykła PWA
Na telefonie (Chrome):
1. Otwórz stronę pod HTTPS (GitHub Pages).
2. Menu (⋮) → **Dodaj do ekranu głównego**.
3. Odpal ikonę z pulpitu — powinna startować w trybie „standalone”.
4. Test offline:
   - włącz tryb samolotowy,
   - odpal aplikację z pulpitu,
   - powinieneś zobaczyć `Offline`.

## 3) Przetestuj jako TWA (Android)
Najprościej użyć **Bubblewrap** (narzędzie od Google).

### Wymagania
- Node.js (LTS)
- Android Studio + Android SDK
- Java (JDK 11+)
- `adb` (z Android SDK Platform Tools)

### Instalacja Bubblewrap
```bash
npm i -g @bubblewrap/cli
```

### Inicjalizacja projektu TWA
Podmień URL na swój GitHub Pages:
```bash
bubblewrap init --manifest=https://<twoj-login>.github.io/<repo>/manifest.webmanifest
```

W trakcie kreatora wybierz:
- applicationId (np. `com.twojlogin.twahello`)
- signing (możesz na start użyć debug)

### Build i instalacja na telefon
W folderze wygenerowanego projektu:
```bash
bubblewrap build
bubblewrap install
```

Jeśli `install` nie działa, możesz też:
```bash
adb install -r app-release.apk
```

### Sprawdzenie czy to naprawdę TWA
Po uruchomieniu aplikacji:
- nie powinno być paska adresu,
- w ustawieniach aplikacji powinieneś widzieć nazwę jak dla apki,
- w logach możesz sprawdzić Digital Asset Links (na start Bubblewrap może działać w trybie bez pełnej weryfikacji; do produkcji musisz ustawić `assetlinks.json`).

## Produkcja (ważne)
Dla pełnej weryfikacji TWA w Google Play potrzebujesz:
- własnej domeny (albo hostingu, na którym dodasz `/.well-known/assetlinks.json`)
- podpisanego certyfikatu i powiązania domeny z aplikacją

GitHub Pages jest świetne do testów PWA/TWA, ale do finalnej publikacji zwykle używa się własnej domeny.
