import { useState } from 'react'
import { encodeToBase64, decodeFromBase64 } from '../utils'
import { useForm, useCopyToClipboard } from '../hooks'
import { InputField, ButtonGroup, OutputDisplay, StatusMessage } from './shared'
import { FiArrowDown, FiArrowUp, FiCopy } from 'react-icons/fi'
import '../styles/App.css'

export default function Base64TextTool() {
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState('')
  const { copy } = useCopyToClipboard()

  const validationRules = {
    input: {
      required: true,
      custom: (value: string): boolean | string => {
        if (!value.trim()) {
          return 'Por favor ingresa texto'
        }
        return true
      },
    },
  }

  const { values, errors, handleChange, handleBlur } = useForm({ input: '' }, validationRules)

  const handleEncode = () => {
    if (errors.input) return
    const result = encodeToBase64(values.input)
    setOutput(result.result || '')
    setMessage(result.message)
    setTimeout(() => setMessage(''), 2000)
  }

  const handleDecode = () => {
    if (errors.input) return
    const result = decodeFromBase64(values.input)
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
    { label: <><FiArrowDown size={16} /> Codificar</>, onClick: handleEncode, disabled: !!errors.input, variant: 'primary' as const },
    { label: <><FiArrowUp size={16} /> Decodificar</>, onClick: handleDecode, disabled: !!errors.input, variant: 'info' as const },
    { label: <><FiCopy size={16} /> Copiar</>, onClick: handleCopy, variant: 'success' as const, disabled: !output },
  ]

  return (
    <div className="card">
      <h2>Base64: Texto ↔ Base64</h2>
      <InputField
        label="Entrada"
        name="input"
        value={values.input}
        onChange={(val) => handleChange({ target: { name: 'input', value: val } } as any)}
        onBlur={handleBlur}
        placeholder="Texto a codificar / pegar Base64 para decodificar"
        type="textarea"
        error={errors.input}
      />
      <ButtonGroup buttons={buttons} />
      <p className="small-text">Soporta UTF-8 correctamente.</p>
      {output && <OutputDisplay content={output} onCopy={() => copy(output)} />}
      {message && <StatusMessage message={message} />}
    </div>
  )
}

