import { useState } from 'react'
import { yamlToProperties } from '../utils'
import { useForm, useCopyToClipboard } from '../hooks'
import { InputField, ButtonGroup } from './shared'
import { FiRefreshCw, FiCopy, FiDownload, FiCheck } from 'react-icons/fi'
import '../styles/index.css'

function YAMLToProperties() {
  const [propertiesOutput, setPropertiesOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
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
    prefix: {
      required: false,
    },
  }

  const { values, errors, handleChange, handleBlur } = useForm(
    { yamlInput: '', prefix: 'app' },
    validationRules,
  )

  const handleConvertYAML = () => {
    if (errors.yamlInput) return
    const result = yamlToProperties(values.yamlInput, values.prefix)
    if (result.success) {
      setPropertiesOutput(result.result || '')
      setError(null)
    } else {
      setError(result.message)
      setPropertiesOutput('')
    }
  }

  const downloadProperties = () => {
    if (!propertiesOutput) return
    const element = document.createElement('a')
    const file = new Blob([propertiesOutput], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'application.properties'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const buttons = [
    {
      label: <><FiRefreshCw size={16} /> Convertir</>,
      onClick: handleConvertYAML,
      disabled: !!errors.yamlInput,
      variant: 'primary' as const,
    },
    {
      label: <><FiCopy size={16} /> Copiar</>,
      onClick: () => { copy(propertiesOutput) },
      variant: 'success' as const,
      disabled: !propertiesOutput,
    },
    {
      label: <><FiDownload size={16} /> Descargar</>,
      onClick: downloadProperties,
      variant: 'info' as const,
      disabled: !propertiesOutput,
    },
  ]

  return (
    <div className="card">
      <h2><FiRefreshCw size={20} className="inline mr-2" />YAML to application.properties</h2>
      <p className="small-text">Convierte configuración YAML a formato properties</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputField
            label="Contenido YAML"
            name="yamlInput"
            value={values.yamlInput}
            onChange={(val) => handleChange({ target: { name: 'yamlInput', value: val } } as any)}
            onBlur={handleBlur}
            placeholder={`spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db
    username: root
    password: secret
  jpa:
    hibernate:
      ddl-auto: update
server:
  port: 8080`}
            type="textarea"
            minHeight="240px"
            error={errors.yamlInput}
          />
        </div>

        <div>
          <div className="mb-4">
            <label className="label">application.properties</label>
            <textarea
              value={propertiesOutput}
              readOnly
              className="input-field bg-gray-200"
              style={{ minHeight: '240px' }}
              placeholder="La salida aparecerá aquí..."
            />
          </div>
        </div>
      </div>

      <InputField
        label="Prefijo de propiedades"
        name="prefix"
        value={values.prefix}
        onChange={(val) => handleChange({ target: { name: 'prefix', value: val } } as any)}
        onBlur={handleBlur}
        placeholder="Ej: app, spring, etc"
        type="text"
      />
      <small className="small-text">
        Si está vacío, no se agregará prefijo. Ej: "app" → "app.spring.datasource.url"
      </small>

      <ButtonGroup buttons={buttons} />

      {error && (
        <div className="status-error mt-3">
          {error}
        </div>
      )}

      {propertiesOutput && !error && (
        <div className="status-success mt-3">
          <FiCheck className="inline mr-2" size={16} />
          Conversión exitosa
        </div>
      )}
    </div>
  )
}

export default YAMLToProperties

