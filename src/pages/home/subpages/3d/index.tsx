
import { Tabs, TabsOption } from '@create-figma-plugin/ui'
import { useSetState } from 'ahooks'
import Depth1 from './depth1'
import Depth2 from './depth2'
import { h } from 'preact'

function ThreeDepthSetting() {
  const [state, setState] = useSetState({
    isLoading: false,
    activeTabKey: 'depth1',
  })

  const options: Array<TabsOption> = [
    {
      value: 'depth1',
      children: <Depth1 />
    },
    {
      value: 'depth2',
      children: <Depth2 />
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

export default ThreeDepthSetting
