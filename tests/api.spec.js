import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/index.js';

const makeEmail = () => `qa.${Date.now() + Math.floor(Math.random() * 1000)}@test.local`;

describe('Local API - endpoints', () => {
  let token;

  beforeEach(() => {
    process.env.NODE_ENV = 'test';
  });

  it('creates a user and logs in', async () => {
    const user = { nome: 'QA User', email: makeEmail(), password: 'senha123', administrador: true };
    const createRes = await request(app).post('/api/users').send(user);
    expect(createRes.status).toBe(201);

    const loginRes = await request(app).post('/api/users/login').send({ email: user.email, password: user.password });
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.authorization).toBeTruthy();
    token = loginRes.body.authorization;
  });

  it('creates, reads, updates and deletes a product', async () => {
    const product = { nome: 'Produto Teste', preco: 10, descricao: 'desc', quantidade: 5 };
    // create
    const createRes = await request(app).post('/api/products').set('Authorization', token).send(product);
    expect(createRes.status).toBe(201);
    const created = createRes.body.product;
    expect(created).toHaveProperty('id');

    // list
    const listRes = await request(app).get('/api/products');
    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);

    // get by id
    const getRes = await request(app).get(`/api/products/${created.id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(created.id);

    // update
    const updateRes = await request(app).put(`/api/products/${created.id}`).set('Authorization', token).send({ preco: 20 });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.preco).toBe(20);

    // delete
    const delRes = await request(app).delete(`/api/products/${created.id}`).set('Authorization', token);
    expect(delRes.status).toBe(200);
  });

  it('rejects product with preco 0 or negative and missing fields', async () => {
    const bad1 = { nome: 'Bad 0', preco: 0, descricao: 'd', quantidade: 1 };
    const r1 = await request(app).post('/api/products').set('Authorization', token).send(bad1);
    expect([400, 422]).toContain(r1.status);

    const bad2 = { nome: 'Bad -1', preco: -5, descricao: 'd', quantidade: 1 };
    const r2 = await request(app).post('/api/products').set('Authorization', token).send(bad2);
    expect([400, 422]).toContain(r2.status);

    const bad3 = { descricao: 'no name', quantidade: 1 };
    const r3 = await request(app).post('/api/products').set('Authorization', token).send(bad3);
    expect([400, 422]).toContain(r3.status);
  });
});
