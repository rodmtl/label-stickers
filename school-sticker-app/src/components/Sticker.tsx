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
  
  // POLICE FIXE - plus de calculs dynamiques
  const fixedFontSize = 6; // 6px pour TOUS les stickers

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
          fontSize: `${height * 0.2}px`, // Icône fixe en pixels
          width: `${width * 0.25}px`, // Largeur fixe
          height: `${height * 0.6}px`, // Hauteur fixe
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
            fontSize: '6px', // Force 6px
            lineHeight: '1.0',
            height: `${height * 0.6}px`, // Hauteur encore plus réduite
            width: `${width * 0.6}px`, // Largeur encore plus réduite
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginLeft: '6px',
            paddingRight: '8px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{
            fontSize: '6px', // Force 6px aussi ici
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
