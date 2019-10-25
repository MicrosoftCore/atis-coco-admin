<template>
  <div class="el-transfer-panel">
    <p class="el-transfer-panel__header">
      <el-checkbox
        v-model="allChecked"
        @change="handleAllCheckedChange"
      >
        <!-- :indeterminate="isIndeterminate" -->
        {{ title }}
        <span>{{ checkedSummary }}</span>
      </el-checkbox>
    </p>

    <div :class="['el-transfer-panel__body', hasFooter ? 'is-with-footer' : '']">
      <el-input
        class="el-transfer-panel__filter"
        v-model="query"
        size="small"
        :placeholder="placeholder"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
        v-if="filterable"
      >
        <i slot="prefix" :class="['el-input__icon', 'el-icon-' + inputIcon]" @click="clearQuery"></i>
      </el-input>
      <!-- <el-checkbox-group
        v-model="checked"
        v-show="!hasNoMatch && data.length > 0"
        :class="{ 'is-filterable': filterable }"
        class="el-transfer-panel__list"
      >
        <el-checkbox
          class="el-transfer-panel__item"
          :label="item[keyProp]"
          :disabled="item[disabledProp]"
          :key="item[keyProp]"
          v-for="item in filteredData"
        >
          <option-content :option="item"></option-content>
        </el-checkbox>
      </el-checkbox-group> -->
      <el-tree
        ref="tree"
        class="el-transfer-panel__list"
        :class="{ 'is-filterable': filterable }"
        :data="filteredData"
        :filter-node-method="filterNode"
        :node-key="keyProp"
        :props="defaultProps"
        @check="handleTreeChecked"
        default-expand-all
        highlight-current
        show-checkbox>
      </el-tree>
      <p class="el-transfer-panel__empty" v-show="hasNoMatch">{{ t('el.transfer.noMatch') }}</p>
      <p
        class="el-transfer-panel__empty"
        v-show="data.length === 0 && !hasNoMatch"
      >{{ t('el.transfer.noData') }}</p>
    </div>
    <p class="el-transfer-panel__footer" v-if="hasFooter">
      <slot></slot>
    </p>
  </div>
</template>

<script>
import ElCheckboxGroup from 'element-ui/packages/checkbox-group'
import ElCheckbox from 'element-ui/packages/checkbox'
import ElInput from 'element-ui/packages/input'
import Locale from 'element-ui/src/mixins/locale'

