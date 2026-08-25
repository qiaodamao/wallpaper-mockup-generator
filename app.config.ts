export default defineAppConfig({
  awesome: {
    name: '壁纸样机生成器',
    description:
      '一个用于生成设备壁纸样机的工具，支持多种设备类型和自定义选项。',
    project: {
      links: {
        github: 'https://github.com/viandwi24/nuxt3-awesome-starter',
      },
    },
    layout: {
      page: {
        navbar: {
          menus: [],
        },
      },
      footer: {
        year: new Date().getFullYear(),
      },
      welcome: {
        title: '壁纸样机生成器',
        disableInfoReplaceIndexInWelcomePage: true,
      },
    },
    author: {
      name: 'mockup',
      links: {
        github: 'https://github.com/viandwi24',
        medium: 'https://viandwi24.medium.com',
        website: 'https://viandwi24.site',
      },
    },
  },
})
