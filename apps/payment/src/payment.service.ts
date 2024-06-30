import { CreateCustomerDto } from '@app/shared/dtos/payment';
import { Injectable } from '@nestjs/common';
import { StripeService } from 'libs/infra/stripe';

@Injectable()
export class PaymentService {
  constructor(private stripe: StripeService) {}

  async createCustomer({ id, email }: CreateCustomerDto) {
    const customer = await this.stripe.createCustomer({
      email,
      metadata: { userId: id },
    });

    return { customerId: customer.id };
  }
}
