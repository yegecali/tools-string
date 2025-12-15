/**
 * Utilidades para operaciones de JSON
 */

export interface JSONResult {
  success: boolean
  message: string
  result?: string
  data?: unknown
}

/**
 * Validar JSON
 */
export function validateJSON(jsonString: string): JSONResult {
  try {
    if (!jsonString.trim()) {
      return { success: false, message: 'Por favor ingresa JSON' }
    }
    const parsed = JSON.parse(jsonString)
    return {
      success: true,
      message: '✅ JSON válido',
      data: parsed,
    }
  } catch (error) {
    const errorMsg = (error as Error).message
    return { success: false, message: `❌ Error JSON: ${errorMsg}` }
  }
}

/**
 * Formatear JSON con indentación
 */
export function formatJSON(jsonString: string, indent: number = 2): JSONResult {
  try {
    if (!jsonString.trim()) {
      return { success: false, message: 'Por favor ingresa JSON' }
    }
    const parsed = JSON.parse(jsonString)
    const formatted = JSON.stringify(parsed, null, indent)
    return { success: true, message: '✅ JSON formateado', result: formatted }
  } catch (error) {
    return { success: false, message: `❌ Error al formatear: ${(error as Error).message}` }
  }
}

/**
 * Minificar JSON (remover espacios innecesarios)
 */
export function minifyJSON(jsonString: string): JSONResult {
  try {
    if (!jsonString.trim()) {
      return { success: false, message: 'Por favor ingresa JSON' }
    }
    const parsed = JSON.parse(jsonString)
    const minified = JSON.stringify(parsed)
    return { success: true, message: '✅ JSON minificado', result: minified }
  } catch (error) {
    return { success: false, message: `❌ Error al minificar: ${(error as Error).message}` }
  }
}

/**
 * Convertir JSON a CSV
 */
export function jsonToCSV(jsonString: string): JSONResult {
  try {
    if (!jsonString.trim()) {
      return { success: false, message: 'Por favor ingresa JSON' }
    }
    const parsed = JSON.parse(jsonString)

    if (!Array.isArray(parsed)) {
      return { success: false, message: 'El JSON debe ser un array de objetos' }
    }

    if (parsed.length === 0) {
      return { success: false, message: 'El array está vacío' }
    }

    const headers = Object.keys(parsed[0])
    const csv =
      [headers.join(','), ...parsed.map((obj: Record<string, unknown>) => headers.map((h) => `"${obj[h]}"`).join(','))].join(
        '\n',
      )

    return { success: true, message: '✅ Convertido a CSV', result: csv }
  } catch (error) {
    return { success: false, message: `❌ Error: ${(error as Error).message}` }
  }
}

/**
 * Obtener estadísticas del JSON
 */
export function getJSONStats(jsonString: string): JSONResult {
  try {
    if (!jsonString.trim()) {
      return { success: false, message: 'Por favor ingresa JSON' }
    }
    const parsed = JSON.parse(jsonString)
    const stats = {
      tipo: Array.isArray(parsed) ? 'Array' : typeof parsed,
      elementos: Array.isArray(parsed) ? parsed.length : 'N/A',
      propiedades: typeof parsed === 'object' ? Object.keys(parsed).length : 'N/A',
      tamaño: `${jsonString.length} caracteres`,
      tamañoMinificado: `${JSON.stringify(parsed).length} caracteres`,
    }
    return {
      success: true,
      message: '✅ Estadísticas del JSON',
      result: JSON.stringify(stats, null, 2),
    }
  } catch (error) {
    return { success: false, message: `❌ Error: ${(error as Error).message}` }
  }
}

