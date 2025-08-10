import SettingSliderCom from 'src/components/setting-slider-com'
import { settingAtom } from 'src/atoms/setting'
import { Stack } from '@create-figma-plugin/ui'
import { useAtom } from 'jotai'
import { h } from 'preact'

const SettingTextLine = () => {
  const [setting, setSetting] = useAtom(settingAtom)
  return <div>
    <Stack space='medium'><SettingSliderCom
      minValue={0} 
      maxValue={200} 
      step={1} 
      setValue={(value) => setSetting((s) => ({
        ...s, currentConfig: {
          ...s.currentConfig,
          letterSpacing: Number((value - 50) / 100)
        }
      }))} 
      value={((setting.currentConfig?.letterSpacing || 0) * 100) + 50}
      text='Letter spacing'
    />
    <SettingSliderCom
      minValue={10} maxValue={300} step={1} setValue={(value) => setSetting((s) => ({
        ...s, currentConfig: {
          ...s.currentConfig,
          lineHeight: Number(value / 100)
        }
      }))} 
      value={(setting.currentConfig?.lineHeight || 0) * 100}
      text='Line spacing'
    />
    </Stack>
  </div>
}

export default SettingTextLine
