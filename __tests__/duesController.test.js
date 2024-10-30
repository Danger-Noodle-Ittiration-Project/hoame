const request = require("supertest");
const app = require("../server/server");
const duesController = require("../server/controllers/duesController");
const server = 'http://localhost:3000';

jest.mock('../server/controllers/duesController');

describe('/dues', () => {
  test('should return dues status', async () => {

    duesController.checkStatus.mockImplementation((req, res, next) => {
      res.locals.status = false;
      return next();
    })

    const response = await request(app)
      .get('/api/dues')

    expect(200);
    expect(response.body).toEqual(false);

  })
})