import { Injectable } from '@nestjs/common';
import { AlbumEntity } from 'src/domains/album/entities/album.entity';
import { ReviewEntity } from '../entities/review.entity';
import { IReviewRepository } from './review-repository.interface';
import { ReviewVisibility } from '../vo/review-visibility.vo';
import { PrismaService } from 'src/infra/persistence/prisma/prisma.service';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: string): Promise<ReviewEntity | null> {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: { album: true },
    });

    if (!review) {
      return null;
    }

    return this.toDomain(review);
  }

  public async findByUserId(userId: string): Promise<ReviewEntity[]> {
    const reviews = await this.prisma.review.findMany({
      where: { userId },
      include: { album: true },
    });

    return reviews.map((review) => this.toDomain(review));
  }

  public async findByAlbumId(albumId: string): Promise<ReviewEntity[]> {
    const reviews = await this.prisma.review.findMany({
      where: { albumId },
      include: { album: true },
    });

    return reviews.map((review) => this.toDomain(review));
  }

  public async save(review: ReviewEntity): Promise<void> {
    const data = this.toPersistence(review);

    await this.prisma.review.upsert({
      where: { id: review.getId() },
      create: data,
      update: data,
    });
  }

  public async softDelete(id: string): Promise<void> {
    await this.prisma.review.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private toDomain(prismaReview: any): ReviewEntity {
    const albumEntity = new AlbumEntity({
      id: prismaReview.album.id,
      title: prismaReview.album.title,
      description: prismaReview.album.description,
      publishedYear: prismaReview.album.publishedYear,
      genre: prismaReview.album.genre,
      coverImage: prismaReview.album.coverImage,
      musicianNames: JSON.parse(prismaReview.album.musicianNames) as string[],
      createdAt: prismaReview.album.createdAt,
      updatedAt: prismaReview.album.updatedAt,
    });

    return new ReviewEntity({
      id: prismaReview.id,
      userId: prismaReview.userId,
      album: albumEntity,
      title: prismaReview.title,
      bodyText: prismaReview.bodyText,
      visibility: ReviewVisibility.create(prismaReview.visibility),
      createdAt: prismaReview.createdAt,
      updatedAt: prismaReview.updatedAt,
      deletedAt: prismaReview.deletedAt,
    });
  }

  private toPersistence(entity: ReviewEntity) {
    return {
      id: entity.getId(),
      userId: entity.getUserId(),
      albumId: entity.getAlbum().getId(),
      title: entity.getTitle(),
      bodyText: entity.getBodyText(),
      visibility: entity.getVisibility().getValue(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
      deletedAt: entity.getDeletedAt(),
    };
  }
}
