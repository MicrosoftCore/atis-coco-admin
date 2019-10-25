<template>
  <div>
    <el-dropdown trigger="click" size="medium">
      <div class="btn-text">
        <el-badge is-dot>
          <i class="el-icon-bell"></i>
        </el-badge>
      </div>
      <el-dropdown-menu slot="dropdown">
        <div class="task-card">
          <div class="task-card__header">
            <div class="task-card__flex">
              <span>公告</span>
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </div>
        <el-dropdown-item v-for="(task, index) in tasks" :key="index">
          <el-row class="task-item" style="width: 420px;">
            <el-col :span="4" class="task-item__avatar">
              <img :src="task.src" alt="">
            </el-col>
            <el-col :span="20" class="task-item__content">
              <strong>{{ task.title }}</strong>
              <p>{{ task.p }}</p>
            </el-col>
          </el-row>
        </el-dropdown-item>
        <div class="task-all">查看全部</div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tasks: [
        { src: require('@/assets/image/1.png'), title: 'cipchk', p: "Please tell me what happened in a few words, don't go into details." },
        { src: require('@/assets/image/2.png'), title: 'はなさき', p: 'ハルカソラトキヘダツヒカリ ' },
        { src: require('@/assets/image/3.png'), title: '苏先生', p: '请告诉我，我应该说点什么好？' },
        { src: require('@/assets/image/4.png'), title: 'Kent', p: "Please tell me what happened in a few words, don't go into details." },
        { src: require('@/assets/image/5.png'), title: 'Jefferson', p: "Please tell me what happened in a few words, don't go into details." }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-menu {
  padding: 0;
  .task-card {
    width: 454px;
    .task-card__header {
      width: 100%;
      height: 56px;
      border-bottom: 1px solid #eee;
      padding: 0 24px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .task-card__flex {
        width: 100%;
        span {
          float: left;
        }
        i {
          float: right;
          position: relative;
          top: 2px;
          right: 10px;
        }
      }
    }
  }
  .task-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 8px 0;
    .task-item__avatar {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 100px;
        background: #ccc;
      }
    }
    p {
      margin: 0;
      line-height: 19px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .task-all {
    width: 100%;
    height: 50px;
    color: #bfbfbf;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>
