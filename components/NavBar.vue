<script lang="ts" setup>
import { useI18n } from '#imports'
import { useAwesomeScreen } from '~/composables/use-awesome-screen'
import type { AwesomeLayoutPageNavbarMenu } from '~/utils/types'
import { useNavbarParser } from '~/composables/use-navbar-parser'
const { awesome } = useAppConfig()
const { parseMenuRoute, parseMenuTitle } = useNavbarParser()
const $screen = useAwesomeScreen()
const nuxtApp = useNuxtApp()
const { t } = useI18n()

const menus = computed(
  () =>
    (awesome?.layout?.page?.navbar?.menus ||
      []) as AwesomeLayoutPageNavbarMenu[],
)

// drawer
const showDrawer = ref(false)

const navLinks = computed(() => [
  { key: 'lockScreen', to: '/mockup' },
  { key: 'ipad', to: '/mockup' },
  { key: 'mac', to: '/mockup' },
  { key: 'live', to: '/mockup' },
  { key: 'templates', to: '/mockup' },
  { key: 'batchExport', to: '/mockup' },
  { key: 'aiColor', to: '/mockup' },
  { key: 'favorites', to: '/mockup' },
])
</script>

<template>
  <header
    class="h-[64px] max-h-[64px] flex fixed backdrop-filter backdrop-blur-md top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-950/10 dark:border-gray-50/[0.2] bg-white/[0.85] dark:bg-gray-950/[0.6]">
    <!-- content -->
    <div class="flex-1 flex items-center justify-between max-w-screen-2xl mx-auto px-6 lg:px-8">
      <!-- left: logo + nav links -->
      <div class="flex items-center gap-8 min-w-0">
        <NuxtLink to="/" class="flex items-center font-bold text-lg text-primary-500 shrink-0">
          <img src="/logo/android-chrome-192x192.png" alt="Logo" class="w-7 h-7 mr-2 inline-block align-middle" />
          <span class="capitalize text-[#008C8C] text-base">{{ awesome.name }}</span>
        </NuxtLink>
        <!-- nav links -->
        <nav class="hidden lg:flex items-center gap-5 text-sm text-gray-700 dark:text-gray-200 min-w-0">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.key"
            :to="link.to"
            class="hover:text-[#008C8C] transition-colors whitespace-nowrap"
          >
            {{ t(`home.nav.${link.key}`) }}
          </NuxtLink>
          <span class="text-gray-400 cursor-default whitespace-nowrap">{{ t('home.nav.more') }} ▾</span>
        </nav>
      </div>

      <!-- right: actions -->
      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          class="hidden sm:inline-flex items-center gap-1 h-8 px-3 rounded-full bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition"
        >
          + {{ t('home.nav.create') }}
        </button>
        <NuxtLink to="/mockup" class="hidden md:inline text-sm text-gray-700 hover:text-[#008C8C] dark:text-gray-200 px-2 py-1">
          {{ t('home.nav.plans') }}
        </NuxtLink>
        <NuxtLink to="/mockup" class="hidden md:inline text-sm text-gray-700 hover:text-[#008C8C] dark:text-gray-200 px-2 py-1">
          {{ t('home.nav.login') }}
        </NuxtLink>
        <NuxtLink
          to="/mockup"
          class="text-sm font-medium text-white bg-[#008C8C] hover:bg-[#007272] dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 px-3 py-1.5 rounded transition"
        >
          {{ t('home.nav.signup') }}
        </NuxtLink>
      </div>
    </div>

  </header>
</template>