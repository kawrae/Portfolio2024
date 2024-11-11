function toggleInfo(sectionId) {
    const aboutSection = document.getElementById(sectionId);
    const toggleBtn = document.querySelector(`#${sectionId} .toggle-info-btn i`);

    aboutSection.classList.toggle("active");

    if (aboutSection.classList.contains("active")) {
        aboutSection.style.display = "block";
        toggleBtn.className = "fa fa-arrow-up";
    } else {
        toggleBtn.className = "fa fa-arrow-down";
        aboutSection.style.display = "none";
    }
}

window.addEventListener("load", function () {
    const aboutSections = document.querySelectorAll(".about-game-section");

    aboutSections.forEach((section) => {
        section.classList.add("active");

        setTimeout(() => {
            section.classList.remove("active");
            section.style.display = "none";
        }, 50); 
    });
});