// @ts-nocheck
import { useAtom } from 'jotai'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import { type Palette } from 'src/components/gradient-setting'
import { hexToRgb, rgbToHex } from '../../../../color-util'
import { rgbaToHex } from 'src/shared/utils'
import Setting from './setting'
import { h } from 'preact'


function OutlineSetting() {
  const [setting, setSetting] = useAtom(settingAtom)
  const outlineSecondEnable = Boolean(setting?.currentConfig.outline.second.active)
  const outlineSecondWidth = setting?.currentConfig.outline.second.width
  const outlineSecondShowGradient = Boolean(setting?.currentConfig?.outline?.second?.fill?.gradient?.active)
  let outlineSecondSolidColor = ''
  if (setting?.currentConfig?.outline?.second?.fill?.color) {
    outlineSecondSolidColor = rgbToHex(setting?.currentConfig?.outline?.second?.fill?.color)
  }

  const outlineSecondGradientColors: Palette[] = []
  let outlineSecondActivePalette = setting?.outlineSecondActivePalette
  if (setting?.currentConfig?.outline?.second?.fill?.gradient?.colors?.length > 0) {
    const colors = setting?.currentConfig?.outline?.second?.fill?.gradient?.colors
    colors.forEach((color, index) => {
      let alpha = color.a
      if (alpha === undefined) {
        alpha = 1
      }
      const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
      outlineSecondGradientColors.push({
        colorObj: {
          ...color,
        },
        color: rgbaColor,
        position: Math.round(color.pos * 100),
        id: color.id || (index + 1),
        hexColor: rgbaToHex(rgbaColor, true),
      })
    })
    if (!outlineSecondActivePalette) {
      outlineSecondActivePalette = outlineSecondGradientColors[0]
    }
  }
  return (
    <Setting
      enable={outlineSecondEnable}
      setEnable={(val) => {
        setSetting((s) => {
          const currentConfig = { ...s.currentConfig }
          if (!currentConfig.outline) {
            currentConfig.outline = {}
          }
          if (!currentConfig.outline.second) {
            currentConfig.outline.second = {}
          }
          currentConfig.outline.second.active = val ? 1 : 0
          return { ...s, currentConfig }
        })
      }}
      value={Math.round(outlineSecondWidth * 100)}
      setValue={(val) => {
        setSetting((s) => {
          const currentConfig = { ...s.currentConfig }
          currentConfig.outline.second.width = val / 100
          return { ...s, currentConfig }
        })
      }}
      showGradient={outlineSecondShowGradient}
      setShowGradient={(val) => {
        setSetting((s) => {
          const currentConfig = { ...s.currentConfig }
          if (!currentConfig.outline) {
            currentConfig.outline = {}
          }
          if (!currentConfig.outline.second) {
            currentConfig.outline.second = {}
          }
          if (!currentConfig.outline.second.fill) {
            currentConfig.outline.second.fill = {}
          }
          if (!currentConfig.outline.second.fill.gradient) {
            currentConfig.outline.second.fill.gradient = {}
          }
          currentConfig.outline.second.fill.gradient.active = val ? 1 : 0
          return { ...s, currentConfig }
        })
      }}
      solidColor={outlineSecondSolidColor}
      setSolidColor={(val) => {
        setSetting((s) => {
          const currentConfig = { ...s.currentConfig }
          if (!currentConfig.outline) {
            currentConfig.outline = {}
          }
          if (!currentConfig.outline.second) {
            currentConfig.outline.second = {}
          }
          if (!currentConfig.outline.second.fill) {
            currentConfig.outline.second.fill = {}
          }
          currentConfig.outline.second.fill.color = hexToRgb(val)
          return { ...s, currentConfig }
        })
      }}
      activePalette={outlineSecondActivePalette}
      setActivePalette={(val) => {
        setSetting((s) => {
          s.outlineSecondActivePalette = val
          return { ...s }
        })
      }}
      gradientColors={outlineSecondGradientColors}
      setPalettes={(val) => {
        setSetting((s) => {
          const currentConfig = { ...s.currentConfig }
          currentConfig.outline.second.fill.gradient.colors = val.map(item => {
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
      direction={setting?.currentConfig?.outline?.second?.fill?.gradient?.angle}
      setDirection={(val) => {
        setSetting((s) => {
          const currentConfig = { ...s.currentConfig }
          if (!currentConfig.outline) {
            currentConfig.outline = {}
          }
          if (!currentConfig.outline.second) {
            currentConfig.outline.second = {}
          }
          if (!currentConfig.outline.second.fill) {
            currentConfig.outline.second.fill = {}
          }
          if (!currentConfig.outline.second.fill.gradient) {
            currentConfig.outline.second.fill.gradient = {}
          }
          currentConfig.outline.second.fill.gradient.angle = val
          return { ...s, currentConfig }
        })
      }}
    />
  )
};

export default OutlineSetting
