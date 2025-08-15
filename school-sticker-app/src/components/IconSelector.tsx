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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Sélectionner une icône</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Onglets des catégories */}
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {Object.keys(EMOJI_CATEGORIES).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as keyof typeof EMOJI_CATEGORIES)}
              className={`
                px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap
                ${activeCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Grille d'icônes */}
        <div className="grid grid-cols-6 gap-2 overflow-y-auto flex-1">
          {EMOJI_CATEGORIES[activeCategory].map((icon, index) => (
            <button
              key={`${activeCategory}-${index}`}
              onClick={() => handleIconClick(icon)}
              className={`
                p-2 text-2xl rounded-md hover:bg-gray-100 transition-colors
                ${selectedIcon === icon ? 'bg-blue-100 ring-2 ring-blue-500' : ''}
              `}
            >
              {icon}
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconSelector;
