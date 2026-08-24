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
</script>

<template>
  <header
    class="h-[64px] max-h-[64px] flex fixed backdrop-filter backdrop-blur-md top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-950/10 dark:border-gray-50/[0.2] bg-white/[0.5] dark:bg-gray-950/[0.5]">
    <!-- content -->
    <div class="flex-1 flex items-center justify-between max-w-screen-2xl mx-auto px-8">
      <!-- title -->
      <div>
        <slot name="title">
          <NuxtLink to="/" class="font-bold text-lg text-primary-500">
            <img src="/logo/android-chrome-192x192.png" alt="Logo" class="w-6 h-6 mr-2 inline-block align-middle" />
            <span class="capitalize text-[#008C8C]">{{ awesome.name }}</span>
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
</template>
