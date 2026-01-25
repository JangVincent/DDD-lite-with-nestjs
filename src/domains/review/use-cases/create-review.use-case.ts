import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EntityNotFoundException } from 'src/commons/exceptions/not-found.exception';
import { AlbumEntity } from 'src/domains/album/entities/album.entity';
import { ReviewEntity } from '../entities/review.entity';
import type { IReviewRepository } from '../repositories/review-repository.interface';
import { ReviewVisibility } from '../vo/review-visibility.vo';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ReviewResponseDto } from '../dto/review-response.dto';

@Injectable()
export class CreateReviewUseCase {
  constructor(
    @Inject('IReviewRepository')
    private readonly reviewRepository: IReviewRepository,
    @Inject('IAlbumRepository')
    private readonly albumRepository: any, // TODO: Album Repository 인터페이스 필요
  ) {}

  async execute(
    userId: string,
    dto: CreateReviewDto,
  ): Promise<ReviewResponseDto> {
    // 앨범 존재 여부 확인
    const album = await this.albumRepository.findById(dto.albumId);
    if (!album) {
      throw new EntityNotFoundException('Album', dto.albumId);
    }

    // 리뷰 엔티티 생성
    const review = new ReviewEntity({
      id: randomUUID(),
      userId,
      album,
      title: dto.title,
      bodyText: dto.bodyText,
      visibility: ReviewVisibility.create(dto.visibility),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    // 저장
    await this.reviewRepository.save(review);

    return this.toResponseDto(review);
  }

  private toResponseDto(review: ReviewEntity): ReviewResponseDto {
    const album = review.getAlbum();
    return {
      id: review.getId(),
      userId: review.getUserId(),
      album: {
        id: album.getId(),
        title: album.getTitle(),
        description: album.getDescription(),
        publishedYear: album.getPublishedYear(),
        genre: album.getGenre(),
        coverImage: album.getCoverImage(),
        musicianNames: album.getMusicianNames(),
      },
      title: review.getTitle(),
      bodyText: review.getBodyText(),
      visibility: review.getVisibility().getValue(),
      createdAt: review.getCreatedAt(),
      updatedAt: review.getUpdatedAt(),
      deletedAt: review.getDeletedAt(),
    };
  }
}
