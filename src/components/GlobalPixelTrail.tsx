"use client";

import { useEffect, useState } from 'react';
import PixelTrail from './PixelTrail';

const GlobalPixelTrail = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <PixelTrail /> : null;
};

export default GlobalPixelTrail;
