
import { Item, TabList, TabPanels, Tabs, } from '@adobe/react-spectrum'
import Depth1 from './depth1'
import Depth2 from './depth2'

function ThreeDepthSetting() {
  let tabs = [
    {
      id: 1,
      name: 'Depth one',
      children: <Depth1 />
    },
    {
      id: 2,
      name: 'Depth two',
      children: <Depth2 />
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

export default ThreeDepthSetting
