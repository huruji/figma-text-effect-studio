import { useAtom } from 'jotai'
import { Button, Text } from '@create-figma-plugin/ui'
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
      <Text>
        {text}
      </Text>
      <div>
        <Button fullWidth onClick={handleClick}>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
            <Text>{value}</Text>
            {/* <ChevronRightIcon /> */}
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
