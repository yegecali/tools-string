/**
 * Utilidades para operaciones de YAML
 */

import YAML from 'js-yaml'

export interface YAMLResult {
  success: boolean
  message: string
  result?: string
  data?: unknown
}

/**
 * Validar YAML
 */
export function validateYAML(yamlString: string): YAMLResult {
  try {
    if (!yamlString.trim()) {
      return { success: false, message: 'Por favor ingresa YAML' }
    }
    const parsed = YAML.load(yamlString)
    return {
      success: true,
      message: '✅ YAML válido',
      data: parsed,
    }
  } catch (error) {
    const errorMsg = (error as Error).message
    return { success: false, message: `❌ Error: ${errorMsg}` }
  }
}

/**
 * Formatear YAML
 */
export function formatYAML(yamlString: string): YAMLResult {
  try {
    if (!yamlString.trim()) {
      return { success: false, message: 'Por favor ingresa YAML' }
    }
    const parsed = YAML.load(yamlString)
    const formatted = YAML.dump(parsed, { lineWidth: -1, indent: 2 })
    return {
      success: true,
      message: '✅ YAML formateado',
      result: formatted,
    }
  } catch (error) {
    return { success: false, message: `❌ Error al formatear: ${(error as Error).message}` }
  }
}

/**
 * Minificar YAML
 */
export function minifyYAML(yamlString: string): YAMLResult {
  try {
    if (!yamlString.trim()) {
      return { success: false, message: 'Por favor ingresa YAML' }
    }
    const parsed = YAML.load(yamlString)
    const minified = YAML.dump(parsed, { lineWidth: -1, indent: 1, condenseFlow: true })
    return {
      success: true,
      message: '✅ YAML minificado',
      result: minified,
    }
  } catch (error) {
    return { success: false, message: `❌ Error al minificar: ${(error as Error).message}` }
  }
}

/**
 * Convertir YAML a JSON
 */
export function yamlToJSON(yamlString: string, formatted: boolean = true): YAMLResult {
  try {
    if (!yamlString.trim()) {
      return { success: false, message: 'Por favor ingresa YAML' }
    }
    const parsed = YAML.load(yamlString)
    const json = formatted ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed)
    return {
      success: true,
      message: '✅ Convertido a JSON',
      result: json,
    }
  } catch (error) {
    return { success: false, message: `❌ Error: ${(error as Error).message}` }
  }
}

/**
 * Convertir YAML a application.properties
 */
export function yamlToProperties(yamlString: string, prefix: string = ''): YAMLResult {
  try {
    if (!yamlString.trim()) {
      return { success: false, message: 'Por favor ingresa YAML' }
    }

    const parsed = YAML.load(yamlString)
    const lines: string[] = []

    const flatten = (obj: unknown, key = ''): void => {
      if (obj === null || obj === undefined) {
        if (key) lines.push(`${key}=`)
        return
      }

      if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
        if (key) lines.push(`${key}=${obj}`)
        return
      }

      if (Array.isArray(obj)) {
        obj.forEach((item, idx) => {
          const arrayKey = key ? `${key}[${idx}]` : `[${idx}]`
          flatten(item, arrayKey)
        })
        return
      }

      if (typeof obj === 'object') {
        Object.entries(obj as Record<string, unknown>).forEach(([k, v]) => {
          const newKey = key ? `${key}.${k}` : k
          flatten(v, newKey)
        })
      }
    }

    flatten(parsed, prefix)
    const properties = lines.join('\n')

    return {
      success: true,
      message: '✅ Convertido a application.properties',
      result: properties,
    }
  } catch (error) {
    return { success: false, message: `❌ Error: ${(error as Error).message}` }
  }
}

/**
 * Convertir JSON a YAML
 */
export function jsonToYAML(jsonString: string): YAMLResult {
  try {
    if (!jsonString.trim()) {
      return { success: false, message: 'Por favor ingresa JSON' }
    }
    const parsed = JSON.parse(jsonString)
    const yaml = YAML.dump(parsed, { lineWidth: -1, indent: 2 })
    return {
      success: true,
      message: '✅ Convertido a YAML',
      result: yaml,
    }
  } catch (error) {
    return { success: false, message: `❌ Error: ${(error as Error).message}` }
  }
}

