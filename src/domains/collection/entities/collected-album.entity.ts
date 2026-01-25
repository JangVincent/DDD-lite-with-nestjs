import { ValidationException } from 'src/commons/exceptions/validation.exception';

export class CollectedAlbumEntity {
  private id: string;
  private collectionId: string;
  private albumId: string;
  private memo: string | null;
  private isTopPick: boolean;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    collectionId,
    albumId,
    memo,
    isTopPick,
    createdAt,
    updatedAt,
  }: {
    id: string;
    collectionId: string;
    albumId: string;
    memo: string | null;
    isTopPick: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.collectionId = collectionId;
    this.albumId = albumId;
    this.memo = memo;
    this.isTopPick = isTopPick;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getCollectionId(): string {
    return this.collectionId;
  }

  public getAlbumId(): string {
    return this.albumId;
  }

  public getMemo(): string | null {
    return this.memo;
  }

  public getIsTopPick(): boolean {
    return this.isTopPick;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public validateMemo(memo: string): void {
    if (memo.trim().length > 100) {
      throw new ValidationException('memo cannot be over 100 characters');
    }
  }

  public updateMemo(memo: string): void {
    this.validateMemo(memo);
    this.memo = memo;
  }

  public markAsTopPick(): void {
    this.isTopPick = true;
  }

  public unmarkAsTopPick(): void {
    this.isTopPick = false;
  }
}
