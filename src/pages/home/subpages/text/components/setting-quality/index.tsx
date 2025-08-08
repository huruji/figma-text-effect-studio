import { useState } from 'preact/compat'
import { Image } from '@adobe/react-spectrum'
import { settingAtom } from 'src/atoms/setting'
import { useAtom } from 'jotai'
import CustomSegmentedControl from 'src/components/custom-segmented-control'
import proSvg from 'src/pro.svg'

const sizeLabelMap = {
  'basic': 'Basic',
  'standard': 'Standard',
  'ultra': 'Ultra',
}

const SettingQuality = () => {
  const [setting, setSetting] = useAtom(settingAtom)
  let sizeOptions = setting.exportSizeOptions.find(item => item.value === setting.exportSize)
  if (!sizeOptions) {
    sizeOptions = setting.exportSizeOptions[0]
  }

  const exportSizeOptions = setting.exportSizeOptions.map(item => {
    const isPro = item.isPro
    let label = sizeLabelMap[item.value] || item.value
    if (isPro) {
      label = <div style={{display: 'flex', alignItems: 'center'}}><Image src={proSvg} />{sizeLabelMap[item.value] || item.value}</div>
    }
    return {
      label,
      value: item.value
    }
  })
  return <CustomSegmentedControl
    name='Export quality'
    options={exportSizeOptions}
    value={setting.exportSize}
    onChange={(value) => {
      const isProValue = setting.exportSizeOptions.find(item => item.value === value)?.isPro
      if (isProValue && !setting.userIsPro) {
        setSetting((s) => ({ ...s, page: 'premium', premiumPrePage: 'home' }))
      } else {
        setSetting((s) => ({ ...s, exportSize: value }))
      }
    }}
  />
}

export default SettingQuality
