'use client';

import React, { useRef, useState } from 'react';
import StickerSheet from '@/components/StickerSheet';
import StickerEditor from '@/components/StickerEditor';
import ControlPanel from '@/components/ControlPanel';
import { useStickerApp } from '@/hooks/useStickerApp';
import { StickerData } from '@/types';

export default function Home() {
  const stickerSheetRef = useRef<HTMLDivElement>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.8);

  const {
    appState,
    updateSticker,
    selectSticker,
    updateDefaultFontSize,
    clearAllStickers,
    getSelectedSticker,
    fillEmptyStickers
  } = useStickerApp();

  const handleStickerClick = (stickerId: string) => {
    // Ne pas sélectionner les stickers vides par défaut
    if (stickerId.startsWith('empty-')) {
      // Créer un nouveau sticker avec un ID unique
      const index = parseInt(stickerId.split('-')[1]);
      const newStickerId = `sticker-${index}`;
      
      const newSticker = {
        id: newStickerId,
        name: '',
        icon: '😀',
        fontSize: appState.defaultFontSize
      };
      
      updateSticker(newSticker);
      selectSticker(newStickerId);
    } else {
      selectSticker(stickerId);
    }
    setShowEditor(true);
  };

  const handleStickerUpdate = (updatedSticker: StickerData) => {
    updateSticker(updatedSticker);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    selectSticker(null);
  };

  const selectedSticker = getSelectedSticker();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              SchoolStickerApp
            </h1>
            <div className="text-sm text-gray-600">
              Application de création d&apos;étiquettes autocollantes
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Panneau de contrôle */}
          <div className="lg:col-span-1">
            <ControlPanel
              onClearAll={clearAllStickers}
              onFillNames={fillEmptyStickers}
              defaultFontSize={appState.defaultFontSize}
              onFontSizeChange={updateDefaultFontSize}
              stickerSheetRef={stickerSheetRef}
            />
          </div>

          {/* Zone de prévisualisation */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Prévisualisation de la feuille
                </h2>
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">
                    Échelle: {Math.round(previewScale * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.3"
                    max="1.2"
                    step="0.1"
                    value={previewScale}
                    onChange={(e) => setPreviewScale(Number(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>

              {/* Informations sur la configuration */}
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Grille:</span> {appState.config.rows} × {appState.config.columns}
                  </div>
                  <div>
                    <span className="font-medium">Sticker:</span> {appState.config.stickerWidth}cm × {appState.config.stickerHeight}cm
                  </div>
                  <div>
                    <span className="font-medium">Feuille:</span> {appState.config.sheetWidth}cm × {appState.config.sheetHeight}cm
                  </div>
                  <div>
                    <span className="font-medium">Total:</span> {appState.config.rows * appState.config.columns} stickers
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Instructions:</strong> Cliquez sur un sticker pour le modifier. 
                  Utilisez le panneau de contrôle pour remplir rapidement plusieurs stickers 
                  ou exporter/imprimer la feuille.
                </p>
              </div>

              {/* Feuille de stickers */}
              <div className="overflow-auto">
                <StickerSheet
                  ref={stickerSheetRef}
                  stickers={appState.stickers}
                  config={appState.config}
                  selectedStickerId={appState.selectedStickerId}
                  onStickerClick={handleStickerClick}
                  scale={previewScale}
                  showBorders={true}
                />
              </div>

              {/* Légende */}
              <div className="mt-4 text-xs text-gray-500 text-center">
                La grille de guidage et les bordures ne seront pas visibles lors de l&apos;impression
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Éditeur de sticker (modal) */}
      {showEditor && (
        <StickerEditor
          sticker={selectedSticker}
          onUpdate={handleStickerUpdate}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
}