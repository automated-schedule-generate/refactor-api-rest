const argon2 = require('argon2');
const { Op } = require('sequelize');
const { randomUUID } = require('node:crypto');

const hash = async (password) => {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
      secret: Buffer.from(process.env.JWT_SECRET || '')
    });
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao gerar hash');
  }
}

const users = [
  {
    name: 'John Doe',
    email: 'example@gmail.com',
    password: 'Password123!',
    cpf: '44442326096',
  },
  {
    name: 'Vera Fischer',
    email: 'verapeixes@gmail.com',
    password: 'Test@001',
    cpf: '11742948090'
  },
  {
    name: 'Claudiane Rodrigues',
    email: 'cra@discente.ifpe.edu.br',
    password: '@Exist000',
    cpf: '30052485005'
  },
  {
    name: 'Joana Tavares',
    email: 'jgn@discente.ifpe.edu.br',
    password: 'J@1234o',
    cpf: '75308621039'
  },
  {
    name: 'Weydson Lino',
    email: 'wls10@discente.ifpe.edu.br',
    password: 'Weydson.12',
    cpf: '30889157030'
  }
]

/** @type {import('sequelize-cli').Migration} */
const obj = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', await Promise.all(users.map(async (user) => ({
      ...user,
      password: await hash(user.password),
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
    }))))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', {
      email: {
        [Op.in]: users.map((user) => user.email),
      },
    });
  }
};


module.exports = obj;

// export default obj;