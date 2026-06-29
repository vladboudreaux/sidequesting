/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require('@faker-js/faker')


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('characters').del()

  const classes = await knex('classes').select('class_id')

  function createEnemy(rows) {
    let enemyData = []
    for (let i = 0; i < rows; i++) {
      enemyData.push({
        class_id: classes[Math.floor(Math.random() * classes.length)].class_id,
        enemy_name: faker.person.firstName(),
        health: Math.floor(Math.random() * 100) + 1,
        defense: Math.floor(Math.random() * 10) + 1,
        strength: Math.floor(Math.random() * 10) + 1,
        intelligence: Math.floor(Math.random() * 10) + 1,
        agility: Math.floor(Math.random() * 10) + 1,
        skill_points: Math.floor(Math.random() * 10 + 2)
      })
    }
    return enemyData
  }

  await knex('enemies').insert(createEnemy(100));
};
