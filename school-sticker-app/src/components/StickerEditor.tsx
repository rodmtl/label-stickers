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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Modifier le sticker</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez le nom..."
              maxLength={20}
            />
          </div>

          {/* Icône */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icône
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowIconSelector(true)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2"
              >
                <span className="text-2xl">{icon || '😀'}</span>
                <span className="text-sm text-gray-600">Changer</span>
              </button>
            </div>
          </div>

          {/* Taille de police */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taille de police: {fontSize}px
            </label>
            <input
              type="range"
              min="8"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Aperçu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aperçu
            </label>
            <div
              className="border border-gray-300 bg-white flex flex-col items-center justify-center"
              style={{
                width: '120px',
                height: '40px',
                fontSize: `${Math.min(fontSize, 16)}px`
              }}
            >
              <div className="text-lg">{icon}</div>
              {name && <div className="text-center font-semibold leading-tight">{name}</div>}
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Effacer
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Sauvegarder
            </button>
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
