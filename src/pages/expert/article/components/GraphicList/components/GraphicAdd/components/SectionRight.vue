<template>
  <section class="graphic-add__right">
    <span>多媒体</span>
    <ul class="graphic-add__media">
      <li>
        <i class="el-icon-picture"></i>
        <span>图片</span>
      </li>
      <li>
        <i class="fa fa-video-camera" aria-hidden="true"></i>
        <span>视频</span>
      </li>
      <li>
        <i class="fa fa-volume-up" aria-hidden="true"></i>
        <span>音频</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '~@/../element-variables.scss';

.graphic-add__right {
  width: 210px;
  padding: 24px 20px 0;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  span {
    font-size: 14px;
  }
  ul {
    padding: 0;
    box-sizing: border-box;
    li {
      width: 100%;
      height: 51px;
      padding-left: 20px;
      border: 1px solid #e7e7eb;
      border-bottom-color: transparent;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: 1px solid #e7e7eb;
      }
      &:hover {
        span, i {
          color: $--color-primary;
        }
        border-color: $--color-primary;
        border-bottom: 1px solid $--color-primary;
        & + li {
          border-top-color: transparent;
        }
      }
      span {
        color: #353535;
      }
      i {
        width: 20px;
        text-align: center;
        color: #979797;
        font-size: 20px;
        margin-right: 15px;
      }
    }
  }
}
</style>
