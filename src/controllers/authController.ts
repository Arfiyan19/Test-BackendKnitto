import { Request, Response } from 'express';
import { loginUser, loginOAuth } from '../services/authService';

// Controller untuk login dengan email dan password
export const loginWithEmailPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password); // Memanggil service login
    res.status(200).json({ token: `Bearer ${token}` }); // Mengembalikan Bearer Token
  } catch (error) {
    // Menggunakan type assertion untuk memastikan error memiliki properti 'message'
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

// Controller untuk login dengan token OAuth
export const loginWithOAuth = async (req: Request, res: Response) => {
    try {
      const { provider, token } = req.body;
      const userToken = await loginOAuth(provider, token); // Memanggil service login OAuth
      res.status(200).json({ token: `Bearer ${userToken}` }); // Mengembalikan Bearer Token
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  };
