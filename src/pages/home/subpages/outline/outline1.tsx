import { useAtom } from 'jotai'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import { type Palette } from 'src/components/gradient-setting'
import { hexToRgb, rgbToHex } from '../../../../color-util'
import Setting from './setting'
import { rgbaToHex } from 'src/shared/utils'
import { h } from 'preact'


function OutlineSetting() {
  const [setting, setSetting] = useAtom(settingAtom)
  const outlineFirstEnable = Boolean(setting?.currentConfig.outline.first.active)
  const outlineFirstWidth = setting?.currentConfig.outline.first.width
  const outlineFirstShowGradient = Boolean(setting?.currentConfig?.outline?.first?.fill?.gradient?.active)
  let outlineFirstSolidColor = ''
  if (setting?.currentConfig?.outline?.first?.fill?.color) {
    outlineFirstSolidColor = rgbToHex(setting?.currentConfig?.outline?.first?.fill?.color)
  }

  const outlineFirstGradientColors: Palette[] = []
  let outlineFirstActivePalette = setting?.outlineFirstActivePalette
  if (setting?.currentConfig?.outline?.first?.fill?.gradient?.colors?.length > 0) {
    const colors = setting?.currentConfig?.outline?.first?.fill?.gradient?.colors
    colors.forEach((color, index) => {
      let alpha = color.a
      if (alpha === undefined) {
        alpha = 1
      }
      const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
      outlineFirstGradientColors.push({
        colorObj: {
          ...color,
        },
        hexColor: rgbaToHex(rgbaColor, true),
        color: rgbaColor,
        position: Math.round(color.pos * 100),
        id: color.id || (index + 1)
      })
    })
    if (!outlineFirstActivePalette) {
      outlineFirstActivePalette = outlineFirstGradientColors[0]
    }
  }
  return (
    <Setting
      enable={outlineFirstEnable}
      setEnable={(val) => {
        setSetting((s) => {
          const currentConfig = { ...s.currentConfig }
          if (!currentConfig.outline) {
            currentConfig.outline = {}
          }
          if (!currentConfig.outline.first) {
            currentConfig.outline.first = {}
          }
          currentConfig.outline.first.active = val ? 1 : 0
          return { ...s, currentConfig }
        })
      }}
      value={Math.round(outlineFirstWidth * 100)}
      setValue={(val) => {
        setSetting((s) => {
          const currentConfig = { ...s.currentConfig }
          currentConfig.outline.first.width = val / 100
          return { ...s, currentConfig }
        })
      }}
      showGradient={outlineFirstShowGradient}
      setShowGradient={(val) => {
        setSetting((s) => {
          const currentConfig = { ...s.currentConfig }
          if (!currentConfig.outline) {
            currentConfig.outline = {}
          }
          if (!currentConfig.outline.first) {
            currentConfig.outline.first = {}
          }
          if (!currentConfig.outline.first.fill) {
            currentConfig.outline.first.fill = {}
          }
          if (!currentConfig.outline.first.fill.gradient) {
            currentConfig.outline.first.fill.gradient = {}
          }
          currentConfig.outline.first.fill.gradient.active = val ? 1 : 0
          return { ...s, currentConfig }
        })
      }}
      solidColor={outlineFirstSolidColor}
      setSolidColor={(val) => {
        setSetting((s) => {
          const currentConfig = { ...s.currentConfig }
          if (!currentConfig.outline) {
            currentConfig.outline = {}
          }
          if (!currentConfig.outline.first) {
            currentConfig.outline.first = {}
          }
          if (!currentConfig.outline.first.fill) {
            currentConfig.outline.first.fill = {}
          }
          currentConfig.outline.first.fill.color = hexToRgb(val)
          return { ...s, currentConfig }
        })
      }}
      activePalette={outlineFirstActivePalette}
      setActivePalette={(val) => {
        setSetting((s) => {
          s.outlineFirstActivePalette = val
          return { ...s }
        })
      }}
      gradientColors={outlineFirstGradientColors}
      setPalettes={(val) => {
        setSetting((s) => {
          const currentConfig = { ...s.currentConfig }
          currentConfig.outline.first.fill.gradient.colors = val.map(item => {
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
      direction={setting?.currentConfig?.outline?.first?.fill?.gradient?.angle}
      setDirection={(val) => {
        setSetting((s) => {
          const currentConfig = { ...s.currentConfig }
          if (!currentConfig.outline) {
            currentConfig.outline = {}
          }
          if (!currentConfig.outline.first) {
            currentConfig.outline.first = {}
          }
          if (!currentConfig.outline.first.fill) {
            currentConfig.outline.first.fill = {}
          }
          if (!currentConfig.outline.first.fill.gradient) {
            currentConfig.outline.first.fill.gradient = {}
          }
          currentConfig.outline.first.fill.gradient.angle = val
          return { ...s, currentConfig }
        })
      }}
    />
  )
};

export default OutlineSetting
