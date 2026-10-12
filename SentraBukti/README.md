# 🚀 SentraBukti: Centralized Transfer Management System

SentraBukti adalah aplikasi *serverless* berbasis web untuk memusatkan dan mengelola pelaporan bukti transfer operasional. Dibangun secara eksklusif di atas ekosistem Google Workspace menggunakan Google Apps Script (GAS) dan Google Drive API.

## 📖 Latar Belakang (Use Case)

**Masalah Operasional:** 
Sebelumnya, proses pelaporan bukti transfer dilakukan secara manual oleh tim lapangan (Salesman, Transport, dll) melalui pesan WhatsApp secara terpisah kepada admin. Hal ini menyebabkan file bukti transfer tersebar di berbagai ruang obrolan, tidak memiliki standar penamaan, rawan hilang, dan sangat menyulitkan admin dalam melakukan rekapitulasi data harian.

**Solusi (Centralized System):** 
SentraBukti hadir sebagai *Single Source of Truth* untuk pelaporan file. Aplikasi ini secara otomatis menerima, memberi nama baku, dan mengelompokkan bukti transfer langsung ke folder Google Drive masing-masing divisi. Sistem ini juga menyediakan *Monitoring Dashboard* bagi admin untuk melacak pengunggah, waktu *upload*, dan tanggal transfer secara *real-time*.

## ✨ Fitur Utama
* **Serverless Architecture:** Berjalan tanpa server atau *database* eksternal. Sepenuhnya memanfaatkan Google Drive sebagai penyimpanan file dan *database metadata*.
* **Secure Admin Dashboard:** Panel admin dilindungi oleh sistem otentikasi multi-akun menggunakan token berbasis `sessionStorage`.
* **Real-time Auto-Sync:** Dashboard melakukan sinkronisasi data (*background polling*) setiap 15 detik secara otomatis.
* **Modern UI/UX:** Antarmuka responsif mengusung prinsip *Glassmorphism* dan desain SaaS modern, lengkap dengan *micro-interactions* dan *toast notifications*.
* **Metadata Integration:** Menyimpan informasi tambahan (Nama User, NIK, Tanggal Transfer) ke dalam format JSON yang disematkan langsung pada *File Description* di Google Drive.

## 🛠️ Teknologi yang Digunakan
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend:** Google Apps Script (ES6)
* **Storage & Database:** Google Drive API

## 📂 Struktur File
* `Code.js` - Logika *backend* (API handler, otentikasi, integrasi Drive API).
* `Index.html` - Antarmuka *frontend* untuk form *upload* pengguna.
* `Dashboard.html` - Antarmuka *frontend* untuk panel monitoring admin.

## ⚙️ Cara Instalasi (Untuk Developer)
1. Buat folder baru di Google Drive Anda, lalu salin ID Folder tersebut dari URL browser.
2. Buka [Google Apps Script](https://script.google.com) dan buat proyek baru.
3. Salin kode dari `Code.js`, `Index.html`, dan `Dashboard.html` ke proyek Anda.
4. Ganti string `YOUR_DRIVE_FOLDER_ID` di dalam `Code.js` dengan ID Folder Drive Anda.
5. Atur daftar akun admin pada fungsi `verifikasiLogin()` di `Code.js`.
6. Klik **Deploy > New deployment**, atur *Execute as* menjadi **Me**, dan *Who has access* menjadi **Anyone**.