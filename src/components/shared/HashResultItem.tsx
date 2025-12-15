interface HashResultItemProps {
  algorithm: string
  hex: string
  base64: string
  withSalt: boolean
  onCopy: (text: string) => void
}

export function HashResultItem({
  algorithm,
  hex,
  base64,
  withSalt,
  onCopy,
}: HashResultItemProps) {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded-md p-3 mb-3">
      <div className="flex justify-between items-center mb-2">
        <h4 className="m-0">
          {algorithm} {withSalt && <span className="text-xs text-gray-500 ml-2">+ Salt</span>}
        </h4>
        <button
          onClick={() => onCopy(`${algorithm}\nHex: ${hex}\nBase64: ${base64}`)}
          className="text-xs px-2 py-1 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700"
        >
          📋 Copiar Todo
        </button>
      </div>

      <div className="mb-2">
        <strong className="text-sm">Hexadecimal:</strong>
        <div className="bg-green-50 p-2 rounded text-xs font-mono break-all mt-1">
          {hex}
        </div>
        <button
          onClick={() => onCopy(hex)}
          className="text-xs px-2 py-1 mt-1 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
        >
          Copiar Hex
        </button>
      </div>

      <div>
        <strong className="text-sm">Base64:</strong>
        <div className="bg-blue-50 p-2 rounded text-xs font-mono break-all mt-1">
          {base64}
        </div>
        <button
          onClick={() => onCopy(base64)}
          className="text-xs px-2 py-1 mt-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          Copiar Base64
        </button>
      </div>
    </div>
  )
}

