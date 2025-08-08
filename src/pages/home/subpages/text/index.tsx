// import {
//   Rows,
//   MultilineInput,
//   FormField,
// } from "@canva/app-ui-kit"
import { TextArea } from '@adobe/react-spectrum'
import { useSetState } from 'ahooks'
import { useAtom } from 'jotai'
import { settingAtom } from 'src/atoms/setting'
import SettingTextLine from './components/setting-text-line'
import SettingAlign from './components/setting-align'
import SettingFont from 'src/components/setting-font'
import StyleSetting from './components/style-setting'
// import EffectSetting from './components/effect-setting'


function TextTab() {
  const [setting, setSetting] = useAtom(settingAtom)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spectrum-global-dimension-size-100)',
    }}>
      <TextArea
        value={setting.currentConfig?.text}
        label={'Text'}
        width={'100%'}
        onChange={(val) => {
          setSetting((s) => {
            return { ...s, currentConfig: { ...s.currentConfig, text: val } }
          })
        }}
      />
      <SettingFont
        text={'Font'}
        value={setting.currentConfig?.font.name || 'Thunder Regular'}
        setValue={(val) => {
          setSetting((s) => {
            return {
              ...s,
              page: 'font',
            }
          })
        }}
      />
      <SettingAlign />
      <SettingTextLine />
      {/* <div style={{ marginLeft: 'calc(var(--ui-kit-base-unit) * 1)' }}><SettingAlign /></div> */}
      {/* <div style={{ marginRight: 'calc(var(--ui-kit-base-unit) * -1)' }}><SettingTextLine /></div> */}
      <StyleSetting />
    </div>
  )
};

export default TextTab
