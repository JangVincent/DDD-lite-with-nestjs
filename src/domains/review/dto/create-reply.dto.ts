import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @IsNotEmpty()
  reviewId: string;

  @IsString()
  @IsOptional()
  parentReplyId?: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
