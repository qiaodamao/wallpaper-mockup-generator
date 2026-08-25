<script lang="ts" setup>
definePageMeta({ layout: 'page' })
const localePath = useLocalePath()
const { t } = useI18n()

const cards = [
  { key: 'transparentGif', bg: 'linear-gradient(160deg, #ffb1c8 0%, #ffd9b3 100%)', topChipBg: 'rgba(255,255,255,0.55)', topChipText: '#ffffff', topChip: 'ai-cut', btnBg: '#ff8fb1', btnText: '#ffffff', visual: '🌸', h: 385, y: 75 },
  { key: 'iphoneLock', bg: 'linear-gradient(160deg, #ffd1d1 0%, #ffe9d6 60%, #fff6ec 100%)', topChipBg: 'rgba(0,0,0,0.75)', topChipText: '#ffffff', topChip: 'lock · 6.7"', btnBg: '#ffb48a', btnText: '#ffffff', visual: '📱', h: 275, y: 0 },
  { key: 'ipadDesktop', bg: 'linear-gradient(160deg, #2f6dff 0%, #4878ff 100%)', topChipBg: '#ffffff', topChipText: '#2f6dff', topChip: 'iPad · desktop', btnBg: '#ff8a3d', btnText: '#ffffff', visual: '🟧', h: 400, y: 25 },
  { key: 'aiColor', bg: 'linear-gradient(160deg, #f3e6ff 0%, #ffe6f0 100%)', topChipBg: '#1f1f1f', topChipText: '#ffffff', topChip: 'AI · color', btnBg: '#caa6ff', btnText: '#ffffff', visual: '✨', h: 250, y: 100 },
  { key: 'macDesktop', bg: 'linear-gradient(160deg, #d8c19a 0%, #c7a677 100%)', topChipBg: '#1f1f1f', topChipText: '#ffffff', topChip: 'Mac · wallpaper', btnBg: '#1f1f1f', btnText: '#ffffff', visual: '💻', h: 370, y: 5 },
  { key: 'liveWallpaper', bg: 'linear-gradient(160deg, #d1f5ec 0%, #ffe1ef 100%)', topChipBg: '#ffffff', topChipText: '#0c6b5b', topChip: 'live · motion', btnBg: '#ff5fa2', btnText: '#ffffff', visual: '🪩', h: 290, y: 85 },
  { key: 'templateBundle', bg: 'linear-gradient(160deg, #f4ead8 0%, #e6d4b5 100%)', topChipBg: 'rgba(0,0,0,0.7)', topChipText: '#ffffff', topChip: 'kit · family', btnBg: '#0f0f0f', btnText: '#ffffff', visual: '🖼️', h: 395, y: 0 },
  { key: 'batchExport', bg: 'linear-gradient(160deg, #fde2ec 0%, #f9c6d6 100%)', topChipBg: '#ffffff', topChipText: '#c63b75', topChip: 'batch · export', btnBg: '#1f1f1f', btnText: '#ffffff', visual: '📦', h: 265, y: 95 },
] as const

const scrollerRef = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

function updateScrollState() {
  const el = scrollerRef.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 4
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 4
}

function scrollBy(direction: -1 | 1) {
  const el = scrollerRef.value
  if (!el) return
  el.scrollBy({ left: direction * Math.max(220, el.clientWidth * 0.7), behavior: 'smooth' })
}

onMounted(() => {
  updateScrollState()
  scrollerRef.value?.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('resize', updateScrollState)
})

onBeforeUnmount(() => {
  scrollerRef.value?.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('resize', updateScrollState)
})
</script>

