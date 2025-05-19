import { ICatalogRepository } from "../interfaces/catalogRepo.interface";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {
  constructor() {}

  async create(data: Product): Promise<Product> {}
  async update(data: Product): Promise<Product> {}
  async delete(id: any) {}
  async find(limit: number, offset: number): Promise<Product[]> {}
  async findOne(id: number): Promise<Product> {}
  findStock(ids: number[]): Promise<Product[]> {}
}
