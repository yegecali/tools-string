import { useState, useRef } from 'react'
import { fileToBase64, downloadFromBase64 } from '../utils'
import { useForm } from '../hooks'
import { InputField, StatusMessage, Collapsible } from './shared'
import '../styles/index.css'

export default function Base64FileTool() {
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validationRules = {
    encodeBase64: {
      required: false,
    },
    decodeBase64: {
      required: false,
    },
  }

  const { values, handleChange, handleBlur } = useForm(
    { encodeBase64: '', decodeBase64: '' },
    validationRules
  )

  const handleFileToBase64 = async () => {
    const file = fileInputRef.current?.files?.[0]
    if (!file) {
      setMessage('Por favor selecciona un archivo')
      return
    }
    const result = await fileToBase64(file)
    if (result.success) {
      handleChange({ target: { name: 'encodeBase64', value: result.result || '' } } as any)
      setMessage(result.message)
      setTimeout(() => setMessage(''), 2000)
    } else {
      setMessage(result.message)
    }
  }

  const handleBase64ToFile = () => {
    if (!values.decodeBase64.trim()) {
      setMessage('Por favor ingresa Base64')
      return
    }
    const result = downloadFromBase64(values.decodeBase64)
    setMessage(result.message)
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div className="card">
      <h2>Base64: Archivo ↔ Base64</h2>

      <Collapsible title="📤 Encode - Archivo → Base64" defaultOpen={true}>
        <div className="collapsible-section">
          <div className="mb-4">
            <label className="label">Seleccionar Archivo</label>
            <input ref={fileInputRef} type="file" className="input-field" />
          </div>
          <button
            onClick={handleFileToBase64}
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            Encode
          </button>
          <InputField
            label="Base64 Resultado"
            name="encodeBase64"
            value={values.encodeBase64}
            onChange={(val) =>
              handleChange({ target: { name: 'encodeBase64', value: val } } as any)
            }
            onBlur={handleBlur}
            placeholder="El Base64 puro aparecerá aquí"
            type="textarea"
          />
        </div>
      </Collapsible>

      <Collapsible title="📥 Decode - Base64 → Archivo" defaultOpen={false}>
        <div className="collapsible-section">
          <InputField
            label="Base64 a Decodificar"
            name="decodeBase64"
            value={values.decodeBase64}
            onChange={(val) =>
              handleChange({ target: { name: 'decodeBase64', value: val } } as any)
            }
            onBlur={handleBlur}
            placeholder="Pega tu Base64 aquí"
            type="textarea"
          />
          <button
            onClick={handleBase64ToFile}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
          >
            Decode y Descargar
          </button>
        </div>
      </Collapsible>

      {message && <StatusMessage message={message} />}
    </div>
  )
}



