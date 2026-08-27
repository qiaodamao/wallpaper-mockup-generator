<script setup lang="ts">
// 图片裁剪弹窗：按传入比例（ratio = 宽/高，与样机壁纸实际尺寸一致）显示裁剪框，
// 图片可拖动 / 缩放 / 旋转 / 翻转，确认后通过 canvas 按原图分辨率导出裁剪结果（dataURL）
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  imageUrl: string
  // 重置目标：恢复到裁剪前的原始图片（如上传原图）；缺省则仅重置变换
  resetImageUrl?: string
  title?: string
  // 裁剪框宽高比（宽/高），与样机壁纸实际尺寸一致；缺省 3:4
  ratio?: number
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'confirm', dataUrl: string): void
}>()

const dialogVisible = computed({
  get: () => props.visible,
  set: (v: boolean) => emit('update:visible', v),
})

const { t } = useI18n()

// ===== 裁剪框尺寸：按 ratio（宽/高）适配到最大边界内，PC 端大框，移动端小框 =====
const isDesktop = ref(true)

function fitFrame() {
  const r = props.ratio && props.ratio > 0 ? props.ratio : 3 / 4
  const maxW = isDesktop.value ? 640 : 320
  const maxH = isDesktop.value ? 640 : 420
  let w = maxW
  let h = w / r
  if (h > maxH) {
    h = maxH
    w = h * r
  }
  return { w: Math.round(w), h: Math.round(h) }
}

const frameW = computed(() => fitFrame().w)
const frameH = computed(() => fitFrame().h)

// 弹窗宽度随裁剪框自适应（PC 端左右布局：裁剪框 + 间距 + 240px 控制区）
const dialogWidth = computed(() => {
  if (!isDesktop.value) return '360px'
  return `${Math.min(980, Math.max(620, frameW.value + 300))}px`
})

onMounted(() => {
  const mq = window.matchMedia('(min-width: 768px)')
  const update = () => { isDesktop.value = mq.matches }
  update()
  mq.addEventListener('change', update)
  onBeforeUnmount(() => mq.removeEventListener('change', update))
})

// ===== 图片与变换状态 =====
const imgEl = ref<HTMLImageElement | null>(null)
const natW = ref(0)
const natH = ref(0)
// contain 基准（scale=1 时的显示尺寸）
const baseW = ref(0)
const baseH = ref(0)
const minScale = ref(1)
const scale = ref(1)
const rotate = ref(0)
const offsetX = ref(0)
const offsetY = ref(0)
const flipH = ref(false)
const flipV = ref(false)

const zoomPercent = computed(() => Math.round((scale.value / minScale.value) * 100))

const imgStyle = computed(() => ({
  width: `${baseW.value}px`,
  height: `${baseH.value}px`,
  left: '50%',
  top: '50%',
  transform: `translate(calc(-50% + ${offsetX.value}px), calc(-50% + ${offsetY.value}px)) rotate(${rotate.value}deg) scale(${scale.value}) scaleX(${flipH.value ? -1 : 1}) scaleY(${flipV.value ? -1 : 1})`,
}))

// 当前显示的图片地址（重置到原图时会切换）
const currentSrc = ref('')

// 弹窗打开时加载图片并初始化
watch(() => props.visible, async (v) => {
  if (!v || !props.imageUrl) return
  currentSrc.value = props.imageUrl
  await loadImage(props.imageUrl)
})

function computeBase() {
  // contain 基准与最小缩放（cover：图片铺满裁剪框）
  let w = frameW.value
  let h = (frameW.value * natH.value) / natW.value
  if (h > frameH.value) {
    h = frameH.value
    w = (frameH.value * natW.value) / natH.value
  }
  baseW.value = w
  baseH.value = h
  minScale.value = Math.max(frameW.value / w, frameH.value / h)
}

function loadImage(url: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      natW.value = img.naturalWidth
      natH.value = img.naturalHeight
      computeBase()
      imgEl.value = img
      resolve()
    }
    img.src = url
  })
}

