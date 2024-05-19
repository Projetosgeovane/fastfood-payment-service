import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { EnvModule } from './common/env/env.module';

@Module({
  imports: [EnvModule, PaymentModule],
})
export class AppModule {}
