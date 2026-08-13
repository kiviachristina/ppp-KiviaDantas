# PPP KiviaDantas - E-Commerce API (In-Memory)

Este projeto fornece uma API REST simples em memória para suportar uma suíte de testes de regras de negócio e casos de borda (API e-Commerce).

Principais pontos:
  - `POST /api/users` — criar usuário
  - `POST /api/users/login` — autenticar (retorna `authorization` token)
  - `POST /api/products` — criar produto (requer header `Authorization`)
  - `GET /api/products` — listar produtos
  - `GET /api/products/:id` — obter produto por id
  - `PUT /api/products/:id` — atualizar produto (requer `Authorization`)
  - `DELETE /api/products/:id` — deletar produto (requer `Authorization`)

📌 Nome do Projeto e Breve Descrição

PPP KiviaDantas — E-Commerce API (In-Memory)

API REST em memória desenvolvida como projeto de portfólio para testes de qualidade (QA) de APIs. Implementada em Node.js com foco em facilitar a automação de testes de regras de negócio e casos de borda.

🚀 Tecnologias Utilizadas

- Node.js
- Express
- Vitest (test runner)
- Supertest (integração HTTP nos testes)
- JSON Web Token (JWT) para autenticação
- swagger-ui-express + arquivo OpenAPI (`resources/swagger.json`)
- nodemon (desenvolvimento)

🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura em camadas para separar responsabilidades:

- `routes` — define endpoints e aplica middlewares (arquivo: `src/api/routes/`).
- `controllers` — recebe requisições, valida e retorna respostas HTTP (arquivo: `src/api/controllers/`).
- `services` — contém a lógica de negócio e o armazenamento em memória (arquivo: `src/api/services/`).
- `models` — fábricas/estruturas de dados para respostas e armazenamento (arquivo: `src/api/models/`).
- `middlewares` — middlewares reutilizáveis, incluindo autenticação JWT (`src/api/middlewares/authMiddleware.js`).

⚙️ Pré-requisitos

- Node.js >= 18 (recomendado)
- npm >= 9

📦 Passo a Passo de Instalação e Execução Local

1. Clone o repositório:

```bash
git clone https://github.com/kiviachristina/ppp-KiviaDantas.git
cd ppp-KiviaDantas
```

2. Instale as dependências:

```bash
npm install
```

3. Rodar o servidor (modo local/prod):

```bash
node src/index.js
```

Ou em modo desenvolvimento (recarregamento automático):

```bash
npm run dev
```

4. Documentação Swagger (UI):

Abra no navegador:

```
http://localhost:3000/api-docs
```

🧪 Como Rodar a Suíte de Testes Automatizados

- Executar testes (Vitest):

```bash
npx vitest run
# ou
npm test
```

- Gerar relatório de cobertura (V8 provider):

```bash
npm run test:coverage
```

O relatório é gerado no diretório `coverage/`.

🔐 Autenticação e Segurança

- A API utiliza JWT para autenticação.
- O endpoint `POST /api/users/login` retorna um token JWT (`{ authorization: "<token>" }`).
- Endpoints protegidos (ex.: criação/alteração/exclusão de produtos) exigem o header:

```
Authorization: Bearer <TOKEN>
```

- O middleware `src/api/middlewares/authMiddleware.js` valida o token usando a variável de ambiente `JWT_SECRET` (ou um valor padrão em desenvolvimento). Em caso de token ausente ou inválido, retorna `401 Unauthorized`.

📄 Licença e Autor

Autor: Kívia Dantas

Licença: ver arquivo `LICENSE` no repositório.

```bash
npm install
npm run dev   # inicia em modo desenvolvimento com nodemon
# ou
npm start     # inicia com node
```

Abra a documentação interativa em: `http://localhost:3000/api-docs`
# PPP KiviaDantas — E-Commerce API (In-Memory)

Este repositório contém uma API REST em memória desenvolvida para suportar uma suíte de testes focada em regras de negócio e casos de borda (API E-Commerce).

Visão geral
- Arquitetura em camadas: `routes` → `controllers` → `services` → `models`.
- Persistência: armazenamento em memória dentro das services (arrays). Adequado para testes automatizados e exemplos.
- Framework: `express`.
- Autenticação: JWT via middleware em `src/api/middlewares/authMiddleware.js`.
- Documentação OpenAPI (arquivo): `resources/swagger.json` (UI disponível em `/api-docs`).

