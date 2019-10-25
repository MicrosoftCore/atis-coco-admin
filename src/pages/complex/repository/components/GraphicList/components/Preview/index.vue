<template>
  <el-container class="graphic-preview">
    <el-header class="graphic-preview__header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>综合</el-breadcrumb-item>
        <el-breadcrumb-item>知识库</el-breadcrumb-item>
      </el-breadcrumb>
      <section class="graphic-preview__title">文章预览</section>
    </el-header>
    <el-main class="graphic-preview__main">
      <section class="fr-view">
        <el-alert title="此为临时链接，仅用于预览，将在短期内失效。" type="warning"></el-alert>
        <el-card v-loading="loading">
          <section class="graphic-preview__article">
            <h2 class="graphic-preview__title">{{ preview.Title }}</h2>
            <div class="graphic-preview__meta">
              <span v-if="preview.Summary">{{ preview.Summary }}</span>
              <a href="javacript:void(0);">{{ preview.UpdateBy }}</a>
              <span>{{ preview.UpdateTime | moment('YYYY-MM-DD') }}</span>
            </div>
            <div
              class="graphic-preview__content"
              v-if="preview.Type == '1'"
              v-html="preview.Content"
            ></div>
            <div class="graphic-preview__content" v-else>
              <video :src="preview.Content" controls="controls"></video>
            </div>
          </section>
          <el-row class="graphic-preview__status">
            <el-col :span="12">
              <h5>标签:</h5>
              <span v-for="(Id, index) in preview.OfPlantId" :key="index">
                <el-tag
                  type="success"
                  size="medium"
                  v-if="preview.OfPlantId && catalog[Id]"
                  v-text="catalog[Id].TypeName"
                ></el-tag>
                <!-- <el-tag type="info" size="medium">香蕉</el-tag> -->
              </span>
            </el-col>
            <el-col :span="12">
              <h5>状态:</h5>
              <div>
                <i class="fa fa-commenting-o" aria-hidden="true"></i>
                <span>{{ preview.CommentNum }} 评论</span>
              </div>
              <div>
                <i class="fa fa-eye" aria-hidden="true"></i>
                <span>{{ preview.PViews }} 阅读</span>
              </div>
            </el-col>
          </el-row>
          <!-- <section class="graphic-preview__comment">
            <h2>评论:</h2>
            <el-table :data="tableData" border="">
              <el-table-column>
                <template slot-scope="scope">
                  <section>
                    <img :src="scope.row.avatar" alt="">
                    <div>
                      <a href="javacript:void(0);">
                        {{ scope.row.username }}
                        <span>
                          <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                          <span>16</span>
                        </span>
                      </a>
                      <span>{{ scope.row.createTime }}</span>
                    </div>
                  </section>
                  <p>{{ scope.row.content }}</p>
                </template>
              </el-table-column>
            </el-table>
          </section>-->
        </el-card>
      </section>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'

require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('froala-editor/css/froala_style.min.css')
require('froala-editor/css/themes/gray.min.css')
export default {
  data () {
    return {
      loading: true,
      preview: {},
      tableData: Array(5)
        .fill()
        .map((_, i) => ({
          avatar: 'http://webapplayers.com/inspinia_admin-v2.8/img/a1.jpg',
          username: '王阳阳',
          createTime: '4:21pm 2018-03-05',
          content:
            "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still default model text."
        }))
    }
  },

  computed: {
    ...mapState('common', {
      catalog: state => state.crops.catalog
    })
  },

  methods: {
    onRender () {
      let {
        query: { Id }
      } = this.$route
      this.$axios
        .get(this.$urls._('complex.article.getdetail'), {
          params: {
            Id
          }
        })
        .then(result => {
          try {
            result.OfPlantId = result.OfPlantId.split(',')
          } catch (e) {}
          this.preview = result
          this.loading = false
        })
    }
  },

  created () {
    this.onRender()
  }
}
</script>

<style lang="scss" scoped>
.graphic-preview {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .graphic-preview__header {
    height: unset !important;
    background: #fff;
    border-bottom: 1px solid #e9e9e9;
    padding-top: 20px;
    .graphic-preview__title {
      font-size: 20px;
      margin: 20px 0;
    }
  }
  .graphic-preview__main {
    height: unset !important;
    display: flex;
    justify-content: center;
    .el-alert {
      margin-bottom: 32px;
    }
    .el-card {
      width: 717px;
      .graphic-preview__article {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        .graphic-preview__title {
          font-size: 22px;
          font-weight: 400;
          color: #333;
          letter-spacing: 0.034em;
        }
        .graphic-preview__meta {
          font-size: 15px;
          color: rgba(0, 0, 0, 0.3);
          span {
            margin: 0 10px;
            &:first-child {
              margin-left: 0;
            }
          }
          a {
            color: #576b95;
            text-decoration: none;
          }
        }
        .graphic-preview__content {
          word-wrap: break-word;
          letter-spacing: 0.034em;
          text-align: justify;
          padding-bottom: 16px;
          overflow: hidden;
          video {
            width: 100%;
            margin-top: 20px;
          }
        }
      }
      .graphic-preview__status {
        font-size: 14px;
        color: #676a6c;
        .el-tag {
          height: 26px;
          line-height: 25px;
        }
        .el-col {
          &:last-child {
            text-align: right;
            div {
              margin-bottom: 5px;
            }
          }
        }
        h5 {
          margin: 25px 0 8px;
          font-weight: 600;
        }
        i {
          margin-right: 5px;
        }
      }
      .graphic-preview__comment {
        h2 {
          font-size: 24px;
          font-weight: 100;
        }
        .el-table {
          /deep/ .el-table__header-wrapper {
            display: none;
          }
          section {
            display: flex;
            align-items: center;
            div {
              width: 100%;
              a {
                color: #337ab7;
                display: block;
                text-decoration: none;
                span {
                  float: right;
                  i {
                    margin-right: 5px;
                  }
                }
              }
              span {
                color: #888888;
                font-size: 14px;
              }
            }
            img {
              width: 40px;
              height: 40px;
              margin-right: 10px;
            }
          }
          p {
            color: #676a6c;
            font-size: 14px;
            line-height: 18px;
          }
        }
      }
    }
  }
  .el-card {
    box-shadow: none;
    &:hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
        0 2px 4px 0 rgba(232, 237, 250, 0.5);
    }
  }
}
</style>
