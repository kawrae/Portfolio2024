// Set up canvas elements and contexts
const canvas1 = document.getElementById('waveCanvas1');
const canvas2 = document.getElementById('waveCanvas2');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

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

// Call this function after the page changes or when the container size changes
window.addEventListener('resize', resizeCanvas);

// Set initial canvas size
setCanvasSize();

// Adjust size on window resize
window.addEventListener('resize', setCanvasSize);

// Wave properties - increased amplitude and adjusted speed for more dynamic waves
const waveSpeed = 0.0008; // Increase the speed for a more lively effect
const waveAmplitude = 140; // Increase amplitude to make waves taller and more pronounced
const waveFrequency1 = 0.0023; // Adjust frequency to create tighter waves
const waveFrequency2 = 0.0026; // Slightly different frequency for more complex movement

// Particle properties
const particleMinSize = 1;
const particleMaxSize = 4;
const particleCount = 10;
const particleSize = 3;
const particleSpeed = 0.2; // Adjust particle speed as needed
const minLifetime = 200; // Minimum lifetime in milliseconds
const maxLifetime = 400; // Maximum lifetime in milliseconds

// Particles array to store their positions, velocities, lifetimes, and alpha values
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

  drawWave(ctx1, waveFrequency1, gradient1, performance.now());
  drawWave(ctx2, waveFrequency2, gradient2, performance.now());

  updateParticles();
  drawParticles(ctx1);
  drawParticles(ctx2);
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

// Update particles to simulate ember-like floating behavior
function updateParticles() {
  // Update particle positions, velocities, and lifetimes
  for (let i = 0; i < particles.length; i++) {
    particles[i].x += particles[i].vx;
    particles[i].y += particles[i].vy;
    particles[i].lifetime -= 1;
    particles[i].alpha = particles[i].lifetime / particles[i].initialLifetime;

    // Remove particle if its lifetime is over
    if (particles[i].lifetime <= 0) {
      particles.splice(i, 1);
    }
  }

  // Generate new particles if needed
  if (particles.length < particleCount) {
    for (let i = 0; i < particleCount - particles.length; i++) {
      const size = Math.random() * (particleMaxSize - particleMinSize) + particleMinSize;
      particles.push({
        x: Math.random() * canvas1.width,
        y: Math.random() * canvas1.height,
        vx: (Math.random() - 0.5) * particleSpeed, // Random initial x velocity
        vy: (Math.random() - 0.5) * particleSpeed, // Random initial y velocity
        size: size, // Store size of particle
        lifetime: Math.random() * (maxLifetime - minLifetime) + minLifetime,
        initialLifetime: Math.random() * (maxLifetime - minLifetime) + minLifetime,
        alpha: 1
      });
    }
  }
}

// Adjust the drawParticles function
function drawParticles(ctx) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Ensure the context is at 1:1 scale for particles
  for (let i = 0; i < particles.length; i++) {
    ctx.beginPath();
    ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${particles[i].alpha})`;
    ctx.fill();
  }
  ctx.restore();
}

// Start animation
animate();

