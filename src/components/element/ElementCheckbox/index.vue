<template>
  <section>
    <el-checkbox-group
      class="el-checkbox__group"
      :class="{hidden: collapse}"
      v-model="checkboxGroup"
      @change="handleCheckBoxChange"
    >
      <el-checkbox-button
        class="el-checkbox__button"
        :indeterminate="isIndeterminate"
        :label="checkAllLabel"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >{{ checkAllLabel }}</el-checkbox-button>
      <el-checkbox-button
        class="el-checkbox__button"
        v-for="({label, value}, index) in options"
        :key="index"
        :label="value"
      >{{ label }}</el-checkbox-button>
    </el-checkbox-group>
    <el-button class="el-checkbox__collapse" type="text" @click="collapse = !collapse">
      {{ collapse ? "展开": "收起" }}
      <i
        class="el-icon--right"
        :class="collapse ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
      ></i>
    </el-button>
  </section>
</template>

<script>
export default {
  name: 'element-checkbox',

  props: {
    options: {
      type: Array,
      default: []
    }
  },

  data () {
    return {
      collapse: true,
      checkAll: false,
      checkAllLabel: '全部',
      isIndeterminate: true,
      checkboxGroup: [],
      cities: []
    }
  },

  methods: {
    handleCheckAllChange (val) {
      let checkAll = Object.assign([], this.options.map(i => i.value))
      checkAll.push(this.checkAllLabel)
      this.checkboxGroup = val && !this.checkAll ? checkAll : []
      this.isIndeterminate = false
    },
    handleCheckBoxChange (value) {
      let checkedLength = value.length
      let optionsLength = this.options.map(i => i.value).length
      let checkAllIndex = this.checkboxGroup.indexOf(this.checkAllLabel)
      this.checkAll = checkedLength === optionsLength + 1
      if (!this.checkAll && checkAllIndex > -1) {
        this.checkboxGroup.splice(checkAllIndex)
      } else if (checkedLength === optionsLength && checkAllIndex === -1) {
        this.checkboxGroup.push(this.checkAllLabel)
      }
      this.isIndeterminate = checkedLength > 0 && checkedLength < optionsLength
      this.$emit('change', this.checkboxGroup.filter(f => f !== this.checkAllLabel))
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  .el-checkbox__group {
    width: calc(100% - 80px);
    float: left;
    .el-checkbox__button {
      margin-right: 24px;
      & /deep/ .el-checkbox-button__inner {
        font-size: 14px;
        padding: 3px 10px;
        border: none;
        border-radius: 4px;
      }
    }
  }
  .el-checkbox__collapse {
    float: left;
  }
  .hidden {
    max-height: 40px;
    overflow: hidden;
    transition: all 0.3s;
  }
}
</style>
