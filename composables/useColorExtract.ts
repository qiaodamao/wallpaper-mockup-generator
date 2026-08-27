import type { Ref } from 'vue'

// 经典渐变背景列表
const classicGradients = [
  'linear-gradient(135deg, rgb(238, 221, 243), rgb(238, 146, 177), rgb(99, 48, 180))',
  'linear-gradient(113.96deg, rgb(69, 190, 232) 13.54%, rgb(214, 161, 172) 50%, rgb(232, 140, 93) 85.42%)',
  'linear-gradient(113.96deg, rgb(69, 233, 159) 11.98%, rgb(213, 168, 155) 50%, rgb(232, 70, 152) 85.42%)',
  'linear-gradient(113.96deg, rgb(69, 223, 232) 11.98%, rgb(211, 170, 175) 50%, rgb(232, 103, 100) 85.42%)',
  'linear-gradient(293.96deg, rgb(160, 233, 125) 11.46%, rgb(169, 203, 177) 50%, rgb(192, 128, 232) 88.54%)',
  'linear-gradient(-45deg, rgb(114, 122, 154), rgb(216, 219, 233))',
  'linear-gradient(135deg, rgb(198, 255, 221), rgb(251, 215, 134), rgb(247, 121, 125))',
  'linear-gradient(135deg, rgb(248, 208, 129), rgb(238, 129, 68))',
  'linear-gradient(-225deg, rgb(105, 234, 203) 0%, rgb(234, 204, 248) 48%, rgb(102, 84, 241) 100%)',
  'linear-gradient(135deg, rgb(215, 235, 235), rgb(244, 175, 233), rgb(157, 126, 243))',
  'linear-gradient(135deg, rgb(79, 172, 254) 0%, rgb(0, 242, 254) 100%)',
  'linear-gradient(to top, rgb(254, 173, 166) 0%, rgb(245, 239, 239) 100%)'
]

/**
 * 智能配色：从壁纸提取主色，生成推荐渐变与纯色背景
 *
 * @param deps.paperImage 壁纸 <img> 元素 ref（模板 ref，取 [0]）
 * @param deps.backgroundColor 纯色背景 ref（推荐色写回）
 */
export function useColorExtract(deps: {
  paperImage: Ref<any>
  backgroundColor: Ref<string>
}) {
  const { paperImage, backgroundColor } = deps

  const selectedGradient = ref(classicGradients[0])
  const recommendedGradients = ref<string[]>([])
  const recommendedBackgroundColor = ref('')

  function clickClassicGradient(gradient: string) {
    selectedGradient.value = gradient
  }

  // 背景类型切换时按需生成推荐配色
  function backgroundTypeChange(type: string) {
    if (type == 'gradient') {
      if (recommendedGradients.value.length == 0) {
        generateRecommendedGradientColors()
        selectedGradient.value = recommendedGradients.value[0]
      }
    } else if (type == 'solidColor') {
      if (!recommendedBackgroundColor.value) {
        generateRecommendedBackgroundColors()
        backgroundColor.value = recommendedBackgroundColor.value
      }
    }
  }

  function generateRecommendedGradientColors() {
    const paperElement = paperImage.value[0]
    const mainColors = getMainColorsByImg(paperElement, 3)
    recommendedGradients.value = []
    for (let i = 0; i < mainColors.length - 1; i++) {
      for (let j = i + 1; j < mainColors.length; j++) {
        recommendedGradients.value.push(`linear-gradient(140deg, ${mainColors[i]} 25%, ${mainColors[j]} 90%)`)
        recommendedGradients.value.push(`linear-gradient(140deg, ${mainColors[j]} 25%, ${mainColors[i]} 90%)`)
      }
    }
  }

  function generateRecommendedBackgroundColors() {
    const paperElement = paperImage.value[0]
    const mainColors = getMainColorsByImg(paperElement, 1)
    recommendedBackgroundColor.value = mainColors[0]
  }

  // Canvas 像素采样：统计出现频率最高的颜色 + 整体平均色，返回主色列表。
  // 性能关键：先缩小到小尺寸采样画布（长边 96px）再遍历，避免原图千万级像素
  // 逐像素拼接字符串与排序导致主线程长时间阻塞；量化到 16 级分桶统计
  function getMainColorsByImg(imageElement: HTMLImageElement, numColors: number): string[] {
    const SAMPLE_SIZE = 96
    const QUANT = 16
    const scale = Math.min(SAMPLE_SIZE / imageElement.naturalWidth, SAMPLE_SIZE / imageElement.naturalHeight, 1)
    const w = Math.max(1, Math.round(imageElement.naturalWidth * scale))
    const h = Math.max(1, Math.round(imageElement.naturalHeight * scale))

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')!
    canvas.width = w
    canvas.height = h
    context.drawImage(imageElement, 0, 0, w, h)
    const imageData = context.getImageData(0, 0, w, h).data

    const colorCounts: Record<string, number> = {}

    let r = 0
    let g = 0
    let b = 0
    let count = 0

    for (let i = 0; i < imageData.length; i = i + 4) {
      const pr = imageData[i]
      const pg = imageData[i + 1]
      const pb = imageData[i + 2]
      r += pr
      g += pg
      b += pb
      count++

      // 量化分桶，避免海量相近颜色 key
      const qr = Math.round(pr / QUANT) * QUANT
      const qg = Math.round(pg / QUANT) * QUANT
      const qb = Math.round(pb / QUANT) * QUANT
      if (qr === 0 && qg === 0 && qb === 0) continue
      if (qr === 240 && qg === 240 && qb === 240) continue
      const key = `${qr},${qg},${qb}`
      colorCounts[key] = (colorCounts[key] ?? 0) + 1
    }

    const sortedColors = Object.keys(colorCounts).sort((a, b) => {
      return colorCounts[b] - colorCounts[a]
    })

    // 获取主题色
    r = Math.round(r / count)
    g = Math.round(g / count)
    b = Math.round(b / count)

    const mainRgb = `rgb(${r},${g},${b})`

    const result = sortedColors.slice(0, numColors).map(key => {
      const [kr, kg, kb] = key.split(',').map(Number)
      return `rgb(${kr},${kg},${kb})`
    })
    result.unshift(mainRgb)
    return result
  }

  return {
    classicGradients,
    selectedGradient,
    clickClassicGradient,
    recommendedGradients,
    recommendedBackgroundColor,
    backgroundTypeChange,
    generateRecommendedGradientColors,
    generateRecommendedBackgroundColors,
  }
}
