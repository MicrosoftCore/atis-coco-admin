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
      url: this.$urls._('bench.authentication.getpromoterslist'),
      StatusMap: {
        '0': '未审核',
        '1': '已拒绝',
        '2': '已通过'
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
                label: '微信昵称',
                prop: 'UserName',
                type: 'input'
              },
              {
                label: '真实姓名',
                prop: 'RealName',
                type: 'input'
              },
              {
                label: '手机号码',
                prop: 'Phone',
                type: 'input'
              },
              {
                label: '状态',
                prop: 'Status',
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
          hidden: true
        }
      }
    },
    columnOptions () {
      return [
        {
          type: 'expand',
          render: (
            h,
            {
              AvatarUrl,
              CreateDate,
              UserName,
              DetectionCount,
              FarmerCount,
              FarmerTotalCount,
              PersonTotalCount
            }
          ) => {
            return h(
              'div',
              {
                class: 'promoter-wrapper'
              },
              [
                h(
                  'div',
                  {
                    class: 'promoter-wrapper__left'
                  },
                  [
                    h('img', {
                      attrs: {
                        src: AvatarUrl
                      }
                    }),
                    h('h3', UserName)
                  ]
                ),
                h(
                  'el-form',
                  {
                    class: 'promoter-wrapper__right',
                    props: {
                      labelWidth: '120px',
                      labelPosition: 'left'
                    }
                  },
                  [
                    {
                      label: '创建时间',
                      prop: this.$moment(CreateDate).format(
                        'YYYY-MM-DD HH:mm:ss'
                      )
                    },
                    { label: '本月新增农户数', prop: FarmerCount },
                    { label: '总农户数', prop: FarmerTotalCount },
                    { label: '本月已服务单数', prop: DetectionCount },
                    { label: '总服务单数', prop: PersonTotalCount }
                  ].map(({ label, prop }) =>
                    h(
                      'el-form-item',
                      {
                        props: {
                          label
                        }
                      },
                      prop
                    )
                  )
                )
              ]
            )
          }
        },
        {
          label: '微信昵称',
          prop: 'AvatarUrl',
          render: (h, { AvatarUrl, UserName }) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: AvatarUrl,
                  width: '26px',
                  height: '26px'
                },
                style: {
                  'margin-right': '10px',
                  'vertical-align': 'middle'
                }
              }),
              h(
                'span',
                {
                  style: {
                    color: '#676a6c',
                    'font-weight': '600'
                  }
                },
                UserName
              )
            ])
          }
        },
        { label: '真实姓名', prop: 'RealName' },
        { label: '所在省份', prop: 'Province' },
        { label: '手机号', prop: 'Phone' },
        {
          label: '创建时间',
          prop: 'CreateDate',
          type: 'date',
          outputFormat: 'YYYY-MM-DD'
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
                  activeValue: 2,
                  inactiveValue: 1,
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
                            this.onConfirm(scope, 1)
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
                            this.onConfirm(scope, 2)
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
                  '未审核'
                )
                // h('i', {
                //   class: 'fa fa-check-circle',
                //   style: 'font-size: 20px; line-height: 32px; color: #67C23A;',
                //   slot: 'active'
                // }),
                // h('i', {
                //   class: 'fa fa-times-circle',
                //   style: 'font-size: 20px; line-height: 32px; color: #F56C6C;',
                //   slot: 'inactive'
                // })
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
      let RealName = `${scope.RealName || '未知用户'}`

      if (status === 1) {
        vNode = `<span style="color: #F56C6C">拒绝 "${RealName}"</span>`
      }
      if (status === 2) {
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
      this.$axios
        .post(this.$urls._('bench.authentication.editpromoters'), {
          ...scope,
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
.member-promoter {
  /deep/ .promoter-wrapper {
    display: flex;
    .promoter-wrapper__left {
      margin-right: 45px;
      text-align: center;
      h3 {
        margin-bottom: 0;
      }
    }
    .promoter-wrapper__right {
      flex: 1;
      .el-form-item {
        margin-bottom: 17px;
        &:last-child {
          margin-bottom: 0;
        }
        .el-form-item__label,
        .el-form-item__content {
          line-height: unset;
          font-size: 15px;
        }
      }
    }
  }
}
</style>
