<script lang="ts" setup>
// definePageMeta({ layout: 'page' })
import * as StackBlur from 'stackblur-canvas'
import { ref } from 'vue';
import { Check } from '@element-plus/icons-vue'
import type { UploadFile, UploadInstance } from 'element-plus'
import type { MockupExample, MockupProtoItem, WatermarkSetting } from '~/utils/types'

import { ElMessage } from 'element-plus'

import { ClientOnly, MockupItem } from '#components';

const { awesome } = useAppConfig()

const { t } = useI18n()



// ===== 样机数据与选中状态（composables/useMockupData）=====
const {
  protoTypeList, selectedProto, activeProtoName, activeProtoTypeName,
  clickProto, protoChange, screenOptions, backgroundOptions, defaultImage,
} = useMockupData()

const waterSetting = ref<WatermarkSetting>({
  enable: true,
  text: t("mockup.designByWho"),
  color: "#ffffff",
  fontSize: 30,
  translateX: 7,
  translateY: 740
})



const fileList = ref([])
const previewDialogVisible = ref(false)
const previewDialogImageUrl = ref('')

const handleRemove = () => {
}

const handlePictureCardPreview = (uploadFile: UploadFile) => {
  previewDialogImageUrl.value = uploadFile.url ?? ''
  previewDialogVisible.value = true
}

async function onCopy() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    ElMessage({
      message: t('mockup.copySuccess'),
      type: 'success',
    })
  } catch {
    ElMessage.error(t('mockup.copyFail'))
  }
}

const isMiniProgram = ref(false);


function backgroundImageLoad() {
  if (selectedProto.value.background.needBlur) {
    blurBackground()
  }
}

const scale = ref('')

const w = ref(0);
const h = ref(0);

const isVerticalScreen = ref(true)
const exportPopupWidth = ref('90%')

function changeProtoWidth() {

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // 判断是横屏还是竖屏
  isVerticalScreen.value = windowWidth < windowHeight

  // 计算模型的缩放比例
  if (isVerticalScreen.value) {
    const maxWidth = windowHeight * 0.36

    w.value = windowWidth - 2 * 8
    if (w.value > maxWidth) {
      w.value = maxWidth
    }

    h.value = w.value * 4 / 3;


    const s = w.value / 1200

    scale.value = `scale(${s})`
  } else {
    const maxWidth = windowWidth - 328 - 320 - 32;
    const maxHeight = windowHeight - 50 - 60 - 68;
    const maxHeightToWidth = maxHeight * 3 / 4;

    w.value = maxWidth > maxHeightToWidth ? maxHeightToWidth : maxWidth;

    h.value = w.value * 4 / 3;

    const s = w.value / 1200

    scale.value = `scale(${s})`
  }

  // 计算导出图片的宽高
  const maxWidth = windowWidth - 26 * 2;
  const maxHeight = windowHeight - 60 * 2;
  const maxHeightToWidth = maxHeight * 3 / 4;

  const resultWidth = maxWidth > maxHeightToWidth ? maxHeightToWidth : maxWidth;
  exportPopupWidth.value = `${resultWidth}px`
}

const blurPoint = ref(66)

function blurBackground() {
  const img1 = document.getElementById('bg-image') as HTMLImageElement | null
  const canvas1 = document.getElementById('bg-canvas') as HTMLCanvasElement | null
  if (!img1 || !canvas1) return

  canvas1.style.objectFit = window.getComputedStyle(img1).objectFit
  StackBlur.image(img1, canvas1, blurPoint.value, false, false, true)
}

function isBlur(blur: string | number | boolean) {
  if (blur) {
    blurBackground()
  }
}

function blurPointChange(currentBlurPoint: number | number[]) {
  blurPoint.value = Array.isArray(currentBlurPoint) ? currentBlurPoint[0] : currentBlurPoint
  blurBackground()
}

const paperUrl = ref(defaultImage)
// ref="upload" 位于 protoList 的 v-for 内，Vue 会收集为数组
const upload = ref<UploadInstance[] | null>(null)
const handleChange = (uploadFile: UploadFile) => {
  if (!uploadFile.raw) return
  const tempUrl = URL.createObjectURL(uploadFile.raw)
  upload.value?.[0]?.clearFiles()

  const paperImg = paperImage.value?.[0]
  if (paperImg) {
    paperImg.onload = () => {
      generateRecommendedGradientColors()
      selectedGradient.value = recommendedGradients.value[0]

      generateRecommendedBackgroundColors()
      backgroundColor.value = recommendedBackgroundColor.value
    }
  }

  paperUrl.value = tempUrl

  if (autoUpdate.value) {
    backgroundUrl.value = paperUrl.value
  }
}

