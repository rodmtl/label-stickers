'use client';

import React, { useState } from 'react';
import { StickerData } from '@/types';
import IconSelector from './IconSelector';

interface StickerEditorProps {
  sticker: StickerData | null;
  onUpdate: (sticker: StickerData) => void;
  onClose: () => void;
}

const StickerEditor: React.FC<StickerEditorProps> = ({
  sticker,
  onUpdate,
  onClose
}) => {
  const [name, setName] = useState(sticker?.name || '');
  const [icon, setIcon] = useState(sticker?.icon || '😀');
  const [fontSize, setFontSize] = useState(sticker?.fontSize || 12);
  const [showIconSelector, setShowIconSelector] = useState(false);

  if (!sticker) return null;

  const handleSave = () => {
    onUpdate({
      ...sticker,
      name: name.trim(),
      icon,
      fontSize
    });
    onClose();
  };

  const handleClear = () => {
    onUpdate({
      ...sticker,
      name: '',
      icon: '',
      fontSize: 12
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Personnaliser le sticker</h2>
              <p className="text-sm text-gray-600 mt-1">Créez votre étiquette parfaite</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">

          <div className="space-y-6">
            {/* Nom */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
                  </svg>
                  <span>Nom du sticker</span>
                </span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                placeholder="Entrez le nom..."
                maxLength={20}
              />
              <p className="text-xs text-blue-600 mt-2">{name.length}/20 caractères</p>
            </div>

            {/* Icône */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 border border-orange-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4" />
                  </svg>
                  <span>Emoji</span>
                </span>
              </label>
              <button
                onClick={() => setShowIconSelector(true)}
                className="group w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-xl hover:border-orange-300 hover:shadow-md transition-all duration-200 flex items-center space-x-3"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{icon || '😀'}</span>
                <div className="flex-1 text-left">
                  <span className="text-sm font-medium text-gray-700">Changer l&apos;emoji</span>
                  <p className="text-xs text-gray-500">Cliquez pour ouvrir la sélection</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Taille de police */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h.01M6 20h.01M12 6h.01M12 20h.01M18 6h.01M18 20h.01" />
                  </svg>
                  <span>Taille de police</span>
                </label>
                <span className="text-lg font-bold text-purple-600">{fontSize}px</span>
              </div>
              <input
                type="range"
                min="6"
                max="14"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-purple-600 mt-1">
                <span>6px</span>
                <span>14px</span>
              </div>
            </div>

            {/* Aperçu */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl p-5 border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Aperçu du sticker</span>
              </label>
              <div className="flex justify-center">
                <div
                  className="border-2 border-gray-300 bg-white flex items-center px-2 rounded-lg shadow-sm"
                  style={{
                    width: '150px',
                    height: '50px'
                  }}
                >
                  {/* Icône à gauche */}
                  <div 
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ 
                      fontSize: '18px',
                      width: '25px'
                    }}
                  >
                    {icon}
                  </div>
                  {/* Texte à droite */}
                  {name && (
                    <div 
                      className="flex-1 font-semibold text-gray-800 leading-tight ml-2 overflow-hidden"
                      style={{
                        fontSize: `${Math.min(fontSize, 14)}px`,
                        lineHeight: '1.1',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
                        wordBreak: 'break-word'
                      }}
                    >
                      {name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer avec boutons d'action */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <button
              onClick={handleClear}
              className="group px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-rose-700 transition-all duration-200 transform hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Effacer</span>
              </span>
            </button>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="group px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Sauvegarder</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sélecteur d'icônes */}
      <IconSelector
        isOpen={showIconSelector}
        onClose={() => setShowIconSelector(false)}
        onIconSelect={setIcon}
        selectedIcon={icon}
      />
    </div>
  );
};

export default StickerEditor;
