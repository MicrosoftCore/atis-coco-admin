/**
 * @description The International Code of Botanical Nomenclature is abbreviated
 * according to the International Code of Botanical Nomenclature.
 * The names of green plants (including fungi) include 12 main grades (Jie Yuan) (Category).
 * @type The main taxa are as follows:
 * Divisio or Phylum Classis (class), Ordo (order), Familia (Family), Tribus (Tribe),
 * Genus (Genus), Sectio (Section), Series (Series), Species (Species), Varietas (Variety), Forma (Fo). Rm)
 * Families and genera of plants refer to the families and genera in the classification of plants,
 * which can be simply divided into: families and genera of plants, a total of 344 species.
 * @see (e.g. https://en.wikipedia.org/wiki/Category:Plant_taxonomy)
 */
export default {
  namespaced: true,
  state: {
    catalog: {},
    category: [],
    dbName: 'common'
  },
  actions: {
    get ({ state, commit }, vm) {
      vm.$axios.get(vm.$urls._('app.common.allplant')).then(result => {
        commit('set', result)
      })
    },
    serializeData ({ state }, { data, tree = false }, list = {}, root = null) {
      return new Promise((resolve, reject) => {
        if (tree) {
          resolve(
            data.reduce((tree, current) => {
              let { Id, ParentId, TypeName } = current

              current.value = Id
              current.label = TypeName

              current.children = list[Id] && list[Id].children
              list[Id] = current
              if (ParentId === root) {
                tree.push(current)
              } else {
                list[ParentId] = list[ParentId] || {}
                list[ParentId].children = list[ParentId].children || []
                list[ParentId].children.push(current)
              }
              return tree
            }, [])
          )
        } else {
          resolve(
            data.reduce((object, current) => {
              object[current.Id] = current
              return object
            }, {})
          )
        }
      })
    }
  },
  mutations: {
    async set (state, data = []) {
      let dbName = state.dbName

      let catalog = await this.dispatch('common/crops/serializeData', {
        data
      })

      let category = await this.dispatch('common/crops/serializeData', {
        data,
        tree: true
      })

      state.catalog = catalog

      state.category = category

      this.dispatch('d2admin/db/set', {
        dbName,
        path: 'crops.catalog',
        value: catalog
      })

      this.dispatch('d2admin/db/set', {
        dbName,
        path: 'crops.category',
        value: category
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
      const catalog = await this.dispatch('d2admin/db/get', {
        dbName,
        path: 'crops.catalog',
        defaultValue: []
      })

      const category = await this.dispatch('d2admin/db/get', {
        dbName,
        path: 'crops.category',
        defaultValue: []
      })

      state.catalog = catalog

      state.category = category
    }
  }
}
