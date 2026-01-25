import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundException } from 'src/commons/exceptions/not-found.exception';
import { ValidationException } from 'src/commons/exceptions/validation.exception';
import type { IReviewRepository } from '../repositories/review-repository.interface';
import { ReviewResponseDto } from '../dto/review-response.dto';
import { ReviewEntity } from '../entities/review.entity';

@Injectable()
export class GetReviewUseCase {
  constructor(
    @Inject('IReviewRepository')
    private readonly reviewRepository: IReviewRepository,
  ) {}

  async execute(reviewId: string): Promise<ReviewResponseDto> {
    const review = await this.reviewRepository.findById(reviewId);
    if (!review) {
      throw new EntityNotFoundException('Review', reviewId);
    }

    // 삭제된 리뷰는 조회 불가
    if (review.isDeleted()) {
      throw new ValidationException('Review is deleted');
    }

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
