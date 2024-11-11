const mobileCanvas1 = document.getElementById('waveCanvas1');
const mobileCanvas2 = document.getElementById('waveCanvas2');
const mobileCtx1 = mobileCanvas1.getContext('2d');
const mobileCtx2 = mobileCanvas2.getContext('2d');

let showMobileWaves = true;
let showMobileParticles = true;

function setMobileCanvasSize() {
  const ratio = window.devicePixelRatio || 1;
  
  mobileCanvas1.width = window.innerWidth * ratio;
  mobileCanvas1.height = window.innerHeight * ratio;
  mobileCanvas2.width = window.innerWidth * ratio;
  mobileCanvas2.height = window.innerHeight * ratio;

  mobileCtx1.scale(ratio, ratio);
  mobileCtx2.scale(ratio, ratio);
}

setMobileCanvasSize();
window.addEventListener('resize', setMobileCanvasSize);

function mobileAnimate() {
  mobileCtx1.clearRect(0, 0, mobileCanvas1.width, mobileCanvas1.height);
  mobileCtx2.clearRect(0, 0, mobileCanvas2.width, mobileCanvas2.height);

  if (showMobileWaves) drawMobileWave(mobileCtx1, performance.now());
  if (showMobileParticles) drawMobileParticles(mobileCtx1);

  requestAnimationFrame(mobileAnimate);
}

function drawMobileWave(ctx, timestamp) {
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  
  const waveAmplitude = 50; 
  const yOffset = mobileCanvas1.height * 0.85;

  ctx.moveTo(0, mobileCanvas1.height);
  for (let x = 0; x < mobileCanvas1.width; x++) {
    const y = yOffset + Math.sin(x * 0.002 + timestamp * 0.0008) * waveAmplitude;
    ctx.lineTo(x, y);
  }

  ctx.lineTo(mobileCanvas1.width, mobileCanvas1.height);
  ctx.closePath();
  ctx.fillStyle = 'rgba(0, 100, 255, 0.5)';
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawMobileParticles(ctx) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.beginPath();
  ctx.arc(50, 50, 10, 0, Math.PI * 2); 
  ctx.fill();
}

mobileAnimate();
