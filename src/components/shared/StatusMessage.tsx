import { useThemeColors } from '../../hooks/useThemeColors'

interface StatusMessageProps {
  message: string
  type?: 'success' | 'error' | 'info'
}

export function StatusMessage({ message, type = 'success' }: StatusMessageProps) {
  const { colors } = useThemeColors()
  const isError = message.includes('Error') || message.includes('error')
  const messageType = type || (isError ? 'error' : 'success')

  const getStatusStyle = () => {
    switch (messageType) {
      case 'error':
        return {
          backgroundColor: `${colors.danger.main}20`,
          color: colors.danger.main,
          borderLeft: `4px solid ${colors.danger.main}`,
        }
      case 'info':
        return {
          backgroundColor: `${colors.info.main}20`,
          color: colors.info.main,
          borderLeft: `4px solid ${colors.info.main}`,
        }
      case 'success':
      default:
        return {
          backgroundColor: `${colors.success.main}20`,
          color: colors.success.main,
          borderLeft: `4px solid ${colors.success.main}`,
        }
    }
  }

  return (
    <div
      style={getStatusStyle()}
      className="mt-3 p-3 rounded"
    >
      {message}
    </div>
  )
}

