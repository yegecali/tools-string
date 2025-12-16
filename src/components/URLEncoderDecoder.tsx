import { useState } from 'react'
import { encodeURL, decodeURL, encodeURLWithPlus } from '../utils'
import { useForm, useCopyToClipboard } from '../hooks'
import { InputField, ButtonGroup, OutputDisplay, StatusMessage } from './shared'
import { FiArrowUp, FiArrowDown, FiPlus } from 'react-icons/fi'
import '../styles/App.css'

export default function URLEncoderDecoder() {
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState('')
  const { copy } = useCopyToClipboard()

  const validationRules = {
    input: {
      required: true,
      custom: (value: string): boolean | string => {
        if (!value.trim()) {
          return 'Por favor ingresa una URL o texto'
        }
        return true
      },
    },
  }

  const { values, errors, handleChange, handleBlur } = useForm({ input: '' }, validationRules)

  const handleEncode = () => {
    if (errors.input) return
    const result = encodeURL(values.input)
    setOutput(result.result || '')
    setMessage(result.message)
  }

  const handleDecode = () => {
    if (errors.input) return
    const result = decodeURL(values.input)
    setOutput(result.result || '')
    setMessage(result.message)
  }

  const handleEncodeWithPlusFn = () => {
    if (errors.input) return
    const result = encodeURLWithPlus(values.input)
    setOutput(result.result || '')
    setMessage(result.message)
  }

  const buttons = [
    { label: <><FiArrowUp size={16} /> Encode</>, onClick: handleEncode, disabled: !!errors.input, variant: 'primary' as const },
    {
      label: <><FiArrowDown size={16} /> Decode</>,
      onClick: handleDecode,
      disabled: !!errors.input,
      variant: 'info' as const,
    },
    {
      label: <><FiPlus size={16} /> Encode +</>,
      onClick: handleEncodeWithPlusFn,
      disabled: !!errors.input,
      variant: 'warning' as const,
    },
  ]

  return (
    <div className="card">
      <h2>URL Encode / Decode</h2>
      <InputField
        label="Entrada"
        name="input"
        value={values.input}
        onChange={(val) => handleChange({ target: { name: 'input', value: val } } as any)}
        onBlur={handleBlur}
        placeholder="Texto o URL a codificar/decodificar"
        type="textarea"
        error={errors.input}
      />
      <ButtonGroup buttons={buttons} />
      {output && <OutputDisplay content={output} onCopy={() => copy(output)} />}
      {message && <StatusMessage message={message} />}
    </div>
  )
}

