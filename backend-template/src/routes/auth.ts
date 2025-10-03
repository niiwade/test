import express, { Request, Response } from 'express';

const router = express.Router();

interface LoginRequest {
  email: string;
  password: string;
}

const STATIC_CREDENTIALS = {
  email: 'test@example.com',
  password: 'password123'
};

router.post('/login', (req: Request<{}, {}, LoginRequest>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  if (email === STATIC_CREDENTIALS.email && password === STATIC_CREDENTIALS.password) {
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        email: email,
        name: 'Test User',
        role: 'USER'
      }
    });
  }

  return res.status(401).json({
    data: {
      success: false,
      message: 'Invalid email or password'
    }
  });
});

export default router;