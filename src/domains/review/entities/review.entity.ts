import { ValidationException } from 'src/commons/exceptions/validation.exception';
import { AlbumEntity } from 'src/domains/album/entities/album.entity';
import {
  ReviewVisibility,
  ReviewVisibilityEnum,
} from '../vo/review-visibility.vo';

export class ReviewEntity {
  private id: string;
  private userId: string;
  private album: AlbumEntity;
  private title: string;
  private bodyText: string;
  private visibility: ReviewVisibility;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor({
    id,
    userId,
    album,
    title,
    bodyText,
    visibility,
    createdAt,
    updatedAt,
    deletedAt,
  }: {
    id: string;
    userId: string;
    album: AlbumEntity;
    title: string;
    bodyText: string;
    visibility: ReviewVisibility;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }) {
    this.id = id;
    this.userId = userId;
    this.album = album;
    this.title = title;
    this.bodyText = bodyText;
    this.visibility = visibility;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getAlbum(): AlbumEntity {
    return this.album;
  }

  public getTitle(): string {
    return this.title;
  }

  public getBodyText(): string {
    return this.bodyText;
  }

  public getVisibility(): ReviewVisibility {
    return this.visibility;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getDeletedAt(): Date | null {
    return this.deletedAt;
  }

  // Utility
  validateTitle(title: string): void {
    if (title.trim().length >= 50) {
      throw new ValidationException(
        'Review title should be less than 50 characters',
      );
    }
  }

  setTitle(title: string): void {
    if (this.isDeleted()) {
      throw new ValidationException('Review is deleted');
    }
    this.validateTitle(title);
    this.title = title;
  }

  validateBodyText(bodyText: string): void {
    if (bodyText.trim().length >= 1000) {
      throw new ValidationException(
        'Review text should be less than 1000 characters',
      );
    }
  }

  setBodyText(bodyText: string): void {
    if (this.isDeleted()) {
      throw new ValidationException('Review is deleted');
    }
    this.validateBodyText(bodyText);
    this.bodyText = bodyText;
  }

  isVisible(): boolean {
    if (this.isDeleted()) {
      return false;
    }

    return this.visibility.isPublic();
  }

  setInvisible(): void {
    if (this.isDeleted()) {
      throw new ValidationException('Review is deleted');
    }

    this.visibility = new ReviewVisibility(ReviewVisibilityEnum.PRIVATE);
  }

  setVisible(): void {
    if (this.isDeleted()) {
      throw new ValidationException('Review is deleted');
    }

    this.visibility = new ReviewVisibility(ReviewVisibilityEnum.PUBLIC);
  }

  setVisibility(visibility: ReviewVisibilityEnum): void {
    if (this.isDeleted()) {
      throw new ValidationException('Review is deleted');
    }

    this.visibility = new ReviewVisibility(visibility);
  }

  isDeleted(): boolean {
    return this.deletedAt !== null;
  }
}
