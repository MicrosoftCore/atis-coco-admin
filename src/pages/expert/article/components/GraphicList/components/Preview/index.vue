<template>
  <div>
    <Preview/>
  </div>
</template>

<script>
export default {
  components: {
    Preview: () => import('@/pages/complex/repository/components/GraphicList/components/Preview')
  }
}
</script>

<style lang="scss" scoped>
</style>
