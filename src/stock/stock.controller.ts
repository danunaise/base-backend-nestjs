import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { StockDto } from './stock.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { Roles } from 'src/auth/roles/role.decorator';
import { RoleName } from '@prisma/client';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  async findAll() {
    return this.stockService.getAllStock();
  }

  @Get('product/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  async findByProduct(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.getStockByProduct(id);
  }

  // ดึงจำนวณสินค้าใน stock ของสินค้าที่ระบุ :id = product idที่ต้องการ
  @Get('product/:id/quantity')
  async findQuantityByProduct(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.getStockQuantityByProduct(id);
  }

  @Post('add')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  async create(@Body() dto: StockDto) {
    return this.stockService.addStock(dto);
  }

  @Put('edit/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.stockService.updateStock(id, data);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.deleteStock(id);
  }
}
