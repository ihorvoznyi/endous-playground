import { CreateCustomerMessage } from '@app/shared/types/grpc';
import { IsEmail, IsString } from 'class-validator';

export class CreateCustomerDto implements CreateCustomerMessage {
  @IsString()
  id: string;

  @IsEmail()
  email: string;
}
