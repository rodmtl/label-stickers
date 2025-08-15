'use client';

import React, { useEffect, useRef, useState } from 'react';
import { StickerData } from '@/types';

interface StickerProps {
  data: StickerData;
  width: number; // en pixels
  height: number; // en pixels
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const Sticker: React.FC<StickerProps> = ({
  data,
  width,
  height,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [adjustedFontSize, setAdjustedFontSize] = useState(data.fontSize);

  useEffect(() => {
    const adjustTextSize = () => {
      if (!textRef.current || !data.name) return;

      const textElement = textRef.current;
      const maxWidth = width * 0.85; // 85% de la largeur pour la marge
      const maxHeight = height * 0.4; // 40% de la hauteur pour le texte

      let fontSize = data.fontSize;
      textElement.style.fontSize = `${fontSize}px`;

      // Réduire la taille jusqu'à ce que le texte rentre
      while (
        (textElement.scrollWidth > maxWidth || textElement.scrollHeight > maxHeight) &&
        fontSize > 8
      ) {
        fontSize -= 1;
        textElement.style.fontSize = `${fontSize}px`;
      }

      setAdjustedFontSize(fontSize);
    };

    adjustTextSize();
  }, [data.name, data.fontSize, width, height]);

  return (
    <div
      className={`
        relative border border-gray-300 bg-white flex flex-col items-center justify-center
        cursor-pointer transition-all duration-200 hover:bg-gray-50
        ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
        ${className}
      `}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={onClick}
    >
      {/* Icône */}
      <div
        className="flex items-center justify-center"
        style={{ fontSize: Math.min(height * 0.5, width * 0.3) }}
      >
        {data.icon}
      </div>

      {/* Nom */}
      {data.name && (
        <div
          ref={textRef}
          className="text-center font-semibold text-gray-800 leading-tight overflow-hidden"
          style={{
            fontSize: `${adjustedFontSize}px`,
            maxWidth: '85%',
            maxHeight: '40%'
          }}
        >
          {data.name}
        </div>
      )}

      {/* Indicateur de sélection */}
      {isSelected && (
        <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-bl-lg"></div>
      )}
    </div>
  );
};

export default Sticker;
