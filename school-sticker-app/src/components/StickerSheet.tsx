'use client';

import React, { forwardRef } from 'react';
import Sticker from './Sticker';
import { StickerData, StickerSheetConfig } from '@/types';

interface StickerSheetProps {
  stickers: StickerData[];
  config: StickerSheetConfig;
  selectedStickerId?: string | null;
  onStickerClick?: (stickerId: string) => void;
  scale?: number; // Facteur d'échelle pour l'affichage
  showBorders?: boolean;
}

const StickerSheet = forwardRef<HTMLDivElement, StickerSheetProps>(({
  stickers,
  config,
  selectedStickerId,
  onStickerClick,
  scale = 1,
  showBorders = true
}, ref) => {
  // Conversion cm vers pixels (approximation: 1cm = 37.8 pixels)
  const cmToPx = (cm: number) => cm * 37.8 * scale;

  const sheetWidth = cmToPx(config.sheetWidth);
  const sheetHeight = cmToPx(config.sheetHeight);
  const stickerWidth = cmToPx(config.stickerWidth);
  const stickerHeight = cmToPx(config.stickerHeight);

  // Calculer l'espacement entre les stickers
  const horizontalSpacing = (sheetWidth - (config.columns * stickerWidth)) / (config.columns + 1);
  const verticalSpacing = (sheetHeight - (config.rows * stickerHeight)) / (config.rows + 1);

  const renderStickers = () => {
    const stickerElements = [];
    
    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.columns; col++) {
        const index = row * config.columns + col;
        const stickerData = stickers[index] || {
          id: `empty-${index}`,
          name: '',
          icon: '',
          fontSize: 12
        };

        const x = horizontalSpacing + col * (stickerWidth + horizontalSpacing);
        const y = verticalSpacing + row * (stickerHeight + verticalSpacing);

        stickerElements.push(
          <div
            key={`sticker-${row}-${col}`}
            className="absolute"
            style={{
              left: `${x}px`,
              top: `${y}px`
            }}
          >
            <Sticker
              data={stickerData}
              width={stickerWidth}
              height={stickerHeight}
              isSelected={selectedStickerId === stickerData.id}
              onClick={() => onStickerClick && onStickerClick(stickerData.id)}
              className={showBorders ? '' : 'border-transparent'}
            />
          </div>
        );
      }
    }

    return stickerElements;
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div
        ref={ref}
        className={`relative bg-white ${showBorders ? 'border-2 border-gray-400' : ''} print:border-none`}
        style={{
          width: `${sheetWidth}px`,
          height: `${sheetHeight}px`
        }}
      >
        {renderStickers()}
        
        {/* Grille de guidage (visible uniquement à l'écran) */}
        {showBorders && (
          <div className="absolute inset-0 pointer-events-none print:hidden">
            {/* Lignes verticales */}
            {Array.from({ length: config.columns + 1 }, (_, i) => (
              <div
                key={`v-line-${i}`}
                className="absolute bg-gray-200 opacity-30"
                style={{
                  left: `${horizontalSpacing + i * (stickerWidth + horizontalSpacing) - 1}px`,
                  top: 0,
                  width: '2px',
                  height: '100%'
                }}
              />
            ))}
            
            {/* Lignes horizontales */}
            {Array.from({ length: config.rows + 1 }, (_, i) => (
              <div
                key={`h-line-${i}`}
                className="absolute bg-gray-200 opacity-30"
                style={{
                  top: `${verticalSpacing + i * (stickerHeight + verticalSpacing) - 1}px`,
                  left: 0,
                  height: '2px',
                  width: '100%'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

StickerSheet.displayName = 'StickerSheet';

export default StickerSheet;
