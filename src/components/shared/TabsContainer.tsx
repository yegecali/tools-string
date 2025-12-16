import { useState } from 'react'
import type { ReactNode } from 'react'
import { useThemeColors } from '../../hooks/useThemeColors'

export interface TabItem {
  id: string
  label: string
  icon?: ReactNode
  content: ReactNode
}

interface TabsContainerProps {
  tabs: TabItem[]
  defaultTab?: string
}

export function TabsContainer({ tabs, defaultTab }: TabsContainerProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '')
  const { colors } = useThemeColors()

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)

  const tabButtonStyle = (isActive: boolean) => ({
    padding: '12px 20px',
    border: 'none',
    borderBottom: isActive ? `3px solid ${colors.primary.main}` : `2px solid ${colors.border.main}`,
    backgroundColor: 'transparent',
    color: isActive ? colors.primary.main : colors.text.secondary,
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: isActive ? '600' : '500',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    whiteSpace: 'nowrap' as const,
  })

  return (
    <div style={{ width: '100%' }}>
      {/* Tab buttons */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          borderBottom: `2px solid ${colors.border.main}`,
          overflowX: 'auto',
          marginBottom: '16px',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={tabButtonStyle(activeTab === tab.id)}
            title={tab.label}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ width: '100%' }}>{activeTabContent?.content}</div>
    </div>
  )
}

