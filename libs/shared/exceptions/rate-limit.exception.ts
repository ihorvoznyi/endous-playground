import { HttpException, HttpStatus } from '@nestjs/common';

export class RateLimitException extends HttpException {
  static readonly message = 'Too many requests, please try again later';

  constructor(message = RateLimitException.message) {
    super(message, HttpStatus.TOO_MANY_REQUESTS);
  }
}
