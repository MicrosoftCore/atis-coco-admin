<template>
  <div class="azuremp">
    <video
      class="azuremp__thumbnail"
      preload="metadata"
      :ref="ampId"
      :src="src"
      @click="onInitialize"
    ></video>
    <span class="azuremp__duration" v-if="ampOptions.duration">
      <i class="el-icon-caret-right"></i>
      <span>{{ duration }}</span>
    </span>
    <div class="azuremp__wrapper" v-if="popover">
      <div class="azuremp__popper" @click="onDispose"></div>
      <div class="azuremp__main">
        <video
          :id="ampId"
          class="azuremediaplayer amp-flush-skin amp-big-play-centered"
          tabindex="0"
          style="height: 100%;"
        >
          <p
            class="amp-no-js"
          >To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video</p>
        </video>
        <i class="el-icon-close" @click="onDispose"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
      default: ''
    },
    options: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      popover: false,
      duration: '00:00',
      defaultOptions: {
        autoplay: false,
        controls: true,
        duration: false,
        // fluid: true,
        width: '1200',
        height: '710',
        heuristicProfile: 'HighQuality',
        playbackSpeed: {
          enabled: true
        },
        logo: {
          enabled: false
        },
        nativeControlsForTouch: false
      }
    }
  },

  computed: {
    ampId () {
      return 'azuremediaplayer' + new Date().getTime()
    },
    ampOptions () {
      return Object.assign({}, this.defaultOptions, this.options)
    }
  },

  methods: {
    onInitialize () {
      let _vm = this
      this.popover = true
      this.$nextTick(() => {
        let amp = window.amp
        this.azuremediaplayer = amp(
          this.ampId,
          this.ampOptions,
          function () {
            this.addEventListener(amp.eventName.disposing, () => {
              _vm.popover = false
            })
          }
        )
        this.azuremediaplayer.src([
          {
            src: this.src,
            type: 'video/mp4'
          }
        ])
      })
    },
    onDispose () {
      this.azuremediaplayer.dispose()
    },
    onRender () {
      let _vm = this
      let video = this.$refs[this.ampId]
      video.addEventListener(
        'durationchange',
        function () {
          let duration = _vm.onS2min(this.duration)
          duration && (_vm.duration = duration)
          _vm.$emit('duration-change', duration)
        }
      )
    },
    onS2min (s) {
      // 计算分钟
      // 算法：将秒数除以60，然后下舍入，既得到分钟数
      let h
      s = parseInt(s)
      h = Math.floor(s / 60)
      // 计算秒
      // 算法：取得秒%60的余数，既得到秒数
      s = s % 60
      // 将变量转换为字符串
      h += ''
      s += ''
      // 如果只有一位数，前面增加一个0
      h = h.length === 1 ? '0' + h : h
      s = s.length === 1 ? '0' + s : s
      return h + ':' + s
    }
  },

  mounted () {
    this.onRender()
  }
}
</script>

<style lang="scss" scoped>
.azuremp {
  position: relative;
}
.azuremp__thumbnail {
  width: 160px;
  height: 90px;
  min-width: 160px;
  min-height: 90px;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.azuremp__duration {
  height: 20px;
  padding: 0 5px 0 3px;
  border-radius: 50px;
  position: absolute;
  z-index: 10;
  left: 10px;
  bottom: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  text-align: center;
  font-size: 12px;
  color: #ffffff;
}
.azuremp__wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .azuremp__popper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .azuremp__main {
    width: 100%;
    max-width: 1280px;
    height: 100%;
    max-height: 790px;
    padding: 40px;
    display: flex;
    justify-content: center;
    position: relative;
    .el-icon-close {
      cursor: pointer;
      position: absolute;
      top: 5px;
      right: 5px;
      -webkit-text-stroke: 0.5px rgba(0, 0, 0, 0.5);
      font-weight: 300;
      font-size: 30px;
      color: #ffffff;
    }
  }
}
</style>