const multipleUpload = ref<UploadInstance | null>(null)

function clearMultipleDialogImages() {
  multipleUpload.value?.clearFiles()
}

const multipleUploadChange = () => {
}

const backgroundUrl = ref(defaultImage)
const uploadBackground = ref<UploadInstance | null>(null)
const handleChangeBackground = (uploadFile: UploadFile) => {
  if (!uploadFile.raw) return
  const tempUrl = URL.createObjectURL(uploadFile.raw)
  backgroundUrl.value = tempUrl
  uploadBackground.value?.clearFiles()
}

const autoUpdate = ref(true)

// 样机切换：把页面持有的背景/壁纸状态传给 useMockupData 的 protoChange
const handleProtoChange = (item: MockupExample) => {
  protoChange(item, backgroundUrl, autoUpdate, paperUrl)
}

const screenLabelOptions = (options: string[] = []) => {
  return options.map(item => {
    return { label: t(`mockup.${item}`), value: item }
  })
}

const defaultSystemColor = "#ffffff"
const defaultDateTimeColor = "#ffffff"


const handleClick = () => {
}

function clickBackground() {
  if (isVerticalScreen.value) {
    activeProtoName.value = "background";
  }
}

const dateShortcuts = [{
  text: t('mockup.todayText'),
  value: new Date(),
}]



const systemColorChange = (color: string | null, proto: MockupProtoItem) => {
  if (color) {
    proto.systemColor = color
    return color
  }
  proto.systemColor = defaultSystemColor
  return defaultSystemColor
}

const dateTimeColorChange = (color: string | null, proto: MockupProtoItem) => {
  if (color) {
    proto.dateTimeColor = color
    return color
  }
  proto.dateTimeColor = defaultDateTimeColor
  return defaultDateTimeColor
}

const defaultBackgroundColor = "#ffffff"
const backgroundColor = ref(defaultBackgroundColor)
function backgroundColorChange(color: string | null) {
  if (color) {
    backgroundColor.value = color
    return color;
  }
  backgroundColor.value = defaultBackgroundColor
  return defaultBackgroundColor
}

const defaultComponentText = `${t("mockup.fairy")} iPhone`
const componentText = ref(defaultComponentText)

const componentRadio = ref(1)

const desktopRadio = ref(1)

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
const fontRadio = ref(fontList[0].value)



const paperImage = ref<HTMLImageElement[] | null>(null)

// ===== 智能配色（composables/useColorExtract）=====
const {
  classicGradients, selectedGradient, clickClassicGradient,
  recommendedGradients, recommendedBackgroundColor, backgroundTypeChange,
  generateRecommendedGradientColors, generateRecommendedBackgroundColors,
} = useColorExtract({ paperImage, backgroundColor })

// ===== 图片导出（composables/useImageExport）=====
const {
  resultImageUrl, resultImage, dialogVisible, multipleExportDialogVisible,
  exportSettingOptions, exportSettingOption,
  current, multipleExportStart, multipleExportEnd, percentage,
  result, multipleExport, multipleExportResult,
} = useImageExport({
  paperUrl, backgroundUrl, autoUpdate, paperImage, fileList, isMiniProgram,
  recommendedGradients, recommendedBackgroundColor, selectedGradient, backgroundColor,
  generateRecommendedGradientColors, generateRecommendedBackgroundColors,
})

// MockupItem 组件实例：同步其内部模板 ref（resultImage / paperImage）给导出与取色逻辑
const mockupItemRef = ref<InstanceType<typeof MockupItem> | null>(null)
watchEffect(() => {
  resultImage.value = mockupItemRef.value?.resultImage ?? null
  paperImage.value = mockupItemRef.value?.paperImage ?? []
})


onMounted(() => {
  if (typeof wx !== 'undefined') {
    wx.miniProgram.getEnv((res: { miniprogram?: boolean } | undefined) => {
      isMiniProgram.value = !!(res && res.miniprogram)
    })
  }

  changeProtoWidth()
  window.onresize = () => {
    changeProtoWidth()
  }
})


</script>

<template>
  <ClientOnly>
    <header
      class=" h-[64px] max-h-[64px] flex backdrop-filter backdrop-blur-md sticky top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-950/10 dark:border-gray-50/[0.2] bg-white/[0.5] dark:bg-gray-950/[0.5]">
      <!-- content -->
      <div class="flex-1 flex items-center justify-between w-full px-8">
        <!-- title -->
        <div>
          <slot name="title">
            <NuxtLink to="/" class="text-lg text-primary-500 flex items-center">
              <img src="/logo/android-chrome-192x192.png" alt="Logo" class="w-8 h-8 mr-2 rounded-full object-cover inline-block align-middle">
              <span class="capitalize text-black hidden sm:inline">{{ awesome.name }}</span>
            </NuxtLink>
          </slot>
        </div>
        <!-- menus -->
        <div class="flex space-x-3 items-center">
          <div class="export">
            <div class="text" @click=result()>
              <div class="export-text">{{ t('mockup.export') }}</div>
              <div class="size">{{ exportSettingOption }}x PNG</div>
            </div>
            <el-popover placement="bottom" width="auto" trigger="click">
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

    </header>
    <div class="root" :class="{ 'center-section-landscape': !isVerticalScreen }">
      <div
class="frame-section"
        :class="{ 'frame-section-landscape': !isVerticalScreen, 'frame-section-vertical': isVerticalScreen }">
        <el-tabs
v-model="activeProtoTypeName" class="proto-tabs" :class="{ 'proto-tabs-vertical': isVerticalScreen }"
          @tab-click="handleClick">
          <el-tab-pane
v-for="(type, typeIndex) in protoTypeList" :key="typeIndex" :label="type.protoType"
            :name="type.protoType" style="height: 100%;">
            <div
class="proto-list"
              :class="{ 'proto-list-landscape': !isVerticalScreen, 'proto-list-vertical': isVerticalScreen }">
              <div
v-for="(item, index) in type.list"
                :key="index"
                class="proto-item" :class="{ 'proto-item-landscape': !isVerticalScreen, 'proto-item-vertical': isVerticalScreen }" @click="handleProtoChange(item)">
                <img
class="proto-image" :class="{ ring: selectedProto.defaultProtoUrl == item.defaultProtoUrl }"
                  :src="item.defaultProtoUrl" >
                <div class="example-name">{{ item.exampleName }}</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="proto-section" :class="{ 'proto-section-landscape': !isVerticalScreen }">
        <div :style="{ width: w + 'px', height: h + 'px' }">
          <div style="transform-origin: top left;" :style="{ transform: scale }">
            <MockupItem
ref="mockupItemRef" :selected-proto="selectedProto" :background-url="backgroundUrl"
              :paper-url="paperUrl" :selected-gradient="selectedGradient" :background-color="backgroundColor"
              :font-radio="fontRadio" :desktop-radio="desktopRadio" :component-radio="componentRadio"
              :component-text="componentText" :default-component-text="defaultComponentText"
              :water-setting="waterSetting" @background-load="backgroundImageLoad" @background-click="clickBackground"
              @proto-click="clickProto" />
          </div>
        </div>
      </div>

      <div
class="setting-section"
        :class="{ 'setting-section-landscape': !isVerticalScreen, 'setting-section-vertical': isVerticalScreen }">
        <el-tabs v-model="activeProtoName" class="demo-tabs" :stretch="false" @tab-click="handleClick">
          <el-tab-pane v-for="(proto, index) in selectedProto.protoList" :key="index" :label="proto.name" :name="proto.name">
            <el-segmented v-model="proto.screenType" :options="screenLabelOptions(screenOptions[proto.type])" block />
            <div class="paper-setting">
              <div>{{ t("mockup.wallPaperText") }}</div>
              <el-upload
ref="upload" class="upload-demo" :drag="true" :on-change="handleChange" :show-file-list="false"
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
            <div
              v-if="proto.screenType == 'lockScreen' || (proto.type == 'ipadType' && proto.screenType == 'desktopScreen')"
              class="date-setting">
              <div>{{ t("mockup.dateText") }}</div>
              <el-date-picker
v-model="proto.selectedDate" class="date-picker" :shortcuts="dateShortcuts"
                :placeholder="t('mockup.selectDateText')" size="default" format="MM-DD" :clearable="false" />
            </div>

            <template v-if="['lockScreen', 'desktopScreen', '聊天'].includes(proto.screenType)">
              <div class="time-setting">
                <div>{{ t('mockup.timeText') }}</div>
                <el-time-picker
v-model="proto.selectedTime" class="time-picker" placeholder="选择时间" size="default"
                  format="HH:mm" :clearable="false" />
              </div>

              <div class="component-setting">
                <div>{{ t("mockup.timeFont") }}</div>
                <el-radio-group v-model="fontRadio">
                  <el-radio v-for="font in fontList" :key="font.value" :value="font.value">{{ font.label }}</el-radio>
                </el-radio-group>
              </div>
            </template>

            <div
