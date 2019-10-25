<template>
  <div class="article-push">
    <h2>新建群发</h2>
    <p>为保障用户体验，田洋创客管理平台严禁恶意营销，严禁发布色情低俗、暴力血腥、政治谣言等各类违反法律法规及相关政策规定的信息。一旦发现，我们将严厉打击和处理。</p>
    <div class="article-push__main">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane name="GraphicMsg">
          <span slot="label">
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>图文消息
          </span>
          <GraphicMsg ref="GraphicMsg" @onChange="onGraphic"/>
        </el-tab-pane>
        <!-- <el-tab-pane>
          <span slot="label">
            <i class="fa fa-text-height" aria-hidden="true"></i>文字
          </span>
          <TextMsg></TextMsg>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="fa fa-picture-o" aria-hidden="true"></i>图片
          </span>
          <PictureMsg></PictureMsg>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="fa fa-volume-up" aria-hidden="true"></i>语音
          </span>
          <VoiceMsg></VoiceMsg>
        </el-tab-pane> -->
        <el-tab-pane name="VideoMsg">
          <span slot="label">
            <i class="fa fa-film" aria-hidden="true"></i>视频
          </span>
          <VideoMsg ref="VideoMsg" @onChange="onVideo"></VideoMsg>
        </el-tab-pane>
      </el-tabs>
      <submit :options="options" @onSuccess="onSuccess"/>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    GraphicMsg: () => import('./components/GraphicMsg'),
    TextMsg: () => import('./components/TextMsg'),
    PictureMsg: () => import('./components/PictureMsg'),
    VoiceMsg: () => import('./components/VoiceMsg'),
    VideoMsg: () => import('./components/VideoMsg'),
    Submit: () => import('./components/Submit')
  },

  data () {
    return {
      activeName: 'GraphicMsg',
      GraphicMsg: [],
      VideoMsg: []
    }
  },

  computed: {
    options () {
      return [
        ...this.GraphicMsg,
        ...this.VideoMsg
      ]
    }
  },

  methods: {
    onGraphic (value) {
      this.GraphicMsg = value
    },
    onVideo (value) {
      this.VideoMsg = value
    },
    onSuccess () {
      this.activeName = 'GraphicMsg'
      this.$refs.GraphicMsg.chosen = []
      this.$refs.VideoMsg.chosen = []
    }
  }
}
</script>

<style lang="scss" scoped>
.article-push {
  padding: 0 20px;
  h2 {
    font-size: 26px;
    font-weight: 400;
    line-height: 1;
    margin: 0 0 20px;
  }
  p {
    font-size: 14px;
    color: #9a9a9a;
    margin-bottom: 40px;
  }
  .article-push__main {
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
    .el-tabs {
      box-shadow: none;
      border: 1px solid #e7e7eb;
      & /deep/ .el-tabs__header {
        border-bottom: none;
        background: #f6f8f9;
        .el-tabs__item {
          height: 60px;
          line-height: 60px;
          i {
            margin-right: 5px;
          }
        }
        .is-active {
          border: 1px solid transparent;
          background-color: unset;
        }
      }
      & /deep/ .el-tabs__content {
        padding: 0;
      }
    }
  }
}
</style>
