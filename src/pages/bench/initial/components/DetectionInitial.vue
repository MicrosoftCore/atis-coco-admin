<template>
<div v-if="orderInfo">
  <div class="top-info dd-clearfix dd-mb">
    <el-breadcrumb separator="/" class="dd-fl">
      <el-breadcrumb-item :to="{ path: '/' }">检测</el-breadcrumb-item>
      <el-breadcrumb-item>农资初检</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button size="small" class="dd-fr" @click="back">返回列表</el-button>
  </div>
  <el-container style="border: 1px solid #eee; background-color:#fff;height:calc(100% - 60px);">
    <el-aside width="300px" style="border-right: 1px solid #eee;padding:30px;">
      <div class="base-info dd-clearfix">
        <div class="top-line">
          <!-- <img class="userimg" src="http://www.qqma.com/imgpic2/cpimagenew/2018/4/5/6e1de60ce43d4bf4b9671d7661024e7a.jpg" alt=""> -->
          <em>检测单号： {{ orderInfo.DetectionOrderNumber }}</em>
        </div>
        <div class="line" v-for="(item, index) in farmerSection" :key="index">
            <label for="">{{ item.label }}:</label>
            <span v-if="item.prop === 'CropAge'">{{ orderInfo[item.prop] | cropAgeFormatter }}</span>
            <span v-else-if="item.prop === 'CreateTime'">{{ orderInfo[item.prop] | moment("YYYY-MM-DD HH:mm:ss") }}</span>
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
    <el-main style="padding:20px;">
      <div class="info-con">
        
        <div class="type-list">
          <label for="">所属类目:</label>
          <ul class="dd-clearfix">
            <li v-for="(item, index) in section" :key="index" :class="{'curr': item.Id === sectionId}"
            @click="setSection(item)">{{ item.TypeName }}</li>
          </ul>
        </div>
        <div class="type-list" v-if="series">
          <label for="">所属科系:</label>
          <ul class="dd-clearfix">
            <li v-for="(item, index) in series" :key="index" :class="{'curr': item.Id === seriesId}"
            @click="setSeries(item)">{{ item.TypeName }}</li>
          </ul>
        </div>
        <div class="line" v-if="sectionName">
          <label for="">作物名称:</label>
          <span class="curr">{{ sectionName }}</span>
          <span class="curr">{{ seriesName }}</span>
          <el-input v-model="cropName" placeholder="请输入种类"></el-input>
        </div>
      </div>
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
          </div>
        </div>
      </div>
      <div class="btns">
        <el-button class="dd-mr-50" @click.native="confirm(4)" :disabled="submitting" :loading="submitting">不通过</el-button>
        <el-button type="primary" @click.native="confirm(3)" :disabled="submitting" :loading="submitting">通过</el-button>
      </div>
    </el-main>
  </el-container>
  <element-video v-if="videoSrc" :src="videoSrc" @close-video="videoSrc = undefined">
  </element-video>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { cropAgeFormatter } from '@/pages/bench/initial/common/formatter'
import ElementVideo from '@/pages/bench/initial/common/components/video'
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
        {label: '作物年龄', prop: 'CropAge'},
        {label: '地理位置', prop: 'CropPlace'},
        {label: '拍摄时间', prop: 'CreateTime'},
        {label: '备注', prop: 'Remark'}
      ],
      imagesSection: [
        {label: '远景近景', prop: 'ImageListScene'},
        {label: '叶面', prop: 'ImageListLeafSurface'},
        {label: '土壤/根系', prop: 'ImageListSoilRoots'},
        {label: '用药/肥', prop: 'ImageListPharmacy'},
        {label: '其他', prop: 'ImageListOther'}
      ],
      cropName: undefined,
      sectionId: undefined,
      sectionName: undefined,
      seriesId: undefined,
      seriesName: undefined,
      submitting: false
    }
  },
  computed: {
    ...mapState('common', {
      /**
       * @description 植物分类
       * @type 植物分为
       * 界（Category）、门 Divisio或（Phylum）、 纲 Classis （class）、
       * 目Ordo （order）、 科Familia （Family）、族Tribus（Tribe）、
       * 属 Genus （Genus）、组Sectio（Section）、系Series（Series）、种Species（Species）、
       * 变种Varietas（Variety）、变形Forma（Form）
       * @this 这里的命名取"组（Section）"和"系（Series）"
       */
      section: state => state.crops.category
    }),
    series () {
      if (this.sectionId) {
        return this.section.find((f, i) => f.Id === this.sectionId).children
      }
    }
  },
  methods: {
    back () {
      this.$router.push({
        name: 'bench-initial-index'
      })
    },
    getOrderInfo () {
      let {
        query: {
          Id
        }
      } = this.$route
      if (Id) {
        this.$axios.get(this.$urls._('bench.detection.getsingle'), {
          params: {
            detectionOrderID: Id
          }
        }).then(resp => {
          this.orderInfo = resp
        })
      }
    },
    setSection ({Id, TypeName}) {
      this.sectionId = Id
      this.sectionName = TypeName
      this.setSeries({
        Id: undefined,
        TypeName: undefined
      })
    },
    setSeries ({Id, TypeName}) {
      this.seriesId = Id
      this.seriesName = TypeName
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
    verify () {
      return new Promise((resolve, reject) => {
        if (this.sectionId && this.seriesId) {
          resolve()
        } else {
          reject(new Error('请选择作物分类'))
        }
      })
    },
    confirm (ApproveFlag) {
      if (ApproveFlag === 3) {
        this.verify()
          .then(_ => {
            this.submit(ApproveFlag)
          })
          .catch(({message}) => {
            this.$message({
              message,
              type: 'warning'
            })
          })
      } else {
        this.submit(ApproveFlag)
      }
    },
    submit (ApproveFlag) {
      if (!this.submitting) {
        this.submitting = true
        this.$axios.post(this.$urls._('bench.detection.detectionfirst'), {
          ApproveFlag,
          DetectionIdList: [this.orderInfo.DetectionOrderId],
          CropTypeId: this.seriesId,
          CropName: this.cropName
        }).then(result => {
          this.submitting = false
          if (result === 1) {
            this.$notify({
              type: 'success',
              title: '温馨提示',
              message: '初检单提交成功'
            })
            this.back()
          }
        }).catch(e => {
          this.back()
        })
      }
    }
  },
  filters: {
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
.info-con {
  label {
    display: inline-block;
    font-size: 16px;
    color: #83868c;
    width: 100px;
  }
  .line {
    font-size: 0; //消除换行产生空格的影响
  }
  span.curr,
  li.curr {
    color: #409eff;
  }
  span,
  li {
    margin-right: 20px;
    font-size: 16px;
  }
  .el-input {
    width: 120px;
  }

  .type-list {
    display: flex;
    margin-top: 10px;
    label {
      float: left;
    }
    ul {
      flex: 1;
      float: left;
      padding-left: 0;
      margin: 0;
    }
    li {
      float: left;
      cursor: pointer;
      margin-bottom: 15px;
    }
  }
}
.img-con {
  h4 {
    font-weight: normal;
    margin-bottom: 20px;
  }
  .c-title {
    font-size: 18px;
    line-height: 1;
    color: #999999;
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
.btns {
  text-align: center;
  margin-top: 80px;
  .el-button {
    width: 90px;
  }
}
</style>
