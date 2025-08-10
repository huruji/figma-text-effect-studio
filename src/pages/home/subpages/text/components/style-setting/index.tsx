import { useAtom } from 'jotai'
import { settingAtom } from 'src/atoms/setting'
import { h } from 'preact'
import { Text, Columns } from '@create-figma-plugin/ui'
const FillingPNG = require('src/assets/imgs/filling.png')
const OutlinePNG = require('src/assets/imgs/outline.png')
const ShadowPNG = require('src/assets/imgs/shadow.png')
const JigglePNG = require('src/assets/imgs/jiggle.png')
const ThreeDPNG = require('src/assets/imgs/3d.png')
import styles from './index.css'

type StyleConfigType = {
  src: string
  style: string
  subPage: string
}

const IndexPage = () => {
  const [setting, setSetting] = useAtom(settingAtom)
  const stylesConfig: StyleConfigType[] = []
  let shouldShowFilling = true
  let shouldShowOutline = true
  let shouldShowShadow = true
  if (setting?.currentConfig?.fill?.editable === 0) {
    shouldShowFilling = false
  } else {
    // 如果filling 是图片则暂时不可编辑
    // TODO: 后期需要支持图片填充
    if (setting?.currentConfig?.fill?.texture?.active === 1) {
      shouldShowFilling = false
    }
  }
  if (setting?.currentConfig?.outline?.first?.editable === 0 && setting?.currentConfig?.outline?.second?.editable === 0) {
    shouldShowOutline = false
  } else {
    // TODO: 后期需要支持图片填充
    if (setting?.currentConfig?.outline?.first?.fill?.texture?.active === 1 && setting?.currentConfig?.outline?.second?.fill?.texture?.active === 1) {
      shouldShowOutline = false
    }
  }
  if (setting?.currentConfig?.shadow?.inner?.editable === 0 && setting?.currentConfig?.shadow?.outer?.editable === 0) {
    shouldShowShadow = false
  } else {
    // TODO: 后期需要支持图片填充
    if (setting?.currentConfig?.shadow?.inner?.fill?.texture?.active === 1 && setting?.currentConfig?.shadow?.outer?.fill?.texture?.active === 1) {
      shouldShowShadow = false
    }
  }
  if (shouldShowFilling) {
    stylesConfig.push({
      src: FillingPNG,
      style: 'Filling',
      subPage: 'filling'
    })
  }
  if (shouldShowOutline) {
    stylesConfig.push({
      src: OutlinePNG,
      style: 'Outline',
      subPage: 'outline'
    })
  }
  if (shouldShowShadow) {
    stylesConfig.push({
      src: ShadowPNG,
      style: 'Shadow',
      subPage: 'shadow'
    })
  }

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
      style: '3D',
      subPage: '3d'
    })
  }

  if (stylesConfig.length === 0) {
    return null
  }
  return (
    <div>
      <div style={{
        fontSize: '12px',
        fontWeight: '600',
        color: 'var(--figma-color-text-secondary)',
        marginBottom: '4px'
      }}>
        Styles
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {stylesConfig.map((item, index) => {
          return <div key={item.subPage} style={{
            cursor: 'pointer',
            width: 'calc((100% - 16px) / 3)',
          }}
            onClick={() => {
              setSetting((s) => {
                return {
                  ...s,
                  subPage: item.subPage
                }
              })
            }}
          >
            <div className={styles['style-setting-item']} >
              <img
                style={{
                  width: '100%',
                }}
                src={item.src}
                alt={item.style}
              />
            </div>
            <div style={{ textAlign: 'center' }}><div style={{
              fontSize: '12px',
              color: 'var(--figma-color-text-secondary)',
              marginBottom: '8px'
            }}>{item.style}</div></div>
          </div>
        })}
      </div>
    </div>
  )
}

export default IndexPage
