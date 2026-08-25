import type { MockupProtoItem } from './types'

/** 星期中文 */
export function formatXingQi(number = 0) {
  const arr = ['日', '一', '二', '三', '四', '五', '六']
  return arr[number]
}

function formatDateIntl(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short'
  }).format(date)
}

/** 本地化日期文案（中文为特殊格式） */
export function formatedDate(date: Date, locale: string) {
  if (locale == 'zh') {
    return `${date.getMonth() + 1}月${date.getDate()}日 星期${formatXingQi(date.getDay())}`
  }
  return formatDateIntl(date, locale)
}

/** 分钟补零 */
export function formatTimeMinutes(number = 0) {
  if (number < 10) {
    return `0${number}`
  }
  return number
}

/** 锁屏大号时间样式（字体与缩放） */
export function timeStyle(proto: MockupProtoItem, fontRadio: string): Record<string, string | number> {
  let result: Record<string, string | number> = {
    'font-size': '110px',
    'line-height': 1,
    color: proto.dateTimeColor,
    'font-family': fontRadio
  }

  if (fontRadio == 'Oswald-Stencil') {
    result = { ...result, ...{ transform: 'scaleY(0.7)' } }
  } else if (fontRadio == 'Monoton-Regular') {
    result = { ...result, ...{ transform: 'scaleY(0.7) scaleX(0.85)' } }
  }
  return result
}
