import { useState } from 'react'
import { calculateDiff } from '../utils'
import { useForm } from '../hooks'
import { InputField, ButtonGroup } from './shared'
import '../styles/index.css'

function DiffChecker() {
  const [diffResult, setDiffResult] = useState<Array<{ type: string; text: string; index: number }>>([])
  const [stats, setStats] = useState<{ added: number; removed: number; equal: number; similarity: number } | null>(null)

  const validationRules = {
    text1: {
      required: false,
    },
    text2: {
      required: false,
    },
  }

  const { values, handleChange, handleBlur } = useForm({ text1: '', text2: '' }, validationRules)

  const handleCompareDiff = () => {
    const result = calculateDiff(values.text1, values.text2)
    if (result.success && result.diff) {
      setDiffResult(result.diff)
      if (result.stats) {
        setStats(result.stats)
      }
    }
  }

  const clearDiff = () => {
    setDiffResult([])
    setStats(null)
  }

  const buttons = [
    { label: '🔍 Comparar', onClick: handleCompareDiff, style: { backgroundColor: '#667eea', color: 'white' } },
    { label: '✕ Limpiar', onClick: clearDiff, style: { backgroundColor: '#999' } },
  ]

  return (
    <div className="card">
      <h2>📊 Diff Checker</h2>
      <p className="small-text">Compara dos textos y visualiza las diferencias</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Texto 1"
          name="text1"
          value={values.text1}
          onChange={(val) => handleChange({ target: { name: 'text1', value: val } } as any)}
          onBlur={handleBlur}
          placeholder="Pega el primer texto aquí..."
          type="textarea"
          minHeight="200px"
        />
        <InputField
          label="Texto 2"
          name="text2"
          value={values.text2}
          onChange={(val) => handleChange({ target: { name: 'text2', value: val } } as any)}
          onBlur={handleBlur}
          placeholder="Pega el segundo texto aquí..."
          type="textarea"
          minHeight="200px"
        />
      </div>

      <ButtonGroup buttons={buttons} />

      {stats && (
        <div className="status-success mt-3">
          ✅ Similitud: {stats.similarity}% | Agregado: {stats.added} | Removido: {stats.removed}
        </div>
      )}

      {diffResult.length > 0 && (
        <div className="mt-4">
          <h3>Resultado de la comparación:</h3>
          <div className="bg-gray-100 border border-gray-300 rounded p-3 max-h-96 overflow-y-auto font-mono text-xs">
            {diffResult.map((item, idx) => (
              <div
                key={idx}
                className={`py-1 px-2 mb-0.5 whitespace-pre-wrap break-all ${
                  item.type === 'equal'
                    ? 'bg-transparent text-gray-900'
                    : item.type === 'added'
                      ? 'diff-added'
                      : 'diff-removed'
                }`}
              >
                <span className="font-bold mr-2">
                  {item.type === 'equal' ? '=' : item.type === 'added' ? '+' : '-'}
                </span>
                {item.text || '(línea vacía)'}
              </div>
            ))}
          </div>
          <p className="small-text mt-3">
            <strong>Leyenda:</strong> <span className="text-green-600">+ Agregado</span> |{' '}
            <span className="text-red-600">- Removido</span> | = Igual
          </p>
        </div>
      )}
    </div>
  )
}

export default DiffChecker

