<template>
  <div class="dd-upload">
    <el-upload
      :action=url
      v-bind="uploadAttributes">
      <slot :name="'content'"></slot>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: 'element-upload',

    props: {
      url: {
        type: String,
        required: true
      },
      options: {
        type: Object
      }
    },

    computed: {
      uploadAttributes () {
        return {
          ...this.defaultOptions,
          ...this.options
        }
      }
    },

    data () {
      return {
        defaultOptions: {
          /**
           * @param show-file-list
           * @description 是否显示已上传文件列表
           * @default false
           * @type <boolean>
           */
          showFileList: false,
          /**
           * @param on-success
           * @description 文件上传成功时的钩子
           * @type <function(response, file, fileList)>
           */
          onSuccess: undefined
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
