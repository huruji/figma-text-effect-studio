// @ts-nocheck
import { useRef } from 'preact/compat'
import { v4 as uuidv4 } from 'uuid'
import { hexToRgbaObject, removeAlphaFromRgbaColor } from 'src/shared/utils'
import { maxColorsCount } from 'src/shared/constants'
import type { AppSettingOptionType } from 'src/shared/types/interfaces'
import '!./MultiThumbSlider.css'
import classnames from 'classnames'
import { h } from 'preact'

interface MultiThumbSliderProps {
  palettes: AppSettingOptionType['palettes']
  activePaletteId: string | undefined
  setPalettes: (palettes: AppSettingOptionType['palettes']) => void
  setActivePalette: (palette: AppSettingOptionType['activePalette']) => void
}

const MultiThumbSlider: React.FC<MultiThumbSliderProps> = ({
  palettes,
  activePaletteId,
  setPalettes,
  setActivePalette,
}) => {
  console.log('palettes', palettes)
  const sliderContainerRef = useRef<HTMLDivElement>(null)

  const handleColorPositionChange = (value: string, paletteId: string) => {
    const newPalettes = [...palettes]
    const neededPalette = newPalettes.find(
      (palette) => palette.id === paletteId
    )

    if (neededPalette) {
      neededPalette.position = Math.round(parseInt(value, 10))
      setPalettes(newPalettes)
    }
  }

  const handleSliderClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 解析 rgba 颜色
    const parseRgba = (rgbaStr: string) => {
      const match = rgbaStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
      if (!match) return { red: 0, green: 0, blue: 0, alpha: 1 }
      return {
        red: parseInt(match[1], 10),
        green: parseInt(match[2], 10),
        blue: parseInt(match[3], 10),
        alpha: match[4] ? parseFloat(match[4]) : 1
      }
    }

    if (event.target === sliderContainerRef.current) {
      const mousePosition = event.nativeEvent.offsetX
      const positionForInput = Math.round(
        (mousePosition * 100) / Number(sliderContainerRef.current?.offsetWidth)
      )

      // 找到点击位置两侧最近的颜色
      const sortedPalettes = [...palettes].sort((a, b) => a.position - b.position)
      let leftColor = sortedPalettes[0]
      let rightColor = sortedPalettes[sortedPalettes.length - 1]

      if (sortedPalettes.length === 1) {
        const leftRgba = parseRgba(leftColor.color)

        const newColor = `rgba(${leftRgba.red
          }, ${leftRgba.green
          }, ${leftRgba.blue
          }, ${leftRgba.alpha
          })`

        const newPalette = {
          id: uuidv4(),
          color: newColor,
          position: positionForInput,
        }

        setActivePalette(newPalette)
        setPalettes([...palettes, newPalette])
        return
      }

      for (let i = 0; i < sortedPalettes.length - 1; i++) {
        if (sortedPalettes[i].position <= positionForInput && sortedPalettes[i + 1].position >= positionForInput) {
          leftColor = sortedPalettes[i]
          rightColor = sortedPalettes[i + 1]
          break
        }
      }


      // 计算新颜色，使用线性插值
      const ratio = (positionForInput - leftColor.position) / (rightColor.position - leftColor.position)

      const leftRgba = parseRgba(leftColor.color)
      const rightRgba = parseRgba(rightColor.color)

      const newColor = `rgba(${Math.round(leftRgba.red + (rightRgba.red - leftRgba.red) * ratio)
        }, ${Math.round(leftRgba.green + (rightRgba.green - leftRgba.green) * ratio)
        }, ${Math.round(leftRgba.blue + (rightRgba.blue - leftRgba.blue) * ratio)
        }, ${leftRgba.alpha + (rightRgba.alpha - leftRgba.alpha) * ratio
        })`

      const newPalette = {
        id: uuidv4(),
        color: newColor,
        position: positionForInput,
      }

      setActivePalette(newPalette)
      setPalettes([...palettes, newPalette])
    }
  }

  return (
    <div
      ref={sliderContainerRef}
      className={classnames('multi-thumb-slider', {
        limit: palettes.length >= maxColorsCount,
      })}
      onClick={handleSliderClick}
    >
      {palettes.map((palette) => (
        <input
          key={palette.id}
          aria-label="color-position"
          className={classnames('multi-thumb-slider__input', {
            active: activePaletteId === palette.id,
          })}
          style={{
            ['--gradient-thumb-color' as string]: removeAlphaFromRgbaColor(
              palette.color
            ),
          }}
          type="range"
          min="0"
          max="100"
          step="1"
          value={palette.position}
          onClick={() => setActivePalette(palette)}
          onChange={(event) =>
            handleColorPositionChange(event.target.value, palette.id)
          }
        />
      ))}
    </div>
  )
}

export default MultiThumbSlider
