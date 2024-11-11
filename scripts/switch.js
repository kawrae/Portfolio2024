function switchScript() {
    if (window.innerWidth < 768) {
      showWaves = false;
      showParticles = false;
  
      showMobileWaves = true;
      showMobileParticles = true;
  
    } else {
      showMobileWaves = false;
      showMobileParticles = false;
  
      showWaves = true;
      showParticles = true;
    }
  }
  
  window.addEventListener('resize', switchScript);
  window.addEventListener('load', switchScript);
  