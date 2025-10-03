'use client';
import { useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  tag = 'div',
  textTag = 'p',
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0,
  baseRotation = 3,
  blurStrength = 10,
  className = '',
  textClassName = '',
  wordAnimationEnd = 'bottom center'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index} style={{display: 'inline-block'}}>
          {word}
        </span>
      );
    });
  }, [children]);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const wordElements = Array.from(el.querySelectorAll('.word'));
    if(wordElements.length === 0) return;
    
    gsap.fromTo(
        wordElements,
        { 
        opacity: baseOpacity, 
        willChange: 'opacity, transform, filter',
        y: 30,
        filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
        },
        {
        ease: "power2.out",
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.08,
        scrollTrigger: {
            trigger: el,
            scroller: scrollContainerRef?.current || window,
            start: 'top bottom-=15%',
            toggleActions: "play none none none",
        }
        }
    );

  }, { scope: containerRef, dependencies: [children] });

  const ContainerTag = tag;
  const TextTag = textTag;

  return (
    <ContainerTag ref={containerRef} className={`scroll-reveal ${className}`}>
      <TextTag className={`scroll-reveal-text ${textClassName}`}>{splitText}</TextTag>
    </ContainerTag>
  );
};

export default ScrollReveal;
