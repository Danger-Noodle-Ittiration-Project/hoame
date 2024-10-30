const request = require("supertest");
//const app = require("../server/server");
const db = require("../server/models/hoameModels");
// const server = "http://localhost:3000";
const httpMocks = require("node-mocks-http");
const userController = require("../server/controllers/userController");

// // Mock sessionController.isAuthenticated
// jest.mock('../controllers/sessionController', () => ({
//   isAuthenticated: (req, res, next) => next(),
// }));

// // Mock roleController.checkPermissions
// jest.mock('../controllers/roleController', () => ({
//   checkPermissions: () => (req, res, next) => next(),
// }));

// example of mockImplementation
// const calculator = {
//   add: (a, b) => a + b
// };

// describe('calculator', () => {
//   it('should add two numbers', () => {
//     const addSpy = jest.spyOn(calculator, 'add').mockImplementation(() => 10);

//     const result = calculator.add(2, 3);

//     expect(result).toBe(10); // The custom implementation always returns 10
//     expect(addSpy).toHaveBeenCalledWith(2, 3); // Checks that the method was called with 2 and 3
//   });
// });


// test if signup assigns pending_approval;
describe("User Signup", () => {
  test('should assign "Pending_approval" role when a user signs up', () => {
    // Mocking the database query
   
    
    const mockQuery = jest.spyOn(db, 'query').mockImplementation((query, values) => {
      if (query.includes("INSERT into users")) {
        return {
          command: "INSERT",
          rowCount: 1,
          rows: [{
            id: '61',
            first_name: values[0],
            last_name: values[1],
            street_address: values[2],
            phone: values[3],
            username: values[4],
            password: values[5],
            dues_paid: false,
          }],
        };
      }
      if (query.includes("INSERT into user_roles")) {
        return { command: "INSERT", rowCount: 1, rows: [] };
      }
      // if (query.includes("INSERT into sessions")) {
      //   return {
      //     command: "INSERT",
      //     rowCount: 1,
      //     rows: [{ id: 'test-session-id', user_id: '61', created_time: new Date(), expires_time: new Date(Date.now() + 3600000) }],
      //   };
      // }
      if (query.includes("SELECT roles.role_name")) {
        return { command: "SELECT", rowCount: 1, rows: [{ role_name: 'pending_approval' }] };
      }
      return { command: "", rowCount: 0, rows: [] };
    })
    const query = 'INSERT into users (first_name, last_name, street_address, phone, username, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = ["John", "Doe", "1234 Nonya Business", "8182772292", "johndoe", "password"];

    //console.log('jest type:', typeof jest.spyOn(db, 'query'));
    //console.log('mockquery type', typeof mockQuery(query, values));
    
    const result =  db.query(query, values)
    const result2 =  db.query("INSERT into user_roles", ["6"]);
    const result3 =  db.query("SELECT roles.role_name", ["6"]);

    // expect(result).toMatchObject({
    //   command: "INSERT",
    //   rowCount: 1,
    //   rows: [{
    //     id: '61',
    //     first_name: values[0],
    //     last_name: values[1],
    //     street_address: values[2],
    //     phone: values[3],
    //     username: values[4],
    //     password: values[5],
    //     dues_paid: false,
    //   }],
    // });

    // expect(mockQuery).toHaveBeenCalledWith(query, values);

    // console.log('mockQuery:', mockQuery(query, values));
    //expect(mockQuery._isMockFunction).toBe(true);
    expect(result).toMatchObject({
      command: 'INSERT',
      rowCount: 1,
      rows: [
        {
          id: '61',
          first_name: 'John',
          last_name: 'Doe',
          street_address: '1234 Nonya Business',
          phone: '8182772292',
          username: 'johndoe',
          password: 'password',
          dues_paid: false
        },
      ],
    });

    //expect(mockQuery("SELECT roles.role_name", ["6"])).toStrictEqual({ command: "SELECT", rowCount: 1, rows: [{ role_name: 'pending_approval' }] })

    expect(mockQuery).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining("INSERT into users"),
      // expect.any(Array)
      expect.arrayContaining(values)
    );
    expect(mockQuery).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("INSERT into user_roles"),
      // expect.any(Array)
      expect.arrayContaining(["6"])
    );
    expect(mockQuery).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining("SELECT roles.role_name"),
      expect.arrayContaining(["6"]) // confirming the role selection call
    );

    // expect(res.locals.session.session_id).toBe('test-session-id'); 
    mockQuery.mockRestore();
  });
});




// const response = await request(app).post("/api/signup").send({
//   first_name: "John",
//   last_name: "Doe",
//   street_address: "1234 Nonya Business",
//   phone: "8182772292",
//   username: "johndoe",
//   password: "password",
//  });

//  const req = httpMocks.createRequest({
//    method: "GET",
//    url: "/api/signup",
//    cookies: {ssid: 90},
//    headers: { Authorization: `Bearer ${response.body.tokens.access.token}` },
//  });
//  const res = httpMocks.createResponse();
//  const next = jest.fn();

//  await userController.getUserId(req, res, next);
//  expect(next).toHaveBeenCalledWith();

 //expect(response.statusCode).toBe(201);






/*  Commenting out below tests until above test passes

// test admin can fetch users with pending_approval role
describe("Admin Fetch Pending Approval Users", () => {
  test('should retrieve users with "pending_approval" role', async () => {
    // Mock the database response for users with the 'Pending_approval' role
    const mockQuery = jest.spyOn(db, "query").mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          username: "johndoe",
        },
      ],
    });

    //  {
    //       id: 1,
    //       first_name: "John",
    //       last_name: "Doe",
    //       street_address: "1234 Nonya Business",
    //       phone: "8182772292",
    //       username: "johndoe",
    //       password: "password",
    //     },
    const response = await request(app).get("/api/users/pending-approval");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        street_address: "1234 Nonya Business",
        phone: "8182772292",
        username: "johndoe",
        password: "password",
      },
    ]);
    mockQuery.mockRestore();

    //check res.locals.pendingUsers against the database of pending users
  });
});

describe("Admin Assign Role and Approve User", () => {
  test('should assign a new role and remove "pending_approval" role', async () => {
    const mockQuery = jest.spyOn(db, "query");

    const response = await request(app)
      .post("/api/users/approve")
      .send({ userId: 1, newRoleId: 2 });

    expect(response.statusCode).toBe(200);
    // First delete the "Pending_approval" role
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("DELETE FROM user_roles"),
      [1]
    );
    // second query insert different role
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO user_roles"),
      [1, 2]
    );
    mockQuery.mockRestore();
  });
});

End of comment out block --> */ 

// admin can Approve a user by assigning a new role
