import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Buat tipe kustom untuk Request yang memiliki properti user
interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(401); // Jika tidak ada token, kirimkan 401 Unauthorized
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      res.sendStatus(403); // Jika token tidak valid, kirimkan 403 Forbidden
      return;
    }
    req.user = user; // Simpan user yang terverifikasi pada objek req
    next(); // Lanjutkan ke middleware berikutnya
  });
};
