const { Op } = require('sequelize');

const courses = [
  {
    name: 'Tecnologia em Sistemas para Internet (TSI)',
    total_semesters: 6,
    class_time: '45'
  },
  {
    name: 'Informática para Internet (IPI)',
    total_semesters: 3,
    class_time: '45'
  },
  {
    name: 'Administração (ADM)',
    total_semesters: 8,
    class_time: '60'
  },
  {
    name: 'Logística (LOG)',
    total_semesters: 3,
    class_time: '45'
  },
  {
    name: 'Tecnologia em Gestão da Qualidade (TGQIG)',
    total_semesters: 5,
    class_time: '45'
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('course', courses)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('course', {
      name: {
        [Op.in]: courses.map((course) => course.name)
      },
    })
  }
};
