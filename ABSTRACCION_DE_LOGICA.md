# 🧬 Abstracción de Lógica - Utilidades Centralizadas

## ✅ Estructura de Utilidades Creada

Se ha abstraído toda la lógica de cada herramienta en archivos de utilidades separados. Esto hace que los componentes sean mucho más limpios y fáciles de mantener.

```
src/utils/
├── index.ts                ← Índice de exportación (centralizado)
├── base64Utils.ts          ← Lógica de Base64
├── urlUtils.ts             ← Lógica de URL
├── jsonUtils.ts            ← Lógica de JSON
├── diffUtils.ts            ← Lógica de Diff
├── yamlUtils.ts            ← Lógica de YAML
├── hashUtils.ts            ← Lógica de Hash
└── base64Utils.ts          ← Utilidades originales (preservadas)
```

---

## 📚 Cada Utilidad Exporta:

### 🔐 **base64Utils.ts**
```tsx
// Funciones
- encodeToBase64(text: string): Base64Result
- decodeFromBase64(base64: string): Base64Result
- fileToBase64(file: File): Promise<Base64Result>
- downloadFromBase64(base64String: string, filename?: string): Base64Result
- base64ToImageSrc(base64String: string): Base64Result

// Tipo
- Base64Result { success, message, result? }
```

### 🔗 **urlUtils.ts**
```tsx
// Funciones
- encodeURL(url: string): URLResult
- decodeURL(encodedUrl: string): URLResult
- encodeURLWithPlus(url: string): URLResult
- decodeURLWithPlus(encodedUrl: string): URLResult
- formatURL(url: string): URLResult

// Tipo
- URLResult { success, message, result? }
```

### 📋 **jsonUtils.ts**
```tsx
// Funciones
- validateJSON(jsonString: string): JSONResult
- formatJSON(jsonString: string, indent?: number): JSONResult
- minifyJSON(jsonString: string): JSONResult
- jsonToCSV(jsonString: string): JSONResult
- getJSONStats(jsonString: string): JSONResult

// Tipo
- JSONResult { success, message, result?, data? }
```

### 📊 **diffUtils.ts**
```tsx
// Funciones
- calculateDiff(text1: string, text2: string): DiffResult
- formatDiffAsUnified(text1: string, text2: string): DiffResult
- getSimilarityStats(text1: string, text2: string): DiffResult

// Tipos
- DiffLine { type, text, index }
- DiffResult { success, message, diff?, stats? }
```

### 📝 **yamlUtils.ts**
```tsx
// Funciones
- validateYAML(yamlString: string): YAMLResult
- formatYAML(yamlString: string): YAMLResult
- minifyYAML(yamlString: string): YAMLResult
- yamlToJSON(yamlString: string, formatted?: boolean): YAMLResult
- yamlToProperties(yamlString: string, prefix?: string): YAMLResult
- jsonToYAML(jsonString: string): YAMLResult

// Tipo
- YAMLResult { success, message, result?, data? }
```

### 🔐 **hashUtils.ts**
```tsx
// Funciones
- hashMD5(text: string, salt?: string): HashResult
- hashSHA1(text: string, salt?: string): HashResult
- hashSHA256(text: string, salt?: string): HashResult
- hashSHA512(text: string, salt?: string): HashResult
- generateRandomSalt(length?: number): string
- isValidHex(hex: string): boolean
- isValidBase64(base64: string): boolean

// Tipo
- HashResult { success, message, hash? }
```

---

## 🎯 Cómo Usar en Componentes

### Ejemplo: Component Clean (ANTES - con lógica)
```tsx
function Base64TextTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
    } catch (error) {
      // manejo de error
    }
  }

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
    } catch (error) {
      // manejo de error
    }
  }

  return (
    // ... JSX complejo
  )
}
```

### Ejemplo: Component Clean (DESPUÉS - usando utilidades)
```tsx
import { encodeToBase64, decodeFromBase64 from '../utils'

function Base64TextTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState('')

  const handleEncode = () => {
    const result = encodeToBase64(input)
    setOutput(result.result || '')
    setMessage(result.message)
  }

  const handleDecode = () => {
    const result = decodeFromBase64(input)
    setOutput(result.result || '')
    setMessage(result.message)
  }

  return (
    // ... JSX mucho más limpio
  )
}
```

---

## ✨ Ventajas de Esta Estructura

### 1. **Componentes Limpios**
- Lógica separada en utilidades
- Solo 5-10 líneas de JSX por componente
- Fácil entender qué hace cada componente

### 2. **Reutilización de Código**
- Funciones usables desde cualquier lugar
- No repetir lógica en múltiples componentes
- Fácil mantener y actualizar

