<script lang="ts" setup>
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: computed(() => `${props.error.statusCode} · ${t('error.title')}`),
})

function backHome() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4">
    <div class="text-center">
      <div class="text-7xl font-extrabold tracking-tight text-gray-200 dark:text-gray-800 select-none">
        {{ error.statusCode }}
      </div>
      <h1 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
        {{ t('error.title') }}
      </h1>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {{ t('error.message') }}
      </p>
      <button
        class="mt-6 inline-flex items-center justify-center rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition shadow-sm h-11 px-6"
        @click="backHome"
      >
        {{ t('error.backHome') }}
        <span class="ml-2">→</span>
      </button>
    </div>
  </div>
</template>
