import { useState } from 'react'
import { generateHash, generateRandomSalt } from '../utils'
import { InputField, ButtonGroup, HashResultItem } from './shared'
import '../styles/index.css'

interface HashResultDisplay {
  algorithm: string
  input: string
  hex: string
  base64: string
}

function HashGenerator() {
  const [input, setInput] = useState('')
  const [salt, setSalt] = useState('')
  const [results, setResults] = useState<HashResultDisplay[]>([])

  const handleGenerateHash = (algorithm: 'MD5' | 'SHA1' | 'SHA256' | 'SHA512') => {
    const result = generateHash(input, algorithm, salt)

    if (result.success && result.hash) {
      const newResult: HashResultDisplay = {
        algorithm: result.hash.algorithm,
        input: result.hash.input,
        hex: result.hash.hex,
        base64: result.hash.base64,
      }
      setResults([newResult, ...results])
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const clearAll = () => {
    setInput('')
    setSalt('')
    setResults([])
  }

  const handleGenerateRandomSalt = () => {
    setSalt(generateRandomSalt())
  }

  const hashButtons = [
    {
      label: 'MD5',
      onClick: () => handleGenerateHash('MD5'),
      style: { backgroundColor: '#667eea', color: 'white' },
    },
    {
      label: 'SHA1',
      onClick: () => handleGenerateHash('SHA1'),
      style: { backgroundColor: '#667eea', color: 'white' },
    },
    {
      label: 'SHA256',
      onClick: () => handleGenerateHash('SHA256'),
      style: { backgroundColor: '#667eea', color: 'white' },
    },
    {
      label: 'SHA512',
      onClick: () => handleGenerateHash('SHA512'),
      style: { backgroundColor: '#667eea', color: 'white' },
    },
    {
      label: '✕ Limpiar',
      onClick: clearAll,
      style: { backgroundColor: '#999' },
    },
  ]

  return (
    <div className="card">
      <h2>🔐 Hash Generator</h2>
      <p className="small-text">Genera hashes con salida en Hexadecimal y Base64</p>

      <InputField
        label="Texto a Hashear"
        name="input"
        value={input}
        onChange={setInput}
        placeholder="Ingresa el texto que deseas hashear..."
        type="textarea"
        minHeight="120px"
      />

      <div className="mb-4">
        <label className="label">Salt (Opcional)</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={salt}
            onChange={(e) => setSalt(e.target.value)}
            placeholder="Agregue sal para mayor seguridad..."
            className="input-field flex-1"
          />
          <button
            onClick={handleGenerateRandomSalt}
            className="btn btn-info whitespace-nowrap"
          >
            🎲 Generar
          </button>
        </div>
      </div>

      <ButtonGroup buttons={hashButtons} />

      {results.length > 0 && (
        <div className="mt-4">
          <h3>Resultados:</h3>
          <div className="max-h-96 overflow-y-auto">
            {results.map((result, idx) => (
              <HashResultItem
                key={idx}
                algorithm={result.algorithm}
                hex={result.hex}
                base64={result.base64}
                withSalt={!!salt}
                onCopy={copyToClipboard}
              />
            ))}
          </div>
        </div>
      )}

      <div className="small-text mt-4 bg-gray-100 p-2 rounded">
        <strong>Nota:</strong> Los hashes se muestran en dos formatos:
        <br />
        • <strong>Hexadecimal:</strong> Formato estándar de hash
        <br />
        • <strong>Base64:</strong> Versión codificada en Base64
        <br />
        {salt && <strong>• Se está usando Salt (más seguro)</strong>}
      </div>
    </div>
  )
}

export default HashGenerator

