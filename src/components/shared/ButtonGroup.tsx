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
    const variantColors: Record<string, { bg: string; contrast: string; hover: string }> = {
      primary: { bg: colors.primary.main, contrast: colors.primary.contrast, hover: '#0056b3' },
      secondary: { bg: colors.secondary.main, contrast: colors.secondary.contrast, hover: '#5a6268' },
      success: { bg: colors.success.main, contrast: colors.success.contrast, hover: '#218838' },
      info: { bg: colors.info.main, contrast: colors.info.contrast, hover: '#0c5460' },
      warning: { bg: colors.warning.main, contrast: colors.warning.contrast, hover: '#e0a800' },
      danger: { bg: colors.danger.main, contrast: colors.danger.contrast, hover: '#c82333' },
    }

    return variantColors[variant] || variantColors.primary
  }

  return (
    <div className="flex gap-3 flex-wrap mt-4 mb-4">
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
              border: `2px solid ${btn.disabled ? colors.text.disabled : style.bg}`,
              boxShadow: !btn.disabled ? `0 2px 8px rgba(0, 0, 0, 0.15)` : 'none',
              transform: 'translateY(0)',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '0.5px',
            }}
            className="flex-1 min-w-32 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:opacity-95 transition-all duration-200 disabled:hover:opacity-60 active:transform active:scale-95 flex items-center justify-center gap-2"
            disabled={btn.disabled}
            onMouseEnter={(e) => {
              if (!btn.disabled) {
                e.currentTarget.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.2)`
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseLeave={(e) => {
              if (!btn.disabled) {
                e.currentTarget.style.boxShadow = `0 2px 8px rgba(0, 0, 0, 0.15)`
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            {btn.label}
          </button>
        )
      })}
    </div>
  )
}

