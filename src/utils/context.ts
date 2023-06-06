import type Koa from 'koa'
import type { Knex } from 'knex'
import type { DecodedPayload } from './token'
import knexInstance from '../database'

export interface Context {
  knex: Knex
  req: Koa.ParameterizedContext
  decoded?: DecodedPayload
}

export async function createContext({
  ctx,
}: {
  ctx: Koa.ParameterizedContext
}): Promise<Context> {
  return {
    knex: knexInstance,
    req: ctx,
  }
}
