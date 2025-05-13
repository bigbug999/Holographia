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

    const handlePointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      parent.style.setProperty('--pointer-x', `${x}%`);
      parent.style.setProperty('--pointer-y', `${y}%`);
      parent.style.setProperty('--posx', `${x}%`);
      parent.style.setProperty('--posy', `${y}%`);
    };

    const handlePointerLeave = () => {
      parent.style.setProperty('--pointer-x', '50%');
      parent.style.setProperty('--pointer-y', '50%');
      parent.style.setProperty('--posx', '50%');
      parent.style.setProperty('--posy', '50%');
    };

    parent.addEventListener('pointermove', handlePointerMove);
    parent.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      parent.removeEventListener('pointermove', handlePointerMove);
      parent.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return <div ref={cardRef} className="card-effect" />;
} 