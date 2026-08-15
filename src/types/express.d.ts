import { JwtPayload } from 'jsonwebtoken';

export interface AuthPayload extends JwtPayload {
  userId: number;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export {};
