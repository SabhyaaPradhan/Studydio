"use client";

import { useEffect, useRef, useState } from "react";
import { GooeyFilter } from "./GooeyFilter";

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return mousePosition;
};

const PixelTrailClient = ({ trailSize = 15, maxAge = 1000, color = "#fff", gooeyFilter }) => {
    const mousePosition = useMousePosition();
    const [dots, setDots] = useState<{ x: number; y: number; time: number }[]>([]);
    const lastUpdateTime = useRef(0);
    const animationFrameId = useRef<number>();

    useEffect(() => {
        const updateDots = () => {
            const now = Date.now();

            if (now - lastUpdateTime.current > 16) { // ~60fps
                const newDot = { x: mousePosition.x, y: mousePosition.y, time: now };
                const updatedDots = [...dots, newDot].slice(-trailSize);
                const filteredDots = updatedDots.filter(dot => now - dot.time < maxAge);
                setDots(filteredDots);
                lastUpdateTime.current = now;
            }

            animationFrameId.current = requestAnimationFrame(updateDots);
        };

        animationFrameId.current = requestAnimationFrame(updateDots);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [mousePosition, dots, trailSize, maxAge]);

    return (
        <>
            {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    filter: gooeyFilter ? `url(#${gooeyFilter.id})` : 'none',
                    pointerEvents: 'none',
                }}
            >
                {dots.map((dot, index) => {
                    const age = Date.now() - dot.time;
                    const opacity = Math.max(0, 1 - age / maxAge);
                    const size = Math.max(0, 15 * (1 - age / maxAge));
                    return (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                left: `${dot.x}px`,
                                top: `${dot.y}px`,
                                width: `${size}px`,
                                height: `${size}px`,
                                background: color,
                                borderRadius: '50%',
                                transform: 'translate(-50%, -50%)',
                                opacity: opacity,
                                willChange: 'transform, opacity',
                            }}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default PixelTrailClient;
