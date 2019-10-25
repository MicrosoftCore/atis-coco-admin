<template>
  <div>
    <el-dialog v-el-drag-dialog @dragDialog="handleDrag" v-bind="dialogAttributes" :visible.sync="visible">
      <slot :name="'template'"></slot>
      <slot :name="'footer'"></slot>
      <div class="footer" slot="footer">
        <el-button 
          v-for="(item, index) in dialogAttributes.buttons"
          :key="index"
          :type="item.type == 'submit' ? 'primary': ''"
          :icon="item.type == 'submit' ? 'el-icon-check': 'el-icon-close'"
          @click="handelClick(item.type)"
          size="mini">
          {{ item.text || '确认' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-dragDialog'

export default {
  name: 'element-dialog',

  directives: { elDragDialog },

  props: {
    options: {
      type: Object
    }
  },

  computed: {
    dialogAttributes () {
      return {
        ...this.defaultOptions,
        ...this.options
      }
    }
  },
  mounted () {
    this.attachEvents(this)
  },
  data () {
    return {
      visible: false,
      defaultOptions: {
        /**
         * @param visible
         * @description 是否显示 Dialog，支持 .sync 修饰符
         * @default false
         * @type <boolean>
         */
        visible: false,
        /**
         * @param title
         * @description Dialog 的标题，也可通过具名 slot （见下表）传入
         * @default 信息提示
         * @type <string>
         */
        title: '信息提示',
        /**
         * @param width
         * @description Dialog 的宽度
         * @default 50%
         * @type <string>
         */
        width: '50%',
        /**
         * @param top
         * @description Dialog CSS 中的 margin-top 值
         * @default 15vh
         * @type <string>
         */
        top: '15vh',
        /**
         * @param modal
         * @description 是否需要遮罩层
         * @default true
         * @type <boolean>
         */
        modal: true,
        /**
         * @param modal-append-to-body
         * @description 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上
         * @default true
         * @type <boolean>
         */
        modalAppendToBody: true,
        /**
         * @param append-to-body
         * @description Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
         * @default false
         * @type <boolean>
         */
        appendToBody: false,
        /**
         * @param lock-scroll
         * @description 是否在 Dialog 出现时将 body 滚动锁定
         * @default true
         * @type <boolean>
         */
        lockScroll: true,
        /**
         * @param custom-class
         * @description Dialog 的自定义类名
         * @type <string>
         */
        customClass: undefined,
        /**
         * @param close-on-click-modal
         * @description 是否可以通过点击 modal 关闭 Dialog
         * @default true
         * @type <boolean>
         */
        closeOnClickModal: true,
        /**
         * @param close-on-press-escape
         * @description 是否可以通过按下 ESC 关闭 Dialog
         * @default true
         * @type <boolean>
         */
        closeOnPressEscape: true,
        /**
         * @param show-close
         * @description 是否显示关闭按钮
         * @default true
         * @type <boolean>
         */
        showClose: true,
        /**
         * @param before-close
         * @description 关闭前的回调，会暂停 Dialog 的关闭
         * @type <function(done)，done 用于关闭 Dialog>
         */
        beforeClose: undefined,
        /**
         * @param center
         * @description 是否对头部和底部采用居中布局
         * @default false
         * @type <boolean>
         */
        center: false
      }
    }
  },
  methods: {
    attachEvents (that) {
      this.$on('openDialog', (params) => {
        that.defaultOptions = {
          ...that.defaultOptions,
          ...params
        }
        that.visible = true
      })
    },
    handelClick (buttonType) {
      if (buttonType === 'submit') {

      } else {
        this.visible = false
      }
    },
    handleDrag () {
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
}
</style>
