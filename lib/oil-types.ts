// Type definitions for oil data

export interface ExportacionPais {
  rank: number;
  pais: string;
  produccion_bbl_d: number;
  reservas_probadas_MMM_bbl: number;
  poblacion_2024_mm: number;
  pib_petrolero_categoria: string;
}

export interface ProductorPais {
  rank: number;
  pais: string;
  produccion_bbl_d: number;
  produccion_mbbl_d: number;
  anos_produccion: number;
  reservas_probadas_MMM_bbl: number;
  poblacion_2024_mm: number;
  exportaciones_petroleras_categoria: string;
}

export interface OilData {
  metadata: any;
  datos: {
    exportaciones: ExportacionPais[];
    productores: ProductorPais[];
  };
  estadisticas: any;
  top10: any;
  paises: string[];
}

export interface FilterState {
  topRange: 'all' | 'top5' | 'top10' | 'top20';
  pibCategories: string[];
  selectedCountries: string[];
  selectedRegions: string[];
}

export const PIB_CATEGORIES = [
  '50', // Muy alta (40–60%)
  '35', // Alta (30–45%)
  '25', // Media-alta (20–30%)
  '15', // Media (10–20%)
  '7',  // Baja (5–10%)
  '3'   // Muy baja (<5%)
];

export const PIB_CATEGORY_LABELS: Record<string, string> = {
  '50': 'Muy alta (40–60%)',
  '35': 'Alta (30–45%)',
  '25': 'Media-alta (20–30%)',
  '15': 'Media (10–20%)',
  '7': 'Baja (5–10%)',
  '3': 'Muy baja (<5%)'
};

// Countries known to use fracking as a major extraction method
export const FRACKING_COUNTRIES = [
  'Estados Unidos',
  'Canadá',
  'China',
  'Argentina',
  'Rusia'
];
