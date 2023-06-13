import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/role.guard';

@Module({
  controllers: [StockController],
  providers: [StockService, PrismaService, JwtAuthGuard, RolesGuard],
})
export class StockModule {}
