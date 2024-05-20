import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import request from 'supertest';
import { PaymentFactory } from 'test/factories/make-payment.factory';

describe('Edit Device Type (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let paymentFactory: PaymentFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PaymentFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    paymentFactory = moduleRef.get(PaymentFactory);

    await app.init();
  });

  test('[PUT] /payment', async () => {
    const payment = await paymentFactory.makePrismaPayment({
      amount: 100,
      orderId: 'aew8c1a9g4g4q9wa5dd9a6ds5',
      status: 'PENDING',
    });

    const response = await request(app.getHttpServer())
      .put(`/fps/payment/${payment.id.toValue()}`)
      .send({
        amount: 50,
        orderId: 'aew8c1a9g4g4q9wa5dd9a6ds5',
        status: 'approved',
      });

    expect(response.statusCode).toBe(204);

    const paymentOnDatabase = await prisma.payment.findUnique({
      where: {
        id: payment.id.toValue(),
      },
    });

    expect(paymentOnDatabase).toBeTruthy();
  });
});
