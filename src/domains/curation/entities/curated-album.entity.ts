export class CuratedAlbumEntity {
  private id: string;
  private curationId: string;
  private albumId: string;
  private description: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    curationId,
    albumId,
    description,
    createdAt,
    updatedAt,
  }: {
    id: string;
    curationId: string;
    albumId: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.curationId = curationId;
    this.albumId = albumId;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getCurationId(): string {
    return this.curationId;
  }

  public getAlbumId(): string {
    return this.albumId;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
