import axios from 'axios';
import { MercadoPagoRepository } from '../../application/repositories/mercado-pago.repository';

interface ProductItem {
  title: string;
  quantity: number;
  unit_price: number;
}

interface PaymentEntity {
  orderId: string;
  amount: number;
  products: ProductItem[];
}
export class MercadoPagoRepositoryImpl implements MercadoPagoRepository {
  async createPaymentPreference({
    orderId,
    products,
  }: PaymentEntity): Promise<any> {
    const preference = {
      items: products,
      external_reference: orderId,
      notification_url:
        'https://d0ewo299u4.execute-api.us-east-1.amazonaws.com/dev/fps/webhook/payment',
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

      return response.data.sandbox_init_point;
    } catch (error) {
      return error;
    }
  }
}
