import { DomainException } from './domain.exception';

export class InvalidCredentialsException extends DomainException {
  constructor(message: string = 'Invalid email or password') {
    super(message);
  }
}
