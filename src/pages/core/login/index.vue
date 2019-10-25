<template>
  <div class="login-page">
    <div class="layer bg" id="indexLizi"></div>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <img src="@/assets/image/logo/logo_white_cn.png" alt="logo">
      </div>
      <el-tabs v-model="roles" type="card">
        <el-tab-pane label="专家版" name="expert">
          <!-- 表单部分 -->
          <div class="form-group">
            <el-card v-loading="userQrCode && submitting" element-loading-text="正在登录...">
              <div class="qrCode" v-if="userQrCode">
                <div class="pass-form-logo">扫一扫登录</div>
                <div class="tang-pass-qrcode-title">
                  请使用
                  <a href="javascript:void(0);">专家小程序</a> 扫码登录
                </div>
                <div class="tang-pass-qrcode-wrapper" v-loading="qrCodeLoading">
                  <div class="tang-pass-qrcode-init">
                    <div ref="qrCodeUrl"></div>
                  </div>
                </div>
                <div class="tang-pass-footerBar">
                  <a href="javascript:void(0);" @click="userQrCode = false">短信登录</a>
                  <div>
                    <a href="javascript:void(0);">
                      <i class="fa fa-weibo" aria-hidden="true"></i>
                    </a>
                    <a href="javascript:void(0);">
                      <i class="fa fa-qq" aria-hidden="true"></i>
                    </a>
                    <a href="javascript:void(0);">
                      <i class="fa fa-weixin" aria-hidden="true"></i>
                    </a>
                  </div>
                  <a href="javascript:void(0);">立即注册</a>
                </div>
              </div>
              <div v-else>
                <div class="svg-group">
                  <div class="svg-1">
                    <div class="poptip">
                      <div class="poptip-arrow">
                        <em></em>
                        <span></span>
                      </div>
                      <icon-svg name="扫码登录"></icon-svg>扫码登录在这里
                    </div>
                  </div>
                  <icon-svg class="svg-2" name="扫码登录-01" @click.native="getQRCode"></icon-svg>
                </div>
                <el-form
                  ref="ExpertForm"
                  label-position="top"
                  :rules="ExpertRules"
                  :model="ExpertForm"
                >
                  <el-form-item prop="username">
                    <el-input
                      type="text"
                      v-model="ExpertForm.username"
                      placeholder="手机号"
                      @keyup.enter.native="submit('expert')"
                    >
                      <i slot="prepend" class="el-icon-mobile-phone"></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-input
                      type="text"
                      v-model="ExpertForm.code"
                      placeholder="- - - -"
                      @keyup.enter.native="submit('expert')"
                    >
                      <template slot="prepend">验证码</template>
                      <template slot="append">
                        <span style="user-select:none;" @click="getVerificationCode">{{ timer }}</span>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label>
                    <div class="userQrcode" @click="getQRCode">
                      <span>使用手机</span>
                      <a href="javascript:void(0);">扫码登录</a>
                    </div>
                  </el-form-item>
                  <el-button
                    @click="submit('expert')"
                    :loading="submitting"
                    :disabled="submitting"
                    type="success"
                    class="button-login"
                  >{{ submitting ? '正在登录...' : '登录' }}</el-button>
                </el-form>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="管理员" name="administrator">
          <!-- 表单部分 -->
          <div class="form-group">
            <el-card>
              <el-form
                ref="AdministratorForm"
                label-position="top"
                :rules="AdministratorRules"
                :model="AdministratorForm"
              >
                <el-form-item prop="username">
                  <el-input
                    type="text"
                    v-model="AdministratorForm.username"
                    placeholder="用户名"
                    @keyup.enter.native="submit('administrator')"
                  >
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model="AdministratorForm.password"
                    placeholder="密码"
                    @keyup.enter.native="submit('administrator')"
                  >
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input
                    type="text"
                    v-model="AdministratorForm.code"
                    placeholder="- - - -"
                    @keyup.enter.native="submit('administrator')"
                  >
                    <template slot="prepend">验证码</template>
                    <template slot="append">
                      <img class="login-code" src="static/image/login-code.png" alt>
                    </template>
                  </el-input>
                </el-form-item>
                <el-button
                  @click="submit('administrator')"
                  :loading="submitting"
                  :disabled="submitting"
                  type="success"
                  class="button-login"
                >{{ submitting ? '正在登录...' : '登录' }}</el-button>
              </el-form>
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 帮助按钮 -->
      <el-button type="info" class="button-help">
        需要帮助
        <i class="fa fa-question-circle"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { mapActions } from 'vuex'
