import type { MockupExample } from '~/utils/types'
import { familyIphoneIpadImage, family1Image, family2Image, screenOptions, backgroundOptions, defaultSystemColor, defaultDateTimeColor } from './assets'

type TFunc = (key: string) => string
type StyleFn = (zIndex?: number) => Record<string, string | number>

/** 全家桶样机示例（静态配置） */
export function createFamilyExamples(t: TFunc, backgroundDisplayStyle: StyleFn): MockupExample[] {
  return [
      {
        defaultProtoUrl: familyIphoneIpadImage,
        exampleName: 'iPhone + iPad',
        protoList: [
          {
            type: 'iphoneType',
            name: 'iPhone',
            frame: true,
            smartIsLand: true,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(0deg) translateX(-423px) translateY(-20px) scaleX(0.575673) scaleY(0.575676) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',

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
          },
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
              transform: 'rotate(0deg) translateX(142px) translateY(-27px) scaleX(0.670117) scaleY(0.670125) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
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
        ],
        background: {
          type: backgroundOptions[0],
          needBlur: true,
          autoUpdate: true,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
      {
        defaultProtoUrl: family1Image,
        exampleName: t("mockup.familyOne"),
        protoList: [
          {
            type: 'iphoneType',
            name: 'iPhone',
            frame: true,
            smartIsLand: true,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(0deg) translateX(370px) translateY(347px) scaleX(0.570117) scaleY(0.570114) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',

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
          },
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
              transform: 'rotate(0deg) translateX(-135px) translateY(340px) scaleX(0.585585) scaleY(0.585586) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
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
            type: 'macType',
            name: 'Mac',
            frame: true,
            style: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              width: '4096px',
              height: '2459px',
              transform: 'rotate(0deg) translateX(0px) translateY(-306px) scaleX(0.277756) scaleY(0.277755) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
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
        defaultProtoUrl: family2Image,
        exampleName: t("mockup.familyTwo"),
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
              transform: 'rotate(0deg) translateX(-280px) translateY(340px) scaleX(0.450449) scaleY(0.45045) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
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
            type: 'macType',
            name: 'Mac',
            frame: true,
            style: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              width: '4096px',
              height: '2459px',
              transform: 'rotate(0deg) translateX(0px) translateY(-254px) scaleX(0.277756) scaleY(0.277755) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
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
          },
          {
            type: 'iphoneType',
            name: 'iPhone1',
            frame: true,
            smartIsLand: true,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(0deg) translateX(100px) translateY(362px) scaleX(0.396808) scaleY(0.396807) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',

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
          },
          {
            type: 'iphoneType',
            name: 'iPhone2',
            frame: true,
            smartIsLand: true,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(0deg) translateX(280px) translateY(362px) scaleX(0.396808) scaleY(0.396807) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',

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
            screenType: screenOptions['iphoneType'][1],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          },
          {
            type: 'iphoneType',
            name: 'iPhone3',
            frame: true,
            smartIsLand: true,
            style: {
              width: '426px',
              height: '877px',
              transform: 'rotate(0deg) translateX(460px) translateY(362px) scaleX(0.396808) scaleY(0.396807) perspective(none) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',

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
            screenType: screenOptions['iphoneType'][2],
            selectedTime: new Date(),
            selectedDate: new Date(),
            systemColor: defaultSystemColor,
            dateTimeColor: defaultDateTimeColor
          },
        ],
        background: {
          type: backgroundOptions[0],
          needBlur: true,
          autoUpdate: true,
          backgroundImageStyle: backgroundDisplayStyle,
        }
      },
  ]
}
