<template>
  <el-container class="article">
    <el-header class="article__header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>综合</el-breadcrumb-item>
        <el-breadcrumb-item>文章库</el-breadcrumb-item>
      </el-breadcrumb>
      <section class="article__title">搜索列表</section>
      <el-form class="article__form" ref="headerForm" :model="searchForm">
        <el-form-item>
          <el-input
            class="article__input"
            v-model="searchForm.SearchKeys"
            placeholder="请输入"
            suffix-icon="el-icon-search"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="article__main">
      <el-card class="article__form_search">
        <el-form v-model="searchForm" ref="searchForm" label-position="left" label-width="80px">
          <el-form-item label="所属类目">
            <element-checkbox :options="section" @change="onSearch"></element-checkbox>
          </el-form-item>
          <!-- <el-form-item label="发布人" v-if="info.UserType === 1">
            <el-select
              class="article__search_multiple"
              size="small"
              placeholder="请选择"
              v-model="searchForm.AuthorIdList"
              :remote-method="onRemote"
              multiple
              filterable
              remote
              reserve-keyword
            >
              <el-option
                v-for="(author, index) in authors"
                :key="index"
                :label="author.label"
                :value="author.value"
              ></el-option>
            </el-select>
            <el-button type="text" @click="searchForm.AuthorIdList = [info.UserID]">只看自己的</el-button>
          </el-form-item> -->
          <!-- <el-form-item label="其他选项">
              活跃用户：<el-input class="article__search" size="small" placeholder="请输入内容"></el-input>
              好评度： <el-input class="article__search" size="small" placeholder="请输入内容"></el-input>
          </el-form-item>-->
        </el-form>
      </el-card>
      <el-card>
        <ArticleList ref="ArticleList" :keywords="searchForm.SearchKeys"/>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
    ArticleList: () => import('./components/ArticleList')
  },

  data () {
    return {
      searchForm: {
        SearchKeys: '',
        AuthorIdList: []
      },
      selectOptions: []
    }
  },

  watch: {
    searchForm: {
      handler (newValue, oldValue) {
        this.$refs.ArticleList.onSearch(this.searchForm)
      },
      deep: true
    }
  },

  computed: {
    ...mapState('common', {
      category: state => state.crops.category
    }),
    ...mapState('d2admin/user', ['info']),
    section () {
      return this.category.map(({ Id, TypeName }) => ({
        label: TypeName,
        value: Id
      }))
    },
    authors () {
      return [
        {
          value: this.info.UserID,
          label: '我自己'
        },
        ...this.selectOptions
      ]
    }
  },

  methods: {
    onRemote (UserName) {
      if (UserName !== '') {
        this.$axios
          .post(this.$urls._('manage.account.getlist'), {
            UserName,
            Number: '1',
            Size: '50'
          })
          .then(({ Content }) => {
            if (Array.isArray(Content)) {
              this.selectOptions = Content.filter(({ UserID }) => UserID !== this.info.UserID).map(
                ({ UserID, RealName }) => ({
                  value: UserID,
                  label: RealName
                })
              )
            }
          })
      } else {
        this.selectOptions = []
      }
    },
    onSearch (val) {
      this.searchForm.OfPlantIdList = val
      this.$refs.ArticleList.onSearch(this.searchForm)
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .article__header {
    height: unset !important;
    background: #fff;
    border-bottom: 1px solid #e9e9e9;
    padding-top: 20px;
    .article__title {
      font-size: 20px;
      margin: 20px 0 10px;
    }
    .article__input {
      width: 520px;
      margin-left: calc(50% - 260px);
    }
  }
  .article__main {
    height: unset!important;
    .article__form_search {
      margin-bottom: 16px;
      .article__search {
        width: 185px;
        margin-right: 80px;
      }
      .article__search_multiple {
        width: 280px;
      }
      .el-form-item {
        padding-bottom: 12px;
        margin-bottom: 10px;
        &:not(:last-child) {
          border-bottom: 1px dashed #e9e9e9;
        }
        & /deep/ .el-form-item__label {
          font-weight: bold;
          &::after {
            content: ':';
          }
        }
      }
    }
  }
  .el-card {
    box-shadow: none;
    &:hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);
    }
  }
}
</style>
