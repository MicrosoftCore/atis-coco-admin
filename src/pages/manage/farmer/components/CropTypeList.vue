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
        <el-form-item label="种植规模" prop="AcreQty">
          <el-input v-model.number="form.AcreQty"></el-input>
        </el-form-item>
        <el-form-item label="规模单位" prop="AreaType">
         <el-radio-group v-model="form.AreaType">
            <el-radio :label="0">亩</el-radio>
            <el-radio :label="1">公顷</el-radio>
            <el-radio :label="2">数目</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="age_con is-required" label="作物年龄" prop="CropAge">
          <el-select v-model="form.year" @change="changeAge">
            <el-option :key="0" :label="0" :value="0"></el-option>
            <el-option
              v-for="n in 99"
              :key="n"
              :label="n"
              :value="n"
            ></el-option>
          </el-select>
          <label>年</label>
          <el-select v-model="form.month" @change="changeAge">
            <el-option :key="0" :label="0" :value="0"></el-option>
            <el-option
              v-for="n in 11"
              :key="n"
              :label="n"
              :value="n"
            ></el-option>
          </el-select>
          <label>月</label>
          <el-select v-model="form.day" @change="changeAge">
            <el-option :key="0" :label="0" :value="0"></el-option>
            <el-option
              v-for="n in 30"
              :key="n"
              :label="n"
              :value="n"
            ></el-option>
          </el-select>
          <label>日</label>
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
import { cropAgeFormatter, nullFormatter } from '@/pages/bench/initial/common/formatter'
export default {
  props: ['openid'],
  data () {
    return {
      url: this.$urls._('manage.farmer.getusercropinfo'),
      columnOptions: [
        { label: 'CropType', prop: 'CropType', hidden: true },
        { label: '作物名称', prop: 'CropName' },
        { label: '作物规模', prop: 'Area', formatter: nullFormatter },
        { label: '作物年龄', prop: 'CropAge', formatter: cropAgeFormatter }
      ],
      form: {},
      fields: {
        AcreQty: '',
        AreaType: '',
        year: '',
        month: '',
        day: '',
        CropAge: ''
      },
      rules: {
        AcreQty: [
          { required: true, message: '请输入种植规模', trigger: 'change' },
          { type: 'number', message: '种植规模必须为数字值', trigger: 'change' }
        ],
        AreaType: [
          { required: true, message: '请选择规模单位', trigger: 'change' }
        ],
        CropAge: [
          { required: true, message: '请选择作物年龄', trigger: 'change' }
        ]
      },
      title: '',
      submitting: false,
      loading: false,
      visible: false
    }
  },
  computed: {
    options () {
      return {
        type: 'POST',
        extraParams: {
          OpenId: this.openid
        },
        nav: {
          add: false,
          refresh: false
        },
        actionColumn: {
          delete: false,
          extraButtons: [
            {
              name: 'edit',
              title: '修改',
              click: row => {
                this.title = '修改'
                this.visible = true
                let dates = row.CropAge ? row.CropAge.split('-') : []
                row.year = dates[0] || 0
                row.month = dates[1] || 0
                row.day = dates[2] || 0
                row.AreaType = row.AreaType || 0
                Object.assign(this.form, row)
              }
            },
            {
              name: 'view',
              title: '查看',
              click: ({ CropType, CropBigType }) => {
                this.$router.push({
                  name: 'bench-final-index',
                  query: {
                    CropType,
                    CropBigType,
                    OpenId: this.openid
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
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.OpenId = this.openid
          this.$axios.post(this.$urls._('manage.farmer.completedinfo'), this.form).then(result => {
            if (result) {
              this.$refs.table.$emit('render')
              this.onCancel()
              this.$notify({
                title: '温馨提示',
                message: '修改作物资料成功',
                type: 'success'
              })
            }
          })
        }
      })
    },
    changeAge () {
      if (this.form.year == 0 && this.form.month == 0 && this.form.day == 0) {
        this.form.CropAge = ''
      } else {
        this.form.CropAge = this.form.year + '-' + this.form.month + '-' + this.form.day
      }
    },
    fmtValue (row, column) {
      const val = row[column.property]
      return val || '未知'
    }
  },

  created () {
    this.onInit()
  }
}
</script>

<style lang="scss" scoped>
/deep/ .age_con {
  input {
    width: 70px;
  }
}
</style>
