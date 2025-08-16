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
    fillEmptyStickers,
    fillAllWithName
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SchoolStickerApp
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Créez vos étiquettes personnalisées en quelques clics
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full border border-emerald-200">
                <span className="text-sm font-medium text-emerald-700">84 stickers par feuille</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200">
                <span className="text-sm font-medium text-purple-700">19.2×15.7cm</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Panneau de contrôle */}
          <div className="xl:col-span-2">
            <ControlPanel
              onClearAll={clearAllStickers}
              onFillNames={fillEmptyStickers}
              onFillAllWithName={fillAllWithName}
              defaultFontSize={appState.defaultFontSize}
              onFontSizeChange={updateDefaultFontSize}
              stickerSheetRef={stickerSheetRef}
            />
          </div>

          {/* Zone de prévisualisation */}
          <div className="xl:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              {/* Header de la prévisualisation */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Prévisualisation</span>
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">Aperçu de votre feuille d&apos;étiquettes</p>
                  </div>
                  <div className="flex items-center space-x-4 bg-white/70 rounded-xl px-4 py-2 border border-indigo-100">
                    <label className="text-sm font-semibold text-gray-700">
                      Zoom: {Math.round(previewScale * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.3"
                      max="1.2"
                      step="0.1"
                      value={previewScale}
                      onChange={(e) => setPreviewScale(Number(e.target.value))}
                      className="w-24 h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Statistiques */}
                <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="text-2xl font-bold text-blue-600">{appState.config.rows}×{appState.config.columns}</div>
                    <div className="text-xs text-blue-600 font-medium">Grille</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                    <div className="text-2xl font-bold text-emerald-600">{appState.config.stickerWidth}×{appState.config.stickerHeight}cm</div>
                    <div className="text-xs text-emerald-600 font-medium">Sticker</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="text-2xl font-bold text-purple-600">{appState.config.sheetWidth}×{appState.config.sheetHeight}cm</div>
                    <div className="text-xs text-purple-600 font-medium">Feuille</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-100">
                    <div className="text-2xl font-bold text-orange-600">{appState.config.rows * appState.config.columns}</div>
                    <div className="text-xs text-orange-600 font-medium">Total</div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-blue-100 rounded-full">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Guide d&apos;utilisation</h4>
                      <p className="text-sm text-blue-800">
                        Cliquez sur un sticker pour le personnaliser. Utilisez le panneau de contrôle 
                        pour remplir rapidement plusieurs stickers ou exporter/imprimer la feuille.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feuille de stickers */}
                <div className="overflow-auto bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl p-4 border border-gray-200">
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
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 bg-gray-50 rounded-full px-4 py-2 inline-flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span>Les guides et bordures ne seront pas visibles à l&apos;impression</span>
                  </p>
                </div>
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