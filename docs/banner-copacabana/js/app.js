document.addEventListener('DOMContentLoaded', () => {
    // Lightbox Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    // Array de imagens da galeria
    const galleryItems = document.querySelectorAll('.gallery-item img');
    let currentIndex = 0;

    const imagesList = Array.from(galleryItems).map(img => ({
        src: img.src,
        alt: img.alt || 'Apartamento em Copacabana'
    }));

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = imagesList[currentIndex].src;
        lightboxImg.alt = imagesList[currentIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
        lightboxImg.src = imagesList[currentIndex].src;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % imagesList.length;
        lightboxImg.src = imagesList[currentIndex].src;
    }

    galleryItems.forEach((img, index) => {
        img.parentElement.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
    if (lightboxNext) lightboxNext.addEventListener('click', showNext);

    // Video Tour Modal Elements
    const videoModal = document.getElementById('videoModal');
    const btnOpenVideoModal = document.getElementById('btnOpenVideoModal');
    const btnCloseVideoModal = document.getElementById('btnCloseVideoModal');
    const videoModalOverlay = document.getElementById('videoModalOverlay');
    const fullTourVideo = document.getElementById('fullTourVideo');
    const heroVideoBg = document.querySelector('.hero-video-bg');

    function openVideoModal() {
        if (!videoModal) return;
        videoModal.classList.add('active');
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Pausar o vídeo background da hero para economizar CPU/Bateria
        if (heroVideoBg) {
            heroVideoBg.pause();
        }

        // Tocar o vídeo tour completo
        if (fullTourVideo) {
            fullTourVideo.play().catch(err => console.log('Autoplay bloqueado pelo navegador:', err));
        }
    }

    function closeVideoModal() {
        if (!videoModal) return;
        videoModal.classList.remove('active');
        videoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';

        // Pausar e resetar o vídeo completo
        if (fullTourVideo) {
            fullTourVideo.pause();
            fullTourVideo.currentTime = 0;
        }

        // Retomar o vídeo background em loop
        if (heroVideoBg) {
            heroVideoBg.play().catch(() => {});
        }
    }

    if (btnOpenVideoModal) {
        btnOpenVideoModal.addEventListener('click', openVideoModal);
    }

    if (btnCloseVideoModal) {
        btnCloseVideoModal.addEventListener('click', closeVideoModal);
    }

    if (videoModalOverlay) {
        videoModalOverlay.addEventListener('click', closeVideoModal);
    }

    // Teclas do teclado
    document.addEventListener('keydown', (e) => {
        if (videoModal && videoModal.classList.contains('active')) {
            if (e.key === 'Escape') closeVideoModal();
            return;
        }

        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        }
    });
});
