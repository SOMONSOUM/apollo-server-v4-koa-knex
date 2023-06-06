import type { GraphQLResolveInfo } from 'graphql'
import { Context } from '~/utils/context'

export interface Parent {}

/**
 * custom resolver
 */
export type ResolverHandler<ReturnType = any> = (
  parent: Parent,
  args: ArgsType<any>,
  context: Context,
  info: GraphQLResolveInfo,
) => ReturnType

export interface OK {
  ok: boolean
}

export interface ArgsType<T = any, ID = any> {
  input: T
  id: ID
}

export type ID = number

// restful api types

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface Route {
  method: Methods
  url: string
  handlers: any | any[]
}

export interface Response {
  code?: number
  msg?: string
  data?: any
}
