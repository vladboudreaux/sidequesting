/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('equipment_list', table => {
        table.increments('equipment_id')
        table.string('name')
        table.string('equipment_type')
        table.string('description')
        table.string('effect')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('equipment_list')
};
