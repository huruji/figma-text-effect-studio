// @ts-nocheck
import { Link, Badge, Text } from "@adobe/react-spectrum"
import { useAtom } from 'jotai'
import React from "react"
import { settingAtom } from 'src/atoms/setting'

const MarketingInfo: React.FC = () => {
  const [setting, setSetting] = useAtom(settingAtom)
  const des = setting.marketingInfo?.description || ''
  const link = setting.marketingInfo?.link || ''
  const lineText = setting.marketingInfo?.linkText || ''

  if (!des) {
    return null
  }
  return (
    <div style={{
      cursor: 'pointer',
      paddingBottom: 'var(--spectrum-global-dimension-size-100)',
    }}><Link UNSAFE_className='cursor-pointer' href={link} target="_blank" isQuiet={true}><Badge
      variant="positive"
    >
      <div style={{
        display: 'inline-block',
        padding: '0 4px',
        cursor: 'pointer',
      }}>
        <Text UNSAFE_className='cursor-pointer'>{des}</Text>
        <Link UNSAFE_className='cursor-pointer' href={link} target="_blank">
          {lineText}
        </Link>
      </div>
    </Badge>
    </Link>
    </div>
  )
}

export default MarketingInfo
