import axios from 'axios';
import { MercadoPagoRepository } from '../../application/repositories/mercado-pago.repository';
import { PaymentEntity } from '../../enterprise/payment.entity';

export class MercadoPagoRepositoryImpl implements MercadoPagoRepository {
  async createPaymentPreference({
    orderId,
    amount,
  }: PaymentEntity): Promise<any> {
    const preference = {
      items: [
        {
          title: `Order ${orderId}`,
          quantity: 1,
          unit_price: amount,
        },
      ],
      external_reference: orderId, // Inclui o orderId como referência externa
      notification_url:
        'https://d0ewo299u4.execute-api.us-east-1.amazonaws.com/dev/fps/webhook/payment', // URL do webhook
    };

    try {
      const response = await axios.post(
        'https://api.mercadopago.com/checkout/preferences',
        preference,
        {
          headers: {
            Authorization: `Bearer TEST-1890620293544237-051817-4f2fb0e98f6446f863782245b01ae747-1812283594`,
          },
        },
      );

      return response.data.init_point; //
    } catch (error) {
      return error;
    }
  }
}
