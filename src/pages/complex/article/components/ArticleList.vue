<template>
  <div class="article-list">
    <el-table
      class="article-list__table"
      v-loading="loading"
      :data="articles"
    >
      <el-table-column>
        <template slot-scope="scope">
          <div class="article-list__warp">
            <div class="article-list__title">
              <h3
                @click="onPreview(scope)"
                v-html="onFormat(scope.row.Title)"
              ></h3>
            </div>
            <div class="article-list__tag">
              <el-tag
                type="info"
                size="small"
                v-for="(tag, index) in scope.row.Tags"
                :key="index"
              >{{ tag }}</el-tag>
              <el-tag
                size="small"
                v-if="scope.row.Source === 1"
              >管理员</el-tag>
              <el-tag
                type="warning"
                size="small"
                v-else-if="scope.row.Source === 2"
              >专家</el-tag>
            </div>
            <div class="article-list__content">
              <el-row>
                <el-col :span="19">
                  <span v-html="onFormat(scope.row.Content)"></span>
                </el-col>
                <el-col :span="5">
                  <el-button
                    size="small"
                    @click.native="onCancle(scope.row.Id)"
                    round
                    plain
                  >取消发布</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="article-list__issued">
              <img
                class="article-list__avatar"
                :src="avatars[scope.$index % 4]"
                alt
              >
              <span class="article-list__highlight">{{ scope.row.CreateBy }}</span>
              <span>发布于</span>
              <!-- <span class="article-list__highlight">https://chinacloudsites.cn</span> -->
              <span class="article-list__createdTime">{{ scope.row.CreateTime | moment('YYYY-MM-DD hh:mm') }}</span>
            </div>
            <div class="article-list__icons">
              <el-tooltip
                content="查看"
                placement="bottom-start"
              >
                <div>
                  <icon-svg name="查看"></icon-svg>
                  {{ scope.row.PViews }}
                </div>
              </el-tooltip>
              <el-tooltip
                content="喜欢"
                placement="bottom"
              >
                <div>
                  <icon-svg name="赞"></icon-svg>
                  {{ scope.row.LikesNum }}
                </div>
              </el-tooltip>
              <el-tooltip
                content="评论"
                placement="bottom-end"
              >
                <div>
                  <icon-svg name="评论"></icon-svg>
                  {{ scope.row.CommentNum }}
                </div>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      v-if="hasFilter"
      class="article-list__pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>-->
    <el-button
      class="article-list__loadmore"
      size="medium"
      :loading="loading"
      :disabled="!hasMore"
      @click.native="onLoadMore"
      plain
    >{{ hasMore ? '加载更多' : '已全部加载' }}</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    keywords: {
      default: ''
    }
  },

  data () {
    return {
      loading: true,
      currentPage: '1',
      pageSize: '4',
      hasMore: true,
      filter: {},
      avatars: [
        'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
        'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
        'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png'
      ],
      articles: []
      // Array(4)
      //   .fill()
      //   .map(_ => ({
      //     title: '吃芒果的最佳时期',
      //     avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      //     tag: ['泰国香芒', '黄金芒', '小香芒'],
      //     content:
      //       '蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      //     // '首先在素材库创建素材，支持手动录入和批量导入。创建类型包括纯文本消息、图文消息、图片类型、和视频类型。编辑界面同创建素材的界面。专家发文，只能通过终检来发文，发文时，从素材库中选择，发表成功后进入文章库。文章库用于管理 “全部”显示在小程序的文章，专家发文后，可以找到自己的文章并取消发布。后期专家发文可能需要审核流程，如包含不健康的信息，需要将文章取消发布，如专家拒绝取消发布，管理员有权限在文章库找到该文章，并取消发布。管理员用户通过《推送》模块的文章推送，也可发文，成功后同样进入文章库。状态是已发布的文章，不能进行编辑。文章列表内容区最多展示200个字，超出省略号隐藏，点击可查看文章预览。',
      //     author: '卡色',
      //     location: 'https://chinacloudsites.cn',
      //     createdTime: '2018-10-10 14:11',
      //     star: 159,
      //     like: 148,
      //     comment: 19
      //   }))
    }
  },

  computed: {
    ...mapState('common', {
      catalog: state => state.crops.catalog
    }),
    ...mapState('d2admin/user', ['info'])
  },

  methods: {
    onCancle (Id) {
      this.$confirm('此操作将取消发布, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post(this.$urls._('complex.article.canclepush'), {
              Id
            })
            .then(message => {
              if (message) {
                this.onReload()
                this.$notify({
                  title: '温馨提示',
                  message,
                  type: 'success'
                })
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    onFormat (content) {
      let ellipsis = 112 // 显示长度
      let offset = 10 // 偏移量
      let start = 0 // 起始位置
      let replaceReg = new RegExp(this.keywords, 'gi') // 替换规则

      let html2String = String(content).replace(/<[^>]+>/g, '')
      let html2SLength = html2String.length

      let keywordsIndex = html2String.indexOf(this.keywords)
      let sliceIndex =
        keywordsIndex > offset // 计算正偏移
          ? html2SLength - keywordsIndex > ellipsis - offset // 计算负偏移
            ? keywordsIndex - offset // 得到正偏移值
            : html2SLength - ellipsis // 得到负偏移值
          : start

      let html2Slice =
        html2SLength <= ellipsis
          ? html2String
          : html2String.substr(sliceIndex, ellipsis) + ' ...'

      let replaceString =
        '<span class="article-keywords__highlight">' + this.keywords + '</span>'
      let html2Highlight = this.keywords
        ? html2Slice.replace(replaceReg, replaceString)
        : html2Slice

      return html2Highlight || '&nbsp;'
    },
    onLoadMore () {
      if (this.hasMore) {
        this.currentPage = ++this.currentPage
        this.onRender()
      }
    },
    onPreview ({ row: { Id } }) {
      this.$router.push({
        name: 'complex-article-preview',
        query: {
          Id
        }
      })
    },
    onReload () {
      this.articles = []
      this.currentPage = '1'
      this.onRender()
    },
    onRender () {
      let data = {
        ArticleClass: '1',
        Type: '1',
        Number: this.currentPage,
        Size: this.pageSize,
        ...this.filter
      }

      let { ExpertId, UserType } = this.info

      if (UserType === 2) {
        data = {
          ...data,
          ExpertId
        }
      }

      this.loading = true
      this.$axios
        .post(this.$urls._('complex.article.getlist'), data)
        .then(result => {
          let { Content } = result
          Content.forEach(current => {
            try {
              current.Tags = current.OfPlantId.split(',').map(
                Id => this.catalog[Id].TypeName
              )
            } catch (e) {}
          })
          this.hasMore = Content.length >= this.pageSize
          this.articles = this.articles.concat(Content)
          this.loading = false
        })
    },
    onSearch (filter) {
      this.filter = filter
      this.onReload()
    }
  },

  created () {
    this.onRender()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/../element-variables.scss';
.article-list {
  .article-list__table {
    /deep/ .has-gutter {
      display: none;
    }
    /deep/ .article-keywords__highlight {
      color: #c00;
    }
    .article-list__title {
      cursor: pointer;
      &:hover {
        color: $--color-primary;
      }
      h3 {
        margin: 10px 0;
      }
    }
    .article-list__content {
      padding: 10px 0;
      .el-button {
        float: right;
      }
    }
    .article-list__issued {
      display: flex;
      align-items: center;
      .article-list__avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 5px;
      }
      .article-list__highlight {
        color: $--color-primary;
        margin: 0 5px;
      }
      .article-list__createdTime {
        color: #bfbfbf;
        margin-left: 20px;
      }
    }
    .article-list__icons {
      display: flex;
      align-items: center;
      padding: 16px 0 4px;
      div {
        display: flex;
        align-items: center;
        padding: 0 10px;
        &:first-child {
          padding-left: 0;
        }
        &:not(:last-child) {
          border-right: 1px solid #e6e6e6;
        }
        svg {
          width: 18px;
          height: 18px;
          margin: -1px 10px 0 0;
        }
      }
    }
  }
  .article-list__pagination {
    padding-top: 20px;
  }
  .article-list__loadmore {
    min-width: 200px;
    margin-top: 20px;
    margin-left: calc(50% - 100px);
    &:hover {
      border: 1px dashed;
    }
    &:not(:hover) {
      border: 1px dashed #dcdfe6;
    }
  }
}
</style>
