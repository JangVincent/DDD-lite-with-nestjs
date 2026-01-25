import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { ReviewVisibilityEnum } from '../vo/review-visibility.vo';

export class UpdateReviewDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  title?: string;

  @IsString()
  @IsOptional()
  bodyText?: string;

  @IsEnum(ReviewVisibilityEnum)
  @IsOptional()
  visibility?: ReviewVisibilityEnum;
}
