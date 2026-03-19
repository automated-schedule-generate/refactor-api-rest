# ASGEN — API REST

API REST do sistema **ASGEN** (Automated Schedule Generator), construída com **NestJS** e seguindo a arquitetura **Clean Architecture / DDD**.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 24
- [pnpm](https://pnpm.io/), [npm](https://npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) _(opcional)_

---

## Variáveis de ambiente

Copie o arquivo de exemplo e ajuste os valores conforme seu ambiente:

```bash
cp .env.example .env
```

| Variável      | Descrição                              | Padrão      |
| ------------- | -------------------------------------- | ----------- |
| `ENVIRONMENT` | Ambiente (`dev`, `test`, `rc`, `prod`) | `dev`       |
| `PORT`        | Porta da API                           | `3000`      |
| `DB_NAME`     | Nome do banco de dados                 | `asgen`     |
| `DB_USER`     | Usuário do banco                       | `postgres`  |
| `DB_PASS`     | Senha do banco                         | `postgres`  |
| `DB_HOST`     | Host do banco                          | `localhost` |
| `DB_PORT`     | Porta do banco                         | `5432`      |

---

## Rodando com Docker Compose

O `docker-compose.yml` possui três serviços e usa **profiles** para separar os ambientes:

| Profile | Serviços iniciados                                   |
| ------- | ---------------------------------------------------- |
| `dev`   | `asgen-database` + `api-dev` (hot-reload via volume) |
| `prd`   | `asgen-database` + `api-prd` (imagem de produção)    |

### Desenvolvimento

```bash
docker compose --profile dev up --build
```

### Produção

```bash
docker compose --profile prd up --build
```

> **Dica:** adicione `-d` ao final para rodar em modo _detached_ (background).

---

## Rodando sem Docker

### 1. Instale as dependências

```bash
# pnpm (recomendado)
pnpm install

# npm
npm install

# yarn
yarn install
```

### 2. Inicie a API

| Modo                    | pnpm               | npm                   | yarn               |
| ----------------------- | ------------------ | --------------------- | ------------------ |
| Desenvolvimento (watch) | `pnpm start:dev`   | `npm run start:dev`   | `yarn start:dev`   |
| Produção                | `pnpm start:prod`  | `npm run start:prod`  | `yarn start:prod`  |
| Debug                   | `pnpm start:debug` | `npm run start:debug` | `yarn start:debug` |

---

## Scripts disponíveis

| Script                             | Descrição                                                    |
| ---------------------------------- | ------------------------------------------------------------ |
| `start:dev`                        | Inicia em modo _watch_ (desenvolvimento)                     |
| `start:prod`                       | Inicia a versão compilada em produção                        |
| `build`                            | Compila o projeto TypeScript                                 |
| `lint`                             | Executa o ESLint com auto-fix                                |
| `format`                           | Formata o código com Prettier                                |
| `test`                             | Executa os testes unitários                                  |
| `test:cov`                         | Executa os testes com cobertura                              |
| `test:e2e`                         | Executa os testes end-to-end                                 |
| `generate:module <nome-do-módulo>` | Cria a estrutura completa de um novo módulo                  |
| `generate:imports`                 | Atualiza os barrel files (índices de exportação) automáticos |

---

## Criando novos módulos

O projeto possui um gerador de módulos que cria automaticamente toda a estrutura de pastas e arquivos seguindo a **Clean Architecture**.

```bash
# pnpm
pnpm generate:module <nome-do-módulo>

# npm
npm run generate:module <nome-do-módulo>

# yarn
yarn generate:module <nome-do-módulo>
```

> Use nomes em **kebab-case** ou **snake_case**. Ex: `company-settings` ou `company_settings`.

### Estrutura gerada

Para `pnpm generate:module user`:

```
src/modules/user/
├── application/
│   ├── dtos/
│   └── use-cases/
├── domain/
│   ├── entities/
│   │   └── user.entity.ts
│   └── repositories/
│       └── user.repository.ts
├── infrastructure/
│   ├── mappers/
│   │   └── user.mapper.ts
│   ├── models/
│   │   └── user.model.ts
│   └── repositories/
│       └── user.repository.impl.ts
├── presentation/
│   └── controllers/
│       └── user.controller.ts
├── user.module.ts
└── README.md
```

> O comando `generate:module` já executa `generate:imports` automaticamente ao final.

---

## Atualizando os barrel files (imports)

O projeto utiliza **barrel files** em `src/imports/` para centralizar as exportações de todas as classes (controllers, entities, models, repositories, etc.). Esses arquivos são gerados automaticamente.

**Sempre que você criar ou remover um arquivo manualmente**, execute:

```bash
# pnpm
pnpm generate:imports

# npm
npm run generate:imports

# yarn
yarn generate:imports
```

Isso varre a pasta `src/modules/` e atualiza os seguintes arquivos:

| Arquivo                | Exportações de          |
| ---------------------- | ----------------------- |
| `controllers.ts`       | `*.controller.ts`       |
| `entities.ts`          | `*.entity.ts`           |
| `models.ts`            | `*.model.ts`            |
| `repositories.ts`      | `*.repository.ts`       |
| `repositories.impl.ts` | `*.repository.impl.ts`  |
| `mappers.ts`           | `*.mapper.ts`           |
| `dtos.ts`              | `*.dto.ts`              |
| `use-cases.ts`         | `*.use-case.ts`         |
| `services.ts`          | `*.service.ts`          |
| `modules.ts`           | `*.module.ts`           |
| `guards.ts`            | `*.guard.ts`            |
| `interfaces.ts`        | `*.interface.ts`        |
| `enums.ts`             | `*.enum.ts`             |
| `contracts.ts`         | `*.service-contract.ts` |
| `factories.ts`         | `*.factory.ts`          |
| `builders.ts`          | `*.query-builder.ts`    |

> ⚠️ **Não edite esses arquivos manualmente.** Eles são sobrescritos pelo script a cada execução.

---

## Estrutura do projeto

```
src/
├── imports/            # Barrel files gerados automaticamente
├── generate-modules/   # Script gerador de módulos
├── modules/            # Módulos da aplicação (domínio de negócio)
│   └── <módulo>/
│       ├── application/
│       ├── domain/
│       ├── infrastructure/
│       └── presentation/
├── app.module.ts
└── main.ts
```