v-if="proto.type != 'macType' && ['lockScreen', 'desktopScreen'].includes(proto.screenType)"
              class="system-color-setting">
              <div>{{ t("mockup.systemColor") }}</div>
              <el-color-picker
v-model="proto.systemColor" :predefine="['rgb(255, 255, 255)', 'rgb(76, 76, 76)', 'rgb(26, 114, 167)', 'rgb(99, 136, 165)', 'rgb(12, 60, 148)', 'rgb(89, 52, 40)', 'rgb(162, 216, 228)']"
                @active-change="systemColorChange($event, proto)" />
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
              <el-color-picker
v-model="proto.dateTimeColor" :predefine="['rgb(255, 255, 255)', 'rgb(76, 76, 76)', 'rgb(26, 114, 167)', 'rgb(99, 136, 165)', 'rgb(12, 60, 148)', 'rgb(89, 52, 40)', 'rgb(162, 216, 228)']"
                @active-change="dateTimeColorChange($event, proto)" />
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
          <el-tab-pane v-if="isVerticalScreen" :label="t('mockup.background')" name="background" class="background">
            <el-segmented
v-model="selectedProto.background.type" :options="screenLabelOptions(backgroundOptions)"
              block @change="backgroundTypeChange" />

            <template v-if="selectedProto.background.type == 'imageText'">
              <el-upload
ref="uploadBackground" class="upload-demo" :drag="true" :on-change="handleChangeBackground"
                :show-file-list="false" :auto-upload="false" action="#" :limit="1">
                <div class="el-upload__text">
                  {{ t('mockup.dragToHere') }}
                </div>
              </el-upload>

              <div class="blur-setting">
                <div>{{ t('mockup.blur') }}</div>
                <el-switch
v-model="selectedProto.background.needBlur" style="--el-switch-on-color: #13ce66;"
                  @change="isBlur" />
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
                <div
v-for="(recommendedGradient, index) in recommendedGradients" :key="index"
                  class="color" :class="{ ring: recommendedGradient == selectedGradient }"
                  :style="{ background: recommendedGradient }"
                  @click="clickClassicGradient(recommendedGradient)"/>
              </div>

              <div class="color-title">{{ t('mockup.classicGradient') }}</div>
              <div class="colors">
                <div
v-for="(classicGradient, index) in classicGradients" :key="index" class="color"
                  :class="{ ring: classicGradient == selectedGradient }" :style="{ background: classicGradient }"
                  @click="clickClassicGradient(classicGradient)"/>
              </div>
            </template>

            <template v-if="selectedProto.background.type == 'solidColor'">
              <el-color-picker
v-model="backgroundColor" :predefine="['rgb(255, 255, 255)', 'rgb(76, 76, 76)', 'rgb(26, 114, 167)', 'rgb(99, 136, 165)', 'rgb(12, 60, 148)', 'rgb(89, 52, 40)', 'rgb(162, 216, 228)']"
                @active-change="backgroundColorChange" />

            </template>

            <WatermarkPanel v-model:water-setting="waterSetting" />

          </el-tab-pane>
        </el-tabs>

        <div v-if="!isVerticalScreen" class="background">
          <div class="title">{{ t("mockup.background") }}</div>
          <el-segmented
v-model="selectedProto.background.type" :options="screenLabelOptions(backgroundOptions)"
            block @change="backgroundTypeChange" />

          <template v-if="selectedProto.background.type == 'imageText'">
            <el-upload
ref="uploadBackground" class="upload-demo" :drag="true" :on-change="handleChangeBackground"
              :show-file-list="false" :auto-upload="false" action="#" :limit="1">
              <div class="el-upload__text">
                {{ t("mockup.dragToHere") }}
              </div>
            </el-upload>

            <div class="blur-setting">
              <div>{{ t("mockup.blur") }}</div>
              <el-switch
v-model="selectedProto.background.needBlur" style="--el-switch-on-color: #13ce66;"
                @change="isBlur" />
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
              <div
v-for="(recommendedGradient, index) in recommendedGradients" :key="index"
                class="color" :class="{ ring: recommendedGradient == selectedGradient }"
                :style="{ background: recommendedGradient }" @click="clickClassicGradient(recommendedGradient)"/>
            </div>

            <div class="color-title">{{ t('mockup.classicGradient') }}</div>
            <div class="colors">
              <div
