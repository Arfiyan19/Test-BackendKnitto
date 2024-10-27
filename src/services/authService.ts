import { db } from '../database/db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; // Import dotenv untuk membaca variabel lingkungan
dotenv.config(); // Menginisialisasi dotenv agar bisa menggunakan environment variables

// Fungsi untuk login menggunakan email dan password
export const loginUser = async (email: string, password: string) => {
  const [rows]: any = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

  if (rows.length === 0) {
    throw new Error('Invalid credentials');
  }

  // Membuat JWT token dengan userId yang diperoleh dari database
  const token = jwt.sign(
    { userId: rows[0].id }, // Payload (data yang akan disimpan dalam token)
    process.env.JWT_SECRET as string, // Secret key untuk mengenkripsi token (diambil dari environment variable)
    { expiresIn: '1h' } // Token akan berlaku selama 1 jam
  );

  return token; // Mengembalikan token
};

// Fungsi untuk login menggunakan token OAuth
export const loginOAuth = async (provider: string, token: string) => {
    // Logika sederhana untuk memvalidasi token dari provider (misalnya Google atau Facebook)
    if (provider === 'google' && token === 'valid-google-token') {
      // Membuat JWT token jika valid
      const userToken = jwt.sign(
        { provider: 'google', userId: 'googleUser123' },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
      return userToken;
    } else if (provider === 'facebook' && token === 'valid-facebook-token') {
      const userToken = jwt.sign(
        { provider: 'facebook', userId: 'facebookUser123' },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
      return userToken;
    } else {
      throw new Error('Invalid OAuth token');
    }
  };
