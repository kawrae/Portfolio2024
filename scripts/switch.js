function switchScript() {
    // Check screen width and switch between mobile and desktop
    if (window.innerWidth < 768) {
      // Deactivate desktop script
      showWaves = false;
      showParticles = false;
  
      // Activate mobile script
      showMobileWaves = true;
      showMobileParticles = true;
  
    } else {
      // Deactivate mobile script
      showMobileWaves = false;
      showMobileParticles = false;
  
      // Activate desktop script
      showWaves = true;
      showParticles = true;
    }
  }
  
  // Run script on page load and on window resize
  window.addEventListener('resize', switchScript);
  window.addEventListener('load', switchScript);
  