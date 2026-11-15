# Deploy BunglonWIKI ke GitHub Pages (untuk AFIF72AN)

Ada 3 langkah yang **kamu sendiri** harus lakukan di GitHub — saya tidak punya akses ke akun kamu.

## 1. Buat repo `BunglonWIKI` di rafieakila-cloud

1. Buka <https://github.com/new>
2. **Repository name:** `BunglonWIKI` (harus persis sama — ini menentukan URL)
3. Visibility: **Public**
4. **Jangan centang** "Add README" dan "Add .gitignore" (repo harus kosong)
5. Klik **Create repository**

## 2. Push kode dari laptop

Buka PowerShell di `C:\BacapiWiki\` lalu jalankan:

```sh
git remote remove origin 2>$null
git remote add origin https://github.com/rafieakila-cloud/BunglonWIKI.git
git push -u origin main
```

Kalau `git push` minta login,
ch <github.com/rafieakila-cloud](https://github.com/rafieakila-cloud) minta konfirmasi OAuth / Personal Access Token (PAT).

Cek: buka <https://github.com/rafieakila-cloud/BunglonWIKI> — harus ada semua file (index.html, style.css, data.js, …).

## 3. Aktifkan GitHub Pages

1. Buka <https://github.com/rafieakila-cloud/BunglonWIKI/settings/pages>
   (pastikan kamu **login** dulu)
2. Pada **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` → `/ (root)` → **Save**
3. Tunggu ~1 menit
4. Buka <https://rafieakila-cloud.github.io/BunglonWIKI/>
5. Status harus **200 OK**, bukan 404

## Kalau 404 masih muncul

1. Cek Pages benar-benar aktif: Settings → Pages → harus ada **Your site is live at https://rafieakila-cloud.github.io/BunglonWIKI/**
2. Cek file `index.html` ada di **root** repo
3. Cek **Visibility: Public** (pages tidak jalan di repo private)
4. Coba hard refresh (Ctrl+Shift+R)
5. `ETag cache` — tunggu beberapa menit; GitHub butuh ~5 menit untuk update CDN setelah pertama deploy
6. Disable service worker: DevTools → Application → Service Workers → Unregister → refresh

## Troubleshooting push

- `remote origin already exists` → kamu sudah menambahkan `origin` sebelum — itu OK, perintah `git remote remove origin 2>$null` menghapus dulu.
- `Permission denied (publickey)` → butuh SSH key atau HTTPS PAT. Pakai HTTPS clone URL atau setup SSH key ([docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)).
- `repository not found` → repo belum dibuat atau username salah. Cek di github.com/rafieakila-cloud — username harus benar.

## Local preview (tanpa deploy)

```sh
cd C:\BacapiWiki
python -m http.server 8000
```
Buka <http://localhost:8000/> — langsung jalan, offline.

## Cek halaman

- URL final: `https://rafieakila-cloud.github.io/BunglonWIKI/`
- QR code: `C:\BacapiWiki\qr.png` (bisa langsung di-scan pakai HP setelah Pages live)
- Buka di Chrome HP → tap Install → aplikasi muncul di home screen
