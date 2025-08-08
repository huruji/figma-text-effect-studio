import { once, on, showUI, emit } from '@create-figma-plugin/utilities'

import { CloseHandler, CreateRectanglesHandler, RequestUserInfoHandler, FigmaUserInfo, AddImageToDesignHandler } from './types'

// 添加打开链接的消息处理器类型
interface OpenUrlHandler {
  name: 'OPEN_URL'
  handler: (url: string) => void
}

export default function () {
  once<CreateRectanglesHandler>('CREATE_RECTANGLES', function (count: number) {
    const nodes: Array<SceneNode> = []
    for (let i = 0; i < count; i++) {
      const rect = figma.createRectangle()
      rect.x = i * 150
      rect.fills = [
        {
          color: { b: 0, g: 0.5, r: 1 },
          type: 'SOLID'
        }
      ]
      figma.currentPage.appendChild(rect)
      nodes.push(rect)
    }
    figma.currentPage.selection = nodes
    figma.viewport.scrollAndZoomIntoView(nodes)
    figma.closePlugin()
  })

  on<CloseHandler>('CLOSE', function () {
    figma.closePlugin()
  })

  // 处理UI请求用户信息
  on<RequestUserInfoHandler>('REQUEST_USER_INFO', function () {
    // 构建完整的用户信息对象
    const userInfo: FigmaUserInfo = {
      id: figma.currentUser?.id || '',
      name: figma.currentUser?.name || '',
      photoUrl: figma.currentUser?.photoUrl || undefined,
      sessionId: figma.currentUser?.sessionId?.toString() || undefined
    }

    // 使用 emit 发送用户信息到UI线程
    emit('USER_INFO', userInfo)
  })

  // 处理打开链接的请求
  on<OpenUrlHandler>('OPEN_URL', function (url: string) {
    // 使用 figma.openExternal 在浏览器中打开链接
    ;(figma as any).openExternal(url)
  })

    // 处理添加图片到设计的请求
  on<AddImageToDesignHandler>('ADD_IMAGE_TO_DESIGN', async function (imageData: Uint8Array) {
    console.log('收到添加图片到设计的请求，图片数据大小:', imageData.length)

    try {
      // 验证图片数据
      if (!imageData || imageData.length === 0) {
        throw new Error('图片数据为空')
      }

      // 使用 figma.createImage 创建图片对象
      const image = figma.createImage(imageData)
      console.log('图片对象创建成功，hash:', image.hash)

      // 获取图片尺寸
      const { width, height } = await image.getSizeAsync()
      console.log('图片尺寸:', width, 'x', height)

      // 创建一个矩形节点来承载图片
      const rect = figma.createRectangle()
      rect.resize(width, height)

      // 设置图片名称（便于识别）
      rect.name = `Text Effect ${new Date().toLocaleTimeString()}`

      // 将图片设置为矩形的填充
      rect.fills = [
        {
          type: 'IMAGE',
          imageHash: image.hash,
          scaleMode: 'FILL'
        }
      ]

      // 将新创建的节点添加到当前页面
      figma.currentPage.appendChild(rect)

      // 选中新创建的节点并将视图滚动到该节点
      figma.currentPage.selection = [rect]
      figma.viewport.scrollAndZoomIntoView([rect])

      // 显示成功通知
      figma.notify('✅ 文本效果已添加到设计中!')
      console.log('图片添加成功')

    } catch (error) {
      console.error('添加图片到设计时出错:', error)
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      figma.notify(`❌ 添加图片失败: ${errorMessage}`)
    }
  })

  console.log('当前用户信息:', figma.currentUser)
  showUI({
    height: 650,
    width: 328
  })
}
