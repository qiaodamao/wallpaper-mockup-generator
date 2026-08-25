<script lang="ts" setup>
import type { WatermarkSetting } from '~/utils/types'

// 水印设置面板：开关、文本、位置、字号、颜色
// 通过 defineModel 双向绑定页面持有的 waterSetting 对象
const waterSetting = defineModel<WatermarkSetting>('waterSetting', { required: true })

const { t } = useI18n()

const defaultWaterColor = "#ffffff"

function waterColorChange(color: string | null) {
  if (color) {
    waterSetting.value.color = color
    return color
  }
  waterSetting.value.color = defaultWaterColor
  return defaultWaterColor
}
</script>

<template>
  <div>
    <div class="water-switch-setting">
      <div>{{ t('mockup.author') }}</div>
      <el-switch v-model="waterSetting.enable" style="--el-switch-on-color: #13ce66;" />
    </div>
    <div v-if="waterSetting.enable" class="water-setting">
      <el-input v-model="waterSetting.text" :rows="2" type="textarea" :placeholder="t('mockup.designByWho')" />
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
          <el-color-picker
            v-model="waterSetting.color"
            :predefine="['rgb(255, 255, 255)', 'rgb(76, 76, 76)', 'rgb(26, 114, 167)', 'rgb(99, 136, 165)', 'rgb(12, 60, 148)', 'rgb(89, 52, 40)', 'rgb(162, 216, 228)']"
            @active-change="waterColorChange($event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
