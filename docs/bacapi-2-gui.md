# Bacapi 2 GUI — Release Notes (Target: 2027)

> Satu-satunya dokumentasi resmi untuk rilis Bacapi 2 GUI. Ditulis 2026-11-15 sebagai target rilis 2027.
> Belum final — ini living document.

---

## Overview

**Bacapi 2 GUI** menjawab tantangan: *"Bacapi sudah hebat di terminal, tapi bagaimana dengan desktop?"*.

Versi ini memperkenalkan kembali Bacapi Desktop sebagai fitur kelas utama, dengan keunggulan:

- ISO ~300 MB (boot < 30 detik di VirtualBox/VM)
- Openbox sebagai window manager ringan
- LibreWolf sebagai browser privasi bawaan
- Semua aplikasi Bacapi (terminal + beooffice + codeboox + defend) tetap berjalan optimal di GUI
- Tetap terminal-first: `bacapi desktop` untuk masuk GUI, `Ctrl+Alt+Backspace` untuk keluar
- Persistence via overlayfs di VDI (seperti Bacapi 3.1)

**Nama spek rilis:** Bacapi 2 GUI **"Dugong"** (terminologi: nama opsi seni rupa dan ekosistem terumbu karang — dekat dengan tema laut seperti Bacapi 3.1 "Platipus" sebelumnya).

---

## Filosofi

Bacapi 2 GUI tetap menjamin:

1. **Keamanan** — Bacapi Defend + YARA tetap kuat di GUI; mode default tetap terminal (GUI adalah opt-in `bacapi desktop`)
2. **Visi efisien** — tidak ada bloat; ISO < 300 MB
3. **Kembali ke yang paling penting:** paket Bacapi (beooffice, codeboox, defend) berjalan mulus di GUI
4. **An open-source project** yang bisa di-customize mudah

---

## Scope fitur Bacapi 2 GUI

### Inti (wajib ada di rilis 2027)

- [ ] Boot default terminal (Bacapi 3.1 style — backward compat mode)
- [ ] `bacapi desktop` — start GUI Openbox
- [ ] Icons lengkap di desktop (4 shortcut: Terminal, LibreWolf, Files, Help)
- [ ] **Bacapi Help** — dapat dibuka dengan klik atau via terminal (`beo-writer`/`less` di GUI)
- [ ] **Multi-monitor support** (vmwgfx modesetting)
- [ ] **Auto-resize resolution** untuk VirtualBox (VMSVGA/VMSVGA + Guest Additions)
- [ ] **Scroll-wheel / two-finger scroll** untuk semua aplikasi terminal dan GUI
- [ ] **Theme refresh**: Openbox default theme dengan Bacapi amber aesthetic
- [ ] **Hibernation/sleep** (jika memungkinkan VirtualBox)

### Browser: LibreWolf

- [ ] Sebagai browser default di GUI
- [ ] Preconfigured: ad-block preset (uBlock Origin atau equivalent)
- [ ] **Bookmark folder** "Bacapi Docs", "Bacapi GitHub", "Free Software Foundation"

### Aplikasi Bacapi di GUI

- [ ] Bacapi Defend (scan, quarantine) — tetap berjalan (full functionality)
- [ ] Codeboox (coding environment) — berjalan di GUI
- [ ] BeoOffice suite (12 aplikasi) — UI semuanya via terminaux/xterm
- [ ] Codeboox — integrasi GUI

### QoL (Quality of Life)

- [ ] Bacapi secara default autoconnect HDD Wifi
- [ ] System update automatic (opsi)
- [ ] Recovery mode (from BIOS menu)
- [ ] Persistence di VDI dengan ext4 `sync` mount (seperti Bacapi 3.1)
- [ ] Factory reset tetap tersedia di BIOS

---

## Arsitektur teknis

