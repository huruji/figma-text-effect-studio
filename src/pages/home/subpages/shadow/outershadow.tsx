import { useAtom } from 'jotai'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import { hexToRgb, rgbToHex, parseRgba } from '../../../../color-util'
import SettingSliderCom from 'src/components/setting-slider-com'
import SettingSwitchCom from 'src/components/setting-switch-com'
import SettingColorselectorCom from 'src/components/setting-colorselector-com'
import SettingGradient, { type Palette } from 'src/components/gradient-setting'
import { rgbaToHex } from 'src/shared/utils'

function OuterShadowSetting() {
  const [setting, setSetting] = useAtom(settingAtom)
  const outerShadowEnable = Boolean(setting?.currentConfig?.shadow?.outer?.active)
  const outerShadowSize = setting?.currentConfig?.shadow?.outer?.size
  const outerShadowStrength = setting?.currentConfig?.shadow?.outer?.strength
  const outerShadowDistance = setting?.currentConfig?.shadow?.outer?.distance
  const outerShadowAngle = setting?.currentConfig?.shadow?.outer?.angle
  const outerShadowShowGradient = Boolean(setting?.currentConfig?.shadow?.outer?.fill?.gradient?.active)
  let outerShadowSolidColor = ''
  if (setting?.currentConfig?.shadow?.outer?.fill?.color) {
    outerShadowSolidColor = rgbToHex(setting?.currentConfig?.shadow?.outer?.fill?.color)
  }
  const outerShadowGradientColors: Palette[] = []
  let outerShadowActivePalette = setting?.outerShadowActivePalette
  if (setting?.currentConfig?.shadow?.outer?.fill?.gradient?.colors?.length > 0) {
    const colors = setting?.currentConfig?.shadow?.outer?.fill?.gradient?.colors
    colors.forEach((color, index) => {
      let alpha = color.a
      if (alpha === undefined) {
        alpha = 1
      }
      const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
      outerShadowGradientColors.push({
        color: rgbaColor,
        hexColor: rgbaToHex(rgbaColor, true),
        colorObj: parseRgba(rgbaColor),
        position: Math.round(color.pos * 100),
        id: color.id || (index + 1)
      })
    })
    if (!outerShadowActivePalette) {
      outerShadowActivePalette = outerShadowGradientColors[0]
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spectrum-global-dimension-size-100)' }}>
      <SettingSwitchCom
        text={'Enable outer shadow'}
        value={outerShadowEnable}
        setValue={(val) => {
          setSetting((s) => {
            const currentConfig = { ...s.currentConfig }
            if (!currentConfig.shadow) {
              currentConfig.shadow = {}
            }
            if (!currentConfig.shadow.outer) {
              currentConfig.shadow.outer = {}
            }
            currentConfig.shadow.outer.active = val ? 1 : 0
            return { ...s, currentConfig }
          })
        }}
      />
      {outerShadowEnable && <>
        <SettingSliderCom
          text={'Size'}
          minValue={0}
          maxValue={10}
          step={1}
          value={Math.round(outerShadowSize * 10)}
          setValue={(val) => {
            setSetting((s) => {
              const currentConfig = { ...s.currentConfig }
              if (!currentConfig.shadow) {
                currentConfig.shadow = {}
              }
              if (!currentConfig.shadow.outer) {
                currentConfig.shadow.outer = {}
              }
              currentConfig.shadow.outer.size = val / 10
              return { ...s, currentConfig }
            })
          }}
        />
        <SettingSliderCom
          text={'Strength'}
          minValue={0}
          maxValue={100}
          step={1}
          value={Math.round(outerShadowStrength * 100)}
          setValue={(val) => {
            setSetting((s) => {
              const currentConfig = { ...s.currentConfig }
              if (!currentConfig.shadow) {
                currentConfig.shadow = {}
              }
              if (!currentConfig.shadow.outer) {
                currentConfig.shadow.outer = {}
              }
              currentConfig.shadow.outer.strength = val / 100
              return { ...s, currentConfig }
            })
          }}
        />
        <SettingSliderCom
          minValue={0}
          maxValue={100}
          step={1}
          text={'Distance'}
          value={Math.round(outerShadowDistance * 100)}
          setValue={(val) => {
            setSetting((s) => {
              const currentConfig = { ...s.currentConfig }
              if (!currentConfig.shadow) {
                currentConfig.shadow = {}
              }
              if (!currentConfig.shadow.outer) {
                currentConfig.shadow.outer = {}
              }
              currentConfig.shadow.outer.distance = val / 100
              return { ...s, currentConfig }
            })
          }}
        />
        <SettingSliderCom
          minValue={0}
          maxValue={1}
          step={0.01}
          text={'Opacity'}
          value={setting?.currentConfig?.shadow?.outer?.fill?.alpha}
          setValue={(val) => {
            setSetting((s) => {
              const currentConfig = { ...s.currentConfig }
              if (!currentConfig.shadow) {
                currentConfig.shadow = {}
              }
              if (!currentConfig.shadow.outer) {
                currentConfig.shadow.outer = {}
              }
              if (!currentConfig.shadow.outer.fill) {
                currentConfig.shadow.outer.fill = {}
              }
              currentConfig.shadow.outer.fill.alpha = val
              return { ...s, currentConfig }
            })
          }}
        />
        <SettingSliderCom
          minValue={-180}
          maxValue={180}
          step={1}
          text={'Direction'}
          value={setting?.currentConfig?.shadow?.outer?.angle}
          setValue={(val) => {
            setSetting((s) => {
              const currentConfig = { ...s.currentConfig }
              if (!currentConfig.shadow) {
                currentConfig.shadow = {}
              }
              if (!currentConfig.shadow.outer) {
                currentConfig.shadow.outer = {}
              }
              currentConfig.shadow.outer.angle = val
              return { ...s, currentConfig }
            })
          }}
        />
        <SettingSwitchCom
          text={'Use gradient'}
          value={outerShadowShowGradient}
          setValue={(val) => {
            setSetting((s) => {
              const currentConfig = { ...s.currentConfig }
              if (!currentConfig.shadow) {
                currentConfig.shadow = {}
              }
              if (!currentConfig.shadow.outer) {
                currentConfig.shadow.outer = {}
              }
              if (!currentConfig.shadow.outer.fill) {
                currentConfig.shadow.outer.fill = {}
              }
              currentConfig.shadow.outer.fill.gradient.active = val ? 1 : 0
              return { ...s, currentConfig }
            })
          }}
        />
        {
          outerShadowShowGradient && <SettingGradient
          direction={setting?.currentConfig?.shadow?.outer?.fill?.gradient?.angle}
          setDirection={(val) => {
            setSetting((s) => {
              const currentConfig = { ...s.currentConfig }
              if (!currentConfig.shadow) {
                currentConfig.shadow = {}
              }
              if (!currentConfig.shadow.outer) {
                currentConfig.shadow.outer = {}
              }
              if (!currentConfig.shadow.outer.fill) {
                currentConfig.shadow.outer.fill = {}
              }
              if (!currentConfig.shadow.outer.fill.gradient) {
                currentConfig.shadow.outer.fill.gradient = {}
              }
              currentConfig.shadow.outer.fill.gradient.angle = val
              return { ...s, currentConfig }
            })
          }}
          activePalette={outerShadowActivePalette}
          setActivePalette={(val) => {
            setSetting((s) => {
              return { ...s, outerShadowActivePalette: val }
            })
          }}
          palettes={outerShadowGradientColors}
          setPalettes={(val) => {
            setSetting((s) => {
              const currentConfig = { ...s.currentConfig }
              if (!currentConfig.shadow) {
                currentConfig.shadow = {}
              }
              if (!currentConfig.shadow.outer) {
                currentConfig.shadow.outer = {}
              }
              if (!currentConfig.shadow.outer.fill) {
                currentConfig.shadow.outer.fill = {}
              }
              if (!currentConfig.shadow.outer.fill.gradient) {
                currentConfig.shadow.outer.fill.gradient = {}
              }
              currentConfig.shadow.outer.fill.gradient.colors = val.map(item => {
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
        />
        }
        {!outerShadowShowGradient &&<SettingColorselectorCom
          text={'Color'}
          colors={[outerShadowSolidColor]}
          setColors={(val) => {
            setSetting((s) => {
              const currentConfig = { ...s.currentConfig }
              if (!currentConfig.shadow) {
                currentConfig.shadow = {}
              }
              if (!currentConfig.shadow.outer) {
                currentConfig.shadow.outer = {}
              }
              if (!currentConfig.shadow.outer.fill) {
                currentConfig.shadow.outer.fill = {}
              }
              currentConfig.shadow.outer.fill.color = hexToRgb(val[0])
              return { ...s, currentConfig }
            })
            }}
          />
        }
      </>}
    </div>
  )
};

export default OuterShadowSetting
