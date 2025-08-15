import { h } from 'preact'
import { IconButton, Button, IconTrash24 } from '@create-figma-plugin/ui'
import { hexToRgbaObject } from 'src/shared/utils'
import { parseRgba, type RgbaColor } from 'src/color-util'
import SettingSliderCom from '../setting-slider-com'
import ColorPickerWrapper from '../setting-colorselector-com/ColorPickerWrapper'
import { Text } from '@create-figma-plugin/ui'
import '!./index.css'
import { rgbaToHex } from 'src/shared/utils'
export type Palette = {
  color: string
  id: string
  position: number
  colorObj?: RgbaColor | null
  hexColor: string
}

type GradientSettingProps = {
  palettes: Palette[]
  setPalettes: (palettes: Palette[]) => void
}

const Stops = (props: GradientSettingProps) => {
  const { palettes, setPalettes } = props
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {
          palettes.map((palette, index) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '8px' }}>
                  <div>
                    <ColorPickerWrapper
                      color={palette.hexColor}
                      onChange={(hexColor) => {
                        console.log('Color changed to:', hexColor)
                        const { red, green, blue, alpha } = hexToRgbaObject(hexColor)
                        const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`
                        const newActivePalette = {
                          ...palette,
                          colorObj: parseRgba(rgbaColor),
                          color: rgbaColor,
                          hexColor: rgbaToHex(rgbaColor, true),
                        }

                        const newPalettes = [...palettes]
                        newPalettes[index] = newActivePalette
                        newPalettes.forEach(item => {
                          item.colorObj = parseRgba(item.color)
                          item.hexColor = rgbaToHex(item.color, true)
                        })
                        setPalettes(newPalettes)
                      }}
                      index={index}
                      placement="bottomLeft"
                    />
                  </div>
                  <div style={{
                    display: 'flex',
                    flexGrow: 1,
                    marginRight: palettes.length > 1 ? 'var(--spectrum-global-dimension-size-50)' : undefined,
                  }}>
                    <SettingSliderCom minValue={0} maxValue={100} value={palette.position} setValue={(val) => {
                      if (val) {
                        const position = (Number(val) < 0) ? 0 : (Number(val) > 100 ? 100 : Number(val))
                        const newActivePalette = {
                          ...palette,
                          position: Math.round(position)
                        }
                        const newPalettes = [...palettes]
                        newPalettes[index] = newActivePalette
                        newPalettes.forEach(item => {
                          item.colorObj = parseRgba(item.color)
                          item.hexColor = rgbaToHex(item.color, true)
                        })
                        setPalettes(newPalettes)
                      }
                    }} text=''/>
                    {/* <NumberInput min={0} max={100} value={palette.position} hasSpinButtons onChange={(val) => {
                    if (val) {
                      const position = (Number(val) < 0) ? 0 : (Number(val) > 100 ? 100 : Number(val))
                      const newActivePalette = {
                        ...palette,
                        position: Math.round(position)
                      }
                      const newPalettes = [...palettes]
                      newPalettes[index] = newActivePalette
                      newPalettes.forEach(item => {
                        item.colorObj = parseRgba(item.color)
                        item.hexColor = rgbaToHex(item.color, true)
                      })
                      setPalettes(newPalettes)
                    }
                  }} /> */}
                  </div>
                  <div>
                    {palettes.length > 1 && (
                      <Button
                        onClick={() => {
                          const newPalettes = [...palettes]
                          newPalettes.splice(index, 1)
                          newPalettes.forEach(item => {
                            item.colorObj = parseRgba(item.color)
                            item.hexColor = rgbaToHex(item.color, true)
                          })
                          setPalettes(newPalettes)
                        }}
                        style={{
                          cursor: 'pointer',
                          background: 'none',
                        }}
                        aria-label="delete"
                      >
                        <IconTrash24 color='brand'/>
                      </Button>
                    )}
                  </div>
              </div>
            )
          })
        }
      </div>
  )
}

export default Stops
