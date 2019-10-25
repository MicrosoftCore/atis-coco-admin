import crops from './modules/crops'
import provinces from './modules/provinces'
import regions from './modules/regions'

export default {
  namespaced: true,
  state: {
    vm: undefined
  },
  modules: {
    crops,
    provinces,
    regions
  },
  actions: {
    async initialize ({ state, dispatch }) {
      // 获取作物
      dispatch('crops/get', state.vm)
      // 获取省市区
      dispatch('provinces/get', state.vm)
      // 获取四级省市区
      dispatch('regions/get', state.vm)
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
      // DB -> store 加载作物列表
      this.commit('common/crops/load')
      // DB -> store 持久化数据加载省市区
      this.commit('common/provinces/load')
      // DB -> store 持久化数据加载省市区
      this.commit('common/regions/load')
    }
  }
}
