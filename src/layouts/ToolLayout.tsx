import type { ReactNode } from 'react'
import { useThemeColors } from '../hooks/useThemeColors'
import Navigation from '../components/Navigation'
import { Footer } from '../components/Footer'
import '../styles/App.css'

interface ToolLayoutProps {
  title: string
  description?: string
  children: ReactNode
  columns?: 1 | 2
}

function ToolLayout({ title, description, children, columns = 1 }: ToolLayoutProps) {
  const { colors } = useThemeColors()
  const gridClasses = columns === 2 ? 'grid-2' : 'grid-1'

  const mainStyle = {
    backgroundColor: colors.background.primary,
    color: colors.text.primary,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
  }

  return (
    <div style={mainStyle}>
      <Navigation />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 style={{ color: colors.text.primary }} className="text-4xl font-bold mb-2">
            {title}
          </h1>
          {description && (
            <p style={{ color: colors.text.secondary }} className="text-base mb-6">
              {description}
            </p>
          )}
          <div className={gridClasses}>{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ToolLayout


