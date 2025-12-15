/**
 * Utilidades para operaciones de URL Encode/Decode
 */

export interface URLResult {
  success: boolean
  message: string
  result?: string
}

/**
 * Codificar URL (encodeURIComponent)
 */
export function encodeURL(url: string): URLResult {
  try {
    if (!url.trim()) {
      return { success: false, message: 'Por favor ingresa una URL' }
    }
    const encoded = encodeURIComponent(url)
    return { success: true, message: 'URL codificada', result: encoded }
  } catch (error) {
    return { success: false, message: `Error al codificar: ${(error as Error).message}` }
  }
}

/**
 * Decodificar URL
 */
export function decodeURL(encodedUrl: string): URLResult {
  try {
    if (!encodedUrl.trim()) {
      return { success: false, message: 'Por favor ingresa una URL codificada' }
    }
    const decoded = decodeURIComponent(encodedUrl)
    return { success: true, message: 'URL decodificada', result: decoded }
  } catch (error) {
    return { success: false, message: `Error al decodificar: ${(error as Error).message}` }
  }
}

/**
 * Codificar URL con espacios como +
 */
export function encodeURLWithPlus(url: string): URLResult {
  try {
    if (!url.trim()) {
      return { success: false, message: 'Por favor ingresa una URL' }
    }
    const encoded = encodeURIComponent(url).replace(/%20/g, '+')
    return { success: true, message: 'URL codificada (espacios como +)', result: encoded }
  } catch (error) {
    return { success: false, message: `Error al codificar: ${(error as Error).message}` }
  }
}

/**
 * Decodificar URL con +
 */
export function decodeURLWithPlus(encodedUrl: string): URLResult {
  try {
    if (!encodedUrl.trim()) {
      return { success: false, message: 'Por favor ingresa una URL codificada' }
    }
    const withPercent = encodedUrl.replace(/\+/g, '%20')
    const decoded = decodeURIComponent(withPercent)
    return { success: true, message: 'URL decodificada', result: decoded }
  } catch (error) {
    return { success: false, message: `Error al decodificar: ${(error as Error).message}` }
  }
}

/**
 * Formatear URL
 */
export function formatURL(url: string): URLResult {
  try {
    if (!url.trim()) {
      return { success: false, message: 'Por favor ingresa una URL' }
    }
    const parsed = new URL(url.startsWith('http') ? url : 'https://' + url)
    const formatted = parsed.toString()
    return { success: true, message: 'URL formateada', result: formatted }
  } catch (error) {
    return { success: false, message: `URL inválida: ${(error as Error).message}` }
  }
}

