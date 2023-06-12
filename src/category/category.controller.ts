import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Prisma, Role } from '@prisma/client';
import { CategoryDto } from './category.dto';
import { RolesGuard } from '../auth/roles/role.guard';
import { Roles } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller()
//@UseGuards(AuthGuard('local'), RolesGuard, JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // เพิ่มการใช้งาน RoleGuard และ JwtAuthGuard
  @Post('/category/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN) // กำหนดสิทธิ์ที่จำเป็น
  async create(@Body() categoryDto: CategoryDto) {
    return this.categoryService.createCategory(categoryDto);
  }

  // เอาข้อมูลจาก category มาแสดงทั้งหมด
  @Get('/categories')
  async findAll() {
    return this.categoryService.findAllCategories();
  }

  // เอาข้อมูลจาก categoryid มาเพื่ออัพเดตข้อมูล
  @Put('/category/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete('/category/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
