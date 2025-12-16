import { useSelector } from 'react-redux'
import { getTheme } from '../themes'
import type { RootState } from '../store/store'

export function useThemeColors() {
  const themeName = useSelector((state: RootState) => state.theme.theme)
  const theme = getTheme(themeName as 'dark' | 'light')

  return {
    themeName,
    colors: theme.colors,
    theme,
  }
}

