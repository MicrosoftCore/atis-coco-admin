<template>
  <div class="account">
    <div class="account__public_info">
      <div class="account__public_title">
        <h3>公开信息</h3>
      </div>
      <div class="account__public__avatar__warp">
        <div class="account__public__avatar"></div>
      </div>
      <div class="account__public__qrcode">
        <i class="fa fa-qrcode" aria-hidden="true"></i> 
      </div>
      <ul class="account__public__items">
        <li>
          <div class="account__public__left">
            名称
          </div>
          <div class="account__public__right">
            <span>MicrosoftCorporation</span>
            <div class="account__public-setting">
              <a>修改</a>
              <icon-svg name="问号"></icon-svg>
            </div>
          </div>
        </li>
        <li>
          <div class="account__public__left">
            微信号
          </div>
          <div class="account__public__right">
            <span class="weui-desktop-tips">未设置微信号</span>
            <div class="account__public-setting">
              <a>设置</a>
              <icon-svg name="问号"></icon-svg>
            </div>
          </div>
        </li>
        <li>
          <div class="account__public__left">
            类型
          </div>
          <div class="account__public__right">
            农户
          </div>
        </li>
        <li>
          <div class="account__public__left">
            介绍
          </div>
          <div class="account__public__right">
            <span>一家专门做招聘的网站</span>
            <div class="account__public-setting">
              <a>修改</a>
              <icon-svg name="问号"></icon-svg>
            </div>
          </div>
        </li>
        <li>
          <div class="account__public__left">
            认证情况
          </div>
          <div class="account__public__right">
            <span class="weui-desktop-tips">未认证</span>
            <div class="account__public-setting">
              <a>申请认证审核</a>
            </div>
          </div>
        </li>
        <li>
          <div class="account__public__left">
            所在地址
          </div>
          <div class="account__public__right">
            <span class="weui-desktop-tips">未设置</span>
            <div class="account__public-setting">
              <a>设置</a>
            </div>
          </div>
        </li>
        <li>
          <div class="account__public__left">
            主体信息
          </div>
          <div class="account__public__right">
            <span>
              姜**&nbsp;&nbsp;
              <span class="weui-desktop-tips">(个人)</span>
            </span>
            <div class="account__public-setting">
              <a>详情</a>
              <a>账号迁移</a>
            </div>
          </div>
        </li>
        <li>
          <div class="account__public__left">
            相关小程序
          </div>
          <div class="account__public__right">
            暂无相关小程序
          </div>
        </li>
      </ul>
    </div>
    <div class="account__registration_info">
      <div class="account__public_title">
        <h3>注册信息</h3>
      </div>
      <ul class="account__public__items">
        <li>
          <div class="account__public__left">
            登录邮箱
          </div>
          <div class="account__public__right">
            <span>932308718@qq.com</span>
            <div class="account__public-setting">
              <a>修改</a>
              <icon-svg name="问号"></icon-svg>
            </div>
          </div>
        </li>
        <li>
          <div class="account__public__left">
            原始ID
          </div>
          <div class="account__public__right">
            <span>gh_55abbd1b84f2</span>
            <div class="account__public-setting">
              <a>注销账号</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { label: '名称', value: 'MicrosoftCorporation' },
        { label: '微信号', value: '未设置微信号' },
        { label: '类型', value: '农户' },
        { label: '介绍', value: '一家专门做招聘的网站' },
        { label: '认证情况', value: '未认证' },
        { label: '所在地址', value: '未设置' },
        { label: '主题信息', value: '姜** (个人)' },
        { label: '相关小程序', value: '暂无相关小程序' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.account {
  .account__public_info,
  .account__registration_info {
    width: 100%;
    margin-bottom: 30px;
    padding: 24px 40px;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
    .account__public_title {
      padding: 16px 0;
      h3 {
        line-height: 20px;
        font-size: 20px;
        font-weight: 400;
        margin: 0;
      }
    }
    .account__public__avatar__warp {
      height: 90px;
      .account__public__avatar {
        width: 84px;
        height: 84px;
        margin: 0 auto;
        border-radius: 100%;
        background-size: cover;
        background-image: url('https://y.gtimg.cn/music/photo_new/T002R300x300M000003v5QHD43qSbP.jpg?max_age=2592000');
        position: relative;
        &::before {
          content: ' ';
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          visibility: hidden;
          opacity: 0;
        }
        &:hover {
          &::before {
            visibility: visible;
            opacity: 1;
            transition: opacity 0.5s;
          }
        }
      }
    }
    .account__public__qrcode {
      margin: 5px auto 18px;
      text-align: center;
      i {
        font-size: 28px;
        color: #9b9b9b;
      }
    }
    .account__public__items {
      padding: 0;
      li {
        height: 62px;
        &:last-child {
          .account__public__right {
            border: none;
          }
        }
      }
      .weui-desktop-tips {
        color: #9a9a9a;
      }
      .account__public__left,
      .account__public__right {
        height: 100%;
        line-height: 62px;
        float: left;
        font-size: 14px;
      }
      .account__public__left {
        width: 98px;
        margin-right: 14px;
        color: #9a9a9a;
      }
      .account__public__right {
        width: calc(100% - 112px);
        border-bottom: 1px solid #e4e8eb;
        .account__public-setting {
          float: right;
          a {
            color: #576b95;
            text-decoration: none;
            cursor: pointer;
          }
          svg {
            width: 18px;
            height: 18px;
            position: relative;
            top: 4px;
          }
        }
      }
    }
  }
  .account__public_info {
    height: 774px;
  }
  .account__registration_info {
    height: 257px;
  }
}
</style>
