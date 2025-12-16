import { useState } from 'react'
import { diffChars, type Change } from 'diff'
import { useForm } from '../hooks'
import { useThemeColors } from '../hooks/useThemeColors'
import { ButtonGroup } from './shared'
import { FiSearch, FiX, FiCheck } from 'react-icons/fi'
import '../styles/index.css'

// Componente para textarea con numeración de líneas
function TextAreaWithLineNumbers({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  colors,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  placeholder: string
  colors: any
}) {
  const lines = value.split('\n')

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: colors.text.primary }}>
        {label}
      </label>
      <div
        style={{
          display: 'flex',
          border: `1px solid ${colors.border.main}`,
          borderRadius: '6px',
          overflow: 'hidden',
          backgroundColor: colors.background.secondary,
        }}
      >
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
            <div key={idx} style={{ padding: '2px 4px' }}>
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
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
    </div>
  )
}

function DiffChecker() {
  const [diffResult, setDiffResult] = useState<Change[]>([])
  const [stats, setStats] = useState<{ added: number; removed: number; equal: number; similarity: number } | null>(null)
  const { colors } = useThemeColors()

  const validationRules = {
    text1: { required: false },
    text2: { required: false },
  }

  const { values, handleChange, handleBlur, setFieldValue } = useForm({ text1: '', text2: '' }, validationRules)

  const handleCompareDiff = () => {
    const differences = diffChars(values.text1, values.text2)
    setDiffResult(differences)

    // Calcular estadísticas
    let addedChars = 0
    let removedChars = 0
    let equalChars = 0

    differences.forEach((change: Change) => {
      const charCount = change.value.length
      if (change.added) addedChars += charCount
      else if (change.removed) removedChars += charCount
      else equalChars += charCount
    })

    const total = addedChars + removedChars + equalChars
    const similarity = total > 0 ? Math.round(((total - addedChars - removedChars) / total) * 100) : 100

    setStats({ added: addedChars, removed: removedChars, equal: equalChars, similarity })
  }

  const clearDiff = () => {
    setDiffResult([])
    setStats(null)
    setFieldValue('text1', '')
    setFieldValue('text2', '')
  }

  const buttons = [
    { label: <><FiSearch size={16} /> Comparar</>, onClick: handleCompareDiff, variant: 'primary' as const },
    { label: <><FiX size={16} /> Limpiar</>, onClick: clearDiff, variant: 'secondary' as const },
  ]

  return (
    <div className="card">
      <h2>
        <FiSearch size={20} className="inline mr-2" />
        Diff Checker
      </h2>
      <p className="small-text">Compara dos textos y visualiza las diferencias</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextAreaWithLineNumbers
          label="Texto 1"
          value={values.text1}
          onChange={(val) => handleChange({ target: { name: 'text1', value: val } } as any)}
          onBlur={handleBlur}
          placeholder="Pega el primer texto aquí..."
          colors={colors}
        />
        <TextAreaWithLineNumbers
          label="Texto 2"
          value={values.text2}
          onChange={(val) => handleChange({ target: { name: 'text2', value: val } } as any)}
          onBlur={handleBlur}
          placeholder="Pega el segundo texto aquí..."
          colors={colors}
        />
      </div>

      <ButtonGroup buttons={buttons} />

      {stats && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px 16px',
            backgroundColor: colors.success.main + '20',
            border: `1px solid ${colors.success.main}`,
            borderRadius: '6px',
            color: colors.success.main,
            fontWeight: '600',
          }}
        >
          <FiCheck className="inline mr-2" size={16} />
          Similitud: {stats.similarity}% | Agregado: {stats.added} | Removido: {stats.removed}
        </div>
      )}

      {diffResult.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ color: colors.text.primary, marginBottom: '12px' }}>Resultado de la comparación (letra por letra):</h3>

          {/* 2 Columnas - Lado a Lado */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Texto 1 con cambios destacados */}
            <div>
              <h4 style={{ color: colors.text.primary, fontSize: '14px', marginBottom: '8px' }}>📄 Texto 1 (Original):</h4>
              <div
                style={{
                  backgroundColor: colors.background.secondary,
                  border: `1px solid ${colors.border.main}`,
                  borderRadius: '6px',
                  padding: '12px',
                  minHeight: '150px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {diffResult.map((change, idx) => {
                  if (change.removed) {
                    return (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: '#ffcccc',
                          color: '#d63031',
                          fontWeight: 'bold',
                          padding: '2px 4px',
                          borderRadius: '2px',
                        }}
                      >
                        {change.value}
                      </span>
                    )
                  } else if (!change.added) {
                    return (
                      <span key={idx} style={{ color: colors.text.primary }}>
                        {change.value}
                      </span>
                    )
                  }
                  return null
                })}
              </div>
            </div>

            {/* Texto 2 con cambios destacados */}
            <div>
              <h4 style={{ color: colors.text.primary, fontSize: '14px', marginBottom: '8px' }}>📄 Texto 2 (Modificado):</h4>
              <div
                style={{
                  backgroundColor: colors.background.secondary,
                  border: `1px solid ${colors.border.main}`,
                  borderRadius: '6px',
                  padding: '12px',
                  minHeight: '150px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {diffResult.map((change, idx) => {
                  if (change.added) {
                    return (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: '#ccffcc',
                          color: '#27ae60',
                          fontWeight: 'bold',
                          padding: '2px 4px',
                          borderRadius: '2px',
                        }}
                      >
                        {change.value}
                      </span>
                    )
                  } else if (!change.removed) {
                    return (
                      <span key={idx} style={{ color: colors.text.primary }}>
                        {change.value}
                      </span>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          </div>

          {/* Leyenda */}
          <p style={{ fontSize: '12px', marginTop: '12px', color: colors.text.secondary }}>
            <strong>Leyenda:</strong>{' '}
            <span style={{ backgroundColor: '#ffcccc', color: '#d63031', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px', marginRight: '8px' }}>
              ■ Removido
            </span>
            <span style={{ backgroundColor: '#ccffcc', color: '#27ae60', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px' }}>
              ■ Agregado
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

export default DiffChecker
