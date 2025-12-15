import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { toggleTheme } from '../store/slices/themeSlice'

export function ThemeToggle() {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.theme)

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <button
      onClick={handleToggle}
      className="px-3 py-2 rounded transition-colors duration-200 text-white hover:bg-white hover:bg-opacity-20"
      title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

