import React, { useEffect, useRef } from 'react';

const AntigravityBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    const numParticles = 1000; // Adjust for density
    let animationFrameId;
    
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    
    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(randomAge = false) {
        // Bias spawning slightly towards the left and top
        this.x = Math.pow(Math.random(), 1.2) * width;
        this.y = Math.pow(Math.random(), 1.2) * height;
        this.vx = 0;
        this.vy = 0;
        this.speed = Math.random() * 1.5 + 0.5;
        this.length = Math.random() * 15 + 10; 
        this.age = randomAge ? Math.random() * 100 : 0;
        this.maxAge = Math.random() * 100 + 60;
      }

      update(time) {
        const scale = 0.0015;
        
        // Simulating flow field noise with math functions
        let angle = Math.sin(this.x * scale) * Math.cos(this.y * scale) * Math.PI * 2 
                  + Math.sin(time * 0.0003 + this.x * scale) * Math.PI;
        
        this.vx += Math.cos(angle) * 0.1;
        this.vy += Math.sin(angle) * 0.1;
        
        this.vx *= 0.92;
        this.vy *= 0.92;
        
        this.x += this.vx * this.speed;
        this.y += this.vy * this.speed;
        
        this.age++;
        if (this.age > this.maxAge || this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) {
          this.reset();
        }
      }

      draw(ctx) {
        const t = Math.max(0, Math.min(1, this.x / width));
        
        // Gradient: Dark Forest Green (left) to Vibrant Lime (right)
        const r = Math.floor(51 * (1 - t) + 212 * t);
        const g = Math.floor(85 * (1 - t) + 241 * t);
        const b = Math.floor(72 * (1 - t) + 52 * t);
        
        let alpha = 1;
        const fadeLimit = 15;
        if (this.age < fadeLimit) {
            alpha = this.age / fadeLimit;
        } else if (this.age > this.maxAge - fadeLimit) {
            alpha = (this.maxAge - this.age) / fadeLimit;
        }
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * (this.length * 0.3), this.y - this.vy * (this.length * 0.3));
        
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.7})`;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }
    
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
    
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      time += 16;
      for (let p of particles) {
        p.update(time);
        p.draw(ctx);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-40"
    />
  );
};

export default AntigravityBackground;
