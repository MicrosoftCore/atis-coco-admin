import menus from '@/menu'

export default {
  namespaced: true,
  state: {
    // 侧栏菜单
    asideMenus: []
  },
  mutations: {
    /**
     * @description 设置侧边栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    asideSet (state, { UserType }) {
      const obtainMenu = menus => {
        return menus
          .filter(menu => {
            let { meta } = menu

            if (meta && meta.roles && meta.roles.length) {
              if (UserType === 1) {
                return meta.roles.includes('admin')
              }

              if (UserType === 2) {
                return meta.roles.includes('expert')
              }

              return false
            } else {
              return true
            }
          })
          .map(menu => {
            let { children } = menu
            if (children && children.length) {
              return {
                ...menu,
                children: obtainMenu(children)
              }
            } else {
              return menu
            }
          })
      }

      const asideMenus = obtainMenu(menus)

      // store 赋值
      state.asideMenus = asideMenus
      // 持久化
      this.dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'aside.asideMenus',
        value: asideMenus,
        user: true
      })
    },
    /**
     * 从持久化数据读取权限菜单列表
     * @param {Object} state vuex state
     */
    async asideMenusLoad (state) {
      // store 赋值
      state.asideMenus = await this.dispatch('d2admin/db/get', {
        dbName: 'sys',
        path: 'aside.asideMenus',
        defaultValue: [],
        user: true
      })
    }
  }
}
