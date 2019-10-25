<template>
  <div>
    <el-dropdown trigger="click" size="medium">
      <i class="el-icon-menu btn-text"></i>
      <el-dropdown-menu slot="dropdown">
        <el-row style="width: 448px;">
          <el-col :span="6" v-for="(icon, index) in icons" :key="index">
            <el-dropdown-item>
              <div class="icon-box">
                <div class="icon-flex__box">
                  <div class="icon-circel__box" :style="{ background: icon.bg }">
                    <i :class="'el-icon-' + icon.ico"></i>
                  </div>
                  <span>{{ icon.label }}</span>
                </div>
              </div>
            </el-dropdown-item>
          </el-col>
        </el-row>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      icons: [
        { bg: '#f04134', label: '日历', ico: 'date' },
        { bg: '#20c997', label: '文件', ico: 'document' },
        { bg: '#00a854', label: '云端', ico: 'upload' },
        { bg: '#f5317f', label: '星级', ico: 'star-off' },
        { bg: '#7265e6', label: '团队', ico: 'message' },
        { bg: '#ffbf00', label: '二维码', ico: 'view' },
        { bg: '#00a2ae', label: '支付', ico: 'mobile-phone' },
        { bg: '#bfbfbf', label: '打印', ico: 'printer' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-col {
  padding: 0 6px;
  box-sizing: border-box;
  .icon-box {
    height: 118px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-flex__box {
      text-align: center;
      .icon-circel__box {
        width: 52px;
        height: 52px;
        margin: 0 auto;
        margin-bottom: 5px;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          font-size: 20px;
          color: #fff;
        }
      }
    }
  }
}
.el-dropdown-menu__item {
  border-radius: 4px;
}
</style>
