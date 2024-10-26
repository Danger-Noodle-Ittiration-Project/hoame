const request = require("supertest");
const app = require("../app"); 
const db = require("../models/hoameModels");


// test if signup assigns pending_approval;
describe('User Signup', () => {
    Test('should assign "Pending_approval" role when a  user signs up', asyc() => {
        
    })
})

// test admin can fetch users with pending_approval role 


// admin can Approve a user by assigning a new role