"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const PixelTrailClient = dynamic(() => import('./PixelTrailClient'), {
    ssr: false,
});


export default function GlobalPixelTrail() {
    const isMobile = useIsMobile();

    if (isMobile) {
        return null;
    }

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, pointerEvents: 'none' }}>
            <Suspense fallback={null}>
                <PixelTrailClient
                    trailSize={5}
                    maxAge={650}
                    color="#c59d0d"
                    gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
                />
            </Suspense>
        </div>
    );
}
