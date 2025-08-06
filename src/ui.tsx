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
    <div>
      {userInfo && (
        <div>
          <Text>欢迎, {userInfo.name}!</Text>
          <VerticalSpace space="small" />
          <Muted>用户ID: {userInfo.id}</Muted>
          <Muted>存储方式: 内存</Muted>
          {userInfo.photoUrl && (
            <div style={{ marginTop: '8px' }}>
              <img
                src={userInfo.photoUrl}
                alt="用户头像"
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
              />
            </div>
          )}
          <VerticalSpace space="small" />
        </div>
      )}
      {/* 其他UI内容 */}
    </div>
  )
}

export default render(Plugin)
