import { EventHandler } from '@create-figma-plugin/utilities'

export interface CreateRectanglesHandler extends EventHandler {
  name: 'CREATE_RECTANGLES'
  handler: (count: number) => void
}

export interface CloseHandler extends EventHandler {
  name: 'CLOSE'
  handler: () => void
}

// 新增：主线程向UI发送用户信息的处理器
export interface UserInfoHandler extends EventHandler {
  name: 'USER_INFO'
  handler: (userInfo: any) => void
}

// 新增：UI请求用户信息的处理器
export interface RequestUserInfoHandler extends EventHandler {
  name: 'REQUEST_USER_INFO'
  handler: () => void
}

// 新增：用户信息类型定义
export interface FigmaUserInfo {
  id: string
  name: string
  photoUrl?: string
  sessionId?: string
}
