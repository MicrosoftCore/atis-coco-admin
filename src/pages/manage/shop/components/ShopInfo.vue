<template>
  <div>
    <div class="top-info dd-clearfix dd-mb">
      <el-breadcrumb separator="/" class="dd-fl">
        <el-breadcrumb-item :to="{ path: '/manage/shop/index' }">商户列表</el-breadcrumb-item>
        <el-breadcrumb-item>店铺信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button size="small" class="dd-fr" @click="$router.go(-1)">返回</el-button>
    </div>
    <el-card class="baseinfo">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <div class="three_item">
          <el-form-item label="店主:" prop="ShopOwnerName">
            <el-input disabled="disabled" :value="form.ShopOwnerName"></el-input>
          </el-form-item>
          <el-form-item label="身份证:" prop="ShopOwnerIDCardNo">
            <el-input v-model="form.ShopOwnerIDCardNo"></el-input>
          </el-form-item>
          <el-form-item label="手机:" prop="ShopOwnerMobile">
            <el-input v-model="form.ShopOwnerMobile"></el-input>
          </el-form-item>
        </div>
        <div class="three_item">
          <el-form-item label="店名:" prop="ShopName">
            <el-input v-model="form.ShopName"></el-input>
          </el-form-item>
          <el-form-item label="营业执照号码:" prop="ShopBusinessLicenseNo">
            <el-input v-model="form.ShopBusinessLicenseNo"></el-input>
          </el-form-item>
          <el-form-item label="业务员:" prop="SalesManID">
            <el-select v-model="form.SalesManID" clearable placeholder="请选择">
              <el-option
                v-for="item in form.ListMSSalesManDTO"
                :key="item.SalesManID"
                :label="item.SalesManName"
                :value="item.SalesManID">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="所属区域" prop="region">
          <el-cascader
            :options="regions"
            v-model="form.region"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="店铺地址" prop="ShopAddress">
          <el-input v-model="form.ShopAddress"></el-input>
        </el-form-item>
        <el-form-item label="经营范围" prop="ShopBusinessScope">
          <el-input
            v-model="form.ShopBusinessScope"
            type="textarea"
            :rows="3"
            placeholder="请输入内容">
          </el-input>
        </el-form-item>
        <el-form-item label="备注" prop="ShopRemark">
          <el-input
            v-model="form.ShopRemark"
            type="textarea"
            :rows="3"
            placeholder="请输入内容">
          </el-input>
        </el-form-item>
        <el-form-item label="状态" prop="ShopStatus">
          <el-radio-group v-model="form.ShopStatus">
            <el-radio :label="2">启用</el-radio>
            <el-radio :label="-1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        callback()
      }
      const reg = /^1[0-9]{10}$/
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      submitting: false,
      form: {},
      info: {},
      rules: {
        ShopOwnerMobile: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('common', {
      regions: state => state.regions.regions
    })
  },
  methods: {
    getShopInfo () {
      let {
        query: {
          ShopID
        }
      } = this.$route
      if (ShopID) {
        this.$axios.post(this.$urls._('manage.shop.geteditshop'), {
          ShopID
        }).then(resp => {
          if (resp.ShopStatus != -1 && resp.ShopStatus != 2) {
            resp.ShopStatus = 2
          }
          let tmp = []
          if (resp.Region1) {
            tmp.push(resp.Region1)
          }
          if (resp.Region2) {
            tmp.push(resp.Region2)
          }
          if (resp.Region3) {
            tmp.push(resp.Region3)
          }
          if (resp.Region4) {
            tmp.push(resp.Region4)
          }
          resp.region = tmp
          this.form = resp
          this.info = JSON.parse(JSON.stringify(resp))
        })
      }
    },
    resetForm (formName) {
      this.form = JSON.parse(JSON.stringify(this.info))
    },
    back () {
      this.$router.push({
        name: 'manage-shop-index'
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.submitting) {
            this.submitting = true
            let region = this.form.region
            this.form.Region1 = region[0] || ''
            this.form.Region2 = region[1] || ''
            this.form.Region3 = region[2] || ''
            this.form.Region4 = region[4] || ''
            this.$axios.post(this.$urls._('manage.shop.submiteditshop'), this.form).then(resp => {
              this.submitting = false
              this.$notify({
                type: 'success',
                title: '温馨提示',
                message: '店铺信息修改成功'
              })
              this.back()
            }).catch(e => {
              this.submitting = false
            })
          }
        }
      })
    }
  },
  created () {
    this.getShopInfo()
  }
}
</script>
<style lang="scss" scoped>
/deep/ .baseinfo {
  padding-left: 0;
  .three_item {
    display: flex;
    .el-form-item {
      flex: 1;
    }
    .el-input__inner {
      width: 190px;
    }
  }
  .el-cascader {
    width: 100%;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #222;
    cursor: not-allowed;
  }
}
</style>
