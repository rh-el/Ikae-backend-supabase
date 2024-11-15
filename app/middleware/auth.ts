import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

export interface AuthenticatedRequest extends Request {
    email: JwtPayload | null;
}

// check validity of a token
export function authenticateToken(req: Request, res: Response, next: any) {
  dotenv.config();

  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, email: any) => {
    console.log('USER', email);
    
    if (err) return res.sendStatus(403);
    
    (req as AuthenticatedRequest).email = email

    next()

  })
}