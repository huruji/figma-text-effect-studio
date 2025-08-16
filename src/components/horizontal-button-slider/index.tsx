import { h } from 'preact'
import { useRef, useEffect, useState } from 'preact/compat'
import { Button } from '@create-figma-plugin/ui'
import '!./index.css'

interface SlugItem {
  key: string
  label: string
}

interface HorizontalButtonSliderProps {
  items: SlugItem[]
  selectedValue?: string
  onItemSelect: (key: string) => void
  className?: string
}

const HorizontalButtonSlider = ({
  items,
  selectedValue,
  onItemSelect,
  className = ''
}: HorizontalButtonSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  // 检查是否需要显示箭头
  const checkArrows = () => {
    if (!containerRef.current) return

    const container = containerRef.current
    const { scrollLeft, scrollWidth, clientWidth } = container

    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1)
  }

  useEffect(() => {
    checkArrows()

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', checkArrows)
      return () => container.removeEventListener('scroll', checkArrows)
    }
  }, [items])

  // 向左滚动
  const handleScrollLeft = () => {
    if (!containerRef.current) return
    containerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
  }

  // 向右滚动
  const handleScrollRight = () => {
    if (!containerRef.current) return
    containerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
  }

  // 处理按钮点击
  const handleButtonClick = (key: string) => {
    const newValue = selectedValue === key ? '' : key
    onItemSelect(newValue)
  }

  return (
    <div className={`horizontal-button-slider ${className}`} style={{
      backgroundColor: 'var(--figma-color-bg)',
      paddingTop: '8px',
      paddingBottom: '8px',
    }}>
      {showLeftArrow && (
        <button
          className="scroll-arrow scroll-arrow--left"
          onClick={handleScrollLeft}
          aria-label="向左滚动"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M7.5 9L4.5 6L7.5 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div
        ref={containerRef}
        className="horizontal-button-slider__container"
        onScroll={checkArrows}
      >
        <div className="horizontal-button-slider__content">
          {items.map((item) => {
            const variant = selectedValue === item.key ? 'primary' : 'secondary'
            return (
              <div key={item.key} className="horizontal-button-slider__item">
                <Button
                  secondary
                  onClick={() => handleButtonClick(item.key)}
                  fullWidth={false}
                >
                  {item.label}
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      {showRightArrow && (
        <button
          className="scroll-arrow scroll-arrow--right"
          onClick={handleScrollRight}
          aria-label="向右滚动"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M4.5 3L7.5 6L4.5 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default HorizontalButtonSlider