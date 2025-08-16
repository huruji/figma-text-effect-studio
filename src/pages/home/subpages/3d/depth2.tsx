import { useAtom } from 'jotai'
import { settingAtom } from 'src/atoms/setting'
import { type Palette } from 'src/components/gradient-setting'
import { hexToRgb, rgbToHex, parseRgba } from '../../../../color-util'
import { rgbaToHex } from 'src/shared/utils'
import DepthSetting from './setting'
import { h } from 'preact'

function Depth2Setting() {
  const [setting, setSetting] = useAtom(settingAtom)
  const enable = Boolean(setting?.currentConfig?.depth2?.active)
  const setEnable = (val) => {
    setSetting((s) => {
      const currentConfig = { ...s.currentConfig }
      if (!currentConfig?.depth2) {
        currentConfig.depth2 = {}
      }
      currentConfig.depth2.active = val ? 1 : 0
      return { ...s, currentConfig }
    })
  }
  const value = setting.currentConfig?.depth2?.length || 0
  const setValue = (val) => {
    setSetting((s) => {
      const currentConfig = { ...s.currentConfig }
      if (!currentConfig.depth2) {
        currentConfig.depth2 = {}
      }
      currentConfig.depth2.length = val / 100
      return { ...s, currentConfig }
    })
  }
  const angle = setting?.currentConfig?.depth2?.angle
  const setAngle = (val) => {
    setSetting((s) => {
      const currentConfig = { ...s.currentConfig }
      if (!currentConfig.depth2) {
        currentConfig.depth2 = {}
      }
      currentConfig.depth2.angle = val
      return { ...s, currentConfig }
    })
  }
  const opacity = setting?.currentConfig?.depth2?.fill?.alpha || 0
  const setOpacity = (val) => {
    setSetting((s) => {
      const currentConfig = { ...s.currentConfig }
      if (!currentConfig.depth2) {
        currentConfig.depth2 = {}
      }
      if (!currentConfig.depth2.fill) {
        currentConfig.depth2.fill = {}
      }
      currentConfig.depth2.fill.alpha = val
      return { ...s, currentConfig }
    })
  }
  const showGradient = Boolean(setting?.currentConfig?.depth2?.fill?.gradient?.active)
  const setShowGradient = (val) => {
    setSetting((s) => {
      const currentConfig = { ...s.currentConfig }
      if (!currentConfig.depth2) {
        currentConfig.depth2 = {}
      }
      if (!currentConfig.depth2.fill) {
        currentConfig.depth2.fill = {}
      }
      if (!currentConfig.depth2.fill.gradient) {
        currentConfig.depth2.fill.gradient = {}
      }
      currentConfig.depth2.fill.gradient.active = val ? 1 : 0
      return { ...s, currentConfig }
    })
  }
  let solidColor = ''
  if (setting?.currentConfig?.depth2?.fill?.color) {
    solidColor = rgbToHex(setting?.currentConfig?.depth2?.fill?.color)
  }
  const setSolidColor = (val) => {
    setSetting((s) => {
      const currentConfig = { ...s.currentConfig }
      if (!currentConfig.depth2) {
        currentConfig.depth2 = {}
      }
      if (!currentConfig.depth2.fill) {
        currentConfig.depth2.fill = {}
      }
      currentConfig.depth2.fill.color = hexToRgb(val[0])
      return { ...s, currentConfig }
    })
  }

  const direction = setting?.currentConfig?.depth2?.fill?.gradient?.angle
  const setDirection = (val) => {
    setSetting((s) => {
      const currentConfig = { ...s.currentConfig }
      if (!currentConfig.depth2) {
        currentConfig.depth2 = {}
      }
      if (!currentConfig.depth2.fill) {
        currentConfig.depth2.fill = {}
      }
      currentConfig.depth2.fill.gradient.angle = val
      return { ...s, currentConfig }
    })
  }

  const gradientColors: Palette[] = []
  let activePalette = setting?.depth1ActivePalette
  if (setting?.currentConfig?.depth2?.fill?.gradient?.colors?.length > 0) {
    const colors = setting?.currentConfig?.depth2?.fill?.gradient?.colors
    colors.forEach((color, index) => {
      let alpha = color.a
      if (alpha === undefined) {
        alpha = 1
      }
      const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
      gradientColors.push({
        color: rgbaColor,
        hexColor: rgbaToHex(rgbaColor, true),
        colorObj: parseRgba(rgbaColor),
        position: Math.round(color.pos * 100),
        id: color.id || (index + 1)
      })
    })
    if (!activePalette) {
      activePalette = gradientColors[0]
    }
  }
  const setPalettes = (val) => {
    setSetting((s) => {
      const currentConfig = { ...s.currentConfig }
      if (!currentConfig.depth2) {
        currentConfig.depth2 = {}
      }
      if (!currentConfig.depth2.fill) {
        currentConfig.depth2.fill = {}
      }
      if (!currentConfig.depth2.fill.gradient) {
        currentConfig.depth2.fill.gradient = {}
      }
      currentConfig.depth2.fill.gradient.colors = val.map(item => {
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
  }
  const setActivePalette = (val) => {
    setSetting((s) => {
      return { ...s, depth1ActivePalette: val }
    })
  }
  return (
    <DepthSetting
      enable={enable}
      setEnable={setEnable}
      value={value}
      setValue={setValue}
      angle={angle}
      setAngle={setAngle}
      opacity={opacity}
      setOpacity={setOpacity}
      showGradient={showGradient}
      setShowGradient={setShowGradient}
      direction={direction}
      setDirection={setDirection}
      gradientColors={gradientColors}
      activePalette={activePalette}
      setPalettes={setPalettes}
      setActivePalette={setActivePalette}
      solidColor={solidColor}
      setSolidColor={setSolidColor}
    />
  )
};

export default Depth2Setting
