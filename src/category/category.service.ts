import { Injectable, Body } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(@Body() dto: CategoryDto) {
    const { name, description, image } = dto;
    const category = await this.prisma.category.create({
      data: {
        name,
        description,
        image,
      },
    });
    return { message: 'Category created', category };
  }

  findAllCategories() {
    return this.prisma.category.findMany();
  }

  async updateCategory(id: number, data: any) {
    return this.prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
      },
    });
  }

  async deleteCategory(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
