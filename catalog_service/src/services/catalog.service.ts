import { ICatalogRepository } from "../interfaces/catalogRepo.interface";
import { OrderWithLineItems } from "../types";

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

  async handleBrokerMessage(message: any) {
    console.log("Catalog Service received message", message);
    const orderData = message.data as OrderWithLineItems;
    const { orderItems } = orderData;
    orderItems.forEach(async (item) => {
      console.log("Updating stock for product", item.productId, item.qty);
      const product = await this.getProduct(item.productId);
      if (!product) {
        console.log(
          "Product not found during stock update for create order",
          item.productId
        );
      } else {
        const updatedStock = product.stock - item.qty;
        await this.updateProduct({ ...product, stock: updatedStock });
      }
    });
  }
}
