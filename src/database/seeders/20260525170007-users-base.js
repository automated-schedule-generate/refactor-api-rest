import * as argon2 from 'argon2';
import { Op } from 'sequelize';

const hash = async (password) => {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
      secret: Buffer.from(process.env.JWT_SECRET || ''),
    });
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao gerar hash');
  }
};

const users = [
  {
    id: '019e8fd1-6825-7317-a3e0-ad547ce9858c',
    name: 'John Doe',
    email: 'example@gmail.com',
    password: 'Password123!',
    cpf: '44442326096',
  },
  {
    id: '019e8fd1-c419-7114-b902-a7e462d1b5db',
    name: 'Vera Fischer',
    email: 'verapeixes@gmail.com',
    password: 'Test@001',
    cpf: '11742948090',
  },
  {
    id: '019e8fd1-f7b2-7537-b936-8f8521f6a2b9',
    name: 'Claudiane Rodrigues',
    email: 'cra@discente.ifpe.edu.br',
    password: '@Exist000',
    cpf: '30052485005',
  },
  {
    id: '019e8fd2-3517-728c-b0fb-9d90983c5c82',
    name: 'Joana Tavares',
    email: 'jgn@discente.ifpe.edu.br',
    password: 'J@1234o',
    cpf: '75308621039',
  },
  {
    id: '019e8fd2-5048-723b-b252-0b82efbc9ac7',
    name: 'Weydson Lino',
    email: 'wls10@discente.ifpe.edu.br',
    password: 'Weydson.12',
    cpf: '30889157030',
  },
];

const organization = {
  id: '019f3282-927a-7f57-82ed-d3eeea582849',
  name: 'IFPE (Instituto Federal de Pernambuco) - Campus Igarassu',
  user_id: '019e8fd1-6825-7317-a3e0-ad547ce9858c',
  is_active: true,
  created_at: new Date(),
  updated_at: new Date(),
};

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert(
        'user',
        await Promise.all(
          users.map(async (user) => ({
            ...user,
            password: await hash(user.password),
            created_at: new Date(),
            updated_at: new Date(),
          })),
        ),
        {
          transaction,
        },
      );

      await queryInterface.bulkInsert('organization', [organization], {
        transaction,
      });

      await queryInterface.bulkInsert(
        'teacher',
        users.map((user) => ({
          user_id: user.id,
          special_need: false,
          workload: '40',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        })),
        {
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', {
      email: {
        [Op.in]: users.map((user) => user.email),
      },
    });
  },
};
