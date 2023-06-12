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
import { RoleName } from '@prisma/client';
import { CategoryDto } from './category.dto';
import { RolesGuard } from '../auth/roles/role.guard';
import { Roles } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('category')
//@UseGuards(AuthGuard('local'), RolesGuard, JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // เพิ่มการใช้งาน RoleGuard และ JwtAuthGuard
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN) // กำหนดสิทธิ์ที่จำเป็น
  @Post('create')
  async create(@Body() categoryDto: CategoryDto) {
    return this.categoryService.createCategory(categoryDto);
  }

  // เอาข้อมูลจาก category มาแสดงทั้งหมด
  @Get()
  async findAll() {
    return this.categoryService.findAllCategories();
  }

  // เอาข้อมูลจาก categoryid มาเพื่ออัพเดตข้อมูล
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN) // กำหนดสิทธิ์ที่จำเป็น
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN) // กำหนดสิทธิ์ที่จำเป็น
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
