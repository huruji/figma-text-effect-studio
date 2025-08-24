// @ts-nocheck
import { useAtom } from 'jotai'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import { hexToRgb, rgbToHex } from '../../../../color-util'
import SettingSliderCom from 'src/components/setting-slider-com'
import SettingSwitchCom from 'src/components/setting-switch-com'
import SettingColorselectorCom from 'src/components/setting-colorselector-com'
import SettingGradient, { type Palette } from 'src/components/gradient-setting'
import { h } from 'preact'

function InnerShadowSetting() {
  const [setting, setSetting] = useAtom(settingAtom)
  const innerShadowEnable = Boolean(setting?.currentConfig?.shadow?.inner?.active)
  const innerShadowSize = setting?.currentConfig?.shadow?.inner?.size
  const innerShadowStrength = setting?.currentConfig?.shadow?.inner?.strength
  const innerShadowDistance = setting?.currentConfig?.shadow?.inner?.distance
  const innerShadowAngle = setting?.currentConfig?.shadow?.inner?.angle
  const innerShadowShowGradient = Boolean(setting?.currentConfig?.shadow?.inner?.fill?.gradient?.active)
  let innerShadowSolidColor = ''
  if (setting?.currentConfig?.shadow?.inner?.color) {
    innerShadowSolidColor = rgbToHex(setting?.currentConfig?.shadow?.inner?.color)
  }

  const innerShadowGradientColors: Palette[] = []
  let innerShadowActivePalette = setting?.innerShadowActivePalette
  if (setting?.currentConfig?.shadow?.inner?.fill?.gradient?.colors?.length > 0) {
    const colors = setting?.currentConfig?.shadow?.inner?.fill?.gradient?.colors
    colors.forEach((color, index) => {
      let alpha = color.a
      if (alpha === undefined) {
        alpha = 1
      }
      innerShadowGradientColors.push({
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`,
        position: color.pos * 100,
        id: color.id || (index + 1)
      })
    })
    if (!innerShadowActivePalette) {
      innerShadowActivePalette = innerShadowGradientColors[0]
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
      <SettingSwitchCom
        text={'Enable inner shadow'}
        value={innerShadowEnable}
        setValue={(val) => {
          setSetting((s) => {
            const currentConfig = { ...s.currentConfig }
            if (!currentConfig.shadow) {
              currentConfig.shadow = {}
            }
            if (!currentConfig.shadow.inner) {
              currentConfig.shadow.inner = {}
            }
            currentConfig.shadow.inner.active = val ? 1 : 0
            return { ...s, currentConfig }
          })
        }}
      />
      {innerShadowEnable && <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        <SettingSliderCom
          text={'Size'}
          minValue={0}
          maxValue={10}
          step={1}
          value={Math.round(innerShadowSize * 10)}
          setValue={(val) => {
            setSetting((s) => {
              const currentConfig = { ...s.currentConfig }
              if (!currentConfig.shadow) {
                currentConfig.shadow = {}
              }
              if (!currentConfig.shadow.inner) {
                currentConfig.shadow.inner = {}
              }
              currentConfig.shadow.inner.size = val / 10
              return { ...s, currentConfig }
            })
          }}
        />
        <SettingSliderCom
          text={'Strength'}
          minValue={0}
          maxValue={20}
          step={1}
          value={innerShadowStrength}
          setValue={(val) => {
            setSetting((s) => {
              const currentConfig = { ...s.currentConfig }
              if (!currentConfig.shadow) {
                currentConfig.shadow = {}
              }
              if (!currentConfig.shadow.inner) {
                currentConfig.shadow.inner = {}
              }
              currentConfig.shadow.inner.strength = val
              return { ...s, currentConfig }
            })
          }}
        />
        <SettingSliderCom
          minValue={0}
          maxValue={50}
          step={1}
          text={'Distance'}
          value={Math.round(innerShadowDistance * 100)}
          setValue={(val) => {
            setSetting((s) => {
              const currentConfig = { ...s.currentConfig }
              if (!currentConfig.shadow) {
                currentConfig.shadow = {}
              }
              if (!currentConfig.shadow.inner) {
                currentConfig.shadow.inner = {}
              }
              currentConfig.shadow.inner.distance = val / 100
              return { ...s, currentConfig }
            })
          }}
        />
        <SettingColorselectorCom
          text={'Color'}
          colors={[innerShadowSolidColor]}
          setColors={(val) => {
            setSetting((s) => {
              const currentConfig = { ...s.currentConfig }
              if (!currentConfig.shadow) {
                currentConfig.shadow = {}
              }
              if (!currentConfig.shadow.inner) {
                currentConfig.shadow.inner = {}
              }
              currentConfig.shadow.inner.color = hexToRgb(val[0])
              return { ...s, currentConfig }
            })
          }}
        />
      </div>}
    </div>
  )
};

export default InnerShadowSetting
