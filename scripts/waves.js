const canvas1 = document.getElementById('waveCanvas1');
const canvas2 = document.getElementById('waveCanvas2');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

let waveGradientColorTop;
let waveGradientColorBottom;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'second') {
    document.documentElement.classList.add('second-theme');
    waveGradientColorTop = 'rgba(251, 63, 64, 0.35)';
    waveGradientColorBottom = 'rgba(148, 1, 21, 0.25)';
} else if (savedTheme === 'third') {
    document.documentElement.classList.add('third-theme');
    waveGradientColorTop = 'rgba(56, 239, 125, 0.35)';
    waveGradientColorBottom = 'rgba(11, 153, 90, 0.25)';
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

function createGradients() {
    const gradient1 = ctx1.createLinearGradient(0, canvas1.height * 0.8, 0, canvas1.height);
    gradient1.addColorStop(0, waveGradientColorTop);
    gradient1.addColorStop(1, waveGradientColorBottom);

    const gradient2 = ctx2.createLinearGradient(0, canvas2.height * 0.8, 0, canvas2.height);
    gradient2.addColorStop(0, waveGradientColorTop);
    gradient2.addColorStop(1, waveGradientColorBottom);

    return { gradient1, gradient2 };
}

function drawWave(ctx, frequency, gradient, timestamp) {
    const waveAmplitude = window.innerHeight * 0.1;
    const yOffset = canvas1.height * 0.8;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(0, canvas1.height);
    for (let x = 0; x < canvas1.width; x++) {
        const y = yOffset + Math.sin(x * frequency + timestamp * 0.0008) * waveAmplitude;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas1.width, canvas1.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.globalAlpha = 1;
}

function animate() {
    const { gradient1, gradient2 } = createGradients();
    requestAnimationFrame(animate);
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    drawWave(ctx1, 0.0023, gradient1, performance.now());
    drawWave(ctx2, 0.0026, gradient2, performance.now());
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);
animate();
