import { Request, Response, NextFunction } from 'express';

export const userCheck = (req: Request, res: Response, next: NextFunction) => {
  const requestedUesrId = Number(req.params.id);
  const loggedInUser = req.user?.userId;
  console.log('testing current user: ', { requestedUesrId, loggedInUser });

  if (requestedUesrId !== loggedInUser) {
    return res.status(403).json({
      message: 'only user with appropriate role can access this route',
    });
  }
  next();
};
