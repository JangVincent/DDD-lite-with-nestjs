import { ValidationException } from 'src/commons/exceptions/validation.exception';

export enum AuthStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class AuthStatus {
  constructor(private value: AuthStatusEnum) {}

  static create(value: string): AuthStatus {
    if (!Object.values(AuthStatusEnum).includes(value as AuthStatusEnum)) {
      throw new ValidationException(`Invalid status: ${value}`);
    }
    return new AuthStatus(value as AuthStatusEnum);
  }

  isActive(): boolean {
    return this.value === AuthStatusEnum.ACTIVE;
  }

  getValue(): AuthStatusEnum {
    return this.value;
  }
}
