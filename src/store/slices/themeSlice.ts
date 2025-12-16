import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark'

interface ThemeState {
  mode: Theme
}

const initialState: ThemeState = {
  mode: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.mode = action.payload
      localStorage.setItem('theme', action.payload)
      updateThemeInDOM(action.payload)
    },
    toggleTheme: (state) => {
      const newTheme = state.mode === 'light' ? 'dark' : 'light'
      state.mode = newTheme
      localStorage.setItem('theme', newTheme)
      updateThemeInDOM(newTheme)
    },
  },
})

function updateThemeInDOM(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer

