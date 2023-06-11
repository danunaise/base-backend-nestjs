import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // check if "admin" role exists
    let role = await this.prisma.roles.findUnique({
      where: { name: Role.ADMIN },
    });

    // if not, create it
    if (!role) {
      role = await this.prisma.roles.create({
        data: { name: Role.ADMIN },
      });
    }

    // same for "user" role
    role = await this.prisma.roles.findUnique({
      where: { name: Role.USER },
    });
    if (!role) {
      role = await this.prisma.roles.create({
        data: { name: Role.USER },
      });
    }
  }

  // ... other methods ...
}
