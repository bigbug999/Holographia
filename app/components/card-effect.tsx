'use client';

import { useRef, useEffect } from 'react';

export function CardEffect() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (clientX: number, clientY: number) => {
      const rect = card.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      
      document.documentElement.style.setProperty('--pointer-x', `${x}%`);
      document.documentElement.style.setProperty('--pointer-y', `${y}%`);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    card.addEventListener('touchmove', handleTouchMove, { passive: false });
    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={cardRef} className="card-effect" />;
} 