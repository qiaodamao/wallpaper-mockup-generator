
export default defineNuxtRouteMiddleware((to) => {
  const { $i18n } = useNuxtApp()
  const defaultLocale = $i18n.defaultLocale
  const prefix = `/${defaultLocale}`

  // 如果当前路径是默认语言前缀，则重定向到不带前缀的路径
  if (to.path.startsWith(`${prefix}/`) || to.path === prefix) {
    const newPath = to.path.replace(prefix, '') || '/'
    return navigateTo(newPath)
  }
})