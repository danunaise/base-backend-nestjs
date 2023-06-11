import {
  Request,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RolesGuard } from '../auth/roles/role.guard';
import { Roles } from '../auth/roles/role.decorator';
import { Role } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  //@Roles(ERole.ADMIN) // กำหนดสิทธิ์ที่จำเป็น
  @UseGuards(RolesGuard) // เพิ่มการใช้งาน RoleGuard
  @Roles(Role.ADMIN) // กำหนดสิทธิ์ที่จำเป็น
  @Get('admin')
  findAllAdmin() {
    // ...
    return 'admin';
  }
  @UseGuards(AuthGuard('local'), RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin')
  async login(@Request() req) {
    // after successful login, Passport will automatically add user to req
    return 'you did it!';
    // ...
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
