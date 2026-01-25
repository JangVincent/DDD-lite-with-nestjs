import { DomainException } from './domain.exception';

export class EntityNotFoundException extends DomainException {
  constructor(entityName: string, id?: string) {
    super(
      id
        ? `${entityName} with id ${id} not found`
        : `${entityName} not found`,
    );
  }
}
