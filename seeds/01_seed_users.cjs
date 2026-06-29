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
      birth_date: faker.date.birthdate(),
      is_admin: false,
    })
  }
  return userData
}

function createAdmin() {
  let adminData = []
  adminData.push({
    first_name: 'admin',
    last_name: 'admin',
    email: 'admin@admin.com',
    password: 'admin',
    birth_date: faker.date.birthdate(),
    is_admin: true,
  })
  return adminData
}

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('users').del()
  await knex('users').insert(createAdmin())
  await knex('users').insert(createUsers(10));
};
