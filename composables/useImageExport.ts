import * as htmlToImage from 'html-to-image'
import { nextTick } from 'vue'
import type { Ref } from 'vue'

/**
 * 图片导出：单张导出与批量导出
 *
 * @param deps.paperUrl 当前壁纸地址（批量导出时逐张替换）
 * @param deps.autoUpdate 背景自动跟随壁纸开关
 * @param deps.paperImage 壁纸 <img> 模板 ref（取 [0]，onload 驱动批量流程）
 * @param deps.fileList 批量导出的文件列表
 * @param deps.isMiniProgram 是否处于微信小程序 webview
 * @param deps.recommendedGradients / recommendedBackgroundColor 推荐配色（换图后重新生成）
 * @param deps.selectedGradient / backgroundColor 当前选中的渐变 / 纯色背景
 * @param deps.generateRecommendedGradientColors / generateRecommendedBackgroundColors 推荐配色生成函数
 */
export function useImageExport(deps: {
  paperUrl: Ref<string>
  backgroundUrl: Ref<string>
  autoUpdate: Ref<boolean>
  paperImage: Ref<any>
  fileList: Ref<any[]>
  isMiniProgram: Ref<boolean>
  recommendedGradients: Ref<string[]>
  recommendedBackgroundColor: Ref<string>
  selectedGradient: Ref<string>
  backgroundColor: Ref<string>
  generateRecommendedGradientColors: () => void
  generateRecommendedBackgroundColors: () => void
}) {
  const {
    paperUrl, backgroundUrl, autoUpdate, paperImage, fileList, isMiniProgram,
    recommendedGradients, recommendedBackgroundColor, selectedGradient, backgroundColor,
    generateRecommendedGradientColors, generateRecommendedBackgroundColors,
  } = deps

  const resultImageUrl = ref('')
  const resultImage = ref<any>(null)
  const dialogVisible = ref(false)
  const multipleExportDialogVisible = ref(false)

  // 导出放大倍数
  const exportSettingOptions = [
    { label: '0.1X', value: 0.1 },
    { label: '1X', value: 1 },
    { label: '2X', value: 2 },
  ]
  const exportSettingOption = ref(1)

  // 批量导出进度
  const current = ref(0)
  const multipleExportStart = ref(false)
  const multipleExportEnd = ref(false)
  let beforeMultipleExportPaperUrl = ''

  const percentage = computed(() => {
    return current.value / fileList.value.length * 100
  })

  // 等待 DOM 与自定义字体渲染完成后再截图，避免导出缺字/缺图（html-to-image 时序问题）
  async function downloadResultImage() {
    await nextTick()
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      await document.fonts.ready
    }
    const blob = await htmlToImage.toBlob(resultImage.value, { pixelRatio: exportSettingOption.value })
    if (!blob) return
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.href = url
    link.download = `${Date.now()}.png`
    link.click()
    URL.revokeObjectURL(url)
  }

  function generateImage() {
    if (isMiniProgram.value) {
      htmlToImage.toPng(resultImage.value, { pixelRatio: exportSettingOption.value })
        .then((dataUrl) => {
          resultImageUrl.value = dataUrl
          dialogVisible.value = true
        })
        .catch((error) => {
          console.error('oops, something went wrong!', error);
        });
    } else {
      downloadResultImage().catch((error) => {
        console.error('oops, something went wrong!', error);
      });
    }
  }

  function result() {
    generateImage()
  }

  function multipleExport() {
    multipleExportDialogVisible.value = true
  }

  // 批量导出主循环：逐张替换壁纸，onload 后生成图片，直到 fileList 耗尽
  function onceExportResult() {
    const fileLength = fileList.value.length
    if (current.value < fileLength) {
      const currentFile = fileList.value[current.value]
      paperUrl.value = currentFile.url

      paperImage.value[0].onload = () => {
        generateRecommendedGradientColors()
        selectedGradient.value = recommendedGradients.value[0]

        generateRecommendedBackgroundColors()
        backgroundColor.value = recommendedBackgroundColor.value

        if (isMiniProgram.value) {
          // todo 小程序中：生成多张图片后跳转到小程序新页面中展示，然后再保存到本地
          htmlToImage.toPng(resultImage.value, { pixelRatio: exportSettingOption.value })
            .then((dataUrl) => {
              resultImageUrl.value = dataUrl
              dialogVisible.value = true
            })
            .catch((error) => {
              console.error('oops, something went wrong!', error);
            });
        } else {
          downloadResultImage().then(() => {
            paperImage.value[0].onload = () => { }
            current.value += 1
            onceExportResult()
          }).catch((error) => {
            console.error('oops, something went wrong!', error);
          });
        }
      }

    } else {
      // 批量导出结束后，恢复导出前的paperUrl
      multipleExportEnd.value = true
      setTimeout(() => {
        multipleExportStart.value = false
        multipleExportEnd.value = false
      }, 3000)

      paperImage.value[0].onload = () => {
        generateRecommendedGradientColors()
        selectedGradient.value = recommendedGradients.value[0]

        generateRecommendedBackgroundColors()
        backgroundColor.value = recommendedBackgroundColor.value
      }
      paperUrl.value = beforeMultipleExportPaperUrl
      if (autoUpdate.value) {
        backgroundUrl.value = paperUrl.value
      }
    }
  }

  function multipleExportResult() {
    multipleExportStart.value = true
    beforeMultipleExportPaperUrl = paperUrl.value
    current.value = 0
    onceExportResult()
  }

  return {
    resultImageUrl,
    resultImage,
    dialogVisible,
    multipleExportDialogVisible,
    exportSettingOptions,
    exportSettingOption,
    current,
    multipleExportStart,
    multipleExportEnd,
    percentage,
    generateImage,
    result,
    multipleExport,
    onceExportResult,
    multipleExportResult,
  }
}
