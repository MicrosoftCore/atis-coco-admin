export default {
  methods: [
    'clearSelection',
    'toggleRowSelection',
    'toggleAllSelection',
    'toggleRowExpansion',
    'setCurrentRow',
    'clearSort',
    'clearFilter',
    'doLayout',
    'sort'
  ].reduce((methods, methodName) => {
    methods[methodName] = function () {
      const { table } = this.$refs.main.$refs
      if (table && table[methodName]) {
        table[methodName](...arguments)
      }
    }
    return methods
  }, {})
}
