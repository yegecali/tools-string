import { useState, useCallback } from 'react'

export interface UseCopyToClipboardResult {
  copy: (text: string) => Promise<boolean>
  copied: boolean
  error: string | null
}

/**
 * Hook para copiar texto al portapapeles
 */
export function useCopyToClipboard(): UseCopyToClipboardResult {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setError(null)

      // Resetear el estado después de 2 segundos
      setTimeout(() => {
        setCopied(false)
      }, 2000)

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al copiar'
      setError(errorMessage)
      return false
    }
  }, [])

  return { copy, copied, error }
}

