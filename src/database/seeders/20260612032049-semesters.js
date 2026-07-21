/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const semester = {
      id: '019eb9d9-877c-7a7c-9927-1eed91b01717',
      year: '2026',
      semester: '1',
      is_finished: false,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await queryInterface.bulkInsert('semester', [semester]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
