# Módulos — Arquitetura Hexagonal

Cada subpasta aqui é um **módulo de domínio** gerado com o comando:

```bash
pnpm generate:module <nome-do-módulo>
```

Os módulos seguem a **Arquitetura Hexagonal** (também chamada de _Ports & Adapters_), organizada em três camadas bem definidas dentro de `src/modules/<nome>/`:

---

## Visão geral das camadas

```
<módulo>/
├── domain/               ← O núcleo. Não depende de nada externo.
│   ├── entities/         ← Entidades de domínio (regras de negócio)
│   └── repositories/     ← Portas de saída (interfaces/contratos abstratos)
│
├── application/          ← Orquestra o domínio. Não conhece HTTP nem banco.
│   ├── use-cases/        ← Casos de uso (cada arquivo = uma intenção do sistema)
│   └── dtos/             ← Objetos de transferência de dados (entrada/saída dos use-cases)
│
├── infrastructure/       ← Adaptadores. Implementa as portas definidas no domínio.
│   ├── models/           ← Modelos ORM (mapeamento para o banco de dados)
│   ├── mappers/          ← Conversão entre Model ↔ Entity
│   └── repositories/     ← Implementações concretas dos repositórios do domínio
│
├── presentation/         ← Adaptador de entrada. Expõe a API HTTP.
│   └── controllers/      ← Controllers NestJS (recebem requisições e delegam aos use-cases)
│
└── <módulo>.module.ts    ← Módulo NestJS que conecta tudo (DI container)
```

---

## O que cada camada faz

### `domain/` — O núcleo da aplicação

É a camada mais interna e **não possui dependências externas** (sem NestJS, sem ORM, sem HTTP).

- **`entities/`** — Representam os objetos do domínio com seus atributos e comportamentos. São POJOs simples (Plain Old JavaScript Objects).
- **`repositories/`** — Definem as **portas de saída** como classes abstratas. Descrevem _o que_ o sistema precisa fazer com os dados, sem dizer _como_. São injetadas via DI no NestJS.

```
NomeMódulo.repository.ts   →  abstract class NomeMóduloRepository { ... }
```

---

### `application/` — Casos de uso

Orquestra as regras de negócio usando as entidades e os repositórios do domínio. **Não sabe** como os dados chegam (HTTP? CLI? evento?) nem onde são persistidos (Postgres? Redis?).

- **`use-cases/`** — Um arquivo por caso de uso. Ex: `create-user.use-case.ts`, `find-user.use-case.ts`.
- **`dtos/`** — Define a forma dos dados que entram e saem dos use-cases.

---

### `infrastructure/` — Adaptadores de saída

Implementa as portas definidas no domínio, conectando ao mundo externo (banco de dados, serviços externos, etc.).

- **`models/`** — Mapeamento ORM da tabela no banco. Herda de `Model` do Sequelize.
- **`repositories/`** — Implementação concreta do repositório abstrato. Usa o model ORM para acessar o banco.
- **`mappers/`** — Traduz entre `Model` (infraestrutura) e `Entity` (domínio), mantendo as duas camadas desacopladas.

```
NomeMóduloRepositoryImpl  →  implements NomeMóduloRepository
NomeMóduloMapper          →  static toEntity(model): Entity
```

---

### `presentation/` — Adaptador de entrada

Expõe o módulo via HTTP. Recebe as requisições, valida os dados e delega para o use-case correspondente.

- **`controllers/`** — Controllers NestJS decorados com `@Controller`. Não contém lógica de negócio.

---

### `<módulo>.module.ts` — O conector

Registra no container de injeção de dependências do NestJS:

- O **controller** como ponto de entrada HTTP
- O **repositório concreto** (`RepositoryImpl`) como provedor do contrato abstrato (`Repository`)
- O **model ORM** via `SequelizeModule.forFeature`

```typescript
{
  provide: NomeMóduloRepository,       // porta (abstrato)
  useClass: NomeMóduloRepositoryImpl,  // adaptador (concreto)
}
```

---

## Fluxo de uma requisição

```
HTTP Request
    │
    ▼
Controller (presentation)
    │  valida e delega
    ▼
Use Case (application)
    │  chama a porta
    ▼
Repository (domain — abstrato)
    │  NestJS injeta a implementação concreta
    ▼
RepositoryImpl (infrastructure)
    │  consulta o banco via ORM
    ▼
Model → Mapper → Entity
    │
    ▼
Entity retorna ao Use Case → DTO → Controller → HTTP Response
```

---

## Regra de dependência

> As dependências sempre apontam **de fora para dentro**. O domínio nunca conhece a infraestrutura.

| Camada           | Pode depender de        | Não pode depender de           |
| ---------------- | ----------------------- | ------------------------------ |
| `domain`         | _(nada externo)_        | application, infrastructure    |
| `application`    | `domain`                | infrastructure, presentation   |
| `infrastructure` | `domain`, `application` | `presentation`                 |
| `presentation`   | `application`, `domain` | `infrastructure` (diretamente) |

---

## Adicionando arquivos a um módulo existente

Após criar ou remover **qualquer arquivo** manualmente dentro de `src/modules/`, execute:

```bash
pnpm generate:imports
```

Isso mantém os **barrel files** em `src/imports/` sincronizados, garantindo que os aliases de importação (`@controllers`, `@entities`, `@models`, etc.) funcionem corretamente em todo o projeto.
