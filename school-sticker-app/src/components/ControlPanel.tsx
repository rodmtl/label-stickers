'use client';

import React, { useState, useRef } from 'react';
import { ExportConfig } from '@/types';
import { useExport } from '@/hooks/useExport';
import IconSelector from './IconSelector';

interface ControlPanelProps {
  onClearAll: () => void;
  onFillNames: (names: string[], selectedEmoji?: string) => void;
  onFillAllWithName: (name: string, selectedEmoji: string) => void;
  defaultFontSize: number;
  onFontSizeChange: (size: number) => void;
  stickerSheetRef: React.RefObject<HTMLDivElement | null>;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onClearAll,
  onFillNames,
  onFillAllWithName,
  defaultFontSize,
  onFontSizeChange,
  stickerSheetRef
}) => {
  const [bulkNames, setBulkNames] = useState('');
  const [singleName, setSingleName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('😀');
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    pageSize: 'Original',
    orientation: 'landscape'
  });
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { exportToPDF, printDirect } = useExport();

  const handleBulkFill = () => {
    const names = bulkNames
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    onFillNames(names, selectedEmoji);
    setBulkNames('');
  };

  const handleFillAllWithName = () => {
    if (singleName.trim()) {
      onFillAllWithName(singleName.trim(), selectedEmoji);
      setSingleName('');
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const names = content
        .split(/[\n,;]/)
        .map(name => name.trim())
        .filter(name => name.length > 0);
      
      onFillNames(names, selectedEmoji);
    };
    reader.readAsText(file);
  };

  const handleExportPDF = async () => {
    if (!stickerSheetRef.current) return;
    
    setIsExporting(true);
    try {
      const success = await exportToPDF(
        stickerSheetRef.current,
        exportConfig,
        'stickers-sheet'
      );
      
      if (!success) {
        alert('Erreur lors de l\'export PDF');
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = async () => {
    if (!stickerSheetRef.current) return;
    
    setIsExporting(true);
    try {
      const success = await printDirect(stickerSheetRef.current);
      
      if (!success) {
        alert('Erreur lors de l\'impression');
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Panneau de contrôle</h2>

      {/* Configuration de police par défaut */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Taille de police par défaut: {defaultFontSize}px
        </label>
        <input
          type="range"
          min="8"
          max="24"
          value={defaultFontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Sélection d'emoji global */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emoji par défaut
        </label>
        <button
          onClick={() => setShowEmojiSelector(true)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <span className="text-2xl">{selectedEmoji}</span>
          <span className="text-sm text-gray-600">Changer l&apos;emoji</span>
        </button>
      </div>

      {/* Remplir tous avec le même nom */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Remplir tous les stickers avec le même nom
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={singleName}
            onChange={(e) => setSingleName(e.target.value)}
            placeholder="Nom à appliquer partout..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={20}
          />
          <button
            onClick={handleFillAllWithName}
            disabled={!singleName.trim()}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-gray-300"
          >
            Remplir tout
          </button>
        </div>
      </div>

      {/* Remplissage en masse */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ajouter des noms en masse
        </label>
        <textarea
          value={bulkNames}
          onChange={(e) => setBulkNames(e.target.value)}
          placeholder="Entrez les noms, un par ligne..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
        />
        <div className="flex space-x-2 mt-2">
          <button
            onClick={handleBulkFill}
            disabled={!bulkNames.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            Appliquer
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Importer fichier
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.csv"
            onChange={handleFileImport}
            className="hidden"
          />
        </div>
      </div>

      {/* Configuration d'export */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Configuration d&apos;export</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Taille de page
            </label>
            <select
              value={exportConfig.pageSize}
              onChange={(e) => setExportConfig(prev => ({
                ...prev,
                pageSize: e.target.value as ExportConfig['pageSize']
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Original">Taille originale (19.2×15.7cm)</option>
              <option value="A4">A4</option>
              <option value="A3">A3</option>
              <option value="Letter">Letter</option>
              <option value="Legal">Legal</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Orientation
            </label>
            <select
              value={exportConfig.orientation}
              onChange={(e) => setExportConfig(prev => ({
                ...prev,
                orientation: e.target.value as ExportConfig['orientation']
              }))}
              disabled={exportConfig.pageSize === 'Original'}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                exportConfig.pageSize === 'Original' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
              }`}
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Paysage</option>
            </select>
            {exportConfig.pageSize === 'Original' && (
              <p className="text-xs text-gray-500 mt-1">
                L&apos;orientation est fixée en paysage pour la taille originale
              </p>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300"
          >
            {isExporting ? 'Export...' : 'Exporter PDF'}
          </button>
          
          <button
            onClick={handlePrint}
            disabled={isExporting}
            className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:bg-gray-300"
          >
            {isExporting ? 'Impression...' : 'Imprimer'}
          </button>
        </div>
      </div>

      {/* Actions */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Actions</h3>
        <button
          onClick={onClearAll}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Effacer tous les stickers
        </button>
      </div>

      {/* Sélecteur d'icônes */}
      <IconSelector
        isOpen={showEmojiSelector}
        onClose={() => setShowEmojiSelector(false)}
        onIconSelect={setSelectedEmoji}
        selectedIcon={selectedEmoji}
      />
    </div>
  );
};

export default ControlPanel;
