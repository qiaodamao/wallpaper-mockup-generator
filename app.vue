<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
const { t, locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale.value, // 页面语言是en
  },
  title: t('head.title'),
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
    { name: 'keywords', content: t('head.keywords') },
    { name: 'description', content: t('head.description') },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ]
})
</script>

<template>
  <Analytics />
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
