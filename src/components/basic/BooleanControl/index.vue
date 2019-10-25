<template>
  <el-popover
    :placement="popoverPlacement"
    :title="popoverTitle"
    :width="popoverWidth"
    trigger="hover"
  >
    <el-switch
      v-if="[activeValue, inactiveValue].includes(currentValue)"
      v-model="currentValue"
      :active-value="activeValue"
      :inactive-value="inactiveValue"
      :active-color="activeColor"
      :inactive-color="inactiveColor"
      :active-text="activeText"
      :inactive-text="inactiveText"
      :disabled="disabled"
      @change="handleChange"
    >
    </el-switch>
    <slot
      v-else
      name="control"
    />
    <span slot="reference">
      <slot
        v-if="value === activeValue"
        name="active"
      />
      <slot
        v-else-if="value === inactiveValue"
        name="inactive"
      />
      <slot
        v-else
        name="reference"
      />
    </span>
  </el-popover>
</template>

<script>
export default {
  name: 'boolean-control',
  props: {
    value: {
      default: false
    },
    popoverPlacement: {
      default: 'left'
    },
    popoverTitle: {
      default: '修改'
    },
    popoverWidth: {
      default: '150'
    },
    activeValue: {
      default: true
    },
    inactiveValue: {
      default: false
    },
    activeColor: {
      default: '#67C23A'
    },
    inactiveColor: {
      default: '#F56C6C'
    },
    activeText: {
      default: '正常'
    },
    inactiveText: {
      default: '禁用'
    }
  },
  data () {
    return {
      currentValue: false,
      disabled: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.currentValue = val
      }
    }
  },
  methods: {
    handleChange (val) {
      return new Promise((resolve, reject) => {
        this.disabled = true
        this.$emit('change', val, resolve)
        this.$message({
          message: '正在发送请求',
          type: 'info'
        })
      }).then(res => {
        this.disabled = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
      // 请将 setTimeout 修改为您的异步请求
      // setTimeout(() => {
      //   this.disabled = false
      //   this.$message({
      //     message: '修改成功',
      //     type: 'success'
      //   })
      //   this.$emit('change', val)
      //   // 如果修改失败的话需要在这里手动将 currentValue 复原
      // }, 1000)
    }
  }
}
</script>
