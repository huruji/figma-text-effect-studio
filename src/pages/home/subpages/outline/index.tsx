import { Item, TabList, TabPanels, Tabs, } from '@adobe/react-spectrum'
import { useSetState } from 'ahooks'
import { useAtom } from 'jotai'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import Outline1 from './outline1'
import Outline2 from './outline2'

function OutlineSetting() {
  const [setting, setSetting] = useAtom(settingAtom)
  const [state, setState] = useSetState({
    isLoading: false,
    activeTabKey: 'outline1',
  })

  let tabs = [
    {
      id: 1,
      name: 'Outline one',
      children: <Outline1 />
    },
    {
      id: 2,
      name: 'Outline one',
      children: <Outline2 />
    },
  ]

  return <Tabs
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
  </Tabs>
};

export default OutlineSetting
