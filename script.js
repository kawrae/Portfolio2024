// Set up canvas elements and contexts
const canvas1 = document.getElementById('waveCanvas1');
const canvas2 = document.getElementById('waveCanvas2');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

// Variables to toggle waves and particles
let showWaves = true;
let showParticles = true;

// Function to set canvas size and handle pixel ratio scaling
function setCanvasSize() {
  const ratio = window.devicePixelRatio || 1;

  // Reset canvas size and scaling first to avoid accumulating transformations
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;

  ctx1.setTransform(1, 0, 0, 1, 0, 0); // Reset any scaling
  ctx2.setTransform(1, 0, 0, 1, 0, 0); // Reset any scaling

  // Apply new scaling
  canvas1.width = window.innerWidth * ratio;
  canvas1.height = window.innerHeight * ratio;
  canvas2.width = window.innerWidth * ratio;
  canvas2.height = window.innerHeight * ratio;

  ctx1.scale(ratio, ratio);
  ctx2.scale(ratio, ratio);
}

// Function to resize canvas
function resizeCanvas() {
  const container = document.getElementById('waves-container2');
  const ratio = window.devicePixelRatio || 1;

  // Set canvas size to match container
  canvas1.width = container.clientWidth * ratio;
  canvas1.height = container.clientHeight * ratio;
  canvas2.width = container.clientWidth * ratio;
  canvas2.height = container.clientHeight * ratio;

  // Reset transformations
  ctx1.setTransform(1, 0, 0, 1, 0, 0);
  ctx2.setTransform(1, 0, 0, 1, 0, 0);

  // Apply scaling
  ctx1.scale(ratio, ratio);
  ctx2.scale(ratio, ratio);
}

window.addEventListener('resize', resizeCanvas);

// Set initial canvas size
setCanvasSize();

// Adjust size on window resize
window.addEventListener('resize', setCanvasSize);

// Wave properties
const waveSpeed = 0.0008;
const waveAmplitude = 140;
const waveFrequency1 = 0.0023;
const waveFrequency2 = 0.0026;

// Particle properties
const particleMinSize = 1;
const particleMaxSize = 4;
const particleCount = 10;
const particles = [];

// Create gradients for the waves
const gradient1 = ctx1.createLinearGradient(0, canvas1.height / 1.2, 0, canvas1.height);
gradient1.addColorStop(0, 'rgba(1, 28, 148, 0.5)');
gradient1.addColorStop(1, 'rgba(0, 5, 54, 0.7)');

const gradient2 = ctx2.createLinearGradient(0, canvas2.height / 1.2, 0, canvas2.height);
gradient2.addColorStop(0, 'rgba(1, 28, 148, 0.5)');
gradient2.addColorStop(1, 'rgba(0, 5, 54, 0.3)');

// Animation loop
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

// Draw waves
function drawWave(ctx, frequency, gradient, timestamp) {
  ctx.globalAlpha = 0.9;

  ctx.beginPath();
  ctx.moveTo(0, canvas1.height);
  for (let x = 0; x < canvas1.width; x++) {
    const y = canvas1.height / 1.2 + Math.sin(x * frequency + timestamp * waveSpeed) * waveAmplitude;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(canvas1.width, canvas1.height);
  ctx.closePath();

  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.globalAlpha = 1;
}

// Update particles
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

// Draw particles
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

// Event listeners for toggle buttons
document.getElementById('toggleWaves').addEventListener('click', () => {
  showWaves = !showWaves;
  document.getElementById('toggleWaves').innerHTML = `<i class="fas fa-water"></i> Waves - ${showWaves ? 'On' : 'Off'}`;
});

document.getElementById('toggleParticles').addEventListener('click', () => {
  showParticles = !showParticles;
  document.getElementById('toggleParticles').innerHTML = `<i class="fas fa-star"></i> Particles - ${showParticles ? 'On' : 'Off'}`;
});

// Start animation
animate();