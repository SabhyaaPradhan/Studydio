
'use client';
import React, { useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  tag = 'h2',
  scrollContainerRef,
  className = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="char" key={index} style={{ display: 'inline-block' }}>
        {char === ' ' ? ' ' : char}
      </span>
    ));
  }, [children]);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const charElements = el.querySelectorAll('.char');
      if (charElements.length === 0) return;

      gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%'
        },
        {
          duration: animationDuration,
          ease: ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: stagger,
          scrollTrigger: {
            trigger: el,
            scroller: scrollContainerRef?.current || window,
            start: scrollStart,
            toggleActions: "play none none none",
            once: true,
          }
        }
      );
    },
    { scope: containerRef, dependencies: [children] }
  );
  
  const Tag = tag;

  return (
    <Tag ref={containerRef} className={`scroll-float ${className}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </Tag>
  );
};

export default ScrollFloat;
