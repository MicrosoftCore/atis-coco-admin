import db from './modules/db'
import user from './modules/user'
import menu from './modules/menu'
import account from './modules/account'
import fullscreen from './modules/fullscreen'

export default {
  namespaced: true,
  modules: {
    db,
    user,
    menu,
    account,
    fullscreen
  }
}
