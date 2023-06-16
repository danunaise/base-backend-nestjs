import { Injectable, Body } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { StockDto } from './stock.dto';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  //create stock
  async addStock(@Body() dto: StockDto) {
    const { items, productId } = dto;
    const addStock = this.prisma.stock.create({
      data: {
        items,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
    return addStock;
  }
  //get all stock
  getAllStock() {
    const stock = this.prisma.stock.findMany({
      include: {
        product: true,
      },
    });
    return stock;
  }

  async getStockByProduct(id: number) {
    const count = await this.prisma.stock.count({
      where: {
        productId: id,
      },
    });

    const stock = await this.prisma.stock.findMany({
      where: {
        productId: id,
      },
    });
    return { count, stock };
  }

  async getStockQuantityByProduct(id: number) {
    const count = await this.prisma.stock.count({
      where: {
        productId: id,
      },
    });

    return { count };
  }

  //update stock
  async updateStock(id: number, data: any) {
    const found = await this.prisma.stock.findUnique({
      where: { id },
    });
    if (!found) {
      return { message: 'Stock not found' };
    }
    const stock = await this.prisma.stock.update({
      where: { id },
      data: {
        items: data.items,
        productId: data.productId,
      },
    });

    return { message: 'Stock updated', stock };
  }

  //delete stock
  async deleteStock(id: number) {
    const found = await this.prisma.stock.findUnique({
      where: { id },
    });
    if (!found) {
      return { message: 'Stock not found' };
    }
    const stock = await this.prisma.stock.delete({
      where: { id },
    });

    return { message: 'Stock deleted', stock };
  }
}
