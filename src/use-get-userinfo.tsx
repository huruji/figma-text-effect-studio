import { useEffect } from "preact/compat"
import { useAtom } from 'jotai'
import { useDocumentVisibility } from 'ahooks'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import { getUserInfo } from 'src/services'
import { userInfoService } from './services/user-info-service'
import { emit } from '@create-figma-plugin/utilities'

export const useGetUserInfo = ({
  needInit = true,
  listenVisibility = true,
}: {
  needInit?: boolean
  listenVisibility?: boolean
}) => {
  const [setting, setSetting] = useAtom(settingAtom)
  const documentVisibility = useDocumentVisibility()

  const getInfo = async () => {
    try {
      let userInfo = userInfoService.getUserInfoFromStorage()
      debugger
      if (!userInfo) {
        // 如果没有缓存，请求新的用户信息
        emit('REQUEST_USER_INFO')

        // 简单轮询检查用户信息是否已接收并存储
        userInfo = await new Promise(resolve => {
          setInterval(() => {
            const currentUserInfo = userInfoService.getCurrentUserInfo()
            resolve(currentUserInfo)
          }, 200)
        })
      }
      const res = await getUserInfo({
        userId: userInfo?.id || ''
      })
      const newSetting: Partial<SettingType> = {}
      if (res.credits !== undefined) {
        newSetting.credits = res.credits
      }
      if (res.totalCredits !== undefined) {
        newSetting.totalCredits = res.totalCredits
      }
      if (res.checkoutUrl) {
        newSetting.checkoutUrl = res.checkoutUrl
      }
      if (res.userId) {
        newSetting.userId = res.userId
      }
      if (res.showUserId !== undefined) {
        newSetting.showUserId = res.showUserId
      }
      if (res.showUpgradeButton !== undefined) {
        newSetting.showUpgradeButton = res.showUpgradeButton
      }
      if (res.isPro) {
        newSetting.userIsPro = true
        if (setting.checkPayment) {
          newSetting.checkPayment = false
        }
        if (setting.page === 'premium') {
          if (setting.premiumPrePage === 'index') {
            if (setting.currentConfigId) {
              newSetting.page = 'home'
              newSetting.subPage = 'text'
            }
          } else {
            newSetting.page = setting.premiumPrePage
          }
        }
      }
      setSetting(s => ({
        ...s,
        ...newSetting
      }))
      return res
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  useEffect(() => {
    if (needInit) {
      getInfo()
    }
  }, [needInit])
  useEffect(() => {
    if (!listenVisibility) return
    if (documentVisibility === 'visible') {
      // 如果 checkoutUrl 不存在，则获取用户信息
      if (!setting.checkoutUrl) {
        getInfo()
        return
      }
      // 如果用户是 pro，则不获取用户信息, 并且不检查支付状态
      if (setting.userIsPro) {
        setSetting((s) => ({
          ...s,
          checkPayment: false
        }))
        return
      }
      // 如果 checkPayment 为 true，则获取用户信息和支付状态
      if (setting.checkPayment) {
        getInfo()
        return
      }
      if (!setting.checkPayment) {
        return
      }
      getInfo()
    }
  }, [documentVisibility, listenVisibility])
  return [getInfo]
}