import type { MockupExample } from '~/utils/types'
import { macDefaultImage, macAmberMonitorImage, macAmberMonitorBackgroundImage, macWarmDeskImage, macWarmDeskBackgroundImage, macWhiteAngleImage, macWhiteAngleBackgroundImage, screenOptions, backgroundOptions, defaultSystemColor, defaultDateTimeColor } from './assets'

type TFunc = (key: string) => string
type StyleFn = (zIndex?: number) => Record<string, string | number>

/** Mac样机示例（静态配置） */
export function createMacExamples(t: TFunc, backgroundDisplayStyle: StyleFn): MockupExample[] {
  return [
      {
        defaultProtoUrl: macDefaultImage,
        exampleName: 'MacBook',
        protoList: [
          {
            type: 'macType',
            name: 'MacBook',
            frame: true,
            style: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              width: '4096px',
              height: '2459px',
              transform: 'rotate(0deg) translateX(0px) translateY(-60px) scaleX(0.277756) scaleY(0.277755) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
            },
            paperStyleMethod: (_proto) => {
              return {
                width: '3262px',
                height: '2109px',
                'border-radius': '36px 36px 0 0',
                position: 'absolute',
                top: '56px',
                left: '417px',
              }
            },
            screenType: screenOptions['macType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          needBlur: true,
          autoUpdate: true,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
      {
        // 暖光书房显示器场景：设备已包含在背景图中（1086x1448，与画布同为 3:4），
        // 壁纸叠放在显示器屏幕区域。屏幕在原图中的位置经像素检测：
        // x 169-939 / y 425-867，换算画布坐标(缩放 1200/1086≈1.105)后反推 proto 参数
        defaultProtoUrl: macAmberMonitorImage,
        exampleName: t("mockup.amberMonitor"),
        protoList: [
          {
            type: 'macType',
            name: 'Mac',
            frame: false,
            // 锁屏日期时间缩小 20%（字号与 top 同比缩放，保持相对位置）
            dateTimeScale: 0.8,
            style: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              width: '4096px',
              height: '2459px',
              transform: 'rotate(0deg) translateX(0px) translateY(0px) scaleX(0.316) scaleY(0.316) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
            },
            paperStyleMethod: (_proto) => {
              return {
                width: '2692px',
                height: '1546px',
                'border-radius': '30px',
                position: 'absolute',
                top: '184px',
                left: '740px',
              }
            },
            screenType: screenOptions['macType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          autoUpdate: false,
          defaultBackgroundUrl: macAmberMonitorBackgroundImage,
          needBlur: false,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
      {
        // 暖光桌面场景：设备已包含在背景图中（1086x1448，与画布同为 3:4），
        // 壁纸叠放在显示器屏幕区域。屏幕在原图中的位置经像素检测：
        // x 297-790 / y 545-864（宽高比约 1.55，paper 用 object-fit:cover 裁剪填充）
        defaultProtoUrl: macWarmDeskImage,
        exampleName: t("mockup.warmDesk"),
        protoList: [
          {
            type: 'macType',
            name: 'Mac',
            frame: false,
            style: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              width: '4096px',
              height: '2459px',
              transform: 'rotate(0deg) translateX(0px) translateY(0px) scaleX(0.2025) scaleY(0.2025) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
            },
            paperStyleMethod: (_proto) => {
              return {
                width: '2690px',
                height: '1741px',
                'border-radius': '40px',
                position: 'absolute',
                top: '253px',
                left: '706px',
              }
            },
            screenType: screenOptions['macType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          autoUpdate: false,
          defaultBackgroundUrl: macWarmDeskBackgroundImage,
          needBlur: false,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
      {
        // 白色斜角场景：设备已包含在背景图中（1086x1448，与画布同为 3:4），
        // 显示器呈斜视角，壁纸通过 2D 单应性变换（matrix3d）贴合屏幕四边形。
        // 屏幕四角经像素检测（暗色边框缝隙的内侧边界，bg 坐标）：
        // TL(407.5, 417.8) TR(985.4, 467.6) BR(935.8, 908.7) BL(370.5, 826.7)
        // 注意：proto 布局尺寸故意取原始 Mac 尺寸(4096x2459)的 1/5（矩阵线性项相应放大 5 倍，
        // 视觉映射完全等价）。Chrome 对含透视项的 3D 变换层按布局尺寸光栅化后再缩放显示，
        // 布局过大会导致深度缩小采样产生严重锯齿；缩小布局可让光栅化分辨率贴近显示尺寸。
        defaultProtoUrl: macWhiteAngleImage,
        exampleName: t("mockup.whiteAngle"),
        protoList: [
          {
            type: 'macType',
            name: 'Mac',
            frame: false,
            // proto 布局为标准 Mac 的 1/5，锁屏日期时间需等比缩小；
            // 日期时间上移基准（463→313），matrix3d 平移项 ty 下调 12px 使壁纸整体下移
            dateTimeScale: 0.2,
            dateTimeTop: 313,
            style: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              width: '819.2px',
              height: '491.8px',
              transform: 'matrix3d(0.949700, 0.120845, 0, -0.000120, -0.107125, 1.107795, 0, 0.000040, 0, 0, 1, 0, 130.414312, -37.120800, 0, 1)',
            },
            paperStyleMethod: (_proto) => {
              return {
                width: '652.4px',
                height: '421.8px',
                'border-radius': '6px',
                position: 'absolute',
                top: '11.2px',
                left: '83.4px',
              }
            },
            screenType: screenOptions['macType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          autoUpdate: false,
          defaultBackgroundUrl: macWhiteAngleBackgroundImage,
          needBlur: false,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
  ]
}
