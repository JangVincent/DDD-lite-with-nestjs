import { ReviewVisibilityEnum } from '../vo/review-visibility.vo';

export class AlbumResponseDto {
  id: string;
  title: string;
  description: string | null;
  publishedYear: number;
  genre: string;
  coverImage: string | null;
  musicianNames: string[];
}

export class ReviewResponseDto {
  id: string;
  userId: string;
  album: AlbumResponseDto;
  title: string;
  bodyText: string;
  visibility: ReviewVisibilityEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
