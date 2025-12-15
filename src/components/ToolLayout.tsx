import type { ReactNode } from 'react'
import '../App.css'

interface ToolLayoutProps {
  title: string
  description?: string
  children: ReactNode
  columns?: 1 | 2
}

function ToolLayout({ title, description, children, columns = 1 }: ToolLayoutProps) {
  const gridClass = columns === 2 ? 'grid-2' : 'grid-1'

  return (
    <div>
      <h1>{title}</h1>
      {description && <p style={{ color: '#666', marginBottom: '20px' }}>{description}</p>}
      <div className={gridClass}>
        {children}
      </div>
    </div>
  )
}

export default ToolLayout

