'use client';

import React, { useRef, useEffect } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  MotionStyle,
  SpringOptions,
} from 'motion/react';

export type TiltProps = {
  children: React.ReactNode;
  className?: string;
  style?: MotionStyle;
  rotationFactor?: number;
  isRevese?: boolean;
  springOptions?: SpringOptions;
};

export function Tilt({
  children,
  className,
  style,
  rotationFactor = 15,
  isRevese = false,
  springOptions,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const bgX = useMotionValue(50);
  const bgY = useMotionValue(50);

  const xSpring = useSpring(x, springOptions);
  const ySpring = useSpring(y, springOptions);
  const bgXSpring = useSpring(bgX, springOptions);
  const bgYSpring = useSpring(bgY, springOptions);

  const rotateX = useTransform(
    ySpring,
    [-0.5, 0.5],
    isRevese
      ? [rotationFactor, -rotationFactor]
      : [-rotationFactor, rotationFactor]
  );
  const rotateY = useTransform(
    xSpring,
    [-0.5, 0.5],
    isRevese
      ? [-rotationFactor, rotationFactor]
      : [rotationFactor, -rotationFactor]
  );

  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // Update CSS variables when spring values change
  useEffect(() => {
    const unsubscribeX = bgXSpring.on('change', (latest) => {
      if (ref.current) {
        ref.current.style.setProperty('--pointer-x', `${latest}%`);
        ref.current.style.setProperty('--posx', `${latest}%`);
      }
    });

    const unsubscribeY = bgYSpring.on('change', (latest) => {
      if (ref.current) {
        ref.current.style.setProperty('--pointer-y', `${latest}%`);
        ref.current.style.setProperty('--posy', `${latest}%`);
      }
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [bgXSpring, bgYSpring]);

  const updatePosition = (clientX: number, clientY: number) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    const xPos = mouseX / width - 0.5;
    const yPos = mouseY / height - 0.5;

    x.set(xPos);
    y.set(yPos);

    // Update background position
    const newBgX = ((mouseX / width) * 100);
    const newBgY = ((mouseY / height) * 100);
    bgX.set(newBgX);
    bgY.set(newBgY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    bgX.set(50);
    bgY.set(50);
  };

  const handleTouchEnd = () => {
    x.set(0);
    y.set(0);
    bgX.set(50);
    bgY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
        transform,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </motion.div>
  );
}
