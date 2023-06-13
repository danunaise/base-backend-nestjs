import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  async create(@Body() dto: ProductDto) {
    return this.productsService.createProduct(dto);
  }

  @Get()
  async findAll() {
    return this.productsService.getAllProducts();
  }

  @Put('edit/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.productsService.updateProduct(id, data);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }
}
