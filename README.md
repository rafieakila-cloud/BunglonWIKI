# Bacapi Wiki / BunglonWIKI

Dokumentasi resmi proyek **Bacapi Linux** — sebagai PWA (Progressive Web App), bisa diinstall di HP/PC via browser, offline-ready, ringan, open source.

## Fitur

- Searchable articles (Bacapi FAQ, install, shell, defend, bios, rilis 2027)
- Article rendering dengan marked + highlight.js
- Installable via PWA (ikon di home screen)
- Offline-ready (cache app shell)
- Dark theme, cyberpunk amber
- Editable via GitHub (link "Edit di GitHub" di setiap artikel)

## Deploy ke GitHub Pages

```sh
mkdir gh-repo && cd gh-repo
git init
cp -r /path/to/BunglonWIKI/* .
git add . && git commit -m "docs: bunglonwiki initial"
git branch -M main
git remote add origin https://github.com/<user>/bunglonwiki.git
git push -u origin main
```

Lalu buka **Settings → Pages → Source: main branch / root** di GitHub.

Atau cukup publish sebagai User Pages site di `<user>.github.io`.

## Lokal

Buka `index.html` di browser — langsung jalan. Atau gunakan static server seperti `python3 -m http.server`.

## Struktur

```
bunglonwiki/
├── index.html        # UI shell (header, sidebar, article)
├── style.css         # cyberpunk amber dark
├── data.js           # basis artikel (Markdown sebagai string)
├── app.js            # router, PWA install, search
├── sw.js             # service worker (offline cache)
├── manifest.webmanifest
├── icon-192.png
├── icon-512.png
└── docs/
    └── bacapi-2-gui.md   # roadmap rilis 2027
```

## Content sources untuk pengetahuan

Lihat `SOURCES.md` (atau README) — wiki pulls knowledge from:
Wikipedia, Wikimedia Commons, Wikidata, OpenAlex, DOAJ, arXiv, Internet Archive, Zenodo, DOAB, Wikibooks.

## Lisensi

MIT. Konten: CC-BY-SA 4.0.

## Kontribusi

Fork → edit `data.js` → PR.
