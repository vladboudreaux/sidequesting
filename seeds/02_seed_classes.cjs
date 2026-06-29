/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


const { faker } = require('@faker-js/faker')


function createClass(rows) {
  let classData = []
  for (let i = 0; i < rows; i++) {
    classData.push({
      class_name: faker.animal.type(),
      description: faker.lorem.lines(2)
    })
  }
  return classData
}

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('classes').del()
  await knex('classes').insert(createClass(8));
};
