export interface GeneralMessage {
  id: string
  text: string
  lifeTime: number
}

export interface Palette {
  id: string
  color: string
  position: number
}

export type AppSettingOptionType = {
  text: string
  bgColor: string
  bgType: 'color' | 'gradient'
  textColor: string
  radius: number
  fontWeight: string
  fontFamily: string
  verticalOffset: number
  horizontalOffset: number
  palettes: Palette[]
  cssGradient: string
  gradientType: 'linear' | 'radial'
  gradientAngle: number
  gradientPosition: number
  activePalette: Palette
  // 只有当 gradientType 为 radial 时有效
  radialGradientXPosition: number
  radialGradientYPosition: number
}


export interface InspirationItemType {
  options?: Partial<AppSettingOptionType>,
  title?: string
}
