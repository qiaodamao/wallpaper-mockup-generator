// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: [
      '.vscode/**',
      'node_modules/**',
      '.nuxt/**',
      '.output/**',
      'dist/**',
      'public/**',
    ],
  },
  {
    rules: {
      // 存量代码逐步收紧：先关闭过严的规则，保证 lint 可跑通
      '@typescript-eslint/no-explicit-any': 'warn',
      'vue/no-v-html': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
)
