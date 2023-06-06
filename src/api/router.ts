import Router from '@koa/router'

import UserController from './controllers/user'
import { Methods, Route } from '~/types'
import { authMiddleWareRestful } from '~/middlewares/auth'

const routes: Route[] = [
  {
    url: '/user',
    method: Methods.GET,
    handlers: [authMiddleWareRestful, UserController.getInfo],
  },
]

const router = new Router()

routes.forEach(({ method, url, handlers }: Route) => {
  const handlerArr: any[] =
    Object.prototype.toString.call(handlers) === '[object Array]'
      ? handlers
      : [handlers]
  router[method](url, ...handlerArr)
})

export default router
