'use client';

import { useRef, useEffect } from 'react';

export function CardEffect() {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    console.log('CardEffect mounted');

    // Set initial values
    document.documentElement.style.setProperty('--effect-x', '50%');
    document.documentElement.style.setProperty('--effect-y', '50%');

    const handleMove = (clientX: number, clientY: number) => {
      const rect = card.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      
      document.documentElement.style.setProperty('--effect-x', `${x}%`);
      document.documentElement.style.setProperty('--effect-y', `${y}%`);
    };

    const animate = (timestamp: number) => {
      if (!timeRef.current) {
        timeRef.current = timestamp;
        console.log('Animation started');
      }
      
      const progress = timestamp - timeRef.current;
      const x = 50 + Math.sin(progress * 0.001) * 10;
      const y = 50 + Math.cos(progress * 0.0008) * 10;
      
      document.documentElement.style.setProperty('--effect-x', `${x}%`);
      document.documentElement.style.setProperty('--effect-y', `${y}%`);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleTouchStart = (e: TouchEvent) => {
      console.log('Touch start');
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    // Start the continuous animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Add interaction listeners
    card.addEventListener('touchstart', handleTouchStart, { passive: true });
    card.addEventListener('touchmove', handleTouchMove, { passive: true });
    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      console.log('CardEffect cleanup');
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