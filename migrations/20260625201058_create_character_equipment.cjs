/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('character_equipment', table => {
        table.integer('character_id').references('character_id').inTable('characters')
        table.integer('equipment_id').references('equipment_id').inTable('equipment_list')
        table.primary(['character_id', 'equipment_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('character_equipment')
};
