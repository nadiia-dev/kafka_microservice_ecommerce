import { Consumer, Producer } from "kafkajs";
import { MessageBroker } from "../utils";

export const InitializeBroker = async () => {
  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", async () => {
    console.log("Producer connected successfully");
  });

  const consumer = await MessageBroker.connectConsumer<Consumer>();
  consumer.on("consumer.connect", async () => {
    console.log("Consumer connected successfully");
  });

  await MessageBroker.subscribe((message) => {
    console.log(message);
  }, "OrderEvents");
};
