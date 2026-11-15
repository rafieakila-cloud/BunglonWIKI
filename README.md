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
git remote add origin git@github.com:afif72an/BunglonWIKI.git
git push -u origin main
```

Lalu buka **https://github.com/afif72an/BunglonWIKI/settings/pages** → pilih **main / root** → Save.
Situs akan live di **https://afif72an.github.io/BunglonWIKI/** dalam ~1 menit.

### Scan QR untuk install di HP

QR di `qr.png` menunjuk ke **https://afif72an.github.io/BunglonWIKI/**. Setelah situs aktif:

1. Buka URL di Chrome di HP Android kamu
2. Klik ⋮ → **Install app** atau **Add to Home screen**
3. Ikon BunglonWIKI muncul di home screen
4. Buka app — offline works!

### Troubleshooting

- Manifest tidak install? Pastikan semua paths relatif (current setup is)
- SPA navigasi hard refresh? 404 terjadi jika refresh halaman `/#some-article` — solved by service worker cache (`sw.js`).
- Icons tidak muncul? Periksa manifest: icons relative `./icon-192.png`.


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
