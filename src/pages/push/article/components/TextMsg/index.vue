<template>
  <div class="test-msg">
    <section class="test-msg__textarea">
      <el-input
        type="textarea"
        v-model="textarea"
        autofocus
        autosize>
      </el-input>
    </section>
    <section class="text-msg__emoji">
      <div>
        <icon-svg name="Emoji"></icon-svg>
        <span>还可以输入600字</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      textarea: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.test-msg {
  width: 100%;
  .test-msg__textarea {
    width: 100%;
    height: 216px;
    box-sizing: border-box;
    & /deep/ .el-textarea__inner {
      height: 216px !important;
      border: none;
    }
  }
  .text-msg__emoji {
    width: 100%;
    height: 37px;
    border-top: 1px solid #e7e7eb;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    div {
      width: 100%;
      padding: 0 20px;
      svg {
        width: 20px;
        height: 20px;
        float: left;
      }
      span {
        font-size: 14px;
        color: #8d8d8d;
        float: right;
      }
    }
  }
}
</style>
