import { USER_ROLE } from '@/src/api/users/entities/user.entity';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLE_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<USER_ROLE>(
      ROLE_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) true;

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    const hasAccess = requiredRoles.includes(user.role);

    // if user not exist
    if (!user || !hasAccess) {
      throw new UnauthorizedException();
    }

    return hasAccess;
  }
}
