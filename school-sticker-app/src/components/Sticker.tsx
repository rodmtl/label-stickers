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
      // Zone disponible pour le texte : largeur totale - espace icône - marges DRASTIQUES
      const iconSpace = Math.min(height * 0.4, width * 0.15); // Icône très petite
      const maxWidth = width - iconSpace - 12; // Marge drastique pour PDF
      const maxHeight = height * 0.5; // 50% de la hauteur disponible (ultra-conservateur)

      let fontSize = data.fontSize;
      textElement.style.fontSize = `${fontSize}px`;
      textElement.style.lineHeight = '1.1';

      // Réduire la taille jusqu'à ce que le texte rentre sur 2 lignes max
      while (
        (textElement.scrollWidth > maxWidth || textElement.scrollHeight > maxHeight) &&
        fontSize > 6 // Taille minimum pour lisibilité
      ) {
        fontSize -= 0.5; // Réduction plus fine
        textElement.style.fontSize = `${fontSize}px`;
      }
      
      // Réduction DRASTIQUE pour garantir qu'on reste dans les limites
      // Pour le PDF, on applique une marge de sécurité EXTREME
      fontSize = Math.min(fontSize, Math.floor(height * 0.18)); // Max 18% de la hauteur
      
      // Marge de sécurité MASSIVE pour l'export PDF
      fontSize = Math.max(6, fontSize - 2); // Réduction de 2px supplémentaires

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
          fontSize: Math.min(height * 0.25, width * 0.1), // Icône TRÈS petite
          width: Math.min(height * 0.3, width * 0.12), // Largeur minimale
          height: height * 0.5, // Hauteur très réduite
          lineHeight: '1',
          maxWidth: `${Math.min(height * 0.3, width * 0.12)}px`,
          maxHeight: `${height * 0.5}px`
        }}
      >
        {data.icon}
      </div>

      {/* Texte à droite sur 1-2 lignes */}
      {data.name && (
        <div
          ref={textRef}
          className="flex-1 font-semibold text-gray-800 overflow-hidden ml-1"
          style={{
            fontSize: `${adjustedFontSize}px`,
            lineHeight: '0.9', // Ligne TRÈS serrée
            height: height * 0.5, // Hauteur très réduite
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingRight: '4px' // Marge droite supplémentaire
          }}
        >
          <span style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
            textAlign: 'left',
            width: 'calc(100% - 4px)', // Largeur réduite
            wordBreak: 'break-word',
            fontSize: `${adjustedFontSize}px`, // Force la taille sur le span aussi
            lineHeight: '0.9', // Ligne TRÈS serrée
            maxHeight: `${height * 0.4}px`, // Hauteur maximale très réduite
            paddingRight: '2px' // Padding supplémentaire
          }}>
            {data.name}
          </span>
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
