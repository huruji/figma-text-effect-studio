import { useRef, useEffect } from "preact/compat"
import { Button } from '@create-figma-plugin/ui'
import { useSetState } from 'ahooks'
import { useAtom } from 'jotai'
import { settingAtom, type SettingType } from 'src/atoms/setting'
import { generate } from 'src/services'
// import MarketingInfo from 'src/components/marketing-info'
import Payment from 'src/components/payment'
import Back from 'src/components/back'
// import { config } from './config'
import { TextEditor } from 'src/editor'
// import TextSetting from './subpages/text'
// import FillingSetting from './subpages/filling'
// import OutlineSetting from './subpages/outline'
// import ShadowSetting from './subpages/shadow'
// import JiggleSetting from './subpages/jiggle'
// import ThreeDSetting from './subpages/3d'
// import SettingQuality from './subpages/text/components/setting-quality'
import { h } from 'preact'

function HomePage() {
  const [setting, setSetting] = useAtom(settingAtom)
  const ButtonContainerRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useSetState({
    isLoading: false,
    config: {}
  })
  const svgRef = useRef<SVGSVGElement>(null)
  const isDark = false
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const editorRef = useRef<TextEditor | null>(null)

  async function handleAddToDesign() {
    const canvas = canvasRef.current
    if (!canvas) return
    setState({
      isLoading: true
    })
    let sizeOptions = setting.exportSizeOptions.find(item => item.value === setting.exportSize)
    if (!sizeOptions) {
      sizeOptions = setting.exportSizeOptions[0]
    }
    // 重新绘制文本效果
    if (editorRef.current) {
      editorRef.current.config.font.size = sizeOptions.fontSize
      await editorRef.current.draw({
        isPostTreatment: true,
        isBestQuality: true,
        maxWidth: sizeOptions.maxHeight,
        maxHeight: sizeOptions.maxHeight
      })
    }

    const blob = await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/png', 1.0)
    })

    try {
      const data = await generate({
        id: setting.currentConfigId,
        userId: setting.userId,
        quality: setting.exportSize
      })
      if (data.marketingInfo) {
        setSetting((s) => ({
          ...s,
          marketingInfo: data.marketingInfo
        }))
      }
    } catch (error) {
      console.log('error', error)
    }
    try {
      setting.addOnUISdk.app.document.addImage(blob as Blob, {
        title: 'Text Effect Image',
        author: 'Text Effect Studio',
      })
    } catch (error) {
      console.log('error', error)
    }
    setState({
      isLoading: false
    })
  }

  useEffect(() => {
    const container = document.getElementById('effect-container')
    if (!container) return
    container.innerHTML = ''
    const canvasId = 'effect-canvas'
    const canvasEle = document.createElement('canvas')
    canvasRef.current = canvasEle
    canvasEle.id = canvasId
    container?.appendChild(canvasEle)
    const editor = new TextEditor(canvasEle)
    editorRef.current = editor
    // 缩放函数
    const updateScale = () => {
      const scaleX = container.clientWidth / canvasEle.width
      const scaleY = container.clientHeight / canvasEle.height
      let scale = Math.min(scaleX, scaleY)
      if (scale > 1) {
        scale = 1
      }
      canvasEle.style.transform = `scale(${scale})`
      canvasEle.style.transformOrigin = 'center center'
      // container.style.overflow = 'hidden'
    }
    // 初始缩放
    updateScale()
    // 监听 container 尺寸变化
    const resizeObserver = new ResizeObserver(updateScale)
    resizeObserver.observe(canvasEle)
    // 监听 canvas 尺寸变化（如果 canvas 尺寸也会变）
    // resizeObserver.observe(canvas);
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const drawTextEffect = async () => {
      debugger
      if (canvasRef.current && editorRef.current) {
        const container = document.getElementById('effect-container')
        // canvasRef.current.setConfig(state.config)
        // setting.currentConfig.font.size = 1600
        editorRef.current?.setConfig(setting.currentConfig)
        debugger
        await editorRef.current?.draw({
          isPostTreatment: true,
          isBestQuality: true,
          maxWidth: container?.clientWidth,
          maxHeight: container?.clientHeight
        })
      }
    }
    drawTextEffect()
  }, [setting.currentConfig, canvasRef, editorRef])

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
  debugger;

  return (
    <div style={{
      paddingBottom: 'var(--spectrum-global-dimension-size-400)',
    }}>
      <div style={{
        width: '100%',
      }}>
        <div>
          <div style={{
            backgroundColor: 'var(--spectrum-global-color-static-white)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}>
            <Back onCancel={handleBack}
              title={backTitle} />
            {/* <MarketingInfo /> */}

            <div style={{
              display: "flex",
              paddingTop: 'var(--ui-kit-space-2)',
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid",
              borderRadius: "3px",
              // borderColor: tokens.colorBorder,
              padding: "10px",
              backgroundColor: "var(--ui-kit-color-neutral-low)",
            }}>
              <div id="effect-container" style={{
                width: "calc(100% - 24px)",
                height: 'calc(100% - 24px)',
                aspectRatio: "1/0.8",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }} />
            </div>
          </div>
          <div style={{ paddingTop: 'var(--spectrum-global-dimension-size-200)' }}>
            {/* {setting.subPage === 'text' && <TextSetting />}
            {setting.subPage === 'filling' && <FillingSetting />}
            {setting.subPage === 'outline' && <OutlineSetting />}
            {setting.subPage === 'shadow' && <ShadowSetting />}
            {setting.subPage === '3d' && <ThreeDSetting />}
            {setting.subPage === 'jiggle' && <JiggleSetting />} */}
          </div>
          <div style={{
            paddingTop: 'var(--spectrum-global-dimension-size-200)',
            // position: "sticky",
            // bottom: 'var(--spectrum-global-dimension-size-200)',
            // backgroundColor: "var(--spectrum-global-color-static-white)",
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: 'var(--spectrum-global-dimension-size-200)',
            }}>
              {/* <SettingQuality /> */}
            </div>
            <Button
              fullWidth
              onClick={handleAddToDesign}>Add to design</Button>
            <Payment
              hideUpgradeButton={!setting.showUpgradeButton}
              upgradeVariant='secondary'
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export default HomePage
