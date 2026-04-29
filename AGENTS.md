# 🤖 Agent Context: Refactor API REST

Este documento fornece um contexto completo do projeto para IAs, desenvolvedores e agentes automatizados.

## 🏗️ Visão Geral

- **Nome do Projeto:** refactor-api-rest
- **Framework:** [NestJS](https://nestjs.com/) (v11)
- **Runtime:** [Node.js](https://nodejs.org/) (ES2023+)
- **Plataforma HTTP:** [Fastify](https://www.fastify.io/)
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL
- **ORM:** [Sequelize](https://sequelize.org/) com `sequelize-typescript`

## 🏛️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **Arquitetura Hexagonal**, organizado de forma modular.

### Camadas de um Módulo (dentro de `src/modules/`):

1.  **Domain:** Regras de negócio puras.
    - `entities/`: Entidades de domínio.
    - `repositories/`: Interfaces (classes abstratas) de repositórios.
2.  **Application:** Casos de uso e DTOs.
    - `use-cases/`: Lógica de aplicação.
    - `dtos/`: Objetos de transferência de dados.
3.  **Infrastructure:** Implementações técnicas e detalhes de banco.
    - `models/`: Modelos do Sequelize.
    - `repositories/`: Implementação concreta dos repositórios (`.repository.impl.ts`).
    - `mappers/`: Conversão entre Modelos (DB) e Entidades (Domain).
4.  **Presentation:** Interface de entrada (HTTP).
    - `controllers/`: Controllers do NestJS.

## 📂 Estrutura de Pastas Principal

- `src/commons/`: Utilitários, interceptors, middlewares e validações compartilhadas.
- `src/configuration/`: Arquivos de configuração (Swagger, Prefixo, Compressão, etc).
- `src/database/`: Configuração central do Sequelize.
- `src/imports/`: **Barrel files gerados automaticamente** que facilitam as importações via aliases.
- `src/modules/`: Módulos funcionais da aplicação.
- `src/generate-modules/`: Script de scaffold para novos módulos.

## 🚀 Comandos Úteis

| Comando                          | Descrição                                               |
| :------------------------------- | :------------------------------------------------------ |
| `npm run start:dev`              | Inicia o servidor em modo de desenvolvimento (nodemon). |
| `npm run build`                  | Compila o projeto para produção.                        |
| `npm run generate:module <nome>` | Cria um novo módulo completo seguindo a arquitetura.    |
| `npm run generate:imports`       | Atualiza os arquivos de exportação em `src/imports/`.   |
| `npm run format`                 | Formata o código com Prettier.                          |
| `npm run lint`                   | Executa o ESLint para correção de erros.                |
| `npm run test`                   | Executa os testes unitários com Jest.                   |

## 🔗 Aliases de Caminho (Path Aliases)

O projeto utiliza aliases para evitar imports relativos complexos. **Importante:** Todos os aliases apontam para arquivos em `src/imports/` que são agregadores.

- `@entities`, `@models`, `@controllers`, `@use-cases`, `@repositories`, `@repositories.impl`, `@dtos`, `@services`, `@guards`, `@enums`, `@interfaces`, `@mappers`, `@builders`, `@contracts`.

Exemplo de uso: `import { UserEntity } from '@entities';`

## 🛠️ Stack Tecnológica & Libs

- **Segurança:** `argon2` (hashing), `@nestjs/jwt` (autenticação).
- **Validação:** `class-validator` e `class-transformer`.
- **Logs:** `LogginDevInterceptor` customizado.
- **Documentação:** Swagger disponível em `/docs` (por padrão).
- **Performance:** HTTP/2 (em dev), Compressão (Fastify).
- **Padronização:** Husky, Lint-staged, Commitlint (Conventional Commits).

## 📝 Convenções

- **Commits:** Seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/).
- **Imports:** Sempre prefira usar os Path Aliases (`@...`).
- **Novos Módulos:** Sempre use o script `npm run generate:module` para manter a consistência.
- **Variáveis de Ambiente:** Configuradas via `.env` (exemplo em `.env.example`).
