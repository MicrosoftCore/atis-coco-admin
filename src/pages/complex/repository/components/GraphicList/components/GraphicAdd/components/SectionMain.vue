<template>
  <section class="graphic-add__warp">
    <div class="graphic-add__main">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item class="graphic-add__editor">
          <froala-editor v-model="form.Content" :options="options">
            <div slot="append">
              <el-form-item class="graphic-add__title" prop="Title">
                <el-input v-model="form.Title" placeholder="请在这里输入标题"></el-input>
              </el-form-item>
              <!-- <el-form-item class="graphic-add__author">
                <el-input v-model="form.CreateBy" placeholder="请输入作者"></el-input>
              </el-form-item>-->
            </div>
          </froala-editor>
        </el-form-item>
        <el-form-item class="graphic-add__edit">
          <!-- <el-form-item>
            <el-checkbox v-model="source">原文链接</el-checkbox>
            <el-input v-if="source" v-model="form.Source" size="small"></el-input>
          </el-form-item>-->
          <!-- <el-form-item label="开启评论">
            <el-radio v-model="form.IsAllowComment" label="1">允许</el-radio>
            <el-radio v-model="form.IsAllowComment" label="0">不允许</el-radio>
          </el-form-item>-->
          <el-form-item label="图文分类" prop="OfPlantId">
            <el-select
              size="small"
              v-model="form.OfPlantId"
              placeholder="请选择"
              :popperAppendToBody="false"
            >
              <el-option-group v-for="group in section" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="原创：未声明"></el-form-item>
          <el-form-item>
            <el-button size="small" plain>声明原创</el-button>
          </el-form-item>-->
        </el-form-item>
        <el-form-item class="graphic-add__plublish" prop="Summary">
          <div class="graphic-add__title">发布样式编辑</div>
          <div class="graphic-add__label">封面</div>
          <!-- <el-button size="small" disabled>从正文选择</el-button> -->
          <el-upload
            class="upload-demo"
            accept="image/jpg, image/jpeg, image/gif, image/png"
            :action="action"
            :headers="headers"
            :before-upload="onBeforeUpload"
            :file-list="form.CoverImageUrl.map(url => ({name: 'file', url}))"
            :on-remove="onRemove"
            :on-success="onSuccess"
            multiple
            drag
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <div class="graphic-add__label">摘要</div>
          <el-input type="textarea" placeholder="选填, 如不填写会默认抓取正文前54个字" v-model="form.Summary"></el-input>
          <div class="graphic-add__counter">{{ form.Summary ? form.Summary.length : '0' }}/120</div>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import JsCookie from 'js-cookie'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: {
        Content: '',
        Title: '',
        CreateBy: '',
        Source: '',
        OfPlantId: '',
        IsAllowComment: '1',
        CoverImageUrl: [],
        Summary: ''
      },
      rules: {
        Title: [
          { required: true, message: ' ', trigger: 'blur' },
          {
            min: 1,
            max: 64,
            message: '标题长度不能超过64字',
            trigger: 'change'
          }
        ],
        OfPlantId: [{ required: true, message: ' ', trigger: 'change' }],
        Summary: [
          { max: 120, message: '摘要长度不能超过120字', trigger: 'change' }
        ]
      },
      source: false,
      isAllowComment: true,
      content: ''
    }
  },

  computed: {
    ...mapState('common', {
      category: state => state.crops.category
    }),
    action () {
      return process.env.BASE_URL + this.$urls._('app.common.imageupload')
    },
    headers () {
      return {
        Authorization: `Bearer ${JsCookie.get('access_token')}`
      }
    },
    options () {
      return {
        videoEditButtons: ['videoRemove', '|', 'videoDisplay', 'videoAlign', 'videoSize'],
        videoManagerLoadParams: {
          ArticleClass: '2',
          Type: '2',
          Number: '1',
          Size: '9999999'
        }
        // videoUpload: false,
        // videoUploadMethod: 'POST',
        // videoUploadURL: this.videoUploadURL,
      }
    },
    section () {
      return this.category.map(({ TypeName, children }) => ({
        label: TypeName,
        options: children.map(({ Id, label }) => ({
          value: Id,
          label
        }))
      }))
    }
  },

  watch: {
    form: {
      handler (newForm) {
        this.$emit('onChange', newForm)
      },
      deep: true
    }
  },

  methods: {
    onBeforeUpload ({ type, size }) {
      let isImage = [
        'image/jpg',
        'image/jpeg',
        'image/gif',
        'image/png'
      ].includes(type)
      let isLimit = size / 1024 < 500
      if (!isImage) {
        this.$message({
          message: '温馨提示：上传文件只能是图片格式',
          type: 'warning'
        })
      }
      if (!isLimit) {
        this.$message({
          message: '温馨提示：上传文件大小不能超过 500kb',
          type: 'warning'
        })
      }
      return isImage && isLimit
    },
    onRemove ({ url }, fileList) {
      console.log(url)
      let { CoverImageUrl } = this.form
      this.form.CoverImageUrl = CoverImageUrl.filter(f => f !== url)
    },
    onSuccess ({ Data, IsSuccess }, file, fileList) {
      if (IsSuccess) {
        this.$message({
          message: '封面上传成功',
          type: 'success'
        })
        this.form.CoverImageUrl.push(Data)
      }
    },
    onValidate () {
      return new Promise(resolve => {
        let { Title, OfPlantId } = this.form
        if (!Title) {
          this.$message({
            message: '温馨提示：请输入标题',
            type: 'warning'
          })
        } else if (!OfPlantId) {
          this.$message({
            message: '温馨提示：请选择图文分类',
            type: 'warning'
          })
        } else {
          this.$refs.form.validate(valid => {
            if (valid) {
              resolve()
            }
          })
        }
      })
    }
  },

  mounted () {
    this.$on('onPatch', form => {
      form.CoverImageUrl = form.CoverImageUrl || ''
      form.CoverImageUrl = form.CoverImageUrl.split(',').filter(f => f)
      this.form = form
    })
    this.$on('onSave', () => {
      this.onValidate().then(_ => {
        this.$emit('onSubmit')
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~@/../element-variables.scss';
.graphic-add__warp {
  width: 100%;
  // padding: 0 210px 0 250px; // 打开右侧栏开启此选项
  padding: 0 0 0 250px;
  margin-bottom: 203px;
  box-sizing: border-box;
  font-size: 14px;

  .graphic-add__main {
    border-right: 1px solid #e7e7eb;
    border-left: 1px solid #e7e7eb;
    .graphic-add__editor {
      width: 100%;
      box-sizing: border-box;
      .el-form-item:last-child {
        /deep/ .el-form-item__content {
          border-bottom: 1px solid #e7e7eb;
          padding-bottom: 20px;
        }
      }
      /deep/ .el-form-item__content {
        line-height: unset;
        .graphic-add__title,
        .graphic-add__author {
          box-sizing: border-box;
          /deep/ .el-input__inner {
            margin: 4px 0;
            padding: 0;
            border: none;
            outline: none;
            &::-webkit-input-placeholder {
              color: #a9a9a9;
            }
          }
        }
        .graphic-add__title {
          padding: 20px 90px 0;
          border-top: 1px solid #e7e7eb;
          /deep/ .el-input__inner {
            height: 46px;
            line-height: 46px;
            font-size: 22px;
          }
        }
        .graphic-add__author {
          margin: 15px 90px 0;
          /deep/ .el-input__inner {
            height: 22px;
          }
        }
      }
    }

    .graphic-add__edit {
      width: 100%;
      padding: 30px 90px 60px;
      box-sizing: border-box;
      color: #353535;

      /deep/ .is-required {
        .el-form-item__label:before {
          display: none;
        }
      }
      /deep/ .el-form-item__content {
        .el-input,
        .el-radio:first-child {
          padding-left: 24px;
          box-sizing: border-box;
        }
        .el-checkbox__inner,
        .el-input__inner {
          border-radius: 0;
        }
        .el-button {
          width: 106px;
          margin-top: 10px;
          font-size: 14px;
          padding: 8px 15px;
          color: $--color-primary;
          border-color: $--color-primary;
        }
        /deep/ .el-scrollbar {
          width: 410px;
          max-height: 270px;
          .el-select-group__wrap {
            .el-select-group {
              line-height: 22.4px;
              padding-left: 20px;
              li {
                height: unset;
                line-height: 30px;
                display: inline-block;
                padding: 0 10px;
                span {
                  margin-right: 10px;
                }
              }
            }
          }
        }
      }
    }

    .graphic-add__plublish {
      width: 100%;
      // height: 336px;
      padding: 0 90px 40px;
      box-sizing: border-box;
      background-color: #fcfcfc;
      border-top: 1px solid #e7e7eb;

      .graphic-add__title {
        padding: 25px 0 15px;
        line-height: 38px;
      }

      .graphic-add__label {
        margin: 4px 0;
        line-height: 22px;
      }

      .graphic-add__counter {
        line-height: 22.4px;
        color: #8d8d8d;
        text-align: right;
        position: absolute;
        padding-top: 4px;
        right: 0;
      }

      .el-button {
        padding: 8px 22px;
        margin-bottom: 14px;
        font-size: 14px;
      }

      .upload-demo {
        width: 360px;
        margin-bottom: 14px;
        /deep/ .el-upload__tip {
          line-height: 20px;
        }
        /deep/ .el-upload-list__item-name {
          padding: 0;
        }
      }

      /deep/ .el-textarea__inner {
        height: 110px;
        border-radius: 0;
        &::-webkit-input-placeholder {
          font-family: '微软雅黑';
          color: #a3a3a3;
        }
      }
    }

    .el-form-item {
      margin: 0;
      /deep/ .el-form-item__error {
        font-size: 14px;
        line-height: 22.4px;
      }
    }
  }
}
.gray-theme {
  /deep/ &.fr-toolbar {
    border-top: none;
    background-color: #fcfcfc;
    padding: 10px;
  }

  /deep/ &.fr-toolbar.fr-top {
    border-radius: 0;
    box-shadow: 0 1px 0 0 #e7e7eb;
  }

  /deep/ &.fr-box.fr-basic {
    & .fr-wrapper {
      margin: 10px 90px 0;
      border-radius: 0;
      box-shadow: 0 1px 0 0 #e7e7eb;
      & .fr-element {
        padding: 0 0 16px;
      }
    }
    & .fr-counter {
      margin-right: 90px !important;
    }
  }
}
</style>
