import { SegmentedControl } from '@create-figma-plugin/ui'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import { useAtom } from 'jotai'
import { h } from 'preact'
import styles from './index.css'
import CustomSegmentedControl from 'src/components/custom-segmented-control'

const sizeLabelMap = {
  'basic': 'Basic',
  'standard': 'Standard',
  'ultra': 'Ultra',
}

const SettingQuality = () => {
  const [setting, setSetting] = useAtom(settingAtom)

  const exportSizeOptions = setting.exportSizeOptions.map(item => {
    const isPro = item.isPro
    let label = sizeLabelMap[item.value] || item.value

    // 为 Pro 功能添加图标标识
    if (isPro) {
      label = `${sizeLabelMap[item.value] || item.value} ⭐`
    }

    return {
      text: label,
      value: item.value
    }
  })

  const handleChange = (value: string) => {
    const isProValue = setting.exportSizeOptions.find(item => item.value === value)?.isPro

    if (isProValue && !setting.userIsPro) {
      setSetting((s: SettingType) => ({ ...s, page: 'premium', premiumPrePage: 'home' }))
    } else {
      setSetting((s: SettingType) => ({ ...s, exportSize: value }))
    }
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <CustomSegmentedControl
        name='Export quality'
        options={exportSizeOptions}
        value={setting.exportSize}
        onChange={handleChange}
      />
    </div>
  )
}

export default SettingQuality
