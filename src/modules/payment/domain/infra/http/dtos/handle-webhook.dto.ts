// src/payment/dtos/handle-webhook.dto.ts
import { IsString } from 'class-validator';

export class HandleWebhookDTO {
  @IsString()
  id: string;

  resource: string;
}
