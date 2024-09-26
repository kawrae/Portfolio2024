const canvas1 = document.getElementById('waveCanvas1');
const canvas2 = document.getElementById('waveCanvas2');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

// Set canvas dimensions
const width = window.innerWidth;
const height = window.innerHeight;
canvas1.width = width;
canvas1.height = height;
canvas2.width = width;
canvas2.height = height;

// Wave properties
const waveSpeed = 0.00080;
const waveAmplitude = 50;
const waveFrequency1 = 0.0045;
const waveFrequency2 = 0.0050;

// Particle properties
const particleCount = 10;
const particleSize = 3;
const particleSpeed = 0.02; // Adjust particle speed as needed
const minLifetime = 200; // Minimum lifetime in milliseconds
const maxLifetime = 400; // Maximum lifetime in milliseconds

// Particles array to store their positions, lifetimes, and alpha values
const particles = [];

// Create gradients for the waves
const gradient1 = ctx1.createLinearGradient(0, height / 2, 0, height);
gradient1.addColorStop(0, 'rgba(1, 28, 148, 0.3)');  // Top color: rgb(1, 28, 148)
gradient1.addColorStop(1, 'rgba(0, 5, 54, 0.5)');   // Bottom color: rgb(0, 5, 54)

const gradient2 = ctx2.createLinearGradient(0, height / 2, 0, height);
gradient2.addColorStop(0, 'rgba(1, 28, 148, 0.3)');  // Top color with transparency: rgb(1, 28, 148)
gradient2.addColorStop(1, 'rgba(0, 5, 54, 0)');   // Bottom color with full transparency: rgb(0, 5, 54)


// Animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx1.clearRect(0, 0, width, height);
  ctx2.clearRect(0, 0, width, height);

  drawWave(ctx1, waveFrequency1, gradient1, performance.now()); /* Gradient with transparency */
  drawWave(ctx2, waveFrequency2, gradient2, performance.now()); /* Gradient with transparency */

  updateParticles();
  drawParticles(ctx1);
  drawParticles(ctx2);
}

// Draw waves
function drawWave(ctx, frequency, gradient, timestamp) {
  const opacity = Math.min((timestamp / 1000) * 1, 1); // Adjust the multiplier for faster fading
  ctx.globalAlpha = opacity; // Set global alpha for the wave

  ctx.beginPath();
  ctx.moveTo(0, height);
  for (let x = 0; x < width; x++) {
    const y = height / 2 + Math.sin(x * frequency + timestamp * waveSpeed) * waveAmplitude;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(width, height);
  ctx.closePath();

  // Fill wave with gradient color for smooth transitions
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.globalAlpha = 1; // Reset global alpha
}

// Update particles
function updateParticles() {
  // Update particle positions and lifetimes
  for (let i = 0; i < particles.length; i++) {
    particles[i].x += (Math.random() - 0.5) * particleSpeed;
    particles[i].y += (Math.random() - 0.5) * particleSpeed;
    particles[i].lifetime -= 1; // Decrease lifetime
    particles[i].alpha = particles[i].lifetime / particles[i].initialLifetime; // Update alpha value

    if (particles[i].lifetime <= 0) {
      particles.splice(i, 1); // Remove particle if its lifetime is over
    }
  }

  // Generate new particles
  if (particles.length < particleCount) {
    for (let i = 0; i < particleCount - particles.length; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        lifetime: Math.random() * (maxLifetime - minLifetime) + minLifetime, // Random lifetime within range
        initialLifetime: Math.random() * (maxLifetime - minLifetime) + minLifetime, // Initial lifetime for alpha calculation
        alpha: 1 // Start with full opacity
      });
    }
  }
}

// Draw particles
function drawParticles(ctx) {
  for (let i = 0; i < particles.length; i++) {
    const opacity = particles[i].alpha; // Use the alpha value directly for particles

    ctx.beginPath();
    ctx.arc(particles[i].x, particles[i].y, particleSize, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`; /* White particles with varying transparency */
    ctx.fill();
  }
}

// Start animation
animate();
