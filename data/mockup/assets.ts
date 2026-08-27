// 样机与背景图片资源及通用配置
export const default1Image = '/image/proto/default1.png'
export const noFrameDefault1Image = '/image/proto/no-frame-default1.png'
export const default2Image = '/image/proto/default2.png'
export const noFrameDefault2Image = '/image/proto/no-frame-default2.png'
export const magazineImage = '/image/proto/magazine.png'
export const magazineBackgroundImage = '/image/background/magazine.jpg'
export const standImage = '/image/proto/stand.png'
export const standBackgroundImage = '/image/background/stand.png'
export const againstWallImage = '/image/proto/againstWall.png'
export const againstWallBackgroundImage = '/image/background/againstWall.jpg'
export const marbleImage = '/image/proto/marble.png'
export const marbleBackgroundImage = '/image/background/marble.png'
export const ipadDefault1Image = '/image/proto/ipad-default1.png'
export const ipadVerticalImage = '/image/proto/ipad-vertical.png'
export const ipadDefault2Image = '/image/proto/ipad-default2.png'
export const ipadPoolImage = '/image/proto/ipad-pool.png'
export const poolBackgroundImage = '/image/background/pool.jpg'
export const ipadDesktopImage = '/image/proto/ipad-desktop.png'
export const desktopBackgroundImage = '/image/background/desktop.jpg'
export const ipadOfficeDesktopImage = '/image/proto/ipad-office-desktop.png'
export const officeDesktopBackgroundImage = '/image/background/office-desktop.jpg'
export const macDefaultImage = '/image/proto/mac-default.png'
export const macAmberMonitorImage = '/image/proto/mac-scene-amber-monitor-display.png'
export const macAmberMonitorBackgroundImage = '/image/background/mac-scene-amber-monitor-display.png'
export const macWarmDeskImage = '/image/proto/mac-scene-warm-desk-display.png'
export const macWarmDeskBackgroundImage = '/image/background/mac-scene-warm-desk-display.png'
export const macWhiteAngleImage = '/image/proto/mac-scene-white-angle-display.png'
export const macWhiteAngleBackgroundImage = '/image/background/mac-scene-white-angle-display.png'
export const familyIphoneIpadImage = '/image/proto/family-iphone-ipad.png'
export const family1Image = '/image/proto/family-1.png'
export const family2Image = '/image/proto/family-2.png'
export const iphoneHand1Image = '/image/proto/iphone-hand1.png'
export const hand1BackgroundImage = '/image/background/hand1.jpg'
export const desktopIphoneBackgroundImage = '/image/background/desktop-iphone.jpg'
export const iphoneDesktopImage = '/image/proto/iphone-desktop.png'
export const iphoneBlackHandImage = '/image/proto/black_hand.png'
export const iphoneBlackHandBackgroundImage = '/image/background/black_hand.png'
export const defaultImage = '/image/7.jpg'

// 屏幕模式选项（存 i18n key，渲染时经 screenLabelOptions 转换为多语言文案）
export const screenOptions: Record<string, string[]> = {
  'iphoneType': ['lockScreen', 'desktopScreen', 'onlyMockUp'],
  'ipadType': ['lockScreen', 'desktopScreen', 'onlyMockUp'],
  'macType': ['lockScreen', 'onlyMockUp'],
}

// 背景类型选项（i18n key）
export const backgroundOptions: string[] = ['imageText', 'gradient', 'solidColor']

export const defaultSystemColor = "#ffffff"
export const defaultDateTimeColor = "#ffffff"

