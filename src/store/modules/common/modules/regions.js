/**
 * @description Provincial and urban classification 4级
 */
export default {
  namespaced: true,
  state: {
    regions: [],
    dbName: 'common'
  },
  actions: {
    get ({ state, commit }, vm) {
      vm.$axios.get(vm.$urls._('app.common.allfullregion')).then(result => {
        commit('set', result)
      })
    },
    serializeData ({ state }, { data }, list = {}, root = null) {
      return new Promise((resolve, reject) => {
        resolve(
          data.reduce((tree, current) => {
            let { RegionID, ParentRegionID, RegionName } = current

            current.value = RegionName
            current.label = RegionName

            current.children = list[RegionID] && list[RegionID].children
            list[RegionID] = current
            if (ParentRegionID === root) {
              tree.push(current)
            } else {
              list[ParentRegionID] = list[ParentRegionID] || {}
              list[ParentRegionID].children = list[ParentRegionID].children || []
              list[ParentRegionID].children.push(current)
            }
            return tree
          }, [])
        )
      })
    }
  },
  mutations: {
    async set (state, data = []) {
      let dbName = state.dbName

      let regions = await this.dispatch('common/regions/serializeData', {
        data
      })

      state.regions = regions

      this.dispatch('d2admin/db/set', {
        dbName,
        path: 'regions.regions',
        value: regions
      })
    },
    /**
     * @description 从数据库取用户数据
     * 用户数据包含用户权限、用户姓名、邮箱等
     * @param {Object} state vuex state
     */
    async load (state) {
      const dbName = state.dbName

      // store 赋值
      const regions = await this.dispatch('d2admin/db/get', {
        dbName,
        path: 'regions.regions',
        defaultValue: []
      })

      state.regions = regions
    }
  }
}
