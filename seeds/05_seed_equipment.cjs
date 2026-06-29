/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require('@faker-js/faker')


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('equipment_list').del()

  const equipmentTypes = ['weapon', 'armor', 'accessory']


  function createEquipment(rows) {
    let equipmentData = []
    for (let i = 0; i < rows; i++) {
      equipmentData.push({
        name: faker.commerce.product(),
        equipment_type: equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)],
        description: faker.commerce.productDescription(),
        effect: faker.lorem.lines(1)
      })
    }
    return equipmentData
  }

  await knex('equipment_list').insert(createEquipment(100));
};
