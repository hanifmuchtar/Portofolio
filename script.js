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
document.addEventListener("DOMContentLoaded", function() {

});


;
document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================================================
    // INKUBATOR FUNGSI CAROUSEL GENERIK (Bisa dipakai berulang kali)
    // ==========================================================================
    function initTransformCarousel(trackId, prevBtnId, nextBtnId, itemsPerPageMobile, itemsPerPageDesktop, gapSize) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (!track || !prevBtn || !nextBtn) return;

        let currentIndex = 0;
        let autoplayTimer = null;
        const cards = track.children;

        function getItemsPerPage() {
            return window.innerWidth <= 768 ? itemsPerPageMobile : itemsPerPageDesktop;
        }

        // Fungsi utama menggeser track menggunakan teknik math transform
        function moveSlider() {
            const itemsPerPage = getItemsPerPage();
            const maxIndex = Math.max(0, cards.length - itemsPerPage);
            
            // Batasi indeks agar tidak menggeser ke area kosong
            if (currentIndex > maxIndex) currentIndex = 0;
            if (currentIndex < 0) currentIndex = maxIndex;

            if (cards.length > 0) {
                const cardWidth = cards[0].clientWidth;
                // Hitung koordinat geser: (Lebar kartu + Gap) * indeks aktif
                const amountToMove = (cardWidth + gapSize) * currentIndex;
                track.style.transform = `translateX(-${amountToMove}px)`;
            }
        }

        function startAutoplay() {
            if (autoplayTimer) clearInterval(autoplayTimer);
            autoplayTimer = setInterval(() => {
                const itemsPerPage = getItemsPerPage();
                if (currentIndex >= cards.length - itemsPerPage) {
                    currentIndex = 0; // Balik ke awal jika sudah di ujung
                } else {
                    currentIndex++;
                }
                moveSlider();
            }, 4000); // Bergeser otomatis setiap 4 detik
        }

        function stopAutoplay() {
            if (autoplayTimer) clearInterval(autoplayTimer);
        }

        // Event Tombol Navigasi Manual
        nextBtn.addEventListener('click', () => {
            stopAutoplay();
            const itemsPerPage = getItemsPerPage();
            if (currentIndex >= cards.length - itemsPerPage) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            moveSlider();
            startAutoplay();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoplay();
            if (currentIndex <= 0) {
                const itemsPerPage = getItemsPerPage();
                currentIndex = Math.max(0, cards.length - itemsPerPage);
            } else {
                currentIndex--;
            }
            moveSlider();
            startAutoplay();
        });

        // Fitur Kursor: Berhenti geser saat diarahkan mouse
        track.addEventListener('mouseenter', stopAutoplay);
        track.addEventListener('mouseleave', startAutoplay);

        // Pasang sensor resize agar pembagian layout tetap presisi saat browser dilebarkan
        window.addEventListener('resize', moveSlider);

        // Jalankan carousel
        setTimeout(moveSlider, 100);
        startAutoplay();
    }

    // ==========================================================================
    // AKTIFKAN KEDUA CAROUSEL SECARA BERSAMAAN
    // ==========================================================================
    
    // 1. Jalankan untuk Seksi Sertifikat (Tampil 1 di HP, 3 di Desktop, Gap 24px)
    initTransformCarousel('certSliderTrack', 'certPrevBtn', 'certNextBtn', 1, 3, 24);

    // 2. Jalankan untuk Seksi Featured Projects (Tampil 1 di HP, 2 di Desktop, Gap 30px)
    initTransformCarousel('projSliderTrack', 'projPrevBtn', 'projNextBtn', 1, 2, 30);
});
document.addEventListener("DOMContentLoaded", function() {
    function initHybridCarousel(trackId, prevBtnId, nextBtnId) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        // 1. AUTOSCROLL LAMBAT
        let autoScroll = setInterval(() => {
            if (track.scrollLeft >= (track.scrollWidth - track.clientWidth)) {
                track.scrollLeft = 0; // Balik ke awal
            } else {
                track.scrollLeft += 1; // Kecepatan lambat (1px per tick)
            }
        }, 50); // Kecepatan tick (semakin kecil semakin halus)

        // Berhenti saat mouse di atas
        track.addEventListener('mouseenter', () => clearInterval(autoScroll));
        track.addEventListener('mouseleave', () => {
            autoScroll = setInterval(() => {
                if (track.scrollLeft >= (track.scrollWidth - track.clientWidth)) {
                    track.scrollLeft = 0;
                } else {
                    track.scrollLeft += 1;
                }
            }, 50);
        });

        // 2. TOMBOL NAVIGASI MANUAL
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 300, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    // Jalankan untuk keduanya
    initHybridCarousel('projSliderTrack', 'projPrevBtn', 'projNextBtn');
    initHybridCarousel('certSliderTrack', 'certPrevBtn', 'certNextBtn');
});