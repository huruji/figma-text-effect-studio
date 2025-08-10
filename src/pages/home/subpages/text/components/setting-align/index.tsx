import { h } from 'preact'
import { settingAtom } from 'src/atoms/setting'
import { useAtom } from 'jotai'
import CustomSegmentedControl from 'src/components/custom-segmented-control'

const SettingAlign = () => {
  const [setting, setSetting] = useAtom(settingAtom)

  return <CustomSegmentedControl
    name='Align'
    options={[{ text: 'Left', value: 'left' }, { text: 'Center', value: 'center' }, { text: 'Right', value: 'right' }]}
    value={setting?.currentConfig?.align || 'center'}
    onChange={(value) => {
      setSetting((s) => ({ ...s, currentConfig: { ...s.currentConfig, align: value } }))
    }}
  />
}

export default SettingAlign
