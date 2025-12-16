import { useThemeColors } from '../../hooks/useThemeColors'
import { FiCopy } from 'react-icons/fi'

interface HashResultItemProps {
  algorithm: string
  hex: string
  base64: string
  withSalt: boolean
  onCopy: (text: string) => void
}

export function HashResultItem({
  algorithm,
  hex,
  base64,
  withSalt,
  onCopy,
}: HashResultItemProps) {
  const { colors } = useThemeColors()

  return (
    <div
      style={{
        backgroundColor: colors.surface.default,
        borderColor: colors.border.main,
      }}
      className="border rounded-md p-3 mb-3"
    >
      <div className="flex justify-between items-center mb-2">
        <h4 style={{ color: colors.text.primary }} className="m-0">
          {algorithm}{' '}
          {withSalt && (
            <span style={{ color: colors.text.secondary }} className="text-xs ml-2">
              + Salt
            </span>
          )}
        </h4>
        <button
          onClick={() => onCopy(`${algorithm}\nHex: ${hex}\nBase64: ${base64}`)}
          style={{
            backgroundColor: colors.success.main,
            color: colors.success.contrast,
          }}
          className="text-xs px-2 py-1 rounded cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-1"
        >
          <FiCopy size={14} />
          Copiar Todo
        </button>
      </div>

      <div className="mb-2">
        <strong style={{ color: colors.text.primary }} className="text-sm">
          Hexadecimal:
        </strong>
        <div
          style={{
            backgroundColor: `${colors.info.main}20`,
            color: colors.text.primary,
          }}
          className="p-2 rounded text-xs font-mono break-all mt-1"
        >
          {hex}
        </div>
        <button
          onClick={() => onCopy(hex)}
          style={{
            backgroundColor: colors.info.main,
            color: colors.info.contrast,
          }}
          className="text-xs px-2 py-1 mt-1 rounded cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-1"
        >
          <FiCopy size={14} />
          Copiar Hex
        </button>
      </div>

      <div>
        <strong style={{ color: colors.text.primary }} className="text-sm">
          Base64:
        </strong>
        <div
          style={{
            backgroundColor: `${colors.primary.main}20`,
            color: colors.text.primary,
          }}
          className="p-2 rounded text-xs font-mono break-all mt-1"
        >
          {base64}
        </div>
        <button
          onClick={() => onCopy(base64)}
          style={{
            backgroundColor: colors.primary.main,
            color: colors.primary.contrast,
          }}
          className="text-xs px-2 py-1 mt-1 rounded cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-1"
        >
          <FiCopy size={14} />
          Copiar Base64
        </button>
      </div>
    </div>
  )
}

