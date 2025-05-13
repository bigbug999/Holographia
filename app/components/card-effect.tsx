'use client';

import { useRef, useEffect } from 'react';

export function CardEffect() {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let isAnimating = true;
    let lastX = 50;
    let lastY = 50;

    const updatePosition = (x: number, y: number) => {
      document.documentElement.style.setProperty('--pointer-x', `${x}%`);
      document.documentElement.style.setProperty('--pointer-y', `${y}%`);
      lastX = x;
      lastY = y;
    };

    const animate = () => {
      if (!isAnimating) return;

      const now = Date.now();
      const x = 50 + Math.sin(now * 0.001) * 10;
      const y = 50 + Math.cos(now * 0.0008) * 10;
      
      updatePosition(x, y);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleInteraction = (clientX: number, clientY: number) => {
      const rect = card.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      updatePosition(x, y);
    };

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleInteraction(touch.clientX, touch.clientY);
    };

    const handleMouse = (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY);
    };

    const startAnimation = () => {
      isAnimating = true;
      animate();
    };

    const stopAnimation = () => {
      isAnimating = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    // Initial position
    updatePosition(50, 50);

    // Start animation
    startAnimation();

    // Add event listeners
    card.addEventListener('touchstart', handleTouch, { passive: true });
    card.addEventListener('touchmove', handleTouch, { passive: true });
    card.addEventListener('mousemove', handleMouse);

    // Cleanup
    return () => {
      stopAnimation();
      card.removeEventListener('touchstart', handleTouch);
      card.removeEventListener('touchmove', handleTouch);
      card.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <div ref={cardRef} className="card-effect" />;
} 