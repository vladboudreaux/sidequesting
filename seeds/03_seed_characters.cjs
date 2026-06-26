/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require('@faker-js/faker')


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('characters').del()

  const users = await knex('users').select('user_id')
  const classes = await knex('classes').select('class_id')

  function createCharacter(rows) {
    let characterData = []
    for (let i = 0; i < rows; i++) {
      characterData.push({
        user_id: users[Math.floor(Math.random() * users.length)].user_id,
        class_id: classes[Math.floor(Math.random() * classes.length)].class_id,
        character_name: faker.lorem.word({ length: { min: 5, max: 20 }, strategy: 'any-length' }),
        health: Math.floor(Math.random() * 100) + 1,
        defense: Math.floor(Math.random() * 10) + 1,
        strength: Math.floor(Math.random() * 10) + 1,
        intelligence: Math.floor(Math.random() * 10) + 1,
        agility: Math.floor(Math.random() * 10) + 1,
        skill_points: Math.floor(Math.random() * 10 + 2)
      })
    }
    return characterData
  }

  await knex('characters').insert(createCharacter(50));
};
