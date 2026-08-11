import { describe, it, expect } from 'vitest';
import { createUser, login, createProduct } from '../src/api/serverest.js';

const makeEmail = () => `qa.${Date.now() + Math.floor(Math.random() * 1000)}@serverest.dev`;
const makeProductName = (prefix) => `${prefix} ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function buildAdminUser() {
  return {
    nome: 'Admin QA',
    email: makeEmail(),
    password: 'teste123',
    administrador: true
  };
}

describe('ServeRest - testes de regra de negócio e casos de borda', () => {
  it('deve aceitar produto válido com dados dentro do limite', async () => {
    const user = buildAdminUser();
    const createdUser = await createUser(user);
    expect(createdUser.status).toBe(201);

    const auth = await login({ email: user.email, password: user.password });
    expect(auth.status).toBe(200);
    expect(auth.data.authorization).toBeTruthy();

    const response = await createProduct({
      token: auth.data.authorization,
      payload: {
        nome: makeProductName('Produto válido'),
        preco: 10,
        descricao: 'Descrição válida',
        quantidade: 1
      }
    });

    expect(response.status).toBe(201);
    expect(response.data.message).toBe('Cadastro realizado com sucesso');
  });

  it('deve rejeitar produto com preço zerado', async () => {
    const user = buildAdminUser();
    const createdUser = await createUser(user);
    expect(createdUser.status).toBe(201);

    const auth = await login({ email: user.email, password: user.password });
    expect(auth.status).toBe(200);

    const response = await createProduct({
      token: auth.data.authorization,
      payload: {
        nome: makeProductName('Produto zerado'),
        preco: 0,
        descricao: 'Descrição válida',
        quantidade: 1
      }
    });

    expect([400, 422]).toContain(response.status);
    const errorText = JSON.stringify(response.data).toLowerCase();
    expect(errorText).toContain('preco');
  });

  it('deve rejeitar produto com preço negativo', async () => {
    const user = buildAdminUser();
    const createdUser = await createUser(user);
    expect(createdUser.status).toBe(201);

    const auth = await login({ email: user.email, password: user.password });
    expect(auth.status).toBe(200);

    const response = await createProduct({
      token: auth.data.authorization,
      payload: {
        nome: makeProductName('Produto negativo'),
        preco: -1,
        descricao: 'Descrição válida',
        quantidade: 1
      }
    });

    expect([400, 422]).toContain(response.status);
    const errorText = JSON.stringify(response.data).toLowerCase();
    expect(errorText).toContain('preco');
  });

  it('deve rejeitar payload sem campos obrigatórios', async () => {
    const user = buildAdminUser();
    const createdUser = await createUser(user);
    expect(createdUser.status).toBe(201);

    const auth = await login({ email: user.email, password: user.password });
    expect(auth.status).toBe(200);

    const response = await createProduct({
      token: auth.data.authorization,
      payload: {
        descricao: 'Sem campos obrigatórios',
        quantidade: 1
      }
    });

    expect([400, 422]).toContain(response.status);
    const errorText = JSON.stringify(response.data).toLowerCase();
    expect(errorText).toMatch(/nome|preco|obrig|required/);
  });

  it('deve permitir título longo sem regra de limite específica no backend', async () => {
    const user = buildAdminUser();
    const createdUser = await createUser(user);
    expect(createdUser.status).toBe(201);

    const auth = await login({ email: user.email, password: user.password });
    expect(auth.status).toBe(200);

    const response = await createProduct({
      token: auth.data.authorization,
      payload: {
        nome: `${'A'.repeat(200)}-${Date.now()}`,
        preco: 10,
        descricao: 'Descrição válida',
        quantidade: 1
      }
    });

    expect(response.status).toBe(201);
    expect(response.data.message).toBe('Cadastro realizado com sucesso');
  });
});
