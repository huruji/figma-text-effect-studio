// @ts-nocheck
import { useAtom } from 'jotai'
import {
  FormField,
  Carousel,
  ImageCard,
  Text
} from "@canva/app-ui-kit"
import { settingAtom } from 'src/atoms/setting'
import JigglePNG from 'src/assets/imgs/jiggle.png'
import ThreeDPNG from 'src/assets/imgs/3d.png'

type StyleConfigType = {
  src: string
  style: string
  subPage: string
}

const IndexPage = () => {
  const [setting, setSetting] = useAtom(settingAtom)
  const stylesConfig: StyleConfigType[] = []
  let shouldShowJiggle = true
  let shouldShow3D = true
  if (setting?.currentConfig?.lettering?.editable === 0) {
    shouldShowJiggle = false
  }
  if (setting?.currentConfig?.depth?.editable === 0 && setting?.currentConfig?.depth2?.editable === 0) {
    shouldShow3D = false
  }
  if (shouldShowJiggle) {
    stylesConfig.push({
      src: JigglePNG,
      style: 'Jiggle',
      subPage: 'jiggle'
    })
  }
  if (shouldShow3D) {
    stylesConfig.push({
      src: ThreeDPNG,
      style:'3D',
      subPage: '3d'
    })
  }
  if (stylesConfig.length === 0) {
    return null
  }

  return (
    <FormField
      label={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>{'Effects'}</div>
        </div>}
      control={(props) => {
        return <Carousel>
          {stylesConfig.map((item, index) => {
            return <div key={item.subPage} style={{
              height: 120,
              width: 100,
              cursor: 'pointer'
            }}>
            <ImageCard
              selectable={true}
              ariaLabel={item.subPage}
              alt={item.subPage || ''}
              thumbnailUrl={item.src}
              thumbnailHeight={100}
              onClick={() => {
                setSetting((s) => {
                  return {
                    ...s,
                    subPage: item.subPage
                  }
                })
              }}
            />
            <Text alignment='center' size='small' variant='regular'>{item.style}</Text>
            </div>
          })}
        </Carousel>
      }}
    />
  )
}

export default IndexPage
