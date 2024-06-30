import {
  CreateChargeResponse,
  CreateCustomerMessage,
  PaymentServiceController,
  PaymentServiceControllerMethods,
} from '@app/shared/types/grpc';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PaymentService } from './payment.service';

@Controller('payments')
@PaymentServiceControllerMethods()
export class PaymentController implements PaymentServiceController {
  constructor(private paymentService: PaymentService) {}

  async createCustomer(request: CreateCustomerMessage) {
    return await this.paymentService.createCustomer(request);
  }

  createCharge():
    | CreateChargeResponse
    | Promise<CreateChargeResponse>
    | Observable<CreateChargeResponse> {
    throw new Error('Method not implemented.');
  }
}
