# ColorPickerWrapper 组件

一个独立的颜色选择器包装组件，可以在其他地方复用。

## 使用方式

```tsx
import ColorPickerWrapper from 'src/components/setting-colorselector-com/ColorPickerWrapper'

// 基本使用
<ColorPickerWrapper
  color="#ff0000"
  onChange={(color) => console.log('颜色变化:', color)}
/>

// 带索引的使用（用于多颜色场景）
<ColorPickerWrapper
  color="#00ff00"
  onChange={(color) => handleColorChange(color, 1)}
  index={1}
/>
```

## Props

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| color | string | ✅ | - | 当前颜色值，支持 hex 格式 |
| onChange | (color: string) => void | ✅ | - | 颜色变化回调函数 |
| index | number | ❌ | 0 | 颜色索引，用于调试和标识 |

## 功能特性

- 🎨 **可视化颜色选择**: 通过颜色面板选择颜色
- ⌨️ **手动输入**: 支持直接输入 hex 颜色值
- ✅ **实时验证**: 自动验证颜色格式有效性
- 🖱️ **智能交互**: 点击外部区域自动关闭
- 🔄 **双向同步**: 颜色面板和输入框完全同步

## 样式

组件使用以下 CSS 类名，需要确保引入了对应的样式文件：

- `.color-picker-wrapper`
- `.color-block-button`
- `.color-picker-popup`
- `.color-input-container`

## 示例场景

### 单个颜色选择
```tsx
function MyComponent() {
  const [color, setColor] = useState('#ff0000')

  return (
    <div>
      <label>选择颜色:</label>
      <ColorPickerWrapper
        color={color}
        onChange={setColor}
      />
    </div>
  )
}
```

### 多个颜色选择
```tsx
function MultiColorComponent() {
  const [colors, setColors] = useState(['#ff0000', '#00ff00', '#0000ff'])

  const handleColorChange = (color: string, index: number) => {
    const newColors = [...colors]
    newColors[index] = color
    setColors(newColors)
  }

  return (
    <div>
      {colors.map((color, index) => (
        <ColorPickerWrapper
          key={index}
          color={color}
          onChange={(newColor) => handleColorChange(newColor, index)}
          index={index}
        />
      ))}
    </div>
  )
}
```