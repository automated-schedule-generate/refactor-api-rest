import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';

const module_name = process.argv[2];

if (!module_name) {
  console.error(
    chalk.redBright(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨  ERRO: Nome do módulo não informado
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`) +
      chalk.whiteBright(`
❌  Você precisa informar o nome do módulo para continuar.

📌  Comandos disponíveis:
  ▸  npm run generate:module <nome-do-módulo>
  ▸  yarn generate:module <nome-do-módulo>
  ▸  pnpm generate:module <nome-do-módulo>

🧪  Exemplos de uso:
  ▸  npm run generate:module user
  ▸  yarn generate:module user
  ▸  pnpm generate:module user

💡  Dica:
  Use nomes em kebab-case ou snake_case.
  Ex: company-settings ou company_settings
`),
  );
  process.exit(1);
}

const toPascalCase = (value: string) =>
  value
    .split(/[-_]/g) // separa por "-" ou "_"
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

const module_name_formated = toPascalCase(module_name);
const basePath = path.resolve(process.cwd() + '/src/modules', module_name);

//verifica se o modulo já existe
if (fs.existsSync(basePath)) {
  console.error(
    chalk.redBright(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨  ERRO: Módulo ${module_name} já existe!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`),
  );
  process.exit(1);
}

const createDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const createFile = (filePath: string, content: string) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
};

// Diretórios
const dirs = [
  'application/dtos',
  'application/use-cases',
  'domain/entities',
  'domain/repositories',
  'infrastructure/mappers',
  'infrastructure/models',
  'infrastructure/repositories',
  'presentation/controllers',
];

dirs.forEach((dir) => createDir(path.join(basePath, dir)));

// Files content

createFile(path.join(basePath, 'README.md'), `# Módulo ${module_name}`);

createFile(
  path.join(basePath, 'domain/entities', `${module_name}.entity.ts`),
  `export class ${module_name_formated}Entity {}\n`,
);

createFile(
  path.join(basePath, 'domain/repositories', `${module_name}.repository.ts`),
  `import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ${module_name_formated}Repository {}\n`,
);

createFile(
  path.join(basePath, 'infrastructure/mappers', `${module_name}.mapper.ts`),
  `import { ${module_name_formated}Entity } from '@entities';
import { ${module_name_formated}Model } from '@models';
  
export class ${module_name_formated}Mapper {
  static toEntity(model: ${module_name_formated}Model): ${module_name_formated}Entity {
    return new ${module_name_formated}Entity();
  }
}\n`,
);

createFile(
  path.join(basePath, 'infrastructure/models', `${module_name}.model.ts`),
  `import { Table, Model, Column, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: '${module_name}', underscored: true, timestamps: true })
export class ${module_name_formated}Model extends Model<${module_name_formated}Model, Partial<${module_name_formated}Model>> {

@Column({
  type: DataType.BOOLEAN,
  defaultValue: true,
})
is_active: boolean;

@CreatedAt
created_at: Date;

@UpdatedAt
updated_at: Date;

}\n`,
);

createFile(
  path.join(
    basePath,
    'infrastructure/repositories',
    `${module_name}.repository.impl.ts`,
  ),
  `import { ${module_name_formated}Repository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ${module_name_formated}Model } from '@models';

@Injectable()
export class ${module_name_formated}RepositoryImpl implements ${module_name_formated}Repository {
  constructor(@InjectModel(${module_name_formated}Model) private model: typeof ${module_name_formated}Model) {}
}\n`,
);

createFile(
  path.join(
    basePath,
    'presentation/controllers',
    `${module_name}.controller.ts`,
  ),
  `import { Controller } from '@nestjs/common';

@Controller('${module_name}')
export class ${module_name_formated}Controller {}\n`,
);

createFile(
  path.join(basePath, `${module_name}.module.ts`),
  `import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ${module_name_formated}Model } from '@models';
import { ${module_name_formated}Controller } from '@controllers';
import { ${module_name_formated}Repository } from '@repositories';
import { ${module_name_formated}RepositoryImpl } from '@repositories.impl';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([${module_name_formated}Model]),
  ],
  controllers: [${module_name_formated}Controller],
  providers: [
    {
      provide: ${module_name_formated}Repository,
      useClass: ${module_name_formated}RepositoryImpl,
    }
  ],
  exports: [
    {
      provide: ${module_name_formated}Repository,
      useClass: ${module_name_formated}RepositoryImpl,
    }
  ],
})
export class ${module_name_formated}Module {}\n`,
);

execSync('npm run generate:imports', {
  stdio: 'ignore', //não mostra o output no terminal
});

execSync(`npx prettier --write src/modules/${module_name}/**/*.ts`, {
  stdio: 'ignore', //não mostra o output no terminal
});

const messages_log: string[] = [];

messages_log.push(
  chalk.greenBright(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Módulo "${module_name}" criado com sucesso!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`),
);

messages_log.push(
  chalk.whiteBright(`📌  Pastas e arquivos gerados:

  ▸  ${module_name}/application/dtos
  ▸  ${module_name}/application/use-cases
  ▸  ${module_name}/domain/entities/${module_name}.entity.ts
  ▸  ${module_name}/domain/repositories/${module_name}.repository.ts
  ▸  ${module_name}/infrastructure/mappers/${module_name}.mapper.ts
  ▸  ${module_name}/infrastructure/models/${module_name}.model.ts
  ▸  ${module_name}/infrastructure/repositories/${module_name}.repository.impl.ts
  ▸  ${module_name}/presentation/controllers/${module_name}.controller.ts
  ▸  ${module_name}/${module_name}.module.ts
`),
);

messages_log.push(
  chalk.whiteBright(`📌  Caminho do módulo:

  ▸  src/modules/${module_name}
`),
);

messages_log.forEach((message) => console.log(message));
