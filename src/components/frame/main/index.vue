<template>
  <el-container class="layout-main" :class="theme">
    <el-header class="header">
      <div class="logo-group" :style="logoGroupStyle">
        <img v-if="collapse" src="@/assets/image/logo/logo_white.png" style="max-height:30px;">
        <img v-else src="@/assets/image/logo/logo_white_cn.png" style="max-height:35px;">
      </div>
      <div class="toggle-sidemenu-btn">
        <IconSvg :name="collapse ? 'menu-fold-right' : 'menu-fold-left'" @click.native="toggleAside"></IconSvg>
        <IconSvg name="锁屏"></IconSvg>
      </div>
      <HeaderRight/>
      <HeaderSearch/>
    </el-header>
    <el-container>
      <el-aside style="background: #404040" :style="asideStyle">
        <AsideMenu :collapse="collapse"></AsideMenu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  components: {
    AsideMenu: () => import('./components/AsideMenu'),
    HeaderMenu: () => import('./components/HeaderMenu'),
    HeaderRight: () => import('./components/HeaderRight'),
    HeaderSearch: () => import('./components/HeaderSearch')
  },
  data () {
    return {
      theme: 'default',
      collapse: false
    }
  },
  computed: {
    logoGroupStyle () {
      return {
        width: `${this.collapse ? '65' : '200'}px`
      }
    },
    asideStyle () {
      return {
        width: `${this.collapse ? '65' : '200'}px`
      }
    }
  },
  methods: {
    toggleAside () {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style lang="scss">
// 主题
@import '~@/assets/style/theme/default.scss';
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset006pxrgba(0, 0, 0, 0.3);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-shadow: inset006pxrgba(0, 0, 0, 0.5);
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(0, 0, 0, 0.2);
}
</style>

