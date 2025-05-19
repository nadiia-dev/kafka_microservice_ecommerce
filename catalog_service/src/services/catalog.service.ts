import { ICatalogRepository } from "../interfaces/catalogRepo.interface";

export class CaltalogService {
  private _repo: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
    this._repo = repository;
  }
  async createProduct(input: any) {
    const data = await this._repo.create(input);
    if (!data.id) {
      throw new Error("unable to create product");
    }
    return data;
  }
  async updateProduct(input: any) {
    const data = await this._repo.update(input);
    if (!data.id) {
      throw new Error("unable to update product");
    }
    return data;
  }
  async getProducts(limit: number, offset: number) {
    const data = await this._repo.find(limit, offset);
    return data;
  }
  async getProduct(id: number) {
    const data = await this._repo.findOne(id);
    return data;
  }
  async deleteProduct(id: number) {
    const response = await this._repo.delete(id);
    return response;
  }

  async getProductStock(ids: number[]) {
    const products = await this._repo.findStock(ids);
    if (!products) {
      throw new Error("unable to find product stock details");
    }
    return products;
  }
}
