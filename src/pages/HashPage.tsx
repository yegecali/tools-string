import ToolLayout from '../layouts/ToolLayout'
import HashGenerator from '../components/HashGenerator'

function HashPage() {
  return (
    <ToolLayout
      title="🔐 Hash Generator"
      description="Genera hashes con salida en Hexadecimal y Base64 (MD5, SHA1, SHA256, SHA512)"
    >
      <HashGenerator />
    </ToolLayout>
  )
}

export default HashPage