```
┌──────────────────────────────────────┐
│  ISO (hybrid BIOS + UEFI)            │
│  ├─ /boot/vmlinuz                    │
│  ├─ /boot/initramfs                 │
│  └─ /bacapi/rootfs.squashfs         │
│      ├─ Linux 6.18.63-0-virt         │
│      ├─ busybox (init, applets)      │
│      ├─ musl libc                   │
│      ├─ Alpine packages (xorg, mesa) │
│      ├─ openbox / xterm / tint2      │
│      ├─ pcmanfm (file manager)       │
│      ├─ librewolf (browser)          │
│      ├─ Bacapi CLI (bacapi)          │
│      ├─ BeoOffice (beo-*)            │
│      ├─ Codeboox                     │
│      └─ Bacapi Defend (antivirus)    │
└──────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│  Overlay persistence (ext4 VDI)    │
│   upper: perubahan user            │
│   lower: squashfs (ISO)            │
│   merge: overlayfs union            │
└─────────────────────────────────────┘
```

**Boot flow:**

```
isolinux → vmlinuz → initramfs (overlay) → switch_root → /sbin/init
     ↓
sbin/init: modprobe e1000 → DHCP → dropbear → DNS Shield (if enabled)
     ↓
spawn getty @ /sbin/bacapi-login (untuk backward / debugging)
     ↓
profile d/bacapi.sh → path setup, aliases, todo reminder
     ↓
interaksi user: shell + bacapi tools
     ↓
opt-in: bacapi desktop → startx → openbox → tint2 → pcmanfm --desktop
```

---

## Deployment targeting 2027

**Januari 2027**: feature freeze for Bacapi 3.2
**Februari–Maret 2027**: Bacapi 3.x maintenance releases + bugfix
**Maret–Mei 2027**: Bacapi 2 GUI alpha testing (QEMU + VirtualBox)
**Juni–Juli 2027**: Bacapi 2 GUI beta
**September 2027**: Bacapi 2 GUI RC1
**Oktober–November 2027**: Bacapi 2 GUI stable release

**Build server**: WSL Ubuntu (menjalankan dev tools, build ISO, testing matrix).

---

## Known issues Bacapi 3.1 (yang akan dihindari di Bacapi 2 GUI)

- Terminal-first only; no GUI mode out of the box
- Persistence overlay may corrupt rarely (mitigasi: `sync` mount + ext4 journalling)
- BIOS update butuh download (~80 MB) — bukan instant; preview size-download tetap perlu
- `killall init` untuk shutdown — tidak clean (fix via `/sbin/poweroff` nanti)

---

## Tentang dokumentasi

Bacapi Wiki project (github.com/bacapi/wiki, atau bunglonwiki.github.io) adalah sumber dokumentasi utama, dan file ini akan menjadi anak-anak dari `docs/gui-release.md` di sana.

---

## Audit-corrupt & CI/regression

Sebelum rilis, disemua file source Bacapi harus lolos:

- `unsquashfs -cat` corruption check
- `python3 -m py_compile` semua file Python
- `sh -n` semua shell script
- End-to-end VM smoke test (boot, SSH, beooffice, defend test)

---

## Pelajaran dari Bacapi 1.x/2.x/3.x untuk Bacapi 2 GUI

1. **`/mnt/c/...`** jangan jadi prameter sumber utama — gunakan `/mnt` permanent mount atau symlink
2. **OneDrive reverts** — jangan gunakan OneDrive untuk development source code
3. **Keep ISO under 500 MB** ISO 2 GUI target ~300 MB
4. **Bash pipe interactive** — fail loudly, check exit codes
5. **Window manager over DE** — Openbox for lightness
6. **Overlayfs for user data** — allows persistent ISO + small footprint
7. **Panel is a good UI** — taskbar-like interface non-intrusive


---

## Credits

- Bacapi by Afif Abrar — concept, execution, refinement, user-feedback
- Inspired by Alpine Linux, Debian, Ubuntu, Openbox, tint2, Xorg
- Open source release di GitHub


Dokumentasi ini dikelola sebagai bagian dari BunglonWIKI.
