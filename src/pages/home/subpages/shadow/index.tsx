import { Item, TabList, TabPanels, Tabs, } from '@adobe/react-spectrum'
import { useAtom } from 'jotai'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import InnerShadow from './innershadow'
import OuterShadow from './outershadow'

function OutlineSetting() {
  const [setting, setSetting] = useAtom(settingAtom)
  let shouldShowInnerShadow = true
  let shouldShowOuterShadow = true
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

    let tabs = [
      {
        id: 1,
        name: 'Inner shadow',
        children: <InnerShadow />
      },
      {
        id: 2,
        name: 'Outer shadow',
        children: <OuterShadow />
      },
    ]

    return (<Tabs
    items={tabs}
    density="regular"
    isEmphasized={true}
  >
    <TabList>
      {(item: typeof tabs[0]) => (
        <Item>
          {item.name}
        </Item>
      )}
    </TabList>
    <TabPanels>
      {(item: typeof tabs[0]) => (
        <Item>
          {item.children}
        </Item>
      )}
    </TabPanels>
  </Tabs>)
  }

  if (shouldShowInnerShadow) {
    return (<InnerShadow />)
  }

  if (shouldShowOuterShadow) {
    return (<OuterShadow />)
  }
};

export default OutlineSetting