// 视口切换（PC <-> 移动端）时按新裁剪框尺寸重算基准并复位变换
watch(frameW, () => {
  if (!imgEl.value || !natW.value) return
  computeBase()
  scale.value = minScale.value
  offsetX.value = 0
  offsetY.value = 0
})

async function resetTransform() {
  // 恢复到裁剪前的原始图片（当前已是裁剪结果时）
  if (props.resetImageUrl && props.resetImageUrl !== currentSrc.value) {
    currentSrc.value = props.resetImageUrl
    await loadImage(props.resetImageUrl)
  }
  scale.value = minScale.value
  rotate.value = 0
  offsetX.value = 0
  offsetY.value = 0
  flipH.value = false
  flipV.value = false
}

// ===== 拖动 =====
const dragging = ref(false)
let dragStartX = 0
let dragStartY = 0
let offsetStartX = 0
let offsetStartY = 0

function onPointerDown(e: PointerEvent) {
  dragging.value = true
  dragStartX = e.clientX
  dragStartY = e.clientY
  offsetStartX = offsetX.value
  offsetStartY = offsetY.value
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return
  // 限制拖动范围：图片边缘不允许完全离开裁剪框（留 24px 宽容）
  const halfW = (baseW.value * scale.value) / 2
  const halfH = (baseH.value * scale.value) / 2
  const maxX = Math.max(halfW - frameW.value / 2, 0) + 24
  const maxY = Math.max(halfH - frameH.value / 2, 0) + 24
  offsetX.value = Math.min(Math.max(offsetStartX + e.clientX - dragStartX, -maxX), maxX)
  offsetY.value = Math.min(Math.max(offsetStartY + e.clientY - dragStartY, -maxY), maxY)
}

function onPointerUp() {
  dragging.value = false
}

// ===== 缩放滑块（相对 cover 的百分比，1~400%）=====
function onZoomInput(v: number | number[]) {
  const p = Array.isArray(v) ? v[0] : v
  const target = (minScale.value * p) / 100
  // 缩放时保持中心点不漂移
  const ratio = target / scale.value
  offsetX.value *= ratio
  offsetY.value *= ratio
  scale.value = target
}

function rotateBy(deg: number) {
  rotate.value = ((rotate.value + deg) % 360 + 360) % 360
  if (rotate.value > 180) rotate.value -= 360
}

