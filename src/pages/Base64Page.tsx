import ToolLayout from '../layouts/ToolLayout'
import Base64TextTool from '../components/Base64TextTool'
import Base64FileTool from '../components/Base64FileTool'
import Base64ImageTool from '../components/Base64ImageTool'
import { TabsContainer, type TabItem } from '../components/shared'
import { FiType, FiFile, FiImage } from 'react-icons/fi'

function Base64Page() {
  const tabs: TabItem[] = [
    {
      id: 'text',
      label: 'Texto',
      icon: <FiType size={16} />,
      content: <Base64TextTool />,
    },
    {
      id: 'file',
      label: 'Archivo',
      icon: <FiFile size={16} />,
      content: <Base64FileTool />,
    },
    {
      id: 'image',
      label: 'Imagen',
      icon: <FiImage size={16} />,
      content: <Base64ImageTool />,
    },
  ]

  return (
    <ToolLayout
      title="🔐 Base64"
      description="Codifica/decodifica texto y archivos, importa/exporta con vista previa"
    >
      <div style={{ gridColumn: '1 / -1' }}>
        <TabsContainer tabs={tabs} defaultTab="text" />
      </div>
    </ToolLayout>
  )
}

export default Base64Page

