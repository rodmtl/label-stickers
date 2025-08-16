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
      const iconSpace = Math.min(height * 0.5, width * 0.2); // Icône encore plus petite
      const maxWidth = width - iconSpace - 8; // Marge de sécurité pour PDF
      const maxHeight = height * 0.7; // 70% de la hauteur disponible (plus conservateur)

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
      
      // Réduction supplémentaire pour garantir qu'on reste dans les limites
      // Pour le PDF, on applique une marge de sécurité plus importante
      fontSize = Math.min(fontSize, Math.floor(height * 0.22)); // Max 22% de la hauteur
      
      // Marge de sécurité supplémentaire pour l'export PDF
      fontSize = Math.max(6, fontSize - 1);

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
          fontSize: Math.min(height * 0.35, width * 0.12), // Icône encore plus petite
          width: Math.min(height * 0.4, width * 0.18), // Largeur cohérente avec calcul texte
          height: height * 0.6, // Hauteur réduite
          lineHeight: '1',
          maxWidth: `${Math.min(height * 0.4, width * 0.18)}px`,
          maxHeight: `${height * 0.6}px`
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
            lineHeight: '1.0', // Ligne plus serrée
            height: height * 0.7, // Hauteur réduite
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <span style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
            textAlign: 'left',
            width: '100%',
            wordBreak: 'break-word',
            fontSize: `${adjustedFontSize}px`, // Force la taille sur le span aussi
            lineHeight: '1.0',
            maxHeight: `${height * 0.6}px` // Hauteur maximale fixe
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
