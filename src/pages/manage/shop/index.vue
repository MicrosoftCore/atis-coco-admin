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
      url: this.$urls._('manage.shop.getshoplist'),
      StatusMap: {
        '-1': '禁用',
        '1': '审核中',
        '2': '启用'
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
                label: '店主姓名',
                prop: 'ShopOwnerName',
                type: 'input'
              },
              {
                label: '商户名',
                prop: 'ShopName',
                type: 'input'
              },
              {
                label: '商户状态',
                prop: 'ShopStatus',
                type: 'select',
                optionAttributes: this.createOptions(this.StatusMap)
              }
            ]
          }
        ],
        nav: {
          add: false
        },
        actionColumn: {
          view: false,
          delete: false,
          extraButtons: [
            {
              hidden: ({ ShopStatus }) => {
                if (ShopStatus == 2) {
                  return true
                } else {
                  return false
                }
              },
              name: 'edit',
              click: ({ ShopID }) => {
                this.$router.push({
                  name: 'manage-shop-info',
                  query: {
                    ShopID
                  }
                })
              }
            }
          ]
        }
      }
    },
    columnOptions () {
      return [
        {
          label: '申请时间',
          prop: 'CreatedDate',
          type: 'date',
          outputFormat: 'YYYY-MM-DD'
        },
        { label: '店主姓名', prop: 'ShopOwnerName' },
        { label: '身份证', prop: 'ShopOwnerIDCardNo' },
        { label: '商户名', prop: 'ShopName' },
        { label: '手机号', prop: 'ShopOwnerMobile' },
        { label: '业务员', prop: 'SalesManName' },
        {
          label: '商户状态',
          prop: 'ShopStatus',
          render: (h, scope) => {
            return h(
              BooleanControl,
              {
                props: {
                  popoverTitle: '审核',
                  activeText: '启用',
                  inactiveText: '禁用',
                  activeValue: 2,
                  inactiveValue: -1,
                  value: scope.ShopStatus
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
                      '禁用'
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
                            this.onConfirm(scope, 2)
                          }
                        }
                      },
                      '启用'
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
                  '启用'
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
                  '禁用'
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
                  '审核中'
                )
              ]
            )
          }
        }
      ]
    }
  },

  methods: {
    createOptions (map) {
      return Object.entries(map).map(([value, label]) => ({ value, label }))
    },
    onConfirm (scope, status) {
      let vNode = null
      let RealName = `${scope.ShopName || '该商户'}`

      if (status == -1) {
        vNode = `<span style="color: #F56C6C">拒绝 "${RealName}"</span>`
      }
      if (status == 2) {
        vNode = `<span style="color: #1AAD19">通过 "${RealName}"</span>`
      }

      let title = '提示'
      let message = `此操作将 ${vNode} 的审核, 是否继续?`

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
      let url = Status == 2 ? 'manage.shop.authorizationshop' : 'manage.shop.cancelshop'
      this.$axios
        .post(this.$urls._(`${url}`), {
          ShopID: scope.ShopID
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
