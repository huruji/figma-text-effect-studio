import { SegmentedControl } from '@create-figma-plugin/ui'
import { h } from 'preact'
import styles from './index.css'

type IProps = {
  options: {
    text: string
    value: string
  }[]
  value: string
  onChange: (value: string) => void
  name: string
}

const CustomSegmentedControl = ({ options, value, onChange, name }: IProps) => {
  const handleChange = (event: h.JSX.TargetedEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    onChange(value)
  }
  return <div className='segmented-control-container'>
    <div style={{
        fontSize: '12px',
        fontWeight: '600',
        color: 'var(--figma-color-text-secondary)',
        marginBottom: '8px'
      }}>
        {name}
      </div>
      <div className={styles['setting-segmented-control-wrapper']}><SegmentedControl
        style={{
          cursor: 'pointer',
        }}
        options={options}
        value={value}
        onChange={handleChange}
      />
      </div>
    </div>
}

export default CustomSegmentedControl
