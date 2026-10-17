import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    email: string;
    role: 'ADMIN' | 'TEACHER';
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Пользователь не найден');
    }

    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Только Admin может выполнять это действие');
    }

    return true;
  }
}
