import { useState } from 'react'

interface CollapsibleProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function Collapsible({ title, children, defaultOpen = true }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="collapsible">
      <button
        className="collapsible-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="collapsible-title">{title}</span>
        <span className={`collapsible-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  )
}

