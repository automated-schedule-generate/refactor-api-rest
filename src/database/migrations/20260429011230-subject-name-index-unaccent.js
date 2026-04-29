'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_subject_name_unaccent
      ON subject USING GIN (immutable_unaccent("name") gin_trgm_ops);
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS idx_subject_name_unaccent;
    `);
  },
};
