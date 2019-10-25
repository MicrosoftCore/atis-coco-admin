<template>
  <div class="video-mask" @click="close">
    <div class="video-mask__close" @click="close">✕</div>
    <video class="video" controls :src=src></video>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String
    }
  },
  watch: {
    src: {
      handler (newValue, oldValue) {
        console.log(newValue)
      },
      deep: true
    }
  },
  methods: {
    close () {
      this.$emit('close-video')
    }
  }
}
</script>

<style lang="scss" scoped>
.video-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  .video-mask__close {
    width: 120px;
    height: 120px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    text-align: left;
    padding-left: 30px;
    padding-top: 75px;
    box-sizing: border-box;
    color: #fff;
    float: right;
    position: fixed;
    right: 0;
    top: 0;
    margin-top: -60px;
    margin-right: -60px;
  }
  .video {
    vertical-align: middle;
  }
}
</style>
