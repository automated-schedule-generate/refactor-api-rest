//seed roles

import { uuidv7 } from 'uuidv7';

const roles = [
  {
    id: '019f3281-88c2-7daf-9a8f-d03e4981a713',
    name: 'ADMIN',
    priority: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '019f3281-ab59-77af-aad4-8a1786ec11d1',
    name: 'CRADT',
    priority: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '019f3281-ad59-77af-aad4-8a1786ec11d1',
    name: 'DEN',
    priority: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '019f3281-af68-77af-a4bb-314e5da659e0',
    name: 'COMMON',
    priority: 999,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const user_ids = [
  '019e8fd1-6825-7317-a3e0-ad547ce9858c',
  '019e8fd1-c419-7114-b902-a7e462d1b5db',
  '019e8fd1-f7b2-7537-b936-8f8521f6a2b9',
  '019e8fd2-3517-728c-b0fb-9d90983c5c82',
  '019e8fd2-5048-723b-b252-0b82efbc9ac7',
];

const organization_id = '019f3282-927a-7f57-82ed-d3eeea582849';

const user_roles = [];

for (const role of roles) {
  for (const user_id of user_ids) {
    user_roles.push({
      id: uuidv7(),
      user_id,
      role_id: role.id,
      organization_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('roles', roles, { transaction });

      await queryInterface.bulkInsert('user_role_organization', user_roles, {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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
