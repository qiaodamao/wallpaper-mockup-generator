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
    '@nuxtjs/sitemap',
    '@nuxt/eslint'
  ],
  typescript: {
    typeCheck: false // typecheck 由 pnpm typecheck 单独执行，避免拖慢 dev
  },
  // 新版 @nuxtjs/sitemap 从 site-config 读取站点地址（siteUrl 选项已移除）
  site: {
    url: 'https://kusheji.com/',
  },
  sitemap: {
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
  // EdgeOne 等运行时按 pnpm 严格模式安装依赖，@popperjs/core（element-plus 的传递依赖）
  // 不在顶层 node_modules，必须内联进 server 产物，否则 SSR 报 ERR_MODULE_NOT_FOUND
  nitro: {
    externals: {
      inline: ['@popperjs/core']
    }
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  css: ['@/assets/css/tailwind.css', '@/assets/css/_variables.scss', '@/assets/css/font.css'],
})
