import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request.user.role;
    const handler = context.getHandler();
    const classHandler = context.getClass();
    const rolesKeys = this.reflector.getAllAndOverride('roles', [
      handler,
      classHandler,
    ]);
    if (!rolesKeys.includes(role)) {
      throw new ForbiddenException('Kirish mumkin emas');
    }
    return true;
  }
}
