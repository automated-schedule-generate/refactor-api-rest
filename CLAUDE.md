# CLAUDE.md

@AGENTS.md

---

## 🧠 Instruções Específicas para Claude Code

### Antes de qualquer tarefa

- Leia o `AGENTS.md` acima para entender a stack, arquitetura e convenções do projeto.
- Se precisar criar um novo módulo, **sempre** use `npm run generate:module <nome>`. Nunca crie a estrutura manualmente.
- Após criar ou mover arquivos, rode `npm run generate:imports` para manter os barrel files em `src/imports/` atualizados.

### Arquitetura — regras críticas

- Respeite rigorosamente as 4 camadas: **Domain → Application → Infrastructure → Presentation**.
- Regras de negócio ficam **somente** em `domain/entities/`. Nunca coloque lógica de negócio em controllers ou use-cases.
- Repositórios em `domain/repositories/` são **interfaces abstratas**. A implementação concreta fica em `infrastructure/repositories/` com sufixo `.repository.impl.ts`.
- Conversões entre Model (Sequelize) e Entity (Domain) são feitas **exclusivamente** nos `mappers/`.
- Controllers não acessam repositórios diretamente — passam pelos use-cases.

### Imports

- **Sempre** use os path aliases (`@entities`, `@use-cases`, `@dtos`, etc.).
- Nunca use imports relativos longos como `../../modules/user/domain/entities`.
- Aliases apontam para `src/imports/` — não importe diretamente de dentro dos módulos.

### Comandos — use exatamente estes

```bash
npm run start:dev          # Dev com hot-reload
npm run build              # Build de produção
npm run generate:module <nome>   # Novo módulo (obrigatório)
npm run generate:imports   # Atualiza barrel files (rodar após mover/criar arquivos)
npm run format             # Prettier
npm run lint               # ESLint com autocorreção
npm run test               # Testes unitários (Jest)
```

### Convenções de código

- Validação de inputs: `class-validator` + `class-transformer` nos DTOs.
- Hashing de senhas: `argon2` — nunca bcrypt ou MD5.
- Autenticação: `@nestjs/jwt` com Guards.
- Nunca use `process.env` diretamente — acesse variáveis via `ConfigService` do NestJS.
- Commits seguem **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `chore:`, etc.) — o Commitlint vai rejeitar outros formatos.

### O que nunca fazer

- ❌ Não edite arquivos em `src/imports/` manualmente — são gerados automaticamente.
- ❌ Não crie módulos sem usar o script de scaffold.
- ❌ Não coloque lógica de negócio fora da camada Domain.
- ❌ Não use imports relativos quando existir um alias disponível.
- ❌ Não commite `.env` — use `.env.example` como referência.

### Verificação antes de concluir uma tarefa

1. `npm run lint` — sem erros de ESLint.
2. `npm run format` — código formatado com Prettier.
3. `npm run test` — todos os testes passando.
4. `npm run generate:imports` — se criou ou moveu arquivos.
