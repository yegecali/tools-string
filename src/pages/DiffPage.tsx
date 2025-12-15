import ToolLayout from '../layouts/ToolLayout'
import DiffChecker from '../components/DiffChecker'

function DiffPage() {
  return (
    <ToolLayout
      title="📊 Diff Checker"
      description="Compara dos textos línea por línea y visualiza las diferencias"
    >
      <DiffChecker />
    </ToolLayout>
  )
}

export default DiffPage

