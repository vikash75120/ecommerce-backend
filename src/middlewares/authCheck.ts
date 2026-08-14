import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).json({
      message: 'Authorization token is required',
    });
  }

  const token = bearerToken.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
    console.log('testing decoded: ', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Invalid Authorization token',
    });
  }
};
