import ToolLayout from '../layouts/ToolLayout'
import YAMLValidator from '../components/YAMLValidator'
import YAMLToProperties from '../components/YAMLToProperties'

function YAMLPage() {
  return (
    <ToolLayout
      title="📋 YAML Tools"
      description="Valida YAML, formatea y convierte a application.properties"
      columns={2}
    >
      <YAMLValidator />
      <YAMLToProperties />
    </ToolLayout>
  )
}

export default YAMLPage

