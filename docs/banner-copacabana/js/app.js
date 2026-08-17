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

    // Fechar ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Teclas do teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
});
