<template>
  <section class="graphic-add__left">
    <span>图文列表</span>
    <div class="graphic-add__preview" >
      <div class="graphic-add__image" v-if="!options.CoverImageUrl || options.CoverImageUrl.length === 0">
        <span>{{ options.Title || '标题' }}</span>
      </div>
      <div class="graphic-add__image"
        v-else
        v-for="(url, index) in options.CoverImageUrl"
        :key="index"
        :style="{backgroundImage: `url(${url})`}">
        <span v-if="index === options.CoverImageUrl.length - 1">{{ options.Title || '标题' }}</span>
      </div>
      <div class="graphic-add__mask"></div>
    </div>
    <!-- <div class="graphic-add__add">
      <i class="el-icon-plus"></i>
    </div> -->
  </section>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/../element-variables.scss';

.graphic-add__left {
  width: 250px;
  padding: 24px 20px 0;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  span {
    font-size: 14px;
  }
  .graphic-add__preview {
    padding: 9px;
    border: 2px solid $--color-primary;
    position: relative;
    margin-top: 20px;
    &:hover {
      .graphic-add__mask {
        display: block;
      }
    }
    .graphic-add__image {
      width: 100%;
      height: 105px;
      position: relative;
      background-color: rgba(0, 0, 0, 0.3);
      background-size: cover;
      background-repeat: no-repeat;
      &:not(:first-child) {
        margin-top: 10px;
      }
      span {
        color: #ffffff;
        position: absolute;
        left: 10px;
        bottom: 10px;
      }
    }
    .graphic-add__mask {
      width: 100%;
      height: 40px;
      display: none;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .graphic-add__add {
    width: 100%;
    height: 92px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dotted #d9dadc;
    box-sizing: border-box;
    i {
      font-size: 35px;
      color: #acadae;
    }
  }
}
</style>
