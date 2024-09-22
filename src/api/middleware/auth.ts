import { Request, Response, NextFunction } from 'express';
import { error } from '../../domain/error';
import { getUserById } from '../../infra/user';
import { AuthService } from '../service/utils';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    throw new error('Token não fornecido', 401);
  }

   const id = AuthService.verifyToken(token)

   if (id == null) throw new error('Invalid token', 401);
  
    const user = await getUserById(id);

    if (!user) throw new error('User not found', 404);

    req.body.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };

    next();
  }

export default authenticate;