<template>
  <el-dialog title="选择素材" :visible.sync="visible" width="960px">
    <div v-if="noRecords" style="padding:20px;">暂无可推送的文章</div>
    <div class="box-wrapper" v-else v-loading="loading">
      <div class="box" v-for="(item, index) in lists" :key="index" @click="onChoose(item)">
        <section class="aaa">
          <div>更新于 {{ item.UpdateTime | moment('MMMDo') }}</div>
          <img
            alt
            width="290"
            height="165"
            :src="item.CoverImageUrl.split(',')[0]"
            v-if="item.CoverImageUrl"
          >
          <div>{{ item.Title }}</div>
          <div class="mask" :class="{ 'mask-show': chosen.hasOwnProperty(item.Id) }">
            <i class="el-icon-check"></i>
          </div>
        </section>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="onConfirm">确 定</el-button>
      <el-button size="small" @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      noRecords: false,
      loading: true,
      visible: false,
      chosen: {},
      lists: []
    }
  },

  computed: {
    ...mapState('d2admin/user', ['info'])
  },

  methods: {
    onChoose (item) {
      this.chosen.hasOwnProperty(item.Id)
        ? this.$delete(this.chosen, item.Id)
        : this.$set(this.chosen, item.Id, item)
    },
    onConfirm () {
      this.$emit('onConfirm', Object.values(this.chosen))
      this.visible = false
      this.chosen = {}
    }
  },

  created () {
    let { UserType, ExpertId } = this.info
    let ArticleClass = UserType === 1 ? '2' : '3'
    // let IsPublish = '0'

    let data = {
      ArticleClass,
      Type: '1',
      Number: '1',
      Size: '9999999'
    }

    if (UserType === 1) {
      data = {
        ...data
        // IsPublish
      }
    }

    if (UserType === 2) {
      data = {
        ...data,
        ExpertId
      }
    }

    this.$on('onOpen', () => {
      this.loading = true
      this.visible = true
      this.$axios
        .post(this.$urls._('complex.article.getlist'), data)
        .then(({ Content }) => {
          if (!Content.length) {
            this.noRecords = true
          }
          this.loading = false
          this.lists = Content
        })
    })
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  padding: 30px 0;
  height: 534px;
  box-sizing: border-box;
  overflow-y: scroll;
  .box-wrapper {
    padding: 0 140px;
    -moz-column-count: 2; /* Firefox */
    -webkit-column-count: 2; /* Safari 和 Chrome */
    column-count: 2;
    -moz-column-gap: 1em;
    -webkit-column-gap: 1em;
    column-gap: 1em;
  }
  .box {
    display: flex;
    justify-content: center;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    .aaa {
      width: 320px;
      padding: 14px;
      margin-bottom: 20px;
      box-sizing: border-box;
      position: relative;
      border: 1px solid #e7e7eb;
      img {
        margin: 20px 0;
      }
      &:hover {
        & .mask {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .mask-show {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        i {
          color: #ffffff;
          font-size: 50px;
        }
      }
    }
  }
}
/deep/ .el-dialog__footer {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  .el-button {
    width: 104px;
    padding: 7px 15px;
    font-size: 14px;
  }
}
</style>
