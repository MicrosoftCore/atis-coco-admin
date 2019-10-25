<template>
  <div class="graphic-add">
    <section class="graphic-add__main">
      <div class="graphic-add__header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/complex/repository' }">知识库</el-breadcrumb-item>
          <el-breadcrumb-item>新建图文消息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb>
          <el-breadcrumb-item>
            图文历史版本
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 富文本编辑区 -->
      <div class="graphic-add__panel">
        <SectionLeft :options="data"/>
        <!-- <SectionRight/> -->
        <SectionMain ref="main" @onChange="onChange" @onSubmit="onSubmit"/>
      </div>
    </section>
    <!-- 底部保存按钮 -->
    <section class="graphic-add__footer">
      <div class="graphic-add__bar">
        <!-- <el-button type="text" icon="el-icon-circle-plus">收起正文</el-button> -->
        <el-button type="text"></el-button>
        <el-button
          size="small"
          type="primary"
          :loading="submitting"
          :disabled="submitting"
          @click="$refs.main.$emit('onSave')"
        >保存</el-button>
        <!-- <el-button size="small" @click="onPreview">预览</el-button>
        <el-button size="small">保存并群发</el-button>-->
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SectionMain from './components/SectionMain'
export default {
  components: {
    SectionLeft: () => import('./components/SectionLeft'),
    SectionMain,
    SectionRight: () => import('./components/SectionRight')
  },

  data () {
    return {
      submitting: false,
      data: undefined,
      form: undefined
    }
  },

  computed: {
    ...mapState('d2admin/user', ['info'])
  },

  methods: {
    onChange (data) {
      this.data = data
    },
    onRender () {
      let Id = this.$route.query.Id
      if (Id) {
        this.$axios
          .get(this.$urls._('complex.article.getdetail'), {
            params: {
              Id
            }
          })
          .then(result => {
            this.$refs.main.$emit('onPatch', result)
          })
      }
    },
    onSubmit () {
      let { CoverImageUrl } = this.data
      let { ExpertId } = this.info
      let {
        query: { Id, reprint }
      } = this.$route

      let data = Object.assign({}, this.data, {
        CoverImageUrl: CoverImageUrl.join(','),
        Source: '2',
        Type: '1'
      })

      let addUrl = this.$urls._('complex.article.add')
      let updateUrl = this.$urls._('complex.article.update')
      let addMeg = '成功添加图文消息'
      let updateMsg = '成功更新图文消息'
      let addData = Object.assign({}, data, { CreateBy: ExpertId })
      let updateData = Object.assign({}, data, { UpdateBy: ExpertId })

      let url = Id ? (reprint ? addUrl : updateUrl) : addUrl
      let message = Id ? (reprint ? addMeg : updateMsg) : addMeg
      data = Id ? (reprint ? addData : updateData) : addData

      if (!this.submitting) {
        this.submitting = true
        this.$axios.post(url, data).then(result => {
          if (result) {
            this.submitting = false
            this.$notify({
              title: '温馨提示',
              message,
              type: 'success'
            })
            this.$router.push({
              name: 'expert-article-index'
            })
          }
        })
      }
    }
  },

  created () {
    this.onRender()
  },

  mounted () {
    document.getElementsByClassName('el-main')[0].style.padding = 0
  },

  beforeDestroy () {
    document.getElementsByClassName('el-main')[0].style.padding = '20px'
  }
}
</script>

<style lang="scss" scoped>
@import '~@/../element-variables.scss';

.graphic-add {
  padding-top: 20px;
  .graphic-add__main {
    margin: 0 auto;
    padding: 0 20px;
    max-width: 990px;
    min-width: 990px;
    .graphic-add__header {
      padding: 20px 0;
      margin-bottom: 20px;
      .el-breadcrumb {
        display: inline-block;
        &:last-child {
          float: right;
        }
      }
    }
    .graphic-add__panel {
      width: 100%;
      background-color: #ffffff;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
      position: relative;
    }
  }

  .graphic-add__footer {
    width: 100%;
    height: 96px;
    position: sticky;
    z-index: 5;
    bottom: 0;
    left: 0;
    background-color: #fff;
    border-top: 1px solid #d9dadc;
    font-size: 14px;
    display: flex;
    align-items: center;
    .graphic-add__bar {
      width: 100%;
      padding-left: calc(50% - 365px);
      .el-button {
        padding: 7px 37px;
        font-size: 14px;
        &:first-child {
          padding: 0 210px 0 250px;
          color: #606266;
          /deep/ i {
            font-size: 17px;
            color: #d8d8d8;
            position: relative;
            top: 1px;
          }
        }
        &:last-child {
          padding: 7px 21px;
        }
      }
    }
  }

  /deep/ .el-breadcrumb__inner {
    color: #9a9a9a !important;
    font-weight: unset;
    &.is-link {
      color: $--color-primary !important;
    }
  }
}
</style>
