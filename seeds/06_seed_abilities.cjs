/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require('@faker-js/faker')


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('abilities').del()



  function createAbilities(rows) {
    let abilityData = []
    for (let i = 0; i < rows; i++) {
      abilityData.push({
        name: faker.lorem.word(),
        description: faker.lorem.lines(1),
        effect: faker.lorem.lines(1),
        damage: Math.floor(Math.random() * 5) + 1,
        cooldown: Math.floor(Math.random() * 6) + 1,
        cost: Math.floor(Math.random() * 2) + 1
      })
    }
    return abilityData
  }

  await knex('abilities').insert(createAbilities(100));
};
