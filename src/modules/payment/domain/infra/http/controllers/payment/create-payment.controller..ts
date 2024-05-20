import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { CreatePaymentDTO } from '../../dtos/create-payment.dto';
import { CreatePaymentUseCase } from 'src/modules/payment/domain/application/use-cases/payment/create-payment.use-case';

@Controller('fps')
export class CreatePaymentController {
  constructor(private readonly createPaymentUseCase: CreatePaymentUseCase) {}

  @Post('payment')
  async handle(@Body() body: CreatePaymentDTO) {
    const { totalAmount, id, paymentMethod, products } = body;

    const result = await this.createPaymentUseCase.execute({
      amount: totalAmount,
      orderId: id,
      paymentMethod,
      products,
    });

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

    return result;
  }
}
