"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import PixelTrail from "./PixelTrail";
import { Suspense } from "react";

export default function GlobalPixelTrail() {
    const isMobile = useIsMobile();

    if (isMobile) {
        return null;
    }

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, pointerEvents: 'none' }}>
            <Suspense fallback={null}>
                <PixelTrail
                    gridSize={50}
                    trailSize={0.1}
                    maxAge={250}
                    interpolate={5}
                    color="#fff"
                    gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
                />
            </Suspense>
        </div>
    );
}
