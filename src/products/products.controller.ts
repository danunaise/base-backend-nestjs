import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './product.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { RoleName } from '@prisma/client';
import { Roles } from 'src/auth/roles/role.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  async create(@Body() dto: ProductDto) {
    return this.productsService.createProduct(dto);
  }

  @Get()
  async findAll() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductById(id);
  }

  @Get('category/:id')
  async findByCategory(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductsByCategory(id);
  }

  // ดึงจำนวณสินค้าใน stock ของสินค้าที่ระบุ :id = product idที่ต้องการ
  // @Get('/:id/quantity')
  // async findQuantityByProduct(@Param('id', ParseIntPipe) id: number) {
  //   return this.productsService.getStockQuantityByProduct(id);
  // }

  @Put('edit/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.productsService.updateProduct(id, data);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }
}