Principais endpoints
- `POST /api/users` — Criar usuário
  - Body JSON: `{ nome, email, password, administrador }`
- `POST /api/users/login` — Autenticar usuário
  - Body JSON: `{ email, password }`
  - Resposta: `{ authorization: "<jwt>" }`
- `POST /api/products` — Criar produto (protegido)
  - Body JSON: `{ nome, preco, descricao, quantidade }`
- `GET /api/products` — Listar produtos
- `GET /api/products/:id` — Obter produto por id
- `PUT /api/products/:id` — Atualizar produto (protegido)
- `DELETE /api/products/:id` — Deletar produto (protegido)

Autenticação
- O login retorna um token JWT que deve ser enviado no header `Authorization` como `Bearer <token>` para os endpoints protegidos. O middleware valida o token e anexa `req.user` com o payload.

Validações implementadas
- `preco` deve ser número maior que zero — retorna `422` se inválido.
- `quantidade` deve ser número >= 0 — retorna `422` se inválido.
- Campos obrigatórios ausentes retornam `400`.

Documentação
- Arquivo OpenAPI: `resources/swagger.json` — descreve modelos JSON de request/response e os status de erro implementados.
- Swagger UI (interativo): `http://localhost:3000/api-docs` quando o servidor estiver rodando.

Como executar
1. Instale dependências:

```bash
npm install
```

2. Em modo desenvolvimento (com reload):

```bash
npm run dev
```

3. Em produção/local: 

```bash
npm start
```

Testes automatizados
- Test runner: Vitest + Supertest (integração HTTP): os testes estão em `tests/`.
- Comandos:
  - `npm test` ou `npx vitest run` — executa os testes
  - `npm run test:coverage` — executa testes e gera relatório de cobertura (V8)

Relatório de cobertura
- Após `npm run test:coverage` o relatório é gerado (V8) e o diretório `coverage/` contém os artefatos.

Estrutura do projeto
- `src/index.js` — entrypoint que monta rotas e Swagger UI
- `src/api/routes/` — rotas express
- `src/api/controllers/` — handlers e respostas HTTP
- `src/api/services/` — lógica de negócio e armazenamento em memória
- `src/api/models/` — fábricas de objetos
- `src/api/middlewares/` — middleware JWT (`authMiddleware.js`)
- `resources/swagger.json` — especificação OpenAPI (arquivo)
- `tests/` — casos de teste automatizados

Notas importantes
- O projeto usa armazenamento em memória; para produção, substitua por banco persistente.
- Ajuste a variável de ambiente `JWT_SECRET` em ambientes reais (não usar o segredo padrão).

Contribuições e suporte
- Para contribuições, abra um PR. Para problemas, abra uma issue no repositório.

---

## README (detalhado)

Este documento descreve como configurar, executar, testar e inspecionar o projeto `ppp-KiviaDantas` de forma profissional.

### Sumário
- Visão geral
- Requisitos
- Instalação
- Variáveis de ambiente
- Scripts úteis
- Como executar a API
- Endpoints principais (exemplos)
- Autenticação JWT
- Testes e cobertura
- Estrutura do projeto
- Boas práticas e notas de segurança
- Contato / Contribuição

### Requisitos
- Node.js >= 18 (recomendado)
- npm >= 9 (ou yarn)

### Instalação
1. Clone o repositório:

```bash
git clone https://github.com/kiviachristina/ppp-KiviaDantas.git
cd ppp-KiviaDantas
```

2. Instale dependências:

```bash
npm install
```

### Variáveis de ambiente
Recomenda-se definir as seguintes variáveis em um arquivo `.env` ou no ambiente de execução:

- `PORT` — porta onde o servidor irá rodar (padrão: `3000`).
- `JWT_SECRET` — segredo usado para assinar tokens JWT (mude para um valor forte em produção).

Exemplo `env` mínimo (não commit):

```env
PORT=3000
JWT_SECRET=uma_chave_forte_aqui
```

### Scripts úteis (package.json)
- `npm start` — inicia a aplicação com `node` (produção/local).
- `npm run dev` — inicia em modo desenvolvimento (nodemon).
- `npm test` — executa a suíte de testes (Vitest).
- `npm run test:coverage` — executa testes e gera relatório de cobertura (V8).

### Executando a API
1. Configure `JWT_SECRET` no ambiente (recomendado).
2. Inicie em modo desenvolvimento:

```bash
npm run dev
```

