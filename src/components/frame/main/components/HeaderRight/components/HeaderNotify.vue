<template>
  <div>
    <el-dropdown trigger="click" size="medium" @visible-change="visibleChange">
      <div class="btn-text">
        <el-badge :value="12" class="item">
          <i class="el-icon-bell"></i>
        </el-badge>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-tabs value="1" class="el-tabs__notify" v-loading="loading">
          <el-tab-pane label="通知" name="1" v-if="!loading">
            <el-dropdown-item class="el-tabs__notice" v-for="(notice, index) in notices" :key="index">
              <el-row>
                <el-col :span="5">
                  <div class="left" :style="{ background: notice.bg }">
                    <i class="fa" :class="'fa-' + notice.ico" aria-hidden="true"></i>
                  </div>
                </el-col>
                <el-col :span="19">
                  <div class="right">
                    <h4>{{ notice.title }}</h4>
                    <span>{{ $moment(notice.datetime).fromNow() }}</span>
                  </div>
                </el-col>
              </el-row>
            </el-dropdown-item>
            <div class="el-tabs__clear">清空通知</div>
          </el-tab-pane>
          <el-tab-pane label="消息" name="2">
            <el-dropdown-item class="el-tabs__news" v-for="(item, index) in news" :key="index">
              <el-row>
                <el-col :span="5">
                  <div class="left">
                    <img :src="item.avatar" alt="">
                  </div>
                </el-col>
                <el-col :span="19">
                  <div class="right">
                    <h4>{{ item.title }}</h4>
                    <div>{{ item.description }}</div>
                    <span>{{ $moment(item.datetime).fromNow() }}</span>
                  </div>
                </el-col>
              </el-row>
            </el-dropdown-item>
            <div class="el-tabs__clear">清空消息</div>
          </el-tab-pane>
          <el-tab-pane label="待办" name="3">
            <el-dropdown-item class="el-tabs__todos" v-for="(todo, index) in todos" :key="index">
              <div class="top">
                <span class="left">{{ todo.title }}</span>
                <el-tag class="right" size="small" :type="todo.status">{{ todo.extra }}</el-tag>
              </div>
              <div class="bottom">
                {{ todo.description }}
              </div>
            </el-dropdown-item>
            <div class="el-tabs__clear">清空待办</div>
          </el-tab-pane>
        </el-tabs>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      notices: [
        { bg: '#FE5D58', ico: 'weixin', title: '你收到了 14 份新周报', datetime: '2017-08-09' },
        { bg: '#3391E5', ico: 'qq', title: '你推荐的 曲妮妮 已通过第三轮面试', datetime: '2017-08-08' },
        { bg: '#0AACAC', ico: 'facebook', title: '这种模板可以区分多种通知类型', datetime: '2017-08-07' },
        { bg: '#FFCE3D', ico: 'linkedin', title: '左侧图标用于区分不同的类型', datetime: '2017-08-07' },
        { bg: '#FE5D58', ico: 'skype', title: '内容不要超过两行字，超出时自动截断', datetime: '2017-08-07' }
      ],
      news: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: '曲丽丽 评论了你',
          description: '描述信息描述信息描述信息',
          datetime: '2017-08-07'
        }, {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: '朱偏右 回复了你',
          description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
          datetime: '2017-08-07'
        }, {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: '标题',
          description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
          datetime: '2017-08-07'
        }
      ],
      todos: [
        {
          title: '任务名称',
          description: '任务需要在 2017-01-12 20:00 前启动',
          extra: '未开始',
          status: 'info'
        }, {
          id: '000000010',
          title: '第三方紧急代码变更',
          description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
          extra: '马上到期',
          status: 'danger'
        }, {
          id: '000000011',
          title: '信息安全考试',
          description: '指派竹尔于 2017-01-09 前完成更新并发布',
          extra: '已耗时 8 天',
          status: 'warning'
        }, {
          id: '000000012',
          title: 'ABCD 版本发布',
          description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
          extra: '进行中',
          status: ''
        }
      ]
    }
  },
  methods: {
    visibleChange (result) {
      if (result) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 500)
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-text /deep/ .el-badge__content {
  border: none;
}
.el-dropdown-menu {
  padding: 0;
  .el-tabs__notify {
    width: 336px;
    .el-tabs__notice {
      border-bottom: 1px solid #ebeef5;
      .left {
        width: 32px;
        height: 32px;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 14px;
        margin-left: 9px;
        i {
          color: #ffffff;
        }
      }
      .right {
        padding: 5px 0;
        font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
        h4 {
          margin: 0;
          font-weight: normal;
          color: rgba(0, 0, 0, 0.65)
        }
        span {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }
    .el-tabs__news {
      border-bottom: 1px solid #ebeef5;
      .left {
        img {
          width: 32px;
          height: 32px;
          margin: 10px;
          border-radius: 100px;
        }
      }
      .right {
        h4 {
          margin: 0;
          font-weight: normal;
          color: rgba(0, 0, 0, 0.65)
        }
        div, span {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
          line-height: 22px;
        }
      }
    }
    .el-tabs__todos {
      padding: 12px 24px;
      border-bottom: 1px solid #ebeef5;
      .top {
        color: rgba(0, 0, 0, 0.65);
        .right {
          float: right;
        }
      }
      .bottom {
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
        line-height: 18px;
      }
    }
  }
  .el-tabs__clear {
    width: 100%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65)
  }
  & /deep/ .el-tabs__item {
    padding: 0 25px;
    &:not(.is-active) {
      color: #C0C0C0;
    }
  }
  & /deep/ .el-tabs__header {
    margin: 0 0 5px;
  }
  & /deep/ .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
    height: 45px;
    line-height: 45px;
    & /deep/ .el-tabs__active-bar {
      padding: 0 15px;
      left: -15px;
    }
  }
}

</style>
