// 根据context 动态引入依赖
// see: https://doc.webpack-china.org/guides/dependency-management/#require-context

const __menuCtx__ = require.context('@/menu/modules', true, /^\.\/\w+\.js$/)

const __replaceRule__ = /(^\.\/)|(\.js$)/g

const chunks = __menuCtx__
  .keys()
  .reduce((modules, key) => {
    modules[key.replace(__replaceRule__, '')] = __menuCtx__(key).default
    return modules
  }, {})

// const moduleNames = Object.keys(chunks)
const moduleMenus = Object.values(chunks)

const menus = moduleMenus.filter(e => !!e)

export default menus
