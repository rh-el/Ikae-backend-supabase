import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

export interface AuthenticatedRequest extends Request {
    user: JwtPayload | null;
}

export function authenticateToken(req: Request, res: Response, next: any) {
  dotenv.config();
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);
    
    (req as AuthenticatedRequest).user = user

    next()

  })
}