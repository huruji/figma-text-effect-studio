import { Toggle, Text } from "@create-figma-plugin/ui"
import { h } from 'preact'

type IProps = {
  value: boolean
  setValue: (val: boolean) => void
  text: string
}

const SettingAnimate = ({
  value,
  setValue,
  text,
}: IProps) => {
  const handleChange = (event: any) => {
    setValue(event.target.checked);
  }
  return <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div style={{
        fontSize: '12px',
        fontWeight: '600',
        color: 'var(--figma-color-text-secondary)',
        marginBottom: '8px',
        flexGrow: 1,
      }}>
      {text}
    </div>
    <Toggle onChange={handleChange} value={value}>
      <div></div>
    </Toggle>
  </div>
}

export default SettingAnimate
