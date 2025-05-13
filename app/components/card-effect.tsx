'use client';

import { useRef, useEffect } from 'react';

export function CardEffect() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleInteraction = (clientX: number, clientY: number) => {
      const rect = card.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      
      document.documentElement.style.setProperty('--pointer-x', `${x}%`);
      document.documentElement.style.setProperty('--pointer-y', `${y}%`);
    };

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleInteraction(touch.clientX, touch.clientY);
    };

    const handleMouse = (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY);
    };

    // Add event listeners
    card.addEventListener('touchmove', handleTouch, { passive: true });
    card.addEventListener('mousemove', handleMouse);

    // Cleanup
    return () => {
      card.removeEventListener('touchmove', handleTouch);
      card.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <div ref={cardRef} className="card-effect" />;
} 