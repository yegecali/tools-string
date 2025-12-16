import { useState } from 'react'
import { useForm, useCopyToClipboard } from '../hooks'
import { InputField, StatusMessage, Collapsible } from './shared'
import { FiDownload, FiCopy } from 'react-icons/fi'
import { useThemeColors } from '../hooks/useThemeColors'

export default function Base64ImageTool() {
  const [message, setMessage] = useState('')
  const [encodeOutput, setEncodeOutput] = useState('')
  const [decodePreview, setDecodePreview] = useState('')
  const { copy } = useCopyToClipboard()
  const { colors } = useThemeColors()

  const validationRules = {
    encodeInput: {
      required: false,
    },
    decodeInput: {
      required: false,
    },
  }

  const { values, handleChange, handleBlur, setFieldValue } = useForm(
    { encodeInput: '', decodeInput: '' },
    validationRules
  )

  // ==================== ENCODE ====================
  const handleFileToBase64 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setFieldValue('encodeInput', base64)
      setEncodeOutput(base64)
      setMessage('Archivo convertido a Base64')
      setTimeout(() => setMessage(''), 2000)
    }
    reader.readAsDataURL(file)
  }

  // ==================== DECODE ====================
  const handleDecodeImage = () => {
    if (!values.decodeInput.trim()) {
      setMessage('Por favor ingresa Base64')
      return
    }

    try {
      let base64 = values.decodeInput.trim()

      // Si no tiene el prefijo data:, agregarlo
      if (!base64.startsWith('data:')) {
        base64 = 'data:image/png;base64,' + base64
      }

      setDecodePreview(base64)
      setMessage('Imagen decodificada correctamente')
      setTimeout(() => setMessage(''), 2000)
    } catch (error) {
      setMessage('Error al decodificar la imagen')
      setTimeout(() => setMessage(''), 2000)
    }
  }

  const handleDownloadImage = () => {
    if (!decodePreview) {
      setMessage('Por favor decodifica una imagen primero')
      return
    }

    try {
      const link = document.createElement('a')
      link.href = decodePreview
      link.download = `imagen_${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setMessage('Imagen descargada')
      setTimeout(() => setMessage(''), 2000)
    } catch (error) {
      setMessage('Error al descargar la imagen')
      setTimeout(() => setMessage(''), 2000)
    }
  }

  const handleCopy = async () => {
    if (encodeOutput) {
      await copy(encodeOutput)
      setMessage('Copiado al portapapeles')
      setTimeout(() => setMessage(''), 2000)
    }
  }

  return (
    <div className="card">
      <h2 style={{ color: colors.text.primary }}>🖼️ Base64: Imagen ↔ Base64</h2>

      {/* ENCODE Section */}
      <Collapsible title="📤 Encode - Imagen → Base64" defaultOpen={true}>
        <div className="collapsible-section">
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                padding: '8px 16px',
                backgroundColor: colors.primary.main,
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'center',
                marginBottom: '8px',
              }}
            >
              📁 Seleccionar imagen
              <input
                type="file"
                accept="image/*"
                onChange={handleFileToBase64}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <InputField
            label="Base64 Resultado"
            name="encodeInput"
            type="textarea"
            value={values.encodeInput}
            onChange={(val) => handleChange({ target: { name: 'encodeInput', value: val } } as any)}
            onBlur={handleBlur}
            placeholder="El Base64 aparecerá aquí"
          />

          {encodeOutput && (
            <button
              onClick={handleCopy}
              style={{
                width: '100%',
                padding: '8px 16px',
                backgroundColor: colors.success.main,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '8px',
              }}
            >
              <FiCopy size={16} /> Copiar
            </button>
          )}
        </div>
      </Collapsible>

      {/* DECODE Section */}
      <Collapsible title="📥 Decode - Base64 → Imagen" defaultOpen={false}>
        <div className="collapsible-section">
          <InputField
            label="Base64 a Decodificar"
            name="decodeInput"
            type="textarea"
            value={values.decodeInput}
            onChange={(val) => handleChange({ target: { name: 'decodeInput', value: val } } as any)}
            onBlur={handleBlur}
            placeholder="Pega aquí el Base64 o data:image/..."
          />

          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              onClick={handleDecodeImage}
              style={{
                flex: 1,
                padding: '8px 16px',
                backgroundColor: colors.primary.main,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Decodificar
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={!decodePreview}
              style={{
                padding: '8px 16px',
                backgroundColor: !decodePreview ? colors.border.main : colors.success.main,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: !decodePreview ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <FiDownload size={16} /> Descargar
            </button>
          </div>

          {decodePreview && (
            <div
              style={{
                border: `2px solid ${colors.border.main}`,
                borderRadius: '8px',
                padding: '16px',
                marginTop: '16px',
              }}
            >
              <p style={{ color: colors.text.secondary, fontSize: '12px', marginBottom: '8px' }}>
                Vista previa:
              </p>
              <img
                src={decodePreview}
                alt="Vista previa"
                style={{
                  maxWidth: '100%',
                  maxHeight: '400px',
                  borderRadius: '6px',
                }}
              />
            </div>
          )}
        </div>
      </Collapsible>

      {message && <StatusMessage message={message} />}
    </div>
  )
}

