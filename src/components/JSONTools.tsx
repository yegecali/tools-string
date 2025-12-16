import { useState, useRef } from 'react'
import { validateJSON, formatJSON, minifyJSON } from '../utils'
import { useForm, useCopyToClipboard } from '../hooks'
import { useThemeColors } from '../hooks/useThemeColors'
import { ButtonGroup, StatusMessage } from './shared'
import { FiCheck, FiCopy, FiZap, FiLayout } from 'react-icons/fi'
import '../styles/App.css'

export default function JSONTools() {
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState('')
  const [highlightLine, setHighlightLine] = useState<number | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { copy } = useCopyToClipboard()
  const { colors } = useThemeColors()

  const validationRules = {
    input: {
      required: true,
      custom: (value: string): boolean | string => {
        if (!value.trim()) {
          return 'Por favor ingresa JSON'
        }
        try {
          JSON.parse(value)
          return true
        } catch (e) {
          return `JSON inválido: ${(e as Error).message}`
        }
      },
    },
  }

  const { values, errors, handleChange, handleBlur } = useForm({ input: '' }, validationRules)

  const handleValidate = () => {
    const result = validateJSON(values.input)
    if (result.success) {
      setOutput('✓ JSON válido')
      setHighlightLine(null)
    } else {
      setOutput(`✗ JSON inválido\n\n${result.message}`)
      // Extraer número de línea del mensaje de error
      const match = result.message?.match(/line (\d+)/i) || (result.message as string)?.match(/línea (\d+)/i)
      if (match) {
        setHighlightLine(parseInt(match[1]))
      }
    }
    setMessage(result.message)
    setTimeout(() => setMessage(''), 2000)
  }

  const handleFormat = () => {
    if (errors.input) return
    const result = formatJSON(values.input)
    setOutput(result.result || '')
    setMessage(result.message)
    setHighlightLine(null)
    setTimeout(() => setMessage(''), 2000)
  }

  const handleMinify = () => {
    if (errors.input) return
    const result = minifyJSON(values.input)
    setOutput(result.result || '')
    setMessage(result.message)
    setHighlightLine(null)
    setTimeout(() => setMessage(''), 2000)
  }

  const handleCopy = async () => {
    if (output) {
      await copy(output)
      setMessage('Copiado al portapapeles')
      setTimeout(() => setMessage(''), 2000)
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    handleChange({
      target: { name: 'input', value }
    } as any)
    setHighlightLine(null)
  }

  const buttons = [
    { label: <><FiCheck size={16} /> Validar</>, onClick: handleValidate, variant: 'primary' as const },
    { label: <><FiLayout size={16} /> Formatear</>, onClick: handleFormat, disabled: !!errors.input, variant: 'info' as const },
    { label: <><FiZap size={16} /> Minificar</>, onClick: handleMinify, disabled: !!errors.input, variant: 'warning' as const },
    { label: <><FiCopy size={16} /> Copiar</>, onClick: handleCopy, variant: 'success' as const, disabled: !output },
  ]

  // Renderizar líneas numeradas
  const lines = values.input.split('\n')
  const isErrorLine = (lineNum: number) => highlightLine !== null && lineNum === highlightLine

  return (
    <div className="card">
      <h2>JSON: Validar / Formatear / Minificar</h2>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: colors.text.primary }}>
          Entrada JSON
        </label>
        <div style={{
          display: 'flex',
          border: `1px solid ${colors.border.main}`,
          borderRadius: '6px',
          overflow: 'hidden',
          backgroundColor: colors.background.secondary
        }}>
          {/* Line Numbers */}
          <div
            style={{
              backgroundColor: colors.background.tertiary,
              color: colors.text.secondary,
              padding: '12px 8px',
              fontSize: '12px',
              lineHeight: '1.5',
              minWidth: '40px',
              textAlign: 'right',
              userSelect: 'none',
              borderRight: `1px solid ${colors.border.main}`,
              fontFamily: 'monospace',
            }}
          >
            {lines.map((_, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: isErrorLine(idx + 1) ? colors.danger.main + '33' : 'transparent',
                  padding: '2px 4px',
                  borderRadius: '2px',
                  color: isErrorLine(idx + 1) ? colors.danger.main : colors.text.secondary,
                }}
              >
                {idx + 1}
              </div>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={values.input}
            onChange={handleTextareaChange}
            onBlur={handleBlur}
            placeholder="Pega JSON aquí"
            style={{
              flex: 1,
              padding: '12px',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: '1.5',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              minHeight: '200px',
              backgroundColor: colors.background.secondary,
              color: colors.text.primary,
            }}
          />
        </div>

        {/* Error Message */}
        {errors.input && (
          <div
            style={{
              marginTop: '8px',
              padding: '10px 12px',
              backgroundColor: colors.danger.main + '20',
              border: `1px solid ${colors.danger.main}`,
              borderRadius: '4px',
              color: colors.danger.main,
              fontSize: '13px',
            }}
          >
            {typeof errors.input === 'string' && (
              <>
                <strong>⚠️ Error:</strong> {errors.input}
                {highlightLine && (
                  <div style={{ marginTop: '6px', fontSize: '12px' }}>
                    ➜ Revisa la línea {highlightLine}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <ButtonGroup buttons={buttons} />
      <div className="code-output">{output}</div>
      {message && <StatusMessage message={message} />}
    </div>
  )
}

