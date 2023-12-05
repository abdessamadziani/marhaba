const auth = require("../../controllers/clientController");
const userModel = require("../../models/User");
// const jwtToken = require("../helpers/jwtToken");
// const mailer = require("../helpers/mailer");
const bcrypt = require("bcryptjs");
jest.mock("../../models/User");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("test parti login ", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.only("should return status 400 if email is not allowed to be empty", async () => {
    const req = {
      body: {
        email: "ziani123",
      },
    };
    await auth.signin(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      // status: "error",
      message: "email is not allowed to be empty",
    });
  });

  it.only("should return status 400 if password is not allowed to be empty", async () => {
    const req = {
      body: {
        email: "samad@gmail.com",
        password: "",
      },
    };
    await auth.signin(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      // status: "error",
      message:
        "Invalid password format. It should be alphanumeric and between 3 to 30 characters",
    });
  });



  it.only("should return status 400 if email not found", async () => {
    const req = {
      body: {
        email: "samad@gmail.com",
        password: "samad",
      },
    };

    await jest.spyOn(userModel, "findOne").mockResolvedValue(null);
    await auth.signin(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "User not found",
    });
  });

  it("should return status 401 if password is not correct", async () => {
    const req = {
      body: {
        email: "samad@gmail.com",
        password: "ziani",
      },
    };

    await jest.spyOn(userModel, "findOne").mockResolvedValueOnce({
      email: "samad@gmail.com",
      password: "azerty",
    });

   await jest.spyOn(bcrypt,"compare").mockResolvedValueOnce(false);

    await auth.signin(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email and Password do not match",
    });
  });

  

  it("should return status 500 if not verify email", async () => {
    const req = {
      body: {
        email: "samad@gmail.com",
        password: "zianiaaa",
      },
    };

    await jest.spyOn(userModel, "findOne").mockResolvedValueOnce({
      email: "samad@gmail.com",
      password: "zianiaaa",
    });

  
  

    await auth.signin(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal server error",
    });
  });
});