import type { Color } from '@rc-component/color-picker';
import { Textbox } from '@create-figma-plugin/ui'
import ColorPicker from '@rc-component/color-picker';
import { useState, useEffect, useRef } from 'preact/hooks'
import { h } from 'preact'
import placements from './placements'

// 颜色格式化工具函数
export const toHexFormat = (value?: string) =>
  value?.replace(/[^0-9a-fA-F#]/g, '').slice(0, 9) || '';

// 验证是否为有效的hex颜色
const isValidHexColor = (hex: string): boolean => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

type ColorPickerWrapperProps = {
  color: string
  onChange: (color: string) => void
  index?: number
  placement?: keyof typeof placements
}

const ColorPickerWrapper = ({ color, onChange, index = 0, placement = 'bottomLeft' }: ColorPickerWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(color)
  const containerRef = useRef<HTMLDivElement>(null)

  // 同步外部颜色变化到输入框
  useEffect(() => {
    setInputValue(color)
  }, [color])

  // 点击外部关闭弹出层
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen])

  // 处理颜色选择器变化
  const handleColorChange = (color: Color) => {
    console.log('ColorPicker changed:', color)
    if (color?.toHexString) {
      const hexColor = color.toHexString()
      console.log('Setting color to:', hexColor)
      onChange(hexColor)
      setInputValue(hexColor)
    }
  }

  // 处理输入框变化
  const handleInputChange = (value: string) => {
    console.log('Input changed:', value)
    // 立即更新输入框显示值
    setInputValue(value)

    // 格式化并验证颜色值
    const formattedValue = toHexFormat(value)
    console.log('Formatted value:', formattedValue)

    // 只有当颜色有效时才更新颜色状态
    if (isValidHexColor(formattedValue)) {
      console.log('Valid color, updating colors')
      onChange(formattedValue)
    }
  }

  // 颜色块按钮组件
  const ColorBlockButton = ({ color, onClick }: { color: string, onClick: () => void }) => (
    <div
      className="color-block-button"
      onClick={onClick}
      // eslint-disable-next-line react/forbid-dom-props
      style={{ '--color': color } as any}
    />
  )

  return (
    <div className="color-picker-wrapper" ref={containerRef}>
      <ColorBlockButton
        color={color}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className={`color-picker-popup color-picker-popup--${placement}`}>
          <ColorPicker
            value={color}
            onChange={handleColorChange}
            panelRender={(panel) => (
              <div>
                {panel}
                <div className="color-input-container">
                  <Textbox
                    value={inputValue}
                    placeholder="#163cff"
                    onInput={(event) => {
                      const target = event.target as HTMLInputElement
                      handleInputChange(target.value)
                    }}
                  />
                </div>
              </div>
            ) as any}
          />
        </div>
      )}
    </div>
  )
}

export default ColorPickerWrapper