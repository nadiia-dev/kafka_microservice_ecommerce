import { GetOrderDetails, PaymentGateway } from "../utils";
import { SendPaymentUpdateMessage } from "./broker.service";

export const CreatePayment = async (
  userId: number,
  orderId: number,
  paymentGateway: PaymentGateway
) => {
  // get order details from order service
  const order = await GetOrderDetails(orderId);
  if (order.customerId !== userId) {
    throw new Error("user not authorised to create payment");
  }

  const amount = order.amount * 100;
  const orderMetadata = {
    orderNumber: order.orderNumber,
    userId,
  };

  const paymentResp = await paymentGateway.createPayment(amount, orderMetadata);

  // return payment secrets
  return {
    secret: paymentResp.secret,
    pubKey: paymentResp.pubKey,
    amount,
    order,
  };
};

export const VerifyPayment = async (
  paymentId: string,
  paymentGateway: PaymentGateway
) => {
  const paymentResp = await paymentGateway.getPayment(paymentId);

  await SendPaymentUpdateMessage({
    orderNumber: paymentResp.orderNumber,
    status: paymentResp.status,
    paymentLog: paymentResp.paymentLog,
  });

  return {
    message: "Payment verified",
    status: paymentResp.status,
    paymentLog: paymentResp.paymentLog,
  };
};
