'use client';

import React, { useState } from 'react';
import { EMOJI_CATEGORIES } from '@/constants';

interface IconSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onIconSelect: (icon: string) => void;
  selectedIcon?: string;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  isOpen,
  onClose,
  onIconSelect,
  selectedIcon
}) => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof EMOJI_CATEGORIES>('faces');

  if (!isOpen) return null;

  const handleIconClick = (icon: string) => {
    onIconSelect(icon);
    onClose();
  };

  const categoryLabels = {
    faces: { label: 'Visages', icon: '😀' },
    animals: { label: 'Animaux', icon: '🐶' },
    nature: { label: 'Nature', icon: '🌸' },
    food: { label: 'Nourriture', icon: '🍎' },
    objects: { label: 'Objets', icon: '⚽' },
    symbols: { label: 'Symboles', icon: '❤️' }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Choisir un emoji</h2>
            <p className="text-sm text-gray-500 mt-1">Sélectionnez l&apos;emoji parfait pour vos stickers</p>
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

        {/* Onglets des catégories */}
        <div className="px-6 py-4 border-b border-gray-50">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {Object.entries(categoryLabels).map(([category, { label, icon }]) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as keyof typeof EMOJI_CATEGORIES)}
                className={`
                  flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200
                  ${activeCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <span className="text-base">{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grille d'icônes */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-8 gap-2">
            {EMOJI_CATEGORIES[activeCategory].map((icon, index) => (
              <button
                key={`${activeCategory}-${index}`}
                onClick={() => handleIconClick(icon)}
                className={`
                  aspect-square flex items-center justify-center text-2xl rounded-lg transition-all duration-200 hover:scale-110
                  ${selectedIcon === icon 
                    ? 'bg-gradient-to-br from-blue-100 to-purple-100 ring-2 ring-blue-500 shadow-md transform scale-105' 
                    : 'hover:bg-gray-50 hover:shadow-sm'
                  }
                `}
                title={icon}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {EMOJI_CATEGORIES[activeCategory].length} emojis disponibles
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconSelector;
