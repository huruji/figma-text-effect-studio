import { useSetState } from 'ahooks'
import { useAtom } from 'jotai'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import SettingSliderCom from 'src/components/setting-slider-com'
import SettingSwitchCom from 'src/components/setting-switch-com'
import { h } from 'preact'


function TextTab() {
  const [setting, setSetting] = useAtom(settingAtom)
  const [state] = useSetState({
    isLoading: false,
  })
  const showJiggleSetting = Boolean(setting?.currentConfig.lettering?.boggle?.active)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', }}>
      <SettingSwitchCom
        text={'Enable jiggle'}
        value={showJiggleSetting}
        setValue={(val) => {
          setSetting((s) => {
            const active = val === true ? 1 : 0
            const currentConfig = { ...s.currentConfig }
            if (!currentConfig.lettering) {
              currentConfig.lettering = {
                active,
              }
            }
            if (currentConfig.lettering.active === 0 && active === 1) {
              // 需要把上层的 active 打开
              currentConfig.lettering.active = 1
            }
            if (!currentConfig.lettering.boggle) {
              currentConfig.lettering.boggle = {}
            }
            currentConfig.lettering.boggle.active = active
            return {
              ...s,
              currentConfig
            }
          })
        }}
      />
      {showJiggleSetting && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <SettingSliderCom
            text={'Angle'}
            minValue={0}
            maxValue={360}
            value={setting?.currentConfig.lettering?.boggle?.angle || 0}
            setValue={(val) => {
              setSetting((s) => {
                const currentConfig = { ...s.currentConfig }
                if (!currentConfig.lettering) {
                  currentConfig.lettering = {}
                }
                if (!currentConfig.lettering.boggle) {
                  currentConfig.lettering.boggle = {}
                }
                currentConfig.lettering.boggle.angle = val
                return {
                  ...s,
                  currentConfig
                }
              })
            }}
          />
          <SettingSliderCom
            text={'Amplitude'}
            minValue={0}
            maxValue={100}
            step={1}
            value={Math.round((setting?.currentConfig.lettering?.boggle?.amplitude || 0) * 100)}
            setValue={(val) => {
              setSetting((s) => {
                const currentConfig = { ...s.currentConfig }
                if (!currentConfig.lettering) {
                  currentConfig.lettering = {}
                }
                if (!currentConfig.lettering.boggle) {
                  currentConfig.lettering.boggle = {}
                }
                currentConfig.lettering.boggle.amplitude = val / 100
                return {
                  ...s,
                  currentConfig
                }
              })
            }}
          />
        </div>
      )}
    </div>
  )
};

export default TextTab
