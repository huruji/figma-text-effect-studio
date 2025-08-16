import { RangeSlider } from '@create-figma-plugin/ui'
import { h } from 'preact'

type IProps = {
  value: number
  setValue: (val: number) => void
  maxValue?: number
  minValue?: number
  step?: number
  text: string
  des?: string
}

const SettingSliderCom = ({
  value,
  setValue,
  maxValue = 100,
  text,
  minValue = 1,
  step = 1,
}: IProps) => {
  const handleInput = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
    {text && <div style={{
      fontSize: '12px',
      fontWeight: '600',
      color: 'var(--figma-color-text-secondary)',
      marginBottom: '8px'
    }}>
      {text}
    </div>}
    <RangeSlider
      minimum={minValue}
      maximum={maxValue}
      onInput={handleInput}
      value={value.toString()}
    />
  </div>
}

export default SettingSliderCom
