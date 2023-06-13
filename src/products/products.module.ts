import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/role.guard';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, JwtAuthGuard, RolesGuard],
})
export class ProductsModule {}
