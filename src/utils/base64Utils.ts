/**
 * Utilidades para operaciones de Base64
 */

export interface Base64Result {
  success: boolean
  message: string
  result?: string
}

/**
 * Codificar texto a Base64
 */
export function encodeToBase64(text: string): Base64Result {
  try {
    if (!text.trim()) {
      return { success: false, message: 'Por favor ingresa texto' }
    }
    const encoded = btoa(unescape(encodeURIComponent(text)))
    return { success: true, message: 'Texto codificado', result: encoded }
  } catch (error) {
    return { success: false, message: `Error al codificar: ${(error as Error).message}` }
  }
}

/**
 * Decodificar Base64 a texto
 */
export function decodeFromBase64(base64: string): Base64Result {
  try {
    if (!base64.trim()) {
      return { success: false, message: 'Por favor ingresa Base64' }
    }
    const decoded = decodeURIComponent(escape(atob(base64)))
    return { success: true, message: 'Texto decodificado', result: decoded }
  } catch (error) {
    return { success: false, message: `Error al decodificar: ${(error as Error).message}` }
  }
}

/**
 * Convertir archivo a Base64 (solo base64, sin prefijo)
 */
export function fileToBase64(file: File): Promise<Base64Result> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      // Extraer solo la parte de base64, sin el prefijo data:...;base64,
      const base64 = dataUrl.split(',')[1] || dataUrl
      resolve({
        success: true,
        message: 'Archivo convertido a Base64',
        result: base64,
      })
    }
    reader.onerror = () => {
      resolve({
        success: false,
        message: 'Error al leer el archivo',
      })
    }
    reader.readAsDataURL(file)
  })
}

/**
 * Descargar archivo desde Base64
 */
export function downloadFromBase64(base64String: string, filename?: string): Base64Result {
  try {
    if (!base64String.trim()) {
      return { success: false, message: 'Por favor ingresa Base64 o data URL' }
    }

    let base64Data = base64String.trim()
    let mimeType = 'application/octet-stream'

    // Extraer MIME type si es data URL
    const dataUrlMatch = base64Data.match(/^data:([^;]+);base64,(.*)$/)
    if (dataUrlMatch) {
      mimeType = dataUrlMatch[1]
      base64Data = dataUrlMatch[2]
    }

    // Si es base64 puro, intentar detectar el tipo
    if (!dataUrlMatch) {
      // Intentar decodificar los primeros bytes para detectar el tipo
      try {
        const binaryString = atob(base64Data.substring(0, 100))
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }

        // Detectar por magic numbers
        const hex = Array.from(bytes.slice(0, 4))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('')
          .toUpperCase()

        if (hex.startsWith('89504E47')) mimeType = 'image/png'
        else if (hex.startsWith('FFD8FF')) mimeType = 'image/jpeg'
        else if (hex.startsWith('47494638')) mimeType = 'image/gif'
        else if (hex.startsWith('52494646') && hex.includes('57454250')) mimeType = 'image/webp'
        else if (hex.startsWith('25504446')) mimeType = 'application/pdf'
      } catch (e) {
        // Si no se puede detectar, usar default
      }
    }

    const binaryString = atob(base64Data)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    const arrayBuffer = new ArrayBuffer(bytes.length)
    const view = new Uint8Array(arrayBuffer)
    view.set(bytes)

    const blob = new Blob([arrayBuffer], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const ext = mimeType.split('/')[1] || 'bin'
    link.download = filename || `download.${ext}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    return { success: true, message: 'Archivo descargado' }
  } catch (error) {
    return { success: false, message: `Error al descargar: ${(error as Error).message}` }
  }
}

/**
 * Renderizar Base64 como imagen
 */
export function base64ToImageSrc(base64String: string): Base64Result {
  try {
    if (!base64String.trim()) {
      return { success: false, message: 'Por favor ingresa Base64 o data URL' }
    }

    let imageSrc = base64String.trim()
    if (!imageSrc.startsWith('data:')) {
      imageSrc = 'data:image/png;base64,' + imageSrc
    }

    return { success: true, message: '', result: imageSrc }
  } catch (error) {
    return { success: false, message: `Error al renderizar imagen: ${(error as Error).message}` }
  }
}

