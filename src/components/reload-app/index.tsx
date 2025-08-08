import { Text, Button, IconRefresh16 } from '@create-figma-plugin/ui'
import { useState } from "preact/hooks"
import { settingAtom } from 'src/atoms/setting'
import { useAtom } from 'jotai'
import { getUserInfo } from 'src/services'
import { type SettingType } from 'src/atoms/setting'
import { h } from 'preact'

const ReloadApp = () => {
  const [setting, setSetting] = useAtom(settingAtom)
  const [alert, setAlert] = useState<string | null>(null)

  const getInfo = async () => {
    try {
      const userId = await setting.userId
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
      setSetting((s: any) => ({
        ...s,
        ...newSetting
      }))
      return res
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  const handleReload = async () => {
    const res = await getInfo()
    if (res && res.isPro) {
      setSetting((s: any) => ({
        ...s,
        page: 'home',
        subPage: 'text',
        checkPayment: false
      }))
    } else {
      setAlert('no_subscription')
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <Text>
        Already purchased? Reload the app to unlock your new features:
      </Text>
      <Button
          fullWidth
          secondary
          onClick={handleReload}
          style={{
            cursor: 'pointer',
            fontSize: '14px',
            height: '32px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
            <IconRefresh16 />
            Reload app
          </div>
        </Button>
      {alert && (
        <div style={{
          padding: '12px',
          backgroundColor: 'var(--figma-color-bg-danger)',
          border: '1px solid var(--figma-color-border-danger)',
          borderRadius: '6px',
          color: 'var(--figma-color-text-danger)'
        }}>
          <Text style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            Subscription Error
          </Text>
          <Text>
            No subscription found, please contact us to get support.
          </Text>
        </div>
      )}
    </div>
  )
}

export default ReloadApp
