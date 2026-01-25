import { CurationStatus } from '../vo/curation-status.vo';
import { CuratedAlbumEntity } from './curated-album.entity';

export class CurationEntity {
  private id: string;
  private title: string;
  private description: string;
  private thumbnail: string;
  private status: CurationStatus;
  private curatedAlbums: CuratedAlbumEntity[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    title,
    description,
    thumbnail,
    status,
    curatedAlbums,
    createdAt,
    updatedAt,
  }: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    status: CurationStatus;
    curatedAlbums: CuratedAlbumEntity[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.status = status;
    this.curatedAlbums = curatedAlbums;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getThumbnail(): string {
    return this.thumbnail;
  }

  public getStatus(): CurationStatus {
    return this.status;
  }

  public getCuratedAlbums(): CuratedAlbumEntity[] {
    return this.curatedAlbums;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public isActive(): boolean {
    return this.status.isActive();
  }
}
