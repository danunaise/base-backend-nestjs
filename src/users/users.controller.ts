import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local/local-auth.guard';
import { UsersService } from './users.service';
//import { Prisma, Role } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async register(@Request() req) {
    return this.usersService.signUp(req.body);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const username = req.user.username; // รับค่า username จาก req.user
    const user = await this.usersService.findUserInfo(username); // เรียกใช้งานเมธอด findUserById() ใน UsersService

    // อื่นๆ ที่คุณต้องการแสดงข้อมูลของผู้ใช้
    const { password, createdAt, updatedAt, ...userProfile } = user;
    //userProfile.roles = roles; // เพิ่มข้อมูล roles เข้าไปใน userProfile

    return userProfile;
  }
}
