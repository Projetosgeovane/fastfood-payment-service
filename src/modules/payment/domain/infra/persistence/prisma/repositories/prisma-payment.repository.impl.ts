import { Injectable } from '@nestjs/common';
import { PaymentRepository } from 'src/modules/payment/domain/application/repositories/payment.repository';
import { PaymentEntity } from 'src/modules/payment/domain/enterprise/payment.entity';
import { PrismaPaymentMapper } from '../../mappers/prisma-payment.mapper';
import { PrismaService } from '../../../../../../../common/database/prisma/prisma.service';
import { PaginationParams } from '@enablers/core/repositories';

@Injectable()
export class PrismaPaymentRepositoryImpl implements PaymentRepository {
  private readonly PERPAGE = 20;
  constructor(private readonly prisma: PrismaService) {}

  async findByTransactionId(
    transactionId: string,
  ): Promise<PaymentEntity | null> {
    const payment = await this.prisma.payment.findFirst({
      where: {
        orderId: transactionId,
      },
    });

    if (!payment) {
      return null;
    }

    return PrismaPaymentMapper.toDomain(payment);
  }

  async create(data: PaymentEntity): Promise<void> {
    const payment = PrismaPaymentMapper.toPrisma(data);

    await this.prisma.payment.create({
      data: {
        ...payment,
      },
    });
  }

  async save(body: PaymentEntity): Promise<void> {
    const payment = PrismaPaymentMapper.toPrisma(body);

    await this.prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        ...payment,
      },
    });
  }

  async findManyRecent({ page }: PaginationParams): Promise<PaymentEntity[]> {
    const payment = await this.prisma.payment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: this.PERPAGE,
      skip: (page - 1) * this.PERPAGE,
    });

    return payment.map(PrismaPaymentMapper.toDomain);
  }

  async findById(id: string): Promise<PaymentEntity> {
    const payment = await this.prisma.payment.findFirst({
      where: {
        id,
      },
    });

    if (!payment) {
      return null;
    }

    return PrismaPaymentMapper.toDomain(payment);
  }
  delete(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`);
  }
  softDelete(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`);
  }
}
