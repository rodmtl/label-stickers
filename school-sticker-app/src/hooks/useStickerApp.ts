'use client';

import { useState, useCallback } from 'react';
import { StickerData, AppState, StickerSheetConfig } from '@/types';
import { DEFAULT_STICKER_CONFIG } from '@/constants';

export const useStickerApp = () => {
  const [appState, setAppState] = useState<AppState>({
    stickers: [],
    config: DEFAULT_STICKER_CONFIG,
    defaultFontSize: 12,
    selectedStickerId: null
  });

  const updateSticker = useCallback((updatedSticker: StickerData) => {
    setAppState(prev => {
      const existingIndex = prev.stickers.findIndex(s => s.id === updatedSticker.id);
      
      if (existingIndex >= 0) {
        // Mettre à jour un sticker existant
        const newStickers = [...prev.stickers];
        newStickers[existingIndex] = updatedSticker;
        return { ...prev, stickers: newStickers };
      } else {
        // Ajouter un nouveau sticker
        return { ...prev, stickers: [...prev.stickers, updatedSticker] };
      }
    });
  }, []);

  const selectSticker = useCallback((stickerId: string | null) => {
    setAppState(prev => ({ ...prev, selectedStickerId: stickerId }));
  }, []);

  const updateConfig = useCallback((config: Partial<StickerSheetConfig>) => {
    setAppState(prev => ({
      ...prev,
      config: { ...prev.config, ...config }
    }));
  }, []);

  const updateDefaultFontSize = useCallback((fontSize: number) => {
    setAppState(prev => ({ ...prev, defaultFontSize: fontSize }));
  }, []);

  const clearAllStickers = useCallback(() => {
    setAppState(prev => ({ ...prev, stickers: [], selectedStickerId: null }));
  }, []);

  const getSelectedSticker = useCallback(() => {
    if (!appState.selectedStickerId) return null;
    return appState.stickers.find(s => s.id === appState.selectedStickerId) || null;
  }, [appState.selectedStickerId, appState.stickers]);

  const fillEmptyStickers = useCallback((names: string[]) => {
    const totalStickers = appState.config.rows * appState.config.columns;
    const newStickers: StickerData[] = [];
    
    for (let i = 0; i < totalStickers; i++) {
      const existingSticker = appState.stickers.find(s => s.id === `sticker-${i}`);
      
      if (existingSticker) {
        newStickers.push(existingSticker);
      } else if (i < names.length && names[i].trim()) {
        newStickers.push({
          id: `sticker-${i}`,
          name: names[i].trim(),
          icon: '😀',
          fontSize: appState.defaultFontSize
        });
      }
    }
    
    setAppState(prev => ({ ...prev, stickers: newStickers }));
  }, [appState.config, appState.stickers, appState.defaultFontSize]);

  return {
    appState,
    updateSticker,
    selectSticker,
    updateConfig,
    updateDefaultFontSize,
    clearAllStickers,
    getSelectedSticker,
    fillEmptyStickers
  };
};
