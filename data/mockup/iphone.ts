import type { MockupExample } from '~/utils/types'
import { default1Image, noFrameDefault1Image, default2Image, noFrameDefault2Image, magazineImage, magazineBackgroundImage, standImage, standBackgroundImage, againstWallImage, againstWallBackgroundImage, marbleImage, marbleBackgroundImage, iphoneHand1Image, hand1BackgroundImage, desktopIphoneBackgroundImage, iphoneDesktopImage, iphoneBlackHandImage, iphoneBlackHandBackgroundImage, screenOptions, backgroundOptions, defaultSystemColor, defaultDateTimeColor } from './assets'

type TFunc = (key: string) => string
type StyleFn = (zIndex?: number) => Record<string, string | number>

/** iPhone样机示例（静态配置） */
export function createIphoneExamples(t: TFunc, backgroundDisplayStyle: StyleFn): MockupExample[] {
  return [
      {
        defaultProtoUrl: default1Image,
        exampleName: t("mockup.defaultOne"),
        protoList: [
          {
            type: 'iphoneType',
            name: 'iPhone',
            frame: true,
            smartIsLand: true,
            style: "width: 426px; height: 877px;transform: rotate(0deg) translateX(0px) translateY(0px) scaleX(1.52793) scaleY(1.52794) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg);",
            paperStyleMethod: (_proto) => {
              return "width: calc(100% - 36px);height: calc(100% - 32px); border-radius: 50px;position: absolute;left: 18px;top: 16px;"
            },
            paperChatStyle: {
              position: 'absolute',
              width: '390px',
              height: '653.12px',
              top: '115px',
              left: '18px',
            },
            screenType: screenOptions['iphoneType'][0],
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
        defaultProtoUrl: noFrameDefault1Image,
        exampleName: t("mockup.boundlessOne"),
        protoList: [
          {
            type: 'iphoneType',
            name: 'iPhone',
            frame: false,
            smartIsLand: false,
            style: {
              width: "426px", height: "877px",
              transform: "rotate(0deg) translateX(0px) translateY(0px) scaleX(1.52793) scaleY(1.52794) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
              filter: "drop-shadow(rgba(0, 0, 0, 0.5) -10px 5px 20px)"
            },
            paperStyleMethod: (_proto) => {
              return "width: calc(100% - 36px);height: calc(100% - 32px);border-radius: 50px;position: absolute;left: 18px;top: 16px;"
            },
            paperChatStyle: {
              position: 'absolute',
              width: '390px',
              height: '653.12px',
              top: '115px',
              left: '18px',
            },
            screenType: screenOptions['iphoneType'][0],
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
        defaultProtoUrl: default2Image,
        exampleName: t("mockup.defaultTwo"),
        protoList: [
          {
            type: 'iphoneType',
            name: '左边iPhone',
            frame: true,
            smartIsLand: true,
            style: "width: 426px; height: 877px;transform: rotate(0deg) translateX(-265px) translateY(0px) scaleX(1.14026) scaleY(1.14026) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg);",
            paperStyleMethod: (_proto) => {
              return "width: calc(100% - 36px);height: calc(100% - 32px);border-radius: 50px;position: absolute;left: 18px;top: 16px;"
            },
            paperChatStyle: {
              position: 'absolute',
              width: '390px',
              height: '653.12px',
              top: '115px',
              left: '18px',
            },
            screenType: screenOptions['iphoneType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          },
          {
            type: 'iphoneType',
            name: '右边iPhone',
            frame: true,
            smartIsLand: true,
            style: "width: 426px; height: 877px;transform: rotate(0deg) translateX(265px) translateY(0px) scaleX(1.14026) scaleY(1.14026) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg);",
            paperStyleMethod: (_proto) => {
              return "width: calc(100% - 36px);height: calc(100% - 32px);border-radius: 50px;position: absolute;left: 18px;top: 16px;"
            },
            paperChatStyle: {
              position: 'absolute',
              width: '390px',
              height: '653.12px',
              top: '115px',
              left: '18px',
            },
            screenType: screenOptions['iphoneType'][0],
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
        defaultProtoUrl: noFrameDefault2Image,
        exampleName: t("mockup.boundlessTwo"),
        protoList: [
          {
            type: 'iphoneType',
            name: '左边iPhone',
            frame: false,
            smartIsLand: false,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(0deg) translateX(-265px) translateY(0px) scaleX(1.19725) scaleY(1.19725) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
              filter: "drop-shadow(rgba(0, 0, 0, 0.25) -10px 10px 10px)"
            },
            paperStyleMethod: (_proto) => {
              return "width: calc(100% - 36px);height: calc(100% - 32px);border-radius: 50px;position: absolute;left: 18px;top: 16px;"
            },
            paperChatStyle: {
              position: 'absolute',
              width: '390px',
              height: '653.12px',
              top: '115px',
              left: '18px',
            },
            screenType: screenOptions['iphoneType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          },
          {
            type: 'iphoneType',
            name: '右边iPhone',
            frame: false,
            smartIsLand: false,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(0deg) translateX(265px) translateY(0px) scaleX(1.19725) scaleY(1.19725) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
              filter: "drop-shadow(rgba(0, 0, 0, 0.5) -10px 5px 20px)"
            },
            paperStyleMethod: (_proto) => {
              return "width: calc(100% - 36px);height: calc(100% - 32px);border-radius: 50px;position: absolute;left: 18px;top: 16px;"
            },
            paperChatStyle: {
              position: 'absolute',
              width: '390px',
              height: '653.12px',
              top: '115px',
              left: '18px',
            },
            screenType: screenOptions['iphoneType'][0],
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
        defaultProtoUrl: magazineImage,
        exampleName: t("mockup.magazine"),
        protoList: [
          {
            type: 'iphoneType',
            name: 'iPhone',
            frame: true,
            smartIsLand: true,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(-15deg) translateX(0px) translateY(0px) scaleX(1.43977) scaleY(1.34976) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
              filter: 'drop-shadow(rgba(0, 0, 0, 0.62) -10px 10px 10px)',
            },
            paperStyleMethod: (_proto) => {
              return "width: calc(100% - 36px);height: calc(100% - 32px); border-radius: 50px;position: absolute;left: 18px;top: 16px;"
            },
            paperChatStyle: {
              position: 'absolute',
              width: '390px',
              height: '653.12px',
              top: '115px',
              left: '18px',
            },
            screenType: screenOptions['iphoneType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          autoUpdate: false,
          defaultBackgroundUrl: magazineBackgroundImage,
          needBlur: false,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
      {
        defaultProtoUrl: standImage,
        exampleName: t("mockup.standingSideways"),
        protoList: [
          {
            type: 'iphoneType',
            name: 'iPhone',
            frame: false,
            smartIsLand: true,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(0deg) translateX(32.5px) translateY(7px) scaleX(1.07869) scaleY(1.40014) perspective(none) skewX(0deg) skewY(-5.8deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
            },
            paperStyleMethod: (_proto) => {
              return {
                width: '390px',
                height: '844.8px',
                'border-radius': '50px',
                position: 'absolute',
                left: '18px',
                top: '16px'
              }
            },
            paperChatStyle: {
              position: 'absolute',
              width: '390px',
              height: '653.12px',
              top: '115px',
              left: '18px',
            },
            screenType: screenOptions['iphoneType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          autoUpdate: false,
          defaultBackgroundUrl: standBackgroundImage,
          needBlur: false,
          backgroundImageStyle: () => backgroundDisplayStyle(999),
        }
      },
      {
        defaultProtoUrl: againstWallImage,
        exampleName: t("mockup.againstTheWall"),
        protoList: [
          {
            type: 'iphoneType',
            name: 'iPhone',
            frame: false,
            smartIsLand: true,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(0deg) translateX(6px) translateY(0px) scaleX(1.49031) scaleY(1.45156) perspective(1000px) skewX(0deg) skewY(0deg) rotateX(2deg) rotateY(0deg) rotateZ(0deg)',
            },
            paperStyleMethod: (_proto) => {
              return "width: calc(100% - 36px);height: calc(100% - 32px); border-radius: 40px;position: absolute;left: 18px;top: 16px;"
            },
            paperChatStyle: {
              position: 'absolute',
              width: '390px',
              height: '653.12px',
              top: '115px',
              left: '18px',
            },
            screenType: screenOptions['iphoneType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          autoUpdate: false,
          defaultBackgroundUrl: againstWallBackgroundImage,
          needBlur: false,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
      {
        defaultProtoUrl: marbleImage,
        exampleName: t("mockup.marble"),
        protoList: [
          {
            type: 'iphoneType',
            name: 'iPhone',
            frame: true,
            smartIsLand: true,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(10.465deg) translateX(50px) translateY(130px) scaleX(1.20866) scaleY(1.20867) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
              filter: 'drop-shadow(rgba(0, 0, 0, 0.25) -10px 10px 10px)',
            },
            paperStyleMethod: (_proto) => {
              return "width: calc(100% - 36px);height: calc(100% - 32px); border-radius: 50px;position: absolute;left: 18px;top: 16px;"
            },
            paperChatStyle: {
              position: 'absolute',
              width: '390px',
              height: '653.12px',
              top: '115px',
              left: '18px',
            },
            screenType: screenOptions['iphoneType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          autoUpdate: false,
          defaultBackgroundUrl: marbleBackgroundImage,
          needBlur: false,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
      {
        defaultProtoUrl: iphoneHand1Image,
        exampleName: t("mockup.handheld"),
        protoList: [
          {
            type: 'iphoneType',
            name: 'iPhone',
            frame: true,
            smartIsLand: true,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(-1deg) translateX(-21px) translateY(0px) scaleX(1.0) scaleY(1.0) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
              filter: 'drop-shadow(rgba(0, 0, 0, 0.25) -10px 10px 10px)',
            },
            paperStyleMethod: (_proto) => {
              return "width: calc(100% - 36px);height: calc(100% - 32px); border-radius: 50px;position: absolute;left: 18px;top: 16px;"
            },
            paperChatStyle: {
              position: 'absolute',
              width: '390px',
              height: '653.12px',
              top: '115px',
              left: '18px',
            },
            screenType: screenOptions['iphoneType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          autoUpdate: false,
          defaultBackgroundUrl: hand1BackgroundImage,
          needBlur: false,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
      {
        // 黑色手持场景：黑底照片背景（1086x1448，与画布同为 3:4），
        // 黑色手机近竖直（无旋转）。屏幕内容区经像素检测：x 386-755 / y 251-1050，
        // 边框厚约 17px，外框画布尺寸约 445x917 → scale 1.045，中心偏移 translateX(30) translateY(-81)
        defaultProtoUrl: iphoneBlackHandImage,
        exampleName: t("mockup.blackHand"),
        protoList: [
          {
            type: 'iphoneType',
            name: 'iPhone',
            frame: true,
            smartIsLand: true,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(0deg) translateX(30px) translateY(-81px) scaleX(1.045) scaleY(1.045) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
              filter: 'drop-shadow(rgba(0, 0, 0, 0.25) -10px 10px 10px)',
            },
            paperStyleMethod: (_proto) => {
              return "width: calc(100% - 36px);height: calc(100% - 32px); border-radius: 50px;position: absolute;left: 18px;top: 16px;"
            },
            paperChatStyle: {
              position: 'absolute',
              width: '390px',
              height: '653.12px',
              top: '115px',
              left: '18px',
            },
            screenType: screenOptions['iphoneType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          autoUpdate: false,
          defaultBackgroundUrl: iphoneBlackHandBackgroundImage,
          needBlur: false,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
      {
        defaultProtoUrl: iphoneDesktopImage,
        exampleName: t("mockup.desktop"),
        protoList: [
          {
            type: 'iphoneType',
            name: 'iPhone',
            frame: false,
            smartIsLand: true,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(-26deg) translateX(113px) translateY(217px) scaleX(0.7) scaleY(0.7) perspective(0px) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
              filter: 'drop-shadow(rgba(0, 0, 0, 0.25) -10px 10px 10px)',
            },
            paperStyleMethod: (_proto) => {
              return "width: calc(100% - 36px);height: calc(100% - 32px); border-radius: 50px;position: absolute;left: 18px;top: 16px;"
            },
            paperChatStyle: {
              position: 'absolute',
              width: '390px',
              height: '653.12px',
              top: '115px',
              left: '18px',
            },
            screenType: screenOptions['iphoneType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          autoUpdate: false,
          defaultBackgroundUrl: desktopIphoneBackgroundImage,
          needBlur: false,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
  ]
}
