import React, { useEffect, useRef } from 'react';

const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const stars: Array<{ x: number; y: number; size: number; opacity: number; speed: number }> = [];
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Update opacity for twinkling effect
        star.opacity += star.speed;
        if (star.opacity > 1) star.opacity = 0.2;

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-green-900" />
      
      {/* Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Overlay for better text visibility */}
      <div className="fixed inset-0 bg-black bg-opacity-20" />
    </>
  );
};

export default StarfieldBackground;