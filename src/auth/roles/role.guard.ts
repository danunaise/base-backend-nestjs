import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'prisma/prisma.service';
import { RoleName } from '.prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<RoleName[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('User:', user);

    if (!user) {
      throw new UnauthorizedException();
    }

    const userRoles = await this.prisma.user.findUnique({
      where: {
        id: user.userId,
      },
      include: {
        role: true,
      },
    });

    const userRoleNames = userRoles.role.name;

    const hasRole = () => roles.some((role) => userRoleNames.includes(role));

    if (!hasRole()) {
      console.log('User:', user);
      console.log('Roles Req:', roles);
      console.log('User Roles:', userRoleNames);
      throw new UnauthorizedException();
    }
    //debug
    console.log('User:', user);
    console.log('Roles:', roles);
    console.log('User Roles:', userRoleNames);
    return true;
  }
}
