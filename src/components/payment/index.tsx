
import { Text, Button, IconButton, IconLockLocked24 } from '@create-figma-plugin/ui'
import { useState } from "preact/hooks"
import { settingAtom } from 'src/atoms/setting'
import { useAtom } from 'jotai'
import { getUserInfo } from 'src/services'
import { type SettingType } from 'src/atoms/setting'
import UserIdComponent from 'src/components/payment/userid'
import LinkPayment from 'src/components/payment/link-payment'
import { openExternalUrl } from 'src/util'
import { h } from 'preact'

type Iprops = {
  hideUpgradeButton?: boolean
  upgradeVariant?: 'accent' | 'secondary'
}

const Payment = ({ hideUpgradeButton = false, upgradeVariant = 'accent' }: Iprops) => {
  const [setting, setSetting] = useAtom(settingAtom)

  if (setting.userIsPro) {
    return (
      <div style={{
        marginTop: "8px",
        paddingBottom: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            ✓
          </div>
          <Text>
            Thanks for your purchase!
          </Text>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text>
            You have unlimited access to all features.
          </Text>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <LinkPayment />
        </div>
        {/* <UserIdComponent /> */}
      </div>
    )
  }

  return (
    <div style={{
      marginTop: "8px"
    }}>
      {!hideUpgradeButton && (
        <Button
          fullWidth
          style={{
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            height: '32px'
          }}
          onClick={() => {
            setSetting((s: any) => ({
              ...s,
              checkPayment: true
            }))
            // 使用 Figma Plugin 的方式打开链接
            if (setting.checkoutUrl) {
              debugger;
              openExternalUrl(setting.checkoutUrl)
            }
            console.log('checkoutUrl', setting.checkoutUrl)
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', color: '#fff', fontSize: '14px' }}>
            <IconLockLocked24 />
            Upgrade
          </div>
        </Button>
      )}
      {/* <UserIdComponent /> */}
    </div>
  )
}

export default Payment
