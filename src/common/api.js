export default {
  /**
   * @description common module.
   * Global shared data interface.
   */
  'app.common.allplant': 'api/detection/allplant', // 获取所有作物类型
  'app.common.allregion': 'api/detection/allregion', // 获取所有区域
  'app.common.imageupload': 'api/file/imageupload', // 图片上传
  'app.common.videoupload': 'api/file/videoupload', // 视频上传
  'app.common.mobile': 'api/moblie/(:phoneNo)', // 请求发送验证码
  'app.common.getqrcode': 'api/scancodelogin/getqrcode', // 获取设备ID
  'app.common.getusername': 'api/scancodelogin/getusername', // 获取扫码的专家用户信息
  'app.common.getuserinfo': 'api/user/getuserinfo', // 获取用户信息
  'app.common.allfullregion': 'api/shop/allregion', // 获取所有区域（四级）
  /**
   * bench module.
   */
  'bench.detection.getlist': 'api/detection/getlist', // 查询检测单初检列表
  'bench.detection.getsingle': 'api/detection/getsingle', // 获取单条初检检测单
  'bench.detection.detectionfirst': 'api/detection/detectionfirst', // 初检审批接口
  'bench.detection.getfinallist': 'api/detection/getfinallist', // 获取终检列表
  'bench.detection.getfinaloperate': 'api/detection/getfinaloperate', // 获取终检操作页面
  'bench.detection.getfinaldetail': 'api/detection/getfinaldetail', // 获取终检详情页面
  'bench.detection.getrecentlylist': 'api/detection/getrecentlylist?detectionOrderID=(:detectionOrderID)&cropTypeId=(:cropTypeId)', // 根据检测单id和作物类别id获取终检最近检测单列表
  'bench.detection.submitfinalcheck': 'api/detection/submitfinalcheck', // 专家终检提交

  'bench.authentication.getpromoterslist': 'api/user/getpromoterslist', // 获取推广员列表
  'bench.authentication.editpromoters': 'api/user/editpromoters', // 编辑推广员审核状态

  'bench.detection.getmergedetection': 'api/detection/getmergedetection', // 获取初检单合并详情
  'bench.detection.mergedetectionfirst': 'api/detection/mergedetectionfirst', // 合并初检单
  /**
   * complex module.
   */
  'complex.article.getlist': 'api/article/getlist', // 获取文章或知识库列表
  'complex.article.getdetail': 'api/article/getdetail', // 获取文章或知识库详情
  'complex.article.add': 'api/article/add', // 新增我的文章或知识库
  'complex.article.update': 'api/article/update', // 修改我的文章或知识库
  'complex.article.delete': 'api/article/delete', // 删除文章知识库
  'complex.article.push': 'api/article/push', // 文章推送
  'complex.article.canclepush': 'api/article/canclepush', // 文章取消发布
  /**
   * expert module.
   */
  'expert.branch.info': 'api/bind/Info/(:ID)', // 获取专家详情
  'expert.branch.expert': 'api/bind/expert', // 专家查询关联店铺信息
  'expert.branch.list': 'api/bind/expert/list', // 专家获取专家店铺绑定列表
  'expert.branch.getexpertdetectionorderlist': 'api/detection/getexpertdetectionorderlist', // 获取专家历史检测单
  /**
   * manage module.
   */
  'manage.account.getlist': 'api/user/getlist', // 获取用户列表
  'manage.account.getexpertlist': 'api/user/getexpertlist', // 获取专家列表
  'manage.account.add': 'api/user/add', // 新增用户
  'manage.account.edit': 'api/user/edit', // 编辑用户
  'manage.account.delete': 'api/user/delete', // 删除用户
  'manage.account.setenabled': 'api/user/setenabled', // 设置用户启用禁用
  'manage.expert.getmanageexpertlist': 'api/user/getmanageexpertlist', // 获取会员管理之专家列表
  'manage.user.setuserrealstatus': 'api/user/setuserrealstatus', // 设置用户实名认证状态
  'manage.farmer.getmanagefarmerlist': 'api/user/getmanagefarmerlist', // 农户管理列表
  'manage.user.setexpertfarmerstatus': 'api/user/setexpertfarmerstatus', // 设置专家/农户启用禁用
  'manage.farmer.getmanagefarmerdetail': 'api/user/getmanagefarmerdetail', // 获取农户详情
  'manage.farmer.shopsalesorderdetails': 'api/user/shopsalesorderdetails', // 获取购药记录详情
  'manage.farmer.completedinfo': 'api/user/completedinfo', // 完善作物资料
  'manage.farmer.getusercropinfo': 'api/user/getusercropinfo', // 获取农户作物种类列表
  'manage.farmer.getuserorderlist': 'api/user/getuserorderlist', // 获取农户购药记录
  'manage.shop.getshoplist': 'api/shop/getshoplist', // 获取分院列表
  'manage.shop.authorizationshop': 'api/shop/authorizationshop', // 激活店铺
  'manage.shop.cancelshop': 'api/shop/cancelshop', // 禁用店铺
  'manage.shop.geteditshop': 'api/shop/geteditshop', // 根据店铺Id获取店铺信息
  'manage.shop.submiteditshop': 'api/shop/submiteditshop', // 提交修改店铺信息
  'manage.shop.getshopinfolist': 'api/shop/getshopinfolist', // 获取农资店上传列表
  'manage.shop.updateshopinfo': 'api/shop/updateshopinfo', // 更新资料审核状态
  'manage.shop.getshopbaseinfolist': 'api/shop/getshopbaseinfolist' // 获取商户pc列表
}
