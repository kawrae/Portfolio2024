document.addEventListener("DOMContentLoaded", function () {
    const lightboxImage = document.getElementById('lightbox-image');
    const lightbox = document.querySelector('.lightbox');
    let scale = 1;
    let isDragging = false;
    let startX, startY;
    let translateX = 0, translateY = 0;

    function zoomImage(event) {
        event.preventDefault();

        const zoomStep = 0.1;

        if (event.deltaY < 0) {
            scale += zoomStep;
        } else {
            scale -= zoomStep;
        }

        scale = Math.min(Math.max(0.5, scale), 3);

        lightboxImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        lightboxImage.style.cursor = scale > 1 ? 'grab' : 'auto';
    }

    lightboxImage.addEventListener('wheel', zoomImage);

    lightboxImage.addEventListener('mousedown', function (event) {
        if (scale > 1) {
            isDragging = true;
            startX = event.pageX - translateX;
            startY = event.pageY - translateY;
            lightboxImage.style.cursor = 'grabbing';
            event.preventDefault();
        }
    });

    lightboxImage.addEventListener('mousemove', function (event) {
        if (isDragging) {
            const deltaX = event.pageX - startX;
            const deltaY = event.pageY - startY;

            const containerRect = lightboxImage.parentElement.getBoundingClientRect();
            const imageRect = lightboxImage.getBoundingClientRect();
            const maxTranslateX = (imageRect.width * scale - containerRect.width) / 2;
            const maxTranslateY = (imageRect.height * scale - containerRect.height) / 2;

            translateX = Math.min(Math.max(deltaX, -maxTranslateX), maxTranslateX);
            translateY = Math.min(Math.max(deltaY, -maxTranslateY), maxTranslateY);

            lightboxImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        }
    });

    lightboxImage.addEventListener('mouseup', function () {
        isDragging = false;
        lightboxImage.style.cursor = 'grab'; 
    });

    lightboxImage.addEventListener('mouseleave', function () {
        isDragging = false;
        lightboxImage.style.cursor = scale > 1 ? 'grab' : 'auto';
    });

    function resetZoom() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        lightboxImage.style.transform = `scale(1) translate(0px, 0px)`;
        lightboxImage.style.cursor = 'auto';
    }

    document.querySelector('.lightbox .close').addEventListener('click', function () {
        resetZoom();
    });

    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            resetZoom();
        }
    });
});
