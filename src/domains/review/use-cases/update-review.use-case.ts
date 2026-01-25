import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundException } from 'src/commons/exceptions/not-found.exception';
import { UnauthorizedException } from 'src/commons/exceptions/unauthorized.exception';
import { ValidationException } from 'src/commons/exceptions/validation.exception';
import type { IReviewRepository } from '../repositories/review-repository.interface';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewResponseDto } from '../dto/review-response.dto';
import { ReviewEntity } from '../entities/review.entity';

@Injectable()
export class UpdateReviewUseCase {
  constructor(
    @Inject('IReviewRepository')
    private readonly reviewRepository: IReviewRepository,
  ) {}

  async execute(
    reviewId: string,
    userId: string,
    dto: UpdateReviewDto,
  ): Promise<ReviewResponseDto> {
    // 리뷰 조회
    const review = await this.reviewRepository.findById(reviewId);
    if (!review) {
      throw new EntityNotFoundException('Review', reviewId);
    }

    // 권한 확인
    if (review.getUserId() !== userId) {
      throw new UnauthorizedException('You are not authorized to update this review');
    }

    // 삭제된 리뷰 확인
    if (review.isDeleted()) {
      throw new ValidationException('Review is deleted');
    }

    // 업데이트
    if (dto.title !== undefined) {
      review.setTitle(dto.title);
    }
    if (dto.bodyText !== undefined) {
      review.setBodyText(dto.bodyText);
    }
    if (dto.visibility !== undefined) {
      review.setVisibility(dto.visibility);
    }

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
