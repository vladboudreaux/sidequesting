/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('character_abilities', table => {
        table.integer('character_id').references('character_id').inTable('characters')
        table.integer('ability_id').references('ability_id').inTable('abilities')
        table.primary(['character_id', 'ability_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('character_abilities')
};
