const navbarToggler = document.getElementById('navbar-toggler');
const menuOverlay = document.getElementById('menu-overlay');

navbarToggler.addEventListener('click', () => {
  menuOverlay.classList.toggle('open');
});