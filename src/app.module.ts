import { Module, OnModuleInit } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
//import { RolesGuard } from './auth/roles/roles.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/prisma.service';
import { Role } from '@prisma/client';

@Module({
  imports: [AuthModule, UsersModule, CategoryModule, PassportModule],
  providers: [PrismaService],
})
export class AppModule implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // check if "USER" role exists
    let role = await this.prisma.roles.findUnique({
      where: { name: Role.USER },
    });

    // if not, create it
    if (!role) {
      role = await this.prisma.roles.create({
        data: { name: Role.USER },
      });
    }

    // same for "ADMIN" role
    role = await this.prisma.roles.findUnique({
      where: { name: Role.ADMIN },
    });
    if (!role) {
      role = await this.prisma.roles.create({
        data: { name: Role.ADMIN },
      });
    }
  }
}
