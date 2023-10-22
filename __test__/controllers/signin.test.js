const { signin } = require('../../controllers/clientController');
const User = require('../../models/User');

// Mock the User model
jest.mock('../../models/User');

it('should return a status 400 and json with error if the user not found', async () => {
    const req = {
        body: {
            email: 'xxxx@gmail.com',
            password: 'azerty',
        }
    }
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    }

    // Mock userModel.findOne to simulate that the email already exists
    User.findOne.mockReturnValue({
        email: 'samad@gmail.com', // Mock an existing email
        password: 'testpassword',
    });

    await signin(req, res);

    // The status should be 400, as the email already exists
    expect(res.status).toHaveBeenCalledWith(400);
    // The JSON response should match what you return in the code
    expect(res.json).toHaveBeenCalledWith({ error: 'user not found' });
});



   


