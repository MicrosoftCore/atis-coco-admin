<template>
  <div class="video-add">
    <h2>添加视频</h2>
    <section class="video-add__panel">
      <el-form ref="form" label-width="100px" :model="form" :rules="rules">
        <el-form-item label="上传视频" prop="MSArticleVideoUploadTempId">
          <div class="video-add__upload">
            <div class="video-add__tip">
              <span>建议视频不超过20M，超过20M的视频可至</span>
              <a href="http://v.qq.com/u/upload.html" target="_blank">
                <el-button type="text">腾讯视频</el-button>
              </a>
              <span>上传后添加，也可通过添加视频详情页链接以及公众号文章链接插入视频，视频时长不少于1秒，不多于10小时，支持大部分主流</span>
              <el-popover placement="bottom" width="354" trigger="hover">
                <ul class="video-add__support">
                  <li v-for="(media, index) in supportMedia" :key="index">
                    <span class="weui-desktop-tips">{{ media.label }}：</span>
                    {{ media.type }}
                  </li>
                </ul>
                <el-button type="text" slot="reference">视频格式</el-button>
              </el-popover>
            </div>
            <el-upload
              ref="upload"
              :accept="accept.join(',')"
              :action="action"
              :headers="headers"
              :before-upload="onBeforeUpload"
              :file-list="fileList"
              :on-remove="onRemove"
              :on-success="onSuccess"
              :limit="1"
            >
              <el-button slot="trigger" size="medium" type="primary">上传视频</el-button>
            </el-upload>
            <span class="el-upload__tip" v-if="form.MSArticleVideoUploadTempId">视频上传成功</span>
          </div>
        </el-form-item>
        <el-form-item label="封面">
          <div class="video-add__tip">
            <span>视频转码完成后可以设置封面图</span>
            <el-popover
              popper-class="video-add__cover"
              placement="bottom"
              width="274"
              trigger="hover"
            >
              <span>视频审核完成后，进入编辑页面可以选择视频内的画面作为视频封面。如果不作选择，默认封面为视频的第一帧。</span>
              <icon-svg name="问号" slot="reference"></icon-svg>
            </el-popover>
          </div>
        </el-form-item>
        <el-form-item label="标题" prop="Title">
          <el-input size="medium" placeholder="" v-model="form.Title">
            <span slot="suffix">{{ form.Title.length }}/21</span>
          </el-input>
          <div class="video-add__tip">
            <span>标题将展示在相关播放页面，建议填写清晰、准确、生动的标题</span>
          </div>
        </el-form-item>
        <el-form-item label="视频介绍" prop="Summary">
          <el-input rows="6" type="textarea" v-model="form.Summary"></el-input>
          <div class="video-add__tip">
            <span class="video-add__counter">{{ form.Summary ? form.Summary.length : '0' }}/120</span>
            <span>介绍语将展示在相关播放页面，建议填写简洁明确、有信息量的内容</span>
          </div>
        </el-form-item>
        <el-form-item label="分类" prop="OfPlantId">
          <el-select
            size="medium"
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
        <!-- <el-form-item label="标签">
          <el-input size="medium" placeholder="">
            <div slot="prefix" class="video-add__tags">
              <el-tag
                v-for="tag in tags"
                :key="tag.name"
                :type="tag.type"
                size="small"
                closable>
                {{tag.name}}
              </el-tag>
            </div>
          </el-input>
          <div class="video-add__tip">
            <span>写准确的标签有助于视频被推荐，不同标签用回车分开，最多填写5个</span>
          </div>
        </el-form-item>-->
        <el-form-item label="留言">
          <div class="video-add__tip">
            <span>每次勾选后，视频必须经过视频消息（非图文消息）群发，读者才能留言</span>
          </div>
          <div class="video-add__msg">
            <el-checkbox v-model="form.IsAllowComment">开启留言</el-checkbox>
            <div v-if="form.IsAllowComment">
              <el-radio v-model="radio" label="1">所有人可留言</el-radio>
              <el-radio v-model="radio" label="2">仅关注后可留言</el-radio>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="video-add__submit">
            <div>不得上传未经授权的他人作品，以及色情、反动等违法视频。查看
              <el-popover
                popper-class="video-add__process"
                placement="top"
                width="454"
                trigger="hover"
              >
                <ul>
                  <li>流程：</li>
                  <li>1.上传：将视频上传至服务器，需视频和文案资料完成才能完成上传。</li>
                  <li>2.转码：上传成功后服务器将视频转码成播放器可识别的格式。</li>
                  <li>3.审核：转码完成后视频进入内容审核阶段。</li>
                  <li>4.可用：只有审核通过的视频素材才可以被使用。</li>
                </ul>
                <a href="javacript:void(0);" slot="reference">视频处理流程</a>
              </el-popover>
            </div>
            <div>
              <el-checkbox v-model="hasAgree">我已阅读并同意</el-checkbox>
              <a href="http://v.qq.com/help/help_agreement.html" target="_blank">《腾讯视频上传服务规则》</a>
            </div>
            <div>
              <el-button type="primary" size="medium" @click="onSubmit" :disabled="!hasAgree">保存</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </section>
    <p>Copyright © 2012-2018 Trunk. All Rights Reserved.</p>
  </div>
