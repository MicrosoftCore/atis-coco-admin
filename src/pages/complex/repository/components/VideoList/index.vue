<template>
  <div class="video-list">
    <div class="video-list__header">
      <h3>视频 (共{{ total }}条)</h3>
      <i class="el-icon-caret-bottom"></i>
      <el-form class="video-list__form" ref="searchForm" size="medium" inline>
        <el-form-item v-if="info.UserType === 1">
          <router-link :to="{ name: 'complex-repository-video-add' }">
            <el-button type="primary">添加</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <div class="video-list__wrapper">
      <el-table :data="videos" v-loading="loading">
        <el-table-column label="名称" min-width="250">
          <template slot-scope="scope">
            <div class="video-list__colmun-title">
              <AzureMp :src="scope.row.Content" :options="options"></AzureMp>
              <span>{{ scope.row.Title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.Content ? '已通过' : '转码中' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">
            <span style="color: #9a9a9a;">{{ scope.row.UpdateTime | moment('MMMDo')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70" v-if="info.UserType === 1">
          <template slot-scope="scope">
            <!-- <el-tooltip content="编辑视频" placement="top" effect="dark">
            <icon-svg name="文章编辑"></icon-svg>
            </el-tooltip>-->
            <el-tooltip content="删除视频" placement="top" effect="dark">
              <el-popover v-model="popover[scope.$index]" placement="top" trigger="manual">
                <p>确定删除吗?</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$set(popover, scope.$index, false)">取消</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="onDelete(scope.row);$set(popover, scope.$index, false)"
                  >确定</el-button>
                </div>
                <icon-svg
                  slot="reference"
                  name="垃圾桶"
                  @click.native="popover.forEach((f, i) => { f && $set(popover, i, false) });
                $set(popover, scope.$index, true)"
                ></icon-svg>
              </el-popover>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="pageSize"
        :total="total"
        @current-change="onCurrentChange"
        layout="prev, pager, next, jumper"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import AzureMp from '@/components/basic/AzureMp'
import { mapState } from 'vuex'
export default {
  components: {
    AzureMp
  },

  data () {
    return {
      options: {
        duration: true
      },
      pageSize: 9,
      loading: true,
      popover: [],
      videos: [],
      total: 0
      // videos: Array(3)
      //   .fill()
      //   .map(_ => ({
      //     title: '【白依】前辈。？快注意到人家的心意啊！',
      //     url: 'https://i.ytimg.com/vi/IEguQVkvaWs/maxresdefault.jpg',
      //     status: '转码中',
      //     updateTime: '15:42'
      //   }))
    }
  },

  computed: {
    ...mapState('d2admin/user', ['info'])
  },

  methods: {
    onCurrentChange (val) {
      this.onRender(val)
    },
    onDelete ({ Id }) {
      this.$axios
        .post(this.$urls._('complex.article.delete'), {
          Id
        })
        .then(message => {
          if (message) {
            this.onRender()
            this.$notify({
              title: '成功',
              message,
              type: 'success'
            })
          }
        })
    },
    onRender (Number = '1') {
      this.loading = true
      this.$axios
        .post(this.$urls._('complex.article.getlist'), {
          ArticleClass: '2',
          Type: '2',
          Number,
          Size: this.pageSize
        })
        .then(({ Content, TotalElements }) => {
          this.total = TotalElements
          this.videos = Content
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
.video-list {
  margin-top: 40px;
  padding: 24px 40px 40px;
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  .video-list__header {
    width: 100%;
    padding: 16px 0;
    overflow: hidden;
    h3 {
      margin: 0;
      display: inline-block;
      font-weight: 400;
      font-size: 20px;
    }
    i {
      color: #8a8a8a;
    }
    .video-list__form {
      float: right;
      .el-button {
        width: 100px;
      }
      .el-form-item:last-child {
        margin: 0;
      }
    }
  }
  .video-list__wrapper {
    padding-top: 16px;
    .video-list__colmun-title {
      height: 90px;
      margin: 6px 10px;
      display: flex;
      align-items: center;
      /deep/ .azuremp__thumbnail {
        margin-right: 20px;
        border-radius: 2px;
        background-color: #000000;
      }
    }
    .el-pagination {
      margin-top: 20px;
      text-align: right;
    }
    /deep/ th.is-leaf {
      height: 58px;
      border: none;
      background: #f6f8f9;
      font-weight: 400;
      color: #9a9a9a;
    }
    svg {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
