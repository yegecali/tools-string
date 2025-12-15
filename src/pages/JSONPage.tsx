import ToolLayout from '../layouts/ToolLayout'
import JSONTools from '../components/JSONTools'

function JSONPage() {
  return (
    <ToolLayout
      title="📋 JSON Validator & Minifier"
      description="Valida, formatea y minifica archivos JSON"
    >
      <JSONTools />
    </ToolLayout>
  )
}

export default JSONPage

