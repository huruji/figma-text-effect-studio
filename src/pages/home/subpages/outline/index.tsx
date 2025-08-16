import { Tabs, TabsOption } from '@create-figma-plugin/ui'
import { useSetState } from 'ahooks'
import { useAtom } from 'jotai'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import Outline1 from './outline1'
import Outline2 from './outline2'
import { h } from 'preact'

function OutlineSetting() {
  const [setting, setSetting] = useAtom(settingAtom)
  const [state, setState] = useSetState({
    isLoading: false,
    activeTabKey: 'outline1',
  })

  const options: Array<TabsOption> =  [
    {
      value: 'outline1',
      children: <Outline1 />
    },
    {
      value: 'outline2',
      children: <Outline2 />
    },
  ]

  return <Tabs
    options={options}
    value={state.activeTabKey}
    onChange={(event) => {
      const newValue = event.currentTarget.value;
      setState({
        activeTabKey: newValue,
      })
    }}
  >
  </Tabs>
};

export default OutlineSetting
