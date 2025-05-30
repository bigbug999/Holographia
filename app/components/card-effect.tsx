'use client';

import { useRef, useEffect } from 'react';

export function CardEffect() {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Set initial values
    document.documentElement.style.setProperty('--pointer-x', '50%');
    document.documentElement.style.setProperty('--pointer-y', '50%');

    const handleMove = (clientX: number, clientY: number) => {
      const rect = card.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      
      document.documentElement.style.setProperty('--pointer-x', `${x}%`);
      document.documentElement.style.setProperty('--pointer-y', `${y}%`);
    };

    const animate = (timestamp: number) => {
      if (!timeRef.current) timeRef.current = timestamp;
      const progress = timestamp - timeRef.current;
      
      // Create a smooth ease-in-out floating effect
      const x = 50 + Math.sin(progress * 0.0005) * 10;
      const y = 50 + Math.cos(progress * 0.0004) * 10;
      
      document.documentElement.style.setProperty('--pointer-x', `${x}%`);
      document.documentElement.style.setProperty('--pointer-y', `${y}%`);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    // Start the continuous animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Add interaction listeners
    card.addEventListener('touchstart', handleTouchStart, { passive: false });
    card.addEventListener('touchmove', handleTouchMove, { passive: false });
    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={cardRef} className="card-effect" />;
} 