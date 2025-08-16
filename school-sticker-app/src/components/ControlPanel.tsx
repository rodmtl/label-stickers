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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
        <p className="text-sm text-gray-600 mt-1">Personnalisez vos étiquettes</p>
      </div>

      <div className="p-6 space-y-8">

        {/* Configuration de police par défaut */}
        <div className="bg-gray-50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">
              Taille de police par défaut
            </label>
            <span className="text-lg font-bold text-blue-600">{defaultFontSize}px</span>
          </div>
          <input
            type="range"
            min="6"
            max="14"
            value={defaultFontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>6px</span>
            <span>14px</span>
          </div>
        </div>

        {/* Sélection d'emoji global */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 border border-orange-100">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Emoji par défaut
          </label>
          <button
            onClick={() => setShowEmojiSelector(true)}
            className="group flex items-center space-x-3 w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-xl hover:border-orange-300 hover:shadow-md transition-all duration-200"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{selectedEmoji}</span>
            <div className="flex-1 text-left">
              <span className="text-sm font-medium text-gray-700">Changer l&apos;emoji</span>
              <p className="text-xs text-gray-500">Cliquez pour ouvrir la sélection</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Remplir tous avec le même nom */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Remplir tous les stickers
          </label>
          <div className="space-y-3">
            <input
              type="text"
              value={singleName}
              onChange={(e) => setSingleName(e.target.value)}
              placeholder="Nom à appliquer partout..."
              className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
              maxLength={20}
            />
            <button
              onClick={handleFillAllWithName}
              disabled={!singleName.trim()}
              className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>Remplir tout (84 stickers)</span>
              </span>
            </button>
          </div>
        </div>

        {/* Remplissage en masse */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Remplissage en masse
          </label>
          <div className="space-y-4">
            <textarea
              value={bulkNames}
              onChange={(e) => setBulkNames(e.target.value)}
              placeholder="Entrez les noms, un par ligne...&#10;Exemple:&#10;Marie&#10;Pierre&#10;Sophie"
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 resize-none"
              rows={5}
            />
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleBulkFill}
                disabled={!bulkNames.trim()}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                  <span>Appliquer</span>
                </span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-green-700 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  <span>Fichier</span>
                </span>
              </button>
            </div>
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
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export & Impression</span>
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Format de page
                </label>
                <select
                  value={exportConfig.pageSize}
                  onChange={(e) => setExportConfig(prev => ({
                    ...prev,
                    pageSize: e.target.value as ExportConfig['pageSize']
                  }))}
                  className="w-full px-3 py-2.5 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Original">📐 Taille originale (19.2×15.7cm)</option>
                  <option value="A4">📄 A4</option>
                  <option value="A3">📄 A3</option>
                  <option value="Letter">📄 Letter</option>
                  <option value="Legal">📄 Legal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Orientation
                </label>
                <select
                  value={exportConfig.orientation}
                  onChange={(e) => setExportConfig(prev => ({
                    ...prev,
                    orientation: e.target.value as ExportConfig['orientation']
                  }))}
                  disabled={exportConfig.pageSize === 'Original'}
                  className={`w-full px-3 py-2.5 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                    exportConfig.pageSize === 'Original' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
                  }`}
                >
                  <option value="portrait">📱 Portrait</option>
                  <option value="landscape">🖥️ Paysage</option>
                </select>
                {exportConfig.pageSize === 'Original' && (
                  <p className="text-xs text-purple-600 mt-1 flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Orientation fixée en paysage</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="group px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  <span>{isExporting ? 'Export...' : 'PDF'}</span>
                </span>
              </button>
              
              <button
                onClick={handlePrint}
                disabled={isExporting}
                className="group px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>{isExporting ? 'Impression...' : 'Imprimer'}</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-5 border border-red-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Actions rapides</span>
          </h3>
          <button
            onClick={onClearAll}
            className="group w-full px-4 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-rose-700 transition-all duration-200 transform hover:scale-[1.02]"
          >
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Effacer tous les stickers</span>
            </span>
          </button>
        </div>
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
