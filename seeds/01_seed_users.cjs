/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require('@faker-js/faker')

function createUsers(rows) {
  let userData = []
  for (let i = 0; i < rows; i++) {
    userData.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      birth_date: faker.date.birthdate()
    })
  }
  return userData
}

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(createUsers(10));
};
