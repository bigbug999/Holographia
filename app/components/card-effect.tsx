'use client';

import { useEffect, useRef } from 'react';

export function CardEffect() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      console.log('Pointer position:', { x, y });
      card.style.setProperty('--pointer-x', `${x}%`);
      card.style.setProperty('--pointer-y', `${y}%`);
      
      // Log the computed style to verify the variables are set
      console.log('CSS Variables:', {
        x: getComputedStyle(card).getPropertyValue('--pointer-x'),
        y: getComputedStyle(card).getPropertyValue('--pointer-y')
      });
    };

    const handlePointerLeave = () => {
      console.log('Pointer left');
      card.style.setProperty('--pointer-x', '50%');
      card.style.setProperty('--pointer-y', '50%');
    };

    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return <div ref={cardRef} className="card-effect" />;
} 