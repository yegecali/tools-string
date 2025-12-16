import { useThemeColors } from '../../hooks/useThemeColors'

interface InputFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder?: string
  type?: 'text' | 'textarea'
  minHeight?: string
  error?: string | null
  name?: string
}

export function InputField({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'textarea',
  minHeight = '140px',
  error,
  name,
}: InputFieldProps) {
  const { colors } = useThemeColors()

  const inputStyle = {
    backgroundColor: colors.surface.default,
    color: colors.text.primary,
    borderColor: error ? colors.danger.main : colors.border.main,
    borderWidth: '1px',
    borderStyle: 'solid',
  }

  const labelStyle = {
    color: error ? colors.danger.main : colors.text.primary,
  }

  return (
    <div className="mb-4">
      <label style={labelStyle} className="label font-medium">
        {label}
        {error && <span style={{ color: colors.danger.main }} className="ml-2">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          style={{ ...inputStyle, minHeight }}
          className="w-full p-2 rounded font-mono text-sm outline-none transition-colors"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          style={inputStyle}
          className="w-full p-2 rounded font-mono text-sm outline-none transition-colors"
        />
      )}
      {error && (
        <small style={{ color: colors.danger.main }} className="error-text block mt-1">
          {error}
        </small>
      )}
    </div>
  )
}

