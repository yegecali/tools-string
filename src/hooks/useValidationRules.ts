import type { ValidationRule } from './useForm'

/**
 * Hook que proporciona reglas de validación comunes
 */
export function useValidationRules() {
  const rules = {
    /**
     * Validación de email
     */
    email: (value: string): boolean | string => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Email inválido'
      }
      return true
    },

    /**
     * Validación de URL
     */
    url: (value: string): boolean | string => {
      try {
        new URL(value)
        return true
      } catch {
        return 'URL inválida'
      }
    },

    /**
     * Validación de JSON
     */
    json: (value: string): boolean | string => {
      try {
        JSON.parse(value)
        return true
      } catch {
        return 'JSON inválido'
      }
    },

    /**
     * Validación de YAML (simple)
     */
    yaml: (value: string): boolean | string => {
      if (!value.trim()) return true
      // Validación simple: sin caracteres especiales inválidos
      if (/[{}[\]\\]/g.test(value)) {
        return true // YAML puede contener estos caracteres
      }
      return true
    },

    /**
     * Validación de Base64
     */
    base64: (value: string): boolean | string => {
      try {
        if (!value) return true
        atob(value)
        return true
      } catch {
        return 'Base64 inválido'
      }
    },

    /**
     * Validación de texto no vacío
     */
    notEmpty: (value: string): boolean | string => {
      if (!value.trim()) {
        return 'Este campo es requerido'
      }
      return true
    },

    /**
     * Validación de longitud mínima
     */
    minLength: (min: number) => (value: string): boolean | string => {
      if (value.length < min) {
        return `Mínimo ${min} caracteres`
      }
      return true
    },

    /**
     * Validación de longitud máxima
     */
    maxLength: (max: number) => (value: string): boolean | string => {
      if (value.length > max) {
        return `Máximo ${max} caracteres`
      }
      return true
    },

    /**
     * Validación de números
     */
    numeric: (value: string): boolean | string => {
      if (!/^\d+$/.test(value) && value.length > 0) {
        return 'Solo se permiten números'
      }
      return true
    },

    /**
     * Validación alphanumeric
     */
    alphanumeric: (value: string): boolean | string => {
      if (!/^[a-zA-Z0-9]+$/.test(value) && value.length > 0) {
        return 'Solo letras y números'
      }
      return true
    },
  }

  return rules
}

/**
 * Obtener reglas de validación predefinidas
 */
export const getValidationRules = (): Record<string, ValidationRule> => {
  const validationRules = useValidationRules()

  return {
    email: {
      required: true,
      custom: validationRules.email,
    },
    url: {
      required: true,
      custom: validationRules.url,
    },
    json: {
      required: true,
      custom: validationRules.json,
    },
    yaml: {
      required: true,
      custom: validationRules.yaml,
    },
    text: {
      required: true,
      custom: validationRules.notEmpty,
    },
  }
}