### 3. **Testing**
- Fácil testear funciones puras
- Separación de lógica y UI
- Tests independientes para utilidades

### 4. **Mantenimiento**
- Cambios centralizados
- Si algo falla, sabes dónde buscar
- Una sola fuente de verdad

### 5. **Performance**
- Funciones sin state
- Sin re-renders innecesarios
- Optimizable fácilmente

---

## 📦 Patrón de Resultado Unificado

Todas las utilidades retornan un objeto similar:

```tsx
interface Result {
  success: boolean        // ¿Fue exitoso?
  message: string         // Mensaje de error o éxito
  result?: string         // Resultado (string)
  data?: unknown          // Datos complejos (JSON, YAML, etc)
}
```

**Ventaja:** Manejo de errores consistente en todos lados

```tsx
const result = validateJSON(jsonString)

if (result.success) {
  console.log('✅', result.message)
  console.log('Datos:', result.data)
} else {
  console.error('❌', result.message)
}
```

---

## 🚀 Ejemplo Completo: Base64TextTool Refactorizado

### ANTES (con lógica):
```tsx
function Base64TextTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState('')

  const handleEncode = () => {
    try {
      if (!input.trim()) {
        setMessage('Por favor ingresa texto')
        return
      }
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
      setMessage('Texto codificado')
      setTimeout(() => setMessage(''), 2000)
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`)
    }
  }

  const handleDecode = () => {
    try {
      if (!input.trim()) {
        setMessage('Por favor ingresa Base64')
        return
      }
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
      setMessage('Texto decodificado')
      setTimeout(() => setMessage(''), 2000)
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`)
    }
  }

  return (
    <div className="card">
      <h2>Base64: Codificar ↔ Decodificar</h2>
      <div className="textarea-container">
        <label>Texto o Base64</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ingresa texto o Base64..."
        />
      </div>
      <div className="button-row">
        <button onClick={handleEncode}>Codificar</button>
        <button className="secondary" onClick={handleDecode}>
          Decodificar
        </button>
      </div>
      <textarea
        value={output}
        readOnly
        className="output-textarea"
        placeholder="El resultado aparecerá aquí..."
      />
      {message && (
        <div
          className={`status-message ${message.includes('Error') ? 'error' : 'success'}`}
        >
          {message}
        </div>
      )}
    </div>
  )
}
```

### DESPUÉS (solo lógica de UI):
```tsx
import { encodeToBase64, decodeFromBase64 } from '../utils'

function Base64TextTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState('')

  const handleEncode = () => {
    const result = encodeToBase64(input)
    setOutput(result.result || '')
    setMessage(result.message)
    setTimeout(() => setMessage(''), 2000)
  }

  const handleDecode = () => {
    const result = decodeFromBase64(input)
    setOutput(result.result || '')
    setMessage(result.message)
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div className="card">
      <h2>Base64: Codificar ↔ Decodificar</h2>
      <div className="textarea-container">
        <label>Texto o Base64</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ingresa texto o Base64..."
        />
      </div>
      <div className="button-row">
        <button onClick={handleEncode}>Codificar</button>
        <button className="secondary" onClick={handleDecode}>
          Decodificar
        </button>
      </div>
      <textarea
        value={output}
        readOnly
        className="output-textarea"
        placeholder="El resultado aparecerá aquí..."
      />
      {message && (
        <div
          className={`status-message ${message.includes('Error') ? 'error' : 'success'}`}
        >
          {message}
        </div>
      )}
    </div>
  )
}
```

**Diferencia:** ¡La lógica está en `base64Utils.ts`!

---

## 📊 Estructura de Código Resultante

```
Componente (UI & Interactividad)
    ↓
    imports utilidades desde utils/
    ↓
Utilidades (Lógica Pura)
    ↓
    retorna Result { success, message, result? }
    ↓
Componente (actualiza state con resultado)
    ↓
Render (UI)
```

---

## ✅ Próximo Paso

Ahora puedes refactorizar los componentes uno por uno para usar estas utilidades:

1. ✅ Utilidades creadas
2. ⏭️ Refactorizar Base64TextTool
3. ⏭️ Refactorizar Base64FileTool
4. ⏭️ Refactorizar URLEncoderDecoder
5. ⏭️ Refactorizar JSONTools
6. ⏭️ Refactorizar DiffChecker
7. ⏭️ Refactorizar YAMLValidator
8. ⏭️ Refactorizar YAMLToProperties
9. ⏭️ Refactorizar HashGenerator

---

## 🎉 Resultado Final

✅ Componentes limpios y enfocados
✅ Lógica centralizada y reutilizable
✅ Fácil de mantener
✅ Fácil de testear
✅ Código profesional

**¡Los componentes van a quedar mucho más limpios!** 🚀

