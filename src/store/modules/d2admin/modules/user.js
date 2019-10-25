import setting from '@/common/setting.js'

export default {
  namespaced: true,
  state: {
    info: setting.user.info
  },
  actions: {
    get ({ commit }, vm) {
      return vm.$axios.get(
        vm.$urls._('app.common.getuserinfo')
      )
    }
  },
  mutations: {
    set (state, info) {
      // store 赋值
      state.info = info
      // 持久化
      this.dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'user.info',
        value: info,
        user: true
      })
    },
    /**
     * @description 从数据库取用户数据
     * 用户数据包含用户权限、用户姓名、邮箱等
     * @param {Object} state vuex state
     */
    async load (state) {
      // store 赋值
      const info = await this.dispatch('d2admin/db/get', {
        dbName: 'sys',
        path: 'user.info',
        defaultValue: state.info,
        user: true
      })

      /**
         * @description 用户数据包含权限信息
         * 有用户数据才能加载菜单
         * 没有用户数据就去拿
         */
      if (info === state.info) {
        this.dispatch('d2admin/account/bootstrap')
      } else {
        state.info = info
      }
    }
  }
}
