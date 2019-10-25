<template>
  <div>
    <el-dropdown trigger="click" size="medium">
      <i class="el-icon-setting btn-text"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <strong>切换主题</strong>
          <div class="theme-icons" v-for="(brightness, index) in themes" :key="index">
            <span class="theme-thumbnail"
              v-for="(theme, index) in brightness"
              :key="index"
              :style="{ background: theme.bg }">
              <span class="nav" :style="{ background: theme.nav }"></span>
              <span class="con" :style="{ background: theme.con }"></span>
            </span>
          </div>
        </el-dropdown-item>
        <!-- <el-dropdown-item><ThemePicker></ThemePicker></el-dropdown-item> -->
        <el-dropdown-item><FullScreen><IconSvg name="全屏"></IconSvg></FullScreen></el-dropdown-item>
        <el-dropdown-item><IconSvg name="清理"></IconSvg> 清理本地缓存</el-dropdown-item>
        <el-dropdown-item><IconSvg name="语言"></IconSvg> 语言</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  components: {
    ThemePicker: () => import('./ThemePicker.vue'),
    FullScreen: () => import('./FullScreen.vue')
  },
  data () {
    return {
      themes: [
        [
          { l: 'A', bg: '#108ee9', nav: '#fff', con: '#f5f7fa' },
          { l: 'B', bg: '#00a2ae', nav: '#fff', con: '#f5f7fa' },
          { l: 'C', bg: '#00a854', nav: '#fff', con: '#f5f7fa' },
          { l: 'D', bg: '#f04134', nav: '#fff', con: '#f5f7fa' },
          { l: 'E', bg: '#373d41', nav: '#fff', con: '#f5f7fa' }
        ],
        [
          { l: 'F', bg: '#108ee9', nav: '#404040', con: '#f5f7fa' },
          { l: 'G', bg: '#00a2ae', nav: '#404040', con: '#f5f7fa' },
          { l: 'H', bg: '#00a854', nav: '#404040', con: '#f5f7fa' },
          { l: 'I', bg: '#f04134', nav: '#404040', con: '#f5f7fa' },
          { l: 'J', bg: '#373d41', nav: '#404040', con: '#f5f7fa' }
        ]
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-icons {
  height: 35px;
  margin-bottom: 8px;
  .theme-thumbnail {
    width: 30px;
    height: 30px;
    display: inline-block;
    margin: 3px;
    margin-bottom: 0;
    border-radius: 100px;
    overflow: hidden;
    position: relative;
    span {
      width: 50%;
      height: 50%;
      display: inline-block;
      position: absolute;
      bottom: 0;
    }
    .nav {
      left: 0;
    }
    .con {
      right: 0;
    }
  }
}
.el-dropdown-menu__item {
  & /deep/ svg {
    width: 13px;
    height: 13px;
    top: 1px;
    position: relative;
    margin-right: 5px;
  }
}
</style>
