import { ValidationException } from 'src/commons/exceptions/validation.exception';

export enum CurationStatusEnum {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
}

export class CurationStatus {
  constructor(private value: CurationStatusEnum) {}

  static create(value: string): CurationStatus {
    if (
      !Object.values(CurationStatusEnum).includes(value as CurationStatusEnum)
    ) {
      throw new ValidationException(`Invalid status: ${value}`);
    }
    return new CurationStatus(value as CurationStatusEnum);
  }

  isActive(): boolean {
    return this.value === CurationStatusEnum.ACTIVE;
  }

  getValue(): CurationStatusEnum {
    return this.value;
  }
}
