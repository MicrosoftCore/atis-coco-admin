import api from '@/common/api'
import { Message } from 'element-ui'

const arg_exp = /\(:([\s\S]+?)\)/g
const replace_arg_exp = /\/?\(:([\s\S]+?)\)/g

const urls = {
  _: (arg1 = '', options) => {
    let stringURL = api[arg1]
    try {
      return options
      ? stringURL.replace(arg_exp, ($1, $2, $3) => options[$2])
      : stringURL.replace(replace_arg_exp, '')
    } catch (e) {
      Message.error({
        message: `$axios: 找不到 key 为 '${arg1}' 的 url 配置`,
        duration: 5000
      })
      throw new URIError(`${arg1} is doesn't exist`)
    }
  }
}

export default urls
