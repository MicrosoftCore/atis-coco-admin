<template>
  <el-form ref="header-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="">
          <el-input
            size="small"
            placeholder="搜索： 员工、文件、照片等"
            prefix-icon="el-icon-search">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.el-form {
  margin: auto;
  .el-row {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-form-item {
      margin: 0;
      & /deep/ .el-form-item__content {
        width: 100%;
        .el-input__prefix {
          top: -1px;
          i {
            color: #ffffff;
            font-size: 18px;
            
          }
        }
        .el-input__inner {
          border: none;
          font-size: 14px;
          padding-left: 40px;
          background-color: rgba(255, 255, 255, 0.2);
        }
        ::-webkit-input-placeholder {
          color: #fff;
        }
        :-moz-placeholder {
          color: #fff;
        }
        ::-moz-placeholder {
          color: #fff;
        }
        :-ms-input-placeholder {
          color: #fff;
        }
      }
    }
  }
}
@media screen and ( max-width: 840px ) {
  .el-form {
    display: none;
  }
}
</style>
