import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PaymentsPresenter } from '../../presenters/payments.presenter';
import { FetchPaymentsUseCase } from 'src/modules/payment/domain/application/use-cases/payment/fetch-payments.use-case';

@Controller('fps')
export class FetchPaymentsController {
  constructor(private readonly fetchPaymentsUseCase: FetchPaymentsUseCase) {}

  @Get('payments')
  async handle(@Query('page', ParseIntPipe) page: number) {
    const result = await this.fetchPaymentsUseCase.execute({ page });

    if (result.isFailure()) {
      throw new BadRequestException();
    }

    const payments = result.value.payments.map(PaymentsPresenter.toHTTP);

    return { payments };
  }
}
