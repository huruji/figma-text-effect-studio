import { on } from '@create-figma-plugin/utilities'
import { UserInfoHandler, FigmaUserInfo } from '../types'

/**
 * 用户信息服务类
 * 负责处理从主线程接收用户信息并存储到内存
 */
export class UserInfoService {
  private static instance: UserInfoService
  private userInfo: FigmaUserInfo | null = null

  private constructor() {
    this.initMessageListener()
  }

  public static getInstance(): UserInfoService {
    if (!UserInfoService.instance) {
      UserInfoService.instance = new UserInfoService()
    }
    return UserInfoService.instance
  }

  /**
   * 初始化消息监听器
   */
  private initMessageListener(): void {
    // 使用 @create-figma-plugin/utilities 的 on 方法监听消息
    on<UserInfoHandler>('USER_INFO', (userInfo: FigmaUserInfo) => {
      debugger;
      console.log('收到用户信息，正在存储到内存:', userInfo)
      this.setUserInfo(userInfo)
    })
  }

  /**
   * 设置用户信息并存储到内存
   */
  private setUserInfo(userInfo: FigmaUserInfo): void {
    this.userInfo = userInfo
    console.log('✅ 用户信息已保存到内存')
  }

  /**
   * 从内存获取用户信息
   */
  public getUserInfoFromStorage(): FigmaUserInfo | null {
    if (this.userInfo) {
      console.log('📦 从内存读取用户信息:', this.userInfo)
      return this.userInfo
    }
    return null
  }

  /**
   * 获取当前用户信息
   */
  public getCurrentUserInfo(): FigmaUserInfo | null {
    return this.userInfo
  }

  /**
   * 清除用户信息
   */
  public clearUserInfo(): void {
    this.userInfo = null
    console.log('🗑️ 用户信息已从内存清除')
  }

  /**
   * 检查是否有用户信息
   */
  public hasUserInfo(): boolean {
    return this.userInfo !== null
  }

  /**
   * 检查存储是否可用（内存总是可用的）
   */
  public isStorageAvailable(): boolean {
    return true
  }
}

// 导出单例实例
export const userInfoService = UserInfoService.getInstance()