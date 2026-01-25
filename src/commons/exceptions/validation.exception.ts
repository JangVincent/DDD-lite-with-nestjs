import { DomainException } from './domain.exception';

export class ValidationException extends DomainException {
  public readonly details?: Record<string, string[]>;

  constructor(message: string, details?: Record<string, string[]>) {
    super(message);
    this.details = details;
  }
}
