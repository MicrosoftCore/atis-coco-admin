<template>
  <div @click="toggleFullScreen">
    <slot></slot>
    <span>{{ isFullScreen ? '退出全屏' : '全屏' }}</span>
    <!-- <el-tooltip
      class="item"
      effect="dark"
      :content="isFullScreen ? '退出全屏' : '全屏'"
      placement="bottom">
      <el-button class="dd-mr btn-text" type="text" @click="toggleFullScreen">
        <Icon v-if="isFullScreen" name="compress"></Icon>
        <Icon v-else name="arrows-alt"></Icon>
      </el-button>
    </el-tooltip> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/fullscreen', [
      'isFullScreen'
    ])
  },
  methods: {
    ...mapMutations('d2admin/fullscreen', [
      'toggleFullScreen'
    ])
  }
}
</script>
