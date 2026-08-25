import type { MockupExample } from '~/utils/types'
import { ipadDefault1Image, ipadVerticalImage, ipadDefault2Image, ipadPoolImage, poolBackgroundImage, ipadDesktopImage, desktopBackgroundImage, ipadOfficeDesktopImage, officeDesktopBackgroundImage, screenOptions, backgroundOptions, defaultSystemColor, defaultDateTimeColor } from './assets'

type TFunc = (key: string) => string
type StyleFn = (zIndex?: number) => Record<string, string | number>

/** iPad样机示例（静态配置） */
export function createIpadExamples(t: TFunc, backgroundDisplayStyle: StyleFn): MockupExample[] {
  return [
      {
        defaultProtoUrl: ipadDefault1Image,
        exampleName: t("mockup.defaultOne"),
        protoList: [
          {
            type: 'ipadType',
            name: 'iPad',
            frame: true,
            style: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              width: '1248px',
              height: '888px',
              transform: 'rotate(0deg) translateX(0px) translateY(0px) scaleX(0.7973) scaleY(0.797297) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
            },
            paperStyleMethod: (proto) => {

              if (proto.frame) {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border: 22px solid rgb(0, 0, 0);border-radius: 40px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              } else {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border-radius: 20px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              }

            },
            screenType: screenOptions['ipadType'][0],
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
        defaultProtoUrl: ipadVerticalImage,
        exampleName: t("mockup.portrait"),
        protoList: [
          {
            type: 'ipadType',
            name: 'iPad',
            frame: true,
            vertical: true,
            style: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              width: '888px',
              height: '1248px',
              transform: 'rotate(0deg) translateX(0px) translateY(0px) scaleX(0.961543) scaleY(0.961546) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
            },
            paperStyleMethod: (proto) => {

              if (proto.frame) {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border: 22px solid rgb(0, 0, 0);border-radius: 40px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              } else {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border-radius: 20px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              }

            },
            screenType: screenOptions['ipadType'][0],
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
        defaultProtoUrl: ipadDefault2Image,
        exampleName: t("mockup.ipadDefaultTwo"),
        protoList: [
          {
            type: 'ipadType',
            name: '上边iPad',
            frame: true,
            style: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              width: '1248px',
              height: '888px',
              transform: 'rotate(0deg) translateX(0px) translateY(-350px) scaleX(0.729728) scaleY(0.72973) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
            },
            paperStyleMethod: (proto) => {

              if (proto.frame) {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border: 22px solid rgb(0, 0, 0);border-radius: 40px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              } else {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border-radius: 20px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              }

            },
            screenType: screenOptions['ipadType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          },
          {
            type: 'ipadType',
            name: '下边iPad',
            frame: true,
            style: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              width: '1248px',
              height: '888px',
              transform: 'rotate(0deg) translateX(0px) translateY(350px) scaleX(0.729728) scaleY(0.72973) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
            },
            paperStyleMethod: (proto) => {

              if (proto.frame) {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border: 22px solid rgb(0, 0, 0);border-radius: 40px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              } else {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border-radius: 20px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              }

            },
            screenType: screenOptions['ipadType'][1],
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
        defaultProtoUrl: ipadPoolImage,
        exampleName: t("mockup.poolside"),
        protoList: [
          {
            type: 'ipadType',
            name: 'iPad',
            frame: true,
            style: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              width: '1248px',
              height: '888px',
              transform: 'rotate(31.5deg) translateX(80px) translateY(124px) scaleX(0.785256) scaleY(0.785259) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
              filter: 'drop-shadow(rgba(0, 0, 0, 0.25) -10px 10px 10px)',
            },
            paperStyleMethod: (proto) => {

              if (proto.frame) {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border: 22px solid rgb(0, 0, 0);border-radius: 40px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              } else {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border-radius: 20px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              }

            },
            screenType: screenOptions['ipadType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          needBlur: false,
          autoUpdate: false,
          defaultBackgroundUrl: poolBackgroundImage,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
      {
        defaultProtoUrl: ipadDesktopImage,
        exampleName: t("mockup.desktop"),
        protoList: [
          {
            type: 'ipadType',
            name: 'iPad',
            frame: true,
            style: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              width: '1248px',
              height: '888px',
              transform: 'rotate(0deg) translateX(25px) translateY(0px) scaleX(0.68109) scaleY(0.681092) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
              filter: 'drop-shadow(rgba(106, 117, 128, 0.81) -20px 20px 20px)',
            },
            paperStyleMethod: (proto) => {

              if (proto.frame) {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border: 22px solid rgb(0, 0, 0);border-radius: 40px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              } else {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border-radius: 20px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              }

            },
            screenType: screenOptions['ipadType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          needBlur: false,
          autoUpdate: false,
          defaultBackgroundUrl: desktopBackgroundImage,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
      {
        defaultProtoUrl: ipadOfficeDesktopImage,
        exampleName: t("mockup.officeDesktop"),
        protoList: [
          {
            type: 'ipadType',
            name: 'iPad',
            frame: true,
            style: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              width: '1248px',
              height: '888px',
              transform: 'rotate(-7deg) translateX(-32px) translateY(320px) scaleX(0.761218) scaleY(0.761216) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
              filter: 'drop-shadow(rgba(0, 0, 0, 0.38) -10px -10px 20px)',
            },
            paperStyleMethod: (proto) => {

              if (proto.frame) {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border: 22px solid rgb(0, 0, 0);border-radius: 40px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              } else {
                return "width: calc(100% - 54px);height: calc(100% - 54px);border-radius: 20px;posttion:relative;display:flex;justify-content: center;align-items: center;";
              }

            },
            screenType: screenOptions['ipadType'][0],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          }
        ],
        background: {
          type: backgroundOptions[0],
          needBlur: false,
          autoUpdate: false,
          defaultBackgroundUrl: officeDesktopBackgroundImage,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
  ]
}
