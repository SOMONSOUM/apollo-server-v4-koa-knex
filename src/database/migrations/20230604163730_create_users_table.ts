import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('users'))) {
    return await knex.schema.createTable('users', function (table) {
      table.increments()
      table.string('email')
      table.string('password')
      table.string('username')
      table.timestamps(true, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
