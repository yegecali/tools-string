import { useThemeColors } from '../../hooks/useThemeColors'
import { FiCopy } from 'react-icons/fi'

interface OutputDisplayProps {
  content: string
  copyLabel?: string
  onCopy: (text: string) => void
}

export function OutputDisplay({
  content,
  copyLabel = 'Copiar',
  onCopy,
}: OutputDisplayProps) {
  const { colors } = useThemeColors()

  return (
    <div className="mt-3">
      <div
        style={{
          backgroundColor: colors.surface.default,
          color: colors.text.primary,
          borderColor: colors.border.main,
        }}
        className="p-3 rounded-md font-mono text-xs break-all min-h-20 mb-2 border"
      >
        {content}
      </div>
      <button
        onClick={() => onCopy(content)}
        style={{
          backgroundColor: colors.success.main,
          color: colors.success.contrast,
        }}
        className="px-4 py-2 rounded font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
      >
        <FiCopy size={16} />
        {copyLabel}
      </button>
    </div>
  )
}

