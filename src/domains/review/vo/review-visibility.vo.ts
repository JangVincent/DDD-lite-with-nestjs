import { ValidationException } from 'src/commons/exceptions/validation.exception';

export enum ReviewVisibilityEnum {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export class ReviewVisibility {
  constructor(private value: ReviewVisibilityEnum) {}

  static create(value: string): ReviewVisibility {
    if (
      !Object.values(ReviewVisibilityEnum).includes(
        value as ReviewVisibilityEnum,
      )
    ) {
      throw new ValidationException(`Invalid status: ${value}`);
    }
    return new ReviewVisibility(value as ReviewVisibilityEnum);
  }

  isPublic(): boolean {
    return this.value === ReviewVisibilityEnum.PUBLIC;
  }

  getValue(): ReviewVisibilityEnum {
    return this.value;
  }
}
