import { useState } from 'react'
import { validateJSON, formatJSON, minifyJSON } from '../utils'
import { useForm, useCopyToClipboard } from '../hooks'
import { InputField, ButtonGroup, StatusMessage } from './shared'
import { FiCheck, FiCopy, FiZap, FiLayout } from 'react-icons/fi'
import '../styles/App.css'

export default function JSONTools() {
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState('')
  const { copy } = useCopyToClipboard()

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
    } else {
      setOutput(`✗ JSON inválido\n\n${result.message}`)
    }
    setMessage(result.message)
    setTimeout(() => setMessage(''), 2000)
  }

  const handleFormat = () => {
    if (errors.input) return
    const result = formatJSON(values.input)
    setOutput(result.result || '')
    setMessage(result.message)
    setTimeout(() => setMessage(''), 2000)
  }

  const handleMinify = () => {
    if (errors.input) return
    const result = minifyJSON(values.input)
    setOutput(result.result || '')
    setMessage(result.message)
    setTimeout(() => setMessage(''), 2000)
  }

  const handleCopy = async () => {
    if (output) {
      await copy(output)
      setMessage('Copiado al portapapeles')
      setTimeout(() => setMessage(''), 2000)
    }
  }

  const buttons = [
    { label: <><FiCheck size={16} /> Validar</>, onClick: handleValidate, variant: 'primary' as const },
    { label: <><FiLayout size={16} /> Formatear</>, onClick: handleFormat, disabled: !!errors.input, variant: 'info' as const },
    { label: <><FiZap size={16} /> Minificar</>, onClick: handleMinify, disabled: !!errors.input, variant: 'warning' as const },
    { label: <><FiCopy size={16} /> Copiar</>, onClick: handleCopy, variant: 'success' as const, disabled: !output },
  ]

  return (
    <div className="card">
      <h2>JSON: Validar / Formatear / Minificar</h2>
      <InputField
        label="Entrada JSON"
        name="input"
        value={values.input}
        onChange={(val) => handleChange({ target: { name: 'input', value: val } } as any)}
        onBlur={handleBlur}
        placeholder="Pega JSON aquí"
        type="textarea"
        error={errors.input}
      />
      <ButtonGroup buttons={buttons} />
      <div className="code-output">{output}</div>
      {message && <StatusMessage message={message} />}
    </div>
  )
}

