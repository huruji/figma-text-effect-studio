import { once, showUI, emit } from '@create-figma-plugin/utilities'

import { CloseHandler, CreateRectanglesHandler, RequestUserInfoHandler, FigmaUserInfo } from './types'

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

  once<CloseHandler>('CLOSE', function () {
    figma.closePlugin()
  })

  // 处理UI请求用户信息
  once<RequestUserInfoHandler>('REQUEST_USER_INFO', function () {
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

  console.log('当前用户信息:', figma.currentUser)
  showUI({
    height: 650,
    width: 328
  })
}
