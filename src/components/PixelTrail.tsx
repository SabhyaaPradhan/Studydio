'use client';
import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import './PixelTrail.css';

const PixelTrail = ({ interval = 40, duration = 0.7, ease = 'power2.out' }) => {
  const lastTimeRef = useRef(0);

  const createDot = useCallback((x, y) => {
    const dot = document.createElement('div');
    dot.className = 'pixel-trail-dot';
    document.body.appendChild(dot);

    gsap.set(dot, { x: x - 4, y: y - 4 });

    gsap.to(dot, {
      opacity: 0,
      scale: 0,
      duration: duration,
      ease: ease,
      onComplete: () => {
        dot.remove();
      }
    });
  }, [duration, ease]);

  const handleMouseMove = useCallback((e) => {
    const now = Date.now();
    if (now - lastTimeRef.current > interval) {
      createDot(e.clientX, e.clientY);
      lastTimeRef.current = now;
    }
  }, [interval, createDot]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return null;
};

export default PixelTrail;
