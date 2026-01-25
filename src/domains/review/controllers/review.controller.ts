import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewResponseDto } from '../dto/review-response.dto';
import { CreateReviewUseCase } from '../use-cases/create-review.use-case';
import { UpdateReviewUseCase } from '../use-cases/update-review.use-case';
import { DeleteReviewUseCase } from '../use-cases/delete-review.use-case';
import { GetReviewUseCase } from '../use-cases/get-review.use-case';
import { GetReviewsByUserUseCase } from '../use-cases/get-reviews-by-user.use-case';
import { GetReviewsByAlbumUseCase } from '../use-cases/get-reviews-by-album.use-case';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly createReviewUseCase: CreateReviewUseCase,
    private readonly updateReviewUseCase: UpdateReviewUseCase,
    private readonly deleteReviewUseCase: DeleteReviewUseCase,
    private readonly getReviewUseCase: GetReviewUseCase,
    private readonly getReviewsByUserUseCase: GetReviewsByUserUseCase,
    private readonly getReviewsByAlbumUseCase: GetReviewsByAlbumUseCase,
  ) {}

  @Post()
  // @UseGuards(AuthGuard) // TODO: 인증 가드 추가 필요
  async createReview(
    @Request() req: any, // TODO: Request 타입 정의 필요
    @Body() dto: CreateReviewDto,
  ): Promise<ReviewResponseDto> {
    const userId = req.user?.id; // TODO: AuthGuard에서 user 정보 설정
    return this.createReviewUseCase.execute(userId, dto);
  }

  @Get(':id')
  async getReview(@Param('id') id: string): Promise<ReviewResponseDto> {
    return this.getReviewUseCase.execute(id);
  }

  @Get('user/:userId')
  async getReviewsByUser(
    @Param('userId') userId: string,
  ): Promise<ReviewResponseDto[]> {
    return this.getReviewsByUserUseCase.execute(userId);
  }

  @Get('album/:albumId')
  async getReviewsByAlbum(
    @Param('albumId') albumId: string,
  ): Promise<ReviewResponseDto[]> {
    return this.getReviewsByAlbumUseCase.execute(albumId);
  }

  @Put(':id')
  // @UseGuards(AuthGuard) // TODO: 인증 가드 추가 필요
  async updateReview(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateReviewDto,
  ): Promise<ReviewResponseDto> {
    const userId = req.user?.id;
    return this.updateReviewUseCase.execute(id, userId, dto);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard) // TODO: 인증 가드 추가 필요
  async deleteReview(
    @Request() req: any,
    @Param('id') id: string,
  ): Promise<void> {
    const userId = req.user?.id;
    return this.deleteReviewUseCase.execute(id, userId);
  }
}
