import { Text } from '@create-figma-plugin/ui'
import { h } from 'preact'
import ColorPickerWrapper from './ColorPickerWrapper'
import '!./index.css'

type IProps = {
  des?: string
  text: string
  colors: string[]
  setColors: (val: string[]) => void
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' | 'left' | 'right' | 'top' | 'bottom'
}

const SettingColorselectorCom = ({
  text,
  des,
  colors,
  setColors,
  placement = 'bottomRight'
}: IProps) => {
  console.log('colors: ', colors)

  // 处理单个颜色变化
  const handleSingleColorChange = (color: string) => {
    setColors([color])
  }

  // 处理多个颜色变化
  const handleMultipleColorChange = (color: string, index: number) => {
    const newColors = [...colors]
    newColors[index] = color
    setColors(newColors)
  }

  if (colors.length === 1) {
    return (
      <div className="color-picker-single-container">
        <div style={{
        fontSize: '12px',
        fontWeight: '600',
        color: 'var(--figma-color-text-secondary)',
        marginBottom: '8px',
        flexGrow: 1,
      }}>{text}</div>
        <div style={{
          marginRight: '8px'
        }}><ColorPickerWrapper
          color={colors[0]}
          onChange={handleSingleColorChange}
          index={0}
          placement={placement}
          // placement="bottomRight"
        />
        </div>
      </div>
    )
  }

  // 多颜色选择器支持
  return (
    <div className="color-picker-multi-container">
      <div><Text>{text}</Text></div>
      {des && <div className="color-picker-description">{des}</div>}
      <div className="color-picker-multi-items">
        {colors.map((color, index) => (
          <ColorPickerWrapper
            key={index}
            color={color}
            onChange={(newColor) => handleMultipleColorChange(newColor, index)}
            index={index}
            placement={placement}
          />
        ))}
      </div>
    </div>
  )
}

export default SettingColorselectorCom
