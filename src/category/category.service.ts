import { Injectable, Body } from '@nestjs/common';
//import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(@Body() dto: CategoryDto) {
    const { name, description, image } = dto;
    const found = await this.prisma.category.findUnique({
      where: { name },
    });
    if (found) {
      return { message: 'Category already exists' };
    }
    const category = await this.prisma.category.create({
      data: {
        name,
        description,
        image,
      },
    });
    return { message: 'Category created', category };
  }

  async findAllCategories() {
    // ขอข้อมูล categories ทั้งหมด
    const categories = await this.prisma.category.findMany();

    // ทำการ map ผ่านแต่ละ category เพื่อนับจำนวน products
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await this.countProductsInCategory(category.id);
        // เพิ่ม count ให้กับ category และส่งกลับ
        return { ...category, count };
      }),
    );

    return categoriesWithCounts;
  }

  async countProductsInCategory(categoryId) {
    const count = await this.prisma.product.count({
      where: {
        categoryId: categoryId,
      },
    });
    return count;
  }

  findCategoryById(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }
  findProductByCategory(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
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
