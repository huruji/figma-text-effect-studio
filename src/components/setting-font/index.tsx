import { useAtom } from 'jotai'
import { Button, Text, IconChevronRightLarge24 } from '@create-figma-plugin/ui'
import { settingAtom } from 'src/atoms/setting'
// import { ChevronRightIcon } from '@create-figma-plugin/ui'
import '!./index.css'
import { h } from 'preact'

type IProps = {
  value: string
  setValue: (val: string) => void
  text: string
  des?: string
}

const SettingFont = ({
  value,
  setValue,
  text,
  des
}: IProps) => {
  const [setting, setSetting] = useAtom(settingAtom)
  const handleClick = async () => {
    setSetting((s) => {
      return {
        ...s,
        page: 'font',
      }
    })
  }
  return (
    <div>
      <div style={{
        fontSize: '12px',
        fontWeight: '600',
        color: 'var(--figma-color-text-secondary)',
        marginBottom: '8px',
        flexGrow: 1,
      }}>
        {text}
      </div>
      <div>
        <Button secondary fullWidth onClick={handleClick} style={{
          height: '32px',
          cursor: 'pointer'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center',cursor: 'pointer' }}>
            <Text>{value}</Text>
            <IconChevronRightLarge24 />
          </div>
        </Button>
      </div>

    </div>
  )
  return (
    <FormField
      label={''}
      description={des}
      value={value}
      control={(props) => (
        <div className={'settingFontButtonContainer'}>
          <Button
            stretch={true}
            variant="secondary"
            alignment="start"
            onClick={handleClick}
            iconPosition={'end'}
            icon={() => <ChevronRightIcon />}
            {...props}
          >
            {value}
          </Button>
        </div>
      )}
    />
  )
}

export default SettingFont
