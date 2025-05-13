'use client';

import { useEffect, useRef } from 'react';

export function CardEffect() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Get the parent element that contains both card-front and card-effect
    const parent = card.parentElement;
    if (!parent) return;

    const updatePosition = (clientX: number, clientY: number) => {
      const rect = parent.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      
      parent.style.setProperty('--pointer-x', `${x}%`);
      parent.style.setProperty('--pointer-y', `${y}%`);
      parent.style.setProperty('--posx', `${x}%`);
      parent.style.setProperty('--posy', `${y}%`);
    };

    const handlePointerMove = (e: PointerEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent scrolling while touching
      const touch = e.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    const handlePointerLeave = () => {
      parent.style.setProperty('--pointer-x', '50%');
      parent.style.setProperty('--pointer-y', '50%');
      parent.style.setProperty('--posx', '50%');
      parent.style.setProperty('--posy', '50%');
    };

    const handleTouchEnd = () => {
      parent.style.setProperty('--pointer-x', '50%');
      parent.style.setProperty('--pointer-y', '50%');
      parent.style.setProperty('--posx', '50%');
      parent.style.setProperty('--posy', '50%');
    };

    parent.addEventListener('pointermove', handlePointerMove);
    parent.addEventListener('pointerleave', handlePointerLeave);
    parent.addEventListener('touchmove', handleTouchMove, { passive: false });
    parent.addEventListener('touchend', handleTouchEnd);

    return () => {
      parent.removeEventListener('pointermove', handlePointerMove);
      parent.removeEventListener('pointerleave', handlePointerLeave);
      parent.removeEventListener('touchmove', handleTouchMove);
      parent.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return <div ref={cardRef} className="card-effect" />;
} 