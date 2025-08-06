import { useEffect } from "react"
import { useAtom } from 'jotai'
import { useDocumentVisibility } from 'ahooks'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import { getUserInfo } from 'src/services'
import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";


export const useGetUserInfo = ({
  needInit = true,
  listenVisibility = true,
  addOnUISdk
}: {
  needInit?: boolean
  listenVisibility?: boolean
  addOnUISdk: AddOnSDKAPI
}) => {
  const [setting, setSetting] = useAtom(settingAtom)
  const documentVisibility = useDocumentVisibility();

  const getInfo = async () => {
    try {
      const userId = await addOnUISdk.app.currentUser.userId();
      const res = await getUserInfo({
        userId
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
    if (!listenVisibility) return;
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