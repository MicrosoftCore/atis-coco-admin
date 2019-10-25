<template>
  <div>
    <div id="toolbarContainer"></div>
    <slot name="append"></slot>
    <froala v-model="model" :config="config" :onManualControllerReady="onManualControllerReady"/>
  </div>
</template>

<script>
import JsCookie from 'js-cookie'
import * as jQuery from 'jquery'
// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min')
require('froala-editor/js/languages/zh_cn.js')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('froala-editor/css/froala_style.min.css')
require('froala-editor/css/themes/gray.min.css')
export default {
  props: {
    value: {
      type: String
    },
    options: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      // model: '',
      imageUploadURL:
        process.env.BASE_URL + this.$urls._('app.common.imageupload'),
      videoUploadURL:
        process.env.BASE_URL + this.$urls._('app.common.videoupload'),
      videoManagerLoadURL:
        process.env.BASE_URL + this.$urls._('complex.article.getlist')
    }
  },

  computed: {
    config () {
      return {
        attribution: false,
        events: {
          'froalaEditor.initialized': this.onInitialized,
          'froalaEditor.video.uploaded': this.onVideoUploaded
        },
        heightMin: 200,
        imageCORSProxy: 'https://cors-anywhere.herokuapp.com',
        imageResizeWithPercent: true,
        imageUploadMethod: 'POST',
        imageUploadURL: this.imageUploadURL,
        videoManagerLoadMethod: 'POST',
        videoManagerLoadURL: this.videoManagerLoadURL,
        videoAllowedProviders: ['.*', 'youku', 'qq'],
        language: 'zh_cn',
        placeholderText: '从这里开始写正文',
        quickInsertButtons: ['image', 'embedly', 'table', 'ul', 'ol', 'hr'],
        requestHeaders: {
          Authorization: `Bearer ${JsCookie.get('access_token')}`
        },
        requestWithCORS: true,
        requestWithCredentials: false,
        theme: 'gray',
        toolbarButtons: [
          'undo',
          'redo',
          '|',
          'insertLink',
          'insertImage',
          'insertVideo',
          'videoManager',
          'embedly',
          // 'insertFile',
          'insertTable',
          '|',
          'emoticons',
          'fontAwesome',
          'specialCharacters',
          'insertHR',
          'selectAll',
          'clearFormatting',
          '|',
          'print',
          'getPDF',
          'spellChecker',
          'help',
          'html',
          '-',
          // 'fullscreen',
          'bold',
          'italic',
          'underline',
          'strikeThrough',
          'subscript',
          'superscript',
          '|',
          'fontFamily',
          'fontSize',
          'color',
          // 'inlineClass',
          'inlineStyle',
          'paragraphStyle',
          // 'lineHeight',
          '|',
          'paragraphFormat',
          'align',
          // 'formatOL',
          // 'formatUL',
          'outdent',
          'indent',
          'quote'
        ],
        toolbarContainer: '#toolbarContainer',
        ...this.options
      }
    },
    model: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    onManualControllerReady (initControls) {
      this.onRegisterPlugin()
      this.initControls = initControls
      this.initControls.initialize(this.config)
    },
    onDeleteAll () {
      this.initControls.getEditor()('html.set', '')
      this.initControls.getEditor()('undo.reset')
      this.initControls.getEditor()('undo.saveStep')
    },
    onInitialized (e, editor) {
      // console.log(editor.selection)
      jQuery.FE.VIDEO_PROVIDERS.push({
        test_regex: /^.*(v.youku.com)\/(v_show)\/(id_)?([0-9a-zA-Z_]+)(.+)?/g,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:v\.youku\.com)\/(?:v_show)\/(?:id_|embed\/)?([0-9a-zA-Z_]+)(.+)?/g,
        url_text: 'https://player.youku.com/embed/$1',
        html:
          '<iframe width="640" height="360" src="{url}==" frameborder="0" allowfullscreen></iframe>',
        provider: 'youku'
      })
      jQuery.FE.VIDEO_PROVIDERS.push({
        test_regex: /^.+(v.qq.com)\/[^_&]+/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:v.qq\.com\/x\/page)\/?([0-9a-zA-Z_]+)(.+)?/g,
        url_text: 'https://v.qq.com/txp/iframe/player.html?vid=$1',
        html:
          '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
        provider: 'qq'
      })
    },
    onVideoUploaded (e, editor, response) {
      // console.log(e, editor, response)
    },
    onRegisterPlugin () {
      require('./js/plugins/video_manager.min')
      // VideoMangerPlugin.register()
    }
  },

  mounted () {
    let elmain = $('.el-main')[0]
    let $panel = $('.graphic-add__panel')
    let $toolbarContainer = $('#toolbarContainer')

    this.onScroll = function (val) {
      let offsetTop = $panel.offset().top
      if (offsetTop <= 60) {
        $toolbarContainer.css({
          position: 'sticky',
          top: '0',
          zIndex: '999'
        })
      } else {
        $toolbarContainer.css({
          position: 'unset',
          top: 'unset',
          zIndex: 'unset'
        })
      }
    }

    elmain.addEventListener('scroll', this.onScroll)
    // console.log(process.env.BASE_URL)
  },

  beforeDestroy () {
    try {
      let elmain = $('.el-main')[0]
      elmain.removeEventListener('scroll', this.onScroll)
    } catch (e) {}
  }
}
</script>

<style lang="scss" scoped>
/deep/ a[href*='froala'] {
  position: fixed;
  top: -99999999px;
}
</style>
