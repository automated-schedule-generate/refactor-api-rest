const { Op } = require('sequelize');
const { uuidv7 } = require('uuidv7');

const courses = [
  {
    id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
    name: 'Tecnologia em Sistemas para Internet (TSI)',
    total_semesters: 6,
    class_time: '45',
  },
  {
    id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
    name: 'Informática para Internet (IPI)',
    total_semesters: 3,
    class_time: '45',
  },
  {
    id: '019e8fd3-232c-792e-a887-fca366ef1737',
    name: 'Administração (ADM)',
    total_semesters: 8,
    class_time: '60',
  },
  {
    id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
    name: 'Logística (LOG)',
    total_semesters: 3,
    class_time: '45',
  },
  {
    id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
    name: 'Tecnologia em Gestão da Qualidade (TGQIG)',
    total_semesters: 5,
    class_time: '45',
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'course',
      courses.map((course) => ({
        ...course,
        created_at: new Date(),
        updated_at: new Date(),
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('course', {
      name: {
        [Op.in]: courses.map((course) => course.name),
      },
    });
  },
};
