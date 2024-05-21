import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { EditPaymentUseCase } from 'src/modules/payment/domain/application/use-cases/payment/edit-payment.use-case';
import { EditPaymentDTO } from '../../dtos/edit-payment.dto';

@Controller('fps')
export class EditPaymentController {
  constructor(private readonly editPaymentUseCase: EditPaymentUseCase) {}

  @Put('payment/:paymentId')
  @HttpCode(204)
  async handle(@Param('paymentId') id: string, @Body() body: EditPaymentDTO) {
    const { status } = body;

    const result = await this.editPaymentUseCase.execute({
      id,
      status,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case Error:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }
  }
}
