import { Module } from '@nestjs/common';
import { CreatePaymentController } from './controllers/payment/create-payment.controller.';
import { PersistenceModule } from '../persistence/persistence.module';
import { FetchPaymentsController } from './controllers/payment/fetch-payments.controller';
import { EditPaymentController } from './controllers/payment/edit-payment.controler';
import { FetchPaymentController } from './controllers/payment/fetch-payment.controller';
import { CreatePaymentUseCase } from '../../application/use-cases/payment/create-payment.use-case';
import { FetchPaymentUseCase } from '../../application/use-cases/payment/fetch-payment.use-case';
import { EditPaymentUseCase } from '../../application/use-cases/payment/edit-payment.use-case';
import { FetchPaymentsUseCase } from '../../application/use-cases/payment/fetch-payments.use-case';
import { MercadoPagoModule } from '../mercadoPago/mercado-pago.module';
import { HandleWebhookPaymentController } from './controllers/payment/handle-webhook-payment.controller';
import { HandleWebhookPaymentUseCase } from '../../application/use-cases/payment/handle-webhook-payment.use-case';

@Module({
  imports: [PersistenceModule, MercadoPagoModule],
  controllers: [
    CreatePaymentController,
    HandleWebhookPaymentController,
    FetchPaymentsController,
    FetchPaymentController,
    EditPaymentController,
  ],
  providers: [
    HandleWebhookPaymentUseCase,
    CreatePaymentUseCase,
    FetchPaymentsUseCase,
    FetchPaymentUseCase,
    EditPaymentUseCase,
  ],
})
export class HttpModule {}
