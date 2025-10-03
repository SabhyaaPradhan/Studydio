"use client";
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import './PixelTrail.css';

const GooeyFilter = ({ id = 'goo-filter', strength = 10 }) => {
  return (
    <svg className="goo-filter-container">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

export type PixelTrailProps = {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  color?: string;
  gooeyFilter?: { id: string; strength: number };
  className?: string;
};

type Dot = {
  id: number;
  x: number;
  y: number;
};

export default function PixelTrail({
  gridSize = 40,
  trailSize = 1,
  maxAge = 250,
  color = '#ffffff',
  gooeyFilter,
  className = ''
}: PixelTrailProps) {
  const [dots, setDots] = useState<Dot[]>([]);
  const lastPosition = useRef<{ x: number; y: number } | null>(null);
  const nextId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const gridX = Math.round(e.clientX / gridSize) * gridSize;
    const gridY = Math.round(e.clientY / gridSize) * gridSize;

    if (
      !lastPosition.current ||
      lastPosition.current.x !== gridX ||
      lastPosition.current.y !== gridY
    ) {
      const newDot = { id: nextId.current++, x: gridX, y: gridY };
      setDots(prevDots => [...prevDots, newDot]);
      lastPosition.current = { x: gridX, y: gridY };

      setTimeout(() => {
        setDots(prevDots => prevDots.filter(dot => dot.id !== newDot.id));
      }, maxAge);
    }
  }, [gridSize, maxAge]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);
  
  const pixelSize = gridSize * trailSize;

  return (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <div 
        ref={containerRef}
        className={cn("pixel-trail-container", className)}
        style={gooeyFilter ? { filter: `url(#${gooeyFilter.id})` } : {}}
      >
        {dots.map(dot => (
          <div
            key={dot.id}
            className="pixel-dot"
            style={{
              left: `${dot.x - pixelSize / 2}px`,
              top: `${dot.y - pixelSize / 2}px`,
              width: `${pixelSize}px`,
              height: `${pixelSize}px`,
              backgroundColor: color,
              '--max-age': `${maxAge}ms`
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}