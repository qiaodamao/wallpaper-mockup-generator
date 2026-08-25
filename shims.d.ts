// 全局类型声明：无类型定义的依赖与宿主环境变量

/** 微信小程序 web-view 注入的全局对象（仅在小程序环境存在） */
declare const wx: {
  miniProgram: {
    getEnv: (callback: (res?: { miniprogram?: boolean }) => void) => void
  }
}

/** daisyui 无类型定义 */
declare module 'daisyui'
