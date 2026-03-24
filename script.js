// Floating Hearts Animation
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let hearts = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Heart {
  constructor() {
    this.x = Math.random() * width;
    this.y = height + Math.random() * 200;
    this.size = Math.random() * 20 + 10;
    this.speed = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '#ff4d6d' : '#ff758f';
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.02 + 0.01;
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    
    // Draw heart path
    let topCurveHeight = this.size * 0.3;
    ctx.moveTo(this.x, this.y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(
      this.x, this.y, 
      this.x - this.size / 2, this.y, 
      this.x - this.size / 2, this.y + topCurveHeight
    );
    // bottom left curve
    ctx.bezierCurveTo(
      this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
      this.x, this.y + (this.size + topCurveHeight) / 1.5, 
      this.x, this.y + this.size
    );
    // bottom right curve
    ctx.bezierCurveTo(
      this.x, this.y + (this.size + topCurveHeight) / 1.5, 
      this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
      this.x + this.size / 2, this.y + topCurveHeight
    );
    // top right curve
    ctx.bezierCurveTo(
      this.x + this.size / 2, this.y, 
      this.x, this.y, 
      this.x, this.y + topCurveHeight
    );
    
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;
  }

  update() {
    this.y -= this.speed;
    this.wobble += this.wobbleSpeed;
    this.x += Math.sin(this.wobble) * 1;

    if (this.y < -this.size) {
      this.y = height + this.size;
      this.x = Math.random() * width;
    }
  }
}

// Initialize hearts
for (let i = 0; i < 40; i++) {
  hearts.push(new Heart());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  hearts.forEach(heart => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animate);
}

animate();

// Smooth scroll to section
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth'
  });
}

// Reveal animations on scroll
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", reveal);
// Trigger once on load
setTimeout(reveal, 500);
