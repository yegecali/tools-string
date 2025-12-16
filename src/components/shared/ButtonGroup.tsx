import type { ReactNode } from 'react'
import { useThemeColors } from '../../hooks/useThemeColors'

interface Button {
  label: ReactNode
  onClick: () => void | Promise<void>
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
  disabled?: boolean
}

interface ButtonGroupProps {
  buttons: Button[]
}

export function ButtonGroup({ buttons }: ButtonGroupProps) {
  const { colors } = useThemeColors()

  const getButtonStyle = (variant: string = 'primary') => {
    const variantColors: Record<string, { bg: string; contrast: string }> = {
      primary: { bg: colors.primary.main, contrast: colors.primary.contrast },
      secondary: { bg: colors.secondary.main, contrast: colors.secondary.contrast },
      success: { bg: colors.success.main, contrast: colors.success.contrast },
      info: { bg: colors.info.main, contrast: colors.info.contrast },
      warning: { bg: colors.warning.main, contrast: colors.warning.contrast },
      danger: { bg: colors.danger.main, contrast: colors.danger.contrast },
    }

    return variantColors[variant] || variantColors.primary
  }

  return (
    <div className="flex gap-2 flex-wrap mt-3 mb-3">
      {buttons.map((btn, idx) => {
        const style = getButtonStyle(btn.variant)
        return (
          <button
            key={idx}
            onClick={btn.onClick}
            style={{
              backgroundColor: btn.disabled ? colors.text.disabled : style.bg,
              color: style.contrast,
              cursor: btn.disabled ? 'not-allowed' : 'pointer',
              opacity: btn.disabled ? 0.6 : 1,
            }}
            className="flex-1 min-w-24 px-4 py-2 rounded font-medium hover:opacity-90 transition-opacity disabled:hover:opacity-60"
            disabled={btn.disabled}
          >
            {btn.label}
          </button>
        )
      })}
    </div>
  )
}

