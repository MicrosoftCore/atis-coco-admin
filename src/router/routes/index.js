import menus from '@/menu'
import routes from './invisible'

routes.find(route => route.path === '/').children.push(...menus)

export default routes
