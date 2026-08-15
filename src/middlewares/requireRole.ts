import { Request, Response, NextFunction } from 'express';

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Authorization token is required',
      });
    }
    if (req.user.role != role) {
      return res.status(403).json({
        message: 'only user with appropriate role can access this route',
      });
    }
    next();
  };
};
