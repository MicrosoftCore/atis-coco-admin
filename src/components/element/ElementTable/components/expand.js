export default {
  name: 'ElTableExpand',
  functional: true,
  props: {
    render: Function,
    scope: Object,
    index: Number
  },
  render: (createElement, context) => {
    const { $index, column, row, store, _self } = context.props.scope
    return context.props.render(createElement, { ...row }, { ...column }, $index, { ...store }, { ..._self })
  }
}
