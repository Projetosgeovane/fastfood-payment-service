import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '../../repositories/payment.repository';
import axios from 'axios';
import { HandleWebhookDTO } from '../../../infra/http/dtos/handle-webhook.dto';
import { Either, success } from '@enablers/core/types';
import { ResourceExistsError } from '@enablers/core/errors';

type HandleResponse = Either<ResourceExistsError, object>;

@Injectable()
export class HandleWebhookPaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute({ resource }: HandleWebhookDTO): Promise<HandleResponse> {
    const accessToken =
      'TEST-1890620293544237-051817-4f2fb0e98f6446f863782245b01ae747-1812283594';

    const responseWebhook = await axios.get(resource, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const orderDetails = responseWebhook.data;
    const orderId = orderDetails?.external_reference;

    const response = await axios.get<any>(
      `https://api.mercadopago.com/v1/payments/search?external_reference=${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('response', response.data);
    const paymentDetails = response.data.results[0];

    const payment = await this.paymentRepository.findByTransactionId(orderId);
    if (payment && paymentDetails) {
      payment.status = paymentDetails.status;
      payment.paymentDate = new Date(paymentDetails.date_approved);
      payment.paymentMethod = paymentDetails.payment_type;
      payment.payerEmail = paymentDetails.payer.email;
      payment.payerId = paymentDetails.payer.id;

      await this.paymentRepository.save(payment);

      // Atualiza o status do pedido no serviço de Order
      await axios.put(`http://localhost:3000/order/${orderId}`, {
        status: paymentDetails.status,
      });
    }

    return success({});
  }
}
