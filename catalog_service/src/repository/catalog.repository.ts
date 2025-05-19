import { PrismaClient } from "../generated/prisma";
import { ICatalogRepository } from "../interfaces/catalogRepo.interface";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {
  _prisma: PrismaClient;
  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: Product): Promise<Product> {
    return this._prisma.product.create({ data });
  }
  async update(data: Product): Promise<Product> {
    return this._prisma.product.update({ where: { id: data.id }, data });
  }
  async delete(id: any): Promise<Product> {
    return this._prisma.product.delete({ where: { id } });
  }
  async find(limit: number, offset: number): Promise<Product[]> {
    return this._prisma.product.findMany({ take: limit, skip: offset });
  }
  async findOne(id: number): Promise<Product | null> {
    const product = this._prisma.product.findFirst({ where: { id } });
    if (product) {
      return Promise.resolve(product);
    }
    throw new Error("product not found");
  }
  //   findStock(ids: number[]): Promise<Product[]> {}
}
