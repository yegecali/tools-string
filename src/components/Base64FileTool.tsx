import { useState, useRef } from 'react'
import { fileToBase64, downloadFromBase64, base64ToImageSrc } from '../utils'
import { useForm } from '../hooks'
import { InputField, ButtonGroup, StatusMessage } from './shared'
import '../styles/index.css'

export default function Base64FileTool() {
  const [imagePreview, setImagePreview] = useState('')
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validationRules = {
    fileBase64: {
      required: false,
    },
  }

  const { values, handleChange, handleBlur } = useForm({ fileBase64: '' }, validationRules)

  const handleFileToBase64 = async () => {
    const file = fileInputRef.current?.files?.[0]
    if (!file) {
      setMessage('Por favor selecciona un archivo')
      return
    }
    const result = await fileToBase64(file)
    if (result.success) {
      handleChange({ target: { name: 'fileBase64', value: result.result || '' } } as any)
      setMessage(result.message)
      setTimeout(() => setMessage(''), 2000)
    } else {
      setMessage(result.message)
    }
  }

  const handleBase64ToFile = () => {
    if (!values.fileBase64.trim()) {
      setMessage('Por favor ingresa Base64 o data URL')
      return
    }
    const result = downloadFromBase64(values.fileBase64)
    setMessage(result.message)
    setTimeout(() => setMessage(''), 2000)
  }

  const handleShowImage = () => {
    if (!values.fileBase64.trim()) {
      setMessage('Por favor ingresa Base64 o data URL')
      return
    }
    const result = base64ToImageSrc(values.fileBase64)
    if (result.success) {
      setImagePreview(result.result || '')
      setMessage('')
    } else {
      setMessage(result.message)
    }
  }

  const buttons = [
    { label: 'Archivo → Base64 (data URL)', onClick: handleFileToBase64 },
    { label: 'Base64 → Descargar', onClick: handleBase64ToFile, style: { flex: 1 } },
    { label: 'Renderizar imagen', onClick: handleShowImage, style: { flex: 1 } },
  ]

  return (
    <div className="card">
      <h2>Base64: Archivo ↔ Base64</h2>
      <div className="mb-4">
        <label className="label">Seleccionar Archivo</label>
        <input ref={fileInputRef} type="file" className="input-field" />
      </div>
      <ButtonGroup buttons={buttons} />
      <p className="small-text">Pega Base64 (data:... o solo base64) en el textarea para decodificar o renderizar.</p>
      <InputField
        label="Base64 o Data URL"
        name="fileBase64"
        value={values.fileBase64}
        onChange={(val) => handleChange({ target: { name: 'fileBase64', value: val } } as any)}
        onBlur={handleBlur}
        placeholder="Base64 o data URL"
        type="textarea"
      />
      {imagePreview && (
        <div className="mt-3">
          <h3>Vista previa de imagen:</h3>
          <img src={imagePreview} alt="preview" className="image-preview" />
        </div>
      )}
      {message && <StatusMessage message={message} />}
    </div>
  )
}



