<script lang="ts" setup>
definePageMeta({ layout: 'page' })
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <div class="home-page flex flex-1 w-full min-w-0 dark:bg-gray-950">
    <div class="page-wrap flex-1 flex flex-col items-center justify-center">
      <!-- HERO -->
      <section class="hero w-full max-w-5xl flex flex-col items-center text-center px-1">
        <h1 class="hero-title font-medium text-white">
          {{ t('home.hero.title') }}
        </h1>
        <p class="hero-sub text-white/85 leading-relaxed whitespace-pre-line">
          {{ t('home.hero.subtitle') }}
        </p>
        <NuxtLink
          :to="localePath('/mockup')"
          class="hero-cta inline-flex items-center justify-center rounded-full bg-white text-[#1F2329] font-normal hover:bg-gray-100 transition"
        >
          {{ t('home.hero.cta') }}
          <span class="ml-2">→</span>
        </NuxtLink>
      </section>

      <!-- HERO 预览图（参考豆包工作台首屏：CTA 下方居中展示产品截图） -->
      <section class="hero-preview relative w-full min-w-0">
        <img
          src="/images/hero-app-v1.png"
          :alt="t('home.hero.title')"
          class="hero-preview-img"
        >
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ===== 首屏背景：SVG 背景图（浅蓝渐变底 + 顶部模糊蓝色光晕） ===== */
.home-page {
  /* 抵消全局 Content 的 pt-[64px]，让背景从页面最顶部开始 */
  margin-top: -64px;
  padding-top: 64px;
  background-color: #ffffff;
  background-image: url('/images/hero-background.svg');
  background-repeat: no-repeat;
  background-position: top center;
  /* cover：保持 SVG 宽高比缩放铺满，窄窗口时裁剪左右两侧，光晕居中不变形 */
  background-size: cover;
  background-position: top center;
  position: relative;
  overflow: hidden;
}
/* 暗色模式：无对应 SVG，保留深色渐变 */
:root.dark .home-page {
  background-color: rgb(3, 7, 18);
  background-image: linear-gradient(rgb(10, 18, 32) 0.01%, rgb(3, 7, 18) 61.54%);
  background-size: auto;
}
.page-wrap {
  position: relative;
  min-width: 0;
  padding: 4.5rem 1rem 3rem; /* 顶部留白（移动端） */
}

/* HERO（参考豆包工作台：大标题 + 疏朗间距 + 白底胶囊按钮） */
.hero { margin-top: 0; }
.hero-title {
  font-size: 34px;
  line-height: 1.3;
  letter-spacing: 1.2px;
}
.hero-sub {
  margin-top: 18px;
  font-size: 15px;
  line-height: 1.5;
  max-width: 36rem;
}
.hero-cta {
  margin-top: 44px;
  height: 3rem;
  padding: 0 2rem;
  font-size: 15px;
}

/* HERO 预览图（参考豆包工作台：CTA 下方居中大图展示） */
.hero-preview {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
}
.hero-preview-img {
  display: block;
  width: 100%;
  max-width: 900px;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.05);
}

/* ===== 平板/桌面端覆盖 ===== */
@media (min-width: 640px) {
  .page-wrap { padding: 10rem 2rem 4rem; } /* 顶部加大留白 */
  .hero { margin-top: 0; }
  .hero-title { font-size: 56px; line-height: 72px; letter-spacing: 8px; }
  .hero-sub { font-size: 20px; line-height: 30px; margin-top: 18px; max-width: none; white-space: nowrap; }
  .hero-cta { margin-top: 48px; height: 52px; padding: 0 1.75rem; font-size: 16px; }

  .hero-preview { margin-top: 5.5rem; }
}
</style>