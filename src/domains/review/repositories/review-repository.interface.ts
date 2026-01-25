import { ReviewEntity } from '../entities/review.entity';

export interface IReviewRepository {
  findById(id: string): Promise<ReviewEntity | null>;
  findByUserId(userId: string): Promise<ReviewEntity[]>;
  findByAlbumId(albumId: string): Promise<ReviewEntity[]>;
  save(review: ReviewEntity): Promise<void>;
  softDelete(id: string): Promise<void>;
}