</template>

<script>
import JsCookie from 'js-cookie'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: {
        Title: '',
        Content: '',
        Summary: '',
        OfPlantId: '',
        IsAllowComment: true,
        MSArticleVideoUploadTempId: ''
      },
      fileList: [],
      rules: {
        MSArticleVideoUploadTempId: [{ required: true, message: ' ', trigger: 'change' }],
        Title: [
          { required: true, message: '请正确输入视频标题', trigger: 'blur' },
          { min: 1, max: 21, message: '请正确输入视频标题', trigger: 'change' }
        ],
        Summary: [{ min: 1, max: 120, message: '请正确输入视频简介', trigger: 'change' }],
        OfPlantId: [{ required: true, message: ' ', trigger: 'change' }]
      },
      hasAgree: false,
      radio: '1',
      tags: Array(3)
        .fill()
        .map((_, i) => ({
          name: '标签' + i,
          type: 'info'
        })),
      mediaType: {
        '1': 'mp4、flv、f4v、webm',
        '2': 'm4v、mov、3gp、3g2',
        '3': 'rm、rmvb',
        '4': 'wmv、avi、asf',
        '5': 'mpg、mpeg、mpe、ts',
        '6': 'div、dv、divx',
        '7': 'vob、dat、mkv、swf、lavf、cpk、dirac、ram、qt、fli、flc、mod',
        '8': 'mp3、aac、ac3、wav、m4a、ogg'
      }
    }
  },

  computed: {
    ...mapState('common', {
      category: state => state.crops.category
    }),
    ...mapState('d2admin/user', ['info']),
    accept () {
      return Object.values(this.mediaType)
        .join(',')
        .replace(/、/g, ',')
        .split(',')
        .map(i => '.' + i)
    },
    action () {
      return process.env.BASE_URL + this.$urls._('app.common.videoupload')
    },
    headers () {
      return {
        Authorization: `Bearer ${JsCookie.get('access_token')}`
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
    },
    supportMedia () {
      return [
        { label: '常见在线流媒体格式', type: this.mediaType[1] },
        { label: '移动设备格式', type: this.mediaType[2] },
        { label: 'RealPlayer', type: this.mediaType[3] },
        { label: '微软格式', type: this.mediaType[4] },
        { label: 'MPEG 视频', type: this.mediaType[5] },
        { label: 'DV格式', type: this.mediaType[6] },
        { label: '其他格式', type: this.mediaType[7] },
        { label: '主流音频格式', type: this.mediaType[8] }
      ]
    }
  },

  methods: {
    onBeforeUpload ({ name, type, size }) {
      let isVideo = this.accept.includes(/\.\w+$/.exec(name)[0])

      if (!isVideo) {
        this.$message({
          message: '暂不支持该格式',
          type: 'warning'
        })
      }
      return isVideo
    },
    onRemove (file, fileList) {
      this.form.MSArticleVideoUploadTempId = ''
    },
    onSuccess ({ Data, IsSuccess, ResponseDes = '' }, file, fileList) {
      if (IsSuccess) {
        this.form.MSArticleVideoUploadTempId = Data
        this.$message({
          message: '视频上传成功',
          type: 'success'
        })
      } else {
        this.fileList = []
        this.$message({
          message: ResponseDes,
          type: 'error'
        })
      }
    },
    onSubmit () {
      this.onValidate().then(_ => {
        let { ExpertId } = this.info

        this.$axios
          .post(this.$urls._('complex.article.add'), {
            ...this.form,
            CreateBy: ExpertId,
            Source: '2',
            Type: '2'
          })
          .then(result => {
            if (result) {
              this.$notify({
                title: '温馨提示',
                message: '成功添加视频',
                type: 'success'
              })
              this.$router.back(-1)
            }
          })
      })
    },
    onValidate () {
      return new Promise(resolve => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve()
          } else {
            let { MSArticleVideoUploadTempId, Title, OfPlantId } = this.form
            if (!MSArticleVideoUploadTempId) {
              this.$message({
                message: '请上传视频',
                type: 'warning'
              })
            } else if (!Title) {
              this.$message({
                message: '请正确输入视频标题',
                type: 'warning'
              })
            } else if (!OfPlantId) {
              this.$message({
                message: '分类不能为空',
                type: 'warning'
              })
            }
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-add {
  max-width: 1200px;
  margin: 0 auto;
  h2 {
    font-size: 26px;
    font-weight: 400;
    line-height: 26px;
    margin: 0 0 40px;
  }
  .video-add__panel {
    width: 100%;
    padding: 40px;
    background: #ffffff;
    box-sizing: border-box;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
    .el-form {
      max-width: 800px;
      margin: 0 auto;
      .el-form-item {
        position: relative;
        margin-bottom: 30px;
        .video-add__counter {
          position: absolute;
          right: 5px;
          bottom: 40px;
          color: #c0c4cc;
        }
        /deep/ .el-form-item__content {
          .el-form-item__error {
            font-size: 14px;
            position: unset;
            line-height: 22.4px;
          }
        }
        &:last-child {
          margin-bottom: 0;
          /deep/ .el-form-item__content {
            margin-left: 0 !important;
          }
        }
        /deep/ .el-form-item__label {
          color: #353535;
          line-height: 22.4px;
          padding-right: 30px;
        }
        /deep/ .el-textarea__inner {
          height: 150px;
          margin-bottom: 10px;
          border-radius: 3px;
        }
        /deep/ .el-input__inner {
          border-radius: 3px;
        }
        /deep/ .el-scrollbar {
          width: 410px;
          max-height: 270px;
          .el-select-group__wrap {
            // .el-select-group__title {
            //   color: #9A9A9A;
            // }
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
        .el-input {
          margin-bottom: 10px;
          .video-add__tags {
            height: 40px;
            display: flex;
            align-items: center;
            .el-tag {
              border-radius: 0;
              margin-right: 7px;
            }
          }
        }
        .el-select {
          /deep/ .el-input__inner {
            width: 168px;
            height: 38px;
            line-height: 38px;
          }
        }
        .el-checkbox {
          line-height: 22.4px;
          margin: 15px 0 10px;
        }
      }
      .video-add__tip {
        font-size: 14px;
        color: #9a9a9a;
        line-height: 22.4px;
        position: relative;
        .el-button--text {
          padding: 0;
        }
        svg {
          width: 18px;
          height: 18px;
          margin-left: 10px;
          position: absolute;
          top: 2px;
        }
      }
      .video-add__upload {
        .el-upload {
          .el-button {
            width: 102px;
            margin-top: 10px;
          }
        }
        .el-upload__tip {
          font-size: 14px;
          color: #8d8d8d;
        }
        /deep/ .el-upload-list {
          width: 300px;
          line-height: unset;
          .el-upload-list__item-name {
            padding: 0;
          }
        }
      }
      .video-add__msg {
        line-height: 22.4px;
        div {
          height: 60px;
          padding-left: 30px;
          display: flex;
          align-items: center;
          background-color: #f6f8f9;
        }
      }
      .video-add__submit {
        line-height: 22.4px;
        margin-top: 40px;
        padding-top: 24px;
        box-sizing: border-box;
        border-top: 1px solid #e4e8eb;
        .el-button {
          width: 100px;
        }
        /deep/ div {
          text-align: center;
          .el-checkbox {
            margin-bottom: 15px;
          }
        }
        a {
          text-decoration: none;
          color: #576b95;
        }
      }
    }
  }
  p {
    color: #9a9a9a;
    font-size: 12px;
    line-height: 19.2px;
    margin: 110px 0 20px;
  }
}
.video-add__support {
  margin: 0;
  padding: 0;
  padding: 12px;
  line-height: 22.4px;
  color: #353535;
  .weui-desktop-tips {
    color: #9a9a9a;
  }
}
.video-add__cover {
  span {
    display: inline-block;
    margin: 12px;
    line-height: 22.4px;
  }
}
.video-add__process {
  ul {
    margin: 0;
    padding: 10px;
    li {
      line-height: 22.4px;
    }
  }
}
.el-select-group__wrap:not(:last-of-type) {
  padding-bottom: 0;
  &::after {
    height: 0;
  }
}
</style>