3. A API estará disponível por padrão em `http://localhost:3000`.
4. A documentação interativa Swagger UI está disponível em:

```
http://localhost:3000/api-docs
```

### Endpoints principais (resumo e exemplos)
Todos os exemplos usam `curl` — ajuste `PORT` se necessário.

1) Criar usuário

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nome":"QA User","email":"qa@example.test","password":"senha123","administrador":true}'
```

Resposta (201):
{
  "message": "Cadastro realizado com sucesso",
  "user": { "id": 1, "nome": "QA User", "email": "qa@example.test", ... }
}

2) Login (recebe JWT)

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"qa@example.test","password":"senha123"}'
```

Resposta (200):
```
{ "authorization": "<JWT_TOKEN_HERE>" }
```

3) Criar produto (protegido — Bearer token)

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN_HERE>" \
  -d '{"nome":"Produto X","preco":10.5,"descricao":"descr","quantidade":3}'
```

Respostas relevantes:
- `201` — cadastro realizado com sucesso, payload com `product`.
- `400` — campos obrigatórios ausentes.
- `422` — validação: `preco` ou `quantidade` inválidos.
- `401` — token ausente ou inválido.

4) Listar produtos

```bash
curl http://localhost:3000/api/products
```

5) Obter/Atualizar/Deletar produto por id

```bash
curl http://localhost:3000/api/products/1
curl -X PUT http://localhost:3000/api/products/1 -H "Authorization: Bearer <JWT>" -d '{"preco":15}'
curl -X DELETE http://localhost:3000/api/products/1 -H "Authorization: Bearer <JWT>"
```

### Autenticação JWT
- O token é emitido por `POST /api/users/login` usando o segredo `JWT_SECRET`.
- Envie pelo header `Authorization: Bearer <token>` nos endpoints protegidos.
- O middleware `src/api/middlewares/authMiddleware.js` valida o token e anexa `req.user`.

### Testes e cobertura
- Testes: `tests/` (Vitest + Supertest). Execução:

```bash
npm test
npm run test:coverage
```

- O relatório de cobertura é gerado em `coverage/` pelo Vitest (provider V8).

### Estrutura do projeto
- `src/index.js` — entrypoint (monta rotas e Swagger UI)
- `src/api/routes/` — define endpoints
- `src/api/controllers/` — implementa comportamento das rotas
- `src/api/services/` — lógica de negócio + armazenamento em memória
- `src/api/models/` — fábricas/estruturas de dados
- `src/api/middlewares/` — middleware JWT
- `resources/swagger.json` — especificação OpenAPI (arquivo)
- `tests/` — testes automatizados

### Boas práticas e segurança
- Nunca commit o segredo JWT (`JWT_SECRET`) no repositório. Use variáveis de ambiente ou um secret manager.
- Em produção, substitua o banco em memória por um banco persistente (Postgres, MongoDB, etc.).
- Valide e sanitize entradas para evitar injeção e problemas de segurança.

### Contribuição
- Fork → branch → PR. Inclua testes para novas features/bugs.

### Licença
- Verifique o arquivo `LICENSE` no repositório para os termos de uso.


# ppp-KiviaDantas

Projeto de portfólio pessoal para automação de testes de API em e-commerce, com foco em regra de negócio, validação de entrada e casos de borda.

## Visão geral

Este repositório tem como objetivo demonstrar a aplicação de conceitos fundamentais de testes de software em uma API real, com foco em robustez e qualidade. A automação foi desenvolvida utilizando a API pública ServeRest, que simula um ambiente de e-commerce e oferece um cenário ideal para praticar testes de API, validações e análise de comportamento em cenários fora do fluxo feliz.

A suíte foi construída para validar:

- regras de negócio do cadastro de produtos
- tratamento de valores inválidos
- status codes esperados pela API
- mensagens retornadas no corpo JSON
- comportamento em casos de borda e cenários críticos

## Objetivo do projeto

Aplicar técnicas de teste como:

- Partição de equivalência
- Valoração de limites
- Casos de borda
- Validação de respostas de erro
- Verificação de contrato e regras de negócio da API

## API utilizada

- ServeRest: https://serverest.dev/

A API ServeRest foi escolhida por ser pública, gratuita e amplamente usada em treinamentos de QA para testes de API, especialmente em cenários de e-commerce.

## Stack tecnológica

- Node.js
- Vitest
- JavaScript
- Fetch API nativa

## Requisitos mapeados

Os testes automatizados cobrem os seguintes requisitos:

- RQ-01: O cadastro de produto deve aceitar somente payloads válidos
- RQ-02: O campo preco deve rejeitar valores zero e negativos
- RQ-03: O campo nome deve ser obrigatório
- RQ-04: A API deve responder com status HTTP de erro quando houver dados inválidos
- RQ-05: A API deve retornar mensagens claras no corpo da resposta
- RQ-06: O backend atual não aplica regra de limite de tamanho específico para o nome do produto

## Matriz de rastreabilidade de testes

| Requisito da API | Cenário coberto | Resultado esperado | Status |
| --- | --- | --- | --- |
| RQ-01 | Cadastro de produto válido | Status 201 e mensagem de sucesso | Coberto |
| RQ-02 | Preço zerado | 400 com mensagem indicando problema em preço | Coberto |
| RQ-02 | Preço negativo | 400 com mensagem indicando problema em preço | Coberto |
| RQ-03 | Payload sem nome e sem preço | 400 com erro específico do campo obrigatório | Coberto |
| RQ-04 | Verificação de status HTTP | 400 ou 422 em caso de payload inválido | Coberto |
| RQ-05 | Verificação da mensagem de erro | Corpo JSON com descrição do problema | Coberto |
| RQ-06 | Nome de produto muito longo | Cadastro é aceito no backend atual, sem regra de limite | Coberto |

## Estrutura do projeto

```text
ppp-KiviaDantas/
├── README.md
├── package.json
├── package-lock.json
├── src/
│   └── api/
│       └── serverest.js
└── tests/
    └── business-rules.spec.js
