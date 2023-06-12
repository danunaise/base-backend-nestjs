import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RoleName } from '@prisma/client';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // check if "admin" role exists
    let role = await this.prisma.roles.findUnique({
      where: { name: RoleName.ADMIN },
    });

    // if not, create it
    if (!role) {
      role = await this.prisma.roles.create({
        data: { name: RoleName.ADMIN },
      });
    }

    // same for "user" role
    role = await this.prisma.roles.findUnique({
      where: { name: RoleName.USER },
    });
    if (!role) {
      role = await this.prisma.roles.create({
        data: { name: RoleName.USER },
      });
    }
  }

  // ... other methods ...
}
