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
// LOGIKA CAROUSEL SWIPE AUTOMATIS KARTU SERTIFIKAT
// ==========================================================================
const certTrack = document.getElementById('certSliderTrack');
const certPrev = document.getElementById('certPrevBtn');
const certNext = document.getElementById('certNextBtn');

if (certTrack && certPrev && certNext) {
    // Perhitungan jarak geser yang lebih aman
    const getScrollAmount = () => {
        const firstCard = certTrack.querySelector('.cert-card-box');
        // Jika box terbaca, gunakan lebarnya + gap (24px). Jika tidak, gunakan standarnya (350px)
        return firstCard && firstCard.clientWidth > 0 ? firstCard.clientWidth + 24 : 350; 
    };

    let certAutoplayTimer = null;

    // 1. Fungsi Bergulir Otomatis secara Swipe
    function startCertAutoplay() {
        certAutoplayTimer = setInterval(() => {
            const amount = getScrollAmount();
            const isAtEnd = certTrack.scrollLeft + certTrack.clientWidth >= certTrack.scrollWidth - 10;
            
            if (isAtEnd) {
                // Balik perlahan ke box pertama jika sudah mentok ujung kanan
                certTrack.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Geser ke box berikutnya di sebelah kanan
                certTrack.scrollBy({ left: amount, behavior: 'smooth' });
            }
        }, 4000); // Bergulir otomatis setiap 4 detik
    }

    function stopCertAutoplay() {
        if (certAutoplayTimer) clearInterval(certAutoplayTimer);
    }

    // 2. Tombol Manual Klik Panah
    certNext.addEventListener('click', () => {
        certTrack.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    certPrev.addEventListener('click', () => {
        certTrack.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    // 3. Hover Interaction: Berhenti otomatis saat kursor nempel di box
    certTrack.addEventListener('mouseenter', stopCertAutoplay);
    certTrack.addEventListener('mouseleave', startCertAutoplay);

    // Jalankan pertama kali saat halaman siap
    startCertAutoplay();
}