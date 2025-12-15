
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
  const inputClasses = `input-field ${error ? 'input-error' : ''}`

  return (
    <div className="mb-4">
      <label className={`label ${error ? 'label-error' : ''}`}>
        {label}
        {error && <span className="text-red-500 ml-2">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={inputClasses}
          style={{ minHeight }}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      {error && <small className="error-text">{error}</small>}
    </div>
  )
}

