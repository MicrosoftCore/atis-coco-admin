import * as jQuery from 'jquery'
import * as mixins from './props'
import ELTableMethods from './methods'
import { PaginationAttributes } from '../ElementPagination/interface'
import Main from './components/main'
export default {
  name: 'EleTable',

  mixins: [ ELTableMethods ],

  props: {
    options: Object,
    tableOptions: Object,
    paginationOptions: Object,
    columnOptions: {
      type: Array,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },

  // watch: {
  //   options: {
  //     deep: true,
  //     handler (newValue, oldValue) {}
  //   },
  //   paginationOptions: {
  //     deep: true,
  //     handler (newValue, oldValue) {}
  //   }
  // },

  data () {
    return {
      defaultOptions: {
        type: 'GET',
        container: 'el-card',
        extraParams: {},
        filters: [
          {
            defaultRender: true,
            canClearSearch: true,
            searchButton: {
              text: '查询'
            }
          }
        ],
        actionColumn: {
          hidden: false,
          fixed: 'right',
          label: '操作'
        },
        pagination: true,
        loading: true
      },
      defaultTableOptions: mixins.TableAttributes,
      defaultTableColumnOptions: mixins.TableColumnAttributes,
      defaultPaginationOptions: PaginationAttributes
    }
  },

  computed: {
    attributes () {
      return jQuery.extend(true, {}, this.defaultOptions, this.options)
    },
    tableAttributes () {
      return {
        ...this.defaultTableOptions,
        ...this.tableOptions
      }
    },
    tableColumnAttributes () {
      return this.columnOptions.map(columnOption => {
        let { type, formatter, outputFormat = 'YYYY-MM-DD HH:mm:ss' } = columnOption
        if (type === 'date' && formatter === undefined) {
          columnOption.formatter = (row, column, cellValue, index) => {
            if (cellValue) {
              return this.$moment(cellValue).format(outputFormat)
            } else {
              return ''
            }
          }
        }
        return {
          ...this.defaultTableColumnOptions,
          ...columnOption
        }
      })
    },
    actionColumnAttributes () {
      return {
        ...this.defaultTableColumnOptions,
        ...this.attributes.actionColumn
      }
    },
    paginationAttributes () {
      return {
        ...this.defaultPaginationOptions,
        ...this.paginationOptions
      }
    }
  },

  methods: {
    attachEvents () {
      this.$on('render', () => this.$main.handleHttpRequest())
      this.$on('setGridParams', params => {
        jQuery.extend(true, this.defaultOptions.extraParams, params)
      })
    },
    checkConfiguration () {
      const urlMissing = `ElementTable: 检查初始化配置, 缺失 URL`
      const columnMissing = `ElementTable: 检查初始化配置, 缺失 columnOptions`

      return new Promise((resolve, reject) => {
        if (!this.url) {
          reject(urlMissing)
        } else if (!this.columnOptions) {
          reject(columnMissing)
        } else {
          resolve()
        }
      })
    }
  },

  render (h) {
    let {
      attributes,
      tableAttributes,
      tableColumnAttributes,
      actionColumnAttributes,
      paginationAttributes,
      $props
    } = this

    return h(Main, {
      ref: 'main',
      props: {
        attributes,
        tableAttributes,
        tableColumnAttributes,
        actionColumnAttributes,
        paginationAttributes,
        ...$props
      },
      on: {
        ...this.$listeners,
        httpChange: ({ defaultTableOptions, defaultPaginationOptions }) => {
          this.defaultTableOptions = {
            ...this.defaultTableOptions,
            ...defaultTableOptions
          }
          this.defaultPaginationOptions = {
            ...this.defaultPaginationOptions,
            ...defaultPaginationOptions
          }
        },
        paginationChange: defaultPaginationOptions => {
          this.defaultPaginationOptions = {
            ...this.defaultPaginationOptions,
            ...defaultPaginationOptions
          }
        }
      }
    })
  },

  mounted () {
    this.checkConfiguration()
      .then(_ => {
        this.$main = this.$refs['main']
        this.attachEvents()
      })
      .catch(error => {
        this.$message.error(error)
      })
  }
}
