/**
 * @description Provincial and urban classification
 */
export default {
  namespaced: true,
  state: {
    provinces: [],
    dbName: 'common'
  },
  actions: {
    get ({ state, commit }, vm) {
      vm.$axios.get(vm.$urls._('app.common.allregion')).then(result => {
        commit('set', result)
      })
    },
    serializeData ({ state }, { data }, list = {}, root = null) {
      return new Promise((resolve, reject) => {
        resolve(
          data.reduce((tree, current) => {
            let { RegionID, ParentRegionID, RegionCode, RegionName } = current

            current.value = RegionCode
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

      let provinces = await this.dispatch('common/provinces/serializeData', {
        data
      })

      state.provinces = provinces

      this.dispatch('d2admin/db/set', {
        dbName,
        path: 'provinces.provinces',
        value: provinces
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
      const provinces = await this.dispatch('d2admin/db/get', {
        dbName,
        path: 'provinces.provinces',
        defaultValue: []
      })

      state.provinces = provinces
    }
  }
}
