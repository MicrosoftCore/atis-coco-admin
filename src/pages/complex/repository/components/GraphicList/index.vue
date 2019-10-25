<template>
  <div class="graphic-list">
    <div class="graphic-list__header">
      <h3>图文消息 (共{{ lists.length }}条)</h3>
      <icon-svg name="列表1"></icon-svg>
      <icon-svg name="列表2"></icon-svg>
      <el-form
        class="graphic-list__form"
        ref="searchForm"
        size="medium"
        :model="searchForm"
        @submit.native.prevent
        inline
      >
        <el-form-item label>
          <el-input class="graphic-list__input" placeholder="标题" v-model="searchForm.SearchKeys">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="onRender"></i>
          </el-input>
        </el-form-item>
        <el-form-item v-if="info.UserType === 1">
          <router-link :to="{ name: 'complex-repository-graphic-add' }">
            <el-button type="primary">新建图文素材</el-button>
          </router-link>
          <el-popover placement="bottom-end" trigger="click">
            <div>
              <el-button type="text" disabled>新建分享图文</el-button>
            </div>
            <el-button type="text" disabled>管理图文模板</el-button>
            <el-button
              class="graphic-list__button"
              slot="reference"
              type="primary"
              icon="el-icon-caret-bottom"
            ></el-button>
          </el-popover>
        </el-form-item>
      </el-form>
    </div>
    <div class="graphic-list__card-list">
      <div class="graphic-list__card-row" v-loading="loading">
        <!-- 不完整图文 -->
        <!-- <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6" v-for="(item, index) in 8" :key="index">
          <div class="graphic-list__item-card">
            <div class="graphic-list__item-header">未命名图文</div>
            <div class="graphic-list__item-content" @click="onPreview">
              <i class="graphic-list__thumbnail"></i>
              <a href="" target="_blant">苹果发售春季新品: 首次退出中国红iPhone7。沃的iPhone7,骚气逼人！</a>
              <div class="mask"></div>
            </div>
            <action-bar></action-bar>
          </div>
        </el-col>-->
        <!-- 完整图文 -->
        <div class="graphic-list__item-card" v-for="(item, index) in lists" :key="index">
          <div class="graphic-list__item-content_hastitle" @click="onPreview(item)">
            <a href target="_blant">{{ item.Title }}</a>
            <i
              class="graphic-list__thumbnail"
              v-if="item.CoverImageUrl"
              :style="{backgroundImage: `url(${item.CoverImageUrl.split(',')[0]})`}"
            ></i>
            <span v-if="item.Summary">{{ item.Summary }}</span>
            <div class="mask"></div>
          </div>
          <action-bar :options="item" @onDelete="onDelete"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
    ActionBar: () => import('./components/ActionBar')
  },

  data () {
    return {
      searchForm: {
        SearchKeys: ''
      },
      loading: true,
      lists: []
    }
  },

  computed: {
    ...mapState('d2admin/user', ['info'])
  },

  methods: {
    onDelete ({ Id }) {
      this.$axios
        .post(this.$urls._('complex.article.delete'), {
          Id
        })
        .then(message => {
          if (message) {
            this.onRender()
            this.$notify({
              title: '温馨提示',
              message,
              type: 'success'
            })
          }
        })
    },
    onPreview ({ Id }) {
      this.$router.push({
        name: 'complex-repository-graphic-preview',
        query: {
          Id
        }
      })
    },
    onRender () {
      this.loading = true
      this.$axios
        .post(this.$urls._('complex.article.getlist'), {
          ArticleClass: '2',
          Type: '1',
          Number: '1',
          Size: '9999999',
          ...this.searchForm
        })
        .then(result => {
          let { Content } = result
          this.lists = Content
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
.graphic-list {
  .graphic-list__header {
    width: 100%;
    padding-top: 10px;
    h3 {
      font-size: 20px;
      font-weight: 400;
      display: inline-block;
    }
    svg {
      width: 15px;
      height: 15px;
      margin: 0 5px;
    }
    .graphic-list__form {
      float: right;
      margin-top: 16px;
      .graphic-list__input {
        width: 243px;
      }
      .graphic-list__button {
        padding: 10px;
      }
      .el-form-item:last-child {
        margin-right: 0;
      }
    }
  }
  .graphic-list__card-list {
    padding-top: 32px;
    .graphic-list__card-row {
      column-count: 5;
      -moz-column-count: 5;
      -webkit-column-count: 5;
      column-gap: 1em;
      -moz-column-gap: 1em;
      -webkit-column-gap: 1em;
      .graphic-list__item-card {
        width: 100%;
        margin-bottom: 20px;
        background-color: #ffffff;
        box-sizing: border-box;
        box-shadow: 0 1px 20px 0 #e4e8eb;
        break-inside: avoid;
        -moz-page-break-inside: avoid;
        -webkit-column-break-inside: avoid;
        .graphic-list__item-header {
          height: 43px;
          line-height: 43px;
          padding: 0 15px;
          box-sizing: border-box;
          border-bottom: 1px solid #e4e8eb;
        }
        .graphic-list__item-content,
        .graphic-list__item-content_hastitle {
          width: 100%;
          position: relative;
          box-sizing: border-box;
          padding: 12px 15px;
          &:hover {
            & .mask {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            & + .graphic-list__item-footer {
              /deep/ .graphic-list__opr {
                visibility: visible !important;
                opacity: 1 !important;
              }
            }
          }
          & .mask {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            &::before {
              content: '预览文章';
              color: #ffffff;
              font-size: 14px;
            }
          }
          i {
            background-size: cover;
            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-color: #f6f8f9;
          }
        }
        .graphic-list__item-content {
          a {
            overflow: hidden;
            word-wrap: break-word;
            font-size: 14px;
            font-weight: 400;
            line-height: 22.4px;
            text-decoration: none;
            color: #353535;
            vertical-align: top;
            -webkit-font-smoothing: antialiased;
          }
          i {
            width: 60px;
            height: 60px;
            float: right;
            margin-left: 12px;
            background-image: url('http://a2.peoplecdn.cn/c9c5577b5708c43ce34662c6726d8662.jpg');
          }
        }
        .graphic-list__item-content_hastitle {
          // height: 293px;
          // max-height: 293px;
          a {
            display: block;
            margin: 8px 0 20px;
          }
          i {
            width: 100%;
            height: 166px;
            display: block;
            background-image: url('http://a2.peoplecdn.cn/c9c5577b5708c43ce34662c6726d8662.jpg');
          }
          span {
            font-size: 14px;
            color: #9a9a9a;
            display: inline-block;
            margin-top: 12px;
            word-break: break-all;
          }
        }
      }
    }
    @media only screen and (min-width: 992px) {
      .graphic-list__card-row {
        column-count: 2;
        -moz-column-count: 2;
        -webkit-column-count: 2;
      }
    }
    @media only screen and (min-width: 1100px) {
      .graphic-list__card-row {
        column-count: 3;
        -moz-column-count: 3;
        -webkit-column-count: 3;
      }
    }
    @media only screen and (min-width: 1435px) {
      .graphic-list__card-row {
        column-count: 4;
        -moz-column-count: 4;
        -webkit-column-count: 4;
      }
    }
    @media only screen and (min-width: 1920px) {
      .graphic-list__card-row {
        column-count: 5;
        -moz-column-count: 5;
        -webkit-column-count: 5;
      }
    }
  }
}
</style>
