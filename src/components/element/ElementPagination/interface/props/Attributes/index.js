export default {
  /**
   * @param small
   * @description 是否使用小型分页样式
   * @default true
   * @type <Boolean>
   */
  small: false,
  /**
   * @param background
   * @description 是否为分页按钮添加背景色
   * @default true
   * @type <Boolean>
   */
  background: true,
  /**
   * @param page-size
   * @description 每页显示条目个数
   * @default 10
   * @type <Number>
   */
  pageSize: 10,
  /**
   * @param total
   * @description 总条目数
   * @default 0
   * @type <Number>
   */
  total: 0,
  /**
   * @param page-count
   * @description 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性
   * @type <Number>
   */
  pageCount: undefined,
  /**
   * @param pager-count
   * @description 页码按钮的数量，当总页数超过该值时会折叠
   * @default 5
   * @augments { 大于等于 5 且小于等于 21 的奇数 }
   * @type <Number>
   */
  pagerCount: 5,
  /**
   * @param current-page
   * @description 当前页数，支持 .sync 修饰符
   * @default 1
   * @type <Number>
   */
  currentPage: 1,
  /**
   * @param layout
   * @description 组件布局，子组件名用逗号分隔
   * @default 'prev, pager, next, jumper, ->, total'
   * @augments { sizes, prev, pager, next, jumper, ->, total, slot }
   * @type <String>
   */
  layout: 'total, ->, prev, pager, next, jumper',
  /**
   * @param page-sizes
   * @description 每页显示个数选择器的选项设置
   * @default [10, 20, 30, 40, 50, 100]
   * @type <Number[]>
   */
  pageSizes: [ 10, 20, 30, 40, 50, 100 ],
  /**
   * @param popper-class
   * @description 每页显示个数选择器的下拉框类名
   * @type <string>
   */
  popperClass: undefined,
  /**
   * @param prev-text
   * @description 替代图标显示的上一页文字
   * @type <string>
   */
  prevText: undefined,
  /**
   * @param next-text
   * @description 替代图标显示的下一页文字
   * @type <string>
   */
  nextText: undefined,
  /**
   * @param disabled
   * @description 是否禁用
   * @default false
   * @type <boolean>
   */
  disabled: false
}
