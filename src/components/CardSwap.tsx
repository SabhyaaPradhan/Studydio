
'use client';

import React, { Children, cloneElement, forwardRef, isValidElement, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useInView } from 'framer-motion';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }: any, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});
const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 300,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );
  
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '100px' });
  
  useGSAP(() => {
    if(!containerRef.current) return;
    
    const order = Array.from({ length: childArr.length }, (_, i) => i);
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const masterTl = gsap.timeline({
      repeat: -1,
      repeatDelay: delay / 1000,
      paused: true, // Start paused
    });
    
    const createSwapAnimation = () => {
        if (order.length < 2) return null;

        const [front, ...rest] = order;
        const elFront = refs[front].current;
        const tl = gsap.timeline();

        tl.to(elFront, {
            y: '+=500',
            duration: config.durDrop,
            ease: config.ease
        }, 0);

        rest.forEach((idx, i) => {
            const el = refs[idx].current;
            const slot = makeSlot(i, cardDistance, verticalDistance, total);
            tl.set(el, { zIndex: slot.zIndex }, config.durDrop * (1 - config.promoteOverlap));
            tl.to(
            el,
            {
                x: slot.x,
                y: slot.y,
                z: slot.z,
                duration: config.durMove,
                ease: config.ease
            },
            config.durDrop * (1 - config.promoteOverlap) + i * 0.15
            );
        });

        const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
        tl.set(elFront, { zIndex: backSlot.zIndex }, config.durDrop * (1 - config.promoteOverlap) + config.durMove * config.returnDelay);
        tl.to(
            elFront,
            {
                x: backSlot.x,
                y: backSlot.y,
                z: backSlot.z,
                duration: config.durReturn,
                ease: config.ease
            },
            config.durDrop * (1 - config.promoteOverlap) + config.durMove * config.returnDelay
        );
        
        order.push(order.shift()!);
        return tl;
    }

    for (let i = 0; i < total; i++) {
      const anim = createSwapAnimation();
      if(anim) masterTl.add(anim);
    }

    // Control animation based on view
    if (isInView) {
      masterTl.play();
    } else {
      masterTl.pause();
    }
    
    if (pauseOnHover) {
        const node = containerRef.current;
        const pause = () => masterTl.pause();
        const resume = () => { if (isInView) masterTl.resume(); };
        node.addEventListener('mouseenter', pause);
        node.addEventListener('mouseleave', resume);
        return () => {
            node.removeEventListener('mouseenter', pause);
            node.removeEventListener('mouseleave', resume);
            masterTl.kill();
        };
    }
    
    return () => {
        masterTl.kill();
    }

  }, { scope: containerRef, dependencies: [childArr, cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, config, refs, isInView] });

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e: React.MouseEvent) => {
            if(child.props.onClick) child.props.onClick(e);
            if(onCardClick) onCardClick(i);
          }
        })
      : child
  );

  return (
    <div ref={containerRef} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
