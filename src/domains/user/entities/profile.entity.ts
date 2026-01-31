import { ValidationException } from 'src/commons/exceptions/validation.exception';

export class ProfileEntity {
  private id: string;
  private userId: string;
  private nickname: string;
  private bio: string | null;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    userId,
    nickname,
    bio,
    createdAt,
    updatedAt,
  }: {
    id: string;
    userId: string;
    nickname: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.userId = userId;
    this.nickname = nickname;
    this.bio = bio;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public getBio(): string | null {
    return this.bio;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateNickname(nickname: string): void {
    this.validateNickname(nickname);
    this.nickname = nickname;
  }

  private validateNickname(nickname: string): void {
    if (!nickname || nickname.trim().length === 0) {
      throw new ValidationException('Nickname cannot be empty');
    }

    if (nickname.length < 2 || nickname.length > 20) {
      throw new ValidationException(
        'Nickname must be between 2 and 20 characters',
      );
    }

    if (!/^[a-zA-Z0-9]+$/.test(nickname)) {
      throw new ValidationException(
        'Nickname can only contain letters and numbers',
      );
    }
  }

  updateBio(bio: string): void {
    this.bio = bio;
  }
}
