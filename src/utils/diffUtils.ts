/**
 * Utilidades para operaciones de Diff (Comparador de textos)
 */

export interface DiffLine {
  type: 'equal' | 'added' | 'removed'
  text: string
  index: number
}

export interface DiffResult {
  success: boolean
  message: string
  diff?: DiffLine[]
  stats?: {
    totalLines: number
    added: number
    removed: number
    equal: number
    similarity: number
  }
}

/**
 * Calcular diferencias entre dos textos (línea por línea)
 */
export function calculateDiff(text1: string, text2: string): DiffResult {
  try {
    const lines1 = text1.split('\n')
    const lines2 = text2.split('\n')
    const diff: DiffLine[] = []

    const maxLines = Math.max(lines1.length, lines2.length)
    let added = 0
    let removed = 0
    let equal = 0

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || ''
      const line2 = lines2[i] || ''

      if (line1 === line2) {
        diff.push({ type: 'equal', text: line1, index: i })
        equal++
      } else {
        if (line1) {
          diff.push({ type: 'removed', text: line1, index: i })
          removed++
        }
        if (line2) {
          diff.push({ type: 'added', text: line2, index: i })
          added++
        }
      }
    }

    const similarity = Math.round((equal / maxLines) * 100)

    return {
      success: true,
      message: '✅ Comparación completada',
      diff,
      stats: {
        totalLines: maxLines,
        added,
        removed,
        equal,
        similarity,
      },
    }
  } catch (error) {
    return {
      success: false,
      message: `❌ Error al comparar: ${(error as Error).message}`,
    }
  }
}

/**
 * Convertir diff a formato unificado (tipo git diff)
 */
export function formatDiffAsUnified(text1: string, text2: string): DiffResult {
  try {
    const lines1 = text1.split('\n')
    const lines2 = text2.split('\n')
    const diff: DiffLine[] = []
    let result = '--- original\n+++ modificado\n'

    const maxLines = Math.max(lines1.length, lines2.length)

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || ''
      const line2 = lines2[i] || ''

      if (line1 === line2) {
        diff.push({ type: 'equal', text: line1, index: i })
        result += ` ${line1}\n`
      } else {
        if (line1) {
          diff.push({ type: 'removed', text: line1, index: i })
          result += `-${line1}\n`
        }
        if (line2) {
          diff.push({ type: 'added', text: line2, index: i })
          result += `+${line2}\n`
        }
      }
    }

    return {
      success: true,
      message: '✅ Diff formateado',
      diff,
    }
  } catch (error) {
    return {
      success: false,
      message: `❌ Error: ${(error as Error).message}`,
    }
  }
}

/**
 * Obtener estadísticas de similitud
 */
export function getSimilarityStats(text1: string, text2: string): DiffResult {
  const diffResult = calculateDiff(text1, text2)

  if (!diffResult.success || !diffResult.stats) {
    return diffResult
  }

  return {
    success: true,
    message: `✅ Similitud: ${diffResult.stats.similarity}%`,
    stats: diffResult.stats,
  }
}

