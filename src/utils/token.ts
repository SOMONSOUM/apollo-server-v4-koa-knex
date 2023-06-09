import { GraphQLError } from 'graphql'
import { verify, sign } from 'jsonwebtoken'
import type Koa from 'koa'
import { SECRET_KEY } from '~/constants/constants'

export interface DecodedPayload {
  userId: number
}

/**
 * token
 * @param req
 * @param requireAuth
 * @returns
 */
function decodedToken(req: Koa.ParameterizedContext, requireAuth = true) {
  const authorization = req.headers.authorization
  if (authorization) {
    try {
      const token = authorization.replace('Bearer ', '')
      const decoded = verify(token, SECRET_KEY) as unknown as DecodedPayload
      return decoded
    } catch (error) {
      throw new GraphQLError('Authentication expired', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      })
    }
  }
  if (requireAuth) {
    throw new GraphQLError('Authentication token required', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    })
  }
  return null
}

/**
 * token
 * @param userId
 * @returns
 */
function generateToken(userId: number, expiresIn = '2h') {
  return sign(
    {
      userId,
    },
    SECRET_KEY,
    {
      expiresIn,
    },
  )
}

export { decodedToken, generateToken }
