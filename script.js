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
const sections = document.querySelectorAll('section, header');

// Pengaman agar saat diklik, efek scroll tidak bentrok dengan deteksi otomatis
let isClickScrolling = false;

// 1. KONTROL AKTIF VIA KLIK MENU
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        isClickScrolling = true;

        // Reset & pindahkan kelas active secara instan saat diklik
        navLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');

        // Buka kembali deteksi scroll setelah animasi perpindahan halaman selesai
        setTimeout(() => {
            isClickScrolling = false;
        }, 800);
    });
});

// 2. KONTROL AKTIF VIA SCROLL DENGAN FORMULA GETBOUNDINGCLIENTRECT
window.addEventListener('scroll', () => {
    if (isClickScrolling) return;

    let currentSectionId = '';

    sections.forEach(section => {
        // Mengukur posisi seksi relatif terhadap layar komputer saat ini
        const rect = section.getBoundingClientRect();
        
        // SELEKSI PINTAR: Jika bagian atas seksi sudah masuk area layar atas (toleransi 200px)
        if (rect.top <= 200 && rect.bottom >= 200) {
            currentSectionId = section.getAttribute('id');
        }
    });

    if (currentSectionId) {
        navLinks.forEach(link => {
            // Hapus semua kelas active terlebih dahulu
            link.classList.remove('active');
            
            // Nyalakan garis bawah hanya pada menu yang id-nya cocok
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
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

// 2. BONUS PINTAR: Menu otomatis menutup kembali saat pengguna mengeklik salah satu menu tautan
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});
// ==========================================================================
// LOGIKA CAROUSEL SWIPE OTOMATIS KARTU SERTIFIKAT (VERSI TANGGUH)
// ==========================================================================
document.addEventListener("DOMContentLoaded", function() {
    const certTrack = document.getElementById('certSliderTrack');
    const certPrev = document.getElementById('certPrevBtn');
    const certNext = document.getElementById('certNextBtn');

    if (certTrack && certPrev && certNext) {
        
        // 🎯 FUNGSI BARU: Menghitung jarak geser dengan angka cadangan yang pasti untuk desktop
        function getCertScrollAmount() {
            const firstCard = certTrack.querySelector('.cert-card-box');
            if (firstCard && firstCard.clientWidth > 0) {
                return firstCard.clientWidth + 24; // Lebar kartu + gap 24px
            }
            // Jika layar desktop standar 3 kolom, bagi lebar track menjadi 3 bagian
            return (certTrack.clientWidth / 3); 
        }

        // 1. TOMBOL PANAH KANAN (DIPAKSA BERGESER)
        certNext.addEventListener('click', function(e) {
            e.preventDefault();
            const scrollAmount = getCertScrollAmount();
            
            // Deteksi manual ujung kanan
            const isAtEnd = certTrack.scrollLeft + certTrack.clientWidth >= certTrack.scrollWidth - 20;
            
            if (isAtEnd) {
                certTrack.scrollTo({ left: 0, behavior: 'smooth' }); // Loop ke awal
            } else {
                certTrack.scrollTo({
                    left: certTrack.scrollLeft + scrollAmount,
                    behavior: 'smooth'
                });
            }
        });

        // 2. TOMBOL PANAH KIRI (DIPAKSA MUNDUR)
        certPrev.addEventListener('click', function(e) {
            e.preventDefault();
            const scrollAmount = getCertScrollAmount();
            
            if (certTrack.scrollLeft <= 10) {
                certTrack.scrollTo({ left: certTrack.scrollWidth, behavior: 'smooth' }); // Loop ke ujung akhir
            } else {
                certTrack.scrollTo({
                    left: certTrack.scrollLeft - scrollAmount,
                    behavior: 'smooth'
                });
            }
        });

        // Fungsi Menghentikan Sementara Autoplay
        function stopCertAutoplay() {
            if (certAutoplayTimer) {
                clearInterval(certAutoplayTimer);
            }
        }

        // 2. KONTROL MANUAL TOMBOL PANAH
        certNext.addEventListener('click', function() {
            stopCertAutoplay();
            certTrack.scrollBy({ left: getCertScrollAmount(), behavior: 'smooth' });
            startCertAutoplay(); // Jalankan ulang timer setelah diklik manual
        });

        certPrev.addEventListener('click', function() {
            stopCertAutoplay();
            certTrack.scrollBy({ left: -getCertScrollAmount(), behavior: 'smooth' });
            startCertAutoplay();
        });

        // 3. FITUR HOVER MOUSE: Stop jalan saat kursor menyentuh kartu
        certTrack.addEventListener('mouseenter', stopCertAutoplay);
        certTrack.addEventListener('mouseleave', startCertAutoplay);

        // 4. DETEKSI SWIPE JARI MANUAL (Khusus Layar HP / Touchpad)
        // Jika user melakukan swipe manual, matikan sementara autoplay agar tidak pusing
        certTrack.addEventListener('touchstart', stopCertAutoplay, { passive: true });
        certTrack.addEventListener('touchend', startCertAutoplay, { passive: true });

        // Nyalakan carousel untuk pertama kalinya
        startCertAutoplay();
    }
});