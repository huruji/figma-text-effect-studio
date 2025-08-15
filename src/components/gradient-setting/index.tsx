import { Text } from '@create-figma-plugin/ui'
import { rgbaToHex } from 'src/shared/utils'
import { useCallback, useEffect } from 'preact/compat'
import { } from 'src/shared/types/interfaces'
import MultiThumbSlider from '../MultiThumbSlider'
import { useSetState } from 'ahooks'
import { parseRgba, type RgbaColor } from 'src/color-util'
import SettingSliderCom from 'src/components/setting-slider-com'
import GradientStops from './stops'
import '!./index.css'
import { h } from 'preact'

export type Palette = {
  color: string
  id: string
  position: number
  colorObj?: RgbaColor
  hexColor: string
}

type GradientSettingProps = {
  palettes: Palette[]
  direction?: number
  setDirection?: (direction: number) => void
  setPalettes: (palettes: Palette[]) => void
  activePalette: Palette
  setActivePalette: (palette: Palette) => void
  hideDirection?: boolean
}

const SettingGradient = (props: GradientSettingProps) => {
  debugger;
  const { palettes, activePalette, setPalettes, setActivePalette, direction, setDirection, hideDirection } = props
  const radialGradientXPosition = 50
  const radialGradientYPosition = 50
  const gradientType = 'linear'
  const gradientPosition = 0
  const [state, setState] = useSetState<{
    cssGradient: string
    activeColor: string
  }>({
    cssGradient: '',
    activeColor: ''
  })
  const createGradientBackground = useCallback(() => {
    const sortedPallets = [...palettes].sort(
      (paletteA, paletteB) => paletteA.position - paletteB.position
    )
    const colorsAndPositionsString = sortedPallets
      .map((palette) => `${palette.color} ${palette.position}%`)
      .join(', ')
    let result = ''
    if (gradientType === 'linear') {
      result = `${gradientType}-gradient(to right, ${colorsAndPositionsString})`
    } else if (gradientType === 'radial') {
      result = `${gradientType}-gradient(circle at ${radialGradientXPosition}% ${radialGradientYPosition}%, ${colorsAndPositionsString})`
    }
    if (palettes.length === 1) {
      result = `${palettes[0].color}`
    }
    setState({
      cssGradient: result
    })
  }, [palettes, gradientType, gradientPosition, radialGradientXPosition, radialGradientYPosition])

  useEffect(() => {
    createGradientBackground()
  }, [createGradientBackground, palettes, gradientType, gradientPosition, radialGradientXPosition, radialGradientYPosition])

  useEffect(() => {
    setState({
      activeColor: rgbaToHex(activePalette.color, true)
    })
  }, [setState, activePalette])
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      gap: '8px',
    }}>
      <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column', width: '100%', marginBottom: '8px' }}>
        <div >
          <Text>Tap anywhere on the gradient to add more colors</Text>
        </div>
        <div style={{ width: '100%', marginBottom: '16px', marginTop: '8px' }}>
          <div style={{ position: 'relative', height: '24px' }}>
            <div
              className="gradient-range-settings__slider-container"
              style={{ background: state.cssGradient }}
            >
              <MultiThumbSlider
                palettes={palettes}
                activePaletteId={activePalette.id}
                setPalettes={(val) => {
                  val.forEach(item => {
                    item.colorObj = parseRgba(item.color)
                  })
                  setPalettes(val)
                }}
                setActivePalette={(val) => {
                  val.colorObj = parseRgba(val.color)
                  setActivePalette(val)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <GradientStops palettes={palettes} setPalettes={setPalettes} />
      </div>
      {!hideDirection && <div style={{ paddingTop: 'var(--spectrum-global-dimension-size-150)', width: '100%' }}>
        <SettingSliderCom
          text={'Gradient direction'}
          minValue={0}
          maxValue={360}
          step={1}
          value={(direction || 0) + 180}
          setValue={(val) => {
            setDirection?.(val - 180)
          }}
        />
      </div>}
    </div>
  )
}

export default SettingGradient
