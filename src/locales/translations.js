/**
 * Translation dictionaries for supported locales
 * Add new locales and translations as needed
 */

const translations = {
  'en': {
    'app_title': 'My Application',
    'home': 'Home',
    'about': 'About',
    'wildlife_camera_statistics': 'Wildlife Camera Statistics',
    'last_seen': 'Last Seen',
    'statistics_by_date': 'Statistics by Date',
    'loading_last_seen': 'Loading last seen data...',
    'loading_statistics': 'Loading statistics by date...',
    'no_last_seen_data': 'No last seen data available',
    'no_statistics_data': 'No date statistics available',
    'no_details_available': 'No details available',
    'images': 'images',
    'time': 'Time',
    'animal': 'Animal',
    'images_total': 'Images (total)',
    'tags_max': 'Tags (max)',
  },
  'en-US': {
    'app_title': 'My Application',
    'home': 'Home',
    'about': 'About',
    'wildlife_camera_statistics': 'Wildlife Camera Statistics',
    'last_seen': 'Last Seen',
    'statistics_by_date': 'Statistics by Date',
    'loading_last_seen': 'Loading last seen data...',
    'loading_statistics': 'Loading statistics by date...',
    'no_last_seen_data': 'No last seen data available',
    'no_statistics_data': 'No date statistics available',
    'no_details_available': 'No details available',
    'images': 'images',
    'time': 'Time',
    'animal': 'Animal',
    'images_total': 'Images (total)',
    'tags_max': 'Tags (max)',
  },
  'es': {
    'app_title': 'Mi Aplicación',
    'home': 'Inicio',
    'about': 'Acerca de',
    'wildlife_camera_statistics': 'Estadísticas de Cámara de Vida Silvestre',
    'last_seen': 'Visto por Última Vez',
    'statistics_by_date': 'Estadísticas por Fecha',
    'loading_last_seen': 'Cargando datos de última visualización...',
    'loading_statistics': 'Cargando estadísticas por fecha...',
    'no_last_seen_data': 'No hay datos de última visualización disponibles',
    'no_statistics_data': 'No hay estadísticas de fecha disponibles',
    'no_details_available': 'No hay detalles disponibles',
    'images': 'imágenes',
    'time': 'Hora',
    'animal': 'Animal',
    'images_total': 'Imágenes (total)',
    'tags_max': 'Etiquetas (máx)',
  },
  'es-ES': {
    'app_title': 'Mi Aplicación',
    'home': 'Inicio',
    'about': 'Acerca de',
    'wildlife_camera_statistics': 'Estadísticas de Cámara de Vida Silvestre',
    'last_seen': 'Visto por Última Vez',
    'statistics_by_date': 'Estadísticas por Fecha',
    'loading_last_seen': 'Cargando datos de última visualización...',
    'loading_statistics': 'Cargando estadísticas por fecha...',
    'no_last_seen_data': 'No hay datos de última visualización disponibles',
    'no_statistics_data': 'No hay estadísticas de fecha disponibles',
    'no_details_available': 'No hay detalles disponibles',
    'images': 'imágenes',
    'time': 'Hora',
    'animal': 'Animal',
    'images_total': 'Imágenes (total)',
    'tags_max': 'Etiquetas (máx)',
  },
};

/**
 * Get translations for a given locale
 * Falls back to base language (e.g., 'es' for 'es-ES') then to 'en'
 * @param {string} locale - The locale code (e.g., 'es-ES', 'en-US')
 * @returns {object} Translation dictionary
 */
export function getTranslations(locale) {
  // Try exact match
  if (translations[locale]) {
    return translations[locale];
  }
  
  // Try base language (es-ES -> es)
  const baseLocale = locale.split('-')[0];
  if (translations[baseLocale]) {
    return translations[baseLocale];
  }
  
  // Fallback to English
  return translations['en'];
}

/**
 * Get a specific translation by key
 * @param {string} locale - The locale code
 * @param {string} key - The translation key
 * @returns {string} Translated text
 */
export function translate(locale, key) {
  const dict = getTranslations(locale);
  return dict[key] || key;
}
