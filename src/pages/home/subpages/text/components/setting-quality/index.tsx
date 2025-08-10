import { SegmentedControl } from '@create-figma-plugin/ui'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import { useAtom } from 'jotai'
import { h } from 'preact'
import styles from './index.css'

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

  const handleChange = (event: h.JSX.TargetedEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    const isProValue = setting.exportSizeOptions.find(item => item.value === value)?.isPro

    if (isProValue && !setting.userIsPro) {
      setSetting((s: SettingType) => ({ ...s, page: 'premium', premiumPrePage: 'home' }))
    } else {
      setSetting((s: SettingType) => ({ ...s, exportSize: value }))
    }
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{
        fontSize: '12px',
        fontWeight: '600',
        color: 'var(--figma-color-text-secondary)',
        marginBottom: '8px'
      }}>
        Export quality
      </div>
      <div className={styles['setting-quality-segmented-control-wrapper']}><SegmentedControl
        style={{
          cursor: 'pointer',
        }}
        options={exportSizeOptions}
        value={setting.exportSize}
        onChange={handleChange}
      />
      </div>
    </div>
  )
}

export default SettingQuality
