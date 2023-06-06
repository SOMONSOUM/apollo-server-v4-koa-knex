import { RegisterInput } from '~/generated/graphql'
import { ArgsType, Parent, OK, ResolverHandler } from '~/types'
import { Context } from '~/utils/context'
import { hashPassword } from '~/utils/passwordHash'

export const RegisterAdminMutation: ResolverHandler<Promise<OK>> = async (
  _: Parent,
  args: ArgsType<RegisterInput>,
  ctx: Context,
) => {
  await ctx.knex.table('users').insert({
    ...args.input,
    password: await hashPassword(
      args.input.password ? args.input.password : '123',
    ),
  })
  return { ok: true }
}
