export class UserEntity {
  private id: string;
  private email: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    email,
    createdAt,
    updatedAt,
  }: {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
