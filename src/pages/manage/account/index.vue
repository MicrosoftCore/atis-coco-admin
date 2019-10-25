<template>
  <div>
    <element-table
      ref="table"
      :url="url"
      :options="options"
      :columnOptions="columnOptions"
    ></element-table>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :before-close="onCancel"
      width="400px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        size="small"
      >
        <el-form-item
          label="登录名称"
          prop="UserName"
        >
          <el-input v-model="form.UserName"></el-input>
        </el-form-item>
        <el-form-item
          label="登录密码"
          prop="UserPassword"
        >
          <el-input
            v-model="form.UserPassword"
            type="password"
            v-if="hidePassword"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-view"
              @click="hidePassword = !hidePassword"
            ></i>
          </el-input>
          <el-input
            v-model="form.UserPassword"
            v-else
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-view"
              @click="hidePassword = !hidePassword"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="真实姓名"
          prop="RealName"
        >
          <el-input v-model="form.RealName"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="Phone"
        >
          <el-input v-model="form.Phone"></el-input>
        </el-form-item>
        <el-form-item label="账号状态">
          <el-switch
            v-model="form.Enabled"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            v-model="form.Desc"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="onCancel"
        >取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="onSubmit"
          :loading="submitting"
          :disabled="submitting"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BooleanControl from '@/components/basic/BooleanControl'
export default {
  data () {
    return {
      url: this.$urls._('manage.account.getlist'),
      columnOptions: [
        { label: 'UserID', prop: 'UserID', hidden: true },
        { label: '登录名称', prop: 'UserName' },
        { label: '真实姓名', prop: 'RealName' },
        { label: '手机号', prop: 'Phone' },
        {
          label: '创建时间',
          prop: 'CreateDate',
          type: 'date'
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
                    this.updateStatus(val, scope, done)
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
      ],
      EnabledMap: {
        0: '未启用',
        1: '已启用'
      },
      form: {},
      fields: {
        UserName: '',
        UserPassword: '',
        RealName: '',
        Phone: '',
        Enabled: 1,
        UserType: 1,
        ExpertId: '',
        Desc: ''
      },
      rules: {
        UserName: [
          { required: true, message: '请输入登录名称', trigger: 'change' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'change'
          }
        ],
        UserPassword: [
          { required: true, message: '请输入用户密码', trigger: 'change' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'change'
          }
        ],
        RealName: [
          { required: true, message: '请输入真实姓名', trigger: 'change' }
        ],
        Phone: [
          { required: true, message: '请输入手机号码', trigger: 'change' },
          { validator: this.phoneValidator, trigger: 'blur' }
        ],
        ExpertId: [{ required: true, message: '请选择专家', trigger: 'change' }]
      },
      title: '',
      hidePassword: true,
      submitting: false,
      loading: false,
      visible: false
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
                label: '用户名',
                prop: 'UserName'
              },
              {
                label: '真实姓名',
                prop: 'RealName'
              },
              {
                label: '手机号',
                prop: 'Phone'
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
          extraButtons: [
            {
              name: 'add',
              click: () => {
                this.title = '新增用户'
                this.visible = true
              }
            }
          ]
        },
        actionColumn: {
          view: false,
          extraButtons: [
            {
              name: 'edit',
              click: row => {
                this.title = '编辑用户'
                this.visible = true
                Object.assign(this.form, row)
              }
            },
            {
              name: 'delete',
              click: ({ UserID }) => {
                this.$axios
                  .post(this.$urls._('manage.account.delete'), {
                    UserID
                  })
                  .then(result => {
                    if (result) {
                      this.$refs.table.$emit('render')
                      this.$notify({
                        type: 'success',
                        title: '温馨提示',
                        message: '删除成功'
                      })
                    }
                  })
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    onCancel () {
      this.form = Object.assign({}, this.fields)
      this.$refs.form.resetFields()
      this.hidePassword = true
      this.visible = false
    },
    onInit () {
      this.form = Object.assign({}, this.fields)
    },
    updateStatus (val, scope, done) {
      this.$axios
        .post(this.$urls._('manage.account.edit'), {
          ...scope,
          Enabled: val ? 1 : 0
        })
        .then(result => {
          if (result) {
            this.$refs['table'].$emit('render')
            done()
          }
        })
    },
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let { UserID } = this.form

          let url = UserID
            ? this.$urls._('manage.account.edit')
            : this.$urls._('manage.account.add')

          let message = UserID ? '编辑用户成功' : '新增用户成功'

          this.$axios.post(url, this.form).then(result => {
            if (result) {
              this.$refs.table.$emit('render')
              this.onCancel()
              this.$notify({
                title: '温馨提示',
                message,
                type: 'success'
              })
            }
          })
        }
      })
    },
    createOptions (map) {
      return Object.entries(map).map(([value, label]) => ({ value, label }))
    },
    phoneValidator (rule, value, callback) {
      if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
  },

  created () {
    this.onInit()
  }
}
</script>

<style lang="scss" scoped>
</style>
