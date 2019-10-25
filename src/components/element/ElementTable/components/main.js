import * as jQuery from 'jquery'
import ElTableColumn from './column'
export default {
  name: 'ElTableMain',

  props: {
    attributes: Object,
    tableAttributes: Object,
    tableColumnAttributes: Array,
    actionColumnAttributes: Object,
    paginationAttributes: Object,
    url: {
      type: String,
      required: true
    }
  },

  data () {
    let filterModels = () => {
      return this.attributes.filters.map(({ components }) => {
        if (components && Array.isArray(components)) {
          return components.reduce((object, component) => {
            object[component.prop] = null
            return object
          }, {})
        } else {
          return {}
        }
      })
    }
    return {
      loading: false,
      popover: {},
      filterModels: filterModels(),
      extraButtonGroups: [],
      defaultButtonGroups: [
        {
          name: 'edit',
          icon: '编辑',
          title: '编辑',
          hidden: false,
          click: (...scope) => this.handleEdit(scope)
        },
        {
          name: 'delete',
          icon: '删除',
          title: '删除',
          hidden: false,
          click: (...scope) => this.handleDelete(scope)
        },
        {
          name: 'view',
          icon: '详情',
          title: '详情',
          hidden: false,
          click: (...scope) => this.handleView(scope)
        }
      ],
      extraNavButtonGroups: [],
      defaultNavButtonGroups: [
        {
          name: 'add',
          icon: '新增',
          title: '新增',
          hidden: false,
          click: () => this.handleAdd()
        },
        {
          name: 'refresh',
          icon: '刷新',
          title: '刷新',
          hidden: false,
          click: () => this.handleRefresh()
        }
      ]
    }
  },

  computed: {
    buttonGroups () {
      return [ ...this.defaultButtonGroups, ...this.extraButtonGroups ]
    },
    navButtonGroups () {
      return [ ...this.defaultNavButtonGroups, ...this.extraNavButtonGroups ]
    },
    isElThead () {
      return this.navButtonGroups.some(s => !s.hidden)
    },
    isElPagination () {
      const { data } = this.tableAttributes
      return this.attributes.pagination && Array.isArray(data) && data.length
    }
  },

  methods: {
    executeOptions () {
      Object.entries(this.attributes).forEach(([ key, option ]) => this.handleOptions(key, option))
    },
    handleAdd () {},
    handleButtonRender (button, scope) {
      return typeof button.hidden === 'function'
        ? button.hidden(scope.row, scope.column, scope.$index, scope.store, scope._self)
        : !button.hidden
    },
    handleDelete ([ row, column, index, store, _self ]) {
      console.log(row, column, index, store, _self)
    },
    handleEdit ([ row, column, index, store, _self ]) {
      console.log(row, column, index, store, _self)
    },
    handleRefresh () {
      this.handleHttpRequest()
    },
    handleView ([ row, column, index, store, _self ]) {
      console.log(row, column, index, store, _self)
    },
    handleOptions (key, option) {
      switch (key) {
        case 'actionColumn':
          this['handleOptionsActionColumn'](option)
          break
        case 'filters':
          this['handleOptionsFilters'](option)
          break
        case 'nav':
          this['handleOptionsNav'](option)
          break
      }
    },
    handleOptionsActionColumn (actionColumnOptions) {
      let { extraButtons } = actionColumnOptions

      this.defaultButtonGroups.forEach(item => {
        if (actionColumnOptions[item.name] === false) {
          this.defaultButtonGroups.find(tar => tar.name === item.name).hidden = true
        }
      })

      if (extraButtons) {
        // @Override
        extraButtons.map(el => {
          let defaultButton = this.defaultButtonGroups.find(tar => tar.name === el.name)
          if (defaultButton && defaultButton.name && defaultButton.name === el.name) {
            jQuery.extend(true, defaultButton, el)
          } else {
            this.extraButtonGroups.push(el)
          }
        })
      } else {
        // todo ...
      }
    },
    handleOptionsNav (navOptions) {
      let { extraButtons } = navOptions

      this.defaultNavButtonGroups.forEach(item => {
        if (navOptions[item.name] === false) {
          this.defaultNavButtonGroups.find(tar => tar.name === item.name).hidden = true
        }
      })

      if (extraButtons) {
        // @Override
        extraButtons.map(el => {
          let defaultButton = this.defaultNavButtonGroups.find(tar => tar.name === el.name)
          if (defaultButton && defaultButton.name && defaultButton.name === el.name) {
            jQuery.extend(true, defaultButton, el)
          } else {
            this.extraNavButtonGroups.push(el)
          }
        })
      } else {
        // todo ...
      }
    },
    handleOptionsFilters (filters) {
      if (filters.some(filter => filter.defaultRender)) {
        this.handleHttpRequest()
      }
    },
    handleHttpRequest (onSearch, onSearchIndex) {
      let { type, extraParams, loadComplete, loading } = this.attributes

      let params = Object.assign({}, extraParams, this.filterModels[onSearchIndex >>> 0])

      params = Object.entries(params).reduce((object, [ key, value ]) => {
        value !== null && (object[key] = value)
        return object
      }, {})

      if (onSearch) {
        this.$emit('paginationChange', { currentPage: 1 })
        if (typeof onSearch === 'function') {
          params = onSearch(Object.assign({}, params)) || params
        }
      }

      this.$nextTick(_ => {
        let { pageSize, currentPage } = this.paginationAttributes

        params = Object.assign({}, params, {
          Number: currentPage,
          Size: pageSize
        })

        params = type.toLocaleUpperCase() === 'GET' ? { params } : params

        this.loading = loading
        this.$axios[type.toLocaleLowerCase()](this.url, params).then(response => {
          this.loading = false
          loadComplete && loadComplete(response)
          let { Content = [], TotalElements = 0 } = response
          this.$emit('httpChange', {
            defaultTableOptions: {
              data: Content
            },
            defaultPaginationOptions: {
              total: TotalElements
            }
          })
        })
      })
    },
    handleSizeChange (pageSize) {
      this.$emit('paginationChange', { pageSize })
      this.handleHttpRequest()
    },
    handleCurrentChange (currentPage) {
      this.$emit('paginationChange', { currentPage })
      this.handleHttpRequest()
    }
  },

  render (h) {
    let ElSearchForm = this.attributes.filters
      .filter(({ components }) => components && Array.isArray(components) && components.length)
      .map((filter, index) => {
        let { canClearSearch, components, searchButton } = filter

        return h(
          'el-card',
          {
            style: {
              'margin-bottom': '20px'
            },
            props: {
              'body-style': {
                'padding': '18px 20px 0'
              }
            }
          },
          [
            h(
              'div',
              {
                slot: 'header',
                style: {
                  'display': 'flex',
                  'align-items': 'center',
                  'justify-content': 'space-between',
                  'margin': '-3px 0'
                }
              },
              [
                h('span', '快速搜索'),
                h('div', [
                  h(
                    'el-button',
                    {
                      props: {
                        disabled: this.loading,
                        icon: 'fa fa-search',
                        type: 'text'
                      },
                      style: {
                        'padding': '0',
                        'font-size': '15px'
                      },
                      on: {
                        click: () => {
                          this.handleHttpRequest(searchButton.onSearch || true, index)
                        }
                      }
                    },
                    searchButton.text
                  ),
                  canClearSearch &&
                    h(
                      'el-button',
                      {
                        props: {
                          disabled: this.loading,
                          type: 'text'
                        },
                        style: {
                          'padding': '0',
                          'font-size': '15px'
                        },
                        on: {
                          click: () => {
                            let filters = this.$refs['filterPanel']
                            let filterPanel = filters[index]
                            filterPanel.resetFields()
                            this.$message('查询条件已清除')
                          }
                        }
                      },
                      '清空'
                    )
                ])
              ]
            ),
            h(
              'el-form',
              {
                ref: 'filterPanel',
                refInFor: true,
                props: {
                  model: this.filterModels[index],
                  inline: true,
                  size: 'small'
                }
              },
              components.filter(f => f.prop && f.label).map(component => {
                let { prop, label, type, attributes, optionAttributes } = component

                let defaultProps = {
                  value: this.filterModels[index][prop],
                  placeholder: label,
                  ...attributes
                }

                let defaultStyle = {
                  'width': '150px'
                }

                return h(
                  'el-form-item',
                  {
                    props: {
                      prop
                    }
                  },
                  [
                    (_ => {
                      if (type === 'select') {
                        return h(
                          'el-select',
                          {
                            style: defaultStyle,
                            props: defaultProps,
                            on: {
                              input: value => {
                                this.filterModels[index][prop] = value
                              }
                            }
                          },
                          optionAttributes.map(props =>
                            h('el-option', {
                              props
                            })
                          )
                        )
                      } else if (type === 'cascader') {
                        return h('el-cascader', {
                          style: defaultStyle,
                          props: {
                            expandTrigger: 'hover',
                            changeOnSelect: true,
                            filterable: true,
                            ...defaultProps
                          },
                          on: {
                            input: value => {
                              this.filterModels[index][prop] = value
                            }
                          }
                        })
                      } else {
                        return h('el-input', {
                          attrs: {
                            placeholder: label
                          },
                          style: defaultStyle,
                          props: defaultProps,
                          on: {
                            input: value => {
                              this.filterModels[index][prop] = value
                            }
                          }
                        })
                      }
                    })()
                  ]
                )
              })
            )
          ]
        )
      })

    let ElThead = h(
      'el-form',
      {
        style: {
          'height': '45px',
          'padding': '0 10px',
          'display': 'flex',
          'align-items': 'center',
          'box-sizing': 'border-box',
          'border': '1px solid #ebeef5',
          'border-bottom': 'none',
          'background-color': '#f7f7f7'
        },
        props: {
          size: 'mini',
          inline: true
        }
      },
      this.navButtonGroups.filter(({ hidden }) => !hidden).map((button, index) => {
        return h(
          'el-form-item',
          {
            key: index,
            style: {
              'margin-bottom': '0'
            }
          },
          [
            h(
              'el-tooltip',
              {
                props: {
                  content: button.title,
                  placement: 'top'
                }
              },
              [
                h(
                  'el-button',
                  {
                    style: {
                      'border-style': 'dashed'
                    },
                    on: {
                      click: button.click
                    }
                  },
                  [
                    h(
                      'svg',
                      {
                        attrs: {
                          'aria-hidden': true,
                          name: button.name
                        },
                        style: {
                          'width': '13px',
                          'height': '13px',
                          'margin-right': '5px',
                          'vertical-align': 'middle'
                        }
                      },
                      [
                        h('use', {
                          attrs: {
                            'xlink:href': '#dd-' + button.icon
                          }
                        })
                      ]
                    ),
                    h(
                      'span',
                      {
                        style: {
                          'vertical-align': 'middle'
                        }
                      },
                      button.title
                    )
                  ]
                )
              ]
            )
          ]
        )
      })
    )

    let ElTable = h(
      'el-table',
      {
        ref: 'table',
        props: this.tableAttributes,
        on: this.$listeners,
        style: {
          'width': '100%',
          'margin-bottom': '20px'
        }
      },
      [
        h(ElTableColumn, {
          props: {
            columns: this.tableColumnAttributes
          }
        }),
        !this.actionColumnAttributes.hidden &&
          h('el-table-column', {
            props: this.actionColumnAttributes,
            scopedSlots: {
              default: scope =>
                this.buttonGroups
                  .filter(button => this.handleButtonRender(button, scope))
                  .map(({ name, title, click }) => {
                    let { $index, column, row, store, _self } = scope
                    let buttonIndex = name + $index
                    let buttonStyle = {
                      'padding': '5px 10px',
                      'margin-right': '5px',
                      'letter-spacing': '2px',
                      'font-size': '14px'
                    }

                    if (name === 'delete') {
                      return h(
                        'el-tooltip',
                        {
                          key: $index,
                          props: {
                            content: title,
                            placement: 'top'
                          }
                        },
                        [
                          h(
                            'el-popover',
                            {
                              props: {
                                value: this.popover[buttonIndex],
                                placement: 'top',
                                width: '160'
                              }
                            },
                            [
                              h('p', '您确定删除所选记录吗?'),
                              h(
                                'div',
                                {
                                  style: {
                                    'margin': '0',
                                    'text-align': 'right'
                                  }
                                },
                                [
                                  h(
                                    'el-button',
                                    {
                                      props: {
                                        size: 'mini',
                                        type: 'text'
                                      },
                                      on: {
                                        click: () => {
                                          this.popover = {}
                                        }
                                      }
                                    },
                                    '取消'
                                  ),
                                  h(
                                    'el-button',
                                    {
                                      props: {
                                        size: 'mini',
                                        type: 'primary'
                                      },
                                      on: {
                                        click: () => {
                                          click(row, column, $index, store, _self)
                                          this.popover = {}
                                        }
                                      }
                                    },
                                    '确定'
                                  )
                                ]
                              ),
                              h(
                                'el-button',
                                {
                                  slot: 'reference',
                                  style: buttonStyle,
                                  props: {
                                    size: 'mini',
                                    type: 'danger'
                                  },
                                  on: {
                                    click: () => {
                                      this.popover = {}
                                      this.popover[buttonIndex] = true
                                    }
                                  }
                                },
                                title
                              )
                            ]
                          )
                        ]
                      )
                    } else {
                      return h(
                        'el-button',
                        {
                          style: buttonStyle,
                          props: {
                            size: 'mini'
                          },
                          on: {
                            click: () => {
                              click(row, column, $index, store, _self)
                            }
                          }
                        },
                        title
                      )
                    }
                  })
            }
          })
      ]
    )

    let ElPagination = h('el-pagination', {
      props: this.paginationAttributes,
      on: {
        'size-change': this.handleSizeChange,
        'current-change': this.handleCurrentChange
      }
    })

    this.$log.warning('>>>>>>>> Rerender')

    return h(
      this.attributes.container ? this.attributes.container : 'div',
      {
        directives: [
          {
            name: 'loading',
            value: this.loading
          }
        ]
      },
      [ ElSearchForm, this.isElThead && ElThead, ElTable, this.isElPagination && ElPagination ]
    )
  },

  created () {
    this.executeOptions()
  }
}
