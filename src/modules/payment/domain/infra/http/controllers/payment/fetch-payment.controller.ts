import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PaymentsPresenter } from '../../presenters/payments.presenter';
import { FetchPaymentUseCase } from 'src/modules/payment/domain/application/use-cases/payment/fetch-payment.use-case';

@Controller('fps')
export class FetchPaymentController {
  constructor(private readonly fetchPaymentUseCase: FetchPaymentUseCase) {}
  @Get('payment/:paymentId')
  async handle(@Param('paymentId') id: string) {
    const result = await this.fetchPaymentUseCase.execute({ id });

    if (result.isFailure()) {
      throw new BadRequestException();
    }

    const payments = PaymentsPresenter.toHTTP(result.value.payment);

    return { payments };
  }
}
