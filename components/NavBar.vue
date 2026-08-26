<script lang="ts" setup>
import { useI18n } from '#imports'
const { t } = useI18n()
const localePath = useLocalePath()
const { awesome } = useAppConfig()

// drawer
const showDrawer = ref(false)

const navLinks = computed(() => [
  { key: 'lockScreen', to: '/mockup' },
  { key: 'ipad', to: '/mockup' },
  { key: 'mac', to: '/mockup' },
  { key: 'live', to: '/mockup' },
])
</script>

<template>
  <header
    class="flex fixed top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50">
    <!-- content -->
    <div class="flex-1 flex items-start justify-center pt-5 px-5 sm:px-6 lg:px-8">
      <!-- nav links: 胶囊导航（参考豆包工作台：半透明白 + 毛玻璃 + 大投影） -->
      <nav class="flex items-center gap-1 px-5 h-14 w-full lg:w-auto rounded-full bg-white/10 dark:bg-gray-800/40 backdrop-blur-[15px] shadow-[0_20px_30px_rgba(77,90,108,0.12)] border border-black/5 dark:border-white/10 min-w-0">
        <NuxtLink to="/" class="flex items-center font-bold text-lg shrink-0 pr-2 mr-auto lg:mr-[100px]">
          <img src="/logo/android-chrome-192x192.png" alt="Logo" class="w-8 h-8 mr-2 rounded-full object-cover inline-block align-middle" >
          <span class="capitalize text-white text-base">{{ awesome.name }}</span>
        </NuxtLink>
        <NuxtLink
            v-for="link in navLinks"
            :key="link.key"
            :to="link.to"
            class="hidden lg:block px-3 py-1.5 rounded-full text-sm font-normal whitespace-nowrap transition-colors text-white/70 hover:text-white hover:bg-white/10"
            :active-class="'bg-white/15 text-white'"
          >
            {{ t(`home.nav.${link.key}`) }}
          </NuxtLink>

          <!-- right: actions -->
          <div class="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto lg:ml-[100px]">
            <!-- 关于：样式参考豆包工作台「联系销售」按钮（透明底白字 + 细描边胶囊） -->
            <a
              href="https://kusheji.com/about"
              target="_blank"
              rel="noopener"
              class="hidden sm:inline-block text-sm font-normal text-white border border-white/30 hover:bg-white/10 hover:border-white/50 px-[14px] py-1.5 rounded-full transition"
            >
              {{ t('home.nav.about') }}
            </a>
            <a
              href="https://kusheji.com"
              target="_blank"
              rel="noopener"
              class="hidden sm:inline-block text-sm font-medium text-gray-900 bg-white hover:bg-gray-100 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 px-[19px] py-1.5 rounded-full transition"
            >
              {{ t('home.nav.mainSite') }}
            </a>
            <!-- mobile hamburger -->
            <button
              class="lg:hidden flex flex-col items-center justify-center w-9 h-9 gap-[5px] rounded-full hover:bg-white/10 transition"
              :aria-expanded="showDrawer"
              aria-label="menu"
              @click="showDrawer = !showDrawer"
            >
              <span class="block w-5 h-[2px] bg-white/90 rounded transition-transform duration-300" :class="showDrawer ? 'translate-y-[7px] rotate-45' : ''" />
              <span class="block w-5 h-[2px] bg-white/90 rounded transition-opacity duration-300" :class="showDrawer ? 'opacity-0' : ''" />
              <span class="block w-5 h-[2px] bg-white/90 rounded transition-transform duration-300" :class="showDrawer ? '-translate-y-[7px] -rotate-45' : ''" />
            </button>
          </div>
      </nav>
    </div>

    <!-- mobile drawer -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div
        v-if="showDrawer"
        class="lg:hidden absolute top-[96px] left-5 right-5 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-[0_20px_30px_rgba(77,90,108,0.12)] border border-black/5 dark:border-white/10 max-h-[calc(100vh-112px)] overflow-y-auto"
      >
        <nav class="flex flex-col px-4 py-3">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.key"
            :to="link.to"
            class="py-2.5 px-2 text-sm text-gray-700 dark:text-gray-200 hover:text-[#008C8C] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            @click="showDrawer = false"
          >
            {{ t(`home.nav.${link.key}`) }}
          </NuxtLink>
          <div class="flex items-center gap-2 px-2 pt-3 pb-1">
            <NuxtLink
              :to="localePath('/mockup')"
              class="flex-1 text-center text-sm font-medium text-white bg-[#008C8C] hover:bg-[#007272] px-3 py-2 rounded-lg transition"
              @click="showDrawer = false"
            >
              {{ t('home.nav.signup') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/mockup')"
              class="flex-1 text-center text-sm font-medium text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-800 px-3 py-2 rounded-lg transition hover:bg-gray-50 dark:hover:bg-gray-900"
              @click="showDrawer = false"
            >
              {{ t('home.nav.login') }}
            </NuxtLink>
          </div>
        </nav>
      </div>
    </transition>

  </header>
</template>