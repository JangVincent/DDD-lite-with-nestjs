import { Inject, Injectable } from '@nestjs/common';
import type { IReviewRepository } from '../repositories/review-repository.interface';
import { ReviewResponseDto } from '../dto/review-response.dto';
import { ReviewEntity } from '../entities/review.entity';

@Injectable()
export class GetReviewsByAlbumUseCase {
  constructor(
    @Inject('IReviewRepository')
    private readonly reviewRepository: IReviewRepository,
  ) {}

  async execute(albumId: string): Promise<ReviewResponseDto[]> {
    const reviews = await this.reviewRepository.findByAlbumId(albumId);

    // 삭제되지 않고 PUBLIC인 리뷰만 반환
    return reviews
      .filter((review) => !review.isDeleted() && review.getVisibility().isPublic())
      .map((review) => this.toResponseDto(review));
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
