<template>
  <div>
    <div class="top-info dd-clearfix dd-mb">
      <el-breadcrumb separator="/" class="dd-fl">
        <el-breadcrumb-item :to="{ path: '/manage/farmer/index' }">农户列表</el-breadcrumb-item>
        <el-breadcrumb-item>购药详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button size="small" class="dd-fr" @click="$router.go(-1)">返回</el-button>
    </div>
    <el-card class="baseinfo">
      <div slot="header" class="clearfix">
        <span>店铺: {{ ShopSalesOrdersModel.ShopName || '' }}</span>
      </div>
      <el-form label-width="100px">
        <el-form-item label="单号:">
          <span>{{ ShopSalesOrdersModel.No || '' }}</span>
        </el-form-item>
        <div class="addr">
          <el-form-item label="技术员:">
            <span>{{ ShopSalesOrdersModel.CreateMan || '' }}</span>
          </el-form-item>
          <el-form-item label="经办人:">
            <span>{{ ShopSalesOrdersModel.UpdateMan || '' }}</span>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="baseinfo">
      <div slot="header" class="clearfix">
        <span>销售列表</span>
      </div>
      <el-form label-width="100px">
        <div class="addr">
          <el-form-item label="日期:">
            <span>{{ ShopSalesOrdersModel.CreatedFormatTime || '' }}</span>
          </el-form-item>
          <el-form-item label="单类型:">
            <span>{{ ShopSalesOrdersModel.Ordertypechange || '' }}</span>
          </el-form-item>
        </div>
        <div class="addr">
          <el-form-item label="本次使用积分:">
            <span>{{ ShopSalesOrdersModel.Integral || 0 }}分</span>
          </el-form-item>
          <el-form-item label="结账方式:">
            <span>{{ ShopSalesOrdersModel.PayWay || '' }}</span>
          </el-form-item>
        </div>
        <div class="addr">
          <el-form-item label="销售金额:">
            <span>{{ ShopSalesOrdersModel.TotalMoney || 0 }}元</span>
          </el-form-item>
          <el-form-item label="赊账:">
            <span>{{ ShopSalesOrdersModel.Credit || 0 }}元</span>
          </el-form-item>
        </div>
        <div class="addr">
          <el-form-item label="实付金额:">
            <span>{{ ShopSalesOrdersModel.RealCash || 0 }}元</span>
          </el-form-item>
          <el-form-item label="优惠金额:">
            <span>{{ ShopSalesOrdersModel.Privilege || 0 }}元</span>
          </el-form-item>
        </div>
        <el-form-item label="找零金额:">
          <span>{{ ShopSalesOrdersModel.Change || 0 }}元</span>
        </el-form-item>
      </el-form>
      <el-table
      :data="[ShopSalesOrdersModel]"
      class="paytable">
        <el-table-column
          prop="Cash"
          label="现金">
        </el-table-column>
        <el-table-column
          prop="Pos"
          label="刷卡">
        </el-table-column>
        <el-table-column
          prop="WxPay"
          label="微信">
        </el-table-column>
        <el-table-column
          prop="AliPay"
          label="支付宝">
        </el-table-column>
        <el-table-column
          prop="VirtualAccount"
          :formatter="fmtValue"
          label="田洋创客电子券">
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="baseinfo">
      <div slot="header" class="clearfix">
        <span>购物清单</span>
      </div>
      <el-table
      :data="SalesOrderDetailsModel"
      class="paytable">
        <el-table-column
          prop="Name"
          :formatter="fmtNull"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="Specificaton"
          :formatter="fmtNull"
          label="规格">
        </el-table-column>
        <el-table-column
          prop="UnitPrice"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="QTY"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="TotalPrice"
          label="总价">
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="baseinfo" v-if="usageList && usageList.length>0">
      <div slot="header" class="clearfix">
        <span>使用方法</span>
      </div>
      <div class='shop-table usage' v-for="(item, idx) in usageList" :key="idx">
        <div class='thead'>
          {{idx+1}}、{{item.Name}}
        </div>
        <div class='tr title'>     
            <span class='grid'>用水量</span>
            <span class='grid'>使用方式</span>
            <span class='grid'>安全间隔</span>
        </div>
        <div class='tr'>     
            <div class='grid'>     
              {{item.UseWater}} {{item.WeightUnit}} / {{item.UseWaterUnit}}
            </div>
            <div class='grid'>
              {{item.Usage}}
            </div>
            <div class='grid'>
              {{item.Interval}} 天
            </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      SalesOrderDetailsModel: [],
      ShopSalesOrdersModel: {},
      usageList: []
    }
  },
  methods: {
    getOrderDetail () {
      let {
        query: {
          OrderId,
          OpenId
        }
      } = this.$route
      if (OrderId && OpenId) {
        this.$axios.post(this.$urls._('manage.farmer.shopsalesorderdetails'), {
          OrderId,
          OpenId
        }).then(resp => {
          let usageList = resp.SalesOrderDetailsModel.filter(function (item) {
            return item.UseWater
          })
          this.SalesOrderDetailsModel = resp.SalesOrderDetailsModel
          this.ShopSalesOrdersModel = resp.ShopSalesOrdersModel
          this.usageList = usageList
        })
      }
    },
    fmtValue (row, column) {
      const val = row[column.property]
      return val || 0
    },
    fmtNull (row, column) {
      const val = row[column.property]
      return val || '-'
    }
  },
  created () {
    this.getOrderDetail()
  }
}
</script>
<style lang="scss" scoped>
/deep/ .farmer_main {
  padding: 0 !important;
}
/deep/ .el-table th {
  background-color: rgb(247, 247, 247);
}
/deep/ .baseinfo {
  padding-left: 0;
  .el-form-item__content {
    margin-left: 0
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
/deep/ .paytable {
  width: 60%;
  .cell {
    text-align: center
  }
}
.shop-table {
  border: 1px solid #f1f1f1;
  width: 60%;
  font-size: 13px;
  .thead {
    background-color: #f5f5f5;
    display: flex;
    padding: 12px 10px;
    font-size: 15px;
  }
  .tr {
    display: flex;
    font-size: 15px;
    margin-top: 0;
    padding: 12px 0;
    &.title {
      color: #888;
      border-bottom: 1px solid #f1f1f1;
      font-weight: normal;
    }
  }
  .grid {
    flex: 1;
    text-align: center;
  }
  .grid2 {
    flex: 2;
    text-align: center;
  }
}
</style>
