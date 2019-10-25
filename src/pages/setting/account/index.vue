<template>
  <div class="setting-account">
    <h2>账户设置</h2>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="账号详情" name="Account">
        <Account></Account>
      </el-tab-pane>
      <el-tab-pane label="功能设置" name="Features">功能设置</el-tab-pane>
      <el-tab-pane label="授权管理" name="Authorization">授权管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {
    Account: () => import('./components/Account')
  },

  data () {
    return {
      activeName: 'Account'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-account {
  padding: 0 20px;
  h2 {
    font-size: 26px;
    font-weight: 400;
    line-height: 1;
    margin: 0 0 20px;
  }
  /deep/ .el-tabs__item {
    font-size: 16px;
  }
  /deep/ .el-tabs__header {
    margin-bottom: 40px;
  }
  /deep/ .el-tabs__content {
    overflow: unset;
  }
}
</style>
