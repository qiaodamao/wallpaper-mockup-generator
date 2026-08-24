<script lang="ts" setup>
// definePageMeta({ layout: 'page' })
import * as StackBlur from 'stackblur-canvas'
import * as htmlToImage from 'html-to-image';
import {
  ref, computed
} from 'vue';
import { Check } from '@element-plus/icons-vue'

const { awesome } = useAppConfig()

const menus = computed(
  () =>
    (awesome?.layout?.page?.navbar?.menus ||
      []) as AwesomeLayoutPageNavbarMenu[],
)

const { t, locale } = useI18n()


const default1Image = '/image/proto/default1.png'
const noFrameDefault1Image = '/image/proto/no-frame-default1.png'
const default2Image = '/image/proto/default2.png'
const noFrameDefault2Image = '/image/proto/no-frame-default2.png'
const magazineImage = '/image/proto/magazine.png'
const magazineBackgroundImage = '/image/background/magazine.jpg'
const standImage = '/image/proto/stand.png'
const standBackgroundImage = '/image/background/stand.png'
const againstWallImage = '/image/proto/againstWall.png'
const againstWallBackgroundImage = '/image/background/againstWall.jpg'
const marbleImage = '/image/proto/marble.png'
const marbleBackgroundImage = '/image/background/marble.png'
const ipadDefault1Image = '/image/proto/ipad-default1.png'
const ipadVerticalImage = '/image/proto/ipad-vertical.png'
const ipadDefault2Image = '/image/proto/ipad-default2.png'
const ipadPoolImage = '/image/proto/ipad-pool.png'
const poolBackgroundImage = '/image/background/pool.jpg'
const ipadDesktopImage = '/image/proto/ipad-desktop.png'
const desktopBackgroundImage = '/image/background/desktop.jpg'
const ipadOfficeDesktopImage = '/image/proto/ipad-office-desktop.png'
const officeDesktopBackgroundImage = '/image/background/office-desktop.jpg'
const macDefaultImage = '/image/proto/mac-default.png'
const familyIphoneIpadImage = '/image/proto/family-iphone-ipad.png'
const family1Image = '/image/proto/family-1.png'
const family2Image = '/image/proto/family-2.png'
const iphoneHand1Image = '/image/proto/iphone-hand1.png'
const hand1BackgroundImage = '/image/background/hand1.jpg'
const desktopIphoneBackgroundImage = '/image/background/desktop-iphone.jpg'
const iphoneDesktopImage = '/image/proto/iphone-desktop.png'
const defaultImage = '/image/7.jpg'

import { copyText } from 'vue3-clipboard'
import { ElMessage } from 'element-plus'

let defaultWaterColor = "#ffffff"
let waterSetting = ref({
  enable: true,
  text: t("mockup.designByWho"),
  color: defaultWaterColor,
  fontSize: 30,
  translateX: 7,
  translateY: 740
})

function waterSettingStyle() {
  let result = {
    color: waterSetting.value.color,
    'font-size': `${waterSetting.value.fontSize}px`,
    transform: `translateX(${waterSetting.value.translateX}px) translateY(${waterSetting.value.translateY}px)`
  }

  return result
}

function waterColorChange(color) {
  if (color) {
    waterSetting.value.color = color
    return color
  }
  waterSetting.value.color = defaultWaterColor
  return defaultWaterColor
}

const fileList = ref([])
const previewDialogVisible = ref(false)
const previewDialogImageUrl = ref('')

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  previewDialogImageUrl.value = uploadFile.url
  previewDialogVisible.value = true
}

function onCopy() {
  copyText(pcUrl, undefined, (error, event) => {
    if (error) {
      ElMessage.error('复制失败')
    } else {
      ElMessage({
        message: '复制成功',
        type: 'success',
      })
    }
  })
}

let isMiniProgram = ref(false);


function backgroundImageLoad() {
  if (selectedProto.value.background.needBlur) {
    blurBackground()
  }
}

let scale = ref(0)

let w = ref(0);
let h = ref(0);

let isVerticalScreen = ref(true)
let exportPopupWidth = ref('90%')

function changeProtoWidth() {

  let windowWidth = window.innerWidth
  let windowHeight = window.innerHeight

  // 判断是横屏还是竖屏
  isVerticalScreen.value = windowWidth < windowHeight

  // 计算模型的缩放比例
  if (isVerticalScreen.value) {
    let maxWidth = windowHeight * 0.36

    w.value = windowWidth - 2 * 8
    if (w.value > maxWidth) {
      w.value = maxWidth
    }

    h.value = w.value * 4 / 3;


    let s = w.value / 1200

    scale.value = `scale(${s})`
  } else {
    let maxWidth = windowWidth - 328 - 320 - 32;
    let maxHeight = windowHeight - 50 - 60 - 68;
    let maxHeightToWidth = maxHeight * 3 / 4;

    w.value = maxWidth > maxHeightToWidth ? maxHeightToWidth : maxWidth;

    h.value = w.value * 4 / 3;

    let s = w.value / 1200

    scale.value = `scale(${s})`
  }

  // 计算导出图片的宽高
  let maxWidth = windowWidth - 26 * 2;
  let maxHeight = windowHeight - 60 * 2;
  let maxHeightToWidth = maxHeight * 3 / 4;

  let resultWidth = maxWidth > maxHeightToWidth ? maxHeightToWidth : maxWidth;
  exportPopupWidth.value = `${resultWidth}px`
}

let blurPoint = ref(66)

function blurBackground() {
  let img1 = document.getElementById('bg-image')
  let canvas1 = document.getElementById('bg-canvas')

  canvas1.style.objectFit = window.getComputedStyle(img1).objectFit
  StackBlur.image(img1, canvas1, blurPoint.value, false, 0, true)
}

function isBlur(blur) {
  if (blur) {
    blurBackground()
  }
}

function blurPointChange(currentBlurPoint) {
  blurPoint.value = currentBlurPoint
  blurBackground()
}

let resultImageUrl = ref("")
let resultImage = ref(null)
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
    htmlToImage.toBlob(resultImage.value, { pixelRatio: exportSettingOption.value })
      .then((blob) => {
        htmlToImage.toBlob(resultImage.value, { pixelRatio: exportSettingOption.value })
          .then((blob) => {
            htmlToImage.toBlob(resultImage.value, { pixelRatio: exportSettingOption.value })
              .then((blob) => {
                let link = document.createElement('a')
                let url = URL.createObjectURL(blob)
                link.href = url
                let fileName = new Date().getTime()
                link.download = `${fileName}.png`
                link.click()
                URL.revokeObjectURL(url)
              })
          })
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }
}

let dialogVisible = ref(false)
let multipleExportDialogVisible = ref(false)

function result() {
  generateImage()
}

function multipleExport() {
  multipleExportDialogVisible.value = true
}

import { ClientOnly } from '#components';

let paperUrl = ref(defaultImage)
const upload = ref(null)
const handleChange = (uploadFile, uploadFiles) => {
  let tempUrl = URL.createObjectURL(uploadFile.raw)
  upload.value[0].clearFiles()

  paperImage.value[0].onload = () => {
    generateRecommendedGradientColors()
    selectedGradient.value = recommendedGradients.value[0]

    generateRecommendedBackgroundColors()
    backgroundColor.value = recommendedBackgroundColor.value
  }

  paperUrl.value = tempUrl

  if (autoUpdate.value) {
    backgroundUrl.value = paperUrl.value
  }
}

const multipleUpload = ref(null)

function clearMultipleDialogImages() {
  multipleUpload.value.clearFiles()
}

