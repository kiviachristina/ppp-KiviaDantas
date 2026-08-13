# PPP KiviaDantas — Automação de Testes de API (Node.js, Express, Vitest, Swagger)

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

