import ToolLayout from '../layouts/ToolLayout'
import Base64TextTool from '../components/Base64TextTool'
import Base64FileTool from '../components/Base64FileTool'

function Base64Page() {
  return (
    <ToolLayout
      title="🔐 Base64"
      description="Codifica/decodifica texto y archivos, importa/exporta con vista previa"
      columns={2}
    >
      <Base64TextTool />
      <Base64FileTool />
    </ToolLayout>
  )
}

export default Base64Page

