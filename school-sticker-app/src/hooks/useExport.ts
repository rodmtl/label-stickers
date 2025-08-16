'use client';

import { useCallback } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportConfig } from '@/types';
import { PAGE_SIZES } from '@/constants';

export const useExport = () => {
  const exportToPDF = useCallback(async (
    element: HTMLElement | null,
    config: ExportConfig,
    filename: string = 'stickers'
  ) => {
    if (!element) {
      console.error('Élément non trouvé pour l\'export PDF');
      return false;
    }
    
    // console.log('Export PDF - Élément:', element);
    // console.log('Export PDF - Dimensions:', element.offsetWidth, 'x', element.offsetHeight);
    
    try {
      // Créer un canvas à partir de l'élément avec options simplifiées
      const canvas = await html2canvas(element, {
        scale: 2, // Qualité haute résolution
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false, // Désactiver les logs pour production
        allowTaint: false
      });

      // console.log('Canvas créé:', canvas.width, 'x', canvas.height);
      
      // Vérifier que le canvas n'est pas vide
      if (canvas.width === 0 || canvas.height === 0) {
        console.error('Canvas vide - dimensions invalides');
        return false;
      }

      // Obtenir les dimensions de la page
      const pageSize = PAGE_SIZES[config.pageSize];
      const isLandscape = config.orientation === 'landscape';
      
      let pageWidth, pageHeight, imgWidth, imgHeight, x, y;

      if (config.pageSize === 'Original') {
        // Pour la taille originale, utiliser les dimensions exactes avec petites marges de sécurité
        pageWidth = pageSize.width;
        pageHeight = pageSize.height;
        
        // Petites marges pour éviter les coupures lors de l'impression
        const margin = 1; // 1mm de marge
        imgWidth = pageWidth - (margin * 2);
        imgHeight = pageHeight - (margin * 2);
        x = margin;
        y = margin;
      } else {
        // Pour les autres formats, utiliser les marges habituelles
        pageWidth = isLandscape ? pageSize.height : pageSize.width;
        pageHeight = isLandscape ? pageSize.width : pageSize.height;
        
        // Calculer les dimensions de l'image avec marges
        imgWidth = pageWidth - 20; // Marges de 10mm de chaque côté
        imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Centrer l'image sur la page
        x = 10; // Marge gauche
        y = Math.max(10, (pageHeight - imgHeight) / 2); // Centrer verticalement
      }

      // Créer le PDF
      const pdf = new jsPDF({
        orientation: config.pageSize === 'Original' ? 'landscape' : config.orientation,
        unit: 'mm',
        format: [pageWidth, pageHeight]
      });

      // Ajouter l'image au PDF
      const imgData = canvas.toDataURL('image/png');
      // console.log('Ajout image au PDF:', x, y, imgWidth, imgHeight);
      
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

      // Télécharger le fichier
      pdf.save(`${filename}.pdf`);
      // console.log('PDF généré avec succès');
      
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      return false;
    }
  }, []);

  const printDirect = useCallback(async (element: HTMLElement | null) => {
    if (!element) return false;
    try {
      // Créer une nouvelle fenêtre pour l'impression
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Impossible d\'ouvrir la fenêtre d\'impression');
      }

      // Cloner l'élément et ses styles
      const clonedElement = element.cloneNode(true) as HTMLElement;
      
      // Créer le contenu HTML pour l'impression
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Impression Stickers</title>
            <style>
              @page {
                margin: 0;
                size: A4;
              }
              
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
              }
              
              .print-container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                padding: 10mm;
                box-sizing: border-box;
              }
              
              /* Masquer les bordures et guides pour l'impression */
              .border-gray-400 {
                border: none !important;
              }
              
              .bg-gray-200 {
                display: none !important;
              }
              
              .border-gray-300 {
                border: 1px solid #000 !important;
              }
              
              /* Assurer que les couleurs sont imprimées */
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              ${clonedElement.outerHTML}
            </div>
          </body>
        </html>
      `;

      // Écrire le contenu dans la nouvelle fenêtre
      printWindow.document.write(printContent);
      printWindow.document.close();

      // Attendre que le contenu soit chargé puis imprimer
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      };

      return true;
    } catch (error) {
      console.error('Erreur lors de l\'impression:', error);
      return false;
    }
  }, []);

  return {
    exportToPDF,
    printDirect
  };
};
