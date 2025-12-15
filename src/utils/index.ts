/**
 * Índice de utilidades
 * Importa todas las funciones desde aquí para una fácil accesibilidad
 */

// Base64 utilities
export {
  encodeToBase64,
  decodeFromBase64,
  fileToBase64,
  downloadFromBase64,
  base64ToImageSrc,
  type Base64Result,
} from './base64Utils'

// URL utilities
export {
  encodeURL,
  decodeURL,
  encodeURLWithPlus,
  decodeURLWithPlus,
  formatURL,
  type URLResult,
} from './urlUtils'

// JSON utilities
export {
  validateJSON,
  formatJSON,
  minifyJSON,
  jsonToCSV,
  getJSONStats,
  type JSONResult,
} from './jsonUtils'

// Diff utilities
export {
  calculateDiff,
  formatDiffAsUnified,
  getSimilarityStats,
  type DiffLine,
  type DiffResult,
} from './diffUtils'

// YAML utilities
export {
  validateYAML,
  formatYAML,
  minifyYAML,
  yamlToJSON,
  yamlToProperties,
  jsonToYAML,
  type YAMLResult,
} from './yamlUtils'

// Hash utilities
export {
  hashMD5,
  hashSHA1,
  hashSHA256,
  hashSHA512,
  generateHash,
  generateRandomSalt,
  isValidHex,
  isValidBase64,
  type HashResult,
} from './hashUtils'

