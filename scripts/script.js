// Set up canvas elements and contexts
const canvas1 = document.getElementById('waveCanvas1');
const canvas2 = document.getElementById('waveCanvas2');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

let showWaves = true;
let showParticles = true;

let waveGradientColorTop;
let waveGradientColorBottom;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'second') {
  document.documentElement.classList.add('second-theme');
  waveGradientColorTop = 'rgba(1, 23, 136, 0.6)';
  waveGradientColorBottom = 'rgba(1, 5, 53, 0.5)';
} else if (savedTheme === 'third') {
  document.documentElement.classList.add('third-theme');
  waveGradientColorTop = 'rgba(1, 23, 136, 0.6)';
  waveGradientColorBottom = 'rgba(1, 5, 53, 0.5)';
} else {
  document.documentElement.classList.add('default-theme');
  waveGradientColorTop = 'rgba(1, 23, 136, 0.6)';
  waveGradientColorBottom = 'rgba(1, 5, 53, 0.5)';
}

function setCanvasSize() {
  const ratio = window.devicePixelRatio || 1;

  canvas1.width = window.innerWidth * ratio;
  canvas1.height = window.innerHeight * ratio;
  canvas2.width = window.innerWidth * ratio;
  canvas2.height = window.innerHeight * ratio;

  ctx1.setTransform(1, 0, 0, 1, 0, 0);
  ctx2.setTransform(1, 0, 0, 1, 0, 0);

  ctx1.scale(ratio, ratio);
  ctx2.scale(ratio, ratio);
}

function resizeCanvas() {
  const container = document.getElementById('waves-container2');
  const ratio = window.devicePixelRatio || 1;

  canvas1.width = container.clientWidth * ratio;
  canvas1.height = container.clientHeight * ratio;
  canvas2.width = container.clientWidth * ratio;
  canvas2.height = container.clientHeight * ratio;

  ctx1.setTransform(1, 0, 0, 1, 0, 0);
  ctx2.setTransform(1, 0, 0, 1, 0, 0);

  ctx1.scale(ratio, ratio);
  ctx2.scale(ratio, ratio);

  createGradients();
}

window.addEventListener('resize', resizeCanvas);

setCanvasSize();

window.addEventListener('resize', setCanvasSize);

const waveSpeed = 0.0008;
let waveAmplitudeBase = 140;
const waveFrequency1 = 0.0023;
const waveFrequency2 = 0.0026;

function adjustWaveAmplitude() {
  const screenHeight = window.innerHeight;
  waveAmplitudeBase = screenHeight * 0.1;
}

adjustWaveAmplitude();
window.addEventListener('resize', adjustWaveAmplitude);

const particleMinSize = 1;
const particleMaxSize = 4;
const particleCount = 10;
const particles = [];

let gradient1, gradient2;

function createGradients() {
  if (document.documentElement.classList.contains('second-theme')) {
    waveGradientColorTop = 'rgba(1, 23, 136, 0.6)';
    waveGradientColorBottom = 'rgba(1, 5, 1, 0.5)';
  } else if (document.documentElement.classList.contains('third-theme')) {
    waveGradientColorTop = 'rgba(1, 23, 136, 0.6)';
    waveGradientColorBottom = 'rgba(1, 5, 1, 0.5)';
  } else {
    waveGradientColorTop = 'rgba(1, 23, 136, 0.6)';
    waveGradientColorBottom = 'rgba(1, 5, 1, 0.5)';
  }

  gradient1 = ctx1.createLinearGradient(0, canvas1.height * 0.8, 0, canvas1.height);
  gradient1.addColorStop(0, waveGradientColorTop);
  gradient1.addColorStop(1, waveGradientColorBottom);

  gradient2 = ctx2.createLinearGradient(0, canvas2.height * 0.8, 0, canvas2.height);
  gradient2.addColorStop(0, waveGradientColorTop);
  gradient2.addColorStop(1, waveGradientColorBottom);
}

createGradients();

function animate() {
  requestAnimationFrame(animate);
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  if (showWaves) {
    drawWave(ctx1, waveFrequency1, gradient1, performance.now());
    drawWave(ctx2, waveFrequency2, gradient2, performance.now());
  }

  if (showParticles) {
    updateParticles();
    drawParticles(ctx1);
    drawParticles(ctx2);
  }
}

function drawWave(ctx, frequency, gradient, timestamp) {
  const waveAmplitude = waveAmplitudeBase;
  const yOffset = canvas1.height * 0.8;

  ctx.globalAlpha = 0.9;

  ctx.beginPath();
  ctx.moveTo(0, canvas1.height);
  for (let x = 0; x < canvas1.width; x++) {
    const y = yOffset + Math.sin(x * frequency + timestamp * waveSpeed) * waveAmplitude;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(canvas1.width, canvas1.height);
  ctx.closePath();

  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.globalAlpha = 1;
}

function updateParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].x += particles[i].vx;
    particles[i].y += particles[i].vy;
    particles[i].lifetime -= 1;
    particles[i].alpha = particles[i].lifetime / particles[i].initialLifetime;

    if (particles[i].lifetime <= 0) {
      particles.splice(i, 1);
    }
  }

  if (particles.length < particleCount) {
    for (let i = 0; i < particleCount - particles.length; i++) {
      const size = Math.random() * (particleMaxSize - particleMinSize) + particleMinSize;
      particles.push({
        x: Math.random() * canvas1.width,
        y: Math.random() * canvas1.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: size,
        lifetime: Math.random() * (400 - 200) + 200,
        initialLifetime: Math.random() * (400 - 200) + 200,
        alpha: 1
      });
    }
  }
}

function drawParticles(ctx) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  for (let i = 0; i < particles.length; i++) {
    ctx.beginPath();
    ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${particles[i].alpha})`;
    ctx.fill();
  }
  ctx.restore();
}

document.getElementById('toggleWaves').addEventListener('click', () => {
  showWaves = !showWaves;
  document.getElementById('toggleWaves').innerHTML = `<i class="fas fa-water"></i> Waves - ${showWaves ? 'On' : 'Off'}`;
});

document.getElementById('toggleParticles').addEventListener('click', () => {
  showParticles = !showParticles;
  document.getElementById('toggleParticles').innerHTML = `<i class="fas fa-star"></i> Particles - ${showParticles ? 'On' : 'Off'}`;
});

  document.getElementById('drop-Item').addEventListener('click', function () {
    const isDefaultTheme = document.documentElement.classList.contains('default-theme');

    if (isDefaultTheme) {
      document.documentElement.classList.remove('default-theme');
      document.documentElement.classList.add('second-theme');
      localStorage.setItem('theme', 'second');
      document.getElementById('drop-Item').innerHTML = `<i class="fas fa-moon"></i> Dark Theme - Off`;
    } else {
      document.documentElement.classList.remove('second-theme');
      document.documentElement.classList.add('default-theme');
      localStorage.setItem('theme', 'default');
      document.getElementById('drop-Item').innerHTML = `<i class="fas fa-sun"></i> Dark Theme - On`;
    }
  });

  window.addEventListener('load', () => {
    const currentTheme = localStorage.getItem('theme') || 'default';
    document.documentElement.classList.add(currentTheme === 'second' ? 'second-theme' : 'default-theme');
    document.getElementById('drop-Item').innerHTML = currentTheme === 'second'
      ? `<i class="fas fa-moon"></i> Dark Theme - Off`
      : `<i class="fas fa-sun"></i> Dark Theme - On`;
  });

animate();