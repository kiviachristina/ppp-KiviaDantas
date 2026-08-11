# ppp-KiviaDantas

Projeto de portfólio pessoal para automação de testes de API na área de e-commerce, com foco em regra de negócio e casos de borda.

## Objetivo

Validar a robustez da API de produtos do ServeRest aplicando:

- Partição de equivalência
- Valoração limite
- Testes de casos de borda
- Verificação de mensagens e status HTTP esperados

## API escolhida

- ServeRest: https://serverest.dev/
- Motivo: API pública, gratuita, brasileira e muito útil para treino de QA em testes funcionais e de API.

## Stack

- Node.js
- Vitest
- Fetch API nativa

## Como executar

1. Instale as dependências:
   npm install
2. Execute a suíte:
   npm test

## Requisitos mapeados

- RQ-01: O cadastro de produto deve aceitar apenas payloads válidos
- RQ-02: O campo preco deve rejeitar valores zero e negativos
- RQ-03: O campo nome deve ser obrigatório
- RQ-04: A API deve responder com status 400 ou 422 quando houver erro de validação
- RQ-05: A resposta deve retornar mensagem clara no corpo JSON
- RQ-06: A API não aplica regra de limite de tamanho para nome no backend atual

## Matriz de rastreabilidade de testes

| Requisito da API | Cenário coberto | Resultado observado | Status |
| --- | --- | --- | --- |
| RQ-01 | Cadastro de produto válido | 201 com mensagem de sucesso | Coberto |
| RQ-02 | Preço zerado | 400 com mensagem "preco deve ser um número positivo" | Coberto |
| RQ-02 | Preço negativo | 400 com mensagem "preco deve ser um número positivo" | Coberto |
| RQ-03 | Payload sem nome e sem preço | 400 com erro específico do campo obrigatório | Coberto |
| RQ-04 | Verificação do status HTTP | 400/422 para payload inválido | Coberto |
| RQ-05 | Verificação da mensagem de erro | JSON com descrição clara do problema | Coberto |
| RQ-06 | Nome com string muito longa | 201, sem bloqueio por limite de tamanho no backend atual | Coberto |

## Estrutura do projeto

- src/api/serverest.js: cliente HTTP e helpers de endpoints
- tests/business-rules.spec.js: suíte de testes automatizados

## Observações

Os testes foram desenhados para validar a resiliência do backend e reforçar a prática de QA em cenários que exigem validação de regra de negócio, não apenas caminhos felizes. A validação real da API mostrou que o campo categoria não é aceito pela API atual e que o nome longo não é bloqueado por limite de comprimento.
