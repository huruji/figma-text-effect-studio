import { Text } from '@create-figma-plugin/ui'
import { useMemo } from "preact/hooks"
import { settingAtom } from 'src/atoms/setting'
import { useAtom } from 'jotai'
import { openExternalUrl } from 'src/util'
import { h } from 'preact'

const Payment = () => {
  const [setting, setSetting] = useAtom(settingAtom)
  let title = 'Get unlimited access.'

  if (setting.userIsPro) {
    title = 'Change your plan'
  }

  if (setting.checkoutUrl) {
    return (
      <Text>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            openExternalUrl(setting.checkoutUrl)
          }}
          style={{
            color: 'var(--figma-color-text-brand)',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = 'underline'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = 'none'
          }}
        >
          {title}
        </a>
      </Text>
    )
  }

  return null
}

export default Payment
