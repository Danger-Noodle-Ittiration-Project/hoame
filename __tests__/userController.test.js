const request = require("supertest");
const app = require("../server/server");
const db = require("../server/models/hoameModels");

// // Mock sessionController.isAuthenticated
// jest.mock('../controllers/sessionController', () => ({
//   isAuthenticated: (req, res, next) => next(),
// }));

// // Mock roleController.checkPermissions
// jest.mock('../controllers/roleController', () => ({
//   checkPermissions: () => (req, res, next) => next(),
// }));

// test if signup assigns pending_approval;
describe("User Signup", () => {
  test('should assign "Pending_approval" role when a user signs up', async () => {
    // Mocking the database query 
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

    const response = await request(app).post("/api/signup").send({
      first_name: "John",
      last_name: "Doe",
      street_address: "1234 Nonya Business",
      phone: "8182772292",
      username: "johndoe",
      password: "password",
    });

    expect(response.statusCode).toBe(201);
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO user_roles"),
      expect.any(Array)
    );
    mockQuery.mockRestore();
  });
});

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
    const response = await request(app)
      .get("/api/users/pending-approval")
     

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
  });
});


describe('Admin Assign Role and Approve User', () => {
  test('should assign a new role and remove "pending_approval" role', async () => {
    const mockQuery = jest.spyOn(db, 'query');

    const response = await request(app)
      .post('/api/users/approve')
      .send({ userId: 1, newRoleId: 2 })
      

    expect(response.statusCode).toBe(200);
    // First delete the "Pending_approval" role
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM user_roles'),
      [1]
    );
        // second query insert different role
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO user_roles'),
      [1, 2]
    );
    mockQuery.mockRestore();
  });
});

// admin can Approve a user by assigning a new role