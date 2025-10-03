"use client";

import React from 'react';

export const GooeyFilter = ({ id = "goo-filter", strength = 2 }) => {
    return (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
                <filter id={id}>
                    <feGaussianBlur in="SourceGraphic" stdDeviation={strength * 2.5} result="blur" />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                        result="goo"
                    />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
            </defs>
        </svg>
    );
};
