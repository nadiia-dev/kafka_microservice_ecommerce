import { Consumer, Producer } from "kafkajs";
import { CaltalogService } from "./catalog.service";
import { MessageBroker } from "../utils/broker";

export class BrokerService {
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;
  private catalogService: CaltalogService;

  constructor(catalogService: CaltalogService) {
    this.catalogService = catalogService;
  }

  public async initializeBroker() {
    this.producer = await MessageBroker.connectProducer<Producer>();
    this.producer.on("producer.connect", async () => {
      console.log("Catalog Service Producer connected successfully");
    });

    this.consumer = await MessageBroker.connectConsumer<Consumer>();
    this.consumer.on("consumer.connect", async () => {
      console.log("Catalog Service Consumer connected successfully");
    });

    await MessageBroker.subscribe(
      this.catalogService.handleBrokerMessage.bind(this.catalogService),
      "CatalogEvents"
    );
  }

  public async sendDeleteProductMessage(data: any) {}
}
