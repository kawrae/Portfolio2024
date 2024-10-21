document.addEventListener("DOMContentLoaded", function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelector('.nav-center ul');

    // Function to handle the initial state based on screen size
    function handleResize() {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none'; // Hide on small screens
        } else {
            navLinks.style.display = 'flex'; // Show on large screens
            navbar.classList.remove('active'); // Reset the active state
        }
    }

    // Check screen size on load
    handleResize();

    // Check screen size when resizing
    window.addEventListener('resize', handleResize);

    // Toggle the navbar links on mobile when the hamburger is clicked
    navbarToggler.addEventListener('click', function () {
        if (navLinks.style.display === 'none' || navLinks.style.display === '') {
            navLinks.style.display = 'flex'; // Show the links on toggle
            navbar.classList.add('active');  // Mark navbar as active
        } else {
            navLinks.style.display = 'none'; // Hide the links
            navbar.classList.remove('active'); // Remove active state
        }
    });
});