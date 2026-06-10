# CLAUDE.md

@AGENTS.md

---

## Instruções Específicas para Claude Code

### Antes de qualquer tarefa

- Leia o `AGENTS.md` acima para entender a stack, arquitetura e convenções do projeto.
- O gerenciador de pacotes é **pnpm** (não npm). Use sempre `pnpm run <script>`.
- Se precisar criar um novo módulo, **sempre** use `pnpm run generate:module <nome>`. Nunca crie a estrutura manualmente.
- Após criar ou mover arquivos, rode `pnpm run generate:imports` para manter os barrel files em `src/imports/` atualizados.

### Arquitetura — regras críticas

- Respeite rigorosamente as 4 camadas: **Domain → Application → Infrastructure → Presentation**.
- Regras de negócio ficam **somente** em `domain/entities/`. Nunca coloque lógica de negócio em controllers ou use-cases.
- Repositórios em `domain/repositories/` são **interfaces abstratas**. A implementação concreta fica em `infrastructure/repositories/` com sufixo `.repository.impl.ts`.
- Conversões entre Model (Sequelize) e Entity (Domain) são feitas **exclusivamente** nos `mappers/`.
- Controllers não acessam repositórios diretamente — passam pelos use-cases.
- Queries complexas com filtros dinâmicos usam `query-builder` em `infrastructure/` (ex: `subject.query-builder.ts`).

### Módulos existentes

O projeto possui 12 módulos em `src/modules/`:

| Módulo                     | Responsabilidade                                   |
| -------------------------- | -------------------------------------------------- |
| `auth`                     | Login, refresh token, sessão JWT                   |
| `user`                     | Cadastro e gestão de usuários                      |
| `teacher`                  | Cadastro e gestão de professores                   |
| `course`                   | Cursos (bacharelado, licenciatura, etc.)           |
| `subject`                  | Disciplinas e associação com professores/semestres |
| `class`                    | Turmas por curso e turno                           |
| `semester`                 | Semestres letivos                                  |
| `preference`               | Preferências de disponibilidade dos professores    |
| `preference-time`          | Horários detalhados das preferências               |
| `coordinator`              | Coordenadores de curso                             |
| `subject-teacher-semester` | Tabela de junção disciplina-professor-semestre     |
| `organization`             | Organização institucional                          |

### Imports

- **Sempre** use os path aliases. Nunca use imports relativos longos.
- Aliases disponíveis (apontam para `src/imports/`):

```
@controllers   @dtos           @entities      @factories
@interfaces    @mappers        @models        @modules
@repositories  @repositories.impl  @services  @use-cases
@guards        @enums          @contracts     @builders
@decorators
@database/*    @commons/*
```

### Comandos — use exatamente estes

```bash
pnpm run start:dev              # Dev com hot-reload (nodemon)
pnpm run start:prod             # Produção
pnpm run build                  # Build de produção
pnpm run generate:module <nome> # Novo módulo (obrigatório)
pnpm run generate:imports       # Atualiza barrel files
pnpm run format                 # Prettier
pnpm run lint                   # ESLint com autocorreção
pnpm run test                   # Testes unitários (Jest)
pnpm run test:watch             # Testes em watch mode
pnpm run test:cov               # Testes com cobertura
pnpm run test:e2e               # Testes end-to-end
```

### Convenções de código

- Validação de inputs: `class-validator` + `class-transformer` nos DTOs.
- Hashing de senhas: `argon2` — nunca bcrypt ou MD5.
- Autenticação: `@nestjs/jwt` com Guards (`auth.guard.ts`).
- Datas: use `luxon` — nunca `new Date()` diretamente.
- IDs: use `uuidv7` para geração de identificadores únicos.
- Nunca use `process.env` diretamente — acesse variáveis via `ConfigService` do NestJS.
- Commits seguem **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `chore:`, etc.) — Commitlint rejeita outros formatos.
- Branches seguem o padrão `(feat|fix|hotfix|release)/[a-z0-9._-]+` — validado pelo GitHub Actions.

### Banco de dados

- ORM: Sequelize com `sequelize-typescript`. O `synchronize: true` está ativo.
- Migrations em `src/database/migrations/` — rodar com `sequelize-cli`.
- Seeders em `src/database/seeders/` — para dados base (usuários, cursos, disciplinas).
- A extensão `unaccent` do PostgreSQL está ativa para buscas sem acento.

### Docker

- `docker-compose.yml` possui perfis `prd` e `dev`.
- Banco de dados: PostgreSQL 18 no serviço `asgen-database`.
- O `Dockerfile` usa build multi-stage e entrega o runtime via **Deno** (edge deployment).
- Para desenvolvimento local: `Dockerfile.dev`.

### O que nunca fazer

- Não edite arquivos em `src/imports/` manualmente — são gerados automaticamente.
- Não crie módulos sem usar o script de scaffold.
- Não coloque lógica de negócio fora da camada Domain.
- Não use imports relativos quando existir um alias disponível.
- Não commite `.env` — use `.env.example` como referência.
- Não use `npm` ou `yarn` — o projeto usa **pnpm**.

### Verificação antes de concluir uma tarefa

1. `pnpm run lint` — sem erros de ESLint.
2. `pnpm run format` — código formatado com Prettier.
3. `pnpm run test` — todos os testes passando.
4. `pnpm run generate:imports` — se criou ou moveu arquivos.
