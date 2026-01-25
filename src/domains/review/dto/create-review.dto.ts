import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ReviewVisibilityEnum } from '../vo/review-visibility.vo';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  albumId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  bodyText: string;

  @IsEnum(ReviewVisibilityEnum)
  visibility: ReviewVisibilityEnum;
}
