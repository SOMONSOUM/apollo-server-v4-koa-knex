import type { Context } from 'koa'
import knexInstance from '~/database'
import { response } from '~/utils/response'

export default class UserController {
  public static async getInfo(ctx: Context) {
    const id = Number(ctx.query.id)
    const [user] = await knexInstance.table('users').where({ id: id })
    ctx.status = 200
    response(ctx, {
      data: user,
    })
  }
}
