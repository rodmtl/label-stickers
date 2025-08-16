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
      // Zone disponible pour le texte : largeur totale - espace icône - marges
      const iconSpace = Math.min(height * 0.8, width * 0.3);
      const maxWidth = width - iconSpace - 8; // 8px pour les marges et espacement
      const maxHeight = height * 0.9; // 90% de la hauteur disponible

      let fontSize = data.fontSize;
      textElement.style.fontSize = `${fontSize}px`;
      textElement.style.lineHeight = '1.1';

      // Réduire la taille jusqu'à ce que le texte rentre sur 2 lignes max
      while (
        (textElement.scrollWidth > maxWidth || textElement.scrollHeight > maxHeight) &&
        fontSize > 6
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
        relative border border-gray-300 bg-white flex items-center px-1
        cursor-pointer transition-all duration-200 hover:bg-gray-50
        ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
        ${className}
      `}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={onClick}
    >
      {/* Icône à gauche */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ 
          fontSize: Math.min(height * 0.7, width * 0.25),
          width: Math.min(height * 0.8, width * 0.3),
          height: '100%'
        }}
      >
        {data.icon}
      </div>

      {/* Texte à droite sur 1-2 lignes */}
      {data.name && (
        <div
          ref={textRef}
          className="flex-1 font-semibold text-gray-800 leading-tight overflow-hidden ml-1"
          style={{
            fontSize: `${adjustedFontSize}px`,
            lineHeight: '1.1',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            wordBreak: 'break-word'
          }}
        >
          {data.name}
        </div>
      )}

      {/* Indicateur de sélection */}
      {isSelected && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-bl-md"></div>
      )}
    </div>
  );
};

export default Sticker;
