import knex from 'knex'
import * as dotenv from 'dotenv'
import config from '../../knexfile'
dotenv.config()

const dbConfig =
  process.env.NODE_ENV === 'production' ? config.production : config.development
const knexInstance = knex(dbConfig)

export default knexInstance
