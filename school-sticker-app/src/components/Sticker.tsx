'use client';

import React, { useRef } from 'react';
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

  return (
    <div
      className={`
        relative border border-gray-300 bg-white flex items-center px-1
        cursor-pointer transition-all duration-200 hover:bg-gray-50
        ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
        ${className}
      `}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        overflow: 'hidden', // Force le clipping du contenu
        boxSizing: 'border-box'
      }}
      onClick={onClick}
    >
      {/* Icône à gauche */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ 
          fontSize: `${height * 0.3}px`, // Icône légèrement plus grande
          width: `${width * 0.25}px`, // Largeur fixe
          height: `${height * 0.7}px`, // Hauteur légèrement plus grande
          lineHeight: '1'
        }}
      >
        {data.icon}
      </div>

      {/* Texte à droite sur 1-2 lignes */}
      {data.name && (
        <div
          ref={textRef}
          className="flex-1 font-semibold text-gray-800 overflow-hidden"
          style={{
            fontSize: '8px', // Améliorer à 8px
            lineHeight: '1.0',
            height: `${height * 0.7}px`, // Légèrement plus de hauteur
            width: `${width * 0.65}px`, // Légèrement plus de largeur
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginLeft: '4px',
            paddingRight: '6px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{
            fontSize: '8px', // Améliorer à 8px aussi ici
            lineHeight: '1.0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-word',
            hyphens: 'auto',
            width: '100%',
            height: '100%',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            padding: '1px'
          }}>
            {data.name}
          </div>
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
