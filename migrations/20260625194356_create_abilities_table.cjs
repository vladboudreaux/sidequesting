/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('abilities', table => {
        table.increments('ability_id')
        table.string('name')
        table.string('description')
        table.string('effect')
        table.integer('damage')
        table.integer('cooldown')
        table.integer('cost')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('abilities')
};
