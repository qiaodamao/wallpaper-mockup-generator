import type { MockupExample } from '~/utils/types'
import { macDefaultImage, screenOptions, backgroundOptions, defaultSystemColor, defaultDateTimeColor } from './assets'

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
  ]
}
