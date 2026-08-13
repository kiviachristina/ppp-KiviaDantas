# Automação de Testes de API (Node.js, Express, Vitest, Swagger)

Projeto de portfólio voltado a automação de testes de APIs e validação de regras de negócio e casos de borda. Implementa uma API REST em memória (simulada) que serve como alvo para uma suíte de testes automatizados escrita com Vitest e Supertest. A API fornece endpoints de gerenciamento de usuários e produtos, possui documentação OpenAPI (Swagger) e autenticação por JWT.

---

## Tecnologias e Dependências Utilizadas

- Node.js (ES Modules)
- Express (servidor HTTP)
- Vitest (test runner)
- Supertest (testes de integração HTTP)
- jsonwebtoken (JWT)
- swagger-ui-express (Swagger UI)
- nodemon (desenvolvimento)

Dependências estão listadas em `package.json`.

---

## Arquitetura e Estrutura de Pastas

O projeto segue uma organização em camadas para facilitar manutenção e testes:

- `src/index.js` — ponto de entrada da aplicação (monta rotas e Swagger UI).
- `src/api/routes/` — definição das rotas Express (por recurso).
- `src/api/controllers/` — handlers que recebem requisições e chamam os services.
- `src/api/services/` — lógica de negócio e armazenamento em memória (arrays).
- `src/api/models/` — fábricas e shapes de objetos (usuário/produto).
- `src/api/middlewares/` — middlewares reutilizáveis, incluindo `authMiddleware.js` (JWT).
- `resources/swagger.json` — especificação OpenAPI da API (arquivo estático).
- `tests/` — suíte de testes automatizados (Vitest + Supertest).

Essa estrutura separa responsabilidades e facilita a criação de testes unitários e de integração.

---

## Pré-requisitos

- Node.js v18+ (recomendado)
- npm v9+ (ou gerenciador de pacotes compatível)

Verifique as versões instaladas:

```bash
node -v
npm -v
```

---

## Passo a Passo de Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/kiviachristina/ppp-KiviaDantas.git
cd ppp-KiviaDantas
```

2. Instale as dependências:

```bash
npm install
```

3. Variáveis de ambiente (opcional, recomendado):

Crie um arquivo `.env` ou exporte variáveis no ambiente com ao menos:

```
PORT=3000
JWT_SECRET=uma_chave_forte_aqui
```

4. Executar o servidor:

- Modo produção/local (sem reload):

```bash
node src/index.js
```

- Modo desenvolvimento (com nodemon):

```bash
npm run dev
```

5. Acesse a API e documentação:

- URL base: `http://localhost:3000`
- Swagger UI (documentação interativa): `http://localhost:3000/api-docs`

---

## Como Rodar a Suíte de Testes Automatizados

Testes implementados com Vitest e Supertest (integração HTTP).

- Executar testes:

```bash
npx vitest run
# ou
npm test
```

- Executar testes com relatório de cobertura (V8 provider):

```bash
npm run test:coverage
```

O relatório de cobertura será gerado em `coverage/`.

---

## Segurança e Autenticação

A autenticação implementada utiliza JSON Web Tokens (JWT):

- O endpoint `POST /api/users/login` retorna um token JWT no formato `{ "authorization": "<token>" }`.
- Endpoints protegidos exigem o header HTTP `Authorization` com o valor `Bearer <token>`.
- A validação do token é feita no middleware `src/api/middlewares/authMiddleware.js`, que verifica a assinatura usando a variável de ambiente `JWT_SECRET` (ou um valor padrão em desenvolvimento). Em caso de token inválido ou ausente, a API retorna `401 Unauthorized`.

Observações de segurança:
- Não commit o segredo JWT em repositórios públicos. Use variáveis de ambiente ou secret manager.
- Em produção, substitua o armazenamento em memória por banco persistente e implemente políticas de segurança adicionais (rate limiting, CORS adequado, validação/sanitização de entradas).

---

## Autora

Kívia Dantas


---

## 🧾 Wiki — Guia de Testes (foco QA)

Esta seção funciona como uma mini-wiki focada na atividade de QA: como os testes foram organizados, a estratégia adotada, diretrizes para escrever novos testes e como interpretar relatórios de cobertura.

### 1) Objetivo dos testes
- Validar regras de negócio e casos de borda da API E-Commerce.
- Garantir comportamento esperado em criação/autenticação de usuários e operações CRUD de produtos.

### 2) Tipos de testes incluídos
- Testes de integração HTTP (Vitest + Supertest): exercitam rotas reais da aplicação contra o app Express exportado (`src/index.js`).
- Testes unitários podem ser adicionados na pasta `tests/` utilizando mocks nas services.

### 3) Localização dos testes
- Arquivos de teste: `tests/*.spec.js` (ex.: `tests/api.spec.js`, `tests/business-rules.spec.js`).

### 4) Estratégia de escrita de testes
- Priorizar regras de negócio e fluxos críticos (login, autorização, validação de payloads).
- Cada teste deve ser independente e idempotente: use emails/produtos gerados dinamicamente para evitar colisões.
- Preferir testar comportamentos (status codes, mensagens, shape do JSON) em vez de implementação interna.

### 5) Como adicionar um novo teste (passo a passo)
1. Criar arquivo `tests/novo-caso.spec.js`.
2. Importar `request` do `supertest` ou usar as funções utilitárias já existentes.
3. Emular cenário: criar usuário, autenticar, realizar ações autorizadas.
4. Assertar status code, corpo da resposta e efeitos colaterais esperados.

Exemplo mínimo (Vitest + Supertest):

```js
import request from 'supertest';
import app from '../src/index.js';
import { describe, it, expect } from 'vitest';

describe('Exemplo', () => {
  it('retorna 200 em /api/products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
  });
});
```

### 6) Rodando testes localmente
- Executar todos os testes:

```bash
npm test
# ou
npx vitest run
```

- Rodar testes com cobertura:

```bash
npm run test:coverage
```

### 7) Interpretação do relatório de cobertura
- Relatório V8 mostra percentuais por arquivo: Statements, Branches, Functions e Lines.
- Foco em aumentar testes nas áreas com baixa cobertura de branches e funções críticas.

### 8) Integração contínua (sugestão)
- Configurar pipeline (GitHub Actions / GitLab CI) para:
  - `npm ci`
  - `npx vitest run --coverage`
  - Falhar o pipeline se cobertura global estiver abaixo de um threshold (ex.: 75%).

### 9) Boas práticas de QA aplicáveis aqui
- Manter testes pequenos e com responsabilidade única.
- Evitar dependência entre testes.
- Usar dados gerados dinamicamente (timestamps, random) para evitar colisões.
- Revisar e atualizar casos de borda à medida que novas regras de negócio surgem.

### 10) Debug e diagnóstico
- Habilite logs temporários no código (ou utilize `console.log`) durante desenvolvimento de testes.
- Execute testes isolados com `npx vitest run tests/file.spec.js` para reduzir ruído ao depurar.

### 11) Próximos passos recomendados para QA
- Adicionar testes de contrato (contract tests) se houver integração externa.
- Introduzir fixtures reutilizáveis para dados de teste.
- Automatizar execução de testes no CI com thresholds de cobertura.

---

