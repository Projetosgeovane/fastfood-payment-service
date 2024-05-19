import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { HandleWebhookPaymentUseCase } from 'src/modules/payment/domain/application/use-cases/payment/handle-webhook-payment.use-case';

@Controller('fps')
export class HandleWebhookPaymentController {
  constructor(
    private readonly handleWebhookPaymentUseCase: HandleWebhookPaymentUseCase,
  ) {}

  @Post('/webhook/payment')
  async handle(@Body() body: any) {
    const result = await this.handleWebhookPaymentUseCase.execute(body);

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case Error: {
          throw new ConflictException(error.message);
        }
        default: {
          throw new BadRequestException();
        }
      }
    }
  }
}
