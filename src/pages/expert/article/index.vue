<template>
  <div class="article-list">
    <h2>我的文章</h2>
    <el-tabs v-model="activeName">
      <el-tab-pane label="图文消息" name="GraphicList" lazy>
        <GraphicList/>
      </el-tab-pane>
      <!-- <el-tab-pane label="图片" name="Picture" lazy>图片</el-tab-pane>
      <el-tab-pane label="语音" name="Voice" lazy>语音</el-tab-pane> -->
      <el-tab-pane label="视频" name="VideoList" lazy>
        <VideoList/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {
    GraphicList: () => import('./components/GraphicList'),
    PictureList: () => import('./components/PictureList'),
    VoiceList: () => import('./components/VoiceList'),
    VideoList: () => import('./components/VideoList')
  },

  data () {
    return {
      activeName: 'GraphicList'
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list {
  padding: 0 20px;
  h2 {
    font-size: 26px;
    font-weight: 400;
    line-height: 1;
    margin: 0 0 20px;
  }
  & /deep/ .el-tabs__item {
    font-size: 16px;
  }
  & /deep/ .el-tabs__content {
    overflow: unset;
  }
}
</style>
