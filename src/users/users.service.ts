import { Injectable, Body } from '@nestjs/common';
import { userDto } from './user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return user;
  }

  async findUserInfo(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