// ===== 确认：canvas 按原图分辨率导出 =====
function onConfirm() {
  const img = imgEl.value
  if (!img) return
  // 显示尺寸 -> 原图像素的倍率（输出分辨率贴近原图）
  let k = natW.value / (baseW.value * scale.value)
  k = Math.max(k, natH.value / (baseH.value * scale.value))
  k = Math.min(k, 4096 / Math.min(frameW.value, frameH.value))
  const cw = Math.round(frameW.value * k)
  const ch = Math.round(frameH.value * k)
  const canvas = document.createElement('canvas')
  canvas.width = cw
  canvas.height = ch
  const ctx = canvas.getContext('2d')!
  // jpeg 无透明通道，先铺白底（旋转/翻转可能露出空边）
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, cw, ch)
  ctx.translate(cw / 2 + offsetX.value * k, ch / 2 + offsetY.value * k)
  ctx.rotate((rotate.value * Math.PI) / 180)
  ctx.scale(flipH.value ? -1 : 1, flipV.value ? -1 : 1)
  const dw = baseW.value * scale.value * k
  const dh = baseH.value * scale.value * k
  ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh)
  emit('confirm', canvas.toDataURL('image/jpeg', 0.92))
  dialogVisible.value = false
}
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="title || t('mockup.cropTitle')" :width="dialogWidth"
    align-center :close-on-click-modal="false" append-to-body>
    <div class="cropper">
      <!-- 预览区：框外深色遮罩，框内九宫格参考线 -->
      <div class="preview-mask">
        <div class="crop-frame" :style="{ width: frameW + 'px', height: frameH + 'px' }"
          @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp"
          @pointercancel="onPointerUp">
          <img v-if="visible && currentSrc" class="crop-image" :src="currentSrc" :style="imgStyle" draggable="false"
            alt="">
          <div class="grid v1" />
          <div class="grid v2" />
          <div class="grid h1" />
          <div class="grid h2" />
        </div>
      </div>

      <!-- 控制区 -->
      <div class="controls">
        <div class="slider-row">
          <span class="label">{{ t('mockup.cropZoom') }}</span>
          <el-slider :model-value="zoomPercent" :min="100" :max="400" size="small" @input="onZoomInput" />
          <span class="value">{{ zoomPercent }}%</span>
        </div>
        <div class="slider-row">
          <span class="label">{{ t('mockup.cropRotate') }}</span>
          <el-slider v-model="rotate" :min="-180" :max="180" size="small" />
          <span class="value">{{ rotate }}°</span>
        </div>
        <div class="btn-row">
          <el-button size="small" @click="rotateBy(-90)">-90°</el-button>
          <el-button size="small" @click="rotateBy(90)">+90°</el-button>
          <el-button size="small" @click="flipH = !flipH">{{ t('mockup.cropFlipH') }}</el-button>
          <el-button size="small" @click="flipV = !flipV">{{ t('mockup.cropFlipV') }}</el-button>
          <el-button size="small" @click="resetTransform">{{ t('mockup.cropReset') }}</el-button>
        </div>
        <div class="tip">{{ t('mockup.cropTip') }}</div>
      </div>
    </div>

    <template #footer>
      <el-button @click="dialogVisible = false">{{ t('mockup.cancel') }}</el-button>
      <el-button type="success" @click="onConfirm">{{ t('mockup.cropConfirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.cropper {
  display: flex;
  flex-direction: column;

  .preview-mask {
    display: flex;
    justify-content: center;
    padding: 8px;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 6px;
    overflow: hidden;

    .crop-frame {
      position: relative;
      overflow: hidden;
      cursor: grab;
      touch-action: none;
      border-radius: 4px;
      // 巨大 spread 阴影形成框外遮罩
      box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.55);

      &:active {
        cursor: grabbing;
      }

      .crop-image {
        position: absolute;
        user-select: none;
        -webkit-user-drag: none;
        max-width: none;
      }

      .grid {
        position: absolute;
        background: rgba(255, 255, 255, 0.55);
        pointer-events: none;

        &.v1 {
          left: 33.333%;
          top: 0;
          bottom: 0;
          width: 1px;
        }

        &.v2 {
          left: 66.667%;
          top: 0;
          bottom: 0;
          width: 1px;
        }

        &.h1 {
          top: 33.333%;
          left: 0;
          right: 0;
          height: 1px;
        }

        &.h2 {
          top: 66.667%;
          left: 0;
          right: 0;
          height: 1px;
        }
      }
    }
  }

  .controls {
    margin-top: 12px;

    .slider-row {
      display: flex;
      align-items: center;
      gap: 8px;

      .label {
        flex: none;
        width: 34px;
        font-size: 13px;
        color: #6b7280;
      }

      .el-slider {
        flex: 1;
      }

      .value {
        flex: none;
        width: 44px;
        font-size: 12px;
        color: #6b7280;
        text-align: right;
      }
    }

    .btn-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0;
      margin-top: 10px;

      .el-button {
        margin-left: 0;
        margin-right: 8px;
        margin-bottom: 4px;
      }
    }

    .tip {
      margin-top: 8px;
      font-size: 12px;
      color: #9ca3af;
    }
  }
}

// PC 端：预览区（左）+ 控制区（右）左右布局
@media (min-width: 768px) {
  .cropper {
    flex-direction: row;
    align-items: stretch;
    gap: 16px;

    .preview-mask {
      flex: 1;
      align-items: center;
    }

    .controls {
      flex: none;
      width: 240px;
      margin-top: 0;
      display: flex;
      flex-direction: column;

      .btn-row {
        .el-button {
          margin-right: 0;
          margin-bottom: 8px;
          width: 100%;
        }
      }

      .tip {
        margin-top: auto;
      }
    }
  }
}
</style>
