import type { Knex } from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()

if (!process.env.DATABASE_URL) {
  throw new Error('Please configure the database environment variables first!')
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    migrations: {
      extension: 'ts',
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`,
      disableMigrationsListValidation: true,
    },
    seeds: {
      extension: 'ts',
      directory: `${__dirname}/src/database/seeds`,
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    migrations: {
      extension: 'ts',
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`,
      disableMigrationsListValidation: true,
    },
  },
}

export default config
