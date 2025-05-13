'use client';

import { useRef } from 'react';

export function CardEffect() {
  const cardRef = useRef<HTMLDivElement>(null);

  return <div ref={cardRef} className="card-effect" />;
} 