import type { AppConfigInput } from 'nuxt/schema'

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
          menus: [
            { type: 'link', title: 'Blank', to: { name: 'blank' } },
            { type: 'link', title: 'Post', to: { name: 'post' } },
            { type: 'link', title: 'Test', to: { name: 'test' } },
            {
              type: 'dropdown',
              title: 'Documentations',
              children: [
                {
                  type: 'link',
                  title: 'Components',
                  to: { name: 'docs-components' },
                },
              ],
            },
            { type: 'button', title: 'Setting', to: { name: 'setting' } },
            // dynamic title
            // {
            //   type: 'button',
            //   title: (nuxt) =>
            //     (nuxt._appConfig as AppConfigInput)?.awesome?.name || '',
            //   to: (nuxt) => (nuxt._appConfig as AppConfigInput)?.awesome?.name || '',
            // },
          ],
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
