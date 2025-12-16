import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { toggleTheme } from '../store/slices/themeSlice'
import { useThemeColors } from '../hooks/useThemeColors'
import { FiMoon, FiSun } from 'react-icons/fi'

export function ThemeToggle() {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.mode)
  const { colors } = useThemeColors()

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  const buttonStyle = {
    color: colors.text.primary,
    backgroundColor: `${colors.primary.main}20`,
    transition: 'all 0.3s ease-in-out',
  }

  return (
    <button
      onClick={handleToggle}
      style={buttonStyle}
      className="px-3 py-2 rounded transition-all duration-300 hover:opacity-90"
      title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  )
}

