<template>
<div v-if="orderInfo">
  <div class="top-info dd-clearfix dd-mb">
    <el-breadcrumb separator="/" class="dd-fl">
      <el-breadcrumb-item :to="{ path: '/' }">检测</el-breadcrumb-item>
      <el-breadcrumb-item>专家终检</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button size="small" class="dd-fr" @click="back">返回列表</el-button>
  </div>
  <el-container style="border: 1px solid #eee; background-color:#fff;height:calc(100% - 60px);">
    <el-aside width="300px" style="border-right: 1px solid #eee;padding:20px;">
      <div class="base-info dd-clearfix">
        <div class="top-line">
          <!-- <img class="userimg" src="http://www.qqma.com/imgpic2/cpimagenew/2018/4/5/6e1de60ce43d4bf4b9671d7661024e7a.jpg" alt=""> -->
          <em>检测单号: {{ orderInfo.DetectionOrderNumber }}</em>
        </div>
        <div class="line" v-for="(item, index) in farmerSection" :key="index">
          <label for="">{{ item.label }}:</label>
          <span v-if="item.prop === 'CropAge'">{{ orderInfo[item.prop] | cropAgeFormatter }}</span>
          <el-input v-else-if="item.prop === 'CropName'" class="dd-ml" placeholder="请输入品种名称" v-model="orderInfo.CropName"></el-input>
          <span v-else-if="item.prop === 'CreateTime'">{{ orderInfo[item.prop] | moment("YYYY-MM-DD HH:mm:ss") }}</span>
          <el-cascader
            v-else-if="item.prop === 'BigType'"
            expand-trigger="hover"
            style="margin-bottom: 10px;"
            :options="section"
            v-model="cropTypeId"
            @change="onTypeChange">
          </el-cascader>
          <span v-else>{{ orderInfo[item.prop] }}</span>
        </div>
        <div class="weather" v-if="orderInfo.WeatherList.length">
          <h4>目前及未来天气:</h4>
          <div class="item" v-for="(item, index) in orderInfo.WeatherList" :key="index">
            <h5>时间: {{ item.CreateTime | moment("YYYY-MM-DD HH:mm:ss") }}</h5>
            <h5>城市: {{ item.City }}</h5>
            <h5>湿度: {{ item.Humidity }}</h5>
            <h5>温度: {{ item.Temperature }}</h5>
            <h5>天气: {{ item.Weather }}</h5>
            <h5>风速: {{ item.WindSpeed }}</h5>
          </div>
        </div>
        <div class="recentCheck dd-mt-30" v-if="orderInfo.RecentlyDetectionList">
          <h4>最近检测情况:</h4>
          <div class="item" v-for="(item, index) in orderInfo.RecentlyDetectionList" :key="index">
            <h5>{{ item.CreateTime | moment("YYYY-MM-DD HH:mm:ss") }}</h5>
            <h5>{{ item.DetectionName }}</h5>
            <h5>{{ item.DetectionOrderNumber }}</h5>
            <el-button type="primary" size="mini" @click.native="see(item.DetectionOrderId)">查看</el-button>
          </div>
        </div>
      </div>
    </el-aside>
    <el-main style="padding:20px;height: unset;">
      <div class="img-con" ref="images" v-viewer>
        <h3 class="c-title">作物图片</h3>
        <div v-for="(section, index) in imagesSection" :key="index">
          <div class="item" v-if="orderInfo[section.prop].length">
            <h4>{{ section.label }} ({{ orderInfo[section.prop].length }})</h4>
            <ul class="images img-list dd-clearfix">
              <li class="img-item" v-for="(media, index) in orderInfo[section.prop]" :key="index">
                <img v-if="media.Type === 1" :src="media.ImageUrl" alt="">
                <video v-else-if="media.Type === 2" :src="media.ImageUrl"
                @click="videoSrc = media.ImageUrl">
                  您的浏览器不支持 video 标签。
                </video>
              </li>
            </ul>
            <div class="grade-bar">
              <el-slider v-model="score[section.score]"></el-slider>
              <span>{{score[section.score]}}分</span>
            </div>
          </div>
        </div>
        <div class="grade-bar">
          <span>图片打分 (平均分: {{ average }}分)</span>
        </div>
      </div>
      <div class="prescription-con" ref="images" v-viewer>
        <h3 class="c-title">处方笺</h3>
        <div class="single-con dd-mt-30">
          <span class="title">是否受害</span>
          <el-radio v-model="submitForm.IsAfflict" :label="true" border size="medium">是</el-radio>
          <el-radio v-model="submitForm.IsAfflict" style="margin-left:100px;" :label="false" border size="medium">否</el-radio>
        </div>
        <div v-if="submitForm.IsAfflict === true">
          <div class="single-con" v-for="(section, index) in prescriptionSection" :key="index">
            <span class="title">{{ section.label }}</span>
            <el-checkbox-group size="medium" v-model="prescription[section.prop]">
              <el-checkbox 
                v-for="item in orderInfo[section.prop]"
                :key="item.Key"
                :label="item.Key">
                {{ item.Value }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="line dd-mt">
          <span for="">专家点评:</span>
          <el-input
            type="textarea"
            :rows="4"
            v-model="submitForm.ExpertAdvice"
            placeholder="请输入内容">
          </el-input>
        </div>
        <div class="line dd-mt">
          <span for="">推荐文章:</span>
          <div v-for="(item, index) in chosen" :key="index">
            {{ item.Title }}
            <span class="deletext" @click="onDelete(item)">删除</span>
          </div>
          <el-button v-if="graphics.length == 0" plain size="small" @click="$refs.GraphicChoose.$emit('onOpen')">选择文章</el-button>
          <el-button v-if="videos.length == 0" plain size="small" @click="$refs.VideoChoose.$emit('onOpen')">选择视频</el-button>
        </div>
        <div class="line dd-mt">
          <span>下次建议检测时间:</span>
          <el-input class="dd-ml" v-model="submitForm.ExpertAdviceTime">
            <template slot="append">天</template>
          </el-input>
        </div>
      </div>
      <div class="btns">
        <el-button type="primary" @click.native="submit()" :disabled="submitting" :loading="submitting">确认</el-button>
      </div>
    </el-main>
  </el-container>
  <element-video v-if="videoSrc" :src="videoSrc" @close-video="videoSrc = undefined">
  </element-video>
  <GraphicChoose ref="GraphicChoose" @onConfirm="onGraphicChoose"/>
  <VideoChoose ref="VideoChoose" @onConfirm="onVideoChoose"/>
</div>
</template>

<script>
import GraphicChoose from '@/pages/push/article/components/GraphicMsg/GraphicChoose'
import VideoChoose from '@/pages/push/article/components/VideoMsg/VideoChoose'
import ElementVideo from '@/pages/bench/initial/common/components/video'
import { mapState } from 'vuex'
import { cropAgeFormatter } from '@/pages/bench/initial/common/formatter'
export default {
  components: {
    GraphicChoose,
    VideoChoose,
    ElementVideo
  },
  data () {
    return {
      visible: false,
      videoSrc: undefined,
      orderInfo: undefined,
      submitting: false,
      score: {
        /** 分数项 */
      },
      prescription: {
        /** 处方笺 */
      },
      submitForm: {
        CropName: undefined,
        IsAfflict: false,
        ExpertAdvice: undefined,
        ExpertAdviceTime: undefined
      },
      farmerSection: [
        {label: '农户名字', prop: 'FarmerName'},
        {label: '手机号码', prop: 'Cellphone'},
        {label: '检测作物', prop: 'BigType'},
        {label: '品种', prop: 'CropName'},
        {label: '作物年龄', prop: 'CropAge'},
        {label: '地理位置', prop: 'CropPlace'},
        {label: '提交时间', prop: 'CreateTime'},
        {label: '备注', prop: 'Remark'}
      ],
      imagesSection: [
        {label: '远景近景', prop: 'ImageListScene', score: 'ScoreScene'},
        {label: '叶面', prop: 'ImageListLeafSurface', score: 'ScoreLeafSurface'},
        {label: '土壤/根系', prop: 'ImageListSoilRoots', score: 'ScoreSoilRoots'},
        {label: '用药/肥', prop: 'ImageListPharmacy', score: 'ScorePharmacy'},
        {label: '其他', prop: 'ImageListOther', score: 'ScoreOther'}
      ],
      prescriptionSection: [
        {label: '发育阶段', prop: 'DevelopmentalStage'},
        {label: '受害部位', prop: 'SufferingParts'},
        {label: '主要症状', prop: 'MainSymptoms'},
        {label: '防治要点', prop: 'PreventionSuggestion'}
      ],
      videos: [],
      graphics: []
    }
  },
  computed: {
    ...mapState('common', {
      catalog: state => state.crops.catalog,
      section: state => state.crops.category
    }),
    cropTypeId: {
      get () {
        let cropTypeId = []
        this.bigType && (cropTypeId[0] = this.bigType.Id)
        this.smallType && (cropTypeId[1] = this.smallType.Id)
        return cropTypeId
      },
      set (val) {
        this.orderInfo.BigType = Object.values(this.catalog).find(
          item => item.Id === val[0]
        ).TypeName
        this.orderInfo.SmallType = Object.values(this.catalog).find(
          item => item.Id === val[1]
        ).TypeName
      }
    },
    bigType () {
      return Object.values(this.catalog).find(item => item.TypeName === this.orderInfo.BigType)
    },
    smallType () {
      return Object.values(this.catalog).find(item => item.TypeName === this.orderInfo.SmallType)
    },
    average () {
      let score = Object.values(this.score)
      let average = score.reduce((sum, v) => sum + v, 0) / score.length
      return Math.round(Number(average))
    },
    chosen () {
      return [
        ...this.graphics,
        ...this.videos
      ]
    }
  },
  methods: {
    onGraphicChoose (items) {
      this.graphics = items
    },
    onVideoChoose (items) {
      this.videos = items
    },
    onDelete (item) {
      console.log(item)
      let { Type } = item
      if (Type === 1) {
        this.graphics = this.graphics.filter(f => f !== item)
      }
      if (Type === 2) {
        this.videos = this.videos.filter(f => f !== item)
      }
    },
    onTypeChange (val) {
      this.$axios.get(this.$urls._('bench.detection.getrecentlylist', {
        detectionOrderID: this.orderInfo.DetectionOrderId,
        cropTypeId: this.smallType.Id
      }), null).then(({ RecentlyDetectionList }) => {
        this.orderInfo.RecentlyDetectionList = RecentlyDetectionList
      })
    },
    back () {
      this.$router.push({
        name: 'bench-final-index'
      })
    },
    getOrderInfo () {
      let {
        query: {
          Id
        }
      } = this.$route

      if (Id) {
        this.$axios.get(this.$urls._('bench.detection.getfinaloperate'), {
          params: {
            detectionOrderID: Id
          }
        }).then(resp => {
          this.orderInfo = resp
        })
      }
    },
    setPrescription () {
      this.prescriptionSection.forEach(item => {
        this.$set(this.prescription, item.prop, [])
      })
    },
    see (Id) {
      let { href } = this.$router.resolve({
        name: 'bench-final-info',
        query: {
          Id
        }
      })
      window.open(href, '_blank')
    },
    submit () {
      let {
        CropName,
        DetectionOrderId
      } = this.orderInfo

      let {
        DevelopmentalStage,
        SufferingParts,
        MainSymptoms,
        PreventionSuggestion
      } = this.prescription

      let {
        // CropName,
        IsAfflict,
        ExpertAdvice,
        ExpertAdviceTime
      } = this.submitForm

      let ArticleIdList = Object.values(this.chosen).map(i => i.Id)

      if (!this.submitting) {
        this.submitting = true
        this.$axios.post(this.$urls._('bench.detection.submitfinalcheck'), {
          CropName,
          // Status: null,
          // StatusName: null,
          // StatusStep: null,
          // StatusStepName: null,
          // StatusUpdateTime: null,
          ExpertAdvice,
          ExpertAdviceTime,
          DetectionOrderId,
          // IsValid: null,
          // ScoreStatusName: null,
          // CreateTime: null,
          CropTypeId: this.smallType.Id,
          Score: this.average,
          ...this.score,
          IsAfflict,
          Etap: DevelopmentalStage.join('|'),
          Vulnerable: SufferingParts.join('|'),
          Symptom: MainSymptoms.join('|'),
          Suggestion: PreventionSuggestion.join('|'),
          ArticleIdList
        }).then(({ DetectionOrderId }) => {
          this.submitting = false
          if (DetectionOrderId) {
            this.$notify({
              type: 'success',
              title: '温馨提示',
              message: '终检单提交成功'
            })
            this.back()
          }
        })
      }
    }
  },
  filters: {
    cropAgeFormatter
  },
  created () {
    this.setPrescription()
    this.getOrderInfo()
  }
}
</script>

<style lang="scss" scoped>
.deletext {
  color: #0492C4;
  margin-left: 20px;
}
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: hidden;
}
.el-aside,
.el-main {
  overflow: auto !important;
  box-sizing: border-box;
}
h4,
h5 {
  margin-bottom: 0;
}
em {
  font-style: initial;
}
.el-input {
  width: 130px;
}
.top-line {
  font-size: 16px;
  margin-bottom: 10px;
  em {
    font-weight: bold;
    vertical-align: middle;
  }
  .userimg {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    vertical-align: middle;
    margin-right: 10px;
  }
}
.line {
  font-size: 16px;
  line-height: 34px;
}
label {
  color: #83868c;
}
.recentCheck,
.weather {
  h4{
    margin-bottom: 15px;
  }
  h5 {
    font-size: 16px;
    font-weight: normal;
    margin-top: 0;
    color: #83868c;
  }
  .el-button {
    float: right;
    position: relative;
    bottom: 12px;
  }
  .item {
    margin-top: 10px;
    margin-bottom: 15px;
  }
}
.c-title {
  font-size: 18px;
  line-height: 1;
  color: #999999;
  span {
    font-size: 16px;
  }
}
.img-con {
  h4 {
    font-weight: normal;
    margin-bottom: 20px;
  }

  .img-list {
    padding-left: 0;
    overflow-y: visible;
    margin: 0;
  }
  .item {
    padding-left: 20px;
    margin-bottom: 30px;
  }
  .img-item {
    cursor: pointer;
    position: relative;
    float: left;
    width: 80px;
    height: 80px;
    margin-right: 5px;
    margin-bottom: 5px;
    img, video {
      width: 100%;
      height: 100%;
      // border-radius: 4px;
    }
  }
}
.grade-bar {
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-top: 10px;
  .el-slider {
    width: 300px;
    float: left;
    margin-left: 180px;
    transform: scale(1.2, 1.2);
  }
  span {
    float: left;
    margin-left: 40px;
    line-height: 40px;
  }
}
.prescription-con {
  .single-con {
    border: 1px solid #dddddd;
    position: relative;
    padding: 30px 30px 0;
    margin-top: 50px;
  }
  .title {
    position: absolute;
    display: inline-block;
    background-color: #fff;
    padding: 10px 20px;
    left: 5px;
    top: -20px;
    margin: 0;
    color: #333;
    font-weight: 400;
  }
  .el-radio {
    margin-bottom: 20px;
  }
  .el-checkbox {
    width: 180px;
    margin-bottom: 20px;
    transform: scale(1.2, 1.2);
  }
  .el-checkbox + .el-checkbox {
    margin-left: 0;
  }
}
.btns {
  text-align: center;
  margin-top: 50px;
  .el-button {
    width: 110px;
  }
}
</style>