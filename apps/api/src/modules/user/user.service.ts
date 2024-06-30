import { UserEntity } from '@app/shared/database/entities';
import { CreateUserDto } from '@app/shared/dtos/user';
import { hashPassword } from '@app/shared/utils/password.utils';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  private userRepo: Repository<UserEntity>;
  private logger = new Logger(UserService.name);

  constructor(private dataSource: DataSource) {
    this.userRepo = this.dataSource.getRepository(UserEntity);
  }

  public async getAll() {
    try {
      const users = await this.userRepo.find();
      return users;
    } catch (error) {
      this.logger.error('Failed to get list of users', error);
      throw new InternalServerErrorException('Failed to get list of users.');
    }
  }

  public async createUser(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await hashPassword(createUserDto.password);
      const user = this.userRepo.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return await this.userRepo.save(user);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  public async getById(id: string) {
    try {
      const user = await this.userRepo.findOneBy({ id });
      return user;
    } catch (error) {
      this.logger.error(`Failed to find user with id ${id}`, error);
      throw new InternalServerErrorException(
        `Failed to find user with id ${id}`,
      );
    }
  }

  public async getByEmail(email: string) {
    try {
      const user = await this.userRepo.findOneBy({ email });
      return user;
    } catch (error) {
      this.logger.error(`Failed to find user with email ${email}`, error);
      throw new InternalServerErrorException(
        `Failed to find user with email ${email}`,
      );
    }
  }

  public async attachCustomerId(id: string, customerId: string) {
    const user = await this.getById(id);
    if (!user) {
      throw new NotFoundException(
        `[FAILED ATTACH CUSTOMER ID] User with id ${id} does not exist`,
      );
    }

    try {
      user.customerId = customerId;
      return await this.userRepo.save(user);
    } catch (error) {
      this.logger.error('FAILED ATTACH CUSTOMER ID', error);
      throw new InternalServerErrorException('FAILED TO ATTACH CUSTOMER ID');
    }
  }
}