<template>
  <div class="flex flex-1 w-full min-w-0 bg-white dark:bg-gray-950">
    <div class="page-wrap flex-1 flex flex-col items-center justify-center">
      <!-- HERO -->
      <section class="hero w-full max-w-5xl flex flex-col items-center text-center px-1">
        <h1 class="hero-title font-extrabold tracking-tight text-gray-900 dark:text-white">
          {{ t('home.hero.title') }}
        </h1>
        <p class="hero-sub text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
          {{ t('home.hero.subtitle') }}
        </p>
        <NuxtLink
          :to="localePath('/mockup')"
          class="hero-cta inline-flex items-center justify-center rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition shadow-sm"
        >
          {{ t('home.hero.cta') }}
          <span class="ml-2">→</span>
        </NuxtLink>
      </section>

      <!-- CAROUSEL -->
      <section class="carousel-wrap relative w-full min-w-0">
        <button
          v-show="canScrollLeft"
          class="carousel-arrow carousel-arrow-left absolute top-1/2 -translate-y-1/2 z-20 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition"
          aria-label="scroll left"
          @click="scrollBy(-1)"
        >
          ‹
        </button>
        <button
          v-show="canScrollRight"
          class="carousel-arrow carousel-arrow-right absolute top-1/2 -translate-y-1/2 z-20 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition"
          aria-label="scroll right"
          @click="scrollBy(1)"
        >
          ›
        </button>

        <div
          ref="scrollerRef"
          class="home-scroller flex items-start overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory"
        >
          <div
            v-for="card in cards"
            :key="card.key"
            class="home-card snap-start shrink-0 grow rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-sm"
            :style="{ '--h': card.h, '--y': card.y, background: card.bg }"
          >
            <div class="flex justify-start p-3">
              <span
                class="card-chip font-medium rounded-full backdrop-blur-sm whitespace-nowrap"
                :style="{ backgroundColor: card.topChipBg, color: card.topChipText }"
              >
                {{ card.topChip }}
              </span>
            </div>

            <div class="flex-1 flex items-center justify-center opacity-90 select-none">
              <span class="card-visual">{{ card.visual }}</span>
            </div>

            <div class="flex justify-center p-3">
              <NuxtLink
                :to="localePath('/mockup')"
                class="w-full inline-flex items-center justify-center font-medium rounded-full transition hover:opacity-90"
                :style="{ backgroundColor: card.btnBg, color: card.btnText }"
              >
                {{ t(`home.cards.${card.key}`) }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ===== 移动优先：基础值即移动端，媒体查询覆盖桌面端 ===== */
.page-wrap {
  min-width: 0;
  padding: 1.5rem 1rem 3rem; /* pt-6 px-4 pb-12 */
}

/* HERO */
.hero { margin-top: 0; }
.hero-title {
  font-size: 28px;
  line-height: 1.15;
}
.hero-sub {
  margin-top: 1rem;
  font-size: 13px;
  max-width: 32rem;
}
.hero-cta {
  margin-top: 1.5rem;
  height: 2.75rem;
  padding: 0 1.5rem;
  font-size: 14px;
}

/* CAROUSEL */
.carousel-wrap { margin-top: 2rem; }
.home-scroller {
  min-width: 0;
  gap: 0.75rem;
  padding-top: 0.75rem;
  padding-bottom: 1.25rem;
  height: 400px;
}
.home-card {
  flex-basis: 160px;
  height: calc(var(--h, 300) * 1px);
  transform: translateY(calc(var(--y, 0) * 1px));
}
.card-chip { font-size: 10px; padding: 0.25rem 0.625rem; }
.card-visual { font-size: 2.5rem; }
.carousel-arrow { display: none; }
.carousel-arrow-left { left: 0.5rem; }
.carousel-arrow-right { right: 0.5rem; }
/* 卡片内底部按钮高度（移动） */
.home-card :deep(a) { height: 2.25rem; font-size: 11px; }

/* 隐藏滚动条 */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* ===== 平板/桌面端覆盖 ===== */
@media (min-width: 640px) {
  .page-wrap { padding: 2.5rem 2rem 4rem; } /* pt-10 px-8 pb-16 */
  .hero { margin-top: 0; }
  .hero-title { font-size: 48px; /* text-5xl */ }
  .hero-sub { font-size: 16px; max-width: 42rem; }
  .hero-cta { margin-top: 2rem; height: 3rem; padding: 0 1.75rem; font-size: 16px; }

  .carousel-wrap { margin-top: 4rem; }
  .home-scroller { gap: 1.25rem; padding-top: 1rem; padding-bottom: 1.5rem; height: 540px; }
  .home-card { flex-basis: 230px; }
  .card-chip { font-size: 12px; padding: 0.25rem 0.75rem; }
  .card-visual { font-size: 3.75rem; /* text-6xl */ }
  .home-card :deep(a) { height: 2.75rem; font-size: 14px; }
}

@media (min-width: 768px) {
  .hero-title { font-size: 56px; }
  .carousel-arrow { display: flex; width: 2.5rem; height: 2.5rem; }
}

/* 卡片移动端等比缩小（首屏即生效，与上面 640 桌面覆盖互补） */
@media (max-width: 639px) {
  .home-card {
    height: calc(var(--h, 300) * 0.78 * 1px);
    transform: translateY(calc(var(--y, 0) * 0.78 * 1px));
  }
}
</style>