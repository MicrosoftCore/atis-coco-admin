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
      url: this.$urls._('manage.expert.getmanageexpertlist'),
      StatusMap: {
        '0': '未认证',
        '1': '审核中',
        '2': '未通过',
        '4': '已认证'
      },
      EnabledMap: {
        0: '禁用',
        2: '启用'
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
                label: '实名认证',
                prop: 'RealStatus',
                type: 'select',
                optionAttributes: this.createOptions(this.StatusMap)
              },
              {
                label: '账号状态',
                prop: 'Enabled',
                type: 'select',
                optionAttributes: this.createOptions(this.EnabledMap)
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
          edit: false,
          extraButtons: [
            {
              name: 'viewFinal',
              title: '查看终检单',
              click: ({ ExpertId }) => {
                this.$router.push({
                  name: 'bench-final-index',
                  query: {
                    ExpertId
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
          type: 'expand',
          render: (
            h,
            {
              imageUrl1,
              imageUrl2,
              CreateDate,
              DetectionCount,
              DetectionMonthCount
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
                    style: imageUrl1 ? '' : 'display: none',
                    class: 'dd-clearfix'
                  },
                  [
                    h(
                      'div',
                      {
                        class: 'promoter-wrapper__left'
                      },
                      [
                        h('h3', '身份证正面'),
                        h('img', {
                          attrs: {
                            src: imageUrl1
                          }
                        })
                      ]
                    ),
                    h(
                      'div',
                      {
                        class: 'promoter-wrapper__right'
                      },
                      [
                        h('h3', '身份证反面'),
                        h('img', {
                          attrs: {
                            src: imageUrl2
                          }
                        })
                      ]
                    )
                  ]
                ),
                h(
                  'el-form',
                  {
                    // class: 'promoter-wrapper__right',
                    props: {
                      labelWidth: '84px',
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
                    { label: '本月单数', prop: DetectionMonthCount },
                    { label: '总单数', prop: DetectionCount }
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
                  'display': AvatarUrl ? '' : 'none',
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
        { label: '所在省份', prop: 'Address' },
        { label: '手机号', prop: 'Phone' },
        {
          label: '创建时间',
          prop: 'CreateDate',
          type: 'date',
          outputFormat: 'YYYY-MM-DD'
        },
        {
          label: '认证状态',
          prop: 'RealStatus',
          render: (h, scope) => {
            if (scope.RealStatus === 0) {
              return h(
                'el-tag',
                {
                  props: {
                    type: 'danger',
                    size: 'small'
                  },
                  slot: ''
                },
                '未认证'
              )
            } else {
              return h(
                BooleanControl,
                {
                  props: {
                    popoverTitle: '认证',
                    activeText: '通过',
                    inactiveText: '拒绝',
                    activeValue: 4,
                    inactiveValue: 2,
                    value: scope.RealStatus
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
                              this.onConfirm(scope, 2)
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
                              this.onConfirm(scope, 4)
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
                    '已认证'
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
                    '未通过'
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
        },
        {
          label: '账号状态',
          prop: 'Enabled',
          width: 100,
          render: (h, scope) => {
            return h(
              BooleanControl,
              {
                props: {
                  popoverTitle: '状态',
                  activeText: '启用',
                  value: Boolean(scope.Enabled)
                },
                on: {
                  change: (val, done) => {
                    this.updateEnabled(val, scope, done)
                  }
                }
              },
              [
                h(
                  'el-tag',
                  {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    slot: 'active'
                  },
                  '已启用'
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
                  '未启用'
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
      let RealName = `${scope.RealName || scope.UserName || '未知用户'}`

      if (status === 2) {
        vNode = `<span style="color: #F56C6C">拒绝 "${RealName}"</span>`
      }
      if (status === 4) {
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
        .post(this.$urls._('manage.user.setuserrealstatus'), {
          UserID: scope.ExpertId,
          UserType: 2,
          Status
        })
        .then(result => {
          if (result) {
            this.$refs['table'].$emit('render')
            done()
          }
        })
    },
    updateEnabled (val, scope, done) {
      this.$axios
        .post(this.$urls._('manage.user.setexpertfarmerstatus'), {
          UserID: scope.ExpertId,
          UserType: 2,
          Enabled: val ? 2 : 0
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
    img {
      width: 200px !important;
      height: auto;
    }
    h3 {
      margin-bottom: 10px;
      margin-top: 0;
    }
    .promoter-wrapper__left {
      width: 50%;
      float: left;
    }
    .promoter-wrapper__right {
      float: left;
      width: 50%;
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
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
