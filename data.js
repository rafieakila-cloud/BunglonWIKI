// Bacapi Wiki - content database
const ARTICLES = [
  {
    id: 'welcome',
    title: 'Selamat datang di Bacapi Wiki',
    category: 'Memulai',
    body: `# Selamat datang di Bacapi Wiki

**Bacapi Linux** adalah distro Linux terminal-first yang ringan, efisien, dan aman — dibuat untuk laptop, PC lama, dan bahkan VirtualBox. Cocok untuk server, embedded, atau belajar Linux.

Saat ini ada **dua varian**:
- **Bacapi 3.1 (Platipus) - Generasi Mulus** — terminal-only, bootstrap cepat, ISO 150 MB
- **Bacapi 2 GUI - Dugong** — Bacapi dengan desktop (estimasi rilis: 2027) *[lihat artikel rilis](#rilis-2027)*

## Untuk pengguna baru

1. [Instalasi di VirtualBox](#instal) — cara menjalankan Bacapi di laptopmu
2. [Menjaga Bacapi](#bacapi-shell) — shell, perintah, dan tips
3. [Bacapi Defend](#defend) — antivirus ringan bawaan
4. [Bacapi BIOS](#bios) — menu BIOS untuk reset/update
5. [Rilis Bacapi 2 GUI — 2027](#rilis-2027) — roadmap masa depan

## Kontribusi

- GitHub: https://github.com/bacapi
- Issues diputus: https://github.com/bacapi/issues
- Dokumentasi ini di-host di GitHub Pages — fork, edit, dan kirim PR!
`,
  },
  {
    id: 'instal',
    title: 'Instalasi Bacapi di VirtualBox',
    category: 'Memulai',
    body: `# Instalasi Bacapi di VirtualBox

Cara paling cepat untuk coba Bacapi: di VirtualBox.

## Prasyarat

- VirtualBox 7+
- File ISO: \`Bacapi.iso\` (tersedia dari pembuat Bacapi)
- 512 MB RAM minimal (direkomendasikan 1024 MB)

## Langkah-langkah

1. Buka VirtualBox → klik **New**
2. Nama: \`Bacapi\`, Type: **Linux**, Version: **Other Linux (64-bit)**
3. RAM: 1024 MB
4. Hard disk: buat baru, 8 GB, VDI dynamic
5. Settings → Storage → Controller: SATA → attach \`Bacapi.iso\`
6. Boot

## Setelah boot

- Anda akan melihat banner "BACAPI ~ >"
- Login sebagai \`root\` dengan password \`bacapi\`

## Shortcut

Double-click shortcut **Bacapi** di Desktop anda — VM akan start otomatis.

Untuk akhir sesi: di dalam VM, \`sudo poweroff\`.

---

Lihat juga: [FAQ](#faq)
`,
  },
  {
    id: 'bacapi-shell',
    title: 'Bekerja di Bacapi Shell',
    category: 'Terminal',
    body: `# Bekerja di Bacapi Shell

Bacapi menggunakan shell sederhana (buzybox sh) dengan perintah khas Bacapi.

## Perintah paling umum

| Perintah | Kegunaan |
|---|---|
| \`bacapi fetch\` | Info sistem dengan logo pensil |
| \`bacapi help\` | Daftar semua perintah |
| \`bacapi defend test\` | Tes antivirus (EICAR) |
| \`bacapi games\` | Main game terminal |
| \`bacapi todo\` | To-do list + reminder |
| \`bacapi calc\` | Kalkulator |
| \`bacapi files\` | File explorer (terminal) |
| \`beooffice\` | 12 aplikasi office terminal |
| \`codeboox\` | Coding environment |
| \`bacup\` | Bahasa bawaan (backend HTTP) |

## Ambiguitas valid namun berhemat resource

- Bacapi menggunakan **busybox** — lebih ringan daripada bash GNU
- \`grep\` tanpa opsi berarti **basic regex** (mirip \`grep -G\`)
- \`find\` di busybox tidak punya opsi \`-printf\`, opsi \`-exec ... {} \;\` harus di-escape

## Personalisasi

Ganti tema: \`bacapi theme list\` → \`bacapi theme set matrix\`

Ganti cursor task manager: \`bacapi personalization set pipe\`

---

Lihat [perintah update](#update)
`,
  },
  {
    id: 'update',
    title: 'Update Bacapi dengan SIZE preview',
    category: 'Terminal',
    body: `# Update Bacapi

Bacapi 3.1 memperkenalkan **size-preview update**: sebelum install, Bacapi menunjukkan paket mana yang akan diperbarui dan estimasi ukuran download.

## Dari terminal

\`\`\`sh
bacapi update
\`\`\`

Bacapi menampilkan:
- Paket-paket yang akan diperbarui + versi baru
- Estimasi **total download size**

Lalu y/n untuk konfirmasi.

## Dari BIOS menu

\`\`\`sh
bacapi bios
\`\`\`

Pilih menu **8. Download & Install Update**.

## Hati-hati

- BIOS update **hanya aman** karena ISO tidak tersentuh. Yang diubah hanya overlay (upper layer). Tapi kalau ada bug package, ISO tetap boot.
- Untuk regression check, ISO terlepas dari system — ISO boot selalu dengan version yang dibuka (immutable).
`,
  },
  {
    id: 'defend',
    title: 'Bacapi Defend (antivirus ringan)',
    category: 'Keamanan',
    body: `# Bacapi Defend

Bacapi Defend adalah **antivirus ringan** bawaan yang menggunakan **YARA rules** dan **grep signature** — tanpa engine berat.

## Cara scan

\`\`\`sh
bacapi defend scan /path
bacapi defend scan --quarantine /path
bacapi defend test
bacapi defend update
bacapi defend quarantine   # lihat karantina
\`\`\`

## Yang terdeteksi

- **13 YARA rules**: EICAR, reverse shell, curl|sh, chmod 777, ransomware, cryptominer, shellcode
- **.exe windows artifacts** (MZ header terdeteksi)

## Karantina

File yang terindikasi diganti ekstensi menjadi \`.EXED\` dan dipindahkan ke \`/var/lib/bacapi/defend/quarantine/\`.

## Signature update

\`\`\`sh
bacapi defend update
\`\`\`

Mengambil \`bacapi.rules\` terbaru dari server.

## Catatan

Bacapi Defend **bukan pengganti antivirus enterprise**. Ini scanner ringan untuk surface PII yang selalu pede.
`,
  },
  {
    id: 'bios',
    title: 'Bacapi BIOS — menu setup',
    category: 'Keamanan',
    body: `# Bacapi BIOS

\`\`\`sh
bacapi bios
\`\`\`

Menu bawaan rescue/reset, serupa BIOS pada PC.

## Pilihan

| Menu | Fungsi |
|---|---|
| 1 | System Information |
| 2 | Reset Data ke Factory — hapus overlay di VDI (data hilang!). Konfirmasi \`RESET\` |
| 3 | Reinstall Bacapi — hapus + reboot (Bacapi ISO read-only, fresh) |
| 4 | Bacapi Defend Quick Scan (/etc /home /root) |
| 5 | Ganti Tema |
| 6 | Ganti Timezone |
| 7 | Ganti Hostname |
| 8 | Download & Install Update (dengan size-preview) |
| 0 | Simpan & Keluar |

## Kapan pakai Reset?

- Bacapi rusak total (overlay korup)
- Bacapi terlalu banyak perubahan (bersih ke versi default)
- Laptop acakup sudah tidak bersih (cleaning)

**Perhatian:** Reset menghapus semua paket yang diinstall dari Bacapi Store, konfigurasi, dan file di VDI.
`,
  },
  {
    id: 'rilis-2027',
    title: 'Bacapi 2 GUI — Release Notes 2027',
    category: 'Rilis',
    body: `# Bacapi 2 GUI — Release Notes 2027

**Target rilis: 2027**
**Codename: Bacapi 2 GUI "Dugong"**

## Ringkas

Bacapi dengan **desktop environment ringan** sebagai opsi bawaan. Tetap terminal-first; GUI untuk opt-in.

- Openbox + pcmanfm + tint2 + xterm + LibreWolf
- ISO ~300 MB
- Persistence via overlayfs di VDI (sama seperti Bacapi 3.1)
- Semua Bacapi Tools (beooffice, codeboox, defend, bcpi) jalan penuh di GUI
- Multi-monitor via vmwgfx/VirtualBox VMSVGA

## Milestones

- Q1 2027: Bacapi 3.2 (maintenance)
- Q2 2027: Alpha
- Q3 2027: Beta
- Q4 2027: RC1 → Stable release

## Filosofi

1. Tidak ada bloat — ISO < 300 MB
2. Security tetap kuat — Bacapi Defend + terminal default
3. Efisien untuk pengguna — GUI opsional
4. Hanya paket open-source

[Lihat rencana lengkap (file lengkap engineering)](docs/bacapi-2-gui.md)
`,
  },
  {
    id: 'faq',
    title: 'FAQ Bacapi',
    category: 'FAQ',
    body: `# FAQ Bacapi

## Apa itu Bacapi Linux?

Bacapi Linux adalah distro Linux terminal-first yang dibuat khusus untuk efisiensi, keamanan, dan penggunaan embedded. ISO < 150 MB, boot < 30 detik, tidak perlu berlangganan.

## Berapa ukuran Bacapi?

Target rilis **Bacapi 3.1**: ~140 MB ISO (terminal-only). Bacapi 2 GUI (2027): ~300 MB.

## Bisakah saya menjalankan GUI di Bacapi?

Bisa. Bacapi 2 GUI (2027) akan hadir dengan desktop. Test smoke test via \`bacapi desktop\`.

## Bacapi Defend bekerja seperti apa?

Bacapi Defend adalah scanner signature-based (YARA rules + grep). Aman untuk laptop pribadi tapi tidak disarankan untuk server enterprise.

## Dimana semua catatan ini hosted?

Baca di **BunglonWIKI** (docs publik proyek Bacapi) atau \`/usr/share/doc/bacapi/\` di Bacapi itu sendiri.

## Saya menemukan bug!

Lapor di GitHub (repository Bacapi project) atau via Discord Bacapi.

## Bisakah saya contribute?

Tentu. GitHub page Bacapi open source — fork, edit, kirim PR.
`,
  },
];
