import SettingSliderCom from 'src/components/setting-slider-com'
import { settingAtom } from 'src/atoms/setting'
import { useAtom } from 'jotai'


const SettingTextLine = () => {
  const [setting, setSetting] = useAtom(settingAtom)
  return <div>
    <SettingSliderCom
      minValue={-0.5} maxValue={1.5} step={0.01} setValue={(value) => setSetting((s) => ({
        ...s, currentConfig: {
          ...s.currentConfig,
          letterSpacing: value
        }
      }))} value={setting.currentConfig?.letterSpacing || 0}
      text='Letter spacing'
    />
    <SettingSliderCom
      minValue={0.1} maxValue={3} step={0.01} setValue={(value) => setSetting((s) => ({
        ...s, currentConfig: {
          ...s.currentConfig,
          lineHeight: value
        }
      }))} value={setting.currentConfig?.lineHeight || 0}
      text='Line spacing'
    />
  </div>
}

export default SettingTextLine
