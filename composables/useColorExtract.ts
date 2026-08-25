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

  // Canvas 像素采样：统计出现频率最高的颜色 + 整体平均色，返回主色列表
  function getMainColorsByImg(imageElement: HTMLImageElement, numColors: number): string[] {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')!
    canvas.width = imageElement.naturalWidth
    canvas.height = imageElement.naturalHeight
    context.drawImage(imageElement, 0, 0)
    //获取每个像素的颜色数据
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data

    const colorCounts: Record<string, number> = {}

    let r = 0
    let g = 0
    let b = 0

    for (let i = 0; i < imageData.length; i = i + 4) {
      const rgba = `rgb(${imageData[i]},${imageData[i + 1]},${imageData[i + 2]})`
      if (!['rgb(0,0,0)', 'rgb(255,255,255)'].includes(rgba)) {
        if (rgba in colorCounts) {
          colorCounts[rgba]++
        } else {
          colorCounts[rgba] = 1
        }
      }

      r += imageData[i];
      g += imageData[i + 1];
      b += imageData[i + 2];
    }

    const sortedColors = Object.keys(colorCounts).sort((a, b) => {
      return colorCounts[b] - colorCounts[a]
    })

    // 获取主题色
    const count = (canvas.width * canvas.height);
    r = Math.round(r / count)
    g = Math.round(g / count)
    b = Math.round(b / count)

    const mainRgb = `rgb(${r},${g},${b})`

    const result = sortedColors.slice(0, numColors)
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
