export class EditPaymentDTO {
  orderId: string;
  paymentMethod: string;
  status: string;
  amount: number;
  transactionId: string;
  payerEmail: string;
  payerId: string;
  paymentDate: Date;
}
