# PPP KiviaDantas - E-Commerce API (In-Memory)

Este projeto fornece uma API REST simples em memória para suportar uma suíte de testes de regras de negócio e casos de borda (API e-Commerce).

Principais pontos:
- Estrutura em camadas: `routes`, `controllers`, `services`, `models`.
- Dados armazenados em memória (arrays) — adequado para testes.
- Documentação Swagger em `resources/swagger.json` e interface exibida em `/api-docs`.
- Endpoints principais:
  - `POST /api/users` — criar usuário
  - `POST /api/users/login` — autenticar (retorna `authorization` token)
  - `POST /api/products` — criar produto (requer header `Authorization`)
  - `GET /api/products` — listar produtos
  - `GET /api/products/:id` — obter produto por id
  - `PUT /api/products/:id` — atualizar produto (requer `Authorization`)
  - `DELETE /api/products/:id` — deletar produto (requer `Authorization`)

Rodando localmente:

```bash
npm install
npm run dev   # inicia em modo desenvolvimento com nodemon
# ou
npm start     # inicia com node
```

Abra a documentação interativa em: `http://localhost:3000/api-docs`
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