export default {
  data () {
    let timerPlaceholder = '获取验证码'
    return {
      roles: 'expert',
      timer: timerPlaceholder,
      timerPlaceholder,
      timerCountDown: false,
      submitting: false,
      userQrCode: false,
      qrCodeLoading: false,
      AdministratorForm: {
        username: '',
        password: '',
        code: ''
      },
      ExpertForm: {
        username: '',
        code: ''
      },
      AdministratorRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      ExpertRules: {
        username: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions('d2admin/account', ['login']),
    liziInit () {
      let THREE = window.THREE
      let SCREEN_WIDTH = window.innerWidth
      let SCREEN_HEIGHT = window.innerHeight
      let SEPARATION = 90
      let AMOUNTX = 50
      let AMOUNTY = 50
      let container
      let particles, particle
      let count
      let camera
      let scene
      let renderer
      let mouseX = 0
      let mouseY = 0
      let windowHalfX = window.innerWidth / 2
      let windowHalfY = window.innerHeight / 2

      let init = () => {
        container = document.createElement('div')
        container.style.position = 'relative'
        container.style.top = '200px'
        document.getElementById('indexLizi').appendChild(container)
        camera = new THREE.Camera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000)
        camera.position.z = 1000
        scene = new THREE.Scene()
        renderer = new THREE.CanvasRenderer()
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
        particles = []
        let i = 0
        let material = new THREE.ParticleCircleMaterial(0x3ac267, 1)
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++] = new THREE.Particle(material)
            particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
            particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
            scene.add(particle)
          }
        }
        count = 0
        container.appendChild(renderer.domElement)
        document.addEventListener('mousemove', onDocumentMouseMove, false)
        document.addEventListener('touchmove', onDocumentTouchMove, false)
      }
      let loop = () => {
        camera.position.x += (mouseX - camera.position.x) * 0.05
        camera.position.y += (-mouseY - camera.position.y) * 0.05
        camera.position.y = 364
        let i = 0
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++]
            particle.position.y =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50
            particle.scale.x = particle.scale.y =
              (Math.sin((ix + count) * 0.3) + 1) * 2 +
              (Math.sin((iy + count) * 0.5) + 1) * 2
          }
        }
        renderer.render(scene, camera)
        count += 0.1
      }
      init()
      this.interval = setInterval(loop, 1000 / 40)
      let mousemovetimer = null
      let onMouseMove = event => {
        window.clearTimeout(mousemovetimer)
        mouseX = event.clientX - windowHalfX
        mouseY = event.clientY - windowHalfY
        mousemovetimer = null
      }
      let onDocumentMouseMove = event => {
        if (!mousemovetimer) {
          mousemovetimer = window.setTimeout(onMouseMove, 50, event)
        }
      }
      let onDocumentTouchMove = event => {
        if (event.touches.length === 1) {
          event.preventDefault()
          mouseX = event.touches[0].pageX - windowHalfX
          mouseY = event.touches[0].pageY - windowHalfY
        }
      }
    },
    // 获取二维码
    async getQRCode () {
      this.userQrCode = true
      this.qrCodeLoading = true
      let Id = await this.$axios.post(this.$urls._('app.common.getqrcode'))
      if (Id) {
        this.qrCodeLoading = false
        this.QRCode = new QRCode(this.$refs.qrCodeUrl, {
          text: JSON.stringify({ DeviceId: Id }),
          width: 138,
          height: 138,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
        this.QRCode && this.getUserName(Id)
      }
    },
    // 获取监听登录人信息
    getUserName (Id) {
      if (this.roles === 'expert' && this.userQrCode) {
        this.$axios({
          method: 'post',
          url: this.$urls._('app.common.getusername'),
          timeout: 60 * 1000,
          data: {
            Id
          }
        }).then(result => {
          if (!result) {
            this.getUserName(Id)
          } else {
            this.submitting = true
            this.login({
              role: 4,
              username: result,
              password: null,
              qrcode: Id
            }).then(() => {
              this.submitting = false
            })
          }
        })
      }
    },
    // 获取手机验证码
    getVerificationCode () {
      let reg = /^(((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6])|(17[0-8])|(18[0-9])|(19[89]))\d{8})$/
      let phoneNo = this.ExpertForm.username
      if (phoneNo && reg.test(phoneNo)) {
        if (!this.timerCountDown) {
          this.timerCountDown = true
          this.$axios
            .get(this.$urls._('app.common.mobile', { phoneNo }))
            .then(result => {
              if (result) {
                let timer = 60
                let interval = setInterval(() => {
                  --timer
                  if (timer >= 0) {
                    this.timer = timer + 's'
                  } else {
                    this.timer = this.timerPlaceholder
                    this.timerCountDown = false
                    clearInterval(interval)
                  }
                }, 1000)
                this.$message.success('验证码发送成功')
              } else {
                this.$message.error('验证码发送失败')
              }
            })
        }
      } else {
        this.$message.error('请输入正确的手机号')
      }
    },
    // 提交登陆信息
    submit (role) {
      if (role === 'administrator') {
        this.$refs.AdministratorForm.validate(valid => {
          if (valid) {
            if (!this.submitting) {
              this.submitting = true
              this.login({
                role: 0,
                username: this.AdministratorForm.username,
                password: this.AdministratorForm.password,
                smsCode: null
              }).then(() => {
                this.submitting = false
              })
            }
          } else {
            // 登陆表单校验失败
            this.$message.error('请检查登录信息')
            return false
          }
        })
      } else {
        this.$refs.ExpertForm.validate(valid => {
          if (valid) {
            if (!this.submitting) {
              this.submitting = true
              this.login({
                role: 4,
                username: this.ExpertForm.username,
                password: null,
                smsCode: this.ExpertForm.code
              }).then(() => {
                this.submitting = false
              })
            }
          } else {
            // 登陆表单校验失败
            this.$message.error('请检查登录信息')
            return false
          }
        })
      }
    }
  },
  mounted () {
    // 初始化例子插件
    this.liziInit()
  },
  beforeDestroy () {
    if (this.interval) clearInterval(this.interval)
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>
