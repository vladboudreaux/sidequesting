/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('enemy_abilities', table => {
        table.integer('enemy_id').references('enemy_id').inTable('enemies')
        table.integer('ability_id').references('ability_id').inTable('abilities')
        table.primary(['enemy_id', 'ability_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('enemy_abilities')
};
