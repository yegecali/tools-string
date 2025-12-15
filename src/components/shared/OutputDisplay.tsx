interface OutputDisplayProps {
  content: string
  backgroundColor?: string
  copyLabel?: string
  onCopy: (text: string) => void
}

export function OutputDisplay({
  content,
  backgroundColor = '#f5f5f5',
  copyLabel = '📋 Copiar',
  onCopy,
}: OutputDisplayProps) {
  const bgClasses = backgroundColor === '#f0f0f0' ? 'bg-gray-100' : 'bg-gray-50'

  return (
    <div className="mt-3">
      <div className={`${bgClasses} p-3 rounded-md font-mono text-xs break-all min-h-20 mb-2 border border-gray-300`}>
        {content}
      </div>
      <button onClick={() => onCopy(content)} className="btn btn-success">
        {copyLabel}
      </button>
    </div>
  )
}

