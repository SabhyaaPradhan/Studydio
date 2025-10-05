
"use client";

import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';
import ScrollFloat from './ScrollFloat';
import ScrollReveal from './ScrollReveal';
import Script from 'next/script';
import { useIsMobile } from "@/hooks/use-mobile";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '120, 100%, 50%';

const cardData = [
  {
    color: 'rgb(21 128 61)',
    title: '🎓 Students',
    description: 'Master concepts faster with auto-generated notes.',
    label: 'Who It’s For'
  },
  {
    color: 'rgb(21 128 61)',
    title: '🧑‍🏫 Teachers',
    description: 'Create quizzes instantly from your lessons.',
    label: 'Who It’s For'
  },
  {
    color: 'rgb(21 128 61)',
    title: '📚 Lifelong Learners',
    description: 'Absorb knowledge efficiently from any source.',
    label: 'Who It’s For'
  },
  {
    color: '#0c0a09',
    title: 'Save Hours',
    description: 'Turn long videos into quick study sets.',
    label: 'Benefits'
  },
  {
    color: '#0c0a09',
    title: 'Learn Smarter',
    description: 'Personalized flashcards built for your weak points.',
    label: 'Benefits'
  },
  {
    color: '#0c0a09',
    title: 'Retain Better',
    description: 'Built-in spaced repetition helps memory stick.',
    label: 'Benefits'
  }
];

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: hsla(${color}, 1);
    box-shadow: 0 0 6px hsla(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = radius => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = e => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = e => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, hsla(${glowColor}, 0.4) 0%, hsla(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        hsla(${glowColor}, 0.15) 0%,
        hsla(${glowColor}, 0.08) 15%,
        hsla(${glowColor}, 0.04) 25%,
        hsla(${glowColor}, 0.02) 40%,
        hsla(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = e => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.magic-bento-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          card.style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach(card => {
        card.style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid = ({ children, gridRef }) => (
  <div className="card-grid bento-section" ref={gridRef}>
    {children}
  </div>
);

const WhyChooseUs = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef(null);
  const isMobile = useIsMobile();
  const shouldDisableAnimations = disableAnimations || isMobile;

  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);
  const [threeLoaded, setThreeLoaded] = useState(false);

  useEffect(() => {
    if (threeLoaded && (window as any).VANTA) {
      if (!vantaEffect && !isMobile) {
        const vantaInstance = (window as any).VANTA.GLOBE({
          el: vantaRef.current,
          THREE: (window as any).THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x26cf80,
          backgroundColor: 0x0,
        });
        setVantaEffect(vantaInstance);
      } else if (vantaEffect && isMobile) {
        (vantaEffect as any).destroy();
        setVantaEffect(null);
      }
    }
    
    return () => {
      if (vantaEffect) {
        (vantaEffect as any).destroy();
        setVantaEffect(null);
      }
    };
  }, [threeLoaded, vantaEffect, isMobile]);


  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onLoad={() => setThreeLoaded(true)}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"
        strategy="afterInteractive"
      />
      <section id="why-choose-us" className="w-full py-12 md:py-12 bg-black magic-bento-section relative" ref={vantaRef}>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center">
            <ScrollFloat tag="h2" className="text-[100px] md:text-[300px] font-blackheat text-center text-white" scrollStart="top 80%">
              Why Choose Us
            </ScrollFloat>
            <ScrollReveal
              tag="div"
              textTag="p"
              className="max-w-2xl mx-auto md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed pb-6 text-center"
              textClassName="!text-xl !font-normal !text-muted-foreground"
            >
              AI that adapts to the way you learn — faster, smarter, and personalized.
            </ScrollReveal>
          </div>
          {enableSpotlight && (
            <GlobalSpotlight
              gridRef={gridRef}
              disableAnimations={shouldDisableAnimations}
              enabled={enableSpotlight}
              spotlightRadius={spotlightRadius}
              glowColor={glowColor}
            />
          )}

          <BentoCardGrid gridRef={gridRef}>
            {cardData.map((card, index) => {
              const isWhoFor = card.label === 'Who It’s For';
              const baseClassName = `magic-bento-card ${textAutoHide ? 'card--text-autohide' : ''} ${enableBorderGlow ? 'card--border-glow' : ''}`;
              const cardProps = {
                className: `${baseClassName} ${isWhoFor ? 'card--who-its-for' : ''}`,
                style: {
                  ...(!isWhoFor && { backgroundColor: card.color }),
                  '--glow-color': glowColor
                }
              };

              if (enableStars) {
                return (
                  <ParticleCard
                    key={index}
                    {...cardProps}
                    disableAnimations={shouldDisableAnimations}
                    particleCount={particleCount}
                    glowColor={isWhoFor ? '0, 0%, 0%' : glowColor}
                    enableTilt={enableTilt}
                    clickEffect={clickEffect}
                    enableMagnetism={enableMagnetism}
                  >
                    <div className="card__header">
                      <div className="card__label">{card.label}</div>
                    </div>
                    <div className="card__content">
                      <h2 className="card__title">{card.title}</h2>
                      <p className="card__description">{card.description}</p>
                    </div>
                  </ParticleCard>
                );
              }

              return (
                <div
                  key={index}
                  {...cardProps}
                  ref={el => {
                    if (!el) return;

                    const handleMouseMove = e => {
                      if (shouldDisableAnimations) return;

                      const rect = el.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;

                      if (enableTilt) {
                        const rotateX = ((y - centerY) / centerY) * -10;
                        const rotateY = ((x - centerX) / centerX) * 10;
                        gsap.to(el, {
                          rotateX,
                          rotateY,
                          duration: 0.1,
                          ease: 'power2.out',
                          transformPerspective: 1000
                        });
                      }

                      if (enableMagnetism) {
                        const magnetX = (x - centerX) * 0.05;
                        const magnetY = (y - centerY) * 0.05;
                        gsap.to(el, {
                          x: magnetX,
                          y: magnetY,
                          duration: 0.3,
                          ease: 'power2.out'
                        });
                      }
                    };

                    const handleMouseLeave = () => {
                      if (shouldDisableAnimations) return;

                      if (enableTilt) {
                        gsap.to(el, {
                          rotateX: 0,
                          rotateY: 0,
                          duration: 0.3,
                          ease: 'power2.out'
                        });
                      }

                      if (enableMagnetism) {
                        gsap.to(el, {
                          x: 0,
                          y: 0,
                          duration: 0.3,
                          ease: 'power2.out'
                        });
                      }
                    };

                    const handleClick = e => {
                      if (!clickEffect || shouldDisableAnimations) return;

                      const rect = el.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;

                      const maxDistance = Math.max(
                        Math.hypot(x, y),
                        Math.hypot(x - rect.width, y),
                        Math.hypot(x, y - rect.height),
                        Math.hypot(x - rect.width, y - rect.height)
                      );

                      const ripple = document.createElement('div');
                      ripple.style.cssText = `
                    position: absolute;
                    width: ${maxDistance * 2}px;
                    height: ${maxDistance * 2}px;
                    border-radius: 50%;
                    background: radial-gradient(circle, hsla(${glowColor}, 0.4) 0%, hsla(${glowColor}, 0.2) 30%, transparent 70%);
                    left: ${x - maxDistance}px;
                    top: ${y - maxDistance}px;
                    pointer-events: none;
                    z-index: 1000;
                  `;

                      el.appendChild(ripple);

                      gsap.fromTo(
                        ripple,
                        {
                          scale: 0,
                          opacity: 1
                        },
                        {
                          scale: 1,
                          opacity: 0,
                          duration: 0.8,
                          ease: 'power2.out',
                          onComplete: () => ripple.remove()
                        }
                      );
                    };

                    el.addEventListener('mousemove', handleMouseMove);
                    el.addEventListener('mouseleave', handleMouseLeave);
                    el.addEventListener('click', handleClick);
                  }}
                >
                  <div className="card__header">
                    <div className="card__label">{card.label}</div>
                  </div>
                  <div className="card__content">
                    <h2 className="card__title">{card.title}</h2>
                    <p className="card__description">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </BentoCardGrid>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;

    
