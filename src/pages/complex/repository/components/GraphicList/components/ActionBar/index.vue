<template>
  <div class="graphic-list__item-footer">
    <span>更新于 {{ onFormat(options.UpdateTime) }}</span>
    <!-- <el-popover placement="bottom" trigger="click" title="图文内容不完整" content="请补充封面图、标题或者正文">
      <icon-svg name="警告" slot="reference"></icon-svg>
    </el-popover>-->
    <div class="graphic-list__opr" :class="{ 'display': isDisplay && isPopover }">
      <!-- 引用文章 -->
      <el-tooltip effect="dark" content="引用" placement="top" v-if="info.UserType == '2'">
        <icon-svg name="转载" @click.native="onReprint"></icon-svg>
      </el-tooltip>
      <!-- 编辑按钮 -->
      <el-tooltip effect="dark" content="编辑" placement="top" v-if="info.UserType == '1'">
        <icon-svg name="文章编辑" @click.native="onEdit"></icon-svg>
      </el-tooltip>
      <!-- 删除按钮 -->
      <el-tooltip effect="dark" content="删除" placement="top" v-if="info.UserType == '1'">
        <el-popover placement="bottom" width="254" trigger="click" v-model="isPopover">
          <div style="padding: 12px;">
            <span>确认删除吗?</span>
            <el-row>
              <el-button size="small" type="primary" @click="onDelete">删除</el-button>
              <el-button size="small" @click="isPopover = false">取消</el-button>
            </el-row>
          </div>
          <icon-svg name="垃圾桶" slot="reference" @click.native="isDisplay = true"></icon-svg>
        </el-popover>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    options: {
      type: Object
    }
  },

  data () {
    return {
      isPopover: false,
      isDisplay: false
    }
  },

  computed: {
    ...mapState('d2admin/user', ['info'])
  },

  methods: {
    onDelete () {
      this.$emit('onDelete', this.options)
      this.isPopover = false
    },
    onEdit () {
      this.$router.push({
        name: 'complex-repository-graphic-add',
        query: {
          Id: this.options.Id
        }
      })
    },
    onFormat (date) {
      return this.$moment(date).isSame(new Date(), 'day')
        ? this.$moment(date).format('dddd HH:mm')
        : this.$moment(date).format('MMM Do')
    },
    onReprint () {
      this.$router.push({
        name: 'expert-article-graphic-add',
        query: {
          Id: this.options.Id,
          reprint: true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.graphic-list__item-footer {
  width: 100%;
  padding: 10px 15px 24px;
  box-sizing: border-box;
  &:hover {
    & .graphic-list__opr {
      visibility: visible;
      opacity: 1;
    }
  }
  div {
    float: right;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s;
  }
  svg {
    width: 18px;
    height: 18px;
    position: relative;
    top: 2px;
  }
  span {
    font-size: 14px;
    color: #9a9a9a;
  }
}
.el-popper {
  .el-button {
    width: 100px;
    height: 36px;
    margin: 25px 0 0;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.display {
  visibility: visible !important;
  opacity: 1 !important;
}
</style>
