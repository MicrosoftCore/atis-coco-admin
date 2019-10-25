<template>
  <element-table
    ref="table"
    class="member-promoter"
    :url=url
    :options=options
    :columnOptions=columnOptions
  >
  </element-table>
</template>

<script>
import BooleanControl from '@/components/basic/BooleanControl'
export default {
  data () {
    return {
      url: this.$urls._('manage.shop.getshopinfolist'),
      StatusMap: {
        '0': '待审批',
        '-1': '禁用',
        '1': '通过'
      }
    }
  },

  computed: {
    options () {
      return {
        type: 'POST',
        filters: [
          {
            canClearSearch: true,
            components: [
              {
                label: '商户名',
                prop: 'ShopName',
                type: 'input'
              }
            ]
          }
        ],
        nav: {
          add: false
        },
        actionColumn: {
          hidden: true,
          view: false,
          delete: false,
          edit: false
        }
      }
    },
    columnOptions () {
      return [
        {
          label: '创建时间',
          prop: 'CreateTime',
          type: 'date',
          outputFormat: 'YYYY-MM-DD HH:mm:ss'
        },
        { label: '店铺名', prop: 'ShopName' },
        { label: '地址', prop: 'Address' },
        {
          label: '图片',
          prop: 'Image',
          width: '420px',
          render: (h, { Image }) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: Image,
                  width: '400px',
                  height: 'auto'
                },
                style: {
                  'margin-right': '10px',
                  'vertical-align': 'middle'
                }
              })
            ])
          }
        },
        {
          label: '审核状态',
          prop: 'Status',
          render: (h, scope) => {
            return h(
              BooleanControl,
              {
                props: {
                  popoverTitle: '审核',
                  activeText: '通过',
                  inactiveText: '拒绝',
                  activeValue: 1,
                  inactiveValue: -1,
                  value: scope.Status
                },
                on: {
                  change: (val, done) => {
                    this.updateStatus(val, scope, done)
                  }
                }
              },
              [
                h(
                  'span',
                  {
                    slot: 'control'
                  },
                  [
                    h(
                      'el-button',
                      {
                        props: {
                          type: 'danger',
                          size: 'mini'
                        },
                        on: {
                          click: () => {
                            this.onConfirm(scope, -1)
                          }
                        }
                      },
                      '拒绝'
                    ),
                    h(
                      'el-button',
                      {
                        props: {
                          type: 'primary',
                          size: 'mini'
                        },
                        on: {
                          click: () => {
                            this.onConfirm(scope, 1)
                          }
                        }
                      },
                      '通过'
                    )
                  ]
                ),
                h(
                  'el-tag',
                  {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    slot: 'active'
                  },
                  '已通过'
                ),
                h(
                  'el-tag',
                  {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    slot: 'inactive'
                  },
                  '已拒绝'
                ),
                h(
                  'el-tag',
                  {
                    props: {
                      type: 'warning',
                      size: 'small'
                    },
                    slot: 'reference'
                  },
                  '待审核'
                )
              ]
            )
          }
        }
      ]
    }
  },

  methods: {
    onConfirm (scope, status) {
      let vNode = null
      let RealName = `${scope.ShopName || '未知店铺'}`

      if (status === -1) {
        vNode = `<span style="color: #F56C6C">拒绝 "${RealName}"</span>`
      }
      if (status === 1) {
        vNode = `<span style="color: #1AAD19">通过 "${RealName}"</span>`
      }

      let title = '提示'
      let message = `此操作将 ${vNode} 的资料审核, 是否继续?`

      this.$confirm(message, title, {
        confirmButtonText: '继续',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          new Promise(resolve => {
            this.updateStatus(status, scope, resolve)
          }).then(_ => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    updateStatus (Status, scope, done) {
      let url = 'manage.shop.updateshopinfo'
      this.$axios
        .post(this.$urls._(`${url}`), {
          ShopId: scope.ID,
          Status
        })
        .then(result => {
          if (result) {
            this.$refs['table'].$emit('render')
            done()
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
