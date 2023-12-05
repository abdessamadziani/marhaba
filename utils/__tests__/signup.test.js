const auth = require("../../controllers/clientController");
const userModel = require("../../models/User");
// const jwtToken = require("../helpers/jwtToken");
const bcrypt = require("bcryptjs");
jest.mock("../../models/User");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("test parti Signup ", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.only("should return status 400 if username is not allowed to be empty", async () => {
    const req = {
      body: {
        name: "",
        role: "client",
        email: "test@gmail.com",
        password: "test123",
      },
    };
    await auth.signup(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'username is not allowed to be empty'
    });
  });

  it.only("should return status 400 if email is not allowed to be empty", async () => {
    const req = {
      body: {
        username: "test",
        role: "client",
        email: "",
        password: "test123",
        repeat_password: "test123",
      },
    };
    await auth.signin(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'email is not allowed to be empty',
    });
  });



  it.only("should return status 400 if role is not allowed to be empty or invalid role", async () => {
    const req = {
      body: {
        username: "test",
        role: "dev",
        email: "test@gmail.com",
        password: "test123",
        repeat_password: "test123",
      },
    };
    await auth.signup(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "role must be client OR livreur",
    });
  });





  it.only("should return status 200 if success signup ", async () => {
    const req = {
      body: {
        username: "test",
        role: "lirveur",
        email: "test@gmail.com",
        password: "testing",
      },
    };
    await jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("hashedPassword");
    await jest.spyOn(userRole, "livreur").mockResolvedValueOnce({
      role: "livreur",
    });

    await jest.spyOn(userModel, "save").mockResolvedValueOnce({
      _id: "123",
      username: "samad",
      email: "samad@gmail.com",
      password: "ziani",
      role: "client",
    });

    await jest.spyOn(jwtToken, "token").mockResolvedValueOnce({
      _id: "123",
      username: "test",
      email: "samad@gmail.com",
      password: "123456",
      role: "123",
    });

    await auth.signup(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User registration successful please verify your email",
    });
  });
});