import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user';
import { CreateUserDto } from '@app/shared/dtos/user';
import { PAYMENT_SERVICE, PaymentServiceClient } from '@app/shared/types/grpc';
import { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private logger = new Logger(AuthService.name);
  private paymentService: PaymentServiceClient;

  constructor(
    @Inject(PAYMENT_SERVICE) private client: ClientGrpc,
    private userService: UserService,
  ) {}

  onModuleInit() {
    this.paymentService =
      this.client.getService<PaymentServiceClient>(PAYMENT_SERVICE);
  }

  public async register(createUserDto: CreateUserDto) {
    const exist = await this.userService.getByEmail(createUserDto.email);
    if (exist) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.userService.createUser(createUserDto);

    try {
      return this.paymentService
        .createCustomer({
          id: user.id,
          email: user.email,
        })
        .pipe(
          map((res) => {
            return this.userService.attachCustomerId(user.id, res.customerId);
          }),
        );
    } catch (error) {
      this.logger.error(`Failed to create Customer for ${user.email}`);
    }
  }
}
