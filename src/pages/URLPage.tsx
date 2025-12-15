import ToolLayout from '../layouts/ToolLayout'
import URLEncoderDecoder from '../components/URLEncoderDecoder'

function URLPage() {
  return (
    <ToolLayout
      title="🔗 URL Encode/Decode"
      description="Codifica y decodifica URLs con múltiples opciones"
    >
      <URLEncoderDecoder />
    </ToolLayout>
  )
}

export default URLPage

