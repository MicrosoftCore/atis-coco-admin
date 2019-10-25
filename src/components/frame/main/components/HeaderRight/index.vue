<template>
  <div class="btn-group">
    <HeaderNotify></HeaderNotify>
    <HeaderTask></HeaderTask>
    <HeaderIcon></HeaderIcon>
    <HeaderSetting></HeaderSetting>
    <UserDropdown></UserDropdown>
  </div>
</template>

<script>
export default {
  components: {
    HeaderNotify: () => import('./components/HeaderNotify.vue'),
    HeaderTask: () => import('./components/HeaderTask.vue'),
    HeaderIcon: () => import('./components/HeaderIcon.vue'),
    HeaderSetting: () => import('./components/HeaderSetting.vue'),
    UserDropdown: () => import('./components/UserDropdown.vue')
  }
}
</script>

<style lang="scss">
</style>
