// import {
//   Rows,
//   MultilineInput,
//   FormField,
// } from "@canva/app-ui-kit"
import { Flex, Switch, Text } from "@adobe/react-spectrum"
import { useSetState } from 'ahooks'
import { useAtom } from 'jotai'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import SettingSliderCom from 'src/components/setting-slider-com'
import SettingSwitchCom from 'src/components/setting-switch-com'
import SettingColorselectorCom from 'src/components/setting-colorselector-com'
import SettingGradient, { type Palette } from 'src/components/gradient-setting'
import { hexToRgb, rgbToHex } from '../../../../color-util'
import { rgbaToHex } from 'src/shared/utils'

function FillingSetting() {
  const [setting, setSetting] = useAtom(settingAtom)
  const [state] = useSetState({
    isLoading: false,
  })
  const showGradient = Boolean(setting?.currentConfig?.fill?.gradient?.active)
  let solidColor = ''
  if (setting?.currentConfig?.fill?.color) {
    solidColor = rgbToHex(setting?.currentConfig?.fill?.color)
  }
  const gradientColors: Palette[] = []
  let activePalette = setting?.fillingActivePalette
  if (setting?.currentConfig?.fill?.gradient?.colors?.length > 0) {
    const colors = setting?.currentConfig?.fill?.gradient?.colors
    colors.forEach((color, index) => {
      let alpha = color.a
      if (alpha === undefined) {
        alpha = 1
      }
      const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
      gradientColors.push({
        color: rgbaColor,
        hexColor: rgbaToHex(rgbaColor, true),
        colorObj: {
          ...color,
        },
        position: Math.round(color.pos * 100),
        id: color.id || (index + 1)
      })
    })
    if (!activePalette) {
      activePalette = gradientColors[0]
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spectrum-global-dimension-size-100)' }}>
      <SettingSwitchCom
        text="Use gradient"
        value={showGradient}
        setValue={(val) => {
          setSetting((s) => {
            const active = val === true ? 1 : 0
            const currentConfig = { ...s.currentConfig }
            if (!currentConfig.fill) {
              currentConfig.fill = {
                active: 1,
              }
            }
            if (!currentConfig.fill.gradient) {
              currentConfig.fill.gradient = {}
            }
            currentConfig.fill.gradient.active = active
            return {
              ...s,
              currentConfig
            }
          })
        }}
      />
      {showGradient && <SettingGradient
        direction={setting?.currentConfig.fill?.gradient?.angle || 0}
        setDirection={(val) => {
          setSetting((s) => {
            const currentConfig = { ...s.currentConfig }
            currentConfig.fill.gradient.angle = val
            return { ...s, currentConfig }
          })
        }}
        palettes={gradientColors}
        activePalette={activePalette}
        setPalettes={(val) => {
          setSetting((s) => {
            const currentConfig = { ...s.currentConfig }
            currentConfig.fill.gradient.colors = val.map(item => {
              return {
                r: item.colorObj?.r,
                g: item.colorObj?.g,
                b: item.colorObj?.b,
                a: item.colorObj?.a,
                pos: item.position / 100,
                id: item.id
              }
            })
            return { ...s, currentConfig }
          })
        }}
        setActivePalette={(val) => {
          setSetting((s) => {
            const fillingActivePalette = val
            return { ...s, fillingActivePalette }
          })
        }}
      />}
      {!showGradient && <SettingColorselectorCom
        text={'Color'}
        colors={[solidColor]}
        setColors={(val) => {
          setSetting((s) => {
            const currentConfig = { ...s.currentConfig }
            currentConfig.fill.color = hexToRgb(val[0])
            return { ...s, currentConfig }
          })
        }}
      />}
    </div>
  )
};

export default FillingSetting
