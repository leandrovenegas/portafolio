'use client';

import { useState, useEffect } from 'react';

const FRAMES = [
  "https://res.cloudinary.com/dx2rvpvwr/image/upload/v1778527527/02_ih0xah.png",
  "https://res.cloudinary.com/dx2rvpvwr/image/upload/v1778527527/04_rxnwhs.png",
  "https://res.cloudinary.com/dx2rvpvwr/image/upload/v1778527526/03_h6hswo.png",
  "https://res.cloudinary.com/dx2rvpvwr/image/upload/v1778527526/01_ybh0kn.png"
];

export default function Animacion({ 
  frameRate = 150, 
  className = "",
  width = "300px",
  height = "300px"
}) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % FRAMES.length);
    }, frameRate);

    return () => clearInterval(interval);
  }, [frameRate]);

  return (
    <div 
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <img 
        src={FRAMES[currentFrame]} 
        alt="Animación Secuencial" 
        className="w-full h-full object-contain transition-opacity duration-75"
      />
    </div>
  );
}