v-for="(classicGradient, index) in classicGradients" :key="index" class="color"
                :class="{ ring: classicGradient == selectedGradient }" :style="{ background: classicGradient }"
                @click="clickClassicGradient(classicGradient)"/>
            </div>
          </template>

          <template v-if="selectedProto.background.type == 'solidColor'">
            <el-color-picker
v-model="backgroundColor" :predefine="['rgb(255, 255, 255)', 'rgb(76, 76, 76)', 'rgb(26, 114, 167)', 'rgb(99, 136, 165)', 'rgb(12, 60, 148)', 'rgb(89, 52, 40)', 'rgb(162, 216, 228)']"
              @active-change="backgroundColorChange" />
          </template>

          <WatermarkPanel v-model:water-setting="waterSetting" />
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
        <div style="font-weight: 600;font-size: 16px;word-wrap: break-word;">{{ t("mockup.batchExportTitle") }}</div>
      </template>

      <!-- <div class='dialogSubTitle'>电脑端请点击<span class='copy' @click ='onCopy'>复制链接</span>到浏览器使用</div> -->
      <div style="height: calc(100vh - 298px);">
        <el-upload
ref="multipleUpload" v-model:file-list="fileList" :on-change="multipleUploadChange" action="#"
          :multiple="true" :auto-upload="false" list-type="picture-card" :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>

        <el-progress
v-if="fileList.length > 0 && multipleExportStart" :stroke-width="10"
          style="position: absolute;left: 45%;top: 40%;" type="circle" :percentage="percentage" status="success">
          <el-button v-if="multipleExportEnd" type="success" :icon="Check" circle />
          <div style="margin-top: 10px;font-size: 20px;">{{ current }} / {{ fileList.length }}</div>
        </el-progress>

        <el-dialog v-model="previewDialogVisible" :width="'fit-content'" class="preview-dialog">
          <template #header>
            <div style="font-weight: 600;font-size: 16px;word-wrap: break-word;">{{ t("mockup.preview") }}</div>
          </template>
          <img class="preview-image" :src="previewDialogImageUrl" alt="Preview Image" >
        </el-dialog>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="multipleExportDialogVisible = false">{{ t("mockup.cancel") }}</el-button>
          <el-button v-if="fileList.length > 0" type="danger" plain @click="clearMultipleDialogImages">{{
            t("mockup.clearImages") }}</el-button>

          <el-button type="success" @click="multipleExportResult">
            {{ t("mockup.batchExport") }}
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

// 全局样式重置
:global(body),
:global(html) {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Microsoft YaHei', '微软雅黑', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

:global(#__nuxt) {
  height: 100%;
}

.preview-dialog {

  .preview-image {
    object-fit: contain;
    width: 50vw;
    max-width: 50vh;
    max-height: 50vh;
  }

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
  height: calc(100vh - 64px);

  .frame-section-landscape {
    width: 328px;
  }

  .proto-section-landscape {
    flex: 1;
  }

  .setting-section-landscape {
    padding-bottom: 20px;
    width: 400px;
    overflow-y: auto;
  }
}

.root {
  min-height: 100vh;
  
  .frame-section-vertical {
    width: 100%;
  }

  .setting-section-vertical {
    width: 100%;
    padding-bottom: 20px;
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



  }

  /* 顶栏导出按钮（与 logo 同行）—— 规则见 .root 块之外，确保匹配 header 内的按钮 */
  .tools-landscape {
    width: 400px;
  }

  .tools-vertical {
    width: 100%;
    right: 0;
    bottom: 0;
    border-radius: 0;
  }
}

/* 大屏（横屏）：root 精确占满剩余高度，禁止页面级滚动，各栏内部独立滚动 */
.root.center-section-landscape {
  min-height: 0;
  height: calc(100vh - 64px);
  overflow: hidden;
}

/* 顶栏导出按钮（与 logo 同行，位于 header 内，不受 .root 包裹） */
.export,
.multiple-export {
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  overflow: hidden;

  .text {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
    transition: background-color 0.15s;

    .export-text {
      font-size: 14px;
      font-weight: bold;
    }

    .size {
      margin-left: 8px;
      font-size: 10px;
    }
  }

  .setting {
    height: 100%;
    color: white;
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    border-radius: 4px;
    box-sizing: border-box;
    transition: background-color 0.15s;
  }
}

.export {
  background-color: #00b96b;

  .text:hover,
  .setting:hover {
    background-color: #20c77c;
  }
}

.multiple-export {
  background-color: #b97800;

  .text:hover {
    background-color: #d18c00;
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
