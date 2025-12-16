import { ExportacionPais, ProductorPais, FilterState } from './oil-types';
import { REGIONES } from './country-flags';

type ExportacionSortField = 'produccion_bbl_d' | 'reservas_probadas_MMM_bbl' | 'poblacion_2024_mm';
type ProductorSortField = 'produccion_bbl_d' | 'reservas_probadas_MMM_bbl' | 'poblacion_2024_mm' | 'anos_produccion';

/**
 * Apply filters to exportaciones data
 */
export function filterExportaciones(
  data: ExportacionPais[],
  filters: FilterState,
  sortBy: ExportacionSortField = 'produccion_bbl_d'
): ExportacionPais[] {
  let filtered = [...(data ?? [])];

  // Filter by PIB categories
  if (filters?.pibCategories?.length > 0) {
    filtered = filtered?.filter(item => 
      filters?.pibCategories?.includes(item?.pib_petrolero_categoria)
    ) ?? [];
  }

  // Filter by regions
  if (filters?.selectedRegions?.length > 0) {
    const countriesInSelectedRegions: string[] = [];
    filters?.selectedRegions?.forEach(region => {
      const regionCountries = REGIONES[region as keyof typeof REGIONES];
      if (regionCountries) {
        countriesInSelectedRegions.push(...regionCountries);
      }
    });
    filtered = filtered?.filter(item => 
      countriesInSelectedRegions?.includes(item?.pais)
    ) ?? [];
  }

  // Filter by selected countries
  if (filters?.selectedCountries?.length > 0) {
    filtered = filtered?.filter(item => 
      filters?.selectedCountries?.includes(item?.pais)
    ) ?? [];
  }

  // Sort by specified field descending
  filtered = filtered?.sort((a, b) => 
    (b?.[sortBy] ?? 0) - (a?.[sortBy] ?? 0)
  ) ?? [];

  // Apply top range filter AFTER sorting
  switch (filters?.topRange) {
    case 'top5':
      filtered = filtered?.slice(0, 5) ?? [];
      break;
    case 'top10':
      filtered = filtered?.slice(0, 10) ?? [];
      break;
    case 'top20':
      filtered = filtered?.slice(0, 20) ?? [];
      break;
    default:
      // 'all' - no slicing
      break;
  }

  return filtered ?? [];
}

/**
 * Apply filters to productores data
 */
export function filterProductores(
  data: ProductorPais[],
  filters: FilterState,
  sortBy: ProductorSortField = 'produccion_bbl_d'
): ProductorPais[] {
  let filtered = [...(data ?? [])];

  // Filter by regions
  if (filters?.selectedRegions?.length > 0) {
    const countriesInSelectedRegions: string[] = [];
    filters?.selectedRegions?.forEach(region => {
      const regionCountries = REGIONES[region as keyof typeof REGIONES];
      if (regionCountries) {
        countriesInSelectedRegions.push(...regionCountries);
      }
    });
    filtered = filtered?.filter(item => 
      countriesInSelectedRegions?.includes(item?.pais)
    ) ?? [];
  }

  // Filter by selected countries
  if (filters?.selectedCountries?.length > 0) {
    filtered = filtered?.filter(item => 
      filters?.selectedCountries?.includes(item?.pais)
    ) ?? [];
  }

  // Sort by specified field descending
  filtered = filtered?.sort((a, b) => 
    (b?.[sortBy] ?? 0) - (a?.[sortBy] ?? 0)
  ) ?? [];

  // Apply top range filter AFTER sorting
  switch (filters?.topRange) {
    case 'top5':
      filtered = filtered?.slice(0, 5) ?? [];
      break;
    case 'top10':
      filtered = filtered?.slice(0, 10) ?? [];
      break;
    case 'top20':
      filtered = filtered?.slice(0, 20) ?? [];
      break;
    default:
      // 'all' - no slicing
      break;
  }

  return filtered ?? [];
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number | undefined | null): string {
  if (num === undefined || num === null) return 'N/A';
  return num?.toLocaleString?.('en-US') ?? String(num);
}

/**
 * Format number to fixed decimals
 */
export function formatDecimal(num: number | undefined | null, decimals: number = 1): string {
  if (num === undefined || num === null) return 'N/A';
  return num?.toFixed?.(decimals) ?? String(num);
}

/**
 * Check if a country has missing data
 */
export function hasMissingData(item: ExportacionPais | ProductorPais): boolean {
  return (
    !item?.pais ||
    item?.produccion_bbl_d === undefined ||
    item?.produccion_bbl_d === null ||
    item?.produccion_bbl_d === 0
  );
}
