import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '.prisma/client';
import { Role } from '.prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    const userRoles = await this.prisma.userRole.findMany({
      where: {
        userId: user.id,
      },
      include: {
        role: true,
      },
    });
    const userRolesNames = userRoles.map((userRole) => userRole.role.name);

    const hasRole = () => roles.some((role) => userRolesNames.includes(role));

    if (!user || !userRolesNames || !hasRole()) {
      throw new UnauthorizedException();
    }
    console.log('User:', user);
    console.log('Roles:', roles);
    console.log('User Roles:', userRolesNames);
    return true;
  }
}
