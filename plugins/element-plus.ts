import { defineNuxtPlugin } from '#app'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp
  app.use(ElementPlus)

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
})