```

### Descrição dos arquivos

- `README.md`: documentação do projeto, requisitos e instruções de uso
- `package.json`: configuração do projeto e scripts
- `src/api/serverest.js`: cliente HTTP para consumir os endpoints da API
- `tests/business-rules.spec.js`: suíte de testes automatizados

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- Node.js 18 ou superior
- npm
- Git

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/kiviachristina/ppp-KiviaDantas.git
cd ppp-KiviaDantas
```

2. Instale as dependências:

```bash
npm install
```

## Execução dos testes

Para rodar a suíte completa:

```bash
npm test
```

Para executar em modo interativo durante o desenvolvimento:

```bash
npm run test:watch
```

## Como funciona a automação

A suíte realiza os seguintes passos:

1. Cria um usuário administrador na API
2. Realiza login com as credenciais do usuário
3. Gera um token de autenticação
4. Envia payloads válidos e inválidos para o endpoint de produtos
5. Valida o status HTTP e a mensagem no JSON da resposta
6. Confirma se o comportamento da API está alinhado com as regras esperadas

## Casos cobertos pela automação

### 1. Produto válido
- nome adequado
- preço numérico positivo
- descrição presente
- quantidade válida

Resultado esperado: cadastro com sucesso

### 2. Preço zerado
- payload com `preco: 0`

Resultado esperado: erro de validação

### 3. Preço negativo
- payload com `preco: -1`

Resultado esperado: erro de validação

### 4. Payload sem campos obrigatórios
- ausência de nome e/ou preço

Resultado esperado: erro de validação com mensagem clara

### 5. Caso de borda com nome longo
- entrada com string longa, mas válida na prática para o backend atual

Resultado observado: cadastro aceito sem regra de limite específica no backend

## Observações importantes

Durante a validação real com a API ServeRest, foi possível confirmar alguns comportamentos relevantes:

- o campo `administrador` deve ser enviado em formato string, conforme a API exige
- o endpoint `/produtos` exige campos obrigatórios para um cadastro válido
- a API rejeita `preco` zerado ou negativo com mensagens específicas
- a API atual não bloqueia nomes extremamente longos, e isso foi documentado como comportamento observado

Essas observações são importantes para a rotina de QA, porque refletem a realidade do sistema e ajudam a alinhar as expectativas de testes com o comportamento do backend.

## Resultado da execução

A suíte foi validada com sucesso via comando:

```bash
npm test
```

Saída esperada:

```text
Test Files  1 passed (1)
Tests       5 passed (5)
```

## Objetivo profissional

Este projeto foi desenvolvido como material de portfólio para demonstrar capacidade de:

- automação de testes de API
- análise de regras de negócio
- exploração de casos de borda
- documentação de testes e rastreabilidade
- apresentação de evidências de qualidade em projetos reais

## Autor

Kivia Dantas

## Licença

Este projeto está sob a licença ISC.
