'use client';
import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  blurStrength = 8,
  className = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    
    gsap.context(() => {
        gsap.fromTo(
          el,
          { transformOrigin: '0% 50%', rotate: baseRotation },
          {
            ease: 'none',
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom',
              end: rotationEnd,
              scrub: true
            }
          }
        );

        const wordElements = el.querySelectorAll('.word');

        gsap.fromTo(
          wordElements,
          { 
            opacity: baseOpacity, 
            willChange: 'opacity, transform, filter',
            y: 20,
            filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
          },
          {
            ease: "power2.out",
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom-=20%',
              end: wordAnimationEnd,
              scrub: true
            }
          }
        );

    }, containerRef);


    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, children]);

  const ContainerTag = tag;
  const TextTag = textTag;

  return (
    <ContainerTag ref={containerRef} className={`scroll-reveal ${className}`}>
      <TextTag className={`scroll-reveal-text ${textClassName}`}>{splitText}</TextTag>
    </ContainerTag>
  );
};

export default ScrollReveal;
