import { useRef, useEffect } from "preact/hooks"
import { h } from 'preact'
import { Text, Stack, IconCheckLarge24 } from '@create-figma-plugin/ui'
import { useSetState } from 'ahooks'
import { useAtom } from 'jotai'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import Back from 'src/components/back'
import Payment from 'src/components/payment'
import ReloadApp from 'src/components/reload-app'
// 这是正确的引用图片的方式，不要动
const PremiumPng = require('src/premium.png')

function PremiumPage() {
  const [setting, setSetting] = useAtom(settingAtom)
  const [state] = useSetState({
    isLoading: false,
  })

  return (
    <div style={setting.page !== 'premium' ? {
      display: 'none'
    } : {}}>
      <Back onCancel={() => {
        setSetting((prev: any) => {
          const prevPremiumPrePage = prev.premiumPrePage
          if (prevPremiumPrePage) {
            return {
              ...prev,
              page: prevPremiumPrePage,
              premiumPrePage: ''
            }
          }
          return {
            ...prev,
            page: 'index',
            subPage: 'text',
            premiumPrePage: ''
          }
        })
      }}
        title={'Pro'} />
      <div>
        <div>
          <div style={{
            paddingLeft: '16px',
            paddingRight: '16px'
          }}>
            <img
              src={PremiumPng}
              alt="Premium"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                marginBottom: '16px'
              }}
            />
            <div style={{
              marginTop: '16px'
            }}>
              <div className="text-primary" style={{
                marginBottom: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'var(--figma-color-text-primary)'
              }}>
                Upgrade to unlock
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconCheckLarge24 color="brand" />
                  <div style={{
                    paddingLeft: '4px',
                    display: 'inline-block'
                  }}>
                    <div className="text-secondary">Over {setting.totalTextEffects} text effects</div>
                  </div>
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconCheckLarge24 color="brand" />
                  <div style={{
                    paddingLeft: '4px',
                    display: 'inline-block'
                  }}>
                    <div className="text-secondary">Over 2000 fonts</div>
                  </div>
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconCheckLarge24 color="brand" />
                  <div style={{
                    paddingLeft: '4px',
                    display: 'inline-block'
                  }}>
                    <div className="text-secondary">Higher quality export</div>
                  </div>
                </div>
              </div>
              <div>
                <Payment />
              </div>
              <div style={{
                marginTop: '24px'
              }}>
                <ReloadApp />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PremiumPage

