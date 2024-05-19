import axios from 'axios';
import { MercadoPagoRepository } from 'src/modules/payment/domain/application/repositories/mercado-pago.repository';

export class InMemoryMercadoPagoRepositoryImpl
  implements MercadoPagoRepository
{
  async createPaymentPreference({ orderId, amount }: any): Promise<any> {
    const preference = {
      items: [
        {
          title: `Order ${orderId}`,
          quantity: 1,
          unit_price: amount,
        },
      ],
      external_reference: orderId,
      notification_url:
        'https://d0ewo299u4.execute-api.us-east-1.amazonaws.com/dev/fps/webhook/payment',
    };

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
  }
  catch(error) {
    return error;
  }
}
