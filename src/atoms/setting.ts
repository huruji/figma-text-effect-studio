// @ts-nocheck
import { atom } from 'jotai'
import { type TextEffectConfig } from 'src/types/text-effect-studio'
interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

type Palette = {
  color: string
  id: string
  position: number
  colorObj?: RgbaColor
  hexColor: string
}

type FontType = {
  name: string
  url: string
  img: string
}

export type PresetType = {
  fill?: string
  shadow?: string
  stroke?: number
  innerShadow?: string
  outline?: string
  outlineWidth?: number
  depth?: number
  offsetX?: number
  offsetY?: number
  extrusion?: string
  offset?: number
  direction?: number
  text?: string
  density?: number
  colorList?: string[]
  frequency?: number
  scale?: number
  dotSize?: number
  dotSpacing?: number
  seed?: number
  clarity?: number
  grain?: number
  stddev?: number
  thickness?: number
  font?: string
}

export type EffectType = {
  id: string
  isPro: boolean
  name: string
  img: string
  defaultConfig: TextEffectConfig
}
export type SettingType = {
  preset: PresetType
  oldPreset: PresetType
  allEffects: EffectType[]
  searchValue: string
  selectedEffect: EffectType
  currentConfig: TextEffectConfig
  activeTabKey: 'text' | 'style' | 'effect'
  effectType: 'jiggle' | '3d'
  styleType: 'filling' | 'outlines' | 'shadows'
  fillingActivePalette: Palette
  outlineFirstActivePalette: Palette
  outlineSecondActivePalette: Palette
  innerShadowActivePalette: Palette
  outerShadowActivePalette: Palette
  depth1ActivePalette: Palette
  checkoutUrl: string
  userIsPro: boolean
  showUserId: boolean
  userId: string
  currentConfigId: string
  currentConfigR2Url: string
  useR2Url: boolean
  exportSize: 'basic' | 'standard' | 'ultra',
  exportSizeOptions: {
    value: 'basic' | 'standard' | 'ultra',
    maxHeight: number,
    fontSize: number,
    isPro: boolean,
  }[]
  checkPayment: boolean
  showUpgradeButton: boolean
  defaultValues: Record<string, any>
  text: string
  fontSize: number
  fontName: string
  fontConfig?: FontType
  letterSpacing: number
  shapePath: string
  color: string
  page: 'home' | 'font' | 'path' | 'text-style' | 'index' | 'premium'
  subPage: 'text' | 'filling' | 'outline' | 'shadow' | '3d' | 'jiggle'
  premiumPrePage: 'home' | 'font' | 'path' | 'text-style' | 'index' | 'premium'
  offset: number
  fontWeight: number
  textInputEmptyErrorShow: boolean
  textStyle: string
  strokeColor: string
  stroke: number
  withoutSetting: string[]
  marketingInfo?: {
    description: string,
    link: string
    linkText: string
  }
  credits: number
  totalCredits: number
  totalTextEffects: number
}


const isDark = document.documentElement.classList.contains('dark')

export const settingAtom = atom<SettingType>({
  searchValue: '',
  selectedEffect: {},
  currentConfig: {},
  activeTabKey: 'text',
  effectType: 'jiggle',
  styleType: 'filling',

  page: 'index',
  premiumPrePage: '',
  subPage: 'text',
  textInputEmptyErrorShow: false,
  textStyle: 'none',
  defaultValues: {},
  strokeColor: '#000000',
  stroke: 0,
  withoutSetting: [],
  marketingInfo: {},
  checkoutUrl: '',
  userIsPro: false,
  showUserId: false,
  userId: '',
  currentConfigId: '',
  currentConfigR2Url: '',
  useR2Url: false,
  exportSize: 'basic',
  checkPayment: false,
  showUpgradeButton: true,
  exportSizeOptions: [
    {
      value: 'basic',
      maxHeight: 500,
      fontSize: 150,
      isPro: false,
    },
    {
      value: 'standard',
      maxHeight: 2560,
      fontSize: 1000,
      isPro: false,
    },
    {
      value: 'ultra',
      maxHeight: 5120,
      fontSize: 1600,
      isPro: true,
    },
  ],
  credits: 0,
  totalCredits: 0,
  totalTextEffects: 300,
})
