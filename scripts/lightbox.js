const images = document.querySelectorAll('.gallery-img');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.querySelector('.close');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
let currentIndex = 0;

function showLightbox(index) {
    currentIndex = index;
    lightboxImage.src = images[currentIndex].src;
    lightbox.classList.add('active');
}

function hideLightbox() {
    lightbox.classList.remove('active');
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImage.src = images[currentIndex].src;
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentIndex].src;
}

// Open lightbox when image is clicked
images.forEach((image, index) => {
    image.addEventListener('click', () => showLightbox(index));
});

// Close lightbox
closeBtn.addEventListener('click', hideLightbox);

// Navigate images
rightArrow.addEventListener('click', showNextImage);
leftArrow.addEventListener('click', showPrevImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImage && e.target !== rightArrow && e.target !== leftArrow) {
        hideLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'Escape') {
            hideLightbox();
        }
    }
});