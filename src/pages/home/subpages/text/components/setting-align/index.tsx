
import { useState } from 'react'
import { settingAtom } from 'src/atoms/setting'
import { useAtom } from 'jotai'
import CustomSegmentedControl from 'src/components/custom-segmented-control'

const SettingAlign = () => {
  const [setting, setSetting] = useAtom(settingAtom)

  return <CustomSegmentedControl
    name='Align'
    options={[{ label: 'Center', value: 'center' }, { label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }]}
    value={setting?.currentConfig?.align || 'center'}
    onChange={(value) => {
      console.log('align value', value)
      setSetting((s) => ({ ...s, currentConfig: { ...s.currentConfig, align: value } }))
    }}
  />
}

export default SettingAlign
