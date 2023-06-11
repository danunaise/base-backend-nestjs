import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { username } }); // ใช้ Prisma Client เพื่อค้นหาผู้ใช้จากฐานข้อมูล
    //ถอดรหัสผ่านที่รับเข้ามาและเปรียบเทียบกับรหัสผ่านที่เก็บในฐานข้อมูล
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
    
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
