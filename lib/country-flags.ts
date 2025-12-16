// Mapeo de nombres de países a códigos ISO 3166-1 alpha-2
// Usado para obtener banderas de flagcdn.com

export const COUNTRY_CODE_MAP: Record<string, string> = {
  'Alemania': 'de',
  'Angola': 'ao',
  'Arabia Saudita': 'sa',
  'Argelia': 'dz',
  'Argentina': 'ar',
  'Australia': 'au',
  'Azerbaiyán': 'az',
  'Bahréin': 'bh',
  'Brasil': 'br',
  'Brunéi': 'bn',
  'Canadá': 'ca',
  'Chad': 'td',
  'China': 'cn',
  'Colombia': 'co',
  'Congo (Rep. del Congo)': 'cg',
  'Ecuador': 'ec',
  'Egipto': 'eg',
  'Emiratos Árabes Unidos': 'ae',
  'Estados Unidos': 'us',
  'Francia': 'fr',
  'Gabón': 'ga',
  'Ghana': 'gh',
  'Guyana': 'gy',
  'India': 'in',
  'Indonesia': 'id',
  'Irak': 'iq',
  'Irán': 'ir',
  'Italia': 'it',
  'Kazajistán': 'kz',
  'Kuwait': 'kw',
  'Libia': 'ly',
  'Malasia': 'my',
  'México': 'mx',
  'Nigeria': 'ng',
  'Noruega': 'no',
  'Omán': 'om',
  'Pakistán': 'pk',
  'Perú': 'pe',
  'Qatar': 'qa',
  'Reino Unido': 'gb',
  'Rusia': 'ru',
  'Siria': 'sy',
  'Sudáfrica': 'za',
  'Sudán': 'sd',
  'Sudán del Sur': 'ss',
  'Tailandia': 'th',
  'Turkmenistán': 'tm',
  'Turquía': 'tr',
  'Venezuela': 've',
  'Vietnam': 'vn'
};

/**
 * Obtiene la URL de la bandera de un país desde flagcdn.com
 * @param pais - Nombre del país en español
 * @param size - Tamaño de la imagen (w20, w40, w80, w160, w320, w640, w1280, w2560)
 * @returns URL de la bandera o null si no se encuentra el código
 */
export function getFlagUrl(pais: string, size: 'w20' | 'w40' | 'w80' | 'w160' = 'w40'): string | null {
  const code = COUNTRY_CODE_MAP[pais];
  if (!code) return null;
  const baseUrl = 'https://flagcdn.com';
  return `${baseUrl}/${size}/${code}.png`;
}

/**
 * Obtiene el código ISO del país
 * @param pais - Nombre del país en español
 * @returns Código ISO de 2 letras o null
 */
export function getCountryCode(pais: string): string | null {
  return COUNTRY_CODE_MAP[pais] || null;
}

// Regiones geográficas para filtrado
export const REGIONES = {
  'Sur América': ['Argentina', 'Brasil', 'Colombia', 'Ecuador', 'Guyana', 'Perú', 'Venezuela'],
  'Norte América': ['Canadá', 'Estados Unidos', 'México'],
  'Medio Oriente': ['Arabia Saudita', 'Bahréin', 'Emiratos Árabes Unidos', 'Irak', 'Irán', 'Kuwait', 'Omán', 'Qatar', 'Siria'],
  'África': ['Angola', 'Argelia', 'Chad', 'Congo (Rep. del Congo)', 'Egipto', 'Gabón', 'Ghana', 'Libia', 'Nigeria', 'Sudáfrica', 'Sudán', 'Sudán del Sur'],
  'Asia': ['Azerbaiyán', 'Brunéi', 'China', 'India', 'Indonesia', 'Kazajistán', 'Malasia', 'Pakistán', 'Tailandia', 'Turkmenistán', 'Vietnam'],
  'Europa': ['Alemania', 'Francia', 'Italia', 'Noruega', 'Reino Unido', 'Rusia', 'Turquía'],
  'Oceanía': ['Australia']
} as const;

export type Region = keyof typeof REGIONES;

/**
 * Obtiene la región geográfica de un país
 * @param pais - Nombre del país en español
 * @returns Nombre de la región o null si no se encuentra
 */
export function getCountryRegion(pais: string): Region | null {
  for (const [region, paises] of Object.entries(REGIONES)) {
    if ((paises as readonly string[]).includes(pais)) {
      return region as Region;
    }
  }
  return null;
}