<template>
  <div class="public-push__style">
    <template v-if="chosen.length">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item, index) in chosen" :key="index">
          <div class="choose-item">
            <video alt="" width="292" height="164" :src="item.Content" v-if="item.Content"></video>
            <div>{{ item.Title }}</div>
            <span @click="onDelete(item)">删除</span>
          </div>
        </el-col>
      </el-row>
    </template>
    <template v-else>
      <section>
        <div @click="$refs.VideoChoose.$emit('onOpen')">
          <i class="el-icon-document"></i>
          <span>从素材库选择</span>
        </div>
      </section>
      <section>
        <div @click="onCreate">
          <i class="fa fa-camera-retro" aria-hidden="true"></i>
          <span>新建视频</span>
        </div>
      </section>
    </template>
    <VideoChoose ref="VideoChoose" @onConfirm="onConfirm"/>
  </div>
</template>

<script>
export default {
  components: {
    VideoChoose: () => import('./VideoChoose')
  },

  data () {
    return {
      chosen: []
    }
  },

  watch: {
    chosen (newValue) {
      this.$emit('onChange', newValue)
    }
  },

  methods: {
    onConfirm (items) {
      this.chosen = items
    },
    onCreate () {
      let { href } = this.$router.resolve({
        name: 'complex-repository-video-add'
      })
      window.open(href, '_blank')
    },
    onDelete (item) {
      this.chosen = this.chosen.filter(i => i !== item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../public.scss';
.choose-item {
  span {
    color: #0492c4;
  }
}
</style>
