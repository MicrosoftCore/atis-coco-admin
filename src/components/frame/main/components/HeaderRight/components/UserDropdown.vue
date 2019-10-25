<template>
  <el-dropdown size="medium">
    <div class="user-dropwodn">
      <IconSvg name="头像"></IconSvg>
      <span class="el-dropdown-link">{{ info.UserName }}</span>
    </div>
    <el-dropdown-menu slot="dropdown" class="user-dropwodn__menu">
      <el-dropdown-item disabled><IconSvg class="icon" name="个人中心"></IconSvg>个人中心</el-dropdown-item>
      <el-dropdown-item disabled><IconSvg class="icon" name="设置"></IconSvg>设置</el-dropdown-item>
      <el-dropdown-item divided @click.native="logOff"><IconSvg class="icon" name="退出"></IconSvg>退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-dropwodn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-left: 8px;
  color: #fff;
  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
  
}
.user-dropwodn__menu {
  width: 160px;
  svg {
    width: 15px;
    height: 15px;
    margin-right: 10px;
    position: relative;
    top: 2px;
  }
}
</style>
