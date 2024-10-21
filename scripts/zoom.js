document.addEventListener("DOMContentLoaded", function () {
    const lightboxImage = document.getElementById('lightbox-image');
    const lightbox = document.querySelector('.lightbox'); // The lightbox element
    let scale = 1; // Default zoom level
    let isDragging = false; // Track whether the user is dragging
    let startX, startY; // Starting mouse coordinates for dragging
    let translateX = 0, translateY = 0; // Track translation of the image for dragging

    // Function to handle zoom in and out
    function zoomImage(event) {
        event.preventDefault(); // Prevent the default scroll behavior

        const zoomStep = 0.1; // Adjust this value to control zoom sensitivity

        // Determine zoom direction based on mouse wheel (up or down)
        if (event.deltaY < 0) {
            scale += zoomStep; // Zoom in
        } else {
            scale -= zoomStep; // Zoom out
        }

        // Limit the scale so it doesn't zoom out too much or too far in
        scale = Math.min(Math.max(0.5, scale), 3);

        // Apply the zoom scaling
        lightboxImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        lightboxImage.style.cursor = scale > 1 ? 'grab' : 'auto'; // Change cursor to indicate draggable state
    }

    // Event listener for mouse wheel zoom
    lightboxImage.addEventListener('wheel', zoomImage);

    // Handle mouse drag when zoomed in
    lightboxImage.addEventListener('mousedown', function (event) {
        if (scale > 1) { // Only allow dragging when zoomed in
            isDragging = true;
            startX = event.pageX - translateX; // Set initial mouse coordinates
            startY = event.pageY - translateY;
            lightboxImage.style.cursor = 'grabbing'; // Change cursor to grabbing when dragging starts
            event.preventDefault(); // Prevent default behavior (e.g., text selection)
        }
    });

    lightboxImage.addEventListener('mousemove', function (event) {
        if (isDragging) {
            const deltaX = event.pageX - startX;
            const deltaY = event.pageY - startY;

            // Calculate the maximum allowed translation based on the container's size
            const containerRect = lightboxImage.parentElement.getBoundingClientRect();
            const imageRect = lightboxImage.getBoundingClientRect();
            const maxTranslateX = (imageRect.width * scale - containerRect.width) / 2;
            const maxTranslateY = (imageRect.height * scale - containerRect.height) / 2;

            // Constrain translation to prevent dragging off-screen
            translateX = Math.min(Math.max(deltaX, -maxTranslateX), maxTranslateX);
            translateY = Math.min(Math.max(deltaY, -maxTranslateY), maxTranslateY);

            // Apply translation along with zoom scaling
            lightboxImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        }
    });

    lightboxImage.addEventListener('mouseup', function () {
        isDragging = false;
        lightboxImage.style.cursor = 'grab'; // Revert cursor back to grab when dragging stops
    });

    lightboxImage.addEventListener('mouseleave', function () {
        isDragging = false;
        lightboxImage.style.cursor = scale > 1 ? 'grab' : 'auto'; // Reset cursor when the mouse leaves the image
    });

    // Function to reset zoom and position
    function resetZoom() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        lightboxImage.style.transform = `scale(1) translate(0px, 0px)`; // Reset zoom level and translation
        lightboxImage.style.cursor = 'auto'; // Reset cursor
    }

    // Reset when the lightbox is closed
    document.querySelector('.lightbox .close').addEventListener('click', function () {
        resetZoom();
    });

    // Reset when clicking anywhere outside the image (clicking on the lightbox)
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            resetZoom();
        }
    });
});
