<template>
  <el-container class="farmerinfo">
    <el-header class="farmer__header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/manage/farmer/index' }">农户列表</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="farmer_main">
      <el-card class="baseinfo">
        <el-form label-width="80px">
          <el-form-item label="农户:">
            <span>{{farmerInfo.RealName}}</span>
          </el-form-item>
          <el-form-item label="手机号:">
            <span>{{farmerInfo.Phone}}</span>
          </el-form-item>
          <div class="addr">
            <el-form-item label="地理位置:">
              <span>{{farmerInfo.Address}}</span>
            </el-form-item>
            <el-form-item label="归属植物分院:" label-width="100px">
              <span>{{farmerInfo.ShopName||''}}</span>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
      <div class="table_con" v-if="OpenId">
        <h5>作物检测:</h5>
        <CropTypeList ref='CropTypeList' :openid='OpenId'/>
      </div>
      <div class="table_con">
        <h5>购药记录:</h5>
        <OrderList ref='CropTypeList' :farmerid='FarmerId' :openid='OpenId'/>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  components: {
    CropTypeList: () => import('./CropTypeList'),
    OrderList: () => import('./OrderList')
  },
  data () {
    return {
      farmerInfo: {},
      OpenId: '',
      FarmerId: ''
    }
  },
  methods: {
    getFarmerInfo () {
      let {
        query: {
          FarmerId,
          OpenId
        }
      } = this.$route
      this.OpenId = OpenId
      this.FarmerId = FarmerId
      if (FarmerId) {
        this.$axios.post(this.$urls._('manage.farmer.getmanagefarmerdetail'), {
          FarmerId: FarmerId
        }).then(resp => {
          this.farmerInfo = resp
        })
      }
    }
  },
  created () {
    this.getFarmerInfo()
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 10px;
}
/deep/ .farmer__header{
  height: auto !important;
  padding-left: 0;
}
/deep/ .farmer_main {
  padding: 0 !important;
}
/deep/ .baseinfo {
  padding-left: 0;
  .el-form-item__content {
    margin-left: 0;
    padding-right: 20px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .addr {
    display: flex;
    .el-form-item {
      flex: 1;
    }
  }
}
.table_con {
  h5 {
    margin-bottom: 10px;
  }
}
</style>
