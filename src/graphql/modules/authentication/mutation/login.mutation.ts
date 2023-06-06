import { GraphQLError } from 'graphql'
import { LoginInput, Me, User } from '~/generated/graphql'
import { ArgsType, Parent, ResolverHandler } from '~/types'
import { Context } from '~/utils/context'
import { comparePassword } from '~/utils/passwordHash'
import { generateToken } from '~/utils/token'

export const LoginAdminMutation: ResolverHandler<Promise<Me>> = async (
  _: Parent,
  args: ArgsType<LoginInput>,
  ctx: Context,
) => {
  const user: User | undefined = await ctx.knex
    .table<User>('users')
    .where({ email: args?.input?.email })
    .first()

  if (!user) {
    throw new GraphQLError('User not found')
  }

  const isValidPass = await comparePassword(
    String(args?.input?.password),
    String(user?.password),
  )

  if (isValidPass) {
    const token = generateToken(Number(user?.id))
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      token: token,
    }
  }
  throw new GraphQLError('Wrong Credentail')
}