let beforeMultipleExportPaperUrl = ''
function onceExportResult() {
  const fileLength = fileList.value.length
  if (current.value < fileLength) {
    let currentFile = fileList.value[current.value]
    paperUrl.value = currentFile.url
    if (autoUpdate.value) {
      backgroundUrl.value = paperUrl.value
    }

    paperImage.value[0].onload = () => {

      console.log(current.value);
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
        htmlToImage.toBlob(resultImage.value, { pixelRatio: exportSettingOption.value })
          .then((blob) => {
            let link = document.createElement('a')
            let url = URL.createObjectURL(blob)
            link.href = url
            let fileName = new Date().getTime()
            link.download = `${fileName}.png`
            link.click()
            URL.revokeObjectURL(url)

            paperImage.value[0].onload = () => { }
            current.value += 1
            onceExportResult()
          })
          .catch((error) => {
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
let current = ref(0)
let multipleExportStart = ref(false)
let multipleExportEnd = ref(false)
function multipleExportResult() {
  multipleExportStart.value = true
  beforeMultipleExportPaperUrl = paperUrl.value
  current.value = 0
  onceExportResult()
}

let percentage = computed(() => {
  console.log(current.value / fileList.value.length * 100);
  return current.value / fileList.value.length * 100;
})

const multipleUploadChange = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
  console.log(fileList.value);
}

let backgroundUrl = ref(defaultImage)
const uploadBackground = ref(null)
const handleChangeBackground = (uploadFile, uploadFiles) => {
  let tempUrl = URL.createObjectURL(uploadFile.raw)
  backgroundUrl.value = tempUrl
  uploadBackground.value.clearFiles()
}

let autoUpdate = ref(true)

// 这里面的值要处理国际化，需要注意,国际化的字段要和数组里的字段对应
// <el-segmented v-model="proto.screenType" :options="screenOptions[proto.type]" block />
const screenOptions = {
  // '手机': ['锁屏', '桌面', '聊天', '仅样机'],
  'iphoneType': ['lockScreen', 'desktopScreen', 'onlyMockUp'],
  'ipadType': ['lockScreen', 'desktopScreen', 'onlyMockUp'],
  'macType': ['lockScreen', 'onlyMockUp']
}

const screenLabelOptions = (options = []) => {
  return options.map(item=>{
    return { label: t(`mockup.${item}`), value: item }
  })
}

// const backgroundOptions = ['图片', '渐变', '纯色']
const backgroundOptions = ['imageText', 'gradient', 'solidColor']

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

let selectedGradient = ref(classicGradients[0])
function clickClassicGradient(gradient) {
  selectedGradient.value = gradient
}

function protoChange(proto) {
  selectedProto.value = proto
  activeProtoName.value = selectedProto.value.protoList[0].name

  if (proto.background.defaultBackgroundUrl) {
    backgroundUrl.value = proto.background.defaultBackgroundUrl
  } else {
    backgroundUrl.value = backgroundUrl.value
  }

  if (proto.background.autoUpdate) {
    autoUpdate.value = true
  } else {
    autoUpdate.value = false
  }

  if (autoUpdate.value) {
    backgroundUrl.value = paperUrl.value
  }
}

let defaultSystemColor = "#ffffff"
let defaultDateTimeColor = "#ffffff"
let protoTypeList = ref([
  {
    protoType: 'iPhone',
    list: [
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
            paperStyleMethod: (proto) => {
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
            paperStyleMethod: (proto) => {
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
              'z-index': 999,
            }
          },
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',

            }
          },
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',

            }
          },
        }
      },
    ]
  },
  {
    protoType: 'iPad',
    list: [
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
        }
      },
    ]

  },
  {
    protoType: 'Mac',
    list: [
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
        }
      },
    ]
  },
  {
    protoType: t("mockup.familyBucket"),
    list: [
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
            paperStyleMethod: (proto) => {
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
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
            paperStyleMethod: (proto) => {
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
            paperStyleMethod: (proto) => {
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
            paperStyleMethod: (proto) => {
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
            paperStyleMethod: (proto) => {
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
          backgroundImageStyle: () => {
            return {
              display: !selectedProto.value.background.needBlur ? 'block' : 'none',
            }
          },
        }
      },
    ]
  }
])

let selectedProto = ref(protoTypeList.value[0].list[0])

let activeProtoName = ref(selectedProto.value.protoList[0].name)

let activeProtoTypeName = ref(protoTypeList.value[0].protoType)

const handleClick = (tab, event) => {
  console.log(tab, event)
}

function clickProto(name) {
  activeProtoName.value = name;
}

function clickBackground() {
  if (isVerticalScreen.value) {
    activeProtoName.value = '背景';
  }
}

let dateShortcuts = [{
  text: t('mockup.todayText'),
  value: new Date(),
}]

function formatXingQi(number = 0) {
  let arr = ['日', '一', '二', '三', '四', '五', '六']
  return arr[number]
}

const formatDateIntl = (date, locale) => {
  return new Intl.DateTimeFormat(locale, {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short'
  }).format(date)
}

let formatedDate = (date) => {
  if (locale.value == 'zh') {
    return `${date.getMonth() + 1}月${date.getDate()}日 星期${formatXingQi(date.getDay())}`
  } else {
    return formatDateIntl(date, locale.value)
  }
}

function formatTimeMinutes(number = 0) {
  if (number < 10) {
    return `0${number}`
  }
  return number
}

let systemColorChange = (color, proto) => {
  if (color) {
    proto.systemColor = color
    return color
  }
  proto.systemColor = defaultSystemColor
  return defaultSystemColor
}

let dateTimeColorChange = (color, proto) => {
  if (color) {
    proto.dateTimeColor = color
    return color
  }
  proto.dateTimeColor = defaultDateTimeColor
  return defaultDateTimeColor
}

let defaultBackgroundColor = "#ffffff"
let backgroundColor = ref(defaultBackgroundColor)
function backgroundColorChange(color) {
  if (color) {
    backgroundColor.value = color
    return color;
  }
  backgroundColor.value = defaultBackgroundColor
  return defaultBackgroundColor
}

let defaultComponentText = `${t("mockup.fairy")} iPhone`
let componentText = ref(defaultComponentText)

let componentRadio = ref(1)

let desktopRadio = ref(1)

const fontList = [
  {
    label: t('mockup.defaultText'),
    value: 'BalooThambi2-Regular',
  },
  {
    label: t('mockup.lineBroke'),
    value: 'Oswald-Stencil',
  },
  {
    label: t('mockup.multiLine'),
    value: 'Monoton-Regular',
  },
]
let fontRadio = ref(fontList[0].value)

function timeStyle(proto) {
  let result = {
    'font-size': '110px',
    'line-height': 1,
    color: proto.dateTimeColor,
    'font-family': fontRadio.value
  }

  if (fontRadio.value == 'Oswald-Stencil') {
    result = { ...result, ...{ transform: 'scaleY(0.7)' } }
  } else if (fontRadio.value == 'Monoton-Regular') {
    result = { ...result, ...{ transform: 'scaleY(0.7) scaleX(0.85)' } }
  }
  return result;
}

const paperImage = ref(null)

let recommendedGradients = ref([])
let recommendedBackgroundColor = ref('')

function backgroundTypeChange(type) {
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
  let paperElement = paperImage.value[0]
  let mainColors = getMainColorsByImg(paperElement, 3)
  recommendedGradients.value = []
  for (let i = 0; i < mainColors.length - 1; i++) {
    for (let j = i + 1; j < mainColors.length; j++) {
      recommendedGradients.value.push(`linear-gradient(140deg, ${mainColors[i]} 25%, ${mainColors[j]} 90%)`)
      recommendedGradients.value.push(`linear-gradient(140deg, ${mainColors[j]} 25%, ${mainColors[i]} 90%)`)
    }
  }
}

function generateRecommendedBackgroundColors() {
  let paperElement = paperImage.value[0]
  let mainColors = getMainColorsByImg(paperElement, 1)
  recommendedBackgroundColor.value = mainColors[0]
}

function getMainColorsByImg(imageElement, numColors) {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  canvas.width = imageElement.naturalWidth
  canvas.height = imageElement.naturalHeight
  context.drawImage(imageElement, 0, 0)
  //获取每个像素的颜色数据
  let imageData = context.getImageData(0, 0, canvas.width, canvas.height).data

  let colorCounts = {}

  let r = 0
  let g = 0
  let b = 0

  for (let i = 0; i < imageData.length; i = i + 4) {

    let rgba = `rgb(${imageData[i]},${imageData[i + 1]},${imageData[i + 2]})`
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

  let sortedColors = Object.keys(colorCounts).sort((a, b) => {
    return colorCounts[b] - colorCounts[a]
  })

  // 获取主题色
  const count = (canvas.width * canvas.height);
  r = Math.round(r / count)
  g = Math.round(g / count)
  b = Math.round(b / count)

  let mainRgb = `rgb(${r},${g},${b})`

  let result = sortedColors.slice(0, numColors)
  result.unshift(mainRgb)
  return result
}

let exportSettingOptions = [
  {
    label: '0.1X',
    value: 0.1,
  },
  {
    label: '1X',
    value: 1,
  },
  {
    label: '2X',
    value: 2,
  }
]
let exportSettingOption = ref(1)


onMounted(() => {
  if (typeof wx !== 'undefined') {
    wx.miniProgram.getEnv(res => {
      isMiniProgram.value = res && res.miniprogram

    })
  }

  changeProtoWidth()
  window.onresize = (res) => {
    changeProtoWidth()
  }
})


</script>

<template>
  <ClientOnly>
    <header
      class=" h-[64px] max-h-[64px] flex backdrop-filter backdrop-blur-md top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-950/10 dark:border-gray-50/[0.2] bg-white/[0.5] dark:bg-gray-950/[0.5]">
      <!-- content -->
      <div class="flex-1 flex items-center justify-between max-w-screen-2xl mx-auto px-8">
        <!-- title -->
        <div>
          <slot name="title">
            <NuxtLink to="/" class="font-bold text-lg text-primary-500">
              <Icon name="simple-icons:nuxtdotjs" class="font-black text-xl font-mono mr-2 inline-block" />
              <span class="capitalize">{{ awesome.name }}</span>
            </NuxtLink>
          </slot>
        </div>
        <!-- menus -->
        <div class="flex space-x-4 items-center">
          <!-- others -->
          <!-- <div class="flex space-x-4 text-sm items-center">
          <button class="btn btn-accent">Get started</button>
        </div> -->
        </div>
      </div>

    </header>
    <div class="root" :class="{ 'center-section-landscape': !isVerticalScreen }">
      <div class="frame-section"
        :class="{ 'frame-section-landscape': !isVerticalScreen, 'frame-section-vertical': isVerticalScreen }">
        <el-tabs v-model="activeProtoTypeName" class="proto-tabs" :class="{ 'proto-tabs-vertical': isVerticalScreen }"
          @tab-click="handleClick">
          <el-tab-pane :label="type.protoType" :name="type.protoType" v-for="(type, typeIndex) in protoTypeList"
            :key="typeIndex" style="height: 100%;">
            <div class="proto-list"
              :class="{ 'proto-list-landscape': !isVerticalScreen, 'proto-list-vertical': isVerticalScreen }">
              <div class="proto-item"
                :class="{ 'proto-item-landscape': !isVerticalScreen, 'proto-item-vertical': isVerticalScreen }"
                v-for="(item, index) in type.list" :key="index" @click="protoChange(item)">
                <img class="proto-image" :class="{ ring: selectedProto.defaultProtoUrl == item.defaultProtoUrl }"
                  :src="item.defaultProtoUrl"></img>
                <div class="example-name">{{ item.exampleName }}</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="proto-section" :class="{ 'proto-section-landscape': !isVerticalScreen }">
        <div :style="{ width: w + 'px', height: h + 'px' }">
          <div style="transform-origin: top left;" :style="{ transform: scale }">
            <div ref='resultImage' class="content" id="content" style="width: 1200px; height: 1600px;">
              <template v-if="selectedProto.background.type == 'imageText'">
                <img id="bg-image" class="bg-image" :src="backgroundUrl"
                  :style="selectedProto.background.backgroundImageStyle()" @load="backgroundImageLoad"></img>
                <canvas id="bg-canvas" class="bg-canvas"
                  :style="{ display: selectedProto.background.needBlur ? 'block' : 'none' }" />
              </template>

              <template v-if="selectedProto.background.type == 'gradient'">
                <div class="background" :style="{ background: selectedGradient }"></div>
              </template>

              <template v-if="selectedProto.background.type == 'solidColor'">
                <div class="background" :style="{ backgroundColor: backgroundColor }"></div>
              </template>

              <div class="main-page" @click="clickBackground">
                <div @click.stop="clickProto(proto.name)" class="proto"
                  v-for="(proto, index) in selectedProto.protoList" :style="proto.style">
                  <!-- 边框部分 -->
                  <img crossorigin="" v-if="proto.type == 'iphoneType' && proto.frame" class="frame"
                    src="/image/frame-1.png"></img>
                  <img crossorigin="" v-if="proto.type == 'iphoneType' && proto.smartIsLand" class="smart-isLand"
                    src="/image/hair.png"></img>
                  <div v-if="proto.type == 'macType' && proto.frame"
                    style="width: 4096px;height: 2459px;position: absolute;z-index: 20;">
                    <img class="frame" src="/image/mac-modal.png"></img>
                  </div>

                  <!-- 壁纸内容 -->
                  <div v-if="['lockScreen', 'desktopScreen', 'onlyMockUp'].includes(proto.screenType)" class="paper"
                    :style="proto.paperStyleMethod(proto)">
                    <img ref="paperImage" class="image" :src="paperUrl"></img>

                    <!-- 平板/电脑界面的组件 -->
                    <div v-if="['ipadType', 'macType'].includes(proto.type) && ['lockScreen', 'desktopScreen'].includes(proto.screenType)" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: flex;flex-direction: column;
    align-items: center;">

                      <!-- 电脑没有顶部的信号格 -->
                      <div v-if="['ipadType'].includes(proto.type)" class="system"
                        style="position: absolute;top: 0px;left: -0.47px;">

                        <div v-if="proto.screenType == 'desktopScreen'" class="date-time"
                          style="position: absolute;left: 15px;top: 6px;display: flex;flex-direction: row;align-items: center">

                          <div style="font-size: 13px;line-height: 1;" :style="{ color: proto.systemColor }">{{
                            proto.selectedTime.getHours() }}<span
                              style="position: relative;top: -0.928571px;">:</span>{{
                                formatTimeMinutes(proto.selectedTime.getMinutes()) }}
                          </div>

                          <div
                            style="font-size: 10.5px;white-space: nowrap;line-height: 13px;margin-left: 6px;padding-bottom: .6px;"
                            :style="{ color: proto.systemColor }">
                            {{ formatedDate(proto.selectedDate) }}
                          </div>
                        </div>

                        <svg width="1195" height="24" viewBox="0 0 1195 24" :fill="proto.systemColor"
                          style="position: relative;" :style="{ left: proto.vertical ? '-356px' : '0px' }"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1091.05 7.61732C1090.97 7.80109 1090.97 8.03406 1090.97 8.5V15.5C1090.97 15.9659 1090.97 16.1989 1091.05 16.3827C1091.15 16.6277 1091.35 16.8224 1091.59 16.9239C1091.77 17 1092.01 17 1092.47 17C1092.94 17 1093.17 17 1093.36 16.9239C1093.6 16.8224 1093.8 16.6277 1093.9 16.3827C1093.97 16.1989 1093.97 15.9659 1093.97 15.5V8.5C1093.97 8.03406 1093.97 7.80109 1093.9 7.61732C1093.8 7.37229 1093.6 7.17761 1093.36 7.07612C1093.17 7 1092.94 7 1092.47 7C1092.01 7 1091.77 7 1091.59 7.07612C1091.35 7.17761 1091.15 7.37229 1091.05 7.61732Z"
                            :fill="proto.systemColor"></path>
                          <path
                            d="M1086.47 10.5C1086.47 10.0341 1086.47 9.80109 1086.55 9.61732C1086.65 9.37229 1086.85 9.17761 1087.09 9.07612C1087.27 9 1087.51 9 1087.97 9C1088.44 9 1088.67 9 1088.86 9.07612C1089.1 9.17761 1089.3 9.37229 1089.4 9.61732C1089.47 9.80109 1089.47 10.0341 1089.47 10.5V15.5C1089.47 15.9659 1089.47 16.1989 1089.4 16.3827C1089.3 16.6277 1089.1 16.8224 1088.86 16.9239C1088.67 17 1088.44 17 1087.97 17C1087.51 17 1087.27 17 1087.09 16.9239C1086.85 16.8224 1086.65 16.6277 1086.55 16.3827C1086.47 16.1989 1086.47 15.9659 1086.47 15.5V10.5Z"
                            :fill="proto.systemColor"></path>
                          <path
                            d="M1082.05 11.6173C1081.97 11.8011 1081.97 12.0341 1081.97 12.5V15.5C1081.97 15.9659 1081.97 16.1989 1082.05 16.3827C1082.15 16.6277 1082.35 16.8224 1082.59 16.9239C1082.77 17 1083.01 17 1083.47 17C1083.94 17 1084.17 17 1084.36 16.9239C1084.6 16.8224 1084.8 16.6277 1084.9 16.3827C1084.97 16.1989 1084.97 15.9659 1084.97 15.5V12.5C1084.97 12.0341 1084.97 11.8011 1084.9 11.6173C1084.8 11.3723 1084.6 11.1776 1084.36 11.0761C1084.17 11 1083.94 11 1083.47 11C1083.01 11 1082.77 11 1082.59 11.0761C1082.35 11.1776 1082.15 11.3723 1082.05 11.6173Z"
                            :fill="proto.systemColor"></path>
                          <path
                            d="M1077.55 13.1173C1077.47 13.3011 1077.47 13.5341 1077.47 14V15.5C1077.47 15.9659 1077.47 16.1989 1077.55 16.3827C1077.65 16.6277 1077.85 16.8224 1078.09 16.9239C1078.27 17 1078.51 17 1078.97 17C1079.44 17 1079.67 17 1079.86 16.9239C1080.1 16.8224 1080.3 16.6277 1080.4 16.3827C1080.47 16.1989 1080.47 15.9659 1080.47 15.5V14C1080.47 13.5341 1080.47 13.3011 1080.4 13.1173C1080.3 12.8723 1080.1 12.6776 1079.86 12.5761C1079.67 12.5 1079.44 12.5 1078.97 12.5C1078.51 12.5 1078.27 12.5 1078.09 12.5761C1077.85 12.6776 1077.65 12.8723 1077.55 13.1173Z"
                            :fill="proto.systemColor"></path>
                          <path
                            d="M1110.48 11.246C1110.59 11.3525 1110.77 11.353 1110.88 11.243L1111.94 10.179C1112.06 10.064 1112.06 9.87452 1111.94 9.76302C1110.13 8.05052 1107.69 7.00002 1105 7.00002C1102.31 7.00002 1099.87 8.05052 1098.06 9.76302C1097.94 9.87452 1097.94 10.064 1098.06 10.179L1099.12 11.243C1099.23 11.353 1099.41 11.3525 1099.52 11.246C1100.96 9.90152 1102.88 9.07702 1105 9.07702C1107.12 9.07702 1109.04 9.90152 1110.48 11.246Z"
                            :fill="proto.systemColor"></path>
                          <path
                            d="M1108.03 13.6965C1108.15 13.7995 1108.32 13.8005 1108.43 13.691L1109.49 12.6285C1109.61 12.513 1109.61 12.3205 1109.49 12.21C1108.31 11.1245 1106.73 10.4615 1105 10.4615C1103.27 10.4615 1101.69 11.1245 1100.51 12.21C1100.39 12.3205 1100.39 12.513 1100.51 12.6285L1101.57 13.691C1101.68 13.8005 1101.85 13.7995 1101.97 13.6965C1102.77 12.977 1103.84 12.5385 1105 12.5385C1106.16 12.5385 1107.22 12.977 1108.03 13.6965Z"
                            :fill="proto.systemColor"></path>
                          <path
                            d="M1107.03 14.6611C1107.16 14.7661 1107.16 14.9616 1107.04 15.0776L1105.21 16.9156C1105.09 17.0281 1104.91 17.0281 1104.8 16.9156L1102.96 15.0776C1102.84 14.9616 1102.84 14.7661 1102.97 14.6611C1103.52 14.2006 1104.23 13.9231 1105 13.9231C1105.78 13.9231 1106.48 14.2006 1107.03 14.6611Z"
                            :fill="proto.systemColor"></path>
                          <path
                            d="M1119.03 16V8.89844H1118.93L1116.81 10.416V9.12695L1119.03 7.54492H1120.34V16H1119.03ZM1125.72 16.2051C1125.07 16.2051 1124.51 16.0254 1124.05 15.666C1123.58 15.3066 1123.23 14.7969 1122.98 14.1367C1122.73 13.4727 1122.6 12.6855 1122.6 11.7754V11.7637C1122.6 10.8535 1122.73 10.0684 1122.98 9.4082C1123.23 8.74805 1123.58 8.23828 1124.05 7.87891C1124.51 7.51953 1125.07 7.33984 1125.72 7.33984C1126.38 7.33984 1126.93 7.51953 1127.4 7.87891C1127.86 8.23828 1128.22 8.74805 1128.47 9.4082C1128.73 10.0684 1128.85 10.8535 1128.85 11.7637V11.7754C1128.85 12.6855 1128.73 13.4727 1128.47 14.1367C1128.22 14.7969 1127.86 15.3066 1127.4 15.666C1126.93 16.0254 1126.38 16.2051 1125.72 16.2051ZM1125.72 15.1094C1126.1 15.1094 1126.42 14.9746 1126.69 14.7051C1126.96 14.4355 1127.17 14.0527 1127.31 13.5566C1127.45 13.0566 1127.52 12.4629 1127.52 11.7754V11.7637C1127.52 11.0762 1127.45 10.4844 1127.31 9.98828C1127.17 9.49219 1126.96 9.11133 1126.69 8.8457C1126.42 8.57617 1126.1 8.44141 1125.72 8.44141C1125.35 8.44141 1125.03 8.57617 1124.76 8.8457C1124.49 9.11133 1124.29 9.49219 1124.14 9.98828C1124 10.4844 1123.93 11.0762 1123.93 11.7637V11.7754C1123.93 12.4629 1124 13.0566 1124.14 13.5566C1124.29 14.0527 1124.49 14.4355 1124.76 14.7051C1125.03 14.9746 1125.35 15.1094 1125.72 15.1094ZM1133.53 16.2051C1132.88 16.2051 1132.32 16.0254 1131.85 15.666C1131.39 15.3066 1131.03 14.7969 1130.78 14.1367C1130.53 13.4727 1130.41 12.6855 1130.41 11.7754V11.7637C1130.41 10.8535 1130.53 10.0684 1130.78 9.4082C1131.03 8.74805 1131.39 8.23828 1131.85 7.87891C1132.32 7.51953 1132.88 7.33984 1133.53 7.33984C1134.18 7.33984 1134.74 7.51953 1135.2 7.87891C1135.67 8.23828 1136.03 8.74805 1136.28 9.4082C1136.53 10.0684 1136.66 10.8535 1136.66 11.7637V11.7754C1136.66 12.6855 1136.53 13.4727 1136.28 14.1367C1136.03 14.7969 1135.67 15.3066 1135.2 15.666C1134.74 16.0254 1134.18 16.2051 1133.53 16.2051ZM1133.53 15.1094C1133.91 15.1094 1134.23 14.9746 1134.5 14.7051C1134.76 14.4355 1134.97 14.0527 1135.11 13.5566C1135.26 13.0566 1135.33 12.4629 1135.33 11.7754V11.7637C1135.33 11.0762 1135.26 10.4844 1135.11 9.98828C1134.97 9.49219 1134.76 9.11133 1134.5 8.8457C1134.23 8.57617 1133.91 8.44141 1133.53 8.44141C1133.15 8.44141 1132.83 8.57617 1132.56 8.8457C1132.3 9.11133 1132.09 9.49219 1131.95 9.98828C1131.81 10.4844 1131.74 11.0762 1131.74 11.7637V11.7754C1131.74 12.4629 1131.81 13.0566 1131.95 13.5566C1132.09 14.0527 1132.3 14.4355 1132.56 14.7051C1132.83 14.9746 1133.15 15.1094 1133.53 15.1094ZM1140.04 12.0625C1139.66 12.0625 1139.33 11.9688 1139.06 11.7812C1138.79 11.5898 1138.58 11.3223 1138.43 10.9785C1138.28 10.6309 1138.21 10.2207 1138.21 9.74805V9.74219C1138.21 9.26172 1138.28 8.84961 1138.43 8.50586C1138.58 8.16211 1138.79 7.89648 1139.06 7.70898C1139.33 7.52148 1139.66 7.42773 1140.04 7.42773C1140.42 7.42773 1140.74 7.52148 1141.02 7.70898C1141.29 7.89648 1141.51 8.16211 1141.65 8.50586C1141.8 8.84961 1141.87 9.26172 1141.87 9.74219V9.74805C1141.87 10.2207 1141.8 10.6309 1141.65 10.9785C1141.51 11.3223 1141.29 11.5898 1141.02 11.7812C1140.74 11.9688 1140.42 12.0625 1140.04 12.0625ZM1140.04 11.2773C1140.32 11.2773 1140.53 11.1426 1140.68 10.873C1140.84 10.6035 1140.92 10.2285 1140.92 9.74805V9.74219C1140.92 9.25781 1140.84 8.88281 1140.68 8.61719C1140.53 8.34766 1140.32 8.21289 1140.04 8.21289C1139.76 8.21289 1139.55 8.34766 1139.4 8.61719C1139.25 8.88281 1139.17 9.25781 1139.17 9.74219V9.74805C1139.17 10.2285 1139.25 10.6035 1139.4 10.873C1139.55 11.1426 1139.76 11.2773 1140.04 11.2773ZM1140.92 16H1139.82L1145.55 7.54492H1146.65L1140.92 16ZM1146.42 16.1172C1146.04 16.1172 1145.71 16.0234 1145.44 15.8359C1145.17 15.6445 1144.96 15.377 1144.81 15.0332C1144.66 14.6855 1144.59 14.2734 1144.59 13.7969V13.791C1144.59 13.3145 1144.66 12.9043 1144.81 12.5605C1144.96 12.2168 1145.17 11.9512 1145.44 11.7637C1145.71 11.5762 1146.04 11.4824 1146.42 11.4824C1146.8 11.4824 1147.12 11.5762 1147.4 11.7637C1147.67 11.9512 1147.88 12.2168 1148.02 12.5605C1148.17 12.9043 1148.25 13.3145 1148.25 13.791V13.7969C1148.25 14.2734 1148.17 14.6855 1148.02 15.0332C1147.88 15.377 1147.67 15.6445 1147.4 15.8359C1147.12 16.0234 1146.8 16.1172 1146.42 16.1172ZM1146.42 15.332C1146.7 15.332 1146.91 15.1973 1147.06 14.9277C1147.22 14.6582 1147.29 14.2812 1147.29 13.7969V13.791C1147.29 13.3105 1147.22 12.9375 1147.06 12.6719C1146.91 12.4023 1146.7 12.2676 1146.42 12.2676C1146.14 12.2676 1145.93 12.4023 1145.77 12.6719C1145.62 12.9375 1145.55 13.3105 1145.55 13.791V13.7969C1145.55 14.2812 1145.62 14.6582 1145.77 14.9277C1145.93 15.1973 1146.14 15.332 1146.42 15.332Z"
                            :fill="proto.ystemColor"></path>
                          <g opacity="0.4">
                            <mask id="path-6-inside-1_1_400" :fill="proto.systemColor">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M1158.23 7H1171.83C1172.75 7 1173.39 7.00078 1173.88 7.04096C1174.36 7.08018 1174.61 7.15192 1174.8 7.24524C1175.22 7.46095 1175.57 7.80516 1175.78 8.22852C1175.87 8.41166 1175.95 8.66673 1175.99 9.14684C1176.03 9.63862 1176.03 10.2734 1176.03 11.2V12.8C1176.03 13.7266 1176.03 14.3614 1175.99 14.8532C1175.95 15.3333 1175.87 15.5883 1175.78 15.7715C1175.57 16.1948 1175.22 16.539 1174.8 16.7548C1174.61 16.8481 1174.36 16.9198 1173.88 16.959C1173.39 16.9992 1172.75 17 1171.83 17H1158.23C1157.3 17 1156.67 16.9992 1156.17 16.959C1155.69 16.9198 1155.44 16.8481 1155.26 16.7548C1154.83 16.539 1154.49 16.1948 1154.27 15.7715C1154.18 15.5883 1154.11 15.3333 1154.07 14.8532C1154.03 14.3614 1154.03 13.7266 1154.03 12.8V11.2C1154.03 10.2734 1154.03 9.63862 1154.07 9.14684C1154.11 8.66673 1154.18 8.41166 1154.27 8.22852C1154.49 7.80516 1154.83 7.46095 1155.26 7.24524C1155.44 7.15192 1155.69 7.08018 1156.17 7.04096C1156.67 7.00078 1157.3 7 1158.23 7ZM1153.03 11.2C1153.03 9.37983 1153.03 8.46974 1153.38 7.77453C1153.69 7.163 1154.19 6.66582 1154.8 6.35423C1155.5 6 1156.41 6 1158.23 6H1171.83C1173.65 6 1174.56 6 1175.25 6.35423C1175.86 6.66582 1176.36 7.163 1176.67 7.77453C1177.03 8.46974 1177.03 9.37983 1177.03 11.2V12.8C1177.03 14.6202 1177.03 15.5303 1176.67 16.2255C1176.36 16.837 1175.86 17.3342 1175.25 17.6458C1174.56 18 1173.65 18 1171.83 18H1158.23C1156.41 18 1155.5 18 1154.8 17.6458C1154.19 17.3342 1153.69 16.837 1153.38 16.2255C1153.03 15.5303 1153.03 14.6202 1153.03 12.8V11.2ZM1179.53 12C1179.53 11.0681 1178.89 10.285 1178.03 10.063V13.937C1178.89 13.715 1179.53 12.9319 1179.53 12Z">
                              </path>
                            </mask>
                            <path
                              d="M1173.88 7.04096L1173.8 8.03764L1173.8 8.03764L1173.88 7.04096ZM1174.8 7.24524L1174.34 8.13624L1174.34 8.13624L1174.8 7.24524ZM1175.78 8.22852L1176.67 7.77453L1176.67 7.77453L1175.78 8.22852ZM1175.99 9.14684L1174.99 9.22827L1174.99 9.22827L1175.99 9.14684ZM1175.99 14.8532L1174.99 14.7717L1174.99 14.7717L1175.99 14.8532ZM1175.78 15.7715L1176.67 16.2255L1176.67 16.2255L1175.78 15.7715ZM1174.8 16.7548L1174.34 15.8638L1174.34 15.8638L1174.8 16.7548ZM1173.88 16.959L1173.96 17.9557L1173.96 17.9557L1173.88 16.959ZM1156.17 16.959L1156.09 17.9557L1156.09 17.9557L1156.17 16.959ZM1155.26 16.7548L1155.71 15.8638L1155.71 15.8638L1155.26 16.7548ZM1154.27 15.7715L1153.38 16.2255L1153.38 16.2255L1154.27 15.7715ZM1154.07 14.8532L1155.06 14.7717L1155.06 14.7717L1154.07 14.8532ZM1154.07 9.14684L1155.06 9.22827L1155.06 9.22827L1154.07 9.14684ZM1154.27 8.22852L1155.16 8.68251L1155.16 8.68251L1154.27 8.22852ZM1155.26 7.24524L1155.71 8.13624L1155.71 8.13624L1155.26 7.24524ZM1156.17 7.04096L1156.25 8.03764L1156.25 8.03764L1156.17 7.04096ZM1153.38 7.77453L1154.27 8.22852L1153.38 7.77453ZM1154.8 6.35423L1155.26 7.24524L1154.8 6.35423ZM1175.25 6.35423L1175.71 5.46322L1175.71 5.46322L1175.25 6.35423ZM1176.67 7.77453L1175.78 8.22852L1175.78 8.22852L1176.67 7.77453ZM1176.67 16.2255L1175.78 15.7715L1175.78 15.7715L1176.67 16.2255ZM1175.25 17.6458L1174.8 16.7548L1174.8 16.7548L1175.25 17.6458ZM1154.8 17.6458L1155.26 16.7548L1155.26 16.7548L1154.8 17.6458ZM1153.38 16.2255L1152.49 16.6795L1152.49 16.6795L1153.38 16.2255ZM1178.03 10.063L1178.28 9.09457L1177.03 8.77303V10.063H1178.03ZM1178.03 13.937H1177.03V15.227L1178.28 14.9054L1178.03 13.937ZM1171.83 6H1158.23V8H1171.83V6ZM1173.96 6.04428C1173.42 5.99999 1172.74 6 1171.83 6V8C1172.77 8 1173.36 8.00156 1173.8 8.03764L1173.96 6.04428ZM1175.25 6.35423C1174.9 6.17699 1174.5 6.08852 1173.96 6.04428L1173.8 8.03764C1174.22 8.07184 1174.33 8.12685 1174.34 8.13624L1175.25 6.35423ZM1176.67 7.77453C1176.36 7.163 1175.86 6.66582 1175.25 6.35423L1174.34 8.13624C1174.58 8.25608 1174.77 8.44731 1174.89 8.68251L1176.67 7.77453ZM1176.98 9.06541C1176.94 8.52388 1176.85 8.12237 1176.67 7.77453L1174.89 8.68251C1174.9 8.70095 1174.95 8.80959 1174.99 9.22827L1176.98 9.06541ZM1177.03 11.2C1177.03 10.2903 1177.03 9.60745 1176.98 9.06541L1174.99 9.22827C1175.02 9.66978 1175.03 10.2565 1175.03 11.2H1177.03ZM1177.03 12.8V11.2H1175.03V12.8H1177.03ZM1176.98 14.9346C1177.03 14.3926 1177.03 13.7097 1177.03 12.8H1175.03C1175.03 13.7435 1175.02 14.3302 1174.99 14.7717L1176.98 14.9346ZM1176.67 16.2255C1176.85 15.8776 1176.94 15.4761 1176.98 14.9346L1174.99 14.7717C1174.95 15.1904 1174.9 15.2991 1174.89 15.3175L1176.67 16.2255ZM1175.25 17.6458C1175.86 17.3342 1176.36 16.837 1176.67 16.2255L1174.89 15.3175C1174.77 15.5527 1174.58 15.7439 1174.34 15.8638L1175.25 17.6458ZM1173.96 17.9557C1174.5 17.9115 1174.9 17.823 1175.25 17.6458L1174.34 15.8638C1174.33 15.8732 1174.22 15.9282 1173.8 15.9624L1173.96 17.9557ZM1171.83 18C1172.74 18 1173.42 18 1173.96 17.9557L1173.8 15.9624C1173.36 15.9984 1172.77 16 1171.83 16V18ZM1158.23 18H1171.83V16H1158.23V18ZM1156.09 17.9557C1156.63 18 1157.32 18 1158.23 18V16C1157.28 16 1156.7 15.9984 1156.25 15.9624L1156.09 17.9557ZM1154.8 17.6458C1155.15 17.823 1155.55 17.9115 1156.09 17.9557L1156.25 15.9624C1155.84 15.9282 1155.73 15.8732 1155.71 15.8638L1154.8 17.6458ZM1153.38 16.2255C1153.69 16.837 1154.19 17.3342 1154.8 17.6458L1155.71 15.8638C1155.47 15.7439 1155.28 15.5527 1155.16 15.3175L1153.38 16.2255ZM1153.07 14.9346C1153.12 15.4761 1153.2 15.8776 1153.38 16.2255L1155.16 15.3175C1155.15 15.2991 1155.1 15.1904 1155.06 14.7717L1153.07 14.9346ZM1153.03 12.8C1153.03 13.7097 1153.03 14.3926 1153.07 14.9346L1155.06 14.7717C1155.03 14.3302 1155.03 13.7435 1155.03 12.8H1153.03ZM1153.03 11.2V12.8H1155.03V11.2H1153.03ZM1153.07 9.06541C1153.03 9.60745 1153.03 10.2903 1153.03 11.2H1155.03C1155.03 10.2565 1155.03 9.66978 1155.06 9.22827L1153.07 9.06541ZM1153.38 7.77453C1153.2 8.12237 1153.12 8.52388 1153.07 9.06541L1155.06 9.22827C1155.1 8.80959 1155.15 8.70095 1155.16 8.68251L1153.38 7.77453ZM1154.8 6.35423C1154.19 6.66582 1153.69 7.163 1153.38 7.77453L1155.16 8.68251C1155.28 8.44731 1155.47 8.25608 1155.71 8.13624L1154.8 6.35423ZM1156.09 6.04428C1155.55 6.08852 1155.15 6.17699 1154.8 6.35423L1155.71 8.13624C1155.73 8.12685 1155.84 8.07184 1156.25 8.03764L1156.09 6.04428ZM1158.23 6C1157.32 6 1156.63 5.99999 1156.09 6.04428L1156.25 8.03764C1156.7 8.00156 1157.28 8 1158.23 8V6ZM1152.49 7.32054C1152.23 7.83261 1152.12 8.38019 1152.07 8.98397C1152.03 9.57609 1152.03 10.3064 1152.03 11.2H1154.03C1154.03 10.2734 1154.03 9.63862 1154.07 9.14684C1154.11 8.66673 1154.18 8.41166 1154.27 8.22852L1152.49 7.32054ZM1154.35 5.46322C1153.55 5.87068 1152.9 6.52085 1152.49 7.32054L1154.27 8.22852C1154.49 7.80516 1154.83 7.46095 1155.26 7.24524L1154.35 5.46322ZM1158.23 5C1157.33 5 1156.6 4.99922 1156.01 5.0476C1155.41 5.09693 1154.86 5.20231 1154.35 5.46322L1155.26 7.24524C1155.44 7.15192 1155.69 7.08018 1156.17 7.04096C1156.67 7.00078 1157.3 7 1158.23 7V5ZM1171.83 5H1158.23V7H1171.83V5ZM1175.71 5.46322C1175.19 5.20231 1174.65 5.09693 1174.04 5.0476C1173.45 4.99922 1172.72 5 1171.83 5V7C1172.75 7 1173.39 7.00078 1173.88 7.04096C1174.36 7.08018 1174.61 7.15192 1174.8 7.24524L1175.71 5.46322ZM1177.56 7.32054C1177.16 6.52085 1176.51 5.87068 1175.71 5.46322L1174.8 7.24524C1175.22 7.46095 1175.57 7.80516 1175.78 8.22852L1177.56 7.32054ZM1178.03 11.2C1178.03 10.3064 1178.03 9.57609 1177.98 8.98397C1177.93 8.38019 1177.82 7.83261 1177.56 7.32054L1175.78 8.22852C1175.87 8.41166 1175.95 8.66673 1175.99 9.14684C1176.03 9.63862 1176.03 10.2734 1176.03 11.2H1178.03ZM1178.03 12.8V11.2H1176.03V12.8H1178.03ZM1177.56 16.6795C1177.82 16.1674 1177.93 15.6198 1177.98 15.016C1178.03 14.4239 1178.03 13.6936 1178.03 12.8H1176.03C1176.03 13.7266 1176.03 14.3614 1175.99 14.8532C1175.95 15.3333 1175.87 15.5883 1175.78 15.7715L1177.56 16.6795ZM1175.71 18.5368C1176.51 18.1293 1177.16 17.4791 1177.56 16.6795L1175.78 15.7715C1175.57 16.1948 1175.22 16.539 1174.8 16.7548L1175.71 18.5368ZM1171.83 19C1172.72 19 1173.45 19.0008 1174.04 18.9524C1174.65 18.9031 1175.19 18.7977 1175.71 18.5368L1174.8 16.7548C1174.61 16.8481 1174.36 16.9198 1173.88 16.959C1173.39 16.9992 1172.75 17 1171.83 17V19ZM1158.23 19H1171.83V17H1158.23V19ZM1154.35 18.5368C1154.86 18.7977 1155.41 18.9031 1156.01 18.9524C1156.6 19.0008 1157.33 19 1158.23 19V17C1157.3 17 1156.67 16.9992 1156.17 16.959C1155.69 16.9198 1155.44 16.8481 1155.26 16.7548L1154.35 18.5368ZM1152.49 16.6795C1152.9 17.4791 1153.55 18.1293 1154.35 18.5368L1155.26 16.7548C1154.83 16.539 1154.49 16.1948 1154.27 15.7715L1152.49 16.6795ZM1152.03 12.8C1152.03 13.6936 1152.03 14.4239 1152.07 15.016C1152.12 15.6198 1152.23 16.1674 1152.49 16.6795L1154.27 15.7715C1154.18 15.5883 1154.11 15.3333 1154.07 14.8532C1154.03 14.3614 1154.03 13.7266 1154.03 12.8H1152.03ZM1152.03 11.2V12.8H1154.03V11.2H1152.03ZM1177.78 11.0314C1178.21 11.1425 1178.53 11.5354 1178.53 12H1180.53C1180.53 10.6007 1179.57 9.42755 1178.28 9.09457L1177.78 11.0314ZM1179.03 13.937V10.063H1177.03V13.937H1179.03ZM1178.53 12C1178.53 12.4646 1178.21 12.8575 1177.78 12.9686L1178.28 14.9054C1179.57 14.5725 1180.53 13.3993 1180.53 12H1178.53Z"
                              :fill="proto.systemColor" mask="url(#path-6-inside-1_1_400)"></path>
                          </g>
                          <rect x="1155.03" y="8" width="20" height="8" rx="1.5" :fill="proto.systemColor"></rect>
                        </svg>
                      </div>

                      <template v-if="proto.screenType == 'desktopScreen'">
                        <svg style="position: absolute;top: 0px;left: 0px;" width="100%" height="100%"
                          :viewBox="proto.vertical ? '0 0 834 1194' : '0 0 1194 834'" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_3_3531)">
                            <g filter="url(#filter0_b_3_3531)"
                              :transform="proto.vertical ? 'translate(-180, 360)' : ''">
                              <rect x="310.5" y="721" width="574" height="94" rx="31" fill="#F5F5F5"
                                fill-opacity="0.44">
                              </rect>
                            </g>
                            <path
                              d="M125.465 150V141.545H130.598V142.494H126.52V145.4H130.264V146.338H126.52V150H125.465ZM133.527 150.111C133.129 150.111 132.77 150.035 132.449 149.883C132.133 149.73 131.881 149.514 131.693 149.232C131.51 148.951 131.418 148.619 131.418 148.236V148.225C131.418 147.85 131.508 147.529 131.688 147.264C131.867 146.994 132.129 146.783 132.473 146.631C132.816 146.479 133.232 146.389 133.721 146.361L136.041 146.221V147.035L133.844 147.176C133.363 147.203 133.012 147.303 132.789 147.475C132.57 147.646 132.461 147.889 132.461 148.201V148.213C132.461 148.533 132.582 148.783 132.824 148.963C133.066 149.139 133.371 149.227 133.738 149.227C134.086 149.227 134.395 149.158 134.664 149.021C134.934 148.881 135.145 148.691 135.297 148.453C135.453 148.215 135.531 147.945 135.531 147.645V145.676C135.531 145.285 135.412 144.988 135.174 144.785C134.939 144.578 134.586 144.475 134.113 144.475C133.734 144.475 133.424 144.543 133.182 144.68C132.939 144.812 132.777 145.002 132.695 145.248L132.689 145.266H131.67L131.676 145.23C131.73 144.898 131.867 144.609 132.086 144.363C132.309 144.113 132.596 143.92 132.947 143.783C133.299 143.643 133.699 143.572 134.148 143.572C134.664 143.572 135.1 143.656 135.455 143.824C135.814 143.992 136.086 144.234 136.27 144.551C136.457 144.863 136.551 145.238 136.551 145.676V150H135.531V149.068H135.438C135.305 149.291 135.143 149.48 134.951 149.637C134.764 149.793 134.551 149.912 134.312 149.994C134.074 150.072 133.812 150.111 133.527 150.111ZM140.998 150.111C140.408 150.111 139.896 149.977 139.463 149.707C139.029 149.438 138.693 149.057 138.455 148.564C138.217 148.072 138.098 147.492 138.098 146.824V146.812C138.098 146.156 138.215 145.586 138.449 145.102C138.688 144.617 139.023 144.242 139.457 143.977C139.891 143.707 140.402 143.572 140.992 143.572C141.504 143.572 141.945 143.662 142.316 143.842C142.688 144.021 142.984 144.264 143.207 144.568C143.43 144.869 143.572 145.207 143.635 145.582L143.641 145.617H142.627L142.621 145.6C142.543 145.287 142.365 145.021 142.088 144.803C141.811 144.584 141.445 144.475 140.992 144.475C140.613 144.475 140.285 144.57 140.008 144.762C139.73 144.953 139.516 145.225 139.363 145.576C139.215 145.924 139.141 146.336 139.141 146.812V146.824C139.141 147.309 139.217 147.73 139.369 148.09C139.521 148.445 139.736 148.721 140.014 148.916C140.291 149.111 140.617 149.209 140.992 149.209C141.418 149.209 141.766 149.117 142.035 148.934C142.305 148.75 142.498 148.482 142.615 148.131L142.627 148.096L143.635 148.09L143.623 148.154C143.537 148.533 143.385 148.871 143.166 149.168C142.947 149.461 142.658 149.691 142.299 149.859C141.939 150.027 141.506 150.111 140.998 150.111ZM147.707 150.111C147.105 150.111 146.588 149.979 146.154 149.713C145.725 149.447 145.393 149.072 145.158 148.588C144.928 148.1 144.812 147.525 144.812 146.865V146.859C144.812 146.207 144.928 145.635 145.158 145.143C145.393 144.65 145.723 144.266 146.148 143.988C146.574 143.711 147.072 143.572 147.643 143.572C148.217 143.572 148.709 143.705 149.119 143.971C149.533 144.236 149.85 144.607 150.068 145.084C150.291 145.557 150.402 146.107 150.402 146.736V147.135H145.34V146.32H149.881L149.377 147.064V146.66C149.377 146.164 149.303 145.756 149.154 145.436C149.006 145.115 148.801 144.877 148.539 144.721C148.277 144.561 147.977 144.48 147.637 144.48C147.297 144.48 146.992 144.564 146.723 144.732C146.457 144.896 146.246 145.141 146.09 145.465C145.934 145.789 145.855 146.188 145.855 146.66V147.064C145.855 147.514 145.932 147.898 146.084 148.219C146.236 148.535 146.453 148.779 146.734 148.951C147.016 149.119 147.348 149.203 147.73 149.203C148.016 149.203 148.264 149.164 148.475 149.086C148.686 149.008 148.859 148.908 148.996 148.787C149.133 148.666 149.229 148.543 149.283 148.418L149.307 148.365H150.326L150.314 148.412C150.26 148.627 150.162 148.836 150.021 149.039C149.885 149.238 149.707 149.42 149.488 149.584C149.27 149.744 149.01 149.873 148.709 149.971C148.412 150.064 148.078 150.111 147.707 150.111ZM153.139 150V142.494H150.414V141.545H156.918V142.494H154.193V150H153.139ZM158.324 150V143.684H159.344V150H158.324ZM158.84 142.465C158.648 142.465 158.482 142.396 158.342 142.26C158.205 142.119 158.137 141.953 158.137 141.762C158.137 141.566 158.205 141.4 158.342 141.264C158.482 141.127 158.648 141.059 158.84 141.059C159.035 141.059 159.201 141.127 159.338 141.264C159.475 141.4 159.543 141.566 159.543 141.762C159.543 141.953 159.475 142.119 159.338 142.26C159.201 142.396 159.035 142.465 158.84 142.465ZM161.266 150V143.684H162.285V144.645H162.379C162.52 144.305 162.734 144.041 163.023 143.854C163.316 143.666 163.67 143.572 164.084 143.572C164.369 143.572 164.625 143.619 164.852 143.713C165.078 143.807 165.273 143.938 165.438 144.105C165.602 144.27 165.732 144.461 165.83 144.68H165.924C166.037 144.457 166.189 144.264 166.381 144.1C166.572 143.932 166.793 143.803 167.043 143.713C167.297 143.619 167.568 143.572 167.857 143.572C168.287 143.572 168.65 143.652 168.947 143.812C169.248 143.973 169.477 144.207 169.633 144.516C169.789 144.82 169.867 145.193 169.867 145.635V150H168.848V145.869C168.848 145.557 168.799 145.299 168.701 145.096C168.607 144.889 168.463 144.734 168.268 144.633C168.072 144.527 167.826 144.475 167.529 144.475C167.236 144.475 166.98 144.541 166.762 144.674C166.543 144.807 166.373 144.984 166.252 145.207C166.131 145.426 166.07 145.67 166.07 145.939V150H165.051V145.711C165.051 145.461 164.996 145.244 164.887 145.061C164.781 144.873 164.629 144.729 164.43 144.627C164.234 144.525 164.004 144.475 163.738 144.475C163.465 144.475 163.217 144.547 162.994 144.691C162.775 144.836 162.602 145.031 162.473 145.277C162.348 145.52 162.285 145.789 162.285 146.086V150H161.266ZM174.285 150.111C173.684 150.111 173.166 149.979 172.732 149.713C172.303 149.447 171.971 149.072 171.736 148.588C171.506 148.1 171.391 147.525 171.391 146.865V146.859C171.391 146.207 171.506 145.635 171.736 145.143C171.971 144.65 172.301 144.266 172.727 143.988C173.152 143.711 173.65 143.572 174.221 143.572C174.795 143.572 175.287 143.705 175.697 143.971C176.111 144.236 176.428 144.607 176.646 145.084C176.869 145.557 176.98 146.107 176.98 146.736V147.135H171.918V146.32H176.459L175.955 147.064V146.66C175.955 146.164 175.881 145.756 175.732 145.436C175.584 145.115 175.379 144.877 175.117 144.721C174.855 144.561 174.555 144.48 174.215 144.48C173.875 144.48 173.57 144.564 173.301 144.732C173.035 144.896 172.824 145.141 172.668 145.465C172.512 145.789 172.434 146.188 172.434 146.66V147.064C172.434 147.514 172.51 147.898 172.662 148.219C172.814 148.535 173.031 148.779 173.312 148.951C173.594 149.119 173.926 149.203 174.309 149.203C174.594 149.203 174.842 149.164 175.053 149.086C175.264 149.008 175.438 148.908 175.574 148.787C175.711 148.666 175.807 148.543 175.861 148.418L175.885 148.365H176.904L176.893 148.412C176.838 148.627 176.74 148.836 176.6 149.039C176.463 149.238 176.285 149.42 176.066 149.584C175.848 149.744 175.588 149.873 175.287 149.971C174.99 150.064 174.656 150.111 174.285 150.111Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M309.146 150.199C308.381 150.199 307.719 150.02 307.16 149.66C306.602 149.301 306.17 148.791 305.865 148.131C305.564 147.471 305.414 146.688 305.414 145.781V145.77C305.414 144.859 305.564 144.074 305.865 143.414C306.17 142.754 306.6 142.244 307.154 141.885C307.713 141.525 308.375 141.346 309.141 141.346C309.734 141.346 310.273 141.463 310.758 141.697C311.246 141.928 311.648 142.25 311.965 142.664C312.281 143.074 312.48 143.549 312.562 144.088L312.557 144.1H311.496L311.49 144.088C311.396 143.725 311.238 143.412 311.016 143.15C310.793 142.885 310.521 142.68 310.201 142.535C309.885 142.391 309.531 142.318 309.141 142.318C308.602 142.318 308.133 142.459 307.734 142.74C307.34 143.021 307.035 143.42 306.82 143.936C306.605 144.451 306.498 145.062 306.498 145.77V145.781C306.498 146.484 306.605 147.094 306.82 147.609C307.035 148.125 307.34 148.523 307.734 148.805C308.133 149.086 308.604 149.227 309.146 149.227C309.541 149.227 309.898 149.164 310.219 149.039C310.539 148.91 310.809 148.729 311.027 148.494C311.246 148.256 311.398 147.975 311.484 147.65L311.496 147.639H312.562V147.65C312.469 148.166 312.266 148.615 311.953 148.998C311.641 149.377 311.244 149.672 310.764 149.883C310.287 150.094 309.748 150.199 309.146 150.199ZM315.938 150.111C315.539 150.111 315.18 150.035 314.859 149.883C314.543 149.73 314.291 149.514 314.104 149.232C313.92 148.951 313.828 148.619 313.828 148.236V148.225C313.828 147.85 313.918 147.529 314.098 147.264C314.277 146.994 314.539 146.783 314.883 146.631C315.227 146.479 315.643 146.389 316.131 146.361L318.451 146.221V147.035L316.254 147.176C315.773 147.203 315.422 147.303 315.199 147.475C314.98 147.646 314.871 147.889 314.871 148.201V148.213C314.871 148.533 314.992 148.783 315.234 148.963C315.477 149.139 315.781 149.227 316.148 149.227C316.496 149.227 316.805 149.158 317.074 149.021C317.344 148.881 317.555 148.691 317.707 148.453C317.863 148.215 317.941 147.945 317.941 147.645V145.676C317.941 145.285 317.822 144.988 317.584 144.785C317.35 144.578 316.996 144.475 316.523 144.475C316.145 144.475 315.834 144.543 315.592 144.68C315.35 144.812 315.188 145.002 315.105 145.248L315.1 145.266H314.08L314.086 145.23C314.141 144.898 314.277 144.609 314.496 144.363C314.719 144.113 315.006 143.92 315.357 143.783C315.709 143.643 316.109 143.572 316.559 143.572C317.074 143.572 317.51 143.656 317.865 143.824C318.225 143.992 318.496 144.234 318.68 144.551C318.867 144.863 318.961 145.238 318.961 145.676V150H317.941V149.068H317.848C317.715 149.291 317.553 149.48 317.361 149.637C317.174 149.793 316.961 149.912 316.723 149.994C316.484 150.072 316.223 150.111 315.938 150.111ZM320.883 150V141.176H321.902V150H320.883ZM326.438 150.111C325.836 150.111 325.318 149.979 324.885 149.713C324.455 149.447 324.123 149.072 323.889 148.588C323.658 148.1 323.543 147.525 323.543 146.865V146.859C323.543 146.207 323.658 145.635 323.889 145.143C324.123 144.65 324.453 144.266 324.879 143.988C325.305 143.711 325.803 143.572 326.373 143.572C326.947 143.572 327.439 143.705 327.85 143.971C328.264 144.236 328.58 144.607 328.799 145.084C329.021 145.557 329.133 146.107 329.133 146.736V147.135H324.07V146.32H328.611L328.107 147.064V146.66C328.107 146.164 328.033 145.756 327.885 145.436C327.736 145.115 327.531 144.877 327.27 144.721C327.008 144.561 326.707 144.48 326.367 144.48C326.027 144.48 325.723 144.564 325.453 144.732C325.188 144.896 324.977 145.141 324.82 145.465C324.664 145.789 324.586 146.188 324.586 146.66V147.064C324.586 147.514 324.662 147.898 324.814 148.219C324.967 148.535 325.184 148.779 325.465 148.951C325.746 149.119 326.078 149.203 326.461 149.203C326.746 149.203 326.994 149.164 327.205 149.086C327.416 149.008 327.59 148.908 327.727 148.787C327.863 148.666 327.959 148.543 328.014 148.418L328.037 148.365H329.057L329.045 148.412C328.99 148.627 328.893 148.836 328.752 149.039C328.615 149.238 328.438 149.42 328.219 149.584C328 149.744 327.74 149.873 327.439 149.971C327.143 150.064 326.809 150.111 326.438 150.111ZM330.715 150V143.684H331.734V144.633H331.828C331.988 144.297 332.219 144.037 332.52 143.854C332.82 143.666 333.203 143.572 333.668 143.572C334.379 143.572 334.924 143.775 335.303 144.182C335.686 144.584 335.877 145.16 335.877 145.91V150H334.857V146.156C334.857 145.586 334.736 145.164 334.494 144.891C334.256 144.613 333.885 144.475 333.381 144.475C333.045 144.475 332.754 144.547 332.508 144.691C332.262 144.836 332.07 145.041 331.934 145.307C331.801 145.572 331.734 145.891 331.734 146.262V150H330.715ZM340.055 150.111C339.523 150.111 339.059 149.977 338.66 149.707C338.262 149.438 337.953 149.059 337.734 148.57C337.516 148.078 337.406 147.504 337.406 146.848V146.836C337.406 146.176 337.516 145.602 337.734 145.113C337.953 144.625 338.26 144.246 338.654 143.977C339.053 143.707 339.52 143.572 340.055 143.572C340.344 143.572 340.615 143.619 340.869 143.713C341.127 143.803 341.355 143.93 341.555 144.094C341.754 144.258 341.91 144.453 342.023 144.68H342.117V141.176H343.137V150H342.117V148.992H342.023C341.895 149.227 341.732 149.428 341.537 149.596C341.342 149.76 341.119 149.887 340.869 149.977C340.619 150.066 340.348 150.111 340.055 150.111ZM340.289 149.209C340.672 149.209 341.002 149.113 341.279 148.922C341.557 148.73 341.77 148.459 341.918 148.107C342.066 147.752 342.141 147.332 342.141 146.848V146.836C342.141 146.348 342.066 145.928 341.918 145.576C341.77 145.225 341.557 144.953 341.279 144.762C341.002 144.57 340.672 144.475 340.289 144.475C339.906 144.475 339.576 144.57 339.299 144.762C339.025 144.949 338.814 145.219 338.666 145.57C338.521 145.922 338.449 146.344 338.449 146.836V146.848C338.449 147.336 338.521 147.758 338.666 148.113C338.814 148.465 339.025 148.736 339.299 148.928C339.576 149.115 339.906 149.209 340.289 149.209ZM346.828 150.111C346.43 150.111 346.07 150.035 345.75 149.883C345.434 149.73 345.182 149.514 344.994 149.232C344.811 148.951 344.719 148.619 344.719 148.236V148.225C344.719 147.85 344.809 147.529 344.988 147.264C345.168 146.994 345.43 146.783 345.773 146.631C346.117 146.479 346.533 146.389 347.021 146.361L349.342 146.221V147.035L347.145 147.176C346.664 147.203 346.312 147.303 346.09 147.475C345.871 147.646 345.762 147.889 345.762 148.201V148.213C345.762 148.533 345.883 148.783 346.125 148.963C346.367 149.139 346.672 149.227 347.039 149.227C347.387 149.227 347.695 149.158 347.965 149.021C348.234 148.881 348.445 148.691 348.598 148.453C348.754 148.215 348.832 147.945 348.832 147.645V145.676C348.832 145.285 348.713 144.988 348.475 144.785C348.24 144.578 347.887 144.475 347.414 144.475C347.035 144.475 346.725 144.543 346.482 144.68C346.24 144.812 346.078 145.002 345.996 145.248L345.99 145.266H344.971L344.977 145.23C345.031 144.898 345.168 144.609 345.387 144.363C345.609 144.113 345.896 143.92 346.248 143.783C346.6 143.643 347 143.572 347.449 143.572C347.965 143.572 348.4 143.656 348.756 143.824C349.115 143.992 349.387 144.234 349.57 144.551C349.758 144.863 349.852 145.238 349.852 145.676V150H348.832V149.068H348.738C348.605 149.291 348.443 149.48 348.252 149.637C348.064 149.793 347.852 149.912 347.613 149.994C347.375 150.072 347.113 150.111 346.828 150.111ZM351.715 150V143.684H352.734V144.621H352.828C352.949 144.289 353.154 144.031 353.443 143.848C353.732 143.664 354.09 143.572 354.516 143.572C354.613 143.572 354.709 143.578 354.803 143.59C354.9 143.598 354.975 143.605 355.025 143.613V144.604C354.92 144.584 354.816 144.57 354.715 144.562C354.617 144.551 354.512 144.545 354.398 144.545C354.074 144.545 353.787 144.609 353.537 144.738C353.287 144.867 353.09 145.047 352.945 145.277C352.805 145.508 352.734 145.777 352.734 146.086V150H351.715Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M497.51 150.199C496.744 150.199 496.082 150.02 495.523 149.66C494.965 149.301 494.533 148.791 494.229 148.131C493.928 147.471 493.777 146.688 493.777 145.781V145.77C493.777 144.859 493.928 144.074 494.229 143.414C494.533 142.754 494.963 142.244 495.518 141.885C496.076 141.525 496.738 141.346 497.504 141.346C498.098 141.346 498.637 141.463 499.121 141.697C499.609 141.928 500.012 142.25 500.328 142.664C500.645 143.074 500.844 143.549 500.926 144.088L500.92 144.1H499.859L499.854 144.088C499.76 143.725 499.602 143.412 499.379 143.15C499.156 142.885 498.885 142.68 498.564 142.535C498.248 142.391 497.895 142.318 497.504 142.318C496.965 142.318 496.496 142.459 496.098 142.74C495.703 143.021 495.398 143.42 495.184 143.936C494.969 144.451 494.861 145.062 494.861 145.77V145.781C494.861 146.484 494.969 147.094 495.184 147.609C495.398 148.125 495.703 148.523 496.098 148.805C496.496 149.086 496.967 149.227 497.51 149.227C497.904 149.227 498.262 149.164 498.582 149.039C498.902 148.91 499.172 148.729 499.391 148.494C499.609 148.256 499.762 147.975 499.848 147.65L499.859 147.639H500.926V147.65C500.832 148.166 500.629 148.615 500.316 148.998C500.004 149.377 499.607 149.672 499.127 149.883C498.65 150.094 498.111 150.199 497.51 150.199ZM502.625 150V141.176H503.645V150H502.625ZM508.197 150.111C507.6 150.111 507.082 149.98 506.645 149.719C506.211 149.453 505.875 149.076 505.637 148.588C505.402 148.1 505.285 147.52 505.285 146.848V146.836C505.285 146.16 505.402 145.578 505.637 145.09C505.875 144.602 506.211 144.227 506.645 143.965C507.082 143.703 507.6 143.572 508.197 143.572C508.799 143.572 509.316 143.703 509.75 143.965C510.184 144.227 510.518 144.602 510.752 145.09C510.99 145.578 511.109 146.16 511.109 146.836V146.848C511.109 147.52 510.99 148.1 510.752 148.588C510.518 149.076 510.184 149.453 509.75 149.719C509.316 149.98 508.799 150.111 508.197 150.111ZM508.197 149.209C508.596 149.209 508.934 149.115 509.211 148.928C509.488 148.74 509.699 148.471 509.844 148.119C509.992 147.768 510.066 147.344 510.066 146.848V146.836C510.066 146.336 509.992 145.91 509.844 145.559C509.699 145.207 509.488 144.939 509.211 144.756C508.934 144.568 508.596 144.475 508.197 144.475C507.799 144.475 507.461 144.568 507.184 144.756C506.906 144.939 506.693 145.207 506.545 145.559C506.4 145.91 506.328 146.336 506.328 146.836V146.848C506.328 147.344 506.4 147.768 506.545 148.119C506.693 148.471 506.906 148.74 507.184 148.928C507.461 149.115 507.799 149.209 508.197 149.209ZM515.275 150.111C514.686 150.111 514.174 149.977 513.74 149.707C513.307 149.438 512.971 149.057 512.732 148.564C512.494 148.072 512.375 147.492 512.375 146.824V146.812C512.375 146.156 512.492 145.586 512.727 145.102C512.965 144.617 513.301 144.242 513.734 143.977C514.168 143.707 514.68 143.572 515.27 143.572C515.781 143.572 516.223 143.662 516.594 143.842C516.965 144.021 517.262 144.264 517.484 144.568C517.707 144.869 517.85 145.207 517.912 145.582L517.918 145.617H516.904L516.898 145.6C516.82 145.287 516.643 145.021 516.365 144.803C516.088 144.584 515.723 144.475 515.27 144.475C514.891 144.475 514.562 144.57 514.285 144.762C514.008 144.953 513.793 145.225 513.641 145.576C513.492 145.924 513.418 146.336 513.418 146.812V146.824C513.418 147.309 513.494 147.73 513.646 148.09C513.799 148.445 514.014 148.721 514.291 148.916C514.568 149.111 514.895 149.209 515.27 149.209C515.695 149.209 516.043 149.117 516.312 148.934C516.582 148.75 516.775 148.482 516.893 148.131L516.904 148.096L517.912 148.09L517.9 148.154C517.814 148.533 517.662 148.871 517.443 149.168C517.225 149.461 516.936 149.691 516.576 149.859C516.217 150.027 515.783 150.111 515.275 150.111ZM519.465 150V141.176H520.484V150H519.465ZM523.443 150L520.977 146.906L521.727 146.256L524.727 150H523.443ZM520.355 147.727L520.309 146.443H520.578L523.309 143.684H524.545L521.545 146.578L521.299 146.818L520.355 147.727Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M672.432 150V141.545H673.486V145.201H678.127V141.545H679.182V150H678.127V146.15H673.486V150H672.432ZM683.805 150.111C683.207 150.111 682.689 149.98 682.252 149.719C681.818 149.453 681.482 149.076 681.244 148.588C681.01 148.1 680.893 147.52 680.893 146.848V146.836C680.893 146.16 681.01 145.578 681.244 145.09C681.482 144.602 681.818 144.227 682.252 143.965C682.689 143.703 683.207 143.572 683.805 143.572C684.406 143.572 684.924 143.703 685.357 143.965C685.791 144.227 686.125 144.602 686.359 145.09C686.598 145.578 686.717 146.16 686.717 146.836V146.848C686.717 147.52 686.598 148.1 686.359 148.588C686.125 149.076 685.791 149.453 685.357 149.719C684.924 149.98 684.406 150.111 683.805 150.111ZM683.805 149.209C684.203 149.209 684.541 149.115 684.818 148.928C685.096 148.74 685.307 148.471 685.451 148.119C685.6 147.768 685.674 147.344 685.674 146.848V146.836C685.674 146.336 685.6 145.91 685.451 145.559C685.307 145.207 685.096 144.939 684.818 144.756C684.541 144.568 684.203 144.475 683.805 144.475C683.406 144.475 683.068 144.568 682.791 144.756C682.514 144.939 682.301 145.207 682.152 145.559C682.008 145.91 681.936 146.336 681.936 146.836V146.848C681.936 147.344 682.008 147.768 682.152 148.119C682.301 148.471 682.514 148.74 682.791 148.928C683.068 149.115 683.406 149.209 683.805 149.209ZM688.299 150V143.684H689.318V144.645H689.412C689.553 144.305 689.768 144.041 690.057 143.854C690.35 143.666 690.703 143.572 691.117 143.572C691.402 143.572 691.658 143.619 691.885 143.713C692.111 143.807 692.307 143.938 692.471 144.105C692.635 144.27 692.766 144.461 692.863 144.68H692.957C693.07 144.457 693.223 144.264 693.414 144.1C693.605 143.932 693.826 143.803 694.076 143.713C694.33 143.619 694.602 143.572 694.891 143.572C695.32 143.572 695.684 143.652 695.98 143.812C696.281 143.973 696.51 144.207 696.666 144.516C696.822 144.82 696.9 145.193 696.9 145.635V150H695.881V145.869C695.881 145.557 695.832 145.299 695.734 145.096C695.641 144.889 695.496 144.734 695.301 144.633C695.105 144.527 694.859 144.475 694.562 144.475C694.27 144.475 694.014 144.541 693.795 144.674C693.576 144.807 693.406 144.984 693.285 145.207C693.164 145.426 693.104 145.67 693.104 145.939V150H692.084V145.711C692.084 145.461 692.029 145.244 691.92 145.061C691.814 144.873 691.662 144.729 691.463 144.627C691.268 144.525 691.037 144.475 690.771 144.475C690.498 144.475 690.25 144.547 690.027 144.691C689.809 144.836 689.635 145.031 689.506 145.277C689.381 145.52 689.318 145.789 689.318 146.086V150H688.299ZM701.318 150.111C700.717 150.111 700.199 149.979 699.766 149.713C699.336 149.447 699.004 149.072 698.77 148.588C698.539 148.1 698.424 147.525 698.424 146.865V146.859C698.424 146.207 698.539 145.635 698.77 145.143C699.004 144.65 699.334 144.266 699.76 143.988C700.186 143.711 700.684 143.572 701.254 143.572C701.828 143.572 702.32 143.705 702.73 143.971C703.145 144.236 703.461 144.607 703.68 145.084C703.902 145.557 704.014 146.107 704.014 146.736V147.135H698.951V146.32H703.492L702.988 147.064V146.66C702.988 146.164 702.914 145.756 702.766 145.436C702.617 145.115 702.412 144.877 702.15 144.721C701.889 144.561 701.588 144.48 701.248 144.48C700.908 144.48 700.604 144.564 700.334 144.732C700.068 144.896 699.857 145.141 699.701 145.465C699.545 145.789 699.467 146.188 699.467 146.66V147.064C699.467 147.514 699.543 147.898 699.695 148.219C699.848 148.535 700.064 148.779 700.346 148.951C700.627 149.119 700.959 149.203 701.342 149.203C701.627 149.203 701.875 149.164 702.086 149.086C702.297 149.008 702.471 148.908 702.607 148.787C702.744 148.666 702.84 148.543 702.895 148.418L702.918 148.365H703.938L703.926 148.412C703.871 148.627 703.773 148.836 703.633 149.039C703.496 149.238 703.318 149.42 703.1 149.584C702.881 149.744 702.621 149.873 702.32 149.971C702.023 150.064 701.689 150.111 701.318 150.111Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M849.633 150.199C848.867 150.199 848.205 150.02 847.646 149.66C847.088 149.301 846.656 148.791 846.352 148.131C846.051 147.471 845.9 146.688 845.9 145.781V145.77C845.9 144.859 846.051 144.074 846.352 143.414C846.656 142.754 847.086 142.244 847.641 141.885C848.199 141.525 848.861 141.346 849.627 141.346C850.221 141.346 850.76 141.463 851.244 141.697C851.732 141.928 852.135 142.25 852.451 142.664C852.768 143.074 852.967 143.549 853.049 144.088L853.043 144.1H851.982L851.977 144.088C851.883 143.725 851.725 143.412 851.502 143.15C851.279 142.885 851.008 142.68 850.688 142.535C850.371 142.391 850.018 142.318 849.627 142.318C849.088 142.318 848.619 142.459 848.221 142.74C847.826 143.021 847.521 143.42 847.307 143.936C847.092 144.451 846.984 145.062 846.984 145.77V145.781C846.984 146.484 847.092 147.094 847.307 147.609C847.521 148.125 847.826 148.523 848.221 148.805C848.619 149.086 849.09 149.227 849.633 149.227C850.027 149.227 850.385 149.164 850.705 149.039C851.025 148.91 851.295 148.729 851.514 148.494C851.732 148.256 851.885 147.975 851.971 147.65L851.982 147.639H853.049V147.65C852.955 148.166 852.752 148.615 852.439 148.998C852.127 149.377 851.73 149.672 851.25 149.883C850.773 150.094 850.234 150.199 849.633 150.199ZM856.424 150.111C856.025 150.111 855.666 150.035 855.346 149.883C855.029 149.73 854.777 149.514 854.59 149.232C854.406 148.951 854.314 148.619 854.314 148.236V148.225C854.314 147.85 854.404 147.529 854.584 147.264C854.764 146.994 855.025 146.783 855.369 146.631C855.713 146.479 856.129 146.389 856.617 146.361L858.938 146.221V147.035L856.74 147.176C856.26 147.203 855.908 147.303 855.686 147.475C855.467 147.646 855.357 147.889 855.357 148.201V148.213C855.357 148.533 855.479 148.783 855.721 148.963C855.963 149.139 856.268 149.227 856.635 149.227C856.982 149.227 857.291 149.158 857.561 149.021C857.83 148.881 858.041 148.691 858.193 148.453C858.35 148.215 858.428 147.945 858.428 147.645V145.676C858.428 145.285 858.309 144.988 858.07 144.785C857.836 144.578 857.482 144.475 857.01 144.475C856.631 144.475 856.32 144.543 856.078 144.68C855.836 144.812 855.674 145.002 855.592 145.248L855.586 145.266H854.566L854.572 145.23C854.627 144.898 854.764 144.609 854.982 144.363C855.205 144.113 855.492 143.92 855.844 143.783C856.195 143.643 856.596 143.572 857.045 143.572C857.561 143.572 857.996 143.656 858.352 143.824C858.711 143.992 858.982 144.234 859.166 144.551C859.354 144.863 859.447 145.238 859.447 145.676V150H858.428V149.068H858.334C858.201 149.291 858.039 149.48 857.848 149.637C857.66 149.793 857.447 149.912 857.209 149.994C856.971 150.072 856.709 150.111 856.424 150.111ZM861.311 150V143.684H862.33V144.645H862.424C862.564 144.305 862.779 144.041 863.068 143.854C863.361 143.666 863.715 143.572 864.129 143.572C864.414 143.572 864.67 143.619 864.896 143.713C865.123 143.807 865.318 143.938 865.482 144.105C865.646 144.27 865.777 144.461 865.875 144.68H865.969C866.082 144.457 866.234 144.264 866.426 144.1C866.617 143.932 866.838 143.803 867.088 143.713C867.342 143.619 867.613 143.572 867.902 143.572C868.332 143.572 868.695 143.652 868.992 143.812C869.293 143.973 869.521 144.207 869.678 144.516C869.834 144.82 869.912 145.193 869.912 145.635V150H868.893V145.869C868.893 145.557 868.844 145.299 868.746 145.096C868.652 144.889 868.508 144.734 868.312 144.633C868.117 144.527 867.871 144.475 867.574 144.475C867.281 144.475 867.025 144.541 866.807 144.674C866.588 144.807 866.418 144.984 866.297 145.207C866.176 145.426 866.115 145.67 866.115 145.939V150H865.096V145.711C865.096 145.461 865.041 145.244 864.932 145.061C864.826 144.873 864.674 144.729 864.475 144.627C864.279 144.525 864.049 144.475 863.783 144.475C863.51 144.475 863.262 144.547 863.039 144.691C862.82 144.836 862.646 145.031 862.518 145.277C862.393 145.52 862.33 145.789 862.33 146.086V150H861.311ZM874.33 150.111C873.729 150.111 873.211 149.979 872.777 149.713C872.348 149.447 872.016 149.072 871.781 148.588C871.551 148.1 871.436 147.525 871.436 146.865V146.859C871.436 146.207 871.551 145.635 871.781 145.143C872.016 144.65 872.346 144.266 872.771 143.988C873.197 143.711 873.695 143.572 874.266 143.572C874.84 143.572 875.332 143.705 875.742 143.971C876.156 144.236 876.473 144.607 876.691 145.084C876.914 145.557 877.025 146.107 877.025 146.736V147.135H871.963V146.32H876.504L876 147.064V146.66C876 146.164 875.926 145.756 875.777 145.436C875.629 145.115 875.424 144.877 875.162 144.721C874.9 144.561 874.6 144.48 874.26 144.48C873.92 144.48 873.615 144.564 873.346 144.732C873.08 144.896 872.869 145.141 872.713 145.465C872.557 145.789 872.479 146.188 872.479 146.66V147.064C872.479 147.514 872.555 147.898 872.707 148.219C872.859 148.535 873.076 148.779 873.357 148.951C873.639 149.119 873.971 149.203 874.354 149.203C874.639 149.203 874.887 149.164 875.098 149.086C875.309 149.008 875.482 148.908 875.619 148.787C875.756 148.666 875.852 148.543 875.906 148.418L875.93 148.365H876.949L876.938 148.412C876.883 148.627 876.785 148.836 876.645 149.039C876.508 149.238 876.33 149.42 876.111 149.584C875.893 149.744 875.633 149.873 875.332 149.971C875.035 150.064 874.701 150.111 874.33 150.111ZM878.607 150V143.684H879.627V144.621H879.721C879.842 144.289 880.047 144.031 880.336 143.848C880.625 143.664 880.982 143.572 881.408 143.572C881.506 143.572 881.602 143.578 881.695 143.59C881.793 143.598 881.867 143.605 881.918 143.613V144.604C881.812 144.584 881.709 144.57 881.607 144.562C881.51 144.551 881.404 144.545 881.291 144.545C880.967 144.545 880.68 144.609 880.43 144.738C880.18 144.867 879.982 145.047 879.838 145.277C879.697 145.508 879.627 145.777 879.627 146.086V150H878.607ZM884.912 150.111C884.514 150.111 884.154 150.035 883.834 149.883C883.518 149.73 883.266 149.514 883.078 149.232C882.895 148.951 882.803 148.619 882.803 148.236V148.225C882.803 147.85 882.893 147.529 883.072 147.264C883.252 146.994 883.514 146.783 883.857 146.631C884.201 146.479 884.617 146.389 885.105 146.361L887.426 146.221V147.035L885.229 147.176C884.748 147.203 884.396 147.303 884.174 147.475C883.955 147.646 883.846 147.889 883.846 148.201V148.213C883.846 148.533 883.967 148.783 884.209 148.963C884.451 149.139 884.756 149.227 885.123 149.227C885.471 149.227 885.779 149.158 886.049 149.021C886.318 148.881 886.529 148.691 886.682 148.453C886.838 148.215 886.916 147.945 886.916 147.645V145.676C886.916 145.285 886.797 144.988 886.559 144.785C886.324 144.578 885.971 144.475 885.498 144.475C885.119 144.475 884.809 144.543 884.566 144.68C884.324 144.812 884.162 145.002 884.08 145.248L884.074 145.266H883.055L883.061 145.23C883.115 144.898 883.252 144.609 883.471 144.363C883.693 144.113 883.98 143.92 884.332 143.783C884.684 143.643 885.084 143.572 885.533 143.572C886.049 143.572 886.484 143.656 886.84 143.824C887.199 143.992 887.471 144.234 887.654 144.551C887.842 144.863 887.936 145.238 887.936 145.676V150H886.916V149.068H886.822C886.689 149.291 886.527 149.48 886.336 149.637C886.148 149.793 885.936 149.912 885.697 149.994C885.459 150.072 885.197 150.111 884.912 150.111Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M1026.45 150.199C1025.84 150.199 1025.3 150.1 1024.84 149.9C1024.38 149.697 1024.02 149.42 1023.75 149.068C1023.48 148.713 1023.33 148.307 1023.28 147.85L1023.28 147.785H1024.33L1024.34 147.85C1024.37 148.131 1024.47 148.375 1024.66 148.582C1024.85 148.785 1025.11 148.943 1025.42 149.057C1025.74 149.17 1026.11 149.227 1026.51 149.227C1026.89 149.227 1027.23 149.166 1027.53 149.045C1027.83 148.92 1028.07 148.748 1028.24 148.529C1028.41 148.311 1028.5 148.059 1028.5 147.773V147.768C1028.5 147.416 1028.37 147.121 1028.11 146.883C1027.85 146.641 1027.43 146.455 1026.85 146.326L1025.91 146.121C1025.07 145.934 1024.45 145.645 1024.06 145.254C1023.68 144.859 1023.49 144.355 1023.49 143.742V143.736C1023.49 143.268 1023.62 142.854 1023.87 142.494C1024.12 142.135 1024.47 141.854 1024.92 141.65C1025.37 141.447 1025.88 141.346 1026.46 141.346C1027.03 141.346 1027.53 141.447 1027.96 141.65C1028.39 141.85 1028.74 142.119 1028.99 142.459C1029.25 142.799 1029.39 143.18 1029.42 143.602L1029.42 143.684H1028.37L1028.36 143.607C1028.32 143.357 1028.22 143.137 1028.05 142.945C1027.89 142.75 1027.67 142.596 1027.4 142.482C1027.12 142.369 1026.8 142.314 1026.44 142.318C1026.08 142.318 1025.77 142.373 1025.49 142.482C1025.21 142.592 1024.98 142.75 1024.81 142.957C1024.65 143.16 1024.57 143.41 1024.57 143.707V143.713C1024.57 144.049 1024.69 144.332 1024.94 144.562C1025.19 144.793 1025.6 144.971 1026.18 145.096L1027.12 145.307C1027.71 145.436 1028.18 145.604 1028.54 145.811C1028.9 146.018 1029.16 146.271 1029.32 146.572C1029.49 146.869 1029.58 147.221 1029.58 147.627V147.633C1029.58 148.16 1029.45 148.615 1029.19 148.998C1028.93 149.381 1028.57 149.678 1028.1 149.889C1027.63 150.096 1027.08 150.199 1026.45 150.199ZM1033.78 150.111C1033.18 150.111 1032.66 149.979 1032.23 149.713C1031.8 149.447 1031.47 149.072 1031.23 148.588C1031 148.1 1030.89 147.525 1030.89 146.865V146.859C1030.89 146.207 1031 145.635 1031.23 145.143C1031.47 144.65 1031.8 144.266 1032.22 143.988C1032.65 143.711 1033.15 143.572 1033.72 143.572C1034.29 143.572 1034.79 143.705 1035.2 143.971C1035.61 144.236 1035.93 144.607 1036.14 145.084C1036.37 145.557 1036.48 146.107 1036.48 146.736V147.135H1031.42V146.32H1035.96L1035.45 147.064V146.66C1035.45 146.164 1035.38 145.756 1035.23 145.436C1035.08 145.115 1034.88 144.877 1034.62 144.721C1034.35 144.561 1034.05 144.48 1033.71 144.48C1033.37 144.48 1033.07 144.564 1032.8 144.732C1032.53 144.896 1032.32 145.141 1032.17 145.465C1032.01 145.789 1031.93 146.188 1031.93 146.66V147.064C1031.93 147.514 1032.01 147.898 1032.16 148.219C1032.31 148.535 1032.53 148.779 1032.81 148.951C1033.09 149.119 1033.42 149.203 1033.81 149.203C1034.09 149.203 1034.34 149.164 1034.55 149.086C1034.76 149.008 1034.94 148.908 1035.07 148.787C1035.21 148.666 1035.3 148.543 1035.36 148.418L1035.38 148.365H1036.4L1036.39 148.412C1036.34 148.627 1036.24 148.836 1036.1 149.039C1035.96 149.238 1035.78 149.42 1035.56 149.584C1035.35 149.744 1035.09 149.873 1034.79 149.971C1034.49 150.064 1034.15 150.111 1033.78 150.111ZM1040.3 150.047C1039.66 150.047 1039.19 149.916 1038.89 149.654C1038.6 149.393 1038.46 148.961 1038.46 148.359V144.527H1037.46V143.684H1038.46V142.049H1039.51V143.684H1040.9V144.527H1039.51V148.102C1039.51 148.473 1039.58 148.74 1039.72 148.904C1039.87 149.064 1040.1 149.145 1040.43 149.145C1040.52 149.145 1040.59 149.143 1040.66 149.139C1040.72 149.135 1040.8 149.129 1040.9 149.121V149.988C1040.8 150.004 1040.7 150.018 1040.6 150.029C1040.51 150.041 1040.41 150.047 1040.3 150.047ZM1044.66 150.047C1044.02 150.047 1043.54 149.916 1043.25 149.654C1042.96 149.393 1042.82 148.961 1042.82 148.359V144.527H1041.82V143.684H1042.82V142.049H1043.87V143.684H1045.26V144.527H1043.87V148.102C1043.87 148.473 1043.94 148.74 1044.08 148.904C1044.22 149.064 1044.46 149.145 1044.79 149.145C1044.88 149.145 1044.95 149.143 1045.02 149.139C1045.08 149.135 1045.16 149.129 1045.26 149.121V149.988C1045.16 150.004 1045.06 150.018 1044.96 150.029C1044.87 150.041 1044.77 150.047 1044.66 150.047ZM1046.8 150V143.684H1047.82V150H1046.8ZM1047.32 142.465C1047.13 142.465 1046.96 142.396 1046.82 142.26C1046.68 142.119 1046.62 141.953 1046.62 141.762C1046.62 141.566 1046.68 141.4 1046.82 141.264C1046.96 141.127 1047.13 141.059 1047.32 141.059C1047.51 141.059 1047.68 141.127 1047.82 141.264C1047.95 141.4 1048.02 141.566 1048.02 141.762C1048.02 141.953 1047.95 142.119 1047.82 142.26C1047.68 142.396 1047.51 142.465 1047.32 142.465ZM1049.74 150V143.684H1050.76V144.633H1050.86C1051.02 144.297 1051.25 144.037 1051.55 143.854C1051.85 143.666 1052.23 143.572 1052.7 143.572C1053.41 143.572 1053.95 143.775 1054.33 144.182C1054.71 144.584 1054.91 145.16 1054.91 145.91V150H1053.89V146.156C1053.89 145.586 1053.77 145.164 1053.52 144.891C1053.29 144.613 1052.91 144.475 1052.41 144.475C1052.07 144.475 1051.78 144.547 1051.54 144.691C1051.29 144.836 1051.1 145.041 1050.96 145.307C1050.83 145.572 1050.76 145.891 1050.76 146.262V150H1049.74ZM1059.35 152.227C1058.85 152.227 1058.4 152.154 1058.02 152.01C1057.64 151.869 1057.34 151.668 1057.12 151.406C1056.89 151.148 1056.75 150.848 1056.7 150.504L1056.71 150.498H1057.77L1057.77 150.504C1057.83 150.742 1057.99 150.938 1058.26 151.09C1058.54 151.246 1058.9 151.324 1059.35 151.324C1059.92 151.324 1060.36 151.195 1060.68 150.938C1061 150.684 1061.16 150.324 1061.16 149.859V148.582H1061.06C1060.93 148.812 1060.77 149.01 1060.57 149.174C1060.37 149.338 1060.14 149.463 1059.89 149.549C1059.64 149.631 1059.37 149.672 1059.08 149.672C1058.54 149.672 1058.07 149.543 1057.67 149.285C1057.28 149.023 1056.97 148.664 1056.76 148.207C1056.54 147.75 1056.44 147.227 1056.44 146.637V146.625C1056.44 146.035 1056.54 145.512 1056.76 145.055C1056.98 144.594 1057.29 144.232 1057.68 143.971C1058.08 143.705 1058.56 143.572 1059.11 143.572C1059.4 143.572 1059.68 143.619 1059.93 143.713C1060.18 143.807 1060.4 143.939 1060.59 144.111C1060.79 144.283 1060.95 144.488 1061.08 144.727H1061.15V143.684H1062.17V149.912C1062.17 150.381 1062.05 150.789 1061.82 151.137C1061.59 151.484 1061.27 151.752 1060.85 151.939C1060.43 152.131 1059.93 152.227 1059.35 152.227ZM1059.31 148.77C1059.7 148.77 1060.03 148.68 1060.31 148.5C1060.59 148.316 1060.8 148.064 1060.95 147.744C1061.11 147.424 1061.18 147.055 1061.18 146.637V146.625C1061.18 146.207 1061.11 145.836 1060.95 145.512C1060.8 145.188 1060.59 144.934 1060.31 144.75C1060.03 144.566 1059.7 144.475 1059.31 144.475C1058.92 144.475 1058.58 144.566 1058.31 144.75C1058.04 144.934 1057.83 145.188 1057.69 145.512C1057.55 145.836 1057.48 146.207 1057.48 146.625V146.637C1057.48 147.055 1057.55 147.424 1057.69 147.744C1057.83 148.064 1058.04 148.316 1058.31 148.5C1058.58 148.68 1058.92 148.77 1059.31 148.77ZM1066.23 150.111C1065.76 150.111 1065.35 150.041 1064.99 149.9C1064.63 149.756 1064.34 149.555 1064.12 149.297C1063.91 149.039 1063.78 148.736 1063.74 148.389H1064.79C1064.87 148.65 1065.04 148.861 1065.29 149.021C1065.54 149.182 1065.87 149.262 1066.27 149.262C1066.55 149.262 1066.8 149.221 1067.02 149.139C1067.24 149.053 1067.41 148.938 1067.53 148.793C1067.66 148.645 1067.72 148.475 1067.72 148.283V148.271C1067.72 148.057 1067.63 147.875 1067.46 147.727C1067.29 147.574 1067.01 147.451 1066.62 147.357L1065.64 147.123C1065.25 147.029 1064.92 146.908 1064.67 146.76C1064.41 146.607 1064.23 146.422 1064.11 146.203C1063.98 145.98 1063.92 145.719 1063.92 145.418V145.412C1063.92 145.061 1064.03 144.746 1064.23 144.469C1064.44 144.191 1064.72 143.973 1065.07 143.812C1065.43 143.652 1065.83 143.572 1066.27 143.572C1066.71 143.572 1067.11 143.643 1067.45 143.783C1067.79 143.92 1068.06 144.115 1068.27 144.369C1068.48 144.623 1068.61 144.922 1068.66 145.266H1067.66C1067.59 145.016 1067.44 144.812 1067.2 144.656C1066.96 144.5 1066.65 144.422 1066.27 144.422C1066.02 144.422 1065.79 144.463 1065.6 144.545C1065.4 144.623 1065.25 144.732 1065.14 144.873C1065.02 145.014 1064.97 145.178 1064.97 145.365V145.377C1064.97 145.518 1065 145.643 1065.08 145.752C1065.15 145.861 1065.27 145.957 1065.42 146.039C1065.58 146.121 1065.78 146.193 1066.03 146.256L1067 146.49C1067.59 146.635 1068.04 146.842 1068.32 147.111C1068.62 147.381 1068.76 147.742 1068.76 148.195V148.207C1068.76 148.582 1068.65 148.914 1068.43 149.203C1068.21 149.488 1067.9 149.711 1067.52 149.871C1067.14 150.031 1066.71 150.111 1066.23 150.111Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M122.131 280V271.545H125.359C125.902 271.545 126.375 271.65 126.777 271.861C127.184 272.068 127.498 272.359 127.721 272.734C127.943 273.109 128.055 273.551 128.055 274.059V274.07C128.055 274.656 127.904 275.164 127.604 275.594C127.303 276.023 126.887 276.322 126.355 276.49L128.312 280H127.076L125.266 276.654C125.258 276.654 125.248 276.654 125.236 276.654C125.225 276.654 125.215 276.654 125.207 276.654H123.186V280H122.131ZM123.186 275.717H125.266C125.809 275.717 126.227 275.578 126.52 275.301C126.816 275.02 126.965 274.621 126.965 274.105V274.094C126.965 273.59 126.811 273.195 126.502 272.91C126.193 272.625 125.766 272.482 125.219 272.482H123.186V275.717ZM132.244 280.111C131.643 280.111 131.125 279.979 130.691 279.713C130.262 279.447 129.93 279.072 129.695 278.588C129.465 278.1 129.35 277.525 129.35 276.865V276.859C129.35 276.207 129.465 275.635 129.695 275.143C129.93 274.65 130.26 274.266 130.686 273.988C131.111 273.711 131.609 273.572 132.18 273.572C132.754 273.572 133.246 273.705 133.656 273.971C134.07 274.236 134.387 274.607 134.605 275.084C134.828 275.557 134.939 276.107 134.939 276.736V277.135H129.877V276.32H134.418L133.914 277.064V276.66C133.914 276.164 133.84 275.756 133.691 275.436C133.543 275.115 133.338 274.877 133.076 274.721C132.814 274.561 132.514 274.48 132.174 274.48C131.834 274.48 131.529 274.564 131.26 274.732C130.994 274.896 130.783 275.141 130.627 275.465C130.471 275.789 130.393 276.188 130.393 276.66V277.064C130.393 277.514 130.469 277.898 130.621 278.219C130.773 278.535 130.99 278.779 131.271 278.951C131.553 279.119 131.885 279.203 132.268 279.203C132.553 279.203 132.801 279.164 133.012 279.086C133.223 279.008 133.396 278.908 133.533 278.787C133.67 278.666 133.766 278.543 133.82 278.418L133.844 278.365H134.863L134.852 278.412C134.797 278.627 134.699 278.836 134.559 279.039C134.422 279.238 134.244 279.42 134.025 279.584C133.807 279.744 133.547 279.873 133.246 279.971C132.949 280.064 132.615 280.111 132.244 280.111ZM136.521 280V273.684H137.541V274.645H137.635C137.775 274.305 137.99 274.041 138.279 273.854C138.572 273.666 138.926 273.572 139.34 273.572C139.625 273.572 139.881 273.619 140.107 273.713C140.334 273.807 140.529 273.938 140.693 274.105C140.857 274.27 140.988 274.461 141.086 274.68H141.18C141.293 274.457 141.445 274.264 141.637 274.1C141.828 273.932 142.049 273.803 142.299 273.713C142.553 273.619 142.824 273.572 143.113 273.572C143.543 273.572 143.906 273.652 144.203 273.812C144.504 273.973 144.732 274.207 144.889 274.516C145.045 274.82 145.123 275.193 145.123 275.635V280H144.104V275.869C144.104 275.557 144.055 275.299 143.957 275.096C143.863 274.889 143.719 274.734 143.523 274.633C143.328 274.527 143.082 274.475 142.785 274.475C142.492 274.475 142.236 274.541 142.018 274.674C141.799 274.807 141.629 274.984 141.508 275.207C141.387 275.426 141.326 275.67 141.326 275.939V280H140.307V275.711C140.307 275.461 140.252 275.244 140.143 275.061C140.037 274.873 139.885 274.729 139.686 274.627C139.49 274.525 139.26 274.475 138.994 274.475C138.721 274.475 138.473 274.547 138.25 274.691C138.031 274.836 137.857 275.031 137.729 275.277C137.604 275.52 137.541 275.789 137.541 276.086V280H136.521ZM146.986 280V273.684H148.006V280H146.986ZM147.502 272.465C147.311 272.465 147.145 272.396 147.004 272.26C146.867 272.119 146.799 271.953 146.799 271.762C146.799 271.566 146.867 271.4 147.004 271.264C147.145 271.127 147.311 271.059 147.502 271.059C147.697 271.059 147.863 271.127 148 271.264C148.137 271.4 148.205 271.566 148.205 271.762C148.205 271.953 148.137 272.119 148 272.26C147.863 272.396 147.697 272.465 147.502 272.465ZM149.928 280V273.684H150.947V274.633H151.041C151.201 274.297 151.432 274.037 151.732 273.854C152.033 273.666 152.416 273.572 152.881 273.572C153.592 273.572 154.137 273.775 154.516 274.182C154.898 274.584 155.09 275.16 155.09 275.91V280H154.07V276.156C154.07 275.586 153.949 275.164 153.707 274.891C153.469 274.613 153.098 274.475 152.594 274.475C152.258 274.475 151.967 274.547 151.721 274.691C151.475 274.836 151.283 275.041 151.146 275.307C151.014 275.572 150.947 275.891 150.947 276.262V280H149.928ZM159.268 280.111C158.736 280.111 158.271 279.977 157.873 279.707C157.475 279.438 157.166 279.059 156.947 278.57C156.729 278.078 156.619 277.504 156.619 276.848V276.836C156.619 276.176 156.729 275.602 156.947 275.113C157.166 274.625 157.473 274.246 157.867 273.977C158.266 273.707 158.732 273.572 159.268 273.572C159.557 273.572 159.828 273.619 160.082 273.713C160.34 273.803 160.568 273.93 160.768 274.094C160.967 274.258 161.123 274.453 161.236 274.68H161.33V271.176H162.35V280H161.33V278.992H161.236C161.107 279.227 160.945 279.428 160.75 279.596C160.555 279.76 160.332 279.887 160.082 279.977C159.832 280.066 159.561 280.111 159.268 280.111ZM159.502 279.209C159.885 279.209 160.215 279.113 160.492 278.922C160.77 278.73 160.982 278.459 161.131 278.107C161.279 277.752 161.354 277.332 161.354 276.848V276.836C161.354 276.348 161.279 275.928 161.131 275.576C160.982 275.225 160.77 274.953 160.492 274.762C160.215 274.57 159.885 274.475 159.502 274.475C159.119 274.475 158.789 274.57 158.512 274.762C158.238 274.949 158.027 275.219 157.879 275.57C157.734 275.922 157.662 276.344 157.662 276.836V276.848C157.662 277.336 157.734 277.758 157.879 278.113C158.027 278.465 158.238 278.736 158.512 278.928C158.789 279.115 159.119 279.209 159.502 279.209ZM166.885 280.111C166.283 280.111 165.766 279.979 165.332 279.713C164.902 279.447 164.57 279.072 164.336 278.588C164.105 278.1 163.99 277.525 163.99 276.865V276.859C163.99 276.207 164.105 275.635 164.336 275.143C164.57 274.65 164.9 274.266 165.326 273.988C165.752 273.711 166.25 273.572 166.82 273.572C167.395 273.572 167.887 273.705 168.297 273.971C168.711 274.236 169.027 274.607 169.246 275.084C169.469 275.557 169.58 276.107 169.58 276.736V277.135H164.518V276.32H169.059L168.555 277.064V276.66C168.555 276.164 168.48 275.756 168.332 275.436C168.184 275.115 167.979 274.877 167.717 274.721C167.455 274.561 167.154 274.48 166.814 274.48C166.475 274.48 166.17 274.564 165.9 274.732C165.635 274.896 165.424 275.141 165.268 275.465C165.111 275.789 165.033 276.188 165.033 276.66V277.064C165.033 277.514 165.109 277.898 165.262 278.219C165.414 278.535 165.631 278.779 165.912 278.951C166.193 279.119 166.525 279.203 166.908 279.203C167.193 279.203 167.441 279.164 167.652 279.086C167.863 279.008 168.037 278.908 168.174 278.787C168.311 278.666 168.406 278.543 168.461 278.418L168.484 278.365H169.504L169.492 278.412C169.438 278.627 169.34 278.836 169.199 279.039C169.062 279.238 168.885 279.42 168.666 279.584C168.447 279.744 168.188 279.873 167.887 279.971C167.59 280.064 167.256 280.111 166.885 280.111ZM171.162 280V273.684H172.182V274.621H172.275C172.396 274.289 172.602 274.031 172.891 273.848C173.18 273.664 173.537 273.572 173.963 273.572C174.061 273.572 174.156 273.578 174.25 273.59C174.348 273.598 174.422 273.605 174.473 273.613V274.604C174.367 274.584 174.264 274.57 174.162 274.562C174.064 274.551 173.959 274.545 173.846 274.545C173.521 274.545 173.234 274.609 172.984 274.738C172.734 274.867 172.537 275.047 172.393 275.277C172.252 275.508 172.182 275.777 172.182 276.086V280H171.162ZM177.783 280.111C177.314 280.111 176.9 280.041 176.541 279.9C176.182 279.756 175.893 279.555 175.674 279.297C175.459 279.039 175.332 278.736 175.293 278.389H176.336C176.422 278.65 176.59 278.861 176.84 279.021C177.09 279.182 177.416 279.262 177.818 279.262C178.104 279.262 178.354 279.221 178.568 279.139C178.787 279.053 178.959 278.938 179.084 278.793C179.209 278.645 179.271 278.475 179.271 278.283V278.271C179.271 278.057 179.186 277.875 179.014 277.727C178.842 277.574 178.561 277.451 178.17 277.357L177.191 277.123C176.797 277.029 176.473 276.908 176.219 276.76C175.965 276.607 175.777 276.422 175.656 276.203C175.535 275.98 175.475 275.719 175.475 275.418V275.412C175.475 275.061 175.576 274.746 175.779 274.469C175.986 274.191 176.268 273.973 176.623 273.812C176.979 273.652 177.379 273.572 177.824 273.572C178.266 273.572 178.656 273.643 178.996 273.783C179.34 273.92 179.615 274.115 179.822 274.369C180.033 274.623 180.162 274.922 180.209 275.266H179.207C179.141 275.016 178.988 274.812 178.75 274.656C178.512 274.5 178.201 274.422 177.818 274.422C177.568 274.422 177.346 274.463 177.15 274.545C176.955 274.623 176.801 274.732 176.688 274.873C176.574 275.014 176.518 275.178 176.518 275.365V275.377C176.518 275.518 176.555 275.643 176.629 275.752C176.703 275.861 176.818 275.957 176.975 276.039C177.131 276.121 177.332 276.193 177.578 276.256L178.551 276.49C179.145 276.635 179.586 276.842 179.875 277.111C180.168 277.381 180.314 277.742 180.314 278.195V278.207C180.314 278.582 180.203 278.914 179.98 279.203C179.758 279.488 179.455 279.711 179.072 279.871C178.693 280.031 178.264 280.111 177.783 280.111Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M305.607 276.982V276.045H307.998C308.604 276.045 309.072 275.889 309.404 275.576C309.736 275.26 309.902 274.824 309.902 274.27V274.258C309.902 273.699 309.736 273.264 309.404 272.951C309.072 272.639 308.604 272.482 307.998 272.482H305.607V271.545H308.268C308.799 271.545 309.268 271.658 309.674 271.885C310.08 272.111 310.398 272.428 310.629 272.834C310.863 273.24 310.98 273.711 310.98 274.246V274.258C310.98 274.793 310.863 275.266 310.629 275.676C310.398 276.086 310.08 276.406 309.674 276.637C309.268 276.867 308.799 276.982 308.268 276.982H305.607ZM305.08 280V271.545H306.135V280H305.08ZM315 280.111C314.402 280.111 313.885 279.98 313.447 279.719C313.014 279.453 312.678 279.076 312.439 278.588C312.205 278.1 312.088 277.52 312.088 276.848V276.836C312.088 276.16 312.205 275.578 312.439 275.09C312.678 274.602 313.014 274.227 313.447 273.965C313.885 273.703 314.402 273.572 315 273.572C315.602 273.572 316.119 273.703 316.553 273.965C316.986 274.227 317.32 274.602 317.555 275.09C317.793 275.578 317.912 276.16 317.912 276.836V276.848C317.912 277.52 317.793 278.1 317.555 278.588C317.32 279.076 316.986 279.453 316.553 279.719C316.119 279.98 315.602 280.111 315 280.111ZM315 279.209C315.398 279.209 315.736 279.115 316.014 278.928C316.291 278.74 316.502 278.471 316.646 278.119C316.795 277.768 316.869 277.344 316.869 276.848V276.836C316.869 276.336 316.795 275.91 316.646 275.559C316.502 275.207 316.291 274.939 316.014 274.756C315.736 274.568 315.398 274.475 315 274.475C314.602 274.475 314.264 274.568 313.986 274.756C313.709 274.939 313.496 275.207 313.348 275.559C313.203 275.91 313.131 276.336 313.131 276.836V276.848C313.131 277.344 313.203 277.768 313.348 278.119C313.496 278.471 313.709 278.74 313.986 278.928C314.264 279.115 314.602 279.209 315 279.209ZM321.826 280.111C321.295 280.111 320.83 279.977 320.432 279.707C320.033 279.438 319.725 279.059 319.506 278.57C319.287 278.078 319.178 277.504 319.178 276.848V276.836C319.178 276.176 319.287 275.602 319.506 275.113C319.725 274.625 320.031 274.246 320.426 273.977C320.824 273.707 321.291 273.572 321.826 273.572C322.115 273.572 322.387 273.619 322.641 273.713C322.898 273.803 323.127 273.93 323.326 274.094C323.525 274.258 323.682 274.453 323.795 274.68H323.889V271.176H324.908V280H323.889V278.992H323.795C323.666 279.227 323.504 279.428 323.309 279.596C323.113 279.76 322.891 279.887 322.641 279.977C322.391 280.066 322.119 280.111 321.826 280.111ZM322.061 279.209C322.443 279.209 322.773 279.113 323.051 278.922C323.328 278.73 323.541 278.459 323.689 278.107C323.838 277.752 323.912 277.332 323.912 276.848V276.836C323.912 276.348 323.838 275.928 323.689 275.576C323.541 275.225 323.328 274.953 323.051 274.762C322.773 274.57 322.443 274.475 322.061 274.475C321.678 274.475 321.348 274.57 321.07 274.762C320.797 274.949 320.586 275.219 320.438 275.57C320.293 275.922 320.221 276.344 320.221 276.836V276.848C320.221 277.336 320.293 277.758 320.438 278.113C320.586 278.465 320.797 278.736 321.07 278.928C321.348 279.115 321.678 279.209 322.061 279.209ZM329.449 280.111C328.859 280.111 328.348 279.977 327.914 279.707C327.48 279.438 327.145 279.057 326.906 278.564C326.668 278.072 326.549 277.492 326.549 276.824V276.812C326.549 276.156 326.666 275.586 326.9 275.102C327.139 274.617 327.475 274.242 327.908 273.977C328.342 273.707 328.854 273.572 329.443 273.572C329.955 273.572 330.396 273.662 330.768 273.842C331.139 274.021 331.436 274.264 331.658 274.568C331.881 274.869 332.023 275.207 332.086 275.582L332.092 275.617H331.078L331.072 275.6C330.994 275.287 330.816 275.021 330.539 274.803C330.262 274.584 329.896 274.475 329.443 274.475C329.064 274.475 328.736 274.57 328.459 274.762C328.182 274.953 327.967 275.225 327.814 275.576C327.666 275.924 327.592 276.336 327.592 276.812V276.824C327.592 277.309 327.668 277.73 327.82 278.09C327.973 278.445 328.188 278.721 328.465 278.916C328.742 279.111 329.068 279.209 329.443 279.209C329.869 279.209 330.217 279.117 330.486 278.934C330.756 278.75 330.949 278.482 331.066 278.131L331.078 278.096L332.086 278.09L332.074 278.154C331.988 278.533 331.836 278.871 331.617 279.168C331.398 279.461 331.109 279.691 330.75 279.859C330.391 280.027 329.957 280.111 329.449 280.111ZM335.314 280.111C334.916 280.111 334.557 280.035 334.236 279.883C333.92 279.73 333.668 279.514 333.48 279.232C333.297 278.951 333.205 278.619 333.205 278.236V278.225C333.205 277.85 333.295 277.529 333.475 277.264C333.654 276.994 333.916 276.783 334.26 276.631C334.604 276.479 335.02 276.389 335.508 276.361L337.828 276.221V277.035L335.631 277.176C335.15 277.203 334.799 277.303 334.576 277.475C334.357 277.646 334.248 277.889 334.248 278.201V278.213C334.248 278.533 334.369 278.783 334.611 278.963C334.854 279.139 335.158 279.227 335.525 279.227C335.873 279.227 336.182 279.158 336.451 279.021C336.721 278.881 336.932 278.691 337.084 278.453C337.24 278.215 337.318 277.945 337.318 277.645V275.676C337.318 275.285 337.199 274.988 336.961 274.785C336.727 274.578 336.373 274.475 335.9 274.475C335.521 274.475 335.211 274.543 334.969 274.68C334.727 274.812 334.564 275.002 334.482 275.248L334.477 275.266H333.457L333.463 275.23C333.518 274.898 333.654 274.609 333.873 274.363C334.096 274.113 334.383 273.92 334.734 273.783C335.086 273.643 335.486 273.572 335.936 273.572C336.451 273.572 336.887 273.656 337.242 273.824C337.602 273.992 337.873 274.234 338.057 274.551C338.244 274.863 338.338 275.238 338.338 275.676V280H337.318V279.068H337.225C337.092 279.291 336.93 279.48 336.738 279.637C336.551 279.793 336.338 279.912 336.1 279.994C335.861 280.072 335.6 280.111 335.314 280.111ZM342.369 280.111C341.9 280.111 341.486 280.041 341.127 279.9C340.768 279.756 340.479 279.555 340.26 279.297C340.045 279.039 339.918 278.736 339.879 278.389H340.922C341.008 278.65 341.176 278.861 341.426 279.021C341.676 279.182 342.002 279.262 342.404 279.262C342.689 279.262 342.939 279.221 343.154 279.139C343.373 279.053 343.545 278.938 343.67 278.793C343.795 278.645 343.857 278.475 343.857 278.283V278.271C343.857 278.057 343.771 277.875 343.6 277.727C343.428 277.574 343.146 277.451 342.756 277.357L341.777 277.123C341.383 277.029 341.059 276.908 340.805 276.76C340.551 276.607 340.363 276.422 340.242 276.203C340.121 275.98 340.061 275.719 340.061 275.418V275.412C340.061 275.061 340.162 274.746 340.365 274.469C340.572 274.191 340.854 273.973 341.209 273.812C341.564 273.652 341.965 273.572 342.41 273.572C342.852 273.572 343.242 273.643 343.582 273.783C343.926 273.92 344.201 274.115 344.408 274.369C344.619 274.623 344.748 274.922 344.795 275.266H343.793C343.727 275.016 343.574 274.812 343.336 274.656C343.098 274.5 342.787 274.422 342.404 274.422C342.154 274.422 341.932 274.463 341.736 274.545C341.541 274.623 341.387 274.732 341.273 274.873C341.16 275.014 341.104 275.178 341.104 275.365V275.377C341.104 275.518 341.141 275.643 341.215 275.752C341.289 275.861 341.404 275.957 341.561 276.039C341.717 276.121 341.918 276.193 342.164 276.256L343.137 276.49C343.73 276.635 344.172 276.842 344.461 277.111C344.754 277.381 344.9 277.742 344.9 278.195V278.207C344.9 278.582 344.789 278.914 344.566 279.203C344.344 279.488 344.041 279.711 343.658 279.871C343.279 280.031 342.85 280.111 342.369 280.111ZM348.668 280.047C348.02 280.047 347.549 279.916 347.256 279.654C346.967 279.393 346.822 278.961 346.822 278.359V274.527H345.826V273.684H346.822V272.049H347.877V273.684H349.26V274.527H347.877V278.102C347.877 278.473 347.947 278.74 348.088 278.904C348.229 279.064 348.463 279.145 348.791 279.145C348.881 279.145 348.957 279.143 349.02 279.139C349.086 279.135 349.166 279.129 349.26 279.121V279.988C349.162 280.004 349.064 280.018 348.967 280.029C348.869 280.041 348.77 280.047 348.668 280.047ZM352.834 280.111C352.365 280.111 351.951 280.041 351.592 279.9C351.232 279.756 350.943 279.555 350.725 279.297C350.51 279.039 350.383 278.736 350.344 278.389H351.387C351.473 278.65 351.641 278.861 351.891 279.021C352.141 279.182 352.467 279.262 352.869 279.262C353.154 279.262 353.404 279.221 353.619 279.139C353.838 279.053 354.01 278.938 354.135 278.793C354.26 278.645 354.322 278.475 354.322 278.283V278.271C354.322 278.057 354.236 277.875 354.064 277.727C353.893 277.574 353.611 277.451 353.221 277.357L352.242 277.123C351.848 277.029 351.523 276.908 351.27 276.76C351.016 276.607 350.828 276.422 350.707 276.203C350.586 275.98 350.525 275.719 350.525 275.418V275.412C350.525 275.061 350.627 274.746 350.83 274.469C351.037 274.191 351.318 273.973 351.674 273.812C352.029 273.652 352.43 273.572 352.875 273.572C353.316 273.572 353.707 273.643 354.047 273.783C354.391 273.92 354.666 274.115 354.873 274.369C355.084 274.623 355.213 274.922 355.26 275.266H354.258C354.191 275.016 354.039 274.812 353.801 274.656C353.562 274.5 353.252 274.422 352.869 274.422C352.619 274.422 352.396 274.463 352.201 274.545C352.006 274.623 351.852 274.732 351.738 274.873C351.625 275.014 351.568 275.178 351.568 275.365V275.377C351.568 275.518 351.605 275.643 351.68 275.752C351.754 275.861 351.869 275.957 352.025 276.039C352.182 276.121 352.383 276.193 352.629 276.256L353.602 276.49C354.195 276.635 354.637 276.842 354.926 277.111C355.219 277.381 355.365 277.742 355.365 278.195V278.207C355.365 278.582 355.254 278.914 355.031 279.203C354.809 279.488 354.506 279.711 354.123 279.871C353.744 280.031 353.314 280.111 352.834 280.111Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M491.656 280V271.545H492.711V275.201H497.352V271.545H498.406V280H497.352V276.15H492.711V280H491.656ZM503.012 280.111C502.41 280.111 501.893 279.979 501.459 279.713C501.029 279.447 500.697 279.072 500.463 278.588C500.232 278.1 500.117 277.525 500.117 276.865V276.859C500.117 276.207 500.232 275.635 500.463 275.143C500.697 274.65 501.027 274.266 501.453 273.988C501.879 273.711 502.377 273.572 502.947 273.572C503.521 273.572 504.014 273.705 504.424 273.971C504.838 274.236 505.154 274.607 505.373 275.084C505.596 275.557 505.707 276.107 505.707 276.736V277.135H500.645V276.32H505.186L504.682 277.064V276.66C504.682 276.164 504.607 275.756 504.459 275.436C504.311 275.115 504.105 274.877 503.844 274.721C503.582 274.561 503.281 274.48 502.941 274.48C502.602 274.48 502.297 274.564 502.027 274.732C501.762 274.896 501.551 275.141 501.395 275.465C501.238 275.789 501.16 276.188 501.16 276.66V277.064C501.16 277.514 501.236 277.898 501.389 278.219C501.541 278.535 501.758 278.779 502.039 278.951C502.32 279.119 502.652 279.203 503.035 279.203C503.32 279.203 503.568 279.164 503.779 279.086C503.99 279.008 504.164 278.908 504.301 278.787C504.438 278.666 504.533 278.543 504.588 278.418L504.611 278.365H505.631L505.619 278.412C505.564 278.627 505.467 278.836 505.326 279.039C505.189 279.238 505.012 279.42 504.793 279.584C504.574 279.744 504.314 279.873 504.014 279.971C503.717 280.064 503.383 280.111 503.012 280.111ZM509.023 280.111C508.625 280.111 508.266 280.035 507.945 279.883C507.629 279.73 507.377 279.514 507.189 279.232C507.006 278.951 506.914 278.619 506.914 278.236V278.225C506.914 277.85 507.004 277.529 507.184 277.264C507.363 276.994 507.625 276.783 507.969 276.631C508.312 276.479 508.729 276.389 509.217 276.361L511.537 276.221V277.035L509.34 277.176C508.859 277.203 508.508 277.303 508.285 277.475C508.066 277.646 507.957 277.889 507.957 278.201V278.213C507.957 278.533 508.078 278.783 508.32 278.963C508.562 279.139 508.867 279.227 509.234 279.227C509.582 279.227 509.891 279.158 510.16 279.021C510.43 278.881 510.641 278.691 510.793 278.453C510.949 278.215 511.027 277.945 511.027 277.645V275.676C511.027 275.285 510.908 274.988 510.67 274.785C510.436 274.578 510.082 274.475 509.609 274.475C509.23 274.475 508.92 274.543 508.678 274.68C508.436 274.812 508.273 275.002 508.191 275.248L508.186 275.266H507.166L507.172 275.23C507.227 274.898 507.363 274.609 507.582 274.363C507.805 274.113 508.092 273.92 508.443 273.783C508.795 273.643 509.195 273.572 509.645 273.572C510.16 273.572 510.596 273.656 510.951 273.824C511.311 273.992 511.582 274.234 511.766 274.551C511.953 274.863 512.047 275.238 512.047 275.676V280H511.027V279.068H510.934C510.801 279.291 510.639 279.48 510.447 279.637C510.26 279.793 510.047 279.912 509.809 279.994C509.57 280.072 509.309 280.111 509.023 280.111ZM513.969 280V271.176H514.988V280H513.969ZM519.189 280.047C518.541 280.047 518.07 279.916 517.777 279.654C517.488 279.393 517.344 278.961 517.344 278.359V274.527H516.348V273.684H517.344V272.049H518.398V273.684H519.781V274.527H518.398V278.102C518.398 278.473 518.469 278.74 518.609 278.904C518.75 279.064 518.984 279.145 519.312 279.145C519.402 279.145 519.479 279.143 519.541 279.139C519.607 279.135 519.688 279.129 519.781 279.121V279.988C519.684 280.004 519.586 280.018 519.488 280.029C519.391 280.041 519.291 280.047 519.189 280.047ZM521.363 280V271.176H522.383V274.633H522.477C522.637 274.297 522.867 274.037 523.168 273.854C523.469 273.666 523.852 273.572 524.316 273.572C524.789 273.572 525.189 273.664 525.518 273.848C525.846 274.027 526.096 274.291 526.268 274.639C526.439 274.986 526.525 275.41 526.525 275.91V280H525.506V276.156C525.506 275.586 525.385 275.164 525.143 274.891C524.904 274.613 524.533 274.475 524.029 274.475C523.693 274.475 523.402 274.547 523.156 274.691C522.91 274.836 522.719 275.041 522.582 275.307C522.449 275.572 522.383 275.891 522.383 276.262V280H521.363Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M673.363 280L671.061 271.545H672.162L673.844 278.418H673.914L675.807 271.545H676.873L678.766 278.418H678.836L680.518 271.545H681.619L679.316 280H678.32L676.375 273.326H676.305L674.359 280H673.363ZM684.244 280.111C683.846 280.111 683.486 280.035 683.166 279.883C682.85 279.73 682.598 279.514 682.41 279.232C682.227 278.951 682.135 278.619 682.135 278.236V278.225C682.135 277.85 682.225 277.529 682.404 277.264C682.584 276.994 682.846 276.783 683.189 276.631C683.533 276.479 683.949 276.389 684.438 276.361L686.758 276.221V277.035L684.561 277.176C684.08 277.203 683.729 277.303 683.506 277.475C683.287 277.646 683.178 277.889 683.178 278.201V278.213C683.178 278.533 683.299 278.783 683.541 278.963C683.783 279.139 684.088 279.227 684.455 279.227C684.803 279.227 685.111 279.158 685.381 279.021C685.65 278.881 685.861 278.691 686.014 278.453C686.17 278.215 686.248 277.945 686.248 277.645V275.676C686.248 275.285 686.129 274.988 685.891 274.785C685.656 274.578 685.303 274.475 684.83 274.475C684.451 274.475 684.141 274.543 683.898 274.68C683.656 274.812 683.494 275.002 683.412 275.248L683.406 275.266H682.387L682.393 275.23C682.447 274.898 682.584 274.609 682.803 274.363C683.025 274.113 683.312 273.92 683.664 273.783C684.016 273.643 684.416 273.572 684.865 273.572C685.381 273.572 685.816 273.656 686.172 273.824C686.531 273.992 686.803 274.234 686.986 274.551C687.174 274.863 687.268 275.238 687.268 275.676V280H686.248V279.068H686.154C686.021 279.291 685.859 279.48 685.668 279.637C685.48 279.793 685.268 279.912 685.029 279.994C684.791 280.072 684.529 280.111 684.244 280.111ZM689.189 280V271.176H690.209V280H689.189ZM692.225 280V271.176H693.244V280H692.225ZM697.779 280.111C697.178 280.111 696.66 279.979 696.227 279.713C695.797 279.447 695.465 279.072 695.23 278.588C695 278.1 694.885 277.525 694.885 276.865V276.859C694.885 276.207 695 275.635 695.23 275.143C695.465 274.65 695.795 274.266 696.221 273.988C696.646 273.711 697.145 273.572 697.715 273.572C698.289 273.572 698.781 273.705 699.191 273.971C699.605 274.236 699.922 274.607 700.141 275.084C700.363 275.557 700.475 276.107 700.475 276.736V277.135H695.412V276.32H699.953L699.449 277.064V276.66C699.449 276.164 699.375 275.756 699.227 275.436C699.078 275.115 698.873 274.877 698.611 274.721C698.35 274.561 698.049 274.48 697.709 274.48C697.369 274.48 697.064 274.564 696.795 274.732C696.529 274.896 696.318 275.141 696.162 275.465C696.006 275.789 695.928 276.188 695.928 276.66V277.064C695.928 277.514 696.004 277.898 696.156 278.219C696.309 278.535 696.525 278.779 696.807 278.951C697.088 279.119 697.42 279.203 697.803 279.203C698.088 279.203 698.336 279.164 698.547 279.086C698.758 279.008 698.932 278.908 699.068 278.787C699.205 278.666 699.301 278.543 699.355 278.418L699.379 278.365H700.398L700.387 278.412C700.332 278.627 700.234 278.836 700.094 279.039C699.957 279.238 699.779 279.42 699.561 279.584C699.342 279.744 699.082 279.873 698.781 279.971C698.484 280.064 698.15 280.111 697.779 280.111ZM704.301 280.047C703.652 280.047 703.182 279.916 702.889 279.654C702.6 279.393 702.455 278.961 702.455 278.359V274.527H701.459V273.684H702.455V272.049H703.51V273.684H704.893V274.527H703.51V278.102C703.51 278.473 703.58 278.74 703.721 278.904C703.861 279.064 704.096 279.145 704.424 279.145C704.514 279.145 704.59 279.143 704.652 279.139C704.719 279.135 704.799 279.129 704.893 279.121V279.988C704.795 280.004 704.697 280.018 704.6 280.029C704.502 280.041 704.402 280.047 704.301 280.047Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M852.721 280V271.545H853.945L856.84 278.6H856.934L859.828 271.545H861.053V280H860.068V273.543H859.553L860.736 271.779L857.332 280H856.441L853.043 271.779L854.221 273.543H853.705V280H852.721ZM864.814 280.111C864.416 280.111 864.057 280.035 863.736 279.883C863.42 279.73 863.168 279.514 862.98 279.232C862.797 278.951 862.705 278.619 862.705 278.236V278.225C862.705 277.85 862.795 277.529 862.975 277.264C863.154 276.994 863.416 276.783 863.76 276.631C864.104 276.479 864.52 276.389 865.008 276.361L867.328 276.221V277.035L865.131 277.176C864.65 277.203 864.299 277.303 864.076 277.475C863.857 277.646 863.748 277.889 863.748 278.201V278.213C863.748 278.533 863.869 278.783 864.111 278.963C864.354 279.139 864.658 279.227 865.025 279.227C865.373 279.227 865.682 279.158 865.951 279.021C866.221 278.881 866.432 278.691 866.584 278.453C866.74 278.215 866.818 277.945 866.818 277.645V275.676C866.818 275.285 866.699 274.988 866.461 274.785C866.227 274.578 865.873 274.475 865.4 274.475C865.021 274.475 864.711 274.543 864.469 274.68C864.227 274.812 864.064 275.002 863.982 275.248L863.977 275.266H862.957L862.963 275.23C863.018 274.898 863.154 274.609 863.373 274.363C863.596 274.113 863.883 273.92 864.234 273.783C864.586 273.643 864.986 273.572 865.436 273.572C865.951 273.572 866.387 273.656 866.742 273.824C867.102 273.992 867.373 274.234 867.557 274.551C867.744 274.863 867.838 275.238 867.838 275.676V280H866.818V279.068H866.725C866.592 279.291 866.43 279.48 866.238 279.637C866.051 279.793 865.838 279.912 865.6 279.994C865.361 280.072 865.1 280.111 864.814 280.111ZM869.701 282.109V273.684H870.721V274.691H870.814C870.943 274.457 871.105 274.258 871.301 274.094C871.496 273.926 871.719 273.797 871.969 273.707C872.219 273.617 872.49 273.572 872.783 273.572C873.318 273.572 873.783 273.709 874.178 273.982C874.576 274.252 874.885 274.631 875.104 275.119C875.322 275.607 875.432 276.18 875.432 276.836V276.848C875.432 277.508 875.322 278.082 875.104 278.57C874.885 279.059 874.576 279.438 874.178 279.707C873.783 279.977 873.318 280.111 872.783 280.111C872.494 280.111 872.221 280.066 871.963 279.977C871.709 279.883 871.482 279.754 871.283 279.59C871.088 279.426 870.932 279.23 870.814 279.004H870.721V282.109H869.701ZM872.549 279.209C872.936 279.209 873.266 279.115 873.539 278.928C873.812 278.736 874.021 278.465 874.166 278.113C874.314 277.758 874.389 277.336 874.389 276.848V276.836C874.389 276.344 874.314 275.922 874.166 275.57C874.021 275.219 873.812 274.949 873.539 274.762C873.266 274.57 872.936 274.475 872.549 274.475C872.166 274.475 871.836 274.57 871.559 274.762C871.281 274.953 871.068 275.225 870.92 275.576C870.771 275.928 870.697 276.348 870.697 276.836V276.848C870.697 277.332 870.771 277.752 870.92 278.107C871.068 278.459 871.281 278.73 871.559 278.922C871.836 279.113 872.166 279.209 872.549 279.209ZM879.193 280.111C878.725 280.111 878.311 280.041 877.951 279.9C877.592 279.756 877.303 279.555 877.084 279.297C876.869 279.039 876.742 278.736 876.703 278.389H877.746C877.832 278.65 878 278.861 878.25 279.021C878.5 279.182 878.826 279.262 879.229 279.262C879.514 279.262 879.764 279.221 879.979 279.139C880.197 279.053 880.369 278.938 880.494 278.793C880.619 278.645 880.682 278.475 880.682 278.283V278.271C880.682 278.057 880.596 277.875 880.424 277.727C880.252 277.574 879.971 277.451 879.58 277.357L878.602 277.123C878.207 277.029 877.883 276.908 877.629 276.76C877.375 276.607 877.188 276.422 877.066 276.203C876.945 275.98 876.885 275.719 876.885 275.418V275.412C876.885 275.061 876.986 274.746 877.189 274.469C877.396 274.191 877.678 273.973 878.033 273.812C878.389 273.652 878.789 273.572 879.234 273.572C879.676 273.572 880.066 273.643 880.406 273.783C880.75 273.92 881.025 274.115 881.232 274.369C881.443 274.623 881.572 274.922 881.619 275.266H880.617C880.551 275.016 880.398 274.812 880.16 274.656C879.922 274.5 879.611 274.422 879.229 274.422C878.979 274.422 878.756 274.463 878.561 274.545C878.365 274.623 878.211 274.732 878.098 274.873C877.984 275.014 877.928 275.178 877.928 275.365V275.377C877.928 275.518 877.965 275.643 878.039 275.752C878.113 275.861 878.229 275.957 878.385 276.039C878.541 276.121 878.742 276.193 878.988 276.256L879.961 276.49C880.555 276.635 880.996 276.842 881.285 277.111C881.578 277.381 881.725 277.742 881.725 278.195V278.207C881.725 278.582 881.613 278.914 881.391 279.203C881.168 279.488 880.865 279.711 880.482 279.871C880.104 280.031 879.674 280.111 879.193 280.111Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M1018.21 280L1021.33 271.545H1022.14V272.91H1021.81L1019.32 280H1018.21ZM1019.63 277.58L1019.96 276.684H1023.78L1024.1 277.58H1019.63ZM1024.38 280L1021.9 272.91V271.545H1022.38L1025.49 280H1024.38ZM1026.85 282.109V273.684H1027.87V274.691H1027.96C1028.09 274.457 1028.25 274.258 1028.45 274.094C1028.64 273.926 1028.86 273.797 1029.11 273.707C1029.36 273.617 1029.63 273.572 1029.93 273.572C1030.46 273.572 1030.93 273.709 1031.32 273.982C1031.72 274.252 1032.03 274.631 1032.25 275.119C1032.47 275.607 1032.58 276.18 1032.58 276.836V276.848C1032.58 277.508 1032.47 278.082 1032.25 278.57C1032.03 279.059 1031.72 279.438 1031.32 279.707C1030.93 279.977 1030.46 280.111 1029.93 280.111C1029.64 280.111 1029.37 280.066 1029.11 279.977C1028.85 279.883 1028.63 279.754 1028.43 279.59C1028.23 279.426 1028.08 279.23 1027.96 279.004H1027.87V282.109H1026.85ZM1029.69 279.209C1030.08 279.209 1030.41 279.115 1030.68 278.928C1030.96 278.736 1031.17 278.465 1031.31 278.113C1031.46 277.758 1031.53 277.336 1031.53 276.848V276.836C1031.53 276.344 1031.46 275.922 1031.31 275.57C1031.17 275.219 1030.96 274.949 1030.68 274.762C1030.41 274.57 1030.08 274.475 1029.69 274.475C1029.31 274.475 1028.98 274.57 1028.7 274.762C1028.43 274.953 1028.21 275.225 1028.06 275.576C1027.92 275.928 1027.84 276.348 1027.84 276.836V276.848C1027.84 277.332 1027.92 277.752 1028.06 278.107C1028.21 278.459 1028.43 278.73 1028.7 278.922C1028.98 279.113 1029.31 279.209 1029.69 279.209ZM1034.17 282.109V273.684H1035.19V274.691H1035.28C1035.41 274.457 1035.57 274.258 1035.77 274.094C1035.96 273.926 1036.19 273.797 1036.44 273.707C1036.69 273.617 1036.96 273.572 1037.25 273.572C1037.79 273.572 1038.25 273.709 1038.65 273.982C1039.04 274.252 1039.35 274.631 1039.57 275.119C1039.79 275.607 1039.9 276.18 1039.9 276.836V276.848C1039.9 277.508 1039.79 278.082 1039.57 278.57C1039.35 279.059 1039.04 279.438 1038.65 279.707C1038.25 279.977 1037.79 280.111 1037.25 280.111C1036.96 280.111 1036.69 280.066 1036.43 279.977C1036.18 279.883 1035.95 279.754 1035.75 279.59C1035.56 279.426 1035.4 279.23 1035.28 279.004H1035.19V282.109H1034.17ZM1037.02 279.209C1037.4 279.209 1037.73 279.115 1038.01 278.928C1038.28 278.736 1038.49 278.465 1038.63 278.113C1038.78 277.758 1038.86 277.336 1038.86 276.848V276.836C1038.86 276.344 1038.78 275.922 1038.63 275.57C1038.49 275.219 1038.28 274.949 1038.01 274.762C1037.73 274.57 1037.4 274.475 1037.02 274.475C1036.63 274.475 1036.3 274.57 1036.03 274.762C1035.75 274.953 1035.54 275.225 1035.39 275.576C1035.24 275.928 1035.17 276.348 1035.17 276.836V276.848C1035.17 277.332 1035.24 277.752 1035.39 278.107C1035.54 278.459 1035.75 278.73 1036.03 278.922C1036.3 279.113 1036.63 279.209 1037.02 279.209ZM1047.77 280.199C1047.15 280.199 1046.61 280.1 1046.15 279.9C1045.7 279.697 1045.33 279.42 1045.06 279.068C1044.8 278.713 1044.64 278.307 1044.6 277.85L1044.59 277.785H1045.65L1045.65 277.85C1045.68 278.131 1045.79 278.375 1045.98 278.582C1046.17 278.785 1046.42 278.943 1046.74 279.057C1047.06 279.17 1047.42 279.227 1047.83 279.227C1048.21 279.227 1048.55 279.166 1048.85 279.045C1049.15 278.92 1049.38 278.748 1049.56 278.529C1049.73 278.311 1049.81 278.059 1049.81 277.773V277.768C1049.81 277.416 1049.69 277.121 1049.43 276.883C1049.17 276.641 1048.75 276.455 1048.17 276.326L1047.23 276.121C1046.38 275.934 1045.77 275.645 1045.38 275.254C1045 274.859 1044.8 274.355 1044.8 273.742V273.736C1044.81 273.268 1044.94 272.854 1045.19 272.494C1045.44 272.135 1045.79 271.854 1046.23 271.65C1046.68 271.447 1047.2 271.346 1047.78 271.346C1048.34 271.346 1048.84 271.447 1049.28 271.65C1049.71 271.85 1050.05 272.119 1050.31 272.459C1050.56 272.799 1050.71 273.18 1050.73 273.602L1050.74 273.684H1049.69L1049.67 273.607C1049.63 273.357 1049.53 273.137 1049.37 272.945C1049.21 272.75 1048.99 272.596 1048.71 272.482C1048.44 272.369 1048.12 272.314 1047.75 272.318C1047.4 272.318 1047.08 272.373 1046.8 272.482C1046.52 272.592 1046.3 272.75 1046.13 272.957C1045.96 273.16 1045.88 273.41 1045.88 273.707V273.713C1045.88 274.049 1046.01 274.332 1046.26 274.562C1046.51 274.793 1046.92 274.971 1047.49 275.096L1048.43 275.307C1049.02 275.436 1049.5 275.604 1049.86 275.811C1050.21 276.018 1050.48 276.271 1050.64 276.572C1050.81 276.869 1050.89 277.221 1050.89 277.627V277.633C1050.89 278.16 1050.76 278.615 1050.51 278.998C1050.25 279.381 1049.88 279.678 1049.42 279.889C1048.95 280.096 1048.4 280.199 1047.77 280.199ZM1054.77 280.047C1054.12 280.047 1053.65 279.916 1053.35 279.654C1053.06 279.393 1052.92 278.961 1052.92 278.359V274.527H1051.92V273.684H1052.92V272.049H1053.97V273.684H1055.36V274.527H1053.97V278.102C1053.97 278.473 1054.04 278.74 1054.19 278.904C1054.33 279.064 1054.56 279.145 1054.89 279.145C1054.98 279.145 1055.05 279.143 1055.12 279.139C1055.18 279.135 1055.26 279.129 1055.36 279.121V279.988C1055.26 280.004 1055.16 280.018 1055.06 280.029C1054.97 280.041 1054.87 280.047 1054.77 280.047ZM1059.39 280.111C1058.8 280.111 1058.28 279.98 1057.84 279.719C1057.41 279.453 1057.07 279.076 1056.83 278.588C1056.6 278.1 1056.48 277.52 1056.48 276.848V276.836C1056.48 276.16 1056.6 275.578 1056.83 275.09C1057.07 274.602 1057.41 274.227 1057.84 273.965C1058.28 273.703 1058.8 273.572 1059.39 273.572C1060 273.572 1060.51 273.703 1060.95 273.965C1061.38 274.227 1061.71 274.602 1061.95 275.09C1062.19 275.578 1062.31 276.16 1062.31 276.836V276.848C1062.31 277.52 1062.19 278.1 1061.95 278.588C1061.71 279.076 1061.38 279.453 1060.95 279.719C1060.51 279.98 1060 280.111 1059.39 280.111ZM1059.39 279.209C1059.79 279.209 1060.13 279.115 1060.41 278.928C1060.69 278.74 1060.9 278.471 1061.04 278.119C1061.19 277.768 1061.26 277.344 1061.26 276.848V276.836C1061.26 276.336 1061.19 275.91 1061.04 275.559C1060.9 275.207 1060.69 274.939 1060.41 274.756C1060.13 274.568 1059.79 274.475 1059.39 274.475C1059 274.475 1058.66 274.568 1058.38 274.756C1058.1 274.939 1057.89 275.207 1057.74 275.559C1057.6 275.91 1057.53 276.336 1057.53 276.836V276.848C1057.53 277.344 1057.6 277.768 1057.74 278.119C1057.89 278.471 1058.1 278.74 1058.38 278.928C1058.66 279.115 1059 279.209 1059.39 279.209ZM1063.89 280V273.684H1064.91V274.621H1065C1065.12 274.289 1065.33 274.031 1065.62 273.848C1065.91 273.664 1066.26 273.572 1066.69 273.572C1066.79 273.572 1066.88 273.578 1066.98 273.59C1067.07 273.598 1067.15 273.605 1067.2 273.613V274.604C1067.09 274.584 1066.99 274.57 1066.89 274.562C1066.79 274.551 1066.69 274.545 1066.57 274.545C1066.25 274.545 1065.96 274.609 1065.71 274.738C1065.46 274.867 1065.26 275.047 1065.12 275.277C1064.98 275.508 1064.91 275.777 1064.91 276.086V280H1063.89ZM1070.86 280.111C1070.26 280.111 1069.74 279.979 1069.31 279.713C1068.88 279.447 1068.55 279.072 1068.31 278.588C1068.08 278.1 1067.97 277.525 1067.97 276.865V276.859C1067.97 276.207 1068.08 275.635 1068.31 275.143C1068.55 274.65 1068.88 274.266 1069.3 273.988C1069.73 273.711 1070.23 273.572 1070.8 273.572C1071.37 273.572 1071.86 273.705 1072.27 273.971C1072.69 274.236 1073 274.607 1073.22 275.084C1073.45 275.557 1073.56 276.107 1073.56 276.736V277.135H1068.49V276.32H1073.04L1072.53 277.064V276.66C1072.53 276.164 1072.46 275.756 1072.31 275.436C1072.16 275.115 1071.96 274.877 1071.69 274.721C1071.43 274.561 1071.13 274.48 1070.79 274.48C1070.45 274.48 1070.15 274.564 1069.88 274.732C1069.61 274.896 1069.4 275.141 1069.24 275.465C1069.09 275.789 1069.01 276.188 1069.01 276.66V277.064C1069.01 277.514 1069.09 277.898 1069.24 278.219C1069.39 278.535 1069.61 278.779 1069.89 278.951C1070.17 279.119 1070.5 279.203 1070.88 279.203C1071.17 279.203 1071.42 279.164 1071.63 279.086C1071.84 279.008 1072.01 278.908 1072.15 278.787C1072.29 278.666 1072.38 278.543 1072.44 278.418L1072.46 278.365H1073.48L1073.47 278.412C1073.41 278.627 1073.32 278.836 1073.18 279.039C1073.04 279.238 1072.86 279.42 1072.64 279.584C1072.42 279.744 1072.16 279.873 1071.86 279.971C1071.57 280.064 1071.23 280.111 1070.86 280.111Z"
                              :fill="proto.systemColor"></path>
                            <circle cx="589" cy="698" r="4" :fill="proto.systemColor"></circle>
                            <circle opacity="0.3" cx="605" cy="698" r="4" :fill="proto.systemColor"></circle>
                          </g>
                          <defs>
                            <filter id="filter0_b_3_3531" x="260.5" y="671" width="674" height="194"
                              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                              <feGaussianBlur in="BackgroundImageFix" stdDeviation="25"></feGaussianBlur>
                              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3_3531">
                              </feComposite>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3_3531"
                                result="shape">
                              </feBlend>
                            </filter>
                            <clipPath id="clip0_3_3531">
                              <rect width="1194" height="1194" :fill="proto.systemColor"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                        <template v-if="!proto.vertical">
                          <img style="position: absolute;top: 0px;left: 0px;" src="/image/ipad-app-1.png"></img>
                        </template>

                        <template v-if="proto.vertical">
                          <div
                            style="width: 834px;height: 500px;overflow: hidden;position: absolute;top: 0px;left: 0px;">
                            <img style="" src="/image/ipad-app-1.png"></img>
                          </div>
                          <div
                            style="width: 834px;height: 500px;overflow: hidden;position: absolute;left: 0px;bottom: 0px;">
                            <img style="position: absolute;bottom: 0px;left: -180px;" src="/image/ipad-app-1.png"></img>
                          </div>
                        </template>

                      </template>

                      <template v-if="proto.screenType == 'lockScreen'">
                        <div v-if="['ipadType'].includes(proto.type)" class="date-time"
                          :style="{ width: proto.vertical ? '100%' : '1194px', top: proto.vertical ? '128px' : '87px' }"
                          style="position: absolute;left:0px;display: flex;flex-direction: column;align-items: center; transform: translate(0, 0) rotate(0) skew(0) skewY(0) scaleX(1.28) scaleY(1.28);">
                          <div class="date" style="font-size: 22px;white-space: nowrap;"
                            :style="{ color: proto.dateTimeColor }">
                            {{
                              formatedDate(proto.selectedDate) }}</div>
                          <div class="time" :style="timeStyle(proto)">{{
                            proto.selectedTime.getHours() }}<span style="position: relative;top: -7.85714px;">:</span>{{
                              formatTimeMinutes(proto.selectedTime.getMinutes()) }}
                          </div>
                        </div>

                        <div v-if="['macType'].includes(proto.type)" class="date-time"
                          style="width:100%;top:463px;;position: absolute;left:0px;display: flex;flex-direction: column;align-items: center; transform: translate(0, 0) rotate(0) skew(0) skewY(0) scaleX(4.3) scaleY(4.3);">
                          <div class="date" style="font-size: 22px;white-space: nowrap;"
                            :style="{ color: proto.dateTimeColor }">
                            {{
                              formatedDate(proto.selectedDate) }}</div>
                          <div class="time" :style="timeStyle(proto)">{{
                            proto.selectedTime.getHours() }}<span style="position: relative;top: -7.85714px;">:</span>{{
                              formatTimeMinutes(proto.selectedTime.getMinutes()) }}
                          </div>
                        </div>

                        <svg v-if="['ipadType'].includes(proto.type)" style="position: absolute; bottom: 0px;" width="400"
                          height="20" viewBox="0 0 400 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="315" height="5.5" rx="2.75" transform="matrix(-1 0 0 1 358 7)"
                            :fill="proto.systemColor">
                          </rect>
                        </svg>
                      </template>
                    </div>

                  </div>

                  <!-- iphoneType界面的组件 -->
                  <template v-if="proto.type == 'iphoneType'">
                    <div v-if="['聊天'].includes(proto.screenType)" class="paper" :style="proto.paperChatStyle">
                      <img ref="paperImage" class="image" :src="paperUrl"></img>
                    </div>

                    <div v-if="['lockScreen', 'desktopScreen', '聊天'].includes(proto.screenType)" class="system">

                      <div v-if="['desktopScreen', '聊天'].includes(proto.screenType)" class="time"
                        :style="{ color: proto.screenType == '聊天' ? '#000000' : proto.systemColor }">{{
                          proto.selectedTime.getHours() }}<span style="position: relative;top: -1.32143px;">:</span>{{
                          formatTimeMinutes(proto.selectedTime.getMinutes()) }}
                      </div>

                      <svg width="390" height="53" viewBox="0 0 390 53" transform="translate(-6 -5)"
                        :fill="proto.screenType == '聊天' ? '#000000' : proto.systemColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.35" x="337.172" y="22.5" width="24" height="12" rx="3" stroke="#25E11E"
                          fill="transparent"></rect>
                        <path opacity="0.4"
                          d="M362.672 26.666V30.666C363.477 30.3272 364 29.5391 364 28.666C364 27.7929 363.477 27.0048 362.672 26.666Z">
                        </path>
                        <rect x="338.672" y="24" width="21" height="9" rx="1.33333"></rect>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M320.839 25.0666C323.306 25.0667 325.678 25.9643 327.466 27.5737C327.6 27.698 327.816 27.6964 327.948 27.5702L329.235 26.3404C329.302 26.2764 329.339 26.1897 329.339 26.0994C329.338 26.0092 329.3 25.9229 329.232 25.8597C324.54 21.6015 317.138 21.6015 312.446 25.8597C312.378 25.9229 312.34 26.0092 312.339 26.0994C312.338 26.1896 312.376 26.2763 312.443 26.3404L313.73 27.5702C313.862 27.6966 314.078 27.6981 314.212 27.5737C316 25.9641 318.373 25.0666 320.839 25.0666ZM320.838 29.1745C322.184 29.1744 323.482 29.6725 324.48 30.5721C324.614 30.6997 324.827 30.697 324.959 30.5658L326.235 29.2816C326.303 29.2143 326.34 29.1229 326.339 29.028C326.338 28.933 326.299 28.8424 326.23 28.7764C323.192 25.9625 318.486 25.9625 315.448 28.7764C315.379 28.8424 315.34 28.933 315.339 29.028C315.338 29.123 315.375 29.2144 315.443 29.2816L316.719 30.5658C316.851 30.697 317.063 30.6997 317.198 30.5721C318.195 29.6731 319.492 29.1751 320.838 29.1745ZM323.339 31.8937C323.341 31.9962 323.304 32.0951 323.237 32.1669L321.079 34.5563C321.015 34.6265 320.929 34.666 320.839 34.666C320.749 34.666 320.663 34.6265 320.599 34.5563L318.44 32.1669C318.374 32.095 318.337 31.9961 318.339 31.8936C318.341 31.791 318.381 31.6939 318.451 31.6252C319.829 30.3463 321.849 30.3463 323.227 31.6252C323.296 31.694 323.337 31.7911 323.339 31.8937Z">
                        </path>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M304.939 23.791C304.939 23.1697 304.461 22.666 303.872 22.666H302.805C302.216 22.666 301.739 23.1697 301.739 23.791V33.541C301.739 34.1623 302.216 34.666 302.805 34.666H303.872C304.461 34.666 304.939 34.1623 304.939 33.541V23.791ZM297.505 25.066H298.572C299.161 25.066 299.639 25.5818 299.639 26.218V33.514C299.639 34.1502 299.161 34.666 298.572 34.666H297.505C296.916 34.666 296.439 34.1502 296.439 33.514V26.218C296.439 25.5818 296.916 25.066 297.505 25.066ZM293.172 27.666H292.105C291.516 27.666 291.039 28.1884 291.039 28.8327V33.4993C291.039 34.1437 291.516 34.666 292.105 34.666H293.172C293.761 34.666 294.239 34.1437 294.239 33.4993V28.8327C294.239 28.1884 293.761 27.666 293.172 27.666ZM287.872 30.066H286.805C286.216 30.066 285.739 30.5809 285.739 31.216V33.516C285.739 34.1511 286.216 34.666 286.805 34.666H287.872C288.461 34.666 288.939 34.1511 288.939 33.516V31.216C288.939 30.5809 288.461 30.066 287.872 30.066Z">
                        </path>
                      </svg>
                    </div>

                    <div class="desktop" v-if="proto.screenType == 'desktopScreen'">
                      <template v-if="desktopRadio == 1">
                        <svg style="position: absolute;" width="390" height="773" viewBox="0 0 390 773" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g filter="url(#filter0_b_508_2128)">
                            <rect x="13" y="679" width="366" height="94" rx="35" fill="#F5F5F5" fill-opacity="0.6">
                            </rect>
                          </g>
                          <g filter="url(#filter1_b_508_2128)">
                            <path
                              d="M37.7189 281.432H41.2709C43.3109 281.432 44.3309 282.296 44.3309 284.036C44.3309 285.788 43.2989 286.664 41.2469 286.664H39.0269V290H37.7189V281.432ZM39.0269 282.548V285.548H41.1629C41.8109 285.548 42.2789 285.428 42.5789 285.188C42.8669 284.948 43.0229 284.564 43.0229 284.036C43.0229 283.508 42.8669 283.124 42.5669 282.908C42.2669 282.668 41.7989 282.548 41.1629 282.548H39.0269ZM48.283 283.628C49.219 283.628 49.975 283.94 50.539 284.564C51.091 285.176 51.379 285.956 51.379 286.904C51.379 287.84 51.103 288.62 50.551 289.22C49.975 289.844 49.219 290.168 48.283 290.168C47.347 290.168 46.591 289.844 46.015 289.22C45.463 288.62 45.187 287.84 45.187 286.904C45.187 285.956 45.463 285.176 46.027 284.564C46.591 283.94 47.347 283.628 48.283 283.628ZM48.283 284.672C47.695 284.672 47.239 284.9 46.915 285.368C46.627 285.764 46.495 286.28 46.495 286.904C46.495 287.528 46.627 288.032 46.915 288.428C47.239 288.884 47.695 289.124 48.283 289.124C48.871 289.124 49.327 288.884 49.663 288.428C49.951 288.02 50.095 287.516 50.095 286.904C50.095 286.28 49.951 285.764 49.663 285.368C49.327 284.9 48.871 284.672 48.283 284.672ZM57.0512 281.264H58.3232V290H57.1352V289.256C56.7032 289.856 56.0552 290.168 55.2152 290.168C54.3032 290.168 53.5832 289.844 53.0672 289.196C52.5872 288.596 52.3472 287.816 52.3472 286.868C52.3472 285.956 52.5752 285.2 53.0552 284.6C53.5592 283.952 54.2672 283.628 55.1552 283.628C55.9112 283.628 56.5472 283.988 57.0512 284.72V281.264ZM55.4432 284.66C54.8192 284.66 54.3512 284.864 54.0512 285.296C53.7872 285.656 53.6552 286.184 53.6552 286.868C53.6552 287.552 53.7752 288.08 54.0272 288.464C54.3152 288.908 54.7832 289.136 55.4072 289.136C55.9592 289.136 56.3792 288.908 56.6912 288.476C56.9552 288.08 57.0872 287.576 57.0872 286.952V286.844C57.0872 286.172 56.9192 285.632 56.6072 285.224C56.2952 284.84 55.9112 284.66 55.4432 284.66ZM62.5191 283.628C63.3111 283.628 63.9471 283.808 64.4271 284.168C64.9071 284.552 65.2191 285.128 65.3391 285.896H64.0791C63.9951 285.476 63.8271 285.164 63.5631 284.972C63.2991 284.768 62.9511 284.672 62.5191 284.672C61.9911 284.672 61.5831 284.864 61.2831 285.26C60.9711 285.644 60.8271 286.196 60.8271 286.892C60.8271 287.588 60.9711 288.14 61.2711 288.536C61.5471 288.92 61.9551 289.124 62.5071 289.124C63.4551 289.124 63.9831 288.644 64.1031 287.708H65.3631C65.2191 288.536 64.8951 289.16 64.4151 289.568C63.9351 289.964 63.2871 290.168 62.4951 290.168C61.5471 290.168 60.8151 289.856 60.2871 289.232C59.7711 288.632 59.5191 287.864 59.5191 286.904C59.5191 285.968 59.7711 285.2 60.2751 284.6C60.8151 283.952 61.5591 283.628 62.5191 283.628ZM69.2465 283.628C70.1585 283.628 70.8305 283.856 71.2625 284.312C71.6345 284.708 71.8265 285.284 71.8265 286.04V290H70.6505V289.124C70.4105 289.436 70.1105 289.688 69.7505 289.868C69.3425 290.06 68.8625 290.168 68.3105 290.168C67.6625 290.168 67.1585 290 66.7985 289.676C66.4025 289.352 66.2105 288.932 66.2105 288.416C66.2105 287.72 66.4865 287.18 67.0385 286.808C67.5425 286.448 68.2625 286.268 69.1745 286.244L70.5665 286.208V285.956C70.5665 285.092 70.0985 284.66 69.1625 284.66C68.7665 284.66 68.4425 284.732 68.2025 284.876C67.9145 285.044 67.7345 285.296 67.6625 285.644L66.4025 285.536C66.5345 284.864 66.8705 284.36 67.3985 284.048C67.8545 283.76 68.4785 283.628 69.2465 283.628ZM70.5665 287.132L69.2585 287.168C68.0945 287.192 67.5185 287.6 67.5185 288.368C67.5185 288.608 67.6145 288.8 67.8185 288.956C68.0105 289.112 68.2745 289.196 68.5985 289.196C69.1385 289.196 69.5945 289.028 69.9785 288.704C70.3625 288.38 70.5665 287.972 70.5665 287.492V287.132ZM75.5985 283.628C77.2065 283.628 78.0945 284.276 78.2385 285.584H77.0025C76.9065 285.248 76.7625 285.02 76.5585 284.888C76.3425 284.744 76.0065 284.672 75.5745 284.672C75.1905 284.672 74.9025 284.72 74.7105 284.84C74.4825 284.96 74.3745 285.152 74.3745 285.392C74.3745 285.608 74.5425 285.788 74.8785 285.944C75.0945 286.04 75.5025 286.16 76.1265 286.316C76.8345 286.484 77.3625 286.688 77.6985 286.904C78.1905 287.216 78.4425 287.648 78.4425 288.2C78.4425 289.508 77.5185 290.168 75.6825 290.168C73.9785 290.168 73.0665 289.436 72.9225 287.996H74.1705C74.2425 288.416 74.3985 288.716 74.6145 288.884C74.8305 289.04 75.1665 289.124 75.6465 289.124C76.6305 289.124 77.1345 288.836 77.1345 288.284C77.1345 287.984 76.9425 287.744 76.5825 287.576C76.3905 287.48 75.9705 287.36 75.3345 287.216C74.6025 287.048 74.0865 286.868 73.7985 286.676C73.3185 286.376 73.0785 285.956 73.0785 285.428C73.0785 284.864 73.3065 284.42 73.7745 284.108C74.2425 283.784 74.8545 283.628 75.5985 283.628ZM81.4009 281.792V283.796H82.8169V284.852H81.4009V288.452C81.4009 288.62 81.4369 288.74 81.5089 288.824C81.5809 288.896 81.6889 288.944 81.8449 288.944H82.6609V290H81.6409C81.1129 290 80.7169 289.856 80.4769 289.58C80.2369 289.316 80.1289 288.944 80.1289 288.452V284.852H78.9769V283.796H80.1289V282.32L81.4009 281.792Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M137.721 281.432H143.541V282.548H139.029V285.044H143.289V286.16H139.029V290H137.721V281.432ZM145.474 281.312C145.726 281.312 145.942 281.384 146.11 281.552C146.278 281.708 146.362 281.912 146.362 282.164C146.362 282.416 146.266 282.62 146.098 282.788C145.93 282.944 145.714 283.028 145.474 283.028C145.222 283.028 145.018 282.944 144.85 282.788C144.682 282.62 144.598 282.404 144.598 282.164C144.598 281.912 144.682 281.708 144.85 281.552C145.018 281.384 145.222 281.312 145.474 281.312ZM144.838 283.796H146.11V290H144.838V283.796ZM147.975 281.264H149.247V290H147.975V281.264ZM153.459 283.628C154.467 283.628 155.247 283.964 155.775 284.66C156.255 285.284 156.507 286.148 156.519 287.252H151.815C151.863 287.852 152.019 288.32 152.307 288.644C152.595 288.956 152.991 289.124 153.495 289.124C153.939 289.124 154.299 289.016 154.575 288.812C154.791 288.644 154.971 288.368 155.139 288.008H156.411C156.267 288.584 155.991 289.076 155.559 289.46C155.019 289.928 154.335 290.168 153.507 290.168C152.595 290.168 151.863 289.88 151.335 289.316C150.759 288.716 150.471 287.912 150.471 286.892C150.471 285.968 150.735 285.2 151.287 284.576C151.815 283.94 152.547 283.628 153.459 283.628ZM153.495 284.672C153.015 284.672 152.643 284.804 152.355 285.092C152.091 285.368 151.911 285.764 151.839 286.292H155.187C155.067 285.212 154.503 284.672 153.495 284.672ZM159.921 283.628C161.529 283.628 162.417 284.276 162.561 285.584H161.325C161.229 285.248 161.085 285.02 160.881 284.888C160.665 284.744 160.329 284.672 159.897 284.672C159.513 284.672 159.225 284.72 159.033 284.84C158.805 284.96 158.697 285.152 158.697 285.392C158.697 285.608 158.865 285.788 159.201 285.944C159.417 286.04 159.825 286.16 160.449 286.316C161.157 286.484 161.685 286.688 162.021 286.904C162.513 287.216 162.765 287.648 162.765 288.2C162.765 289.508 161.841 290.168 160.005 290.168C158.301 290.168 157.389 289.436 157.245 287.996H158.493C158.565 288.416 158.721 288.716 158.937 288.884C159.153 289.04 159.489 289.124 159.969 289.124C160.953 289.124 161.457 288.836 161.457 288.284C161.457 287.984 161.265 287.744 160.905 287.576C160.713 287.48 160.293 287.36 159.657 287.216C158.925 287.048 158.409 286.868 158.121 286.676C157.641 286.376 157.401 285.956 157.401 285.428C157.401 284.864 157.629 284.42 158.097 284.108C158.565 283.784 159.177 283.628 159.921 283.628Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M224.223 281.432H225.543L229.923 287.804H229.971V281.432H231.279V290H230.007L225.579 283.556H225.531V290H224.223V281.432ZM235.701 283.628C236.637 283.628 237.393 283.94 237.957 284.564C238.509 285.176 238.797 285.956 238.797 286.904C238.797 287.84 238.521 288.62 237.969 289.22C237.393 289.844 236.637 290.168 235.701 290.168C234.765 290.168 234.009 289.844 233.433 289.22C232.881 288.62 232.605 287.84 232.605 286.904C232.605 285.956 232.881 285.176 233.445 284.564C234.009 283.94 234.765 283.628 235.701 283.628ZM235.701 284.672C235.113 284.672 234.657 284.9 234.333 285.368C234.045 285.764 233.913 286.28 233.913 286.904C233.913 287.528 234.045 288.032 234.333 288.428C234.657 288.884 235.113 289.124 235.701 289.124C236.289 289.124 236.745 288.884 237.081 288.428C237.369 288.02 237.513 287.516 237.513 286.904C237.513 286.28 237.369 285.764 237.081 285.368C236.745 284.9 236.289 284.672 235.701 284.672ZM241.889 281.792V283.796H243.305V284.852H241.889V288.452C241.889 288.62 241.925 288.74 241.997 288.824C242.069 288.896 242.177 288.944 242.333 288.944H243.149V290H242.129C241.601 290 241.205 289.856 240.965 289.58C240.725 289.316 240.617 288.944 240.617 288.452V284.852H239.465V283.796H240.617V282.32L241.889 281.792ZM246.957 283.628C247.965 283.628 248.745 283.964 249.273 284.66C249.753 285.284 250.005 286.148 250.017 287.252H245.313C245.361 287.852 245.517 288.32 245.805 288.644C246.093 288.956 246.489 289.124 246.993 289.124C247.437 289.124 247.797 289.016 248.073 288.812C248.289 288.644 248.469 288.368 248.637 288.008H249.909C249.765 288.584 249.489 289.076 249.057 289.46C248.517 289.928 247.833 290.168 247.005 290.168C246.093 290.168 245.361 289.88 244.833 289.316C244.257 288.716 243.969 287.912 243.969 286.892C243.969 285.968 244.233 285.2 244.785 284.576C245.313 283.94 246.045 283.628 246.957 283.628ZM246.993 284.672C246.513 284.672 246.141 284.804 245.853 285.092C245.589 285.368 245.409 285.764 245.337 286.292H248.685C248.565 285.212 248.001 284.672 246.993 284.672ZM253.419 283.628C255.027 283.628 255.915 284.276 256.059 285.584H254.823C254.727 285.248 254.583 285.02 254.379 284.888C254.163 284.744 253.827 284.672 253.395 284.672C253.011 284.672 252.723 284.72 252.531 284.84C252.303 284.96 252.195 285.152 252.195 285.392C252.195 285.608 252.363 285.788 252.699 285.944C252.915 286.04 253.323 286.16 253.947 286.316C254.655 286.484 255.183 286.688 255.519 286.904C256.011 287.216 256.263 287.648 256.263 288.2C256.263 289.508 255.339 290.168 253.503 290.168C251.799 290.168 250.887 289.436 250.743 287.996H251.991C252.063 288.416 252.219 288.716 252.435 288.884C252.651 289.04 252.987 289.124 253.467 289.124C254.451 289.124 254.955 288.836 254.955 288.284C254.955 287.984 254.763 287.744 254.403 287.576C254.211 287.48 253.791 287.36 253.155 287.216C252.423 287.048 251.907 286.868 251.619 286.676C251.139 286.376 250.899 285.956 250.899 285.428C250.899 284.864 251.127 284.42 251.595 284.108C252.063 283.784 252.675 283.628 253.419 283.628Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M312.547 281.432H313.855V285.044H318.343V281.432H319.651V290H318.343V286.16H313.855V290H312.547V281.432ZM323.844 283.628C324.852 283.628 325.632 283.964 326.16 284.66C326.64 285.284 326.892 286.148 326.904 287.252H322.2C322.248 287.852 322.404 288.32 322.692 288.644C322.98 288.956 323.376 289.124 323.88 289.124C324.324 289.124 324.684 289.016 324.96 288.812C325.176 288.644 325.356 288.368 325.524 288.008H326.796C326.652 288.584 326.376 289.076 325.944 289.46C325.404 289.928 324.72 290.168 323.892 290.168C322.98 290.168 322.248 289.88 321.72 289.316C321.144 288.716 320.856 287.912 320.856 286.892C320.856 285.968 321.12 285.2 321.672 284.576C322.2 283.94 322.932 283.628 323.844 283.628ZM323.88 284.672C323.4 284.672 323.028 284.804 322.74 285.092C322.476 285.368 322.296 285.764 322.224 286.292H325.572C325.452 285.212 324.888 284.672 323.88 284.672ZM330.786 283.628C331.698 283.628 332.37 283.856 332.802 284.312C333.174 284.708 333.366 285.284 333.366 286.04V290H332.19V289.124C331.95 289.436 331.65 289.688 331.29 289.868C330.882 290.06 330.402 290.168 329.85 290.168C329.202 290.168 328.698 290 328.338 289.676C327.942 289.352 327.75 288.932 327.75 288.416C327.75 287.72 328.026 287.18 328.578 286.808C329.082 286.448 329.802 286.268 330.714 286.244L332.106 286.208V285.956C332.106 285.092 331.638 284.66 330.702 284.66C330.306 284.66 329.982 284.732 329.742 284.876C329.454 285.044 329.274 285.296 329.202 285.644L327.942 285.536C328.074 284.864 328.41 284.36 328.938 284.048C329.394 283.76 330.018 283.628 330.786 283.628ZM332.106 287.132L330.798 287.168C329.634 287.192 329.058 287.6 329.058 288.368C329.058 288.608 329.154 288.8 329.358 288.956C329.55 289.112 329.814 289.196 330.138 289.196C330.678 289.196 331.134 289.028 331.518 288.704C331.902 288.38 332.106 287.972 332.106 287.492V287.132ZM334.966 281.264H336.238V290H334.966V281.264ZM339.706 281.792V283.796H341.122V284.852H339.706V288.452C339.706 288.62 339.742 288.74 339.814 288.824C339.886 288.896 339.994 288.944 340.15 288.944H340.966V290H339.946C339.418 290 339.022 289.856 338.782 289.58C338.542 289.316 338.434 288.944 338.434 288.452V284.852H337.282V283.796H338.434V282.32L339.706 281.792ZM342.146 281.264H343.418V284.672C343.646 284.312 343.934 284.036 344.282 283.868C344.594 283.7 344.942 283.628 345.338 283.628C346.082 283.628 346.646 283.844 347.03 284.288C347.39 284.708 347.57 285.332 347.57 286.148V290H346.298V286.364C346.298 285.812 346.178 285.404 345.962 285.116C345.722 284.816 345.35 284.672 344.87 284.672C344.438 284.672 344.09 284.84 343.826 285.188C343.55 285.536 343.418 285.98 343.418 286.52V290H342.146V281.264Z"
                              :fill="proto.systemColor"></path>
                          </g>
                          <g filter="url(#filter2_b_508_2128)">
                            <path
                              d="M219.206 85.264C220.202 85.264 221.03 85.516 221.678 86.044C222.302 86.548 222.686 87.244 222.818 88.108H221.546C221.402 87.532 221.126 87.1 220.718 86.824C220.31 86.548 219.806 86.416 219.182 86.416C218.258 86.416 217.562 86.728 217.094 87.364C216.65 87.94 216.434 88.732 216.434 89.728C216.434 90.76 216.65 91.552 217.082 92.116C217.538 92.716 218.246 93.016 219.206 93.016C219.83 93.016 220.358 92.86 220.766 92.548C221.198 92.212 221.498 91.708 221.666 91.036H222.938C222.746 92.032 222.302 92.812 221.594 93.376C220.934 93.904 220.142 94.168 219.218 94.168C217.814 94.168 216.758 93.712 216.05 92.824C215.426 92.056 215.126 91.024 215.126 89.728C215.126 88.456 215.438 87.424 216.086 86.62C216.806 85.708 217.838 85.264 219.206 85.264ZM226.94 87.628C227.852 87.628 228.524 87.856 228.956 88.312C229.328 88.708 229.52 89.284 229.52 90.04V94H228.344V93.124C228.104 93.436 227.804 93.688 227.444 93.868C227.036 94.06 226.556 94.168 226.004 94.168C225.356 94.168 224.852 94 224.492 93.676C224.096 93.352 223.904 92.932 223.904 92.416C223.904 91.72 224.18 91.18 224.732 90.808C225.236 90.448 225.956 90.268 226.868 90.244L228.26 90.208V89.956C228.26 89.092 227.792 88.66 226.856 88.66C226.46 88.66 226.136 88.732 225.896 88.876C225.608 89.044 225.428 89.296 225.356 89.644L224.096 89.536C224.228 88.864 224.564 88.36 225.092 88.048C225.548 87.76 226.172 87.628 226.94 87.628ZM228.26 91.132L226.952 91.168C225.788 91.192 225.212 91.6 225.212 92.368C225.212 92.608 225.308 92.8 225.512 92.956C225.704 93.112 225.968 93.196 226.292 93.196C226.832 93.196 227.288 93.028 227.672 92.704C228.056 92.38 228.26 91.972 228.26 91.492V91.132ZM231.12 85.264H232.392V94H231.12V85.264ZM236.604 87.628C237.612 87.628 238.392 87.964 238.92 88.66C239.4 89.284 239.652 90.148 239.664 91.252H234.96C235.008 91.852 235.164 92.32 235.452 92.644C235.74 92.956 236.136 93.124 236.64 93.124C237.084 93.124 237.444 93.016 237.72 92.812C237.936 92.644 238.116 92.368 238.284 92.008H239.556C239.412 92.584 239.136 93.076 238.704 93.46C238.164 93.928 237.48 94.168 236.652 94.168C235.74 94.168 235.008 93.88 234.48 93.316C233.904 92.716 233.616 91.912 233.616 90.892C233.616 89.968 233.88 89.2 234.432 88.576C234.96 87.94 235.692 87.628 236.604 87.628ZM236.64 88.672C236.16 88.672 235.788 88.804 235.5 89.092C235.236 89.368 235.056 89.764 234.984 90.292H238.332C238.212 89.212 237.648 88.672 236.64 88.672ZM243.893 87.628C245.429 87.628 246.209 88.468 246.209 90.172V94H244.937V90.28C244.937 89.224 244.445 88.696 243.485 88.696C243.125 88.696 242.801 88.816 242.537 89.08C242.249 89.368 242.069 89.764 242.021 90.268V94H240.749V87.796H242.021V88.564C242.261 88.252 242.537 88.024 242.849 87.868C243.161 87.7 243.509 87.628 243.893 87.628ZM252.127 85.264H253.399V94H252.211V93.256C251.779 93.856 251.131 94.168 250.291 94.168C249.379 94.168 248.659 93.844 248.143 93.196C247.663 92.596 247.423 91.816 247.423 90.868C247.423 89.956 247.651 89.2 248.131 88.6C248.635 87.952 249.343 87.628 250.231 87.628C250.987 87.628 251.623 87.988 252.127 88.72V85.264ZM250.519 88.66C249.895 88.66 249.427 88.864 249.127 89.296C248.863 89.656 248.731 90.184 248.731 90.868C248.731 91.552 248.851 92.08 249.103 92.464C249.391 92.908 249.859 93.136 250.483 93.136C251.035 93.136 251.455 92.908 251.767 92.476C252.031 92.08 252.163 91.576 252.163 90.952V90.844C252.163 90.172 251.995 89.632 251.683 89.224C251.371 88.84 250.987 88.66 250.519 88.66ZM257.463 87.628C258.471 87.628 259.251 87.964 259.779 88.66C260.259 89.284 260.511 90.148 260.523 91.252H255.819C255.867 91.852 256.023 92.32 256.311 92.644C256.599 92.956 256.995 93.124 257.499 93.124C257.943 93.124 258.303 93.016 258.579 92.812C258.795 92.644 258.975 92.368 259.143 92.008H260.415C260.271 92.584 259.995 93.076 259.563 93.46C259.023 93.928 258.339 94.168 257.511 94.168C256.599 94.168 255.867 93.88 255.339 93.316C254.763 92.716 254.475 91.912 254.475 90.892C254.475 89.968 254.739 89.2 255.291 88.576C255.819 87.94 256.551 87.628 257.463 87.628ZM257.499 88.672C257.019 88.672 256.647 88.804 256.359 89.092C256.095 89.368 255.915 89.764 255.843 90.292H259.191C259.071 89.212 258.507 88.672 257.499 88.672ZM264.489 87.628C264.801 87.628 265.077 87.676 265.293 87.784V89.056C264.981 88.96 264.681 88.924 264.393 88.924C264.009 88.924 263.661 89.08 263.361 89.392C263.037 89.728 262.881 90.172 262.881 90.712V94H261.609V87.796H262.881V88.732C263.037 88.396 263.241 88.144 263.481 87.976C263.769 87.736 264.105 87.628 264.489 87.628Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M311.053 85.432H314.605C316.645 85.432 317.665 86.296 317.665 88.036C317.665 89.788 316.633 90.664 314.581 90.664H312.361V94H311.053V85.432ZM312.361 86.548V89.548H314.497C315.145 89.548 315.613 89.428 315.913 89.188C316.201 88.948 316.357 88.564 316.357 88.036C316.357 87.508 316.201 87.124 315.901 86.908C315.601 86.668 315.133 86.548 314.497 86.548H312.361ZM318.761 85.264H320.033V88.672C320.261 88.312 320.549 88.036 320.897 87.868C321.209 87.7 321.557 87.628 321.953 87.628C322.697 87.628 323.261 87.844 323.645 88.288C324.005 88.708 324.185 89.332 324.185 90.148V94H322.913V90.364C322.913 89.812 322.793 89.404 322.577 89.116C322.337 88.816 321.965 88.672 321.485 88.672C321.053 88.672 320.705 88.84 320.441 89.188C320.165 89.536 320.033 89.98 320.033 90.52V94H318.761V85.264ZM328.484 87.628C329.42 87.628 330.176 87.94 330.74 88.564C331.292 89.176 331.58 89.956 331.58 90.904C331.58 91.84 331.304 92.62 330.752 93.22C330.176 93.844 329.42 94.168 328.484 94.168C327.548 94.168 326.792 93.844 326.216 93.22C325.664 92.62 325.388 91.84 325.388 90.904C325.388 89.956 325.664 89.176 326.228 88.564C326.792 87.94 327.548 87.628 328.484 87.628ZM328.484 88.672C327.896 88.672 327.44 88.9 327.116 89.368C326.828 89.764 326.696 90.28 326.696 90.904C326.696 91.528 326.828 92.032 327.116 92.428C327.44 92.884 327.896 93.124 328.484 93.124C329.072 93.124 329.528 92.884 329.864 92.428C330.152 92.02 330.296 91.516 330.296 90.904C330.296 90.28 330.152 89.764 329.864 89.368C329.528 88.9 329.072 88.672 328.484 88.672ZM334.672 85.792V87.796H336.088V88.852H334.672V92.452C334.672 92.62 334.708 92.74 334.78 92.824C334.852 92.896 334.96 92.944 335.116 92.944H335.932V94H334.912C334.384 94 333.988 93.856 333.748 93.58C333.508 93.316 333.4 92.944 333.4 92.452V88.852H332.248V87.796H333.4V86.32L334.672 85.792ZM339.969 87.628C340.905 87.628 341.661 87.94 342.225 88.564C342.777 89.176 343.065 89.956 343.065 90.904C343.065 91.84 342.789 92.62 342.237 93.22C341.661 93.844 340.905 94.168 339.969 94.168C339.033 94.168 338.277 93.844 337.701 93.22C337.149 92.62 336.873 91.84 336.873 90.904C336.873 89.956 337.149 89.176 337.713 88.564C338.277 87.94 339.033 87.628 339.969 87.628ZM339.969 88.672C339.381 88.672 338.925 88.9 338.601 89.368C338.313 89.764 338.181 90.28 338.181 90.904C338.181 91.528 338.313 92.032 338.601 92.428C338.925 92.884 339.381 93.124 339.969 93.124C340.557 93.124 341.013 92.884 341.349 92.428C341.637 92.02 341.781 91.516 341.781 90.904C341.781 90.28 341.637 89.764 341.349 89.368C341.013 88.9 340.557 88.672 339.969 88.672ZM346.589 87.628C348.197 87.628 349.085 88.276 349.229 89.584H347.993C347.897 89.248 347.753 89.02 347.549 88.888C347.333 88.744 346.997 88.672 346.565 88.672C346.181 88.672 345.893 88.72 345.701 88.84C345.473 88.96 345.365 89.152 345.365 89.392C345.365 89.608 345.533 89.788 345.869 89.944C346.085 90.04 346.493 90.16 347.117 90.316C347.825 90.484 348.353 90.688 348.689 90.904C349.181 91.216 349.433 91.648 349.433 92.2C349.433 93.508 348.509 94.168 346.673 94.168C344.969 94.168 344.057 93.436 343.913 91.996H345.161C345.233 92.416 345.389 92.716 345.605 92.884C345.821 93.04 346.157 93.124 346.637 93.124C347.621 93.124 348.125 92.836 348.125 92.284C348.125 91.984 347.933 91.744 347.573 91.576C347.381 91.48 346.961 91.36 346.325 91.216C345.593 91.048 345.077 90.868 344.789 90.676C344.309 90.376 344.069 89.956 344.069 89.428C344.069 88.864 344.297 88.42 344.765 88.108C345.233 87.784 345.845 87.628 346.589 87.628Z"
                              :fill="proto.systemColor"></path>
                          </g>
                          <g filter="url(#filter3_b_508_2128)">
                            <path
                              d="M220.298 183.312C220.55 183.312 220.766 183.384 220.934 183.552C221.102 183.708 221.186 183.912 221.186 184.164C221.186 184.416 221.09 184.62 220.922 184.788C220.754 184.944 220.538 185.028 220.298 185.028C220.046 185.028 219.842 184.944 219.674 184.788C219.506 184.62 219.422 184.404 219.422 184.164C219.422 183.912 219.506 183.708 219.674 183.552C219.842 183.384 220.046 183.312 220.298 183.312ZM219.662 185.796H220.934V192H219.662V185.796ZM225.776 183.264C226.772 183.264 227.552 183.468 228.116 183.9C228.716 184.344 229.052 185.028 229.136 185.964H227.84C227.72 185.412 227.504 185.004 227.168 184.764C226.832 184.512 226.352 184.392 225.704 184.392C225.14 184.392 224.708 184.476 224.408 184.644C224.036 184.836 223.856 185.148 223.856 185.58C223.856 185.964 224.06 186.264 224.492 186.492C224.684 186.6 225.176 186.78 225.98 187.02C227.132 187.38 227.888 187.656 228.224 187.86C228.956 188.304 229.328 188.916 229.328 189.708C229.328 190.476 229.028 191.076 228.428 191.52C227.828 191.952 226.988 192.168 225.908 192.168C224.864 192.168 224.048 191.952 223.46 191.544C222.752 191.04 222.368 190.248 222.296 189.168H223.592C223.688 189.84 223.928 190.332 224.312 190.62C224.66 190.884 225.188 191.016 225.908 191.016C226.556 191.016 227.072 190.896 227.456 190.68C227.84 190.464 228.032 190.164 228.032 189.78C228.032 189.3 227.756 188.928 227.216 188.652C227.024 188.556 226.46 188.364 225.512 188.076C224.456 187.74 223.808 187.512 223.544 187.368C222.884 186.972 222.56 186.396 222.56 185.652C222.56 184.896 222.872 184.308 223.508 183.876C224.108 183.468 224.864 183.264 225.776 183.264ZM233.185 185.628C233.977 185.628 234.613 185.808 235.093 186.168C235.573 186.552 235.885 187.128 236.005 187.896H234.745C234.661 187.476 234.493 187.164 234.229 186.972C233.965 186.768 233.617 186.672 233.185 186.672C232.657 186.672 232.249 186.864 231.949 187.26C231.637 187.644 231.493 188.196 231.493 188.892C231.493 189.588 231.637 190.14 231.937 190.536C232.213 190.92 232.621 191.124 233.173 191.124C234.121 191.124 234.649 190.644 234.769 189.708H236.029C235.885 190.536 235.561 191.16 235.081 191.568C234.601 191.964 233.953 192.168 233.161 192.168C232.213 192.168 231.481 191.856 230.953 191.232C230.437 190.632 230.185 189.864 230.185 188.904C230.185 187.968 230.437 187.2 230.941 186.6C231.481 185.952 232.225 185.628 233.185 185.628ZM239.996 185.628C240.308 185.628 240.584 185.676 240.8 185.784V187.056C240.488 186.96 240.188 186.924 239.9 186.924C239.516 186.924 239.168 187.08 238.868 187.392C238.544 187.728 238.388 188.172 238.388 188.712V192H237.116V185.796H238.388V186.732C238.544 186.396 238.748 186.144 238.988 185.976C239.276 185.736 239.612 185.628 239.996 185.628ZM244.209 185.628C245.217 185.628 245.997 185.964 246.525 186.66C247.005 187.284 247.257 188.148 247.269 189.252H242.565C242.613 189.852 242.769 190.32 243.057 190.644C243.345 190.956 243.741 191.124 244.245 191.124C244.689 191.124 245.049 191.016 245.325 190.812C245.541 190.644 245.721 190.368 245.889 190.008H247.161C247.017 190.584 246.741 191.076 246.309 191.46C245.769 191.928 245.085 192.168 244.257 192.168C243.345 192.168 242.613 191.88 242.085 191.316C241.509 190.716 241.221 189.912 241.221 188.892C241.221 187.968 241.485 187.2 242.037 186.576C242.565 185.94 243.297 185.628 244.209 185.628ZM244.245 186.672C243.765 186.672 243.393 186.804 243.105 187.092C242.841 187.368 242.661 187.764 242.589 188.292H245.937C245.817 187.212 245.253 186.672 244.245 186.672ZM250.983 185.628C251.991 185.628 252.771 185.964 253.299 186.66C253.779 187.284 254.031 188.148 254.043 189.252H249.339C249.387 189.852 249.543 190.32 249.831 190.644C250.119 190.956 250.515 191.124 251.019 191.124C251.463 191.124 251.823 191.016 252.099 190.812C252.315 190.644 252.495 190.368 252.663 190.008H253.935C253.791 190.584 253.515 191.076 253.083 191.46C252.543 191.928 251.859 192.168 251.031 192.168C250.119 192.168 249.387 191.88 248.859 191.316C248.283 190.716 247.995 189.912 247.995 188.892C247.995 187.968 248.259 187.2 248.811 186.576C249.339 185.94 250.071 185.628 250.983 185.628ZM251.019 186.672C250.539 186.672 250.167 186.804 249.879 187.092C249.615 187.368 249.435 187.764 249.363 188.292H252.711C252.591 187.212 252.027 186.672 251.019 186.672ZM258.272 185.628C259.808 185.628 260.588 186.468 260.588 188.172V192H259.316V188.28C259.316 187.224 258.824 186.696 257.864 186.696C257.504 186.696 257.18 186.816 256.916 187.08C256.628 187.368 256.448 187.764 256.4 188.268V192H255.128V185.796H256.4V186.564C256.64 186.252 256.916 186.024 257.228 185.868C257.54 185.7 257.888 185.628 258.272 185.628Z"
                              :fill="proto.systemColor"></path>
                            <path
                              d="M304.766 183.432H310.586V184.548H306.074V187.044H310.334V188.16H306.074V192H304.766V183.432ZM314.414 185.628C315.326 185.628 315.998 185.856 316.43 186.312C316.802 186.708 316.994 187.284 316.994 188.04V192H315.818V191.124C315.578 191.436 315.278 191.688 314.918 191.868C314.51 192.06 314.03 192.168 313.478 192.168C312.83 192.168 312.326 192 311.966 191.676C311.57 191.352 311.378 190.932 311.378 190.416C311.378 189.72 311.654 189.18 312.206 188.808C312.71 188.448 313.43 188.268 314.342 188.244L315.734 188.208V187.956C315.734 187.092 315.266 186.66 314.33 186.66C313.934 186.66 313.61 186.732 313.37 186.876C313.082 187.044 312.902 187.296 312.83 187.644L311.57 187.536C311.702 186.864 312.038 186.36 312.566 186.048C313.022 185.76 313.646 185.628 314.414 185.628ZM315.734 189.132L314.426 189.168C313.262 189.192 312.686 189.6 312.686 190.368C312.686 190.608 312.782 190.8 312.986 190.956C313.178 191.112 313.442 191.196 313.766 191.196C314.306 191.196 314.762 191.028 315.146 190.704C315.53 190.38 315.734 189.972 315.734 189.492V189.132ZM321.21 185.628C322.002 185.628 322.638 185.808 323.118 186.168C323.598 186.552 323.91 187.128 324.03 187.896H322.77C322.686 187.476 322.518 187.164 322.254 186.972C321.99 186.768 321.642 186.672 321.21 186.672C320.682 186.672 320.274 186.864 319.974 187.26C319.662 187.644 319.518 188.196 319.518 188.892C319.518 189.588 319.662 190.14 319.962 190.536C320.238 190.92 320.646 191.124 321.198 191.124C322.146 191.124 322.674 190.644 322.794 189.708H324.054C323.91 190.536 323.586 191.16 323.106 191.568C322.626 191.964 321.978 192.168 321.186 192.168C320.238 192.168 319.506 191.856 318.978 191.232C318.462 190.632 318.21 189.864 318.21 188.904C318.21 187.968 318.462 187.2 318.966 186.6C319.506 185.952 320.25 185.628 321.21 185.628ZM327.77 185.628C328.778 185.628 329.558 185.964 330.086 186.66C330.566 187.284 330.818 188.148 330.83 189.252H326.126C326.174 189.852 326.33 190.32 326.618 190.644C326.906 190.956 327.302 191.124 327.806 191.124C328.25 191.124 328.61 191.016 328.886 190.812C329.102 190.644 329.282 190.368 329.45 190.008H330.722C330.578 190.584 330.302 191.076 329.87 191.46C329.33 191.928 328.646 192.168 327.818 192.168C326.906 192.168 326.174 191.88 325.646 191.316C325.07 190.716 324.782 189.912 324.782 188.892C324.782 187.968 325.046 187.2 325.598 186.576C326.126 185.94 326.858 185.628 327.77 185.628ZM327.806 186.672C327.326 186.672 326.954 186.804 326.666 187.092C326.402 187.368 326.222 187.764 326.15 188.292H329.498C329.378 187.212 328.814 186.672 327.806 186.672ZM333.799 183.792V185.796H335.215V186.852H333.799V190.452C333.799 190.62 333.835 190.74 333.907 190.824C333.979 190.896 334.087 190.944 334.243 190.944H335.059V192H334.039C333.511 192 333.115 191.856 332.875 191.58C332.635 191.316 332.527 190.944 332.527 190.452V186.852H331.375V185.796H332.527V184.32L333.799 183.792ZM337.14 183.312C337.392 183.312 337.608 183.384 337.776 183.552C337.944 183.708 338.028 183.912 338.028 184.164C338.028 184.416 337.932 184.62 337.764 184.788C337.596 184.944 337.38 185.028 337.14 185.028C336.888 185.028 336.684 184.944 336.516 184.788C336.348 184.62 336.264 184.404 336.264 184.164C336.264 183.912 336.348 183.708 336.516 183.552C336.684 183.384 336.888 183.312 337.14 183.312ZM336.504 185.796H337.776V192H336.504V185.796ZM342.473 185.628C343.385 185.628 344.045 185.976 344.429 186.672C344.705 186.288 345.005 186.012 345.317 185.856C345.605 185.7 345.953 185.628 346.373 185.628C347.009 185.628 347.537 185.832 347.957 186.264C348.365 186.684 348.581 187.236 348.581 187.932V192H347.309V188.148C347.309 187.644 347.201 187.272 346.985 187.044C346.769 186.804 346.409 186.696 345.929 186.696C345.569 186.696 345.281 186.828 345.041 187.092C344.801 187.356 344.681 187.728 344.681 188.184V192H343.409V188.16C343.409 187.176 342.977 186.696 342.137 186.696C341.729 186.696 341.393 186.852 341.153 187.164C340.889 187.464 340.769 187.836 340.769 188.268V192H339.497V185.796H340.769V186.48C341.273 185.904 341.849 185.628 342.473 185.628ZM352.649 185.628C353.657 185.628 354.437 185.964 354.965 186.66C355.445 187.284 355.697 188.148 355.709 189.252H351.005C351.053 189.852 351.209 190.32 351.497 190.644C351.785 190.956 352.181 191.124 352.685 191.124C353.129 191.124 353.489 191.016 353.765 190.812C353.981 190.644 354.161 190.368 354.329 190.008H355.601C355.457 190.584 355.181 191.076 354.749 191.46C354.209 191.928 353.525 192.168 352.697 192.168C351.785 192.168 351.053 191.88 350.525 191.316C349.949 190.716 349.661 189.912 349.661 188.892C349.661 187.968 349.925 187.2 350.477 186.576C351.005 185.94 351.737 185.628 352.649 185.628ZM352.685 186.672C352.205 186.672 351.833 186.804 351.545 187.092C351.281 187.368 351.101 187.764 351.029 188.292H354.377C354.257 187.212 353.693 186.672 352.685 186.672Z"
                              :fill="proto.systemColor"></path>
                          </g>
                          <path
                            d="M84.2977 183.312C84.5497 183.312 84.7657 183.384 84.9337 183.552C85.1017 183.708 85.1857 183.912 85.1857 184.164C85.1857 184.416 85.0897 184.62 84.9217 184.788C84.7537 184.944 84.5377 185.028 84.2977 185.028C84.0457 185.028 83.8417 184.944 83.6737 184.788C83.5057 184.62 83.4217 184.404 83.4217 184.164C83.4217 183.912 83.5057 183.708 83.6737 183.552C83.8417 183.384 84.0457 183.312 84.2977 183.312ZM83.6617 185.796H84.9337V192H83.6617V185.796ZM89.7755 183.264C90.7715 183.264 91.5515 183.468 92.1155 183.9C92.7155 184.344 93.0515 185.028 93.1355 185.964H91.8395C91.7195 185.412 91.5035 185.004 91.1675 184.764C90.8315 184.512 90.3515 184.392 89.7035 184.392C89.1395 184.392 88.7075 184.476 88.4075 184.644C88.0355 184.836 87.8555 185.148 87.8555 185.58C87.8555 185.964 88.0595 186.264 88.4915 186.492C88.6835 186.6 89.1755 186.78 89.9795 187.02C91.1315 187.38 91.8875 187.656 92.2235 187.86C92.9555 188.304 93.3275 188.916 93.3275 189.708C93.3275 190.476 93.0275 191.076 92.4275 191.52C91.8275 191.952 90.9875 192.168 89.9075 192.168C88.8635 192.168 88.0475 191.952 87.4595 191.544C86.7515 191.04 86.3675 190.248 86.2955 189.168H87.5915C87.6875 189.84 87.9275 190.332 88.3115 190.62C88.6595 190.884 89.1875 191.016 89.9075 191.016C90.5555 191.016 91.0715 190.896 91.4555 190.68C91.8395 190.464 92.0315 190.164 92.0315 189.78C92.0315 189.3 91.7555 188.928 91.2155 188.652C91.0235 188.556 90.4595 188.364 89.5115 188.076C88.4555 187.74 87.8075 187.512 87.5435 187.368C86.8835 186.972 86.5595 186.396 86.5595 185.652C86.5595 184.896 86.8715 184.308 87.5075 183.876C88.1075 183.468 88.8635 183.264 89.7755 183.264ZM97.1851 185.628C97.9771 185.628 98.6131 185.808 99.0931 186.168C99.5731 186.552 99.8851 187.128 100.005 187.896H98.7451C98.6611 187.476 98.4931 187.164 98.2291 186.972C97.9651 186.768 97.6171 186.672 97.1851 186.672C96.6571 186.672 96.2491 186.864 95.9491 187.26C95.6371 187.644 95.4931 188.196 95.4931 188.892C95.4931 189.588 95.6371 190.14 95.9371 190.536C96.2131 190.92 96.6211 191.124 97.1731 191.124C98.1211 191.124 98.6491 190.644 98.7691 189.708H100.029C99.8851 190.536 99.5611 191.16 99.0811 191.568C98.6011 191.964 97.9531 192.168 97.1611 192.168C96.2131 192.168 95.4811 191.856 94.9531 191.232C94.4371 190.632 94.1851 189.864 94.1851 188.904C94.1851 187.968 94.4371 187.2 94.9411 186.6C95.4811 185.952 96.2251 185.628 97.1851 185.628ZM103.996 185.628C104.308 185.628 104.584 185.676 104.8 185.784V187.056C104.488 186.96 104.188 186.924 103.9 186.924C103.516 186.924 103.168 187.08 102.868 187.392C102.544 187.728 102.388 188.172 102.388 188.712V192H101.116V185.796H102.388V186.732C102.544 186.396 102.748 186.144 102.988 185.976C103.276 185.736 103.612 185.628 103.996 185.628ZM108.209 185.628C109.217 185.628 109.997 185.964 110.525 186.66C111.005 187.284 111.257 188.148 111.269 189.252H106.565C106.613 189.852 106.769 190.32 107.057 190.644C107.345 190.956 107.741 191.124 108.245 191.124C108.689 191.124 109.049 191.016 109.325 190.812C109.541 190.644 109.721 190.368 109.889 190.008H111.161C111.017 190.584 110.741 191.076 110.309 191.46C109.769 191.928 109.085 192.168 108.257 192.168C107.345 192.168 106.613 191.88 106.085 191.316C105.509 190.716 105.221 189.912 105.221 188.892C105.221 187.968 105.485 187.2 106.037 186.576C106.565 185.94 107.297 185.628 108.209 185.628ZM108.245 186.672C107.765 186.672 107.393 186.804 107.105 187.092C106.841 187.368 106.661 187.764 106.589 188.292H109.937C109.817 187.212 109.253 186.672 108.245 186.672ZM114.983 185.628C115.991 185.628 116.771 185.964 117.299 186.66C117.779 187.284 118.031 188.148 118.043 189.252H113.339C113.387 189.852 113.543 190.32 113.831 190.644C114.119 190.956 114.515 191.124 115.019 191.124C115.463 191.124 115.823 191.016 116.099 190.812C116.315 190.644 116.495 190.368 116.663 190.008H117.935C117.791 190.584 117.515 191.076 117.083 191.46C116.543 191.928 115.859 192.168 115.031 192.168C114.119 192.168 113.387 191.88 112.859 191.316C112.283 190.716 111.995 189.912 111.995 188.892C111.995 187.968 112.259 187.2 112.811 186.576C113.339 185.94 114.071 185.628 114.983 185.628ZM115.019 186.672C114.539 186.672 114.167 186.804 113.879 187.092C113.615 187.368 113.435 187.764 113.363 188.292H116.711C116.591 187.212 116.027 186.672 115.019 186.672ZM122.272 185.628C123.808 185.628 124.588 186.468 124.588 188.172V192H123.316V188.28C123.316 187.224 122.824 186.696 121.864 186.696C121.504 186.696 121.18 186.816 120.916 187.08C120.628 187.368 120.448 187.764 120.4 188.268V192H119.128V185.796H120.4V186.564C120.64 186.252 120.916 186.024 121.228 185.868C121.54 185.7 121.888 185.628 122.272 185.628Z"
                            :fill="proto.systemColor"></path>
                          <g filter="url(#filter4_b_508_2128)">
                            <g clip-path="url(#clip0_508_2128)">
                              <rect width="91" height="28" rx="14" transform="matrix(1 0 0 -1 150 655)" fill="#F5F5F5"
                                fill-opacity="0.6"></rect>
                            </g>
                            <path
                              d="M161.844 639.335C161.844 642.558 164.466 645.18 167.689 645.18C168.963 645.18 170.128 644.77 171.087 644.081L174.691 647.692C174.859 647.86 175.079 647.941 175.313 647.941C175.812 647.941 176.156 647.567 176.156 647.077C176.156 646.842 176.068 646.63 175.914 646.476L172.333 642.873C173.087 641.891 173.534 640.668 173.534 639.335C173.534 636.112 170.912 633.49 167.689 633.49C164.466 633.49 161.844 636.112 161.844 639.335ZM163.097 639.335C163.097 636.801 165.155 634.743 167.689 634.743C170.223 634.743 172.281 636.801 172.281 639.335C172.281 641.869 170.223 643.927 167.689 643.927C165.155 643.927 163.097 641.869 163.097 639.335Z"
                              :fill="proto.systemColor"></path>
                            <g>
                              <path
                                d="M185.812 646.249C186.598 646.249 187.284 646.12 187.87 645.861C188.456 645.597 188.91 645.226 189.232 644.748C189.555 644.269 189.716 643.7 189.716 643.041V643.034C189.716 642.526 189.611 642.086 189.401 641.715C189.196 641.339 188.869 641.022 188.419 640.763C187.97 640.504 187.377 640.294 186.64 640.133L185.468 639.87C184.75 639.713 184.235 639.491 183.922 639.203C183.61 638.915 183.454 638.561 183.454 638.141V638.134C183.454 637.763 183.556 637.45 183.761 637.196C183.971 636.938 184.252 636.74 184.604 636.603C184.955 636.466 185.351 636.398 185.79 636.398C186.249 636.393 186.649 636.461 186.991 636.603C187.333 636.745 187.606 636.938 187.812 637.182C188.017 637.421 188.144 637.697 188.192 638.009L188.207 638.104H189.525L189.518 638.002C189.484 637.475 189.306 636.999 188.983 636.574C188.666 636.149 188.236 635.812 187.694 635.563C187.152 635.309 186.53 635.182 185.827 635.182C185.099 635.182 184.455 635.309 183.893 635.563C183.336 635.817 182.899 636.168 182.582 636.618C182.27 637.067 182.111 637.584 182.106 638.17V638.178C182.106 638.944 182.345 639.574 182.824 640.067C183.307 640.556 184.079 640.917 185.138 641.151L186.31 641.408C187.038 641.569 187.562 641.801 187.885 642.104C188.207 642.401 188.368 642.77 188.368 643.209V643.217C188.368 643.573 188.261 643.888 188.046 644.162C187.831 644.435 187.536 644.65 187.16 644.806C186.789 644.958 186.364 645.033 185.885 645.033C185.377 645.033 184.923 644.962 184.523 644.821C184.127 644.679 183.81 644.481 183.571 644.228C183.336 643.969 183.202 643.664 183.168 643.312L183.161 643.231H181.842L181.85 643.312C181.903 643.883 182.096 644.391 182.428 644.835C182.765 645.275 183.219 645.622 183.791 645.875C184.367 646.125 185.041 646.249 185.812 646.249ZM194.975 646.139C195.438 646.139 195.856 646.081 196.227 645.963C196.603 645.841 196.928 645.68 197.201 645.48C197.475 645.275 197.697 645.048 197.868 644.799C198.043 644.545 198.166 644.284 198.234 644.015L198.249 643.957H196.974L196.945 644.022C196.876 644.179 196.757 644.333 196.586 644.484C196.415 644.635 196.198 644.76 195.934 644.857C195.67 644.955 195.36 645.004 195.004 645.004C194.525 645.004 194.11 644.899 193.759 644.689C193.407 644.474 193.136 644.169 192.946 643.773C192.755 643.373 192.66 642.892 192.66 642.331V641.825C192.66 641.234 192.758 640.736 192.953 640.331C193.148 639.926 193.412 639.621 193.744 639.416C194.081 639.206 194.462 639.101 194.887 639.101C195.312 639.101 195.688 639.201 196.015 639.401C196.342 639.596 196.598 639.894 196.784 640.294C196.969 640.695 197.062 641.205 197.062 641.825V642.331L197.692 641.4H192.016V642.418H198.344V641.92C198.344 641.134 198.205 640.446 197.926 639.855C197.653 639.259 197.257 638.795 196.74 638.463C196.227 638.131 195.612 637.965 194.894 637.965C194.181 637.965 193.559 638.139 193.026 638.485C192.494 638.832 192.082 639.313 191.789 639.928C191.5 640.543 191.356 641.259 191.356 642.074V642.082C191.356 642.907 191.5 643.625 191.789 644.235C192.082 644.84 192.497 645.309 193.034 645.641C193.576 645.973 194.223 646.139 194.975 646.139ZM202.489 646.139C202.846 646.139 203.173 646.09 203.471 645.993C203.769 645.89 204.035 645.741 204.269 645.546C204.508 645.351 204.711 645.114 204.877 644.835H204.994V646H206.269V640.595C206.269 640.048 206.151 639.579 205.917 639.188C205.688 638.793 205.348 638.49 204.899 638.28C204.455 638.07 203.91 637.965 203.266 637.965C202.704 637.965 202.204 638.053 201.764 638.229C201.325 638.4 200.966 638.642 200.688 638.954C200.414 639.262 200.243 639.623 200.175 640.038L200.167 640.082H201.442L201.449 640.06C201.552 639.752 201.754 639.516 202.057 639.35C202.36 639.179 202.748 639.093 203.222 639.093C203.812 639.093 204.254 639.223 204.547 639.481C204.845 639.735 204.994 640.106 204.994 640.595V643.056C204.994 643.432 204.896 643.769 204.701 644.066C204.511 644.364 204.247 644.601 203.91 644.777C203.573 644.948 203.188 645.033 202.753 645.033C202.294 645.033 201.913 644.923 201.61 644.704C201.308 644.479 201.156 644.167 201.156 643.766V643.751C201.156 643.361 201.293 643.058 201.566 642.843C201.845 642.628 202.284 642.504 202.885 642.47L205.631 642.294V641.276L202.731 641.452C202.121 641.486 201.601 641.598 201.171 641.789C200.741 641.979 200.414 642.243 200.189 642.58C199.965 642.912 199.853 643.312 199.853 643.781V643.795C199.853 644.274 199.967 644.689 200.197 645.041C200.431 645.392 200.746 645.663 201.142 645.854C201.542 646.044 201.991 646.139 202.489 646.139ZM208.598 646H209.872V641.107C209.872 640.722 209.96 640.385 210.136 640.097C210.316 639.809 210.563 639.584 210.875 639.423C211.188 639.262 211.547 639.181 211.952 639.181C212.094 639.181 212.226 639.188 212.348 639.203C212.475 639.213 212.604 639.23 212.736 639.254V638.017C212.672 638.007 212.58 637.997 212.458 637.987C212.34 637.973 212.221 637.965 212.099 637.965C211.566 637.965 211.12 638.08 210.758 638.31C210.397 638.539 210.141 638.861 209.989 639.276H209.872V638.104H208.598V646ZM217.321 646.139C217.956 646.139 218.498 646.034 218.947 645.824C219.396 645.614 219.757 645.326 220.031 644.96C220.304 644.589 220.495 644.167 220.602 643.693L220.617 643.612L219.357 643.62L219.342 643.664C219.196 644.103 218.954 644.438 218.617 644.667C218.28 644.896 217.846 645.011 217.313 645.011C216.845 645.011 216.437 644.889 216.09 644.645C215.744 644.401 215.475 644.057 215.285 643.612C215.094 643.163 214.999 642.636 214.999 642.03V642.016C214.999 641.42 215.092 640.905 215.277 640.47C215.468 640.031 215.736 639.691 216.083 639.452C216.43 639.213 216.84 639.093 217.313 639.093C217.88 639.093 218.336 639.23 218.683 639.503C219.03 639.777 219.252 640.109 219.35 640.5L219.357 640.521H220.624L220.617 640.478C220.539 640.009 220.36 639.586 220.082 639.21C219.804 638.83 219.433 638.527 218.969 638.302C218.505 638.078 217.953 637.965 217.313 637.965C216.576 637.965 215.937 638.134 215.395 638.471C214.853 638.803 214.433 639.271 214.135 639.877C213.842 640.482 213.695 641.195 213.695 642.016V642.03C213.695 642.865 213.844 643.59 214.142 644.206C214.44 644.821 214.86 645.297 215.402 645.634C215.944 645.971 216.583 646.139 217.321 646.139ZM222.558 646H223.832V641.327C223.832 640.863 223.915 640.465 224.081 640.133C224.252 639.801 224.491 639.545 224.799 639.364C225.106 639.184 225.47 639.093 225.89 639.093C226.52 639.093 226.984 639.267 227.282 639.613C227.584 639.955 227.736 640.482 227.736 641.195V646H229.01V640.888C229.01 640.263 228.903 639.733 228.688 639.298C228.473 638.864 228.161 638.534 227.75 638.31C227.34 638.08 226.84 637.965 226.249 637.965C225.668 637.965 225.189 638.083 224.813 638.317C224.438 638.546 224.149 638.871 223.949 639.291H223.832V634.97H222.558V646Z"
                                :fill="proto.systemColor"></path>
                            </g>
                          </g>
                          <defs>
                            <filter id="filter0_b_508_2128" x="-122.914" y="543.086" width="637.828" height="365.828"
                              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                              <feGaussianBlur in="BackgroundImageFix" stdDeviation="67.957"></feGaussianBlur>
                              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_508_2128">
                              </feComposite>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_508_2128"
                                result="shape">
                              </feBlend>
                            </filter>
                            <filter id="filter1_b_508_2128" x="-135.914" y="60.0859" width="661.828" height="369.828"
                              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                              <feGaussianBlur in="BackgroundImageFix" stdDeviation="67.957"></feGaussianBlur>
                              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_508_2128">
                              </feComposite>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_508_2128"
                                result="shape">
                              </feBlend>
                            </filter>
                            <filter id="filter2_b_508_2128" x="74.0859" y="-135.914" width="451.828" height="369.828"
                              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                              <feGaussianBlur in="BackgroundImageFix" stdDeviation="67.957"></feGaussianBlur>
                              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_508_2128">
                              </feComposite>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_508_2128"
                                result="shape">
                              </feBlend>
                            </filter>
                            <filter id="filter3_b_508_2128" x="74.0859" y="-37.9141" width="451.828" height="369.828"
                              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                              <feGaussianBlur in="BackgroundImageFix" stdDeviation="67.957"></feGaussianBlur>
                              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_508_2128">
                              </feComposite>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_508_2128"
                                result="shape">
                              </feBlend>
                            </filter>
                            <filter id="filter4_b_508_2128" x="14.0859" y="491.086" width="362.828" height="299.828"
                              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                              <feGaussianBlur in="BackgroundImageFix" stdDeviation="67.957"></feGaussianBlur>
                              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_508_2128">
                              </feComposite>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_508_2128"
                                result="shape">
                              </feBlend>
                            </filter>
                            <clipPath id="clip0_508_2128">
                              <rect width="91" height="28" :fill="proto.systemColor"
                                transform="matrix(1 0 0 -1 150 655)">
                              </rect>
                            </clipPath>
                          </defs>
                        </svg>
                        <img style="position: absolute;width: 337px;height: 739px;top: 17px;left: 25px;"
                          src="/image/desktop-app-icon-1.png"></img>
                      </template>
                      <template v-if="[2, 3].includes(desktopRadio)">
                        <svg width="390.000000" height="773.000000" viewBox="0 0 390 773" fill="none"
                          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                          <defs>
                            <filter id="filter_3_2641_dd" x="13.000000" y="679.000000" width="366.000000"
                              height="94.000000" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                              <feGaussianBlur in="BackgroundImage" stdDeviation="45.3047"></feGaussianBlur>
                              <feComposite in2="SourceAlpha" operator="in" result="effect_backgroundBlur_1">
                              </feComposite>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect_backgroundBlur_1" result="shape">
                              </feBlend>
                            </filter>
                            <filter id="filter_3_2554_dd" x="0.000000" y="196.000000" width="390.000000"
                              height="98.000000" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                              <feGaussianBlur in="BackgroundImage" stdDeviation="45.3047"></feGaussianBlur>
                              <feComposite in2="SourceAlpha" operator="in" result="effect_backgroundBlur_1">
                              </feComposite>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect_backgroundBlur_1" result="shape">
                              </feBlend>
                            </filter>
                            <filter id="filter_3_2662_dd" x="162.000000" y="98.000000" width="180.000000"
                              height="98.000000" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                              <feGaussianBlur in="BackgroundImage" stdDeviation="45.3047"></feGaussianBlur>
                              <feComposite in2="SourceAlpha" operator="in" result="effect_backgroundBlur_1">
                              </feComposite>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect_backgroundBlur_1" result="shape">
                              </feBlend>
                            </filter>
                            <filter id="filter_3_2557_dd" x="150.000000" y="627.000000" width="91.000000"
                              height="28.000000" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                              <feGaussianBlur in="BackgroundImage" stdDeviation="45.3047"></feGaussianBlur>
                              <feComposite in2="SourceAlpha" operator="in" result="effect_backgroundBlur_1">
                              </feComposite>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect_backgroundBlur_1" result="shape">
                              </feBlend>
                            </filter>
                            <clipPath id="clip3_2559">
                              <rect width="91.000000" height="28.000000" transform="matrix(1 0 0 -1 150 655)"
                                fill="white" fill-opacity="0"></rect>
                            </clipPath>
                            <pattern id="pattern_3_25870" patternContentUnits="objectBoundingBox" width="1.000000"
                              height="1.000000">
                              <use xlink:href="#image3_2587_0" transform="matrix(0.007813,0,0,0.007813,0,0)"></use>
                            </pattern>
                            <pattern id="pattern_3_25920" patternContentUnits="objectBoundingBox" width="1.000000"
                              height="1.000000">
                              <use xlink:href="#image3_2592_0" transform="matrix(0.007813,0,0,0.007813,0,0)"></use>
                            </pattern>
                            <pattern id="pattern_3_25970" patternContentUnits="objectBoundingBox" width="1.000000"
                              height="1.000000">
                              <use xlink:href="#image3_2597_0" transform="matrix(0.007813,0,0,0.007813,0,0)"></use>
                            </pattern>
                            <pattern id="pattern_3_26020" patternContentUnits="objectBoundingBox" width="1.000000"
                              height="1.000000">
                              <use xlink:href="#image3_2602_0" transform="matrix(0.007813,0,0,0.007813,0,0)"></use>
                            </pattern>
                            <pattern id="pattern_3_26660" patternContentUnits="objectBoundingBox" width="1.000000"
                              height="1.000000">
                              <use xlink:href="#image3_2666_0" transform="matrix(0.007813,0,0,0.007813,0,0)"></use>
                            </pattern>
                          </defs>
                          <g filter="url(#filter_3_2641_dd)">
                            <rect rx="35.000000" width="366.000000" height="94.000000"
                              transform="translate(13.000000 679.000000)" fill="#F5F5F5" fill-opacity="0.600000"></rect>
                          </g>
                          <g filter="url(#filter_3_2554_dd)">
                            <rect width="60.000000" height="81.000000" transform="translate(30.000000 213.000000)"
                              :fill="proto.systemColor" fill-opacity="0"></rect>
                            <rect rx="13.000000" width="60.000000" height="60.000000"
                              transform="translate(30.000000 213.000000)" fill="url(#pattern_3_25870)" fill-opacity="0">
                            </rect>
                            <path
                              d="M43.51 281.87C44.11 281.46 44.86 281.26 45.78 281.26C46.77 281.26 47.55 281.46 48.11 281.89C48.71 282.34 49.05 283.02 49.14 283.96L47.84 283.96C47.72 283.41 47.5 283 47.17 282.76C46.83 282.51 46.35 282.39 45.7 282.39C45.14 282.39 44.71 282.47 44.41 282.64C44.04 282.83 43.85 283.14 43.85 283.58C43.85 283.96 44.06 284.26 44.49 284.49C44.68 284.6 45.18 284.77 45.98 285.01C47.13 285.38 47.89 285.65 48.22 285.85C48.95 286.3 49.33 286.91 49.33 287.7C49.33 288.47 49.03 289.07 48.43 289.51C47.83 289.95 46.99 290.16 45.91 290.16C44.86 290.16 44.05 289.95 43.46 289.54C42.75 289.03 42.37 288.24 42.3 287.16L43.59 287.16C43.69 287.84 43.93 288.33 44.31 288.62C44.66 288.88 45.19 289.01 45.91 289.01C46.56 289.01 47.07 288.89 47.45 288.67C47.84 288.46 48.03 288.16 48.03 287.77C48.03 287.29 47.76 286.92 47.21 286.65C47.02 286.55 46.46 286.36 45.51 286.07C44.45 285.74 43.81 285.51 43.54 285.36C42.88 284.97 42.56 284.39 42.56 283.65C42.56 282.89 42.87 282.3 43.51 281.87ZM39.68 281.55C39.85 281.38 40.05 281.31 40.3 281.31C40.56 281.31 40.77 281.38 40.94 281.55C41.11 281.7 41.19 281.91 41.19 282.16C41.19 282.41 41.09 282.62 40.93 282.78C40.76 282.94 40.54 283.02 40.3 283.02C40.05 283.02 39.85 282.94 39.68 282.78C39.51 282.62 39.43 282.4 39.43 282.16C39.43 281.91 39.51 281.7 39.68 281.55ZM50.94 284.6C51.47 283.95 52.22 283.62 53.18 283.62C53.97 283.62 54.61 283.8 55.09 284.16C55.57 284.55 55.88 285.12 56 285.89L54.74 285.89C54.66 285.47 54.49 285.16 54.22 284.97C53.96 284.76 53.61 284.67 53.18 284.67C52.65 284.67 52.24 284.86 51.94 285.26C51.63 285.64 51.49 286.19 51.49 286.89C51.49 287.58 51.63 288.14 51.93 288.53C52.21 288.91 52.61 289.12 53.17 289.12C54.11 289.12 54.64 288.64 54.76 287.7L56.02 287.7C55.88 288.53 55.56 289.15 55.08 289.56C54.59 289.96 53.95 290.16 53.16 290.16C52.21 290.16 51.47 289.85 50.95 289.23C50.43 288.63 50.18 287.86 50.18 286.9Q50.18 285.7 50.73 284.87Q50.83 284.73 50.94 284.6ZM58.99 283.97C59.27 283.73 59.61 283.62 60 283.62C60.31 283.62 60.58 283.67 60.8 283.78L60.8 285.05C60.49 284.96 60.19 284.92 59.9 284.92C59.52 284.92 59.17 285.08 58.87 285.39C58.54 285.72 58.39 286.17 58.39 286.71L58.39 290L57.12 290L57.12 283.79L58.39 283.79L58.39 284.73C58.54 284.39 58.75 284.14 58.99 283.97ZM62.03 284.57C62.56 283.94 63.29 283.62 64.21 283.62C65.22 283.62 65.99 283.96 66.52 284.65C67 285.28 67.25 286.14 67.27 287.25L62.56 287.25C62.61 287.85 62.77 288.32 63.06 288.64C63.34 288.95 63.74 289.12 64.24 289.12C64.69 289.12 65.05 289.01 65.32 288.81C65.54 288.64 65.72 288.36 65.89 288L67.16 288C67.01 288.58 66.74 289.07 66.31 289.46C65.77 289.92 65.08 290.16 64.25 290.16C63.34 290.16 62.61 289.88 62.08 289.31C61.51 288.71 61.22 287.91 61.22 286.89C61.22 285.96 61.48 285.2 62.03 284.57ZM68.8 284.57C69.33 283.94 70.06 283.62 70.98 283.62C71.98 283.62 72.76 283.96 73.29 284.65C73.77 285.28 74.02 286.14 74.03 287.25L69.33 287.25C69.38 287.85 69.53 288.32 69.82 288.64C70.11 288.95 70.51 289.12 71.01 289.12C71.46 289.12 71.82 289.01 72.09 288.81C72.31 288.64 72.49 288.36 72.65 288L73.93 288C73.78 288.58 73.51 289.07 73.08 289.46C72.53 289.92 71.85 290.16 71.02 290.16C70.11 290.16 69.38 289.88 68.85 289.31C68.27 288.71 67.99 287.91 67.99 286.89C67.99 285.96 68.25 285.2 68.8 284.57ZM77.22 283.86C77.53 283.7 77.88 283.62 78.26 283.62C79.79 283.62 80.57 284.46 80.57 286.17L80.57 290L79.3 290L79.3 286.27C79.3 285.22 78.81 284.69 77.85 284.69C77.49 284.69 77.17 284.81 76.9 285.08C76.62 285.36 76.43 285.76 76.39 286.26L76.39 290L75.12 290L75.12 283.79L76.39 283.79L76.39 284.56C76.63 284.25 76.9 284.02 77.22 283.86ZM39.67 290L39.67 283.79L40.94 283.79L40.94 290L39.67 290ZM65.94 286.29C65.82 285.21 65.25 284.67 64.24 284.67C63.76 284.67 63.39 284.8 63.1 285.09C62.84 285.36 62.66 285.76 62.59 286.29L65.94 286.29ZM72.7 286.29C72.58 285.21 72.02 284.67 71.01 284.67C70.53 284.67 70.16 284.8 69.87 285.09C69.61 285.36 69.43 285.76 69.36 286.29L72.7 286.29Z"
                              :fill="proto.systemColor" fill-opacity="1.000000" fill-rule="evenodd"></path>
                            <rect width="60.000000" height="81.000000" transform="translate(120.000000 213.000000)"
                              :fill="proto.systemColor" fill-opacity="0"></rect>
                            <rect rx="13.000000" width="60.000000" height="60.000000"
                              transform="translate(120.000000 213.000000)" fill="url(#pattern_3_25920)"
                              fill-opacity="0">
                            </rect>
                            <path
                              d="M147.97 290L147.97 281.26L149.24 281.26L149.24 290L147.97 290ZM144.85 281.55C145.01 281.38 145.22 281.31 145.47 281.31C145.72 281.31 145.94 281.38 146.11 281.55C146.27 281.7 146.36 281.91 146.36 282.16C146.36 282.41 146.26 282.62 146.1 282.78C145.93 282.94 145.71 283.02 145.47 283.02C145.22 283.02 145.01 282.94 144.85 282.78C144.68 282.62 144.6 282.4 144.6 282.16C144.6 281.91 144.68 281.7 144.85 281.55ZM137.72 290L137.72 281.43L143.54 281.43L143.54 282.54L139.03 282.54L139.03 285.04L143.29 285.04L143.29 286.15L139.03 286.15L139.03 290L137.72 290ZM151.28 284.57C151.81 283.94 152.54 283.62 153.45 283.62C154.46 283.62 155.24 283.96 155.77 284.65C156.25 285.28 156.5 286.14 156.51 287.25L151.81 287.25C151.86 287.85 152.01 288.32 152.3 288.64C152.59 288.95 152.98 289.12 153.49 289.12C153.93 289.12 154.29 289.01 154.57 288.81C154.78 288.64 154.96 288.36 155.13 288L156.4 288C156.26 288.58 155.98 289.07 155.55 289.46C155.01 289.92 154.33 290.16 153.5 290.16C152.59 290.16 151.86 289.88 151.33 289.31C150.75 288.71 150.46 287.91 150.46 286.89C150.46 285.96 150.73 285.2 151.28 284.57ZM158.08 284.1C158.55 283.78 159.16 283.62 159.91 283.62C161.52 283.62 162.4 284.27 162.55 285.58L161.31 285.58C161.22 285.24 161.07 285.01 160.87 284.88C160.65 284.74 160.32 284.67 159.88 284.67C159.5 284.67 159.21 284.72 159.02 284.84C158.79 284.96 158.68 285.15 158.68 285.39C158.68 285.6 158.85 285.78 159.19 285.94C159.4 286.03 159.81 286.15 160.44 286.31C161.14 286.48 161.67 286.68 162.01 286.9C162.5 287.21 162.75 287.64 162.75 288.2C162.75 289.5 161.83 290.16 159.99 290.16C158.29 290.16 157.38 289.43 157.23 287.99L158.48 287.99C158.55 288.41 158.71 288.71 158.92 288.88C159.14 289.03 159.48 289.12 159.96 289.12C160.94 289.12 161.44 288.83 161.44 288.28C161.44 287.98 161.25 287.74 160.89 287.57C160.7 287.48 160.28 287.35 159.64 287.21C158.91 287.04 158.39 286.86 158.11 286.67C157.63 286.37 157.39 285.95 157.39 285.42C157.39 284.86 157.62 284.41 158.08 284.1ZM144.84 290L144.84 283.79L146.11 283.79L146.11 290L144.84 290ZM155.18 286.29C155.06 285.21 154.5 284.67 153.49 284.67C153.01 284.67 152.63 284.8 152.35 285.09C152.08 285.36 151.9 285.76 151.83 286.29L155.18 286.29Z"
                              :fill="proto.systemColor" fill-opacity="1.000000" fill-rule="evenodd"></path>
                            <rect width="60.000000" height="81.000000" transform="translate(210.000000 213.000000)"
                              :fill="proto.systemColor" fill-opacity="0"></rect>
                            <rect rx="13.000000" width="60.000000" height="60.000000"
                              transform="translate(210.000000 213.000000)" fill="url(#pattern_3_25970)"
                              fill-opacity="0">
                            </rect>
                            <path
                              d="M224.22 290L224.22 281.43L225.53 281.43L229.91 287.8L229.96 287.8L229.96 281.43L231.27 281.43L231.27 290L230 290L225.57 283.55L225.52 283.55L225.52 290L224.22 290ZM240.62 282.32L241.89 281.79L241.89 283.79L243.31 283.79L243.31 284.85L241.89 284.85L241.89 288.45C241.89 288.62 241.93 288.74 242 288.82C242.07 288.89 242.18 288.94 242.33 288.94L243.15 288.94L243.15 290L242.13 290C241.6 290 241.21 289.85 240.97 289.58C240.73 289.31 240.62 288.94 240.62 288.45L240.62 284.85L239.47 284.85L239.47 283.79L240.62 283.79L240.62 282.32ZM233.44 284.56C234.01 283.94 234.76 283.62 235.7 283.62C236.64 283.62 237.39 283.94 237.96 284.56C238.51 285.17 238.79 285.95 238.79 286.9C238.79 287.84 238.52 288.62 237.97 289.22C237.39 289.84 236.64 290.16 235.7 290.16C234.76 290.16 234.01 289.84 233.43 289.22C232.88 288.62 232.6 287.84 232.6 286.9C232.6 285.95 232.88 285.17 233.44 284.56ZM244.78 284.57C245.31 283.94 246.04 283.62 246.96 283.62C247.96 283.62 248.74 283.96 249.27 284.65C249.75 285.28 250 286.14 250.01 287.25L245.31 287.25C245.36 287.85 245.51 288.32 245.8 288.64C246.09 288.95 246.49 289.12 246.99 289.12C247.44 289.12 247.8 289.01 248.07 288.81C248.29 288.64 248.47 288.36 248.63 288L249.91 288C249.76 288.58 249.49 289.07 249.06 289.46C248.51 289.92 247.83 290.16 247 290.16C246.09 290.16 245.36 289.88 244.83 289.31C244.25 288.71 243.97 287.91 243.97 286.89C243.97 285.96 244.23 285.2 244.78 284.57ZM251.59 284.1C252.05 283.78 252.67 283.62 253.41 283.62C255.02 283.62 255.91 284.27 256.05 285.58L254.82 285.58C254.72 285.24 254.58 285.01 254.37 284.88C254.15 284.74 253.82 284.67 253.39 284.67C253 284.67 252.72 284.72 252.52 284.84C252.29 284.96 252.19 285.15 252.19 285.39C252.19 285.6 252.36 285.78 252.69 285.94C252.91 286.03 253.32 286.15 253.94 286.31C254.65 286.48 255.17 286.68 255.51 286.9C256 287.21 256.26 287.64 256.26 288.2C256.26 289.5 255.33 290.16 253.5 290.16C251.79 290.16 250.88 289.43 250.74 287.99L251.98 287.99C252.05 288.41 252.21 288.71 252.43 288.88C252.64 289.03 252.98 289.12 253.46 289.12C254.44 289.12 254.95 288.83 254.95 288.28C254.95 287.98 254.76 287.74 254.4 287.57C254.2 287.48 253.78 287.35 253.15 287.21C252.41 287.04 251.9 286.86 251.61 286.67C251.13 286.37 250.89 285.95 250.89 285.42C250.89 284.86 251.12 284.41 251.59 284.1ZM237.08 285.36C236.74 284.89 236.29 284.67 235.7 284.67C235.11 284.67 234.65 284.89 234.33 285.36C234.04 285.76 233.91 286.27 233.91 286.9C233.91 287.52 234.04 288.03 234.33 288.42C234.65 288.88 235.11 289.12 235.7 289.12C236.29 289.12 236.74 288.88 237.08 288.42C237.37 288.01 237.51 287.51 237.51 286.9C237.51 286.27 237.37 285.76 237.08 285.36ZM248.68 286.29C248.56 285.21 248 284.67 246.99 284.67C246.51 284.67 246.14 284.8 245.85 285.09C245.59 285.36 245.41 285.76 245.34 286.29L248.68 286.29Z"
                              :fill="proto.systemColor" fill-opacity="1.000000" fill-rule="evenodd"></path>
                            <rect width="60.000000" height="81.000000" transform="translate(300.000000 213.000000)"
                              :fill="proto.systemColor" fill-opacity="0"></rect>
                            <rect rx="13.000000" width="60.000000" height="60.000000"
                              transform="translate(300.000000 213.000000)" fill="url(#pattern_3_26020)"
                              fill-opacity="0">
                            </rect>
                            <path
                              d="M334.96 290L334.96 281.26L336.23 281.26L336.23 290L334.96 290ZM342.13 290L342.13 281.26L343.41 281.26L343.41 284.67C343.63 284.31 343.92 284.03 344.27 283.86C344.58 283.7 344.93 283.62 345.32 283.62C346.07 283.62 346.63 283.84 347.02 284.28C347.38 284.7 347.56 285.33 347.56 286.14L347.56 290L346.29 290L346.29 286.36C346.29 285.81 346.17 285.4 345.95 285.11C345.71 284.81 345.34 284.67 344.86 284.67C344.43 284.67 344.08 284.84 343.81 285.18C343.54 285.53 343.41 285.98 343.41 286.51L343.41 290L342.13 290ZM312.55 290L312.55 281.43L313.86 281.43L313.86 285.04L318.35 285.04L318.35 281.43L319.66 281.43L319.66 290L318.35 290L318.35 286.15L313.86 286.15L313.86 290L312.55 290ZM338.43 282.32L339.7 281.79L339.7 283.79L341.11 283.79L341.11 284.85L339.7 284.85L339.7 288.45C339.7 288.62 339.73 288.74 339.81 288.82C339.88 288.89 339.99 288.94 340.14 288.94L340.96 288.94L340.96 290L339.94 290C339.41 290 339.01 289.85 338.77 289.58C338.53 289.31 338.43 288.94 338.43 288.45L338.43 284.85L337.27 284.85L337.27 283.79L338.43 283.79L338.43 282.32ZM321.67 284.57C322.2 283.94 322.93 283.62 323.85 283.62C324.85 283.62 325.63 283.96 326.16 284.65C326.64 285.28 326.89 286.14 326.9 287.25L322.2 287.25C322.25 287.85 322.4 288.32 322.69 288.64C322.98 288.95 323.38 289.12 323.88 289.12C324.33 289.12 324.69 289.01 324.96 288.81C325.18 288.64 325.36 288.36 325.52 288L326.8 288C326.65 288.58 326.38 289.07 325.95 289.46C325.4 289.92 324.72 290.16 323.89 290.16C322.98 290.16 322.25 289.88 321.72 289.31C321.14 288.71 320.86 287.91 320.86 286.89C320.86 285.96 321.12 285.2 321.67 284.57ZM328.93 284.04C329.39 283.76 330.01 283.62 330.78 283.62C331.69 283.62 332.37 283.85 332.8 284.31C333.17 284.7 333.36 285.28 333.36 286.03L333.36 290L332.18 290L332.18 289.12C331.94 289.43 331.65 289.68 331.29 289.86C330.88 290.05 330.4 290.16 329.85 290.16C329.2 290.16 328.69 290 328.33 289.67C327.94 289.35 327.75 288.93 327.75 288.41C327.75 287.72 328.02 287.17 328.57 286.8C329.08 286.44 329.8 286.26 330.71 286.24L332.1 286.2L332.1 285.95C332.1 285.09 331.63 284.65 330.7 284.65C330.3 284.65 329.98 284.73 329.74 284.87C329.45 285.04 329.27 285.29 329.2 285.64L327.94 285.53C328.07 284.86 328.41 284.35 328.93 284.04ZM325.57 286.29C325.45 285.21 324.89 284.67 323.88 284.67C323.4 284.67 323.03 284.8 322.74 285.09C322.48 285.36 322.3 285.76 322.23 286.29L325.57 286.29ZM332.1 287.49L332.1 287.13L330.79 287.16C329.63 287.19 329.05 287.6 329.05 288.36C329.05 288.6 329.15 288.79 329.35 288.95C329.54 289.11 329.81 289.19 330.13 289.19C330.67 289.19 331.13 289.02 331.51 288.7C331.9 288.38 332.1 287.97 332.1 287.49Z"
                              :fill="proto.systemColor" fill-opacity="1.000000" fill-rule="evenodd"></path>
                          </g>
                          <g filter="url(#filter_3_2662_dd)">
                            <rect width="60.000000" height="81.000000" transform="translate(162.000000 115.000000)"
                              :fill="proto.systemColor" fill-opacity="0"></rect>
                            <rect rx="13.000000" width="60.000000" height="60.000000"
                              transform="translate(162.000000 115.000000)" fill="url(#pattern_3_26660)"
                              fill-opacity="0">
                            </rect>
                            <path
                              d="M175.51 183.87C176.11 183.46 176.86 183.26 177.78 183.26C178.77 183.26 179.55 183.46 180.11 183.89C180.71 184.34 181.05 185.02 181.14 185.96L179.84 185.96C179.72 185.41 179.5 185 179.17 184.76C178.83 184.51 178.35 184.39 177.7 184.39C177.14 184.39 176.71 184.47 176.41 184.64C176.04 184.83 175.85 185.14 175.85 185.58C175.85 185.96 176.06 186.26 176.49 186.49C176.68 186.6 177.18 186.77 177.98 187.02C179.13 187.38 179.89 187.65 180.22 187.86C180.96 188.3 181.33 188.91 181.33 189.7C181.33 190.47 181.03 191.07 180.43 191.52C179.83 191.95 178.99 192.16 177.91 192.16C176.86 192.16 176.05 191.95 175.46 191.54C174.75 191.03 174.37 190.24 174.3 189.16L175.59 189.16C175.69 189.84 175.93 190.33 176.31 190.62C176.66 190.88 177.19 191.01 177.91 191.01C178.56 191.01 179.07 190.89 179.46 190.67C179.84 190.46 180.03 190.16 180.03 189.77C180.03 189.29 179.76 188.92 179.21 188.65C179.02 188.55 178.46 188.36 177.51 188.07C176.46 187.74 175.81 187.51 175.54 187.36C174.88 186.97 174.56 186.39 174.56 185.65C174.56 184.89 174.87 184.3 175.51 183.87ZM171.68 183.55C171.85 183.38 172.05 183.31 172.3 183.31C172.56 183.31 172.77 183.38 172.94 183.55C173.11 183.7 173.19 183.91 173.19 184.16C173.19 184.41 173.09 184.62 172.93 184.78C172.76 184.94 172.54 185.02 172.3 185.02C172.05 185.02 171.85 184.94 171.68 184.78C171.51 184.62 171.43 184.4 171.43 184.16C171.43 183.91 171.51 183.7 171.68 183.55ZM182.94 186.6C183.47 185.95 184.22 185.62 185.18 185.62C185.97 185.62 186.61 185.8 187.09 186.16C187.57 186.55 187.88 187.12 188 187.89L186.74 187.89C186.66 187.47 186.49 187.16 186.22 186.97C185.96 186.76 185.61 186.67 185.18 186.67C184.65 186.67 184.24 186.86 183.94 187.26C183.63 187.64 183.49 188.19 183.49 188.89C183.49 189.58 183.63 190.14 183.93 190.53C184.21 190.91 184.61 191.12 185.17 191.12C186.11 191.12 186.64 190.64 186.76 189.7L188.02 189.7C187.88 190.53 187.56 191.15 187.08 191.56C186.6 191.96 185.95 192.16 185.16 192.16C184.21 192.16 183.47 191.85 182.95 191.23C182.43 190.63 182.18 189.86 182.18 188.9Q182.18 187.7 182.73 186.87Q182.83 186.73 182.94 186.6ZM190.99 185.97C191.28 185.73 191.61 185.62 192 185.62C192.31 185.62 192.58 185.67 192.8 185.78L192.8 187.05C192.49 186.96 192.19 186.92 191.9 186.92C191.52 186.92 191.17 187.08 190.87 187.39C190.54 187.72 190.39 188.17 190.39 188.71L190.39 192L189.12 192L189.12 185.79L190.39 185.79L190.39 186.73C190.54 186.39 190.75 186.14 190.99 185.97ZM194.03 186.57C194.56 185.94 195.29 185.62 196.21 185.62C197.22 185.62 198 185.96 198.52 186.65C199 187.28 199.26 188.14 199.27 189.25L194.56 189.25C194.61 189.85 194.77 190.32 195.06 190.64C195.34 190.95 195.74 191.12 196.24 191.12C196.69 191.12 197.05 191.01 197.32 190.81C197.54 190.64 197.72 190.36 197.89 190L199.16 190C199.01 190.58 198.74 191.07 198.31 191.46C197.77 191.92 197.08 192.16 196.26 192.16C195.34 192.16 194.61 191.88 194.08 191.31C193.51 190.71 193.22 189.91 193.22 188.89C193.22 187.96 193.48 187.2 194.03 186.57ZM200.8 186.57C201.33 185.94 202.06 185.62 202.98 185.62C203.98 185.62 204.76 185.96 205.29 186.65C205.77 187.28 206.02 188.14 206.03 189.25L201.33 189.25C201.38 189.85 201.53 190.32 201.82 190.64C202.11 190.95 202.51 191.12 203.01 191.12C203.46 191.12 203.82 191.01 204.09 190.81C204.31 190.64 204.49 190.36 204.65 190L205.93 190C205.78 190.58 205.51 191.07 205.08 191.46C204.53 191.92 203.85 192.16 203.02 192.16C202.11 192.16 201.38 191.88 200.85 191.31C200.27 190.71 199.99 189.91 199.99 188.89C199.99 187.96 200.25 187.2 200.8 186.57ZM209.22 185.86C209.53 185.7 209.88 185.62 210.26 185.62C211.79 185.62 212.57 186.46 212.57 188.17L212.57 192L211.3 192L211.3 188.27C211.3 187.22 210.81 186.69 209.85 186.69C209.49 186.69 209.17 186.81 208.9 187.08C208.62 187.36 208.43 187.76 208.39 188.26L208.39 192L207.12 192L207.12 185.79L208.39 185.79L208.39 186.56C208.63 186.25 208.9 186.02 209.22 185.86ZM171.67 192L171.67 185.79L172.94 185.79L172.94 192L171.67 192ZM197.94 188.29C197.82 187.21 197.25 186.67 196.24 186.67C195.76 186.67 195.39 186.8 195.1 187.09C194.84 187.36 194.66 187.76 194.59 188.29L197.94 188.29ZM204.7 188.29C204.58 187.21 204.02 186.67 203.01 186.67C202.53 186.67 202.16 186.8 201.87 187.09C201.61 187.36 201.43 187.76 201.36 188.29L204.7 188.29Z"
                              :fill="proto.systemColor" fill-opacity="1.000000" fill-rule="evenodd"></path>
                          </g>
                          <rect width="183.000000" height="175.000000" :fill="proto.systemColor" fill-opacity="0">
                          </rect>
                          <g filter="url(#filter_3_2557_dd)">
                            <rect width="91.000000" height="28.000000" transform="matrix(1 0 0 -1 150 655)"
                              :fill="proto.systemColor" fill-opacity="0"></rect>
                            <g clip-path="url(#clip3_2559)">
                              <rect rx="14.000000" width="91.000000" height="28.000000"
                                transform="matrix(1 0 0 -1 150 655)" fill="#F5F5F5" fill-opacity="0.600000"></rect>
                            </g>
                            <rect width="71.000000" height="18.000000" transform="translate(160.000000 632.000000)"
                              :fill="proto.systemColor" fill-opacity="0"></rect>
                            <path
                              d="M189.56 637.81L188.28 637.81C188.15 636.74 187.15 636.11 185.83 636.11C184.38 636.11 183.42 636.88 183.42 637.92C183.42 639.09 184.72 639.52 185.53 639.73L186.64 640.03C187.77 640.33 189.71 640.99 189.71 643.03C189.71 644.8 188.28 646.19 185.77 646.19C183.42 646.19 181.98 644.97 181.85 643.18L183.21 643.18C183.32 644.42 184.47 645 185.77 645C187.28 645 188.43 644.2 188.43 643.01C188.43 641.93 187.41 641.52 186.26 641.2L184.92 640.82C183.21 640.33 182.15 639.45 182.15 637.98C182.15 636.15 183.79 634.94 185.87 634.94C187.98 634.94 189.5 636.17 189.56 637.81ZM226.02 638.84C224.78 638.84 223.86 639.65 223.86 641.07L223.86 646L222.61 646L222.61 635.09L223.86 635.09L223.86 639.09L223.97 639.09C224.35 638.25 225.09 637.71 226.38 637.71C228.05 637.71 229.17 638.69 229.17 640.8L229.17 646L227.91 646L227.91 640.88C227.91 639.58 227.2 638.84 226.02 638.84ZM210.16 646L208.91 646L208.91 637.81L210.12 637.81L210.12 639.05L210.21 639.05C210.51 638.24 211.36 637.69 212.34 637.69C212.52 637.69 212.85 637.7 213 637.71L213 638.99C212.91 638.96 212.57 638.9 212.23 638.9C211.04 638.9 210.16 639.71 210.16 640.82L210.16 646ZM198.4 644.1C198.02 645.34 196.81 646.17 195.14 646.17C192.78 646.17 191.33 644.48 191.33 641.97C191.33 639.45 192.8 637.71 195.02 637.71C196.72 637.71 198.53 638.75 198.53 641.8L198.53 642.33L192.59 642.33C192.65 644.08 193.67 645.04 195.14 645.04C196.13 645.04 196.87 644.61 197.19 643.76L198.4 644.1ZM205.29 644.89C205.03 645.42 204.28 646.19 202.86 646.19C201.3 646.19 200.06 645.27 200.06 643.67C200.06 641.8 201.72 641.46 203.24 641.26C204.73 641.07 205.35 641.13 205.35 640.52L205.35 640.48C205.35 639.43 204.78 638.81 203.62 638.81C202.43 638.81 201.77 639.45 201.49 640.05L200.3 639.62C200.94 638.13 202.34 637.71 203.58 637.71C204.63 637.71 206.61 638 206.61 640.6L206.61 646L205.35 646L205.35 644.89L205.29 644.89ZM220.77 643.61C220.56 645.06 219.37 646.17 217.56 646.17C215.26 646.17 213.85 644.4 213.85 641.95C213.85 639.45 215.32 637.71 217.54 637.71C219.26 637.71 220.56 638.73 220.77 640.26L219.52 640.26C219.33 639.52 218.66 638.84 217.56 638.84C216.09 638.84 215.11 640.05 215.11 641.9C215.11 643.8 216.07 645.04 217.56 645.04C218.54 645.04 219.28 644.51 219.52 643.61L220.77 643.61ZM195.02 638.84C193.58 638.84 192.68 639.97 192.59 641.25L197.25 641.25C197.25 639.86 196.38 638.84 195.02 638.84ZM201.32 643.74C201.32 644.61 202.05 645.06 203.05 645.06C204.54 645.06 205.35 644.06 205.35 643.03L205.35 641.88C205.14 642.14 203.71 642.29 203.18 642.35C202.19 642.48 201.32 642.78 201.32 643.74Z"
                              :fill="proto.systemColor" fill-opacity="1.000000" fill-rule="evenodd"></path>
                          </g>
                          <path
                            d="M161.844 639.335C161.844 642.558 164.466 645.18 167.689 645.18C168.963 645.18 170.128 644.77 171.087 644.081L174.691 647.692C174.859 647.86 175.079 647.941 175.313 647.941C175.812 647.941 176.156 647.567 176.156 647.077C176.156 646.842 176.068 646.63 175.914 646.476L172.333 642.873C173.087 641.891 173.534 640.668 173.534 639.335C173.534 636.112 170.912 633.49 167.689 633.49C164.466 633.49 161.844 636.112 161.844 639.335ZM163.097 639.335C163.097 636.801 165.155 634.743 167.689 634.743C170.223 634.743 172.281 636.801 172.281 639.335C172.281 641.869 170.223 643.927 167.689 643.927C165.155 643.927 163.097 641.869 163.097 639.335Z"
                            :fill="proto.systemColor"></path>
                        </svg>
                        <img v-if="desktopRadio == 2"
                          style="position: absolute;width: 342px;height: 739px;top: 17px;left: 24px;"
                          src="/image/desktop-app-icon-2.png"></img>
                        <img v-if="desktopRadio == 3"
                          style="position: absolute;width: 342px;height: 739px;top: 17px;left: 24px;"
                          src="/image/desktop-app-icon-3.png"></img>
                      </template>
                    </div>

                    <img v-if="proto.screenType == '聊天'" class="chat-image" src="/image/wechat-background.png"></img>

                    <template v-if="proto.screenType == 'lockScreen'">
                      <div class="date-time">
                        <div class="date" :style="{ color: proto.dateTimeColor }">{{ formatedDate(proto.selectedDate) }}
                        </div>
                        <div class="time" :style="timeStyle(proto)">{{ proto.selectedTime.getHours() }}<span
                            style="position: relative;top: -7.85714px;">:</span>{{
                              formatTimeMinutes(proto.selectedTime.getMinutes()) }}
                        </div>
                      </div>

                      <div v-if="componentRadio == 1" class="component-one">
                        <svg width="328" height="70" viewBox="0 0 328 70" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <clipPath id="clip9_1">
                              <rect id="Group 31" width="328.000000" height="70.000000" :fill="proto.dateTimeColor"
                                fill-opacity="0">
                              </rect>
                            </clipPath>
                          </defs>
                          <g clip-path="url(#clip9_1)">
                            <g opacity="0.000000">
                              <rect id="矩形 6606" rx="8.364706" width="158.000000" height="70.635292" fill="#969CA3"
                                fill-opacity="1.000000"></rect>
                              <rect id="矩形 6606" x="0.232361" y="0.232361" rx="8.364706" width="157.535294"
                                height="70.170586" stroke="#D8D8D8" stroke-opacity="0" stroke-width="0.464706"></rect>
                            </g>
                            <path id="100%"
                              d="M34.11 13.5C34.79 12.45 35.76 11.93 37.01 11.93C38.26 11.93 39.23 12.45 39.91 13.5C40.54 14.49 40.85 15.79 40.85 17.45C40.85 19.08 40.54 20.4 39.91 21.39C39.23 22.43 38.26 22.96 37.01 22.96C35.76 22.96 34.79 22.43 34.11 21.39C33.49 20.4 33.17 19.09 33.17 17.45C33.17 15.78 33.49 14.47 34.11 13.5ZM43.03 13.5C43.72 12.45 44.69 11.93 45.93 11.93C47.18 11.93 48.15 12.45 48.84 13.5C49.46 14.49 49.77 15.79 49.77 17.45C49.77 19.08 49.46 20.4 48.84 21.39C48.15 22.43 47.18 22.96 45.93 22.96C44.69 22.96 43.72 22.43 43.03 21.39C42.41 20.4 42.1 19.09 42.1 17.45C42.1 15.78 42.41 14.47 43.03 13.5ZM54.17 22.96L60.12 11.93L61.34 11.93L55.38 22.96L54.17 22.96ZM28.6 13.19C29.13 12.86 29.58 12.52 29.93 12.13L31.15 12.13L31.15 22.75L29.53 22.75L29.53 14.08C28.89 14.69 28.07 15.14 27.09 15.42L27.09 13.82C27.57 13.7 28.06 13.49 28.6 13.19ZM52.03 13.01C52.48 12.42 53.12 12.13 53.95 12.13C54.77 12.13 55.39 12.42 55.84 13.01C56.23 13.52 56.43 14.2 56.43 15.05C56.43 15.88 56.23 16.57 55.84 17.09C55.39 17.65 54.77 17.95 53.95 17.95C53.12 17.95 52.48 17.65 52.03 17.09C51.63 16.55 51.44 15.88 51.44 15.05C51.44 14.2 51.63 13.52 52.03 13.01ZM54.75 13.76C54.59 13.35 54.32 13.16 53.95 13.16C53.56 13.16 53.28 13.35 53.1 13.74C52.97 14.06 52.91 14.49 52.91 15.05C52.91 15.59 52.97 16.02 53.1 16.35C53.28 16.73 53.56 16.92 53.95 16.92C54.32 16.92 54.59 16.72 54.77 16.31C54.89 16 54.96 15.59 54.96 15.05C54.96 14.5 54.89 14.07 54.75 13.76ZM38.86 14.74C38.5 13.77 37.87 13.3 37.01 13.3C36.13 13.3 35.52 13.77 35.17 14.74C34.9 15.39 34.78 16.3 34.78 17.45C34.78 18.58 34.9 19.48 35.17 20.15C35.52 21.1 36.13 21.6 37.01 21.6C37.87 21.6 38.5 21.1 38.86 20.15C39.11 19.48 39.24 18.58 39.24 17.45C39.24 16.3 39.11 15.39 38.86 14.74ZM47.78 14.74C47.42 13.77 46.8 13.3 45.93 13.3C45.06 13.3 44.45 13.77 44.09 14.74C43.82 15.39 43.7 16.3 43.7 17.45C43.7 18.58 43.82 19.48 44.09 20.15C44.45 21.1 45.06 21.6 45.93 21.6C46.8 21.6 47.42 21.1 47.78 20.15C48.03 19.48 48.16 18.58 48.16 17.45C48.16 16.3 48.03 15.39 47.78 14.74ZM59.67 17.82C60.12 17.22 60.76 16.94 61.59 16.94C62.41 16.94 63.04 17.22 63.48 17.82C63.87 18.32 64.07 19.01 64.07 19.85C64.07 20.69 63.87 21.37 63.48 21.89C63.04 22.46 62.41 22.75 61.59 22.75C60.76 22.75 60.12 22.46 59.67 21.89C59.27 21.36 59.08 20.69 59.08 19.85C59.08 19.01 59.27 18.32 59.67 17.82ZM62.39 18.56C62.23 18.16 61.97 17.97 61.59 17.97C61.21 17.97 60.92 18.16 60.75 18.55C60.61 18.86 60.55 19.29 60.55 19.85C60.55 20.39 60.61 20.82 60.75 21.15C60.92 21.53 61.21 21.73 61.59 21.73C61.97 21.73 62.23 21.52 62.41 21.12C62.53 20.8 62.6 20.39 62.6 19.85C62.6 19.3 62.53 18.87 62.39 18.56Z"
                              :fill="proto.dateTimeColor" fill-opacity="1.000000" fill-rule="evenodd"></path>
                            <g opacity="0.300000">
                              <rect id="矩形 6607" x="6.505859" y="48.794128" rx="3.717647" width="144.988235"
                                height="7.435294" :fill="proto.dateTimeColor" fill-opacity="1.000000"></rect>
                              <rect id="矩形 6607" x="6.738220" y="49.026489" rx="3.485294" width="144.523529"
                                height="6.970588" stroke="#D8D8D8" stroke-opacity="0" stroke-width="0.464706"></rect>
                            </g>
                            <rect id="矩形 6608" x="6.505859" y="48.794128" rx="3.717647" width="144.988235"
                              height="7.435294" :fill="proto.dateTimeColor" fill-opacity="1.000000"></rect>
                            <rect id="矩形 6608" x="6.738220" y="49.026489" rx="3.485294" width="144.523529"
                              height="6.970588" stroke="#D8D8D8" stroke-opacity="0" stroke-width="0.464706"></rect>
                            <rect id="矩形 1766" x="6.505859" y="9.294128" width="15.800000" height="15.799999"
                              :fill="proto.dateTimeColor" fill-opacity="0"></rect>
                            <rect id="矩形 1766" x="6.738220" y="9.526489" width="15.335295" height="15.335294"
                              stroke="#D8D8D8" stroke-opacity="0" stroke-width="0.464706"></rect>
                            <path
                              d="M12.5815 23.6642C11.9551 23.6642 11.6087 23.3316 11.6087 22.7405V11.324C11.6087 10.7329 11.9551 10.4004 12.5815 10.4004H17.7402C18.3593 10.4004 18.7057 10.7329 18.7057 11.324V22.7405C18.7057 23.3316 18.3593 23.6642 17.7402 23.6642H12.5815Z"
                              :fill="proto.dateTimeColor" fill-opacity="0.211765" transform="translate(-1.5, 0)"></path>
                            <path
                              d="M12.4267 24.854H17.8876C19.0889 24.854 19.8922 24.0856 19.8922 22.9329V11.1322C19.8922 9.97942 19.0889 9.21094 17.8876 9.21094H12.4267C11.2255 9.21094 10.4222 9.97942 10.4222 11.1322V22.9329C10.4222 24.0856 11.2255 24.854 12.4267 24.854ZM12.5815 23.6644C11.9551 23.6644 11.6087 23.3319 11.6087 22.7407V11.3243C11.6087 10.7331 11.9551 10.4006 12.5815 10.4006H17.7402C18.3593 10.4006 18.7057 10.7331 18.7057 11.3243V22.7407C18.7057 23.3319 18.3593 23.6644 17.7402 23.6644H12.5815ZM13.5985 23.125H16.7306C16.9296 23.125 17.0696 22.9845 17.0696 22.7777C17.0696 22.5707 16.9296 22.4377 16.7306 22.4377H13.5985C13.3995 22.4377 13.2521 22.5707 13.2521 22.7777C13.2521 22.9845 13.3995 23.125 13.5985 23.125ZM14.2691 12.0263H16.0526C16.34 12.0263 16.5685 11.7972 16.5685 11.5016C16.5685 11.2134 16.34 10.9844 16.0526 10.9844H14.2691C13.9744 10.9844 13.7459 11.2134 13.7459 11.5016C13.7459 11.7972 13.9744 12.0263 14.2691 12.0263Z"
                              :fill="proto.dateTimeColor" fill-opacity="0.85098" transform="translate(-1.5, 0)"></path>
                            <path id="路径 7252" d="" :fill="proto.dateTimeColor" fill-opacity="0" fill-rule="evenodd">
                            </path>
                            <mask id="mask_1_14" :fill="proto.dateTimeColor">
                              <path id="路径 7253"
                                d="M17.1687 25.0792L11.6436 25.0792C10.4282 25.0792 9.61542 24.3038 9.61542 23.1406L9.61542 11.2328C9.61542 10.0696 10.4282 9.29413 11.6436 9.29413L17.1687 9.29413C18.3841 9.29413 19.1968 10.0696 19.1968 11.2328L19.1968 23.1406C19.1968 24.3038 18.3841 25.0792 17.1687 25.0792ZM10.8159 22.9467C10.8159 23.5432 11.1663 23.8787 11.8001 23.8787L17.0196 23.8787C17.6459 23.8787 17.9963 23.5432 17.9963 22.9467L17.9963 11.4266C17.9963 10.8301 17.6459 10.4946 17.0196 10.4946L11.8001 10.4946C11.1663 10.4946 10.8159 10.8301 10.8159 11.4266L10.8159 22.9467ZM15.3121 12.135L13.5076 12.135C13.2094 12.135 12.9782 11.9039 12.9782 11.6056C12.9782 11.3148 13.2094 11.0837 13.5076 11.0837L15.3121 11.0837C15.6028 11.0837 15.834 11.3148 15.834 11.6056C15.834 11.9039 15.6028 12.135 15.3121 12.135ZM12.8291 23.3344L15.998 23.3344C16.1993 23.3344 16.3411 23.1927 16.3411 22.9839C16.3411 22.7752 16.1993 22.641 15.998 22.641L12.8291 22.641C12.6278 22.641 12.4786 22.7752 12.4786 22.9839C12.4786 23.1927 12.6278 23.3344 12.8291 23.3344Z"
                                clip-rule="evenodd" fill="" fill-opacity="1.000000" fill-rule="evenodd"></path>
                            </mask>
                          </g>
                          <path
                            d="M300.899 42.2121C300.585 42.2363 300.284 42.3751 299.976 42.4415C299.813 42.4837 299.632 42.532 299.481 42.4958C299.258 42.4415 299.052 42.3147 298.835 42.2302C298.509 42.1035 298.183 41.9465 297.839 41.8741C296.753 41.6629 295.878 42.2061 295.594 43.2744C295.473 43.7271 295.413 44.1979 295.328 44.6566C295.37 45.2481 295.497 45.7551 295.805 46.2078C296.125 46.6726 296.475 47.1132 297.091 47.2218C297.157 47.2339 297.217 47.2822 297.278 47.3184C297.61 47.5417 297.978 47.6685 298.376 47.7047C299.089 47.7711 299.801 47.7168 300.374 47.2581C301.491 46.3648 302.191 45.1999 302.384 43.7694C302.511 42.858 301.823 42.1457 300.899 42.2121Z"
                            :fill="proto.dateTimeColor"></path>
                          <path
                            d="M321.246 31.4187C321.168 31.6903 320.884 31.8472 320.612 31.7748C317.812 30.9781 316.429 33.1027 316.417 33.1208C316.321 33.2777 316.152 33.3622 315.983 33.3622C315.886 33.3622 315.796 33.332 315.711 33.2837C315.47 33.1268 315.397 32.813 315.548 32.5715C315.566 32.5413 316.013 31.8533 316.888 31.2919C317.703 30.7728 319.055 30.2658 320.89 30.7849C321.161 30.8634 321.324 31.1471 321.246 31.4187Z"
                            :fill="proto.dateTimeColor"></path>
                          <path
                            d="M327.668 29.5853C327.493 30.3036 327.064 30.877 326.521 31.3719C325.894 31.9393 325.163 32.3618 324.427 32.7662C324.228 32.8808 324.065 32.8507 323.92 32.6877C323.733 32.4825 323.763 32.229 324.004 32.0841C324.318 31.891 324.644 31.7159 324.964 31.5228C325.453 31.227 325.912 30.8951 326.298 30.4665C326.708 30.0138 326.974 29.4948 326.932 28.861C326.908 28.4385 326.763 28.0582 326.413 27.7927C326.069 27.5271 325.67 27.5693 325.38 27.8892C325.127 28.1729 324.916 28.4807 324.819 28.861C324.759 29.0964 324.56 29.2111 324.342 29.1567C324.107 29.0964 323.98 28.9032 324.034 28.6558C324.089 28.4083 324.149 28.1669 324.107 27.9073C324.077 27.678 324.01 27.4788 323.775 27.3943C323.515 27.3098 323.286 27.3822 323.099 27.5633C322.845 27.8108 322.743 28.1307 322.713 28.4747C322.622 29.537 323.027 30.4062 323.727 31.1727C323.793 31.2451 323.872 31.3115 323.938 31.384C324.119 31.565 324.125 31.7461 323.968 31.9151C323.805 32.1022 323.57 32.1203 323.389 31.9694C323.232 31.8427 323.087 31.6918 322.96 31.5349C322.401 30.8709 322.057 30.1124 321.928 29.2594C321.922 29.1869 321.934 29.1145 321.898 29.0541C321.898 28.8127 321.898 28.5713 321.898 28.3298C321.928 28.185 321.952 28.0341 321.988 27.8892C322.127 27.4064 322.387 27.008 322.839 26.7545C323.008 26.664 323.189 26.6277 323.358 26.5674C323.515 26.5674 323.67 26.5674 323.823 26.5674C324.065 26.6338 324.3 26.7062 324.481 26.8994C324.584 27.002 324.674 27.1106 324.735 27.2434C324.771 27.3219 324.801 27.3219 324.867 27.2615C325.085 27.0502 325.332 26.8873 325.634 26.8269C326.135 26.7303 326.576 26.8752 326.95 27.2011C327.692 27.8349 327.891 28.6558 327.668 29.5853Z"
                            :fill="proto.dateTimeColor"></path>
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M316.604 47.2579C316.381 47.5717 316.122 47.8675 315.85 48.1451C315.834 48.1653 315.816 48.1834 315.796 48.1995C315.784 48.2115 315.77 48.2236 315.753 48.2357C312.072 51.2657 307.623 52.0926 306.845 52.2133C306.643 52.2656 306.442 52.3139 306.241 52.3581C304.038 52.835 301.805 53.0221 299.553 52.9979C297.513 52.9798 295.497 52.7625 293.493 52.3883C292.226 52.1469 290.976 51.8511 289.781 51.3743C289.777 51.3743 289.775 51.3723 289.775 51.3683C286.425 50.4146 284.361 47.6804 283.625 46.5215C283.601 46.4893 283.579 46.4571 283.558 46.4249C283.502 46.3364 283.448 46.2459 283.395 46.1533C283.383 46.1292 283.371 46.1071 283.359 46.0869C283.355 46.0789 283.349 46.0688 283.341 46.0568C283.321 46.0205 283.311 46.0024 283.311 46.0024C282.864 45.1816 282.575 44.3003 282.357 43.395C281.868 41.4152 281.874 39.4415 282.418 37.4738C282.635 36.6831 283.021 35.9709 283.426 35.2587C283.933 34.3593 284.693 33.7196 285.429 33.0556C286.184 32.3675 287.071 31.8545 288.025 31.4742C288.375 31.3354 288.755 31.275 289.148 31.1664C289.135 31.0759 289.129 30.9431 289.105 30.8163C288.822 28.9633 289.045 27.1647 289.685 25.4082C290.137 24.1588 290.693 22.9577 291.568 21.9437C292.878 20.4227 294.447 19.2457 296.318 18.4972C297.586 17.9902 298.907 17.8937 300.247 18.1049C301.376 18.2799 302.221 18.9318 302.879 19.8312C303.434 20.5917 303.809 21.4367 303.99 22.3602C303.996 22.3903 304.002 22.4145 304.026 22.4809C304.092 22.4145 304.141 22.3662 304.189 22.3179C304.871 21.6238 305.589 20.9719 306.392 20.4166C307.798 19.4509 309.343 19.2215 310.997 19.5113C311.903 19.6682 312.76 19.9338 313.484 20.5192C314.051 20.978 314.534 21.5031 314.854 22.161C314.906 22.2736 314.955 22.3903 314.999 22.5111C315.343 23.2414 316.454 25.9997 315.271 29.4221C315.267 29.4261 315.265 29.4281 315.265 29.4281C315.204 29.6373 315.136 29.8446 315.059 30.0498C314.649 31.1483 314.148 32.2046 313.496 33.122C314.1 33.6894 314.703 34.2447 315.295 34.812C316.864 36.315 317.975 38.0895 318.246 40.2624C318.554 42.7733 318.095 45.1514 316.604 47.2579ZM286.938 39.5019C286.631 39.4053 286.335 39.5683 286.22 39.9063C285.949 40.709 285.683 41.5118 285.417 42.3085C285.381 42.4111 285.369 42.5137 285.357 42.5681C285.357 42.8517 285.502 43.063 285.713 43.1415C285.949 43.232 286.166 43.1837 286.329 43.0026C286.425 42.888 286.492 42.7371 286.546 42.5922C286.757 41.9705 286.963 41.3428 287.174 40.7211C287.228 40.5581 287.289 40.3952 287.325 40.2322C287.403 39.8882 287.24 39.5924 286.938 39.5019ZM290.789 40.1236C290.789 39.8037 290.62 39.5864 290.373 39.526C290.107 39.4536 289.811 39.5622 289.703 39.8459C289.413 40.6547 289.142 41.4695 288.894 42.2904C288.816 42.5499 288.997 42.8095 289.238 42.9C289.486 43.0026 289.775 42.9181 289.926 42.6767C289.999 42.556 290.047 42.4232 290.095 42.2904C290.308 41.6426 290.522 40.9967 290.735 40.3529C290.759 40.2624 290.777 40.1658 290.789 40.1236ZM299.487 31.6432C299.523 31.9269 299.765 32.1321 300.042 32.1321C300.066 32.1321 300.092 32.1301 300.121 32.1261C300.428 32.0838 300.64 31.8002 300.597 31.4923C300.169 28.2934 302.933 23.676 302.964 23.6216C303.127 23.3561 303.042 23.012 302.776 22.8551C302.511 22.6921 302.167 22.7766 302.004 23.0422C301.883 23.2414 298.998 28.0459 299.487 31.6432ZM294.93 39.5622C295.491 39.5803 295.968 39.2121 296.071 38.6568C296.113 38.4396 296.113 38.2102 296.131 37.9869C296.113 37.7696 296.119 37.5523 296.077 37.341C295.962 36.7857 295.491 36.4236 294.93 36.4417C294.393 36.4658 293.928 36.8642 293.874 37.4195C293.831 37.8058 293.831 38.2102 293.868 38.5965C293.922 39.1518 294.393 39.5502 294.93 39.5622ZM302.402 41.5118C301.642 41.0108 300.827 40.9746 299.982 41.2583C299.71 41.3549 299.517 41.3488 299.239 41.1859C298.582 40.8056 297.845 40.6366 297.079 40.7513C295.859 40.9324 294.966 41.5299 294.58 42.7552C294.381 43.3889 294.272 44.0287 294.254 44.7591C294.29 46.093 294.876 47.2036 296.04 47.9943C296.131 48.0606 296.246 48.0908 296.348 48.1391C296.493 48.2055 296.638 48.2598 296.783 48.3323C296.928 48.4047 297.061 48.5254 297.211 48.5677C297.61 48.6703 298.014 48.7789 298.419 48.8151C299.384 48.9057 300.326 48.7427 301.086 48.115C302.457 46.9863 303.338 45.5437 303.489 43.739C303.567 42.8095 303.211 42.0369 302.402 41.5118ZM304.43 39.0914C304.358 39.0009 304.267 38.9104 304.165 38.856C303.754 38.6448 303.344 38.4456 302.945 38.2464C302.976 38.2464 303.054 38.2283 303.133 38.2162C303.428 38.1498 303.615 37.9265 303.609 37.6489C303.609 37.3652 303.392 37.1117 303.096 37.0936C302.897 37.0815 302.692 37.1056 302.499 37.16C301.98 37.3109 301.503 37.5704 301.092 37.9265C300.893 38.0895 300.706 38.2826 300.537 38.4818C300.374 38.675 300.338 38.9104 300.459 39.1518C300.579 39.3811 300.785 39.4717 301.032 39.4717C301.141 39.4717 301.243 39.4596 301.346 39.4475C302.155 39.3148 302.927 39.3691 303.615 39.8761C303.676 39.9244 303.748 39.9485 303.821 39.9666C304.062 40.0451 304.316 39.9606 304.454 39.7614C304.593 39.5562 304.593 39.2906 304.43 39.0914ZM310.858 50.7345C310.858 50.7385 310.858 50.7405 310.858 50.7405V50.7345ZM311.866 42.0671C311.764 41.5842 311.637 41.0953 311.504 40.6185C311.42 40.3227 311.148 40.1598 310.87 40.2081C310.575 40.2503 310.382 40.4978 310.339 40.8237C310.49 41.3609 310.623 41.9041 310.804 42.4292C310.901 42.7129 311.221 42.8276 311.492 42.7431C311.77 42.6526 311.939 42.387 311.866 42.0671ZM315.403 42.4715C315.355 42.3206 315.319 42.1697 315.246 42.0309C314.997 41.5319 314.739 41.035 314.474 40.54C314.371 40.3529 314.251 40.1658 314.118 39.9968C313.888 39.7131 313.538 39.6648 313.279 39.864C313.037 40.0572 313.001 40.3831 313.194 40.6909C313.363 40.9806 313.538 41.2704 313.695 41.5661C313.9 41.9524 314.094 42.3508 314.299 42.7431C314.438 43.0026 314.691 43.1173 314.957 43.0509C315.204 42.9845 315.373 42.7552 315.403 42.4715Z"
                            :fill="proto.dateTimeColor"></path>
                          <path
                            d="M203.797 38.4717C199.357 34.5317 196.207 27.9744 197.436 21.9452C197.922 19.5616 199.539 16.8041 202.395 17.2014C205.405 17.622 204.938 22.0527 204.288 24.0998C205.64 24.4737 206.994 24.8461 208.349 25.2169C208.733 23.4315 209.756 21.7817 210.943 20.4076C211.972 19.2158 213.201 18.2156 214.86 18.5287C218.099 19.1456 219.73 22.8379 219.641 25.8104C219.398 33.9194 210.247 38.682 204.115 42.1172C201.75 43.4446 203.872 47.0808 206.242 45.7488C213.028 41.9443 220.819 37.4528 223.24 29.5354C224.306 26.0582 223.988 22.1369 222.034 19.0195C220.034 15.8319 216.136 13.439 212.28 14.5093C210.326 15.0514 208.742 16.4302 207.508 17.9866C206.073 19.8 204.779 21.8144 204.288 24.0998C203.722 26.7405 207.527 27.8108 208.349 25.2169C209.392 21.9312 209.322 17.6968 206.877 15.014C204.615 12.5369 200.773 12.5136 197.974 14.0279C191.837 17.3462 192.337 26.3993 194.403 31.9658C195.754 35.5973 197.913 38.869 200.815 41.4442C202.839 43.2389 205.83 40.2711 203.797 38.4717Z"
                            :fill="proto.dateTimeColor"></path>
                          <path
                            d="M231.826 49.6663C230.227 49.2176 228.358 48.7596 227.278 47.3902C226.222 46.0535 225.801 44.0204 225.806 42.3565C225.815 41.0432 226.227 38.711 228.059 39.0662C229.428 39.3326 229.596 41.6414 229.573 42.7772C230.875 42.6027 232.179 42.4266 233.485 42.249C233.153 40.2159 233.7 37.8697 235.074 36.304C235.527 35.7899 236.28 35.1542 237.032 35.3692C237.677 35.5515 237.836 36.3834 237.925 36.9677C238.28 39.3653 237.458 41.8751 236.686 44.1139C235.897 46.4227 234.985 48.6568 233.569 50.6571C232.947 51.5358 233.41 52.8678 234.279 53.3773C235.28 53.9568 236.383 53.5409 237.004 52.6622C239.009 49.8392 240.257 46.39 241.187 43.081C242.052 40.015 242.711 35.8226 240.524 33.1305C238.276 30.3683 234.27 31.2049 232.134 33.6306C229.797 36.2946 229.092 39.8841 229.643 43.3053C230.012 45.5768 233.508 44.9411 233.555 42.7772C233.616 39.9869 232.499 36.0983 229.428 35.2758C226.082 34.3784 223.231 36.3554 222.235 39.5055C221.324 42.3846 221.931 45.932 223.329 48.568C224.857 51.4564 227.774 52.6575 230.765 53.4988C233.237 54.1905 234.289 50.358 231.826 49.6663Z"
                            :fill="proto.dateTimeColor"></path>
                          <defs>
                            <clipPath id="clip0_620_1782">
                              <rect width="158" height="70" :fill="proto.dateTimeColor"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                        <div class="text" :style="{ color: proto.dateTimeColor }">{{ componentText ? componentText :
                          defaultComponentText }}</div>
                      </div>

                      <svg class="component-two" v-if="componentRadio == 2" width="336" height="72" viewBox="0 0 336 72"
                        fill="none" xmlns="http://www.w3.org/2000/svg" style="top: 230px; left: 49px;">
                        <g clip-path="url(#clip0_420_1695)">
                          <rect opacity="0.32" x="8" y="56" width="144" height="8" rx="4" :fill="proto.dateTimeColor">
                          </rect>
                          <path
                            d="M8 60C8 57.7909 9.79086 56 12 56H80C82.2091 56 84 57.7909 84 60V60C84 62.2091 82.2091 64 80 64H12C9.79086 64 8 62.2091 8 60V60Z"
                            :fill="proto.dateTimeColor"></path>
                          <path
                            d="M7.255 34.862H17.2V36.443H13.154V47H11.318V36.443H7.255V34.862ZM22.6416 37.973C23.9676 37.973 25.0386 38.415 25.8376 39.299C26.6196 40.166 27.0276 41.271 27.0276 42.614C27.0276 43.94 26.6366 45.045 25.8546 45.895C25.0386 46.779 23.9676 47.238 22.6416 47.238C21.3156 47.238 20.2446 46.779 19.4286 45.895C18.6466 45.045 18.2556 43.94 18.2556 42.614C18.2556 41.271 18.6466 40.166 19.4456 39.299C20.2446 38.415 21.3156 37.973 22.6416 37.973ZM22.6416 39.452C21.8086 39.452 21.1626 39.775 20.7036 40.438C20.2956 40.999 20.1086 41.73 20.1086 42.614C20.1086 43.498 20.2956 44.212 20.7036 44.773C21.1626 45.419 21.8086 45.759 22.6416 45.759C23.4746 45.759 24.1206 45.419 24.5966 44.773C25.0046 44.195 25.2086 43.481 25.2086 42.614C25.2086 41.73 25.0046 40.999 24.5966 40.438C24.1206 39.775 23.4746 39.452 22.6416 39.452ZM35.1631 34.624H36.9651V47H35.2821V45.946C34.6701 46.796 33.7521 47.238 32.5621 47.238C31.2701 47.238 30.2501 46.779 29.5191 45.861C28.8391 45.011 28.4991 43.906 28.4991 42.563C28.4991 41.271 28.8221 40.2 29.5021 39.35C30.2161 38.432 31.2191 37.973 32.4771 37.973C33.5481 37.973 34.4491 38.483 35.1631 39.52V34.624ZM32.8851 39.435C32.0011 39.435 31.3381 39.724 30.9131 40.336C30.5391 40.846 30.3521 41.594 30.3521 42.563C30.3521 43.532 30.5221 44.28 30.8791 44.824C31.2871 45.453 31.9501 45.776 32.8341 45.776C33.6161 45.776 34.2111 45.453 34.6531 44.841C35.0271 44.28 35.2141 43.566 35.2141 42.682V42.529C35.2141 41.577 34.9761 40.812 34.5341 40.234C34.0921 39.69 33.5481 39.435 32.8851 39.435ZM43.0603 37.973C44.3523 37.973 45.3043 38.296 45.9163 38.942C46.4433 39.503 46.7153 40.319 46.7153 41.39V47H45.0493V45.759C44.7093 46.201 44.2843 46.558 43.7743 46.813C43.1963 47.085 42.5163 47.238 41.7343 47.238C40.8163 47.238 40.1023 47 39.5923 46.541C39.0313 46.082 38.7593 45.487 38.7593 44.756C38.7593 43.77 39.1503 43.005 39.9323 42.478C40.6463 41.968 41.6663 41.713 42.9583 41.679L44.9303 41.628V41.271C44.9303 40.047 44.2673 39.435 42.9413 39.435C42.3803 39.435 41.9213 39.537 41.5813 39.741C41.1733 39.979 40.9183 40.336 40.8163 40.829L39.0313 40.676C39.2183 39.724 39.6943 39.01 40.4423 38.568C41.0883 38.16 41.9723 37.973 43.0603 37.973ZM44.9303 42.937L43.0773 42.988C41.4283 43.022 40.6123 43.6 40.6123 44.688C40.6123 45.028 40.7483 45.3 41.0373 45.521C41.3093 45.742 41.6833 45.861 42.1423 45.861C42.9073 45.861 43.5533 45.623 44.0973 45.164C44.6413 44.705 44.9303 44.127 44.9303 43.447V42.937ZM47.943 38.211H49.898L52.312 44.62L54.624 38.211H56.596L51.819 50.366H49.898L51.428 46.796L47.943 38.211ZM64.1496 34.862H71.4596V36.494H65.6456L65.2886 39.996H65.3396C65.7136 39.605 66.1386 39.333 66.6316 39.163C67.0736 38.976 67.5836 38.891 68.1276 38.891C69.2666 38.891 70.2016 39.265 70.9156 40.013C71.6296 40.761 72.0036 41.781 72.0036 43.09C72.0036 44.348 71.5276 45.368 70.6096 46.167C69.7426 46.881 68.7056 47.238 67.4986 47.238C66.4106 47.238 65.4756 46.932 64.6936 46.337C63.8266 45.691 63.3506 44.79 63.2656 43.668H65.0846C65.1526 44.348 65.4246 44.875 65.8836 45.215C66.2916 45.521 66.8356 45.674 67.5156 45.674C68.2636 45.674 68.8926 45.436 69.4026 44.977C69.9126 44.501 70.1676 43.889 70.1676 43.107C70.1676 42.257 69.9466 41.594 69.5046 41.118C69.0626 40.642 68.4506 40.404 67.6346 40.404C67.0906 40.404 66.6316 40.489 66.2236 40.693C65.7816 40.897 65.4586 41.22 65.2206 41.662H63.4866L64.1496 34.862ZM77.9279 34.624C79.3559 34.624 80.4609 35.219 81.2429 36.426C81.9569 37.548 82.3139 39.044 82.3139 40.931C82.3139 42.801 81.9569 44.314 81.2429 45.436C80.4609 46.626 79.3559 47.238 77.9279 47.238C76.4999 47.238 75.3949 46.626 74.6129 45.436C73.8989 44.314 73.5419 42.818 73.5419 40.931C73.5419 39.027 73.8989 37.531 74.6129 36.426C75.3949 35.219 76.4999 34.624 77.9279 34.624ZM77.9279 36.188C76.9249 36.188 76.2279 36.732 75.8199 37.837C75.5139 38.585 75.3779 39.622 75.3779 40.931C75.3779 42.223 75.5139 43.26 75.8199 44.025C76.2279 45.113 76.9249 45.674 77.9279 45.674C78.9139 45.674 79.6279 45.113 80.0359 44.025C80.3249 43.26 80.4779 42.223 80.4779 40.931C80.4779 39.622 80.3249 38.585 80.0359 37.837C79.6279 36.732 78.9139 36.188 77.9279 36.188ZM95.9223 40.353C96.8573 40.353 97.5713 40.676 98.0813 41.356C98.5233 41.934 98.7613 42.716 98.7613 43.685C98.7613 44.637 98.5233 45.419 98.0813 46.014C97.5713 46.66 96.8573 47 95.9223 47C94.9703 47 94.2393 46.66 93.7293 46.014C93.2703 45.402 93.0493 44.637 93.0493 43.685C93.0493 42.716 93.2703 41.934 93.7293 41.356C94.2393 40.676 94.9703 40.353 95.9223 40.353ZM94.2393 34.624H95.6333L88.8163 47.238H87.4393L94.2393 34.624ZM87.1843 34.862C88.1193 34.862 88.8333 35.185 89.3433 35.865C89.7853 36.443 90.0233 37.225 90.0233 38.194C90.0233 39.146 89.7853 39.928 89.3433 40.523C88.8333 41.169 88.1193 41.509 87.1843 41.509C86.2323 41.509 85.5013 41.169 84.9913 40.523C84.5323 39.911 84.3113 39.146 84.3113 38.194C84.3113 37.225 84.5323 36.443 84.9913 35.865C85.5013 35.185 86.2323 34.862 87.1843 34.862ZM95.9223 41.526C95.4803 41.526 95.1573 41.747 94.9533 42.189C94.8003 42.546 94.7323 43.039 94.7323 43.685C94.7323 44.297 94.8003 44.79 94.9533 45.164C95.1573 45.606 95.4803 45.827 95.9223 45.827C96.3473 45.827 96.6533 45.589 96.8573 45.13C96.9933 44.773 97.0783 44.297 97.0783 43.685C97.0783 43.056 96.9933 42.563 96.8403 42.206C96.6533 41.747 96.3473 41.526 95.9223 41.526ZM87.1843 36.035C86.7423 36.035 86.4193 36.256 86.2153 36.698C86.0623 37.055 85.9943 37.548 85.9943 38.194C85.9943 38.806 86.0623 39.299 86.2153 39.673C86.4193 40.115 86.7423 40.336 87.1843 40.336C87.6093 40.336 87.9153 40.098 88.1193 39.639C88.2553 39.282 88.3403 38.806 88.3403 38.194C88.3403 37.565 88.2553 37.072 88.1023 36.715C87.9153 36.256 87.6093 36.035 87.1843 36.035Z"
                            :fill="proto.dateTimeColor"></path>
                          <path
                            d="M26.224 12.862H31.46C32.667 12.862 33.619 13.134 34.316 13.695C35.03 14.273 35.404 15.123 35.404 16.245C35.404 16.925 35.217 17.52 34.843 18.047C34.435 18.591 33.891 18.931 33.194 19.101V19.135C34.35 19.39 34.996 20.121 35.132 21.345L35.319 23.215C35.387 23.963 35.608 24.558 35.965 25H34.452C34.18 24.592 34.01 24.065 33.959 23.385L33.806 21.77C33.738 21.056 33.483 20.529 33.041 20.223C32.633 19.917 32.055 19.781 31.29 19.781H27.618V25H26.224V12.862ZM27.618 14.069V18.574H31.29C32.174 18.574 32.871 18.353 33.347 17.945C33.772 17.554 33.993 17.01 33.993 16.296C33.993 15.548 33.772 14.987 33.364 14.63C32.922 14.256 32.225 14.069 31.29 14.069H27.618ZM41.3653 12.862H42.9803L47.7573 25H46.2443L44.9523 21.6H39.3763L38.0843 25H36.5883L41.3653 12.862ZM39.8183 20.427H44.5103L42.2153 14.358H42.1473L39.8183 20.427ZM49.1871 12.862H50.5641V25H49.1871V12.862ZM53.2193 12.862H54.6813L61.5493 22.739H61.6003V12.862H62.9943V25H61.5663L54.6643 15.021H54.6133V25H53.2193V12.862Z"
                            :fill="proto.dateTimeColor"></path>
                          <path
                            d="M14 11.5C14.8659 14.0186 18 17.1882 18 19.9481C18 22.1486 16 23.5 14 23.5C12 23.5 10 22.1393 10 19.9481C10 17.1882 13.1838 13.9782 14 11.5Z"
                            :fill="proto.dateTimeColor"></path>
                        </g>
                        <rect opacity="0.16" x="272" y="8" width="56" height="56" rx="28" :fill="proto.dateTimeColor">
                        </rect>
                        <path
                          d="M288.066 28H289.317V22.4893H289.409L291.557 28H292.502L294.651 22.4893H294.748V28H295.994V20.2495H294.404L292.078 26.2114H291.987L289.656 20.2495H288.066V28ZM301.247 28.1934C303.508 28.1934 304.91 26.6196 304.91 24.1274V24.1167C304.91 21.6191 303.502 20.0562 301.247 20.0562C298.996 20.0562 297.578 21.6191 297.578 24.1167V24.1274C297.578 26.6196 298.975 28.1934 301.247 28.1934ZM301.247 26.9956C299.85 26.9956 298.991 25.8677 298.991 24.1274V24.1167C298.991 22.3657 299.872 21.2539 301.247 21.2539C302.622 21.2539 303.497 22.3657 303.497 24.1167V24.1274C303.497 25.8677 302.627 26.9956 301.247 26.9956ZM306.5 28H307.837V22.6611H307.923L311.731 28H312.929V20.2495H311.597V25.5884H311.511L307.703 20.2495H306.5V28Z"
                          :fill="proto.dateTimeColor"></path>
                        <path
                          d="M300.223 50.4102C303.773 50.4102 306.34 47.9258 306.34 44.5273V44.5039C306.34 41.2695 304.031 38.8789 300.809 38.8789C298.5 38.8789 296.977 40.0859 296.355 41.4453H296.133C296.133 41.3164 296.133 41.1875 296.145 41.0586C296.273 37.6836 297.457 34.9062 300.305 34.9062C301.898 34.9062 303 35.7266 303.469 37.0156L303.516 37.1328H306.117L306.094 36.9922C305.531 34.4375 303.305 32.6797 300.316 32.6797C296.133 32.6797 293.637 36.0547 293.637 41.7734V41.7969C293.637 48.0195 296.824 50.4102 300.223 50.4102ZM296.648 44.5273V44.5156C296.648 42.4766 298.195 41 300.223 41C302.273 41 303.75 42.5 303.75 44.5742V44.5977C303.75 46.625 302.18 48.207 300.199 48.207C298.207 48.207 296.648 46.5898 296.648 44.5273Z"
                          :fill="proto.dateTimeColor"></path>
                        <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd"
                          d="M212 14C199.85 14 190 23.8497 190 36C190 48.1503 199.85 58 212 58C224.15 58 234 48.1503 234 36C234 23.8497 224.15 14 212 14ZM184 36C184 20.536 196.536 8 212 8C227.464 8 240 20.536 240 36C240 51.464 227.464 64 212 64C196.536 64 184 51.464 184 36ZM212 22C204.268 22 198 28.268 198 36C198 43.732 204.268 50 212 50C219.732 50 226 43.732 226 36C226 28.268 219.732 22 212 22ZM192 36C192 24.9543 200.954 16 212 16C223.046 16 232 24.9543 232 36C232 47.0457 223.046 56 212 56C200.954 56 192 47.0457 192 36ZM206 36C206 32.6863 208.686 30 212 30C215.314 30 218 32.6863 218 36C218 39.3137 215.314 42 212 42C208.686 42 206 39.3137 206 36ZM212 24C205.373 24 200 29.3726 200 36C200 42.6274 205.373 48 212 48C218.627 48 224 42.6274 224 36C224 29.3726 218.627 24 212 24Z"
                          :fill="proto.dateTimeColor"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M209 11.0105C209 9.34524 210.35 7.9993 212.012 8C217.791 8.00242 223.427 9.79296 228.149 13.1261C232.873 16.4615 236.449 21.1779 238.385 26.6275C240.32 32.077 240.521 37.9923 238.96 43.5606C237.399 49.1251 234.155 54.0704 229.673 57.718C228.384 58.7663 226.487 58.5742 225.437 57.2821C224.386 55.9895 224.586 54.0946 225.872 53.0479C229.391 50.1847 231.937 46.3028 233.162 41.9348C234.388 37.5639 234.23 32.9206 232.711 28.6429C231.191 24.3652 228.385 20.6629 224.676 18.0448C220.97 15.4284 216.545 14.0228 212.009 14.0209C210.35 14.0203 209 12.6762 209 11.0105ZM211.996 16C215.777 15.9993 219.481 17.0704 222.678 19.089C225.875 21.1077 228.434 23.9913 230.059 27.4053C230.771 28.9014 230.135 30.6914 228.639 31.4034C227.143 32.1154 225.353 31.4798 224.641 29.9837C223.504 27.5939 221.712 25.5754 219.474 24.1623C217.236 22.7493 214.644 21.9995 211.997 22C210.34 22.0003 208.997 20.6574 208.997 19.0006C208.996 17.3437 210.339 16.0003 211.996 16ZM212 24C210.343 24 209 25.3431 209 27C209 28.6569 210.343 30 212 30C212.788 30 213.568 30.1552 214.296 30.4567C215.024 30.7582 215.685 31.2002 216.242 31.7574C216.8 32.3145 217.242 32.9759 217.543 33.7039C217.845 34.4319 218 35.2121 218 36C218 37.6569 219.343 39 221 39C222.657 39 224 37.6569 224 36C224 34.4241 223.689 32.8637 223.086 31.4078C222.483 29.9519 221.599 28.629 220.485 27.5147C219.371 26.4004 218.048 25.5165 216.592 24.9134C215.136 24.3104 213.576 24 212 24Z"
                          :fill="proto.dateTimeColor"></path>
                        <defs>
                          <filter id="filter0_b_420_1695" x="-54.3656" y="-54.3656" width="268.731" height="180.731"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="27.1828"></feGaussianBlur>
                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_420_1695">
                            </feComposite>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_420_1695"
                              result="shape">
                            </feBlend>
                          </filter>
                          <clipPath id="clip0_420_1695">
                            <rect width="146" height="57" :fill="proto.dateTimeColor" transform="translate(7 7)"></rect>
                          </clipPath>
                        </defs>
                      </svg>

                      <svg width="390" height="96" viewBox="0 0 390 96" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style="position: absolute;top: 767px; left: 18px;">
                        <rect x="128" y="83" width="134" height="5" rx="2.5" :fill="proto.systemColor"></rect>
                        <g filter="url(#filter0_b_424_1527)">
                          <g clip-path="url(#clip0_424_1527)">
                            <rect width="50" height="50" rx="25" transform="matrix(1 0 0 -1 38 50)" fill="black"
                              fill-opacity="0.25"></rect>
                          </g>
                          <path
                            d="M57.8115 15.4912H68.1885V14.999C68.1885 13.707 67.5527 13.0918 66.3223 13.0918H59.6777C58.4473 13.0918 57.8115 13.707 57.8115 14.999V15.4912ZM61.7695 36.0503H64.2305C65.4609 36.0503 66.0864 35.4351 66.0864 34.1431V23.2534C66.0864 22.1768 66.3428 21.3975 66.7324 20.8027L67.3989 19.8184C67.8706 19.0903 68.1885 18.4033 68.1885 17.5317V16.6909H57.8115V17.5317C57.8115 18.4033 58.1294 19.0903 58.6011 19.8184L59.2573 20.8027C59.6572 21.3975 59.9033 22.1768 59.9033 23.2534V34.1431C59.9033 35.4351 60.5391 36.0503 61.7695 36.0503ZM63 28.165C62.1592 28.165 61.6157 27.5498 61.6157 26.6885V23.8789C61.6157 23.0073 62.1592 22.4229 63 22.4434C63.8306 22.4536 64.3843 23.0381 64.3843 23.8789V26.6885C64.3843 27.5498 63.8306 28.165 63 28.165ZM63 27.437C63.4512 27.437 63.8408 27.0576 63.8408 26.5962C63.8408 26.1348 63.4512 25.7451 63 25.7451C62.5386 25.7451 62.1489 26.1348 62.1489 26.5962C62.1489 27.0576 62.5386 27.437 63 27.437Z"
                            :fill="proto.systemColor"></path>
                        </g>
                        <g filter="url(#filter1_b_424_1527)">
                          <g clip-path="url(#clip1_424_1527)">
                            <rect width="50" height="50" rx="25" transform="matrix(1 0 0 -1 302 50)" fill="black"
                              fill-opacity="0.25"></rect>
                          </g>
                          <path
                            d="M317.628 34.0508H336.372C338.505 34.0508 339.592 32.9844 339.592 30.8721V20.1362C339.592 18.0239 338.505 16.9678 336.372 16.9678H333.439C332.629 16.9678 332.383 16.8037 331.922 16.291L331.102 15.3682C330.589 14.8042 330.066 14.4966 329.01 14.4966H324.918C323.862 14.4966 323.339 14.8042 322.827 15.3682L322.006 16.291C321.545 16.7935 321.289 16.9678 320.489 16.9678H317.628C315.485 16.9678 314.408 18.0239 314.408 20.1362V30.8721C314.408 32.9844 315.485 34.0508 317.628 34.0508ZM327 31.0259C323.893 31.0259 321.401 28.5444 321.401 25.417C321.401 22.2998 323.893 19.8184 327 19.8184C330.107 19.8184 332.588 22.2998 332.588 25.417C332.588 28.5444 330.097 31.0259 327 31.0259ZM333.275 21.6436C333.275 20.9463 333.891 20.3311 334.608 20.3311C335.316 20.3311 335.921 20.9463 335.921 21.6436C335.921 22.3716 335.316 22.9561 334.608 22.9663C333.891 22.9663 333.275 22.3818 333.275 21.6436ZM327 29.4673C329.235 29.4673 331.04 27.6729 331.04 25.417C331.04 23.1714 329.235 21.3667 327 21.3667C324.765 21.3667 322.95 23.1714 322.95 25.417C322.95 27.6729 324.775 29.4673 327 29.4673Z"
                            :fill="proto.systemColor"></path>
                        </g>
                        <defs>
                          <filter id="filter0_b_424_1527" x="-97.9141" y="-135.914" width="321.828" height="321.828"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="67.957"></feGaussianBlur>
                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_424_1527">
                            </feComposite>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_424_1527"
                              result="shape">
                            </feBlend>
                          </filter>
                          <filter id="filter1_b_424_1527" x="166.086" y="-135.914" width="321.828" height="321.828"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="67.957"></feGaussianBlur>
                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_424_1527">
                            </feComposite>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_424_1527"
                              result="shape">
                            </feBlend>
                          </filter>
                          <clipPath id="clip0_424_1527">
                            <rect width="50" height="50" :fill="proto.systemColor" transform="matrix(1 0 0 -1 38 50)">
                            </rect>
                          </clipPath>
                          <clipPath id="clip1_424_1527">
                            <rect width="50" height="50" :fill="proto.systemColor" transform="matrix(1 0 0 -1 302 50)">
                            </rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </template>
                  </template>

                </div>
                <div v-if="waterSetting.enable" class="water" :style="waterSettingStyle()">{{ waterSetting.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="setting-section"
        :class="{ 'setting-section-landscape': !isVerticalScreen, 'setting-section-vertical': isVerticalScreen }">
        <el-tabs v-model="activeProtoName" class="demo-tabs" @tab-click="handleClick" :stretch="false">
          <el-tab-pane :label="proto.name" :name="proto.name" v-for="(proto, index) in selectedProto.protoList">
            <el-segmented v-model="proto.screenType" :options="screenLabelOptions(screenOptions[proto.type])" block />
            <div class="paper-setting">
              <div>{{t("mockup.wallPaperText")}}</div>
              <el-upload ref="upload" class="upload-demo" :drag="true" :on-change="handleChange" :show-file-list="false"
                :auto-upload="false" action="#" :limit="1">
                <div class="el-upload__text">
                  {{ t("mockup.dragToHere") }}
                </div>
                <!-- <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 500kb
                </div>
              </template> -->
              </el-upload>
            </div>
            <div v-if="proto.screenType == 'lockScreen' || (proto.type == 'ipadType' && proto.screenType == 'desktopScreen')"
              class="date-setting">
              <div>{{ t("mockup.dateText") }}</div>
              <el-date-picker class="date-picker" :shortcuts="dateShortcuts" v-model="proto.selectedDate"
                :placeholder="t('mockup.selectDateText')" size="default" format="MM-DD" :clearable="false" />
            </div>

            <template v-if="['lockScreen', 'desktopScreen', '聊天'].includes(proto.screenType)">
              <div class="time-setting">
                <div>{{ t('mockup.timeText') }}</div>
                <el-time-picker class="time-picker" v-model="proto.selectedTime" placeholder="选择时间" size="default"
                  format="HH:mm" :clearable="false" />
              </div>

              <div class="component-setting">
                <div>{{ t("mockup.timeFont") }}</div>
                <el-radio-group v-model="fontRadio">
                  <el-radio :value="font.value" v-for="font in fontList">{{ font.label }}</el-radio>
                </el-radio-group>
              </div>
            </template>

            <div v-if="proto.type != 'macType' && ['lockScreen', 'desktopScreen'].includes(proto.screenType)" class="system-color-setting">
              <div>{{ t("mockup.systemColor") }}</div>
              <el-color-picker @active-change="systemColorChange($event, proto)" v-model="proto.systemColor"
                :predefine="['rgb(255, 255, 255)', 'rgb(76, 76, 76)', 'rgb(26, 114, 167)', 'rgb(99, 136, 165)', 'rgb(12, 60, 148)', 'rgb(89, 52, 40)', 'rgb(162, 216, 228)']" />
            </div>

            <div v-if="proto.type == 'iphoneType' && proto.screenType == 'desktopScreen'" class="component-setting">
              <div>{{ t("mockup.mainScreen") }}</div>
              <el-radio-group v-model="desktopRadio">
                <el-radio :value="1">{{ t("mockup.mainScreenStyleOne") }}</el-radio>
                <el-radio :value="2">{{ t("mockup.mainScreenStyleTwo") }}</el-radio>
                <el-radio :value="3">{{ t("mockup.mainScreenStyleThree") }}</el-radio>
              </el-radio-group>
            </div>

            <div v-if="proto.screenType == 'lockScreen'" class="date-time-color-setting">
              <div>{{ t("mockup.customColor") }}</div>
              <el-color-picker @active-change="dateTimeColorChange($event, proto)" v-model="proto.dateTimeColor"
                :predefine="['rgb(255, 255, 255)', 'rgb(76, 76, 76)', 'rgb(26, 114, 167)', 'rgb(99, 136, 165)', 'rgb(12, 60, 148)', 'rgb(89, 52, 40)', 'rgb(162, 216, 228)']" />
            </div>

            <template v-if="proto.type == 'iphoneType'">
              <div v-if="proto.screenType == 'lockScreen'" class="component-setting">
                <div>{{ t("mockup.widget") }}</div>
                <el-radio-group v-model="componentRadio">
                  <el-radio :value="0">{{ t("mockup.hide") }}</el-radio>
                  <el-radio :value="1">{{ t("mockup.widgetStyleOne") }}</el-radio>
                  <el-radio :value="2">{{ t("mockup.widgetStyleTwo") }}</el-radio>
                </el-radio-group>
              </div>

              <div v-if="proto.screenType == 'lockScreen' && componentRadio == 1" class="component-setting">
                <div>{{ t("mockup.widgetText") }}</div>
                <el-input v-model="componentText" style="width: 148px" :placeholder="defaultComponentText" />
              </div>
            </template>

            <div class="date-time-color-setting">
              <div>{{ t("mockup.border") }}</div>
              <el-switch v-model="proto.frame" style="--el-switch-on-color: #13ce66;" />
            </div>

            <div v-if="proto.type == 'iphoneType'" class="date-time-color-setting">
              <div>{{ t("mockup.dynamicIsland") }}</div>
              <el-switch v-model="proto.smartIsLand" style="--el-switch-on-color: #13ce66;" />
            </div>

          </el-tab-pane>
          <el-tab-pane v-if="isVerticalScreen" label="背景" name="背景" class="background">
            <el-segmented @change="backgroundTypeChange" v-model="selectedProto.background.type"
              :options="screenLabelOptions(backgroundOptions)" block />

            <template v-if="selectedProto.background.type == 'imageText'">
              <el-upload ref="uploadBackground" class="upload-demo" :drag="true" :on-change="handleChangeBackground"
                :show-file-list="false" :auto-upload="false" action="#" :limit="1">
                <div class="el-upload__text">
                  {{ t('mockup.dragToHere') }}
                </div>
              </el-upload>

              <div class="blur-setting">
                <div>{{ t('mockup.blur') }}</div>
                <el-switch v-model="selectedProto.background.needBlur" @change="isBlur"
                  style="--el-switch-on-color: #13ce66;" />
              </div>
              <div v-if="selectedProto.background.needBlur" class="blur-point-setting">
                <el-slider v-model="blurPoint" size="small" @input="blurPointChange" />
              </div>
              <div class="auto-update-setting">
                <div>{{ t('mockup.automaticallySwitch') }}</div>
                <el-switch v-model="autoUpdate" style="--el-switch-on-color: #13ce66;" />
              </div>
            </template>

            <template v-if="selectedProto.background.type == 'gradient'">

              <div class="color-title">{{ t('mockup.smartRecommendation') }}</div>
              <div class="colors">
                <div @click="clickClassicGradient(recommendedGradient)"
                  v-for="(recommendedGradient, index) in recommendedGradients" class="color"
                  :class="{ ring: recommendedGradient == selectedGradient }"
                  :style="{ background: recommendedGradient }">
                </div>
              </div>

              <div class="color-title">{{ t('mockup.classicGradient') }}</div>
              <div class="colors">
                <div @click="clickClassicGradient(classicGradient)" v-for="(classicGradient, index) in classicGradients"
                  class="color" :class="{ ring: classicGradient == selectedGradient }"
                  :style="{ background: classicGradient }">
                </div>
              </div>
            </template>

            <template v-if="selectedProto.background.type == 'solidColor'">
              <el-color-picker @active-change="backgroundColorChange" v-model="backgroundColor"
                :predefine="['rgb(255, 255, 255)', 'rgb(76, 76, 76)', 'rgb(26, 114, 167)', 'rgb(99, 136, 165)', 'rgb(12, 60, 148)', 'rgb(89, 52, 40)', 'rgb(162, 216, 228)']" />

            </template>

            <div class="water-switch-setting">
              <div>水印</div>
              <el-switch v-model="waterSetting.enable" style="--el-switch-on-color: #13ce66;" />
            </div>
            <div v-if="waterSetting.enable" class="water-setting">
              <el-input v-model="waterSetting.text" :rows="2" type="textarea" placeholder="Design by 小仙女" />
              <div class="line">
                <div class="item">
                  <div>X</div>
                  <el-input-number v-model="waterSetting.translateX" controls-position="right" />
                </div>
                <div class="item">
                  <div>Y</div>
                  <el-input-number v-model="waterSetting.translateY" controls-position="right" />
                </div>
              </div>
              <div class="line">
                <div class="item">
                  <div>S</div>
                  <el-input-number v-model="waterSetting.fontSize" controls-position="right" />
                </div>
                <div class="item">
                  <div>C</div>
                  <el-color-picker @active-change="waterColorChange($event)" v-model="waterSetting.color"
                    :predefine="['rgb(255, 255, 255)', 'rgb(76, 76, 76)', 'rgb(26, 114, 167)', 'rgb(99, 136, 165)', 'rgb(12, 60, 148)', 'rgb(89, 52, 40)', 'rgb(162, 216, 228)']" />
                </div>
              </div>
            </div>

          </el-tab-pane>
        </el-tabs>

        <div v-if="!isVerticalScreen" class="background">
          <div class="title">{{ t("mockup.background") }}</div>
          <el-segmented @change="backgroundTypeChange" v-model="selectedProto.background.type"
            :options="screenLabelOptions(backgroundOptions)" block />

          <template v-if="selectedProto.background.type == 'imageText'">
            <el-upload ref="uploadBackground" class="upload-demo" :drag="true" :on-change="handleChangeBackground"
              :show-file-list="false" :auto-upload="false" action="#" :limit="1">
              <div class="el-upload__text">
                {{ t("mockup.dragToHere") }}
              </div>
            </el-upload>

            <div class="blur-setting">
              <div>{{ t("mockup.blur") }}</div>
              <el-switch v-model="selectedProto.background.needBlur" @change="isBlur"
                style="--el-switch-on-color: #13ce66;" />
            </div>
            <div v-if="selectedProto.background.needBlur" class="blur-point-setting">
              <el-slider v-model="blurPoint" size="small" @input="blurPointChange" />
            </div>
            <div class="auto-update-setting">
              <div>{{ t("mockup.automaticallySwitch") }}</div>
              <el-switch v-model="autoUpdate" style="--el-switch-on-color: #13ce66;" />
            </div>
          </template>

          <template v-if="selectedProto.background.type == 'gradient'">

            <div class="color-title">{{ t('mockup.smartRecommendation') }}</div>
            <div class="colors">
              <div @click="clickClassicGradient(recommendedGradient)"
                v-for="(recommendedGradient, index) in recommendedGradients" class="color"
                :class="{ ring: recommendedGradient == selectedGradient }" :style="{ background: recommendedGradient }">
              </div>
            </div>

            <div class="color-title">{{ t('mockup.classicGradient') }}</div>
            <div class="colors">
              <div @click="clickClassicGradient(classicGradient)" v-for="(classicGradient, index) in classicGradients"
                class="color" :class="{ ring: classicGradient == selectedGradient }"
                :style="{ background: classicGradient }">
              </div>
            </div>
          </template>

          <template v-if="selectedProto.background.type == 'solidColor'">
            <el-color-picker @active-change="backgroundColorChange" v-model="backgroundColor"
              :predefine="['rgb(255, 255, 255)', 'rgb(76, 76, 76)', 'rgb(26, 114, 167)', 'rgb(99, 136, 165)', 'rgb(12, 60, 148)', 'rgb(89, 52, 40)', 'rgb(162, 216, 228)']" />
          </template>

          <div class="water-switch-setting">
            <div>{{ t('mockup.author') }}</div>
            <el-switch v-model="waterSetting.enable" style="--el-switch-on-color: #13ce66;" />
          </div>
          <div v-if="waterSetting.enable" class="water-setting">
            <el-input v-model="waterSetting.text" :rows="2" type="textarea" placeholder="Design by 小仙女" />
            <div class="line">
              <div class="item">
                <div>X</div>
                <el-input-number v-model="waterSetting.translateX" controls-position="right" />
              </div>
              <div class="item">
                <div>Y</div>
                <el-input-number v-model="waterSetting.translateY" controls-position="right" />
              </div>
            </div>
            <div class="line">
              <div class="item">
                <div>S</div>
                <el-input-number v-model="waterSetting.fontSize" controls-position="right" />
              </div>
              <div class="item">
                <div>C</div>
                <el-color-picker @active-change="waterColorChange($event)" v-model="waterSetting.color"
                  :predefine="['rgb(255, 255, 255)', 'rgb(76, 76, 76)', 'rgb(26, 114, 167)', 'rgb(99, 136, 165)', 'rgb(12, 60, 148)', 'rgb(89, 52, 40)', 'rgb(162, 216, 228)']" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tools">

        <a class="icp-number" v-if="!isMiniProgram && !isVerticalScreen" href="https://beian.miit.gov.cn"
          target="_blank">蜀ICP备2023035883号-5</a>
        <div class="export">
          <div class="text" @click=result()>
            <div class="export-text">{{ t('mockup.export') }}</div>
            <div class="size">{{ exportSettingOption }}x PNG</div>
          </div>
          <el-popover placement="top" width="auto" trigger="click">
            <template #reference>
              <div class="setting">
                <el-icon>
                  <Setting />
                </el-icon>
              </div>
            </template>
            <div class="setting-popover">
              <div class="title">{{ t('mockup.exportSetting') }}</div>
              <div class="size">{{ t('mockup.zoomLevel') }}</div>
              <el-segmented v-model="exportSettingOption" :options="exportSettingOptions" block />
              <div class="size-two">
                <div class="left">{{ t('mockup.resolution') }}</div>
                <div class="right">{{ 1200 * exportSettingOption }} x {{ 1600 * exportSettingOption }}</div>
              </div>
            </div>
          </el-popover>
        </div>
        <div class="multiple-export">
          <div class="text" @click=multipleExport()>
            <div class="export-text">{{ t('mockup.batchExport') }}</div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="长按保存图片" align-center :modal="true" :width="exportPopupWidth">
      <div class='dialogSubTitle'>电脑端请点击<span class='copy' @click='onCopy'>复制链接</span>到浏览器使用</div>
      <div style="display: flex;justify-content: center;align-items: center;">
        <img :src="resultImageUrl" alt="" style="width: 100%;">
      </div>
    </el-dialog>

    <el-dialog v-model="multipleExportDialogVisible" title="" align-center :modal="true" width="calc(100vw - 32px)">
      <template #header>
        <div style="font-weight: 600;font-size: 16px;word-wrap: break-word;">批量导出 - 多张图片使用同一个模板</div>
      </template>

      <!-- <div class='dialogSubTitle'>电脑端请点击<span class='copy' @click ='onCopy'>复制链接</span>到浏览器使用</div> -->
      <div style="height: calc(100vh - 298px);">
        <el-upload ref="multipleUpload" v-model:file-list="fileList" :on-change="multipleUploadChange" action="#"
          :multiple="true" :auto-upload="false" list-type="picture-card" :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>

        <el-progress v-if="fileList.length > 0 && multipleExportStart" :stroke-width="10"
          style="position: absolute;left: 45%;top: 40%;" type="circle" :percentage="percentage" status="success">
          <el-button v-if="multipleExportEnd" type="success" :icon="Check" circle />
          <div style="margin-top: 10px;font-size: 20px;">{{ current }} / {{ fileList.length }}</div>
        </el-progress>

        <el-dialog v-model="previewDialogVisible">
          <template #header>
            <div style="font-weight: 600;font-size: 16px;word-wrap: break-word;">预览</div>
          </template>
          <img style="width: 100%;" :src="previewDialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="multipleExportDialogVisible = false">取消</el-button>
          <el-button v-if="fileList.length > 0" type="danger" plain @click="clearMultipleDialogImages">清空图片</el-button>

          <el-button type="success" @click="multipleExportResult">
            批量导出
          </el-button>
        </div>
      </template>
    </el-dialog>
  </ClientOnly>

</template>

<style lang="scss" scoped>
// 消除tailwind对页面的影响
img,
video {
  max-width: none;
  height: auto;
}

.dialogSubTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;

  .copy {
    font-size: 14px;
    color: green;
    padding: 0 4px;
    cursor: pointer;
  }
}

.header {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid rgb(229, 231, 235);

  .left {
    display: flex;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #00b96b;
    }
  }
}

.setting-popover {
  width: 275px;
  max-width: 275px;
  padding: 8px;

  .title {
    font-size: 16px;
    font-weight: bold;
  }

  .size {
    color: #9ca3af;
    margin-top: 12px;
    padding-bottom: 8px;
    font-size: 14px;
  }

  .size-two {
    margin-top: 12px;
    padding: 12px;
    font-size: 14px;
    border-radius: 8px;
    background-color: #f5f5f5;
    display: flex;

    .left {
      color: #9ca3af;
      flex: 1;
    }

    .right {}
  }

}

.center-section-landscape {
  display: flex;
  height: calc(100vh - 60px - 64px);

  .frame-section-landscape {
    width: 328px;
  }

  .proto-section-landscape {
    flex: 1;
  }

  .setting-section-landscape {
    padding-bottom: 14px;
    width: 400px;
    overflow-y: auto;
  }
}

.root {
  .frame-section-vertical {
    width: 100%;
  }

  .setting-section-vertical {
    width: 100%;
    padding-bottom: 60px;
  }

  .frame-section {

    .proto-tabs-vertical {
      :deep(.el-tabs__header) {
        margin-bottom: 2px;
      }
    }

    .proto-tabs {
      padding: 0 6px;
      height: 100%;

      .proto-list-landscape {
        gap: 14px;
        flex-wrap: wrap;
        overflow-y: auto;
        height: 100%;
      }

      .proto-list-vertical {
        column-gap: 8px;
        overflow-x: auto;
      }

      .proto-list {
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        scrollbar-width: none;
        padding: 4px;

        .proto-item-vertical {
          width: 58px;
        }

        .proto-item-landscape {
          width: 30%;
        }

        .proto-item {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          min-width: 58px;

          .proto-image {
            width: 100%;
            border-radius: 4px;
          }

          .example-name {
            color: rgb(17, 24, 39);
            margin-top: 4px;
            font-size: 12px;
            text-align: center;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .ring {
            box-shadow: rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 185, 107) 0px 0px 0px 3px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
          }
        }
      }
    }

  }

  .proto-section {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
    background-color: #f5f5f5;
  }

  .setting-section {
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;

    :deep(.demo-tabs) {
      padding-bottom: 12px;
    }

    .background {
      .title {
        border-top: 1px solid green;
        padding-top: 16px;
        padding-bottom: 16px;
        font-size: 16px;
        font-weight: bold;
        color: black;
      }

      :deep(.el-color-picker) {
        margin-top: 8px;
        width: 100%;

        .el-color-picker__trigger {
          width: 100%;
        }
      }

      .upload-demo {
        padding-top: 12px;

        :deep(.el-upload-dragger) {
          padding: 4px 16px;
        }
      }
    }

    .color-title {
      color: rgb(107 114 128);
      font-size: 14px;
      margin-top: 8px;
    }

    .colors {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      margin-top: 4px;

      .color {
        width: 39.5px;
        height: 32px;
        margin: 2px;

        border-radius: 4px;
        cursor: pointer;

        &:hover {
          transform: translate(0, 0) rotate(0) skew(0) skewY(0) scaleX(1.05) scaleY(1.05);
        }
      }

      .ring {
        box-shadow: rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 185, 107) 0px 0px 0px 2px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
      }
    }

    :deep(.el-upload-dragger) {
      padding: 4px 16px;
    }

    .paper-setting {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;

      .upload-demo {
        :deep(.el-upload-dragger) {
          padding: 4px 16px;
        }
      }
    }

    .date-setting {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;

      :deep(.date-picker) {
        width: 90px;
      }
    }

    .time-setting {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;

      :deep(.time-picker) {
        width: 90px;
      }
    }

    .system-color-setting {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;

      :deep(.el-color-picker) {
        width: 90px;

        .el-color-picker__trigger {
          width: 100%;
        }
      }

    }

    .date-time-color-setting {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;

      :deep(.el-color-picker) {
        width: 90px;

        .el-color-picker__trigger {
          width: 100%;
        }
      }

    }

    .component-setting {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;

      :deep(.el-radio) {
        margin-right: 10px;
      }
    }

    .blur-setting {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
    }

    .blur-point-setting {
      padding: 8px;
    }

    .auto-update-setting {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
    }

    .water-switch-setting {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
    }

    .water-setting {
      padding-top: 6px;

      .line {
        padding-top: 6px;
        display: flex;
        justify-content: space-between;
        gap: 20px;

        .item {
          flex: 1;
          gap: 6px;
          display: flex;
          align-items: center;

          .el-input-number {
            width: 100%;
          }

          :deep(.el-color-picker) {
            width: 100%;
            margin-top: 0px;

            .el-color-picker__trigger {
              width: 100%;
            }
          }

        }
      }
    }

  }

  .tools {
    height: 60px;
    box-sizing: border-box;
    width: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: #d9f0dd;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 14px;

    .icp-number {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 5px;
      font-size: 12px;
      color: #9ca3af;
      text-decoration: none;
    }

    .export {
      height: 32px;
      color: white;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: #00b96b;
      border-radius: 8px;
      cursor: pointer;

      .text {
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 12px;
        box-sizing: border-box;

        .export-text {
          font-size: 14px;
          font-weight: bold;
        }

        .size {
          margin-left: 8px;
          font-size: 10px;
        }

        &:hover {
          background-color: #20c77c;
        }
      }

      .setting {
        height: 100%;
        color: white;
        padding: 0 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        border-radius: 4px;
        box-sizing: border-box;

        &:hover {
          background-color: #20c77c;
        }
      }
    }

    .multiple-export {
      margin-left: 6px;
      height: 32px;
      color: white;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: #b97800;
      border-radius: 8px;
      cursor: pointer;

      .text {
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 12px;
        padding-right: 12px;
        box-sizing: border-box;

        .export-text {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }

  }
}

.content {

  position: relative;

  transform-origin: top left;

  position: relative;
  // height: calc(4 / 3 * 750rpx);
  // width: 750rpx;
  display: flex;
  justify-content: center;
  align-items: center;

  .background {
    width: 100%;
    height: 100%;
  }

  .bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .bg-canvas {
    width: 100%;
    height: 100%;
  }

  .main-page {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .proto {
      position: absolute;

      .frame {
        width: 100%;
      }

      .smart-isLand {
        position: absolute;
        width: 114px;
        height: 35px;
        top: 26px;
        left: 156px;
        z-index: 10;
      }

      .paper {
        position: relative;
        overflow: hidden;

        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .chat-image {
        position: absolute;
        left: 18px;
        top: 16px;
        width: 390px;
        border-radius: 50px;
        z-index: 10;
      }

      .system {
        position: absolute;
        top: 20px;
        left: 18px;
        z-index: 20;

        .time {
          position: absolute;
          top: 16px;
          left: 50px;
          line-height: 1;
          color: rgb(0, 0, 0);
          font-size: 18.5px;
          font-weight: unset;
        }
      }

      .desktop {
        position: absolute;
        top: 78px;
        left: 18px;
      }

      .date-time {
        position: absolute;
        left: 18px;
        top: 98px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: calc(100% - 36px);

        .date {
          font-size: 22px;
          color: rgb(238, 233, 233);
          white-space: nowrap;
        }

        .time {
          line-height: 1;
          color: rgb(238, 233, 233);
          font-size: 90px;
        }
      }

      .component-one {
        position: absolute;
        top: 230px;
        left: 49px;

        .text {
          position: absolute;
          top: 26px;
          left: 6px;
          font-size: 14px;
        }
      }

      .component-two {
        position: absolute;
        top: 230px;
        left: 49px;
      }


    }

    .water {
      z-index: 1000;
    }
  }
}

.result {
  display: flex;
  justify-content: center;
  align-items: center;

  .result-image {
    object-fit: cover;
  }
}
</style>
