import darkTheme from './dark.json'
import lightTheme from './light.json'

export type ThemeName = 'dark' | 'light'

export interface ColorVariant {
  main: string
  light: string
  dark: string
  contrast: string
}

export interface Theme {
  name: ThemeName
  colors: {
    primary: ColorVariant
    secondary: ColorVariant
    success: ColorVariant
    info: ColorVariant
    warning: ColorVariant
    danger: ColorVariant
    background: {
      primary: string
      secondary: string
      tertiary: string
    }
    text: {
      primary: string
      secondary: string
      disabled: string
    }
    border: {
      main: string
      light: string
      dark: string
    }
    surface: {
      default: string
      hover: string
      active: string
    }
  }
}

const themes: Record<ThemeName, Theme> = {
  dark: darkTheme as Theme,
  light: lightTheme as Theme,
}

export const getTheme = (themeName: ThemeName): Theme => {
  return themes[themeName]
}

export const getAllThemes = (): Record<ThemeName, Theme> => {
  return themes
}

export default themes

