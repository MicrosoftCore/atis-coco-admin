import JsCookie from 'js-cookie'
import { AccountLoginService } from '@/common/service'

export default {
  namespaced: true,
  state: {
    vm: undefined
  },
  actions: {
    /**
     * @description App 引导程序
     * 此时一切准备就绪，开始获取用户信息并加载菜单
     */
    async bootstrap ({ state, commit, dispatch }) {
      // Global vuex root.
      const scope = { root: true }

      // 先拿用户
      const user = await
        dispatch('d2admin/user/get', state.vm, scope)

      // 拿到用户之后, 再加载菜单, 用户信息, 常规数据
      if (user) {
        commit('d2admin/user/set', user, scope)

        commit('d2admin/menu/asideSet', user, scope)

        dispatch('common/initialize', null, scope)

        state.vm.$router.push({
          name: 'index'
        })
      }
    },
    /**
     * @description 登陆
     * @param {Object} param context
     * @param {Object} param username {String} 用户账号
     * @param {Object} param password {String} 密码
     */
    async login ({ state, dispatch }, params) {
      const vm = state.vm

      const result = await AccountLoginService(vm, {
        ...params,
        grant_type: 'password'
      })

      if (result) {
        const {
          access_token,
          expires_in,
          error,
          error_description
        } = result

        if (error && error_description) {
          vm.$message.error(error_description)
          Promise.reject(error_description)
        } else {
          const setting = {
            expires: expires_in
          }

          JsCookie.set('access_token', access_token, setting)

          vm.$log.capsule(
            `login-success`,
            `${vm.$moment().format('YYYY/MM/DD HH:mm:ss')}`,
            `success`)

          await dispatch('bootstrap')
        }
      }
    },
    /**
     * @description 注销用户并返回登陆页面
     * @param {Object} param context
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout ({ state }, { confirm = false }) {
      /**
       * @description 注销
       */
      const logout = () => {
        // 删除cookie
        JsCookie.remove('access_token')
        // 跳转路由
        state.vm.$router.push({
          name: 'login'
        })
      }
      if (confirm) {
        state.vm.$confirm('注销此账户吗?', '注销', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          logout()
        }).catch(() => {
          // 取消了注销
          state.vm.$message('放弃注销用户')
        })
      } else {
        logout()
      }
    }
  },
  mutations: {
    /**
     * @description 用户登陆后从持久化数据加载一系列的设置
     * @param {Object} state vuex state
     */
    load (state, vm) {
      // Vue -> store 挂载实例
      state.vm = vm
      // DB -> store 加载用户名
      this.commit('d2admin/user/load')
      // DB -> store 持久化数据加载这个用户之前设置的侧边栏折叠状态
      this.commit('d2admin/menu/asideMenusLoad')
    }
  }
}
