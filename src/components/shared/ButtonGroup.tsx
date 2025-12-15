import type { CSSProperties } from 'react'

interface Button {
  label: string
  onClick: () => void
  style?: CSSProperties
  disabled?: boolean
}

interface ButtonGroupProps {
  buttons: Button[]
}

export function ButtonGroup({ buttons }: ButtonGroupProps) {
  const getButtonClasses = (style?: CSSProperties): string => {
    let classes = 'btn flex-1 min-w-24'

    if (style?.backgroundColor === '#999') classes += ' btn-secondary'
    else if (style?.backgroundColor === '#28a745') classes += ' btn-success'
    else if (style?.backgroundColor === '#17a2b8') classes += ' btn-info'
    else if (style?.backgroundColor === '#ffc107') classes += ' bg-yellow-500 hover:bg-yellow-600'
    else if (style?.backgroundColor === '#667eea') classes += ' bg-blue-600 hover:bg-blue-700'

    return classes
  }

  return (
    <div className="flex gap-2 flex-wrap mt-3 mb-3">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className={getButtonClasses(btn.style)}
          disabled={btn.disabled}
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}

