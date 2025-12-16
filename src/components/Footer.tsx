import { useThemeColors } from '../hooks/useThemeColors'
import { FiHeart } from 'react-icons/fi'

export function Footer() {
  const { colors } = useThemeColors()

  const footerStyle = {
    backgroundColor: colors.background.secondary,
    borderTopColor: colors.border.main,
    color: colors.text.primary,
  }


  return (
    <footer
      style={footerStyle}
      className="border-t mt-12 py-4 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Bottom - Minimal info */}
        <div style={{ borderTopColor: colors.border.main }} className=" mt-3 pt-3 flex justify-center">
          <p style={{ color: colors.text.secondary }} className="text-xs flex items-center gap-1">
            Hecho con
            <FiHeart className="inline" size={12} style={{ color: colors.danger.main }} />
            para devs | v1.0.0
          </p>
        </div>
      </div>
    </footer>
  )
}

