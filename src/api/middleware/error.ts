import { Request, Response, NextFunction } from 'express';
import { error } from '../../domain/error';


const errorMiddleware = (err: Error | error, req: Request, res: Response, next: NextFunction) => {
  const status = err instanceof error ? err.status : 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(`[Error] ${status} - ${message}`);

  res.status(status).json({
    status,
    message,
  });
};

export default errorMiddleware;
