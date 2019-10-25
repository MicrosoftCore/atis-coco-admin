<template>
  <el-form class="article-push" ref="form" :model="submitForm" label-position="left" size="small">
    <el-form-item class="article-push__filter">
      <el-form :inline="true">
        <el-form-item label="群发对象" label-width="70px">
          <el-select v-model="controller.massObject" placeholder="请选择">
            <el-option label="全部用户" value="all"></el-option>
            <el-option label="按种植作物" value="plant"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="gender" placeholder="请选择" disabled>
            <el-option label="全部" value="全部"></el-option>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="群发地区">
          <el-select v-model="area" placeholder="请选择" disabled>
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label-width="70px" v-if="controller.massObject === 'plant'">
      <el-tree-transfer
        v-model="submitForm.PlantIdList"
        :titles="['未选择', '已选择']"
        :data="category"
        :props="transferProps"
        filterable
      ></el-tree-transfer>
    </el-form-item>
    <el-form-item class="article-push__msg">
      <el-form-item label="留言" label-width="70px">
        <el-switch v-model="allowComments"></el-switch>
        <el-radio-group v-model="whoComments">
          <el-radio :label="0">所有人可留言</el-radio>
          <el-radio :label="1">关注后可留言</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form-item>
    <el-form-item class="article-push__button">
      <el-button disabled>预览</el-button>
      <el-dropdown split-button type="primary" @click="onSubmit">
        {{ submitting ? '群发中...' : '群发' }}
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>定时群发</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="article-push__tips">
        <div class="article-push__icon"></div>你今天还能群发
        <span>10</span>
        次消息
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    options: {
      type: Array,
      default: []
    }
  },

  data () {
    return {
      submitting: false,
      controller: {
        massObject: 'all'
      },
      submitForm: {
        PlantIdList: []
      },
      transferProps: {
        key: 'Id',
        label: 'TypeName'
      },
      area: '海南',
      gender: '全部',
      allowComments: '',
      whoComments: '1',
      option: Array(5)
        .fill()
        .map((_, i) => ({
          value: '选项' + i,
          label: '海南' + i
        }))
    }
  },

  computed: {
    ...mapState('common', {
      category: state => state.crops.category
    })
  },

  methods: {
    onSubmit () {
      if (!this.submitting) {
        this.onValidate().then(() => {
          let Source = '1'
          let ArticleIdList = this.options.map(i => i.Id)

          this.submitting = true
          this.$axios
            .post(this.$urls._('complex.article.push'), {
              Source,
              ArticleIdList,
              ...this.submitForm
            })
            .then(message => {
              if (message) {
                this.submitting = false
                this.$refs.form.resetFields()
                this.submitForm.PlantIdList = []
                this.controller.massObject = 'all'
                this.$emit('onSuccess')
                this.$notify({
                  title: '温馨提示',
                  message,
                  type: 'success'
                })
              }
            })
        })
      }
    },
    onValidate () {
      return new Promise(resolve => {
        if (this.options.length) {
          resolve()
        } else {
          this.$message({
            message: '请添加素材',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/../element-variables.scss';
.article-push {
  margin-top: 30px;
  padding: 0;
  .article-push__filter {
    /deep/ .el-form-item__content {
      line-height: 40px;
      .el-form-item {
        margin-right: 40px;
        .el-select {
          width: 120px;
          .el-input__inner {
            height: 30px;
            border-radius: 0;
          }
        }
      }
    }
  }
  .article-push__msg {
    .el-radio-group {
      margin-left: 30px;
      position: relative;
      top: 1px;
    }
  }
  .article-push__button {
    .article-push__tips {
      color: #8d8d8d;
      display: inline-block;
      border: 1px solid #e7e7eb;
      padding: 0 10px;
      margin-left: 20px;
      position: relative;
      span {
        color: $--color-primary;
      }
      .article-push__icon {
        width: 10px;
        height: 10px;
        border: 1px solid #e7e7eb;
        border-right: none;
        border-bottom: none;
        background: #ffffff;
        transform: rotate(-45deg);
        position: absolute;
        top: calc(50% - 5px);
        left: -6px;
      }
    }
  }
  .el-button {
    width: 104px;
    margin-right: 10px;
  }
  /deep/ .el-dropdown {
    .el-button:not(.el-dropdown__caret-button) {
      width: 93px;
    }
  }
}
</style>
