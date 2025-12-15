import type { ReactNode } from 'react'
import '../styles/App.css'

interface ToolLayoutProps {
  title: string
  description?: string
  children: ReactNode
  columns?: 1 | 2
}

function ToolLayout({ title, description, children, columns = 1 }: ToolLayoutProps) {
  const gridClasses = columns === 2 ? 'grid-2' : 'grid-1'

  return (
    <div className="content-container">
      <h1>{title}</h1>
      {description && <p className="small-text">{description}</p>}
      <div className={gridClasses}>{children}</div>
    </div>
  )
}

export default ToolLayout
