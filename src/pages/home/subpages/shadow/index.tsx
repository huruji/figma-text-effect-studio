import { Tabs, TabsOption } from '@create-figma-plugin/ui'
import { useAtom } from 'jotai'
import { useSetState } from 'ahooks'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import InnerShadow from './innershadow'
import OuterShadow from './outershadow'
import { h } from 'preact'

function OutlineSetting() {
  const [setting, setSetting] = useAtom(settingAtom)
  let shouldShowInnerShadow = true
  let shouldShowOuterShadow = true
  const [state, setState] = useSetState({
    isLoading: false,
    activeTabKey: 'inner',
  })

  if (setting?.currentConfig?.shadow?.inner?.editable === 0) {
    shouldShowInnerShadow = false
  }
  if (setting?.currentConfig?.shadow?.outer?.editable === 0) {
    shouldShowOuterShadow = false
  }

  if (!shouldShowInnerShadow && !shouldShowOuterShadow) {
    return null
  }

  if (shouldShowInnerShadow && shouldShowOuterShadow) {

    const options: Array<TabsOption> = [
      {
        value: 'inner',
        children: <InnerShadow />
      },
      {
        value: 'outer',
        children: <OuterShadow />
      },
    ]

    return (<Tabs
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
    )
  }

  if (shouldShowInnerShadow) {
    return (<InnerShadow />)
  }

  if (shouldShowOuterShadow) {
    return (<OuterShadow />)
  }
};

export default OutlineSetting
