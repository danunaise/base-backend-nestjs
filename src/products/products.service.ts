import { Body, Injectable } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(@Body() dto: ProductDto) {
    const { name, description, image, price, categoryId } = dto;
    const found = await this.prisma.product.findUnique({
      where: { name },
    });

    if (found) {
      return { message: 'Product already exists' };
    }

    const product = await this.prisma.product.create({
      data: {
        name,
        description,
        image,
        price,
        categoryId,
      },
    });

    return { message: 'Product created', product };
  }

  async getAllProducts() {
    const products = await this.prisma.product.findMany({
      include: {
        category: true,
      },
    });

    return products;
  }

  async updateProduct(id: number, data: any) {
    const found = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!found) {
      return { message: 'Product not found' };
    }
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
        price: data.price,
        categoryId: data.categoryId,
      },
    });

    return { message: 'Product updated', product };
  }

  async deleteProduct(id: number) {
    const found = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!found) {
      return { message: 'Product not found' };
    }
    const product = await this.prisma.product.delete({
      where: { id },
    });

    return { message: 'Product deleted', product };
  }
}
