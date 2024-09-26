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

// Wave properties - increased amplitude and adjusted speed for more dynamic waves
const waveSpeed = 0.0008; // Increase the speed for a more lively effect
const waveAmplitude = 140; // Increase amplitude to make waves taller and more pronounced
const waveFrequency1 = 0.0023; // Adjust frequency to create tighter waves
const waveFrequency2 = 0.0026; // Slightly different frequency for more complex movement

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
gradient1.addColorStop(0, 'rgba(1, 28, 148, 0.5)');  // Increase top color opacity for more visibility
gradient1.addColorStop(1, 'rgba(0, 5, 54, 0.7)');   // Increase bottom color opacity for richer color

const gradient2 = ctx2.createLinearGradient(0, height / 2, 0, height);
gradient2.addColorStop(0, 'rgba(1, 28, 148, 0.5)');  // Increase top color with transparency for visibility
gradient2.addColorStop(1, 'rgba(0, 5, 54, 0.3)');   // Reduce bottom color transparency slightly

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx1.clearRect(0, 0, width, height);
  ctx2.clearRect(0, 0, width, height);

  drawWave(ctx1, waveFrequency1, gradient1, performance.now());
  drawWave(ctx2, waveFrequency2, gradient2, performance.now());

  updateParticles();
  drawParticles(ctx1);
  drawParticles(ctx2);
}

// Draw waves
function drawWave(ctx, frequency, gradient, timestamp) {
  ctx.globalAlpha = 0.9; // Set global alpha for the wave to enhance visibility

  ctx.beginPath();
  ctx.moveTo(0, height);
  for (let x = 0; x < width; x++) {
    const y = height / 2 + Math.sin(x * frequency + timestamp * waveSpeed) * waveAmplitude;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(width, height);
  ctx.closePath();

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
        lifetime: Math.random() * (maxLifetime - minLifetime) + minLifetime,
        initialLifetime: Math.random() * (maxLifetime - minLifetime) + minLifetime,
        alpha: 1 // Start with full opacity
      });
    }
  }
}

// Draw particles
function drawParticles(ctx) {
  for (let i = 0; i < particles.length; i++) {
    const opacity = particles[i].alpha;

    ctx.beginPath();
    ctx.arc(particles[i].x, particles[i].y, particleSize, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.fill();
  }
}

// Start animation
animate();
