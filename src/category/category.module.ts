import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/role.guard';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, JwtAuthGuard, RolesGuard],
  exports: [CategoryService],
})
export class CategoryModule {}
