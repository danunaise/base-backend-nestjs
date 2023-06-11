import { Injectable, Body } from '@nestjs/common';
import { userDto } from './user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(@Body() dto: userDto) {
    const { username, password } = dto;
    const found = await this.prisma.user.findUnique({ where: { username } });
    if (found) {
      throw new Error('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // find the "user" role
    const userRole = await this.prisma.roles.findUnique({
      where: { name: Role.USER },
    });
    // create the new user with the "user" role
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        roles: {
          create: {
            role: {
              connect: {
                id: userRole.id,
              },
            },
          },
        },
      },
    });
    return user;
  }

  async findUserInfo(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
    // const found = await this.prisma.user.findUnique({
    //   where: { username },
    //   include: { roles: true },
    // });
    // if (!found) {
    //   throw new Error('Username already exists');
    // }
    // return found;
  }
}