export default {
  mixins: [Locale],

  name: 'ElTransferPanel',

  componentName: 'ElTransferPanel',

  components: {
    ElCheckboxGroup,
    ElCheckbox,
    ElInput
    // OptionContent: {
    //   props: {
    //     option: Object
    //   },
    //   render (h) {
    //     const getParent = vm => {
    //       if (vm.$options.componentName === 'ElTransferPanel') {
    //         return vm
    //       } else if (vm.$parent) {
    //         return getParent(vm.$parent)
    //       } else {
    //         return vm
    //       }
    //     }
    //     const panel = getParent(this)
    //     const transfer = panel.$parent || panel
    //     return panel.renderContent ? (
    //       panel.renderContent(h, this.option)
    //     ) : transfer.$scopedSlots.default ? (
    //       transfer.$scopedSlots.default({ option: this.option })
    //     ) : (
    //       <span>
    //         {this.option[panel.labelProp] || this.option[panel.keyProp]}
    //       </span>
    //     )
    //   }
    // }
  },

  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    renderContent: Function,
    placeholder: String,
    title: String,
    filterable: Boolean,
    format: Object,
    filterMethod: Function,
    filterNode: Function,
    defaultChecked: Array,
    props: Object,
    value: Array
  },

  data () {
    return {
      total: [],
      checked: [],
      // allChecked: false,
      defaultAllchecked: false,
      query: '',
      inputHover: false,
      checkChangeByUser: true,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  watch: {
    // checked (val, oldVal) {
    //   this.updateAllChecked()
    //   if (this.checkChangeByUser) {
    //     const movedKeys = val
    //       .concat(oldVal)
    //       .filter(v => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1)
    //     this.$emit('checked-change', val, movedKeys)
    //   } else {
    //     this.$emit('checked-change', val)
    //     this.checkChangeByUser = true
    //   }
    // },

    data (val, oldVal) {
      const checked = []
      const filteredDataKeys = this.filteredData.map(item => item[this.keyProp])
      this.checked.forEach(item => {
        if (filteredDataKeys.indexOf(item) > -1) {
          checked.push(item)
        }
      })
      this.checkChangeByUser = false
      this.checked = checked
    },

    value () {
      this.updateCheckedSummary()
    },

    query (val) {
      this.updateCheckedSummary()
      this.tree.filter(val)
    },

    checkableData () {
      // this.updateAllChecked()
    },

    defaultChecked: {
      immediate: true,
      handler (val, oldVal) {
        if (
          oldVal &&
          val.length === oldVal.length &&
          val.every(item => oldVal.indexOf(item) > -1)
        ) {
          return
        }
        const checked = []
        const checkableDataKeys = this.checkableData.map(
          item => item[this.keyProp]
        )
        val.forEach(item => {
          if (checkableDataKeys.indexOf(item) > -1) {
            checked.push(item)
          }
        })
        this.checkChangeByUser = false
        this.checked = checked
      }
    }
  },

  computed: {
    allChecked: {
      get () {
        const checkedLength = this.checked.length
        const dataLength = this.total.length
        return dataLength === 0
          ? false
          : checkedLength === dataLength || this.defaultAllchecked
      },
      set (val) {
        this.defaultAllchecked = val
      }
    },
    filteredData () {
      return this.data
      // return this.data.filter(item => {
      //   if (typeof this.filterMethod === 'function') {
      //     return this.filterMethod(this.query, item)
      //   } else {
      //     const label = item[this.labelProp] || item[this.keyProp].toString()
      //     return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1
      //   }
      // })
    },

    checkableData () {
      return this.filteredData.filter(item => !item[this.disabledProp])
    },

    checkedSummary () {
      const checkedLength = this.checked.length
      const dataLength = this.total.length
      // const dataLength = this.data.length
      const { noChecked, hasChecked } = this.format
      if (noChecked && hasChecked) {
        return checkedLength > 0
          ? hasChecked
              .replace(/\${checked}/g, checkedLength)
              .replace(/\${total}/g, dataLength)
          : noChecked.replace(/\${total}/g, dataLength)
      } else {
        return `${checkedLength}/${dataLength}`
      }
    },

    isIndeterminate () {
      const checkedLength = this.checked.length
      return checkedLength > 0 && checkedLength < this.checkableData.length
    },

    hasNoMatch () {
      return this.query.length > 0 && this.filteredData.length === 0
    },

    inputIcon () {
      return this.query.length > 0 && this.inputHover
        ? 'circle-close'
        : 'search'
    },

    labelProp () {
      return this.props.label || 'label'
    },

    keyProp () {
      return this.props.key || 'key'
    },

    disabledProp () {
      return this.props.disabled || 'disabled'
    },

    hasFooter () {
      return !!this.$slots.default
    }
  },

  methods: {
    updateAllChecked () {
      const checkableDataKeys = this.checkableData.map(
        item => item[this.keyProp]
      )
      this.allChecked =
        checkableDataKeys.length > 0 &&
        checkableDataKeys.every(item => this.checked.indexOf(item) > -1)
    },

    updateCheckedSummary () {
      this.$nextTick(_ => {
        let nodesMap = Object.values(this.tree.store.nodesMap)
        this.defaultAllchecked = false
        this.total = nodesMap.filter(node => node.visible)
        this.checked = nodesMap.filter(node => node.visible && node.checked)
      })
    },

    handleAllCheckedChange (value) {
      // this.checked = value
      //   ? this.checkableData.map(item => item[this.keyProp])
      //   : []
      this.filteredData.forEach(data => this.tree.setChecked(data, value, true))
      this.$emit('checked-change', null, this.tree.getCheckedKeys())
    },

    handleTreeChecked (treeNode, treeChecked) {
      let { checkedKeys, halfCheckedKeys } = treeChecked

      halfCheckedKeys.forEach(halfCheckedKey => {
        let halfCheckedNode = this.tree.getNode(halfCheckedKey)
        let { childNodes } = halfCheckedNode
        if (
          childNodes &&
          childNodes.filter(childNodes => childNodes.visible).length ===
            childNodes.filter(childNodes => childNodes.checked).length
        ) {
          halfCheckedNode.indeterminate = false
          halfCheckedNode.checked = true
        }
      })

      this.checked = checkedKeys.filter(
        checkedKey => this.tree.getNode(checkedKey).visible
      )
      this.$emit('checked-change', treeNode, treeChecked)
    },

    clearQuery () {
      if (this.inputIcon === 'circle-close') {
        this.query = ''
      }
    }
  },

  mounted () {
    this.tree = this.$refs['tree']
  }
}
</script>
