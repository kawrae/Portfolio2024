document.addEventListener('DOMContentLoaded', function () {
  // Canvas elements and contexts
  const canvas1 = document.getElementById('waveCanvas1');
  const canvas2 = document.getElementById('waveCanvas2');
  const ctx1 = canvas1.getContext('2d');
  const ctx2 = canvas2.getContext('2d');

  // Variables to toggle waves and particles
  let showWaves = true;
  let showParticles = true;

  // Wave gradient colors
  let waveGradientColorTop;
  let waveGradientColorBottom;

  // Theme initialization
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'second') {
    document.documentElement.classList.add('second-theme'); // Apply theme to html
    waveGradientColorTop = 'rgba(251, 63, 64, 0.35)';
    waveGradientColorBottom = 'rgba(148, 1, 21, 0.25)';
  } else {
    document.documentElement.classList.add('default-theme'); // Apply theme to html
    waveGradientColorTop = 'rgba(1, 23, 136, 0.6)';
    waveGradientColorBottom = 'rgba(1, 5, 53, 0.5)';
  }

  // Function to set canvas size and handle pixel ratio scaling
  function setCanvasSize() {
    const ratio = window.devicePixelRatio || 1;

    // Reset canvas size and scaling
    canvas1.width = window.innerWidth * ratio;
    canvas1.height = window.innerHeight * ratio;
    canvas2.width = window.innerWidth * ratio;
    canvas2.height = window.innerHeight * ratio;

    ctx1.setTransform(1, 0, 0, 1, 0, 0);
    ctx2.setTransform(1, 0, 0, 1, 0, 0);

    ctx1.scale(ratio, ratio);
    ctx2.scale(ratio, ratio);
  }

  // Set initial canvas size
  setCanvasSize();

  // Adjust size on window resize
  window.addEventListener('resize', setCanvasSize);

  // Wave properties
  const waveSpeed = 0.0008;
  const waveAmplitude = 100;
  const waveFrequency1 = 0.0023;
  const waveFrequency2 = 0.0026;

  // Particle properties
  const particleMinSize = 1;
  const particleMaxSize = 5;
  const particleCount = 20;
  const particleSpeed = 0.2;
  const minLifetime = 200;
  const maxLifetime = 400;

  // Particles array
  const particles = [];

  // Create a gradient for the waves
  function createWaveGradient(ctx, yStart, yEnd) {
    const gradient = ctx.createLinearGradient(0, yStart, 0, yEnd);
    gradient.addColorStop(0, waveGradientColorTop);
    gradient.addColorStop(1, waveGradientColorBottom);
    return gradient;
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    if (showWaves) {
      drawWave(ctx1, waveFrequency1, performance.now());
      drawWave(ctx2, waveFrequency2, performance.now());
    }

    if (showParticles) {
      updateParticles();
      drawParticles(ctx1);
      drawParticles(ctx2);
    }
  }

  // Draw waves
  function drawWave(ctx, frequency, timestamp) {
    const waveTop = canvas1.height / 4.2 - waveAmplitude;
    const waveBottom = canvas1.height / 4.2 + waveAmplitude;

    const waveGradient = createWaveGradient(ctx, waveTop, waveBottom);

    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(0, canvas1.height);
    for (let x = 0; x < canvas1.width; x++) {
      const y = canvas1.height / 4.2 + Math.sin(x * frequency + timestamp * waveSpeed) * waveAmplitude;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas1.width, canvas1.height);
    ctx.closePath();

    ctx.fillStyle = waveGradient;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Update particles
  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.lifetime -= 1;
      p.alpha = p.lifetime / p.initialLifetime;

      if (p.lifetime <= 0) {
        particles.splice(i, 1);
      }
    }

    while (particles.length < particleCount) {
      const size = Math.random() * (particleMaxSize - particleMinSize) + particleMinSize;
      const lifetime = Math.random() * (maxLifetime - minLifetime) + minLifetime;
      particles.push({
        x: Math.random() * canvas1.width,
        y: Math.random() * canvas1.height,
        vx: (Math.random() - 0.5) * particleSpeed,
        vy: (Math.random() - 0.5) * particleSpeed,
        size: size,
        lifetime: lifetime,
        initialLifetime: lifetime,
        alpha: 1
      });
    }
  }

  // Draw particles
  function drawParticles(ctx) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.fill();
    }
    ctx.restore();
  }

  // Event listeners for toggle buttons with icons
  document.getElementById('toggleWaves').addEventListener('click', () => {
    showWaves = !showWaves;
    document.getElementById('toggleWaves').innerHTML = `<i class="fas fa-water"></i> Waves - ${showWaves ? 'On' : 'Off'}`;
  });

  document.getElementById('toggleParticles').addEventListener('click', () => {
    showParticles = !showParticles;
    document.getElementById('toggleParticles').innerHTML = `<i class="fas fa-star"></i> Particles - ${showParticles ? 'On' : 'Off'}`;
  });

  // Theme toggle logic
  document.getElementById('drop-Item').addEventListener('click', function () {
    const isDefaultTheme = document.documentElement.classList.contains('default-theme');

    if (isDefaultTheme) {
      document.documentElement.classList.remove('default-theme');
      document.documentElement.classList.add('second-theme');

      waveGradientColorTop = 'rgba(251, 63, 64, 0.35)';
      waveGradientColorBottom = 'rgba(148, 1, 21, 0.25)';

      localStorage.setItem('theme', 'second');
    } else {
      document.documentElement.classList.remove('second-theme');
      document.documentElement.classList.add('default-theme');

      waveGradientColorTop = 'rgba(1, 23, 136, 0.6)';
      waveGradientColorBottom = 'rgba(1, 5, 53, 0.5)';

      localStorage.setItem('theme', 'default');
    }
  });

  // Start the animation
  animate();
});