<script lang="ts" setup>
definePageMeta({ layout: 'page' })
const localePath = useLocalePath()
const { t } = useI18n()

const cards = [
  {
    key: 'transparentGif',
    bg: 'linear-gradient(160deg, #ffb1c8 0%, #ffd9b3 100%)',
    topChipBg: 'rgba(255,255,255,0.55)',
    topChipText: '#ffffff',
    topChip: 'ai-cut',
    btnBg: '#ff8fb1',
    btnText: '#ffffff',
    visual: '🌸',
    h: 385,
    y: 75,
  },
  {
    key: 'iphoneLock',
    bg: 'linear-gradient(160deg, #ffd1d1 0%, #ffe9d6 60%, #fff6ec 100%)',
    topChipBg: 'rgba(0,0,0,0.75)',
    topChipText: '#ffffff',
    topChip: 'lock · 6.7"',
    btnBg: '#ffb48a',
    btnText: '#ffffff',
    visual: '📱',
    h: 275,
    y: 0,
  },
  {
    key: 'ipadDesktop',
    bg: 'linear-gradient(160deg, #2f6dff 0%, #4878ff 100%)',
    topChipBg: '#ffffff',
    topChipText: '#2f6dff',
    topChip: 'iPad · desktop',
    btnBg: '#ff8a3d',
    btnText: '#ffffff',
    visual: '🟧',
    h: 400,
    y: 25,
  },
  {
    key: 'aiColor',
    bg: 'linear-gradient(160deg, #f3e6ff 0%, #ffe6f0 100%)',
    topChipBg: '#1f1f1f',
    topChipText: '#ffffff',
    topChip: 'AI · color',
    btnBg: '#caa6ff',
    btnText: '#ffffff',
    visual: '✨',
    h: 250,
    y: 100,
  },
  {
    key: 'macDesktop',
    bg: 'linear-gradient(160deg, #d8c19a 0%, #c7a677 100%)',
    topChipBg: '#1f1f1f',
    topChipText: '#ffffff',
    topChip: 'Mac · wallpaper',
    btnBg: '#1f1f1f',
    btnText: '#ffffff',
    visual: '💻',
    h: 370,
    y: 5,
  },
  {
    key: 'liveWallpaper',
    bg: 'linear-gradient(160deg, #d1f5ec 0%, #ffe1ef 100%)',
    topChipBg: '#ffffff',
    topChipText: '#0c6b5b',
    topChip: 'live · motion',
    btnBg: '#ff5fa2',
    btnText: '#ffffff',
    visual: '🪩',
    h: 290,
    y: 85,
  },
  {
    key: 'templateBundle',
    bg: 'linear-gradient(160deg, #f4ead8 0%, #e6d4b5 100%)',
    topChipBg: 'rgba(0,0,0,0.7)',
    topChipText: '#ffffff',
    topChip: 'kit · family',
    btnBg: '#0f0f0f',
    btnText: '#ffffff',
    visual: '🖼️',
    h: 395,
    y: 0,
  },
  {
    key: 'batchExport',
    bg: 'linear-gradient(160deg, #fde2ec 0%, #f9c6d6 100%)',
    topChipBg: '#ffffff',
    topChipText: '#c63b75',
    topChip: 'batch · export',
    btnBg: '#1f1f1f',
    btnText: '#ffffff',
    visual: '📦',
    h: 265,
    y: 95,
  },
] as const

const scrollerRef = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)
const isMobile = ref(false)

// 移动端等比缩小卡片高度与错落幅度
const displayCards = computed(() =>
  cards.map((c) => ({
    ...c,
    h: isMobile.value ? Math.round(c.h * 0.78) : c.h,
    y: isMobile.value ? Math.round(c.y * 0.78) : c.y,
  })),
)

function onScreenResize() {
  isMobile.value = typeof window !== 'undefined' && window.innerWidth < 640
  updateScrollState()
}

