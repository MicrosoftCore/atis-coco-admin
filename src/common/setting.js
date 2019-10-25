import { version } from '@/../package'

const setting = {
  // 版本
  releases: {
    version: version,
    api: 'https://atis-managementapi.chinacloudsites.cn/'
  },
  // 在读取持久化数据失败时默认用户信息
  user: {
    info: {
      name: 'Ghost'
    }
  }
}

export default setting
