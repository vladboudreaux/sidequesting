/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')

async function createUsers(rows) {
  const hashedPassword = await bcrypt.hash('password123', 10)

  let userData = []
  for (let i = 0; i < rows; i++) {
    userData.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      birth_date: faker.date.birthdate(),
      is_admin: false,
    })
  }
  return userData
}

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  let adminData = []
  adminData.push({
    first_name: 'admin',
    last_name: 'admin',
    email: 'admin@admin.com',
    password: hashedPassword,
    birth_date: faker.date.birthdate(),
    is_admin: true,
  })
  return adminData
}

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('users').del()
  await knex('users').insert(await createAdmin())
  await knex('users').insert(await createUsers(10));
};
