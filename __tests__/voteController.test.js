const request = require("supertest");
//const app = require("../server/server");
const db = require("../server/models/hoameModels");
// const server = "http://localhost:3000";
const httpMocks = require("node-mocks-http");
const userController = require("../server/controllers/userController");
const { default: VotingBoard } = require("../client/components/VotingBoard");



describe('Voting', () =>{
    test('Votes on question 2 and returns',  async () =>{
        let board;
        beforeAll(() =>{
            board = render(<VotingBoard />);
        })

        const response = await request(app).post("/api/signup").send({
            first_name: "John",
            last_name: "Doe",
            street_address: "1234 Nonya Business",
            phone: "8182772292",
            username: "johndoe",
            password: "password",
           });
          
           const req = httpMocks.createRequest({
             method: "GET",
             url: "/api/signup",
             cookies: {ssid: 90},
             headers: { Authorization: `Bearer ${response.body.tokens.access.token}` },
           });
           const res = httpMocks.createResponse();
           const next = jest.fn();
          
           await userController.getUserId(req, res, next);
           expect(next).toHaveBeenCalledWith();
          
           expect(response.statusCode).toBe(201);
        
    })
})

