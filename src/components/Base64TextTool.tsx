import { useState } from 'react'
import { encodeToBase64, decodeFromBase64 } from '../utils'
import { useForm, useCopyToClipboard } from '../hooks'
import { InputField, ButtonGroup, OutputDisplay, StatusMessage } from './shared'
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
    { label: 'Codificar Base64', onClick: handleEncode, disabled: !!errors.input },
    { label: 'Decodificar Base64', onClick: handleDecode, disabled: !!errors.input, style: { flex: 1 } },
    { label: 'Copiar salida', onClick: handleCopy, style: { flex: 1 }, disabled: !output },
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

