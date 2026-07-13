// Memastikan efek interaktif kartu proyek berjalan
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // Efek visual klik cepat saat disentuh
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'none';
        }, 150);
    });
});
// Ambil semua elemen tautan menu
const navLinks = document.querySelectorAll('.nav-links li a');

// 1. LOGIKA SAAT MENU DIKLIK (GARIS LANGSUNG BERPINDAH & MENETAP)
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Hapus kelas 'active' (garis menetap) dari semua menu
        navLinks.forEach(item => item.classList.remove('active'));
        
        // Tambahkan kelas 'active' hanya pada menu yang baru saja diklik
        this.classList.add('active');
    });
});

// 2. LOGIKA SAAT HALAMAN DI-SCROLL (GARIS OTOMATIS MENGIKUTI POSISI SCREEN)
const sections = document.querySelectorAll('section, header');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentSection)) {
            // Bersihkan menu lain, nyalakan garis menetap di seksi yang sedang dibaca
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Pesan eksklusif bagi penguji/developer di konsol inspect element
console.log("%cHello Tech Recruiter! Welcome to Muhammad Hanif Muchtar's Portfolio.", "color: #2C5EAD; font-size: 16px; font-weight: bold;");
const grid = document.getElementById('projectGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// 1. Hitung jarak geser (Lebar kartu 380px + gap 30px)
const scrollAmount = 410; 
let autoplayTimer = null;
const autoplayDuration = 3500; // 🎯 Durasi jeda bergulir: 3.5 detik (sesuaikan dalam milidetik)

// 2. Fungsi Utama untuk Menggeser Otomatis ke Kanan
function startAutoplay() {
    autoplayTimer = setInterval(() => {
        // Cek apakah posisi guliran sudah mencapai ujung kanan maksimal
        const isAtEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10;
        
        if (isAtEnd) {
            // Jika sudah di ujung kanan, otomatis kembali mundur perlahan ke awal (ujung kiri)
            grid.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            // Jika belum di ujung, terus bergulir ke kanan
            grid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }, autoplayDuration);
}

// 3. Fungsi untuk Menghentikan Sementara Guliran Otomatis
function stopAutoplay() {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
    }
}

// 4. AKTIFKAN FITUR PINTAR (MOUSE HOVER INTERACTION)
// Hentikan gulir otomatis saat kursor mouse masuk ke area proyek
grid.addEventListener('mouseenter', stopAutoplay);
// Jalankan kembali gulir otomatis saat kursor keluar dari area proyek
grid.addEventListener('mouseleave', startAutoplay);

// 5. TOMBOL MANUAL (Klik Panah tetap berfungsi normal)
nextBtn.addEventListener('click', () => {
    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

// 6. Jalankan slider otomatis pertama kali saat halaman web selesai dimuat
startAutoplay();

// 1. Aksi ketika tombol 3 garis diklik
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// 2. BONUS PINTAR: Menu otomatis menutup kembali saat pengguna mengeklik salah satu menu tautan
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});