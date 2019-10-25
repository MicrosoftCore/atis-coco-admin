<template>
<div v-if="orderInfo">
  <div class="top-info dd-clearfix dd-mb">
    <el-breadcrumb separator="/" class="dd-fl">
      <el-breadcrumb-item :to="{ path: '/' }">检测</el-breadcrumb-item>
      <el-breadcrumb-item>检测详情</el-breadcrumb-item>
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
          <span v-else-if="item.prop === 'CreateTime'">{{ orderInfo[item.prop] | moment("YYYY-MM-DD HH:mm:ss") }}</span>
          <span v-else-if="item.prop === 'BigType'">{{ orderInfo[item.prop] }} {{ orderInfo.SmallType }}</span>
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
      </div>
    </el-aside>
    <el-main style="padding:20px;">
      <div class="img-con" ref="images" v-viewer>
        <h3 class="c-title">作物图片<span class="dd-fr" v-if="orderInfo.Score">图片打分: {{ orderInfo.Score }}分</span></h3>
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
          </div>
        </div>
      </div>
      <div class="prescription-con">
        <div v-if="orderInfo.IsAfflict === true">
          <h3 class="c-title">处方笺</h3>
          <div v-for="(section, index) in prescriptionSection" :key="index">
            <div class="line" v-if="orderInfo[section.prop]">
              <label for="">{{ section.label }}:</label>
              <span>{{ orderInfo[section.prop] | separator }}</span>
            </div>
          </div>
        </div>
        <div class="line" v-if="orderInfo.ExpertAdvice">
            <label for="">专家点评:</label>
            <span>{{ orderInfo.ExpertAdvice }}</span>
        </div>
        <div class="line" v-if="orderInfo.ExpertAdviceTime">
            <label for="">下次建议检测时间:</label>
            <span>{{ orderInfo.ExpertAdviceTime }}天</span>
        </div>
        <div class="line dd-clearfix" v-if="orderInfo.ArticleList.length > 0">
            <label class="dd-fl" for="">推荐文章:</label>
            <div class="dd-fl article">
              <div v-for="(item, index) in orderInfo.ArticleList" :key="index" @click="onPreview(item)">
                {{ item.Title }}
              </div>
            </div>
        </div>
      </div>
    </el-main>
  </el-container>
  <element-video v-if="videoSrc" :src="videoSrc" @close-video="videoSrc = undefined">
  </element-video>
</div>
</template>

<script>
import ElementVideo from '@/pages/bench/initial/common/components/video'
import { cropAgeFormatter } from '@/pages/bench/initial/common/formatter'
export default {
  components: {
    ElementVideo
  },
  data () {
    return {
      videoSrc: undefined,
      orderInfo: undefined,
      farmerSection: [
        {label: '农户名字', prop: 'FarmerName'},
        {label: '手机号码', prop: 'Cellphone'},
        {label: '检测作物', prop: 'BigType'},
        {label: '品种', prop: 'CropName'},
        {label: '作物年龄', prop: 'CropAge'},
        {label: '地理位置', prop: 'CropPlace'},
        {label: '提交时间', prop: 'CreateTime'}
      ],
      imagesSection: [
        {label: '远景近景', prop: 'ImageListScene'},
        {label: '叶面', prop: 'ImageListLeafSurface'},
        {label: '土壤/根系', prop: 'ImageListSoilRoots'},
        {label: '用药/肥', prop: 'ImageListPharmacy'},
        {label: '其他', prop: 'ImageListOther'}
      ],
      prescriptionSection: [
        {label: '发育阶段', prop: 'DevelopmentalStage'},
        {label: '受害部位', prop: 'SufferingParts'},
        {label: '主要症状', prop: 'MainSymptoms'},
        {label: '防治要点', prop: 'PreventionSuggestion'}
      ]
    }
  },
  methods: {
    back () {
      this.$router.push({
        name: 'expert-history-index'
      })
    },
    getOrderInfo () {
      let {
        query: {
          Id
        }
      } = this.$route

      if (Id) {
        this.$axios.get(this.$urls._('bench.detection.getfinaldetail'), {
          params: {
            detectionOrderID: Id
          }
        }).then(resp => {
          this.orderInfo = resp
        })
      }
    },
    onPreview ({ Id }) {
      this.$router.push({
        name: 'complex-article-preview',
        query: {
          Id
        }
      })
    }
  },
  filters: {
    separator: (value = '') => value.split('|').join('、'),
    cropAgeFormatter
  },
  created () {
    this.getOrderInfo()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
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
    width: 70px;
    height: 70px;
    margin-right: 5px;
    margin-bottom: 5px;
    img, video {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }
}
.grade-bar {
  height: 50px;
  line-height: 50px;
  text-align: center;
  .el-slider {
    width: 300px;
    float: left;
    margin-left: 180px;
  }
  span {
    float: left;
    margin-left: 20px;
    line-height: 40px;
  }
}
.prescription-con {
  label {
    margin-right: 20px;
  }
}
.btns {
  text-align: center;
  margin-top: 50px;
  .el-button {
    width: 110px;
  }
}
.article {
  cursor: pointer;
}
</style>