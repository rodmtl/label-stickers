export interface StickerData {
  id: string;
  name: string;
  icon: string;
  fontSize: number;
}

export interface StickerSheetConfig {
  rows: number;
  columns: number;
  stickerWidth: number; // en cm
  stickerHeight: number; // en cm
  sheetWidth: number; // en cm
  sheetHeight: number; // en cm
}

export interface ExportConfig {
  pageSize: 'A4' | 'A3' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
}

export interface AppState {
  stickers: StickerData[];
  config: StickerSheetConfig;
  defaultFontSize: number;
  selectedStickerId: string | null;
}
