# ♊ Gemini Instructions: Refactor API REST

Este arquivo contém instruções específicas para o Gemini CLI e outros agentes que operam neste repositório.

## 📋 Regras de Ouro

1.  **Imports:** NUNCA use caminhos relativos para arquivos dentro de `src/modules`. Sempre use os path aliases (ex: `@entities`, `@use-cases`, `@models`).
2.  **Sincronização:** Após criar qualquer novo arquivo em `src/modules/`, você **DEVE** rodar `npm run generate:imports` para atualizar os barrel files.
3.  **Criação de Módulos:** Sempre use o comando `npm run generate:module <nome>` em vez de criar as pastas manualmente. Isso garante que a estrutura de Clean Architecture seja respeitada.
4.  **Banco de Dados:** O projeto utiliza Sequelize com TypeScript. Garanta que os modelos em `infrastructure/models` estendam `Model` do `sequelize-typescript`.
5.  **Entidades vs Modelos:** Não misture as camadas. Entidades de domínio em `domain/entities` são classes TypeScript puras. Modelos em `infrastructure/models` são decorados para o banco de dados.

## 🛠️ Comandos Frequentes para o Agente

- **Gerar Módulo:** `npm run generate:module modulo_name`
- **Atualizar Imports:** `npm run generate:imports`
- **Lint & Format:** `npm run lint && npm run format`

## 🏗️ Padrão de Injeção de Dependência

Sempre utilize classes abstratas no `domain/repositories` como tokens de injeção e forneça a implementação concreta em `infrastructure/repositories` via o módulo NestJS.

Exemplo no módulo:

```typescript
{
  provide: MyRepository,
  useClass: MyRepositoryImpl,
}
```
