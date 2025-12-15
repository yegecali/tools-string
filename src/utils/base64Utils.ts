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
 * Convertir archivo a Base64 (data URL)
 */
export function fileToBase64(file: File): Promise<Base64Result> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve({
        success: true,
        message: 'Archivo convertido a Base64',
        result: reader.result as string,
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

    let dataUrl = base64String.trim()
    let mimeType = 'application/octet-stream'

    // Extraer MIME type si es data URL
    const dataUrlMatch = dataUrl.match(/^data:([^;]+);base64,(.*)$/)
    if (dataUrlMatch) {
      mimeType = dataUrlMatch[1]
      dataUrl = dataUrlMatch[2]
    }

    const binaryString = atob(dataUrl)
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

