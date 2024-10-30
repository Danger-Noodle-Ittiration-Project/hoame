const request = require('supertest');
const app = require("../server/server");
const server = 'http://localhost:3000';

// const stripe = require('stripe')('sk_test_51QDFF8ANkqZlajimk7PB1U1Hu6yEUKSgsWCtYHartsMg31cfrHVDDo0Gz0Jgw0MI3yFJjuTdeXwprkFRcBVkBCfC004pjydbus');

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => {
    return { id: 100 }
  })
})

describe('/create-payment-intent', () => {
  test('should create a payment intent and return a session ID', async () => {
    

    const response = await request(app)
      .post('/api/create-payment-intent')
      .send({ amount: 10000 })

    expect(200);
    expect(response.body).toEqual({ id: 100 })
  })
})