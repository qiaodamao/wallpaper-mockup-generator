// https://nuxt.com/docs/api/configuration/nuxt-config
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
console.log("region:",process.env.region)
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    siteUrl: 'youngmock.top/',
    autoLastmod: true,
  },
  runtimeConfig: {
    // apiSecret: process.env.API_SECRET, // 服务端
    public: {
      region: process.env.region // 客户端也能访问
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
      {
        code: 'zh',
        file: 'zh.json',
      },
    ],
    defaultLocale: 'zh',
    detectBrowserLanguage: false, // ✅ 正确：禁用浏览器语言检测,否则默认是浏览器的语言
    lazy: true, // 懒加载语言包
    langDir: 'locales/', // 存放语言文件的目录
    strategy: 'prefix_except_default', // URL 前缀（/en, /zh），prefix_except_default：非默认语言会有语言前缀，默认语言不会有前缀
  },
  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: false })]
      }),
    ]
  },
  // nitro: {
  //   externals: {
  //     inline: ['@popperjs/core']
  //   }
  // },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  css: ['@/assets/css/tailwind.css', '@/assets/css/_variables.scss', '@/assets/css/font.css'],
})
