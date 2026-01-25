import { AlbumEntity } from './album.entity';

export class MusicianEntity {
  private id: string;
  private name: string;
  private bio: string | null;
  private birthYear: number | null;
  private deathYear: number | null;
  private image: string | null;
  private publishedAlbums: AlbumEntity[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    name,
    bio,
    birthYear,
    deathYear,
    image,
    publishedAlbums,
    createdAt,
    updatedAt,
  }: {
    id: string;
    name: string;
    bio: string | null;
    birthYear: number | null;
    deathYear: number | null;
    image: string | null;
    publishedAlbums: AlbumEntity[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.bio = bio;
    this.birthYear = birthYear;
    this.deathYear = deathYear;
    this.image = image;
    this.publishedAlbums = publishedAlbums;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getBio(): string | null {
    return this.bio;
  }

  public getBirthYear(): number | null {
    return this.birthYear;
  }

  public getDeathYear(): number | null {
    return this.deathYear;
  }

  public getImage(): string | null {
    return this.image;
  }

  public getPublishedAlbums(): AlbumEntity[] {
    return this.publishedAlbums;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
