function toggleInfo(sectionId) {
    const aboutSection = document.getElementById(sectionId);
    const toggleBtn = document.querySelector(`#${sectionId} .toggle-info-btn i`);

    aboutSection.classList.toggle("active");

    if (aboutSection.classList.contains("active")) {
        aboutSection.style.display = "block";
        toggleBtn.className = "fa fa-arrow-up"; // Change to up arrow
    } else {
        toggleBtn.className = "fa fa-arrow-down"; // Change to down arrow
        aboutSection.style.display = "none";
    }
}

// Pre-expand and collapse the section on page load to smooth initial animations
window.addEventListener("load", function () {
    const aboutSections = document.querySelectorAll(".about-game-section");

    // For each section, trigger an initial expansion and collapse
    aboutSections.forEach((section) => {
        section.classList.add("active");

        // Remove the class after a short delay to reset to collapsed state
        setTimeout(() => {
            section.classList.remove("active");
            section.style.display = "none"; // Ensure it is hidden after reset
        }, 50); // Short delay just to trigger initial calculation
    });
});