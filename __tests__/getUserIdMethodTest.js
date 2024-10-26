// Testing middleware for getting the id primary key from the users table

const request = require('supertest');
const fs = require('fs');
const path = require('path');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/dues', () => {
    describe('GET', () => {

      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/api/dues')
          .expect('Content-Type', /application\/json/)
          .expect(200)
      })


      // it(`should get the user ID from the user's session`, () => {
      //   return request(server)
      //   .get('/dues')
      //   .expect((res) => {

      //   })
      // })
    })
  })
})