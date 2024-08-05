import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class PaymentsMessageController {
  @EventPattern('order_created')
  async handleOrderCreated(data: any) {
    // Processar o pagamento com base no pedido criado
    console.log('Order Created (Payments):', data);
    // Adicione aqui a lógica para processar o pagamento
  }
}
