'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS unaccent SCHEMA public;`,
    );

    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS pg_trgm SCHEMA public;`,
    );

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION immutable_unaccent(text)
      RETURNS text AS $$
        SELECT public.unaccent($1);
      $$ LANGUAGE SQL IMMUTABLE PARALLEL SAFE;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      `DROP FUNCTION IF EXISTS immutable_unaccent(text);`,
    );
    await queryInterface.sequelize.query(`DROP EXTENSION IF EXISTS pg_trgm;`);
    await queryInterface.sequelize.query(`DROP EXTENSION IF EXISTS unaccent;`);
  },
};
