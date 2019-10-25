import Expand from './expand'
export default {
  name: 'ElTableColumn',
  functional: true,
  components: {
    Expand
  },
  props: {
    columns: Array
  },
  render: (h, context) => {
    return context.props.columns.filter(({ hidden }) => !hidden).map((props, index) => {
      let data = { props }

      if (props.render) {
        data.scopedSlots = {
          default: scope =>
            h(Expand, {
              props: {
                render: props.render,
                scope,
                index,
                key: scope.$index
              }
            })
        }
      }

      return h('el-table-column', data)
    })
  }
}
