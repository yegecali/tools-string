import { useState, useCallback } from 'react'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => boolean | string
}

export interface FieldError {
  [key: string]: string | null
}

export interface UseFormResult {
  values: Record<string, string>
  errors: FieldError
  touched: Record<string, boolean>
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (onSubmit: (values: Record<string, string>) => void) => (e: React.FormEvent) => void
  reset: () => void
  setFieldValue: (name: string, value: string) => void
  isValid: boolean
}

/**
 * Hook personalizado para manejo de formularios con validaciones
 * @param initialValues - Valores iniciales del formulario
 * @param validationRules - Reglas de validación por campo
 * @param onSubmit - Callback al enviar el formulario
 */
export function useForm(
  initialValues: Record<string, string>,
  validationRules: Record<string, ValidationRule> = {},
): UseFormResult {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<FieldError>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  /**
   * Validar un campo individual
   */
  const validateField = useCallback(
    (name: string, value: string): string | null => {
      const rules = validationRules[name]
      if (!rules) return null

      // Validar requerido
      if (rules.required && !value.trim()) {
        return `${name} es requerido`
      }

      // Validar longitud mínima
      if (rules.minLength && value.length < rules.minLength) {
        return `${name} debe tener al menos ${rules.minLength} caracteres`
      }

      // Validar longitud máxima
      if (rules.maxLength && value.length > rules.maxLength) {
        return `${name} no puede exceder ${rules.maxLength} caracteres`
      }

      // Validar patrón regex
      if (rules.pattern && !rules.pattern.test(value)) {
        return `${name} tiene formato inválido`
      }

      // Validación personalizada
      if (rules.custom) {
        const result = rules.custom(value)
        if (result !== true) {
          return typeof result === 'string' ? result : `${name} es inválido`
        }
      }

      return null
    },
    [validationRules],
  )

  /**
   * Manejar cambios en inputs
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setValues((prev) => ({ ...prev, [name]: value }))

      // Validar mientras se escribe si el campo fue tocado
      if (touched[name]) {
        const error = validateField(name, value)
        setErrors((prev) => ({ ...prev, [name]: error }))
      }
    },
    [touched, validateField],
  )

  /**
   * Manejar blur en inputs
   */
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setTouched((prev) => ({ ...prev, [name]: true }))

      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    },
    [validateField],
  )

  /**
   * Validar todos los campos
   */
  const validateAll = useCallback((): boolean => {
    const newErrors: FieldError = {}
    let isValid = true

    Object.keys(validationRules).forEach((name) => {
      const error = validateField(name, values[name] || '')
      newErrors[name] = error
      if (error) isValid = false
    })

    setErrors(newErrors)
    setTouched(
      Object.keys(validationRules).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {},
      ),
    )

    return isValid
  }, [validationRules, validateField, values])

  /**
   * Manejar envío de formulario
   */
  const handleSubmit = useCallback(
    (onSubmit: (values: Record<string, string>) => void) =>
      (e: React.FormEvent) => {
        e.preventDefault()
        if (validateAll()) {
          onSubmit(values)
        }
      },
    [values, validateAll],
  )

  /**
   * Resetear formulario
   */
  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  /**
   * Establecer valor de un campo
   */
  const setFieldValue = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  /**
   * Verificar si el formulario es válido
   */
  const isValid = Object.values(errors).every((error) => error === null)

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    isValid,
  }
}

