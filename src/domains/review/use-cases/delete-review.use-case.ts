import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundException } from 'src/commons/exceptions/not-found.exception';
import { UnauthorizedException } from 'src/commons/exceptions/unauthorized.exception';
import { ValidationException } from 'src/commons/exceptions/validation.exception';
import type { IReviewRepository } from '../repositories/review-repository.interface';

@Injectable()
export class DeleteReviewUseCase {
  constructor(
    @Inject('IReviewRepository')
    private readonly reviewRepository: IReviewRepository,
  ) {}

  async execute(reviewId: string, userId: string): Promise<void> {
    // 리뷰 조회
    const review = await this.reviewRepository.findById(reviewId);
    if (!review) {
      throw new EntityNotFoundException('Review', reviewId);
    }

    // 권한 확인
    if (review.getUserId() !== userId) {
      throw new UnauthorizedException('You are not authorized to delete this review');
    }

    // 이미 삭제된 리뷰 확인
    if (review.isDeleted()) {
      throw new ValidationException('Review is already deleted');
    }

    // Soft Delete
    await this.reviewRepository.softDelete(reviewId);
  }
}
