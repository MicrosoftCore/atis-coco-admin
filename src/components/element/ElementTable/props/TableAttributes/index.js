export default {
  /**
   * @param data
   * @description 显示的数据
   * @default []
   * @type <array>
   */
  data: [],
  /**
   * @param height
   * @description Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式
   * @type <string/number>
   */
  height: undefined,

  /**
   * @param max-height
   * @description Table 的最大高度
   * @type <string/number>
   */
  maxHeight: undefined,

  /**
   * @param stripe
   * @description 是否为斑马纹 table
   * @default true
   * @type <boolean>
   */
  stripe: true,

  /**
   * @param border
   * @description 是否带有纵向边框
   * @default true
   * @type <boolean>
   */
  border: true,

  /**
   * @param size
   * @description Table 的尺寸
   * @member <medium / small / mini>
   * @type <string>
   */
  size: 'medium',

  /**
   * @param fit
   * @description 列的宽度是否自撑开
   * @default true
   * @type <boolean>
   */
  fit: true,

  /**
   * @param show-header
   * @description 是否显示表头
   * @default true
   * @type <boolean>
   */
  showHeader: true,

  /**
   * @param highlight-current-row
   * @description 是否要高亮当前行
   * @default false
   * @type <boolean>
   */
  highlightCurrentRow: false,

  /**
   * @param current-row-key
   * @description 当前行的 key，只写属性
   * @type <String,Number>
   */
  currentRowKey: undefined,

  /**
   * @param row-class-name
   * @description 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
   * @type <Function({row, rowIndex})/String>
   */
  rowClassName: undefined,

  /**
   * @param row-style
   * @description 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
   * @type <Function({row, rowIndex})/Object>
   */
  rowStyle: ({ row, rowIndex }) => {
    return {
      'font-size': '16px'
    }
  },

  /**
   * @param cell-class-name
   * @description 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
   * @type <Function({row, column, rowIndex, columnIndex})/String>
   */
  cellClassName: undefined,

  /**
   * @param cell-style
   * @description 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
   * @type <Function({row, column, rowIndex, columnIndex})/Object>
   */
  cellStyle: undefined,

  /**
   * @param header-row-class-name
   * @description 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
   * @type <Function({row, rowIndex})/String>
   */
  headerRowClassName: undefined,

  /**
   * @param header-row-style
   * @description 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
   * @type <Function({row, rowIndex})/Object>
   */
  headerRowStyle: undefined,

  /**
   * @param header-cell-class-name
   * @description 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
   * @type <Function({row, column, rowIndex, columnIndex})/String>
   */
  headerCellClassName: undefined,

  /**
   * @param header-cell-style
   * @description 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
   * @type <Function({row, column, rowIndex, columnIndex})/Object>
   */
  headerCellStyle: ({ row, column, rowIndex, columnIndex }) => {
    return {
      'color': '#262626',
      'font-size': '16px',
      'font-weight': 'normal',
      'background-color': '#f7f7f7'
    }
  },

  /**
   * @param row-key
   * @description 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能的情况下，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
   * @type <Function(row)/String>
   */
  rowKey: undefined,

  /**
   * @param empty-text
   * @description 空数据时显示的文本内容，也可以通过 slot="empty" 设置
   * @type <String>
   */
  emptyText: undefined,

  /**
   * @param default-expand-all
   * @description 是否默认展开所有行，当 Table 中存在 type="expand" 的 Column 的时候有效
   * @default false
   * @type <Boolean>
   */
  defaultExpandAll: false,

  /**
   * @param expand-row-keys
   * @description 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
   * @type <Array>
   */
  expandRowKeys: undefined,

  /**
   * @param default-sort
   * @description 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序
   * @type <Object>
   */
  defaultSort: undefined,

  /**
   * @param tooltip-effect
   * @description tooltip effect 属性
   * @type <String>
   */
  tooltipEffect: undefined,

  /**
   * @param show-summary
   * @description 是否在表尾显示合计行
   * @default false
   * @type <Boolean>
   */
  showSummary: false,

  /**
   * @param sum-text
   * @description 合计行第一列的文本
   * @type <String>
   */
  sumText: undefined,

  /**
   * @param summary-method
   * @description 自定义的合计计算方法
   * @type <Function({ columns, data })>
   */
  summaryMethod: undefined,

  /**
   * @param span-method
   * @description 合并行或列的计算方法
   * @type <Function({ row, column, rowIndex, columnIndex })>
   */
  spanMethod: undefined,

  /**
   * @param select-on-indeterminate
   * @description 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行
   * @type <Boolean>
   */
  selectNnIndeterminate: true
}