function updateScrollState() {
  const el = scrollerRef.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 4
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 4
}

function scrollBy(direction: -1 | 1) {
  const el = scrollerRef.value
  if (!el) return
  el.scrollBy({ left: direction * Math.max(260, el.clientWidth * 0.6), behavior: 'smooth' })
}

onMounted(() => {
  onScreenResize()
  scrollerRef.value?.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('resize', onScreenResize)
})

onBeforeUnmount(() => {
  scrollerRef.value?.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('resize', onScreenResize)
})
</script>

<template>
  <div class="flex flex-1 w-full bg-white dark:bg-gray-950">
    <div class="flex-1 flex flex-col items-center px-4 sm:px-8 pt-10 pb-16">
      <!-- HERO -->
      <section class="w-full max-w-5xl flex flex-col items-center text-center mt-2 sm:mt-6">
        <h1 class="text-3xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
          {{ t('home.hero.title') }}
        </h1>
        <p class="mt-4 sm:mt-5 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed whitespace-pre-line">
          {{ t('home.hero.subtitle') }}
        </p>
        <NuxtLink
          :to="localePath('/mockup')"
          class="mt-7 sm:mt-8 inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-gray-900 text-white text-sm sm:text-base font-medium hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition shadow-sm"
        >
          {{ t('home.hero.cta') }}
          <span class="ml-2">→</span>
        </NuxtLink>
      </section>

      <!-- CAROUSEL -->
      <section class="relative w-[calc(100%+2rem)] sm:w-[calc(100%+4rem)] -mx-4 sm:-mx-8 mt-12 sm:mt-16">
        <!-- left arrow -->
        <button
          v-show="canScrollLeft"
          class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-gray-700 hover:bg-gray-50 transition"
          aria-label="scroll left"
          @click="scrollBy(-1)"
        >
          ‹
        </button>
        <!-- right arrow -->
        <button
          v-show="canScrollRight"
          class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-gray-700 hover:bg-gray-50 transition"
          aria-label="scroll right"
          @click="scrollBy(1)"
        >
          ›
        </button>

        <div
          ref="scrollerRef"
          class="flex items-start gap-3 sm:gap-5 overflow-x-auto scroll-smooth pt-3 sm:pt-4 pb-5 sm:pb-6 h-[425px] sm:h-[540px] no-scrollbar snap-x snap-mandatory"
        >
          <div
            v-for="card in displayCards"
            :key="card.key"
            class="snap-start grow shrink-0 basis-[170px] sm:basis-[230px] rounded-2xl relative overflow-hidden flex flex-col justify-between p-3 sm:p-4 shadow-sm"
            :style="{ background: card.bg, height: `${card.h}px`, transform: `translateY(${card.y}px)` }"
          >
            <!-- top title chip -->
            <div class="flex justify-start">
              <span
                class="text-[11px] sm:text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm whitespace-nowrap"
                :style="{ backgroundColor: card.topChipBg, color: card.topChipText }"
              >
                {{ card.topChip }}
              </span>
            </div>

            <!-- visual mark -->
            <div class="flex-1 flex items-center justify-center text-5xl sm:text-6xl opacity-90 select-none">
              <span>{{ card.visual }}</span>
            </div>

            <!-- bottom CTA pill -->
            <div class="flex justify-center">
              <NuxtLink
                :to="localePath('/mockup')"
                class="w-full inline-flex items-center justify-center text-xs sm:text-sm font-medium h-10 sm:h-11 rounded-full transition hover:opacity-90"
                :style="{ backgroundColor: card.btnBg, color: card.btnText }"
              >
                {{ t(`home.cards.${card.key}`) }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION TITLE -->
      <section class="w-full max-w-5xl mt-10 sm:mt-16 md:mt-24 text-center px-2">
        <h2 class="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          {{ t('home.sectionTitle') }}
        </h2>
      </section>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>