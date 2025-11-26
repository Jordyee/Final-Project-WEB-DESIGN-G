# UNKLAB Store - Final Project Web Design

Selamat datang di **UNKLAB Store**, sebuah platform e-commerce modern dan responsif yang dirancang untuk menjual berbagai merchandise eksklusif Universitas Klabat (UNKLAB). Proyek ini dibuat sebagai tugas akhir mata kuliah Web Design.

## 🌟 Deskripsi Proyek

UNKLAB Store adalah aplikasi web front-end yang menawarkan pengalaman belanja online yang premium dan *user-friendly*. Website ini menampilkan desain yang elegan dengan sentuhan *glassmorphism*, animasi yang halus, dan antarmuka yang responsif di berbagai perangkat.

Pengguna dapat menjelajahi katalog produk, mencari barang spesifik, menambahkan item ke keranjang belanja, dan melakukan simulasi proses checkout.

## ✨ Fitur Utama

*   **Desain Premium & Responsif:** Menggunakan Bootstrap 5 dan kustomisasi CSS untuk tampilan yang modern dan adaptif di desktop maupun mobile.
*   **Katalog Produk Lengkap:** Menampilkan berbagai produk seperti Kaos, Gadget, Tas, Sepatu, Topi, Jaket, Mug, Powerbank, dan lainnya.
*   **Sistem Keranjang Belanja (Shopping Cart):**
    *   Tambah produk ke keranjang.
    *   Lihat ringkasan belanjaan.
    *   Update jumlah item atau hapus item dari keranjang.
    *   Data keranjang tersimpan otomatis menggunakan `localStorage` (tidak hilang saat di-refresh).
*   **Pencarian Produk:** Fitur pencarian *real-time* untuk menemukan produk berdasarkan nama atau deskripsi.
*   **Detail Produk:** Tampilan modal *popup* untuk melihat detail lengkap setiap produk tanpa harus berpindah halaman.
*   **Simulasi Checkout:**
    *   Formulir pengiriman lengkap dengan validasi input.
    *   Pilihan metode pembayaran (Transfer Bank & COD).
    *   Simulasi proses pembayaran dengan indikator loading dan notifikasi sukses.
*   **Sistem Notifikasi:** Notifikasi *toast* interaktif untuk memberikan umpan balik kepada pengguna (misal: "Produk ditambahkan ke keranjang").
*   **Animasi Interaktif:** Efek *ripple* pada tombol, animasi *scroll-trigger*, dan transisi halaman yang halus.

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi web standar:

*   **HTML5:** Struktur semantik halaman web.
*   **CSS3:** Styling kustom, animasi, dan efek visual (*Glassmorphism*).
*   **JavaScript (ES6+):** Logika interaktif, manipulasi DOM, manajemen `localStorage`, dan fungsi keranjang belanja.
*   **Bootstrap 5:** Framework CSS untuk layout responsif dan komponen UI (Navbar, Modal, Carousel, Card).
*   **FontAwesome:** Ikon vektor untuk mempercantik antarmuka.
*   **Google Fonts:** Tipografi modern (Roboto).

## 📂 Struktur File

Berikut adalah penjelasan singkat mengenai file-file utama dalam proyek ini:

*   `index.html`: Halaman utama (Beranda) yang berisi banner, statistik, fitur unggulan, testimoni, dan *carousel* produk unggulan.
*   `produk.html`: Halaman katalog yang menampilkan seluruh koleksi produk yang tersedia untuk dibeli.
*   `about.html`: Halaman informasi tentang UNKLAB Store.
*   `contact.html`: Halaman kontak untuk menghubungi layanan pelanggan.
*   `bantuan.html`: Halaman bantuan dan FAQ.
*   `style.css`: File CSS utama yang mengatur tema, layout, dan gaya visual keseluruhan.
*   `script.js`: File JavaScript utama yang menangani logika bisnis, interaksi UI, keranjang belanja, dan checkout.
*   `notification.js` & `notification-styles.css`: Modul khusus untuk menangani sistem notifikasi *toast*.
*   `wishlist.html` & `wishlist.js`: Fitur daftar keinginan (opsional/pengembangan).

## 🚀 Cara Menjalankan

Karena proyek ini berbasis *static web* (HTML/CSS/JS), Anda tidak memerlukan instalasi server backend yang rumit.

1.  Pastikan semua file berada dalam satu folder yang sama.
2.  Buka file `index.html` menggunakan web browser modern (Google Chrome, Firefox, Microsoft Edge, atau Safari).
3.  Website siap digunakan!

## 📝 Catatan Pengembang

*   **Simulasi Backend:** Proses checkout dan pembayaran hanya berupa simulasi di sisi klien (frontend). Tidak ada transaksi uang sungguhan atau penyimpanan data ke database server.
*   **Local Storage:** Data keranjang belanja disimpan di browser pengguna. Jika Anda membersihkan *cache/cookies* browser, keranjang akan kembali kosong.

---
**Dibuat oleh:** 
- Mait, Vegryo
- Mamangkey, Gerard 
- Taya, Indri 
- Mangangantung, Maysa 
- Gerungan, Dave Jordy

**Mata Kuliah:** Web Design Paralel G - Semester 3
**Dosen:** Najoan, Regi

**Universitas Klabat**