import { Module } from '@nestjs/common';
import { PaymentRepository } from '../../application/repositories/payment.repository';
import { DatabaseModule } from '../../../../../common/database/database.module';
import { PrismaPaymentRepositoryImpl } from './prisma/repositories/prisma-payment.repository.impl';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      useClass: PrismaPaymentRepositoryImpl,
      provide: PaymentRepository,
    },
  ],

  exports: [PaymentRepository],
})
export class PersistenceModule {}
