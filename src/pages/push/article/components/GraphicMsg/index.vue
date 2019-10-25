<template>
  <div class="public-push__style">
    <template v-if="chosen.length">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item, index) in chosen" :key="index">
          <div class="choose-item">
            <div>更新于 {{ item.UpdateTime | moment('MMMDo') }}</div>
            <img
              alt=""
              width="292"
              height="164"
              :src="item.CoverImageUrl.split(',')[0]"
              v-if="item.CoverImageUrl"
            >
            <div>{{ item.Title }}</div>
            <span @click="onDelete(item)">删除</span>
          </div>
        </el-col>
      </el-row>
    </template>
    <template v-else>
      <section>
        <div @click="$refs.GraphicChoose.$emit('onOpen')">
          <i class="el-icon-document"></i>
          <span>从素材库选择</span>
        </div>
      </section>
      <section>
        <div @click="onCreate">
          <i class="el-icon-edit-outline"></i>
          <span>自建图文</span>
        </div>
      </section>
      <section>
        <div @click="$router.push({ name: 'complex-repository-index' })">
          <i class="el-icon-share"></i>
          <span>转载文章</span>
        </div>
      </section>
    </template>
    <GraphicChoose ref="GraphicChoose" @onConfirm="onConfirm"/>
  </div>
</template>

<script>
export default {
  components: {
    GraphicChoose: () => import('./GraphicChoose')
  },

  data () {
    return {
      chosen: []
    }
  },

  watch: {
    chosen (newValue) {
      this.$emit('onChange', newValue)
    }
  },

  methods: {
    onConfirm (items) {
      this.chosen = items
    },
    onCreate () {
      let { href } = this.$router.resolve({
        name: 'complex-repository-graphic-add'
      })
      window.open(href, '_blank')
    },
    onDelete (item) {
      this.chosen = this.chosen.filter(i => i !== item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../public.scss';
.choose-item {
  span {
    color: #0492c4;
    cursor: pointer;
  }
}
</style>
