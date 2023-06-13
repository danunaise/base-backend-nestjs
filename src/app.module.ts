import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/prisma.service';
import { Role, RoleName } from '@prisma/client';
import { ProductsModule } from './products/products.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [AuthModule, UsersModule, CategoryModule, PassportModule, ProductsModule, StockModule],
  providers: [PrismaService],
})
export class AppModule implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // check if "USER" role exists
    let role = await this.prisma.role.findUnique({
      where: { name: RoleName.USER },
    });

    // if not, create it
    if (!role) {
      role = await this.prisma.role.create({
        data: { name: RoleName.USER },
      });
    }

    // same for "ADMIN" role
    role = await this.prisma.role.findUnique({
      where: { name: RoleName.ADMIN },
    });
    if (!role) {
      role = await this.prisma.role.create({
        data: { name: RoleName.ADMIN },
      });
    }
  }
}
