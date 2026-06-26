/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('characters', table => {
        table.increments('character_id')
        table.integer('user_id').references('user_id').inTable('users').notNullable()
        table.integer('class_id').references('class_id').inTable('classes').notNullable()
        table.string('character_name')
        table.integer('health')
        table.integer('defense')
        table.integer('strength')
        table.integer('intelligence')
        table.integer('agility')
        table.integer('skill_points')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('characters')
};
