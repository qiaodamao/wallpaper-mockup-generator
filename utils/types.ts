import type { NuxtApp } from 'nuxt/schema'
import type { RouteLocationRaw } from '#vue-router'

// ===== 样机数据类型 =====

/** 单个设备的屏幕渲染配置（样机内的壁纸、锁屏时间等） */
export interface MockupProtoItem {
  type: 'iphoneType' | 'ipadType' | 'macType'
  name: string
  /** 是否显示设备边框 */
  frame: boolean
  /** 是否显示灵动岛 */
  smartIsLand?: boolean
  /** 设备外壳样式（内联样式字符串或对象） */
  style: string | Record<string, string>
  /** 壁纸在样机内的定位样式 */
  paperStyleMethod?: (proto: MockupProtoItem) => string | Record<string, string>
  /** 聊天界面的壁纸样式 */
  paperChatStyle?: Record<string, string>
  /** 屏幕模式：锁屏 / 桌面 / 仅样机 */
  screenType: string
  selectedTime: Date
  selectedDate: Date
  systemColor: string
  dateTimeColor: string
  // 允许模板扩展字段
  [key: string]: unknown
}

/** 样机背景配置 */
export interface MockupBackgroundConfig {
  /** 背景类型：图片 / 渐变 / 纯色 */
  type: string
  /** 是否需要高斯模糊背景 */
  needBlur: boolean
  /** 背景是否自动跟随上传的壁纸 */
  autoUpdate: boolean
  /** 默认背景图地址 */
  defaultBackgroundUrl?: string
  /** 背景原图的动态样式 */
  backgroundImageStyle?: (zIndex?: number) => Record<string, string | number>
}

/** 一个样机示例（如 iPhone 默认1、杂志等） */
export interface MockupExample {
  /** 样机缩略图地址 */
  defaultProtoUrl: string
  exampleName: string
  protoList: MockupProtoItem[]
  background: MockupBackgroundConfig
}

/** 样机分类（iPhone / iPad / Mac / 全家桶） */
export interface MockupProtoTypeGroup {
  protoType: string
  list: MockupExample[]
}

/** 水印设置 */
export interface WatermarkSetting {
  enable: boolean
  text: string
  color: string
  fontSize: number
  translateX: number
  translateY: number
}

// ===== 导航菜单类型 =====

export interface AwesomeLayoutPageNavbarMenuDropdownItem {
  type?: 'link'
  title?: string | ((nuxt: NuxtApp) => string)
  to?: RouteLocationRaw | ((nuxt: NuxtApp) => RouteLocationRaw)
}

export interface AwesomeLayoutPageNavbarMenu {
  type?: 'link' | 'button' | 'dropdown'
  title?: string | ((nuxt: NuxtApp) => string)
  to?: RouteLocationRaw | ((nuxt: NuxtApp) => RouteLocationRaw)
  children?: AwesomeLayoutPageNavbarMenuDropdownItem[]
}
