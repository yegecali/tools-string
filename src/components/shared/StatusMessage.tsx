interface StatusMessageProps {
  message: string
  type?: 'success' | 'error' | 'info'
}

export function StatusMessage({ message, type = 'success' }: StatusMessageProps) {
  const isError = message.includes('Error') || message.includes('❌')
  const messageType = type || (isError ? 'error' : 'success')

  const getStatusClasses = (): string => {
    switch (messageType) {
      case 'error':
        return 'status-error'
      case 'info':
        return 'status-info'
      case 'success':
      default:
        return 'status-success'
    }
  }

  return <div className={`${getStatusClasses()} mt-3`}>{message}</div>
}

