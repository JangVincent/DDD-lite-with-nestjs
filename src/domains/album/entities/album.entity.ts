import { ValidationException } from 'src/commons/exceptions/validation.exception';

export class AlbumEntity {
  private id: string;
  private title: string;
  private description: string | null;
  private publishedYear: number;
  private genre: string;
  private coverImage: string | null;
  private musicianNames: string[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    title,
    publishedYear,
    genre,
    description,
    coverImage,
    musicianNames,
    createdAt,
    updatedAt,
  }: {
    id: string;
    title: string;
    publishedYear: number;
    genre: string;
    description: string | null;
    coverImage: string | null;
    musicianNames: string[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.title = title;
    this.publishedYear = publishedYear;
    this.genre = genre;
    this.description = description;
    this.coverImage = coverImage;

    if (musicianNames.length === 0) {
      throw new ValidationException('Album musician cannot be empty');
    }
    this.musicianNames = musicianNames;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getPublishedYear(): number {
    return this.publishedYear;
  }
  public getGenre(): string {
    return this.genre;
  }
  public getDescription(): string | null {
    return this.description;
  }
  public getCoverImage(): string | null {
    return this.coverImage;
  }
  public getMusicianNames(): string[] {
    return this.musicianNames;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
