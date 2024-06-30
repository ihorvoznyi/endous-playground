import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private logger = new Logger(StripeService.name);

  constructor(private config: ConfigService) {
    this.stripe = new Stripe(this.config.getOrThrow('stripe.sk'), {
      apiVersion: '2024-06-20',
    });
  }

  public async createCustomer(params: Stripe.CustomerCreateParams) {
    try {
      const customer = await this.stripe.customers.create(params);
      return customer;
    } catch (error) {
      this.logger.error('Failed to create stripe customer', error);
      throw new InternalServerErrorException(
        'Failed to create stripe customer',
      );
    }
  }
}
