import { TextboxMultiline, Text, Stack } from '@create-figma-plugin/ui'
import { h } from 'preact'
import { useSetState } from 'ahooks'
import { useAtom } from 'jotai'
import { settingAtom } from 'src/atoms/setting'
import SettingTextLine from './components/setting-text-line'
import SettingAlign from './components/setting-align'
// import SettingFont from 'src/components/setting-font'
import StyleSetting from './components/style-setting'
// import EffectSetting from './components/effect-setting'


function TextTab() {
  const [setting, setSetting] = useAtom(settingAtom)

  return (
    <Stack space='medium'>
      <div>
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: 'var(--figma-color-text-secondary)',
          marginBottom: '8px'
        }}>
          Text
        </div>
        <TextboxMultiline
          value={setting.currentConfig?.text || ''}
          placeholder="Enter text content..."
          onInput={(event) => {
            const value = event.currentTarget.value
            setSetting((s: any) => {
              return { ...s, currentConfig: { ...s.currentConfig, text: value } }
            })
          }}
        />
      </div>
      {/* <SettingFont
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
      /> */}
      <SettingAlign />
      <SettingTextLine />
      <StyleSetting />
    </Stack>
  )
};

export default TextTab
