import { useRef, useEffect } from "preact/compat"
import {
  LoadingIndicator
} from '@create-figma-plugin/ui'
import { useSetState } from 'ahooks'
import { useAtom } from 'jotai'
import { settingAtom } from 'src/atoms/setting'
import { getConfigDataById, getCurrentConfig } from 'src/services'
import SettingPage from './setting-page'
import CryptoJS from 'crypto-js'
import Back from 'src/components/back'
import { h } from 'preact'

// 生成 key（32字节，AES-256）
const keyString = 'keyvncanvas'
const key = CryptoJS.SHA256(keyString) // 32字节

// 生成 iv（16字节，AES 要求）
const ivString = 'canvaskeyvn'
const iv = CryptoJS.MD5(ivString) // 16字节


function HomePage() {
  const [setting, setSetting] = useAtom(settingAtom)
  const isDark = false
  const [state, setState] = useSetState({
    loading: true,
  })

  const getConfigData = async () => {
    setState((prev) => {
      return {
        ...prev,
        loading: true
      }
    })
    try {
      const res = await getCurrentConfig({
        r2Url: setting.currentConfigR2Url,
        id: setting.currentConfigId,
        useUrl: setting.useR2Url
      })
      debugger
      // const config = res.p
      let config = res.p
      try {
        if (typeof config === 'string') {
          const decrypted = CryptoJS.AES.decrypt(config, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          })
          const plaintextConfig = decrypted.toString(CryptoJS.enc.Utf8)
          config = JSON.parse(plaintextConfig)
        }
      } catch (error) {
        console.error('error: ', error)
      }
      setSetting((prev) => {
        return {
          ...prev,
          currentConfig: config
        }
      })
    } catch (error) {
      console.error('error: ', error)
    } finally {
      setState((prev) => {
        return {
          ...prev,
          loading: false
        }
      })
    }
  }

  useEffect(() => {
    getConfigData()
  }, [setting.currentConfigId])

  let backTitle = 'Settings'
  switch (setting.subPage) {
    case 'filling':
      backTitle = 'Filling'
      break
    case 'outline':
      backTitle = 'Outline'
      break
    case 'shadow':
      backTitle = 'Shadow'
      break
    case '3d':
      backTitle = '3D'
      break
    case 'jiggle':
      backTitle = 'Jiggle'
      break
    default:
      backTitle = 'Settings'
      break
  }

  const handleBack = () => {
    const subPages = ['filling', 'outline', 'shadow', '3d', 'jiggle']
    if (subPages.includes(setting.subPage)) {
      setSetting(prev => ({
        ...prev,
        subPage: 'text'
      }))
    } else {
      setSetting(prev => ({
        ...prev,
        marketingInfo: {},
        page: 'index',
        subPage: 'text'
      }))
    }
  }
  console.log('setting', state)

  return (
    <div style={setting.page !== 'home' ? {
      display: 'none'
    } : {}}>
      {
        state.loading && (
          <div><div style={{
            backgroundColor: 'var(--spectrum-global-color-static-white)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}>
            <Back onCancel={handleBack}
              title={backTitle} />
          </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
             <LoadingIndicator />
            </div>
          </div>
        )
      }
      {
        !state.loading && (
          <SettingPage />
        )
      }
    </div>
  )
};

export default HomePage
