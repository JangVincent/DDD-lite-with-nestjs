import { ValidationException } from 'src/commons/exceptions/validation.exception';
import { CollectedAlbumEntity } from './collected-album.entity';

export class CollectionEntity {
  private id: string;
  private userId: string;
  private collectedAlbums: CollectedAlbumEntity[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    userId,
    collectedAlbums,
    createdAt,
    updatedAt,
  }: {
    id: string;
    userId: string;
    collectedAlbums: CollectedAlbumEntity[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.userId = userId;
    this.collectedAlbums = collectedAlbums;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getCollectedAlbums(): CollectedAlbumEntity[] {
    return this.collectedAlbums;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getTopPickAlbums() {
    return this.collectedAlbums.filter((ca) => ca.getIsTopPick() === true);
  }

  public canAddTopPick() {
    const topPickCount = this.collectedAlbums.filter(
      (ca) => ca.getIsTopPick() === true,
    ).length;
    if (topPickCount >= 5) {
      throw new ValidationException('Top-pick albums should be less than 5');
    }
  }

  public addAlbum(collectedAlbum: CollectedAlbumEntity) {
    this.collectedAlbums.push(collectedAlbum);
  }

  public removeAlbum(albumId: string) {
    this.collectedAlbums = this.collectedAlbums.filter(
      (ca) => ca.getAlbumId() !== albumId,
    );
  }
}
