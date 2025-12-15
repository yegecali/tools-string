import { useState } from 'react'
import { validateYAML, formatYAML, minifyYAML } from '../utils'
import { useForm, useCopyToClipboard } from '../hooks'
import { InputField, ButtonGroup } from './shared'
import '../styles/index.css'

function YAMLValidator() {
  const [validationResult, setValidationResult] = useState<{
    valid: boolean
    message: string
    data?: unknown
  } | null>(null)
  const { copy } = useCopyToClipboard()

  const validationRules = {
    yamlInput: {
      required: true,
      custom: (value: string): boolean | string => {
        if (!value.trim()) {
          return 'Por favor ingresa YAML'
        }
        return true
      },
    },
  }

  const { values, errors, handleChange, handleBlur } = useForm({ yamlInput: '' }, validationRules)

  const handleValidateYAML = () => {
    if (errors.yamlInput) return
    const result = validateYAML(values.yamlInput)
    setValidationResult({
      valid: result.success,
      message: result.message,
      data: result.data,
    })
  }

  const handleFormatYAML = () => {
    if (errors.yamlInput) return
    const result = formatYAML(values.yamlInput)
    if (result.success && result.result) {
      handleChange({ target: { name: 'yamlInput', value: result.result } } as any)
    }
    setValidationResult({
      valid: result.success,
      message: result.message,
    })
  }

  const handleMinifyYAML = () => {
    if (errors.yamlInput) return
    const result = minifyYAML(values.yamlInput)
    if (result.success && result.result) {
      handleChange({ target: { name: 'yamlInput', value: result.result } } as any)
    }
    setValidationResult({
      valid: result.success,
      message: result.message,
    })
  }

  const buttons = [
    { label: '✓ Validar', onClick: handleValidateYAML, disabled: !!errors.yamlInput, style: { backgroundColor: '#667eea', color: 'white' } },
    { label: '🎨 Formatear', onClick: handleFormatYAML, disabled: !!errors.yamlInput, style: { backgroundColor: '#17a2b8', color: 'white' } },
    { label: '📦 Minificar', onClick: handleMinifyYAML, disabled: !!errors.yamlInput, style: { backgroundColor: '#ffc107' } },
    {
      label: '📋 Copiar',
      onClick: () => copy(values.yamlInput),
      style: { backgroundColor: '#28a745', color: 'white' },
    },
  ]

  return (
    <div className="card">
      <h2>📋 YAML Validator</h2>
      <p className="small-text">Valida, formatea y minifica archivos YAML</p>

      <InputField
        label="Contenido YAML"
        name="yamlInput"
        value={values.yamlInput}
        onChange={(val) => handleChange({ target: { name: 'yamlInput', value: val } } as any)}
        onBlur={handleBlur}
        placeholder={`# Ejemplo YAML
nombre: John
edad: 30
ciudad: Madrid
habilidades:
  - JavaScript
  - TypeScript
  - React`}
        type="textarea"
        minHeight="240px"
        error={errors.yamlInput}
      />

      <ButtonGroup buttons={buttons} />

      {validationResult && (
        <div
          className={`${validationResult.valid ? 'status-success' : 'status-error'} mt-3`}
        >
          {validationResult.message}
        </div>
      )}

      {validationResult?.valid && validationResult.data ? (
        <div className="mt-4">
          <h3>Estructura JSON:</h3>
          <pre className="code-output">
            {JSON.stringify(validationResult.data as Record<string, unknown>, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  )
}

export default YAMLValidator

