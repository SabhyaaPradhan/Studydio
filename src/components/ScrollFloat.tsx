
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
  
  const Tag = tag;

  return (
    <Tag ref={containerRef} className={`scroll-float ${className}`}>
      <span className={`scroll-float-text ${textClassName}`}>{children}</span>
    </Tag>
  );
};

export default ScrollFloat;
