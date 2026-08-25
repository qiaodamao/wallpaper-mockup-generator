import type { Ref } from 'vue'
import type { MockupProtoTypeGroup, MockupExample } from '~/utils/types'
import { screenOptions, backgroundOptions, defaultImage } from '~/data/mockup/assets'
import { createIphoneExamples } from '~/data/mockup/iphone'
import { createIpadExamples } from '~/data/mockup/ipad'
import { createMacExamples } from '~/data/mockup/mac'
import { createFamilyExamples } from '~/data/mockup/family'

/**
 * 样机数据与选中状态
 *
 * 静态样机配置见 data/mockup/，此处只负责组装与选中态切换。
 */
export function useMockupData() {
  const { t } = useI18n()

  // 背景原图显隐：需要模糊时隐藏 <img>，由模糊后的 canvas 替代显示；可选 zIndex 用于前景场景图
  function backgroundDisplayStyle(zIndex?: number): Record<string, string | number> {
    return {
      display: !selectedProto.value.background.needBlur ? 'block' : 'none',
      ...(zIndex != null ? { 'z-index': zIndex } : {})
    }
  }

  const protoTypeList = ref<MockupProtoTypeGroup[]>([
    { protoType: 'iPhone', list: createIphoneExamples(t, backgroundDisplayStyle) },
    { protoType: 'iPad', list: createIpadExamples(t, backgroundDisplayStyle) },
    { protoType: 'Mac', list: createMacExamples(t, backgroundDisplayStyle) },
    { protoType: t("mockup.familyBucket"), list: createFamilyExamples(t, backgroundDisplayStyle) },
  ])

  const selectedProto = ref(protoTypeList.value[0].list[0])

  const activeProtoName = ref(selectedProto.value.protoList[0].name)

  const activeProtoTypeName = ref(protoTypeList.value[0].protoType)

  function clickProto(name: string) {
    activeProtoName.value = name;
  }

  // 切换样机示例：同步选中项、背景地址与自动跟随开关
  function protoChange(proto: MockupExample, backgroundUrl: Ref<string>, autoUpdate: Ref<boolean>, paperUrl: Ref<string>) {
    selectedProto.value = proto
    activeProtoName.value = selectedProto.value.protoList[0].name

    if (proto.background.defaultBackgroundUrl) {
      backgroundUrl.value = proto.background.defaultBackgroundUrl
    }

    autoUpdate.value = !!proto.background.autoUpdate

    if (autoUpdate.value) {
      backgroundUrl.value = paperUrl.value
    }
  }

  return {
    protoTypeList,
    selectedProto,
    activeProtoName,
    activeProtoTypeName,
    clickProto,
    protoChange,
    screenOptions,
    backgroundOptions,
    defaultImage,
  }
}
