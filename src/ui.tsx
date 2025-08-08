import {
  Button,
  Columns,
  Container,
  Muted,
  render,
  Text,
  TextboxNumeric,
  VerticalSpace,
  LoadingIndicator
} from '@create-figma-plugin/ui'
import { useAtom } from 'jotai'
import { settingAtom, type SettingType } from './atoms/setting'
import { emit } from '@create-figma-plugin/utilities'
import { getInitData } from './services'
import { h } from 'preact'
import { useSetState } from 'ahooks'
import { useCallback, useState, useEffect } from 'preact/hooks'
import styles from "./App.css"
import IndexPage from './pages/index-page/index'
import PremiumPage from './pages/premium'
import { useGetUserInfo } from './use-get-userinfo'

import { CloseHandler, CreateRectanglesHandler } from './types'
import { userInfoService } from './services/user-info-service'

function Plugin() {
  const [count, setCount] = useState(false)
  const [setting, setSetting] = useAtom(settingAtom)
  const [userInfo, setUserInfo] = useState<any>(null)
  const [state, setState] = useSetState<{
    loading: boolean
  }>({
    loading: true,
  })

  useGetUserInfo({
    needInit: true,
    listenVisibility: true,
  })

  // 初始化用户信息
  useEffect(() => {
    // 首先尝试从内存获取缓存的用户信息
    const cachedUserInfo = userInfoService.getUserInfoFromStorage()
    debugger;
    if (cachedUserInfo) {
      setUserInfo(cachedUserInfo)
      setState({ loading: false })
      console.log('从内存获取到用户信息:', cachedUserInfo)
    } else {
      // 如果没有缓存，请求新的用户信息
      emit('REQUEST_USER_INFO')

      // 简单轮询检查用户信息是否已接收并存储
      const checkUserInfo = setInterval(() => {
        const currentUserInfo = userInfoService.getCurrentUserInfo()
        if (currentUserInfo) {
          setUserInfo(currentUserInfo)
          setState({ loading: false })
          clearInterval(checkUserInfo)
          console.log('用户信息已接收并存储到内存:', currentUserInfo)
        }
      }, 200)

      // 清理定时器
      return () => clearInterval(checkUserInfo)
    }
  }, [])

  useEffect(() => {
    (async () => {
      setState({
        loading: true
      })
      try {
        const res = await getInitData()
        const newConfig: Partial<SettingType> = {}
        if (res.effects) {
          newConfig.allEffects = res.effects
        }
        if (res.useR2Url !== undefined) {
          newConfig.useR2Url = res.useR2Url
        }
        if (res.exportSizeOptions !== undefined) {
          newConfig.exportSizeOptions = res.exportSizeOptions
        }
        if (res.marketingInfo !== undefined) {
          newConfig.marketingInfo = res.marketingInfo
        }
        if (res.totalTextEffects !== undefined) {
          newConfig.totalTextEffects = res.totalTextEffects
        }
        setSetting((s) => {
          return {
            ...s,
            ...newConfig
          }
        })
      } catch (err) {
        console.log('err: ', err)
      }
      setState({
        loading: false
      })
    })()
  }, [])

  console.log('state.loading', state.loading)

  if (state.loading) {
    return <div className={styles.loadingContainer}>
      <LoadingIndicator />
    </div>
  }

  return (
    <div style={{
      height: '100vh',
      paddingLeft: '8px',
      paddingRight: '8px',
      paddingTop: '8px',
      }}>
      <IndexPage />
      {/* <GlobalMessage /> */}
      {/* <HomePage /> */}
      {/* <FontSettingPage /> */}
      <PremiumPage />
    </div>
  )
}

export default render(Plugin)
