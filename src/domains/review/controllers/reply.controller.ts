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
import { CreateReplyDto } from '../dto/create-reply.dto';
import { UpdateReplyDto } from '../dto/update-reply.dto';
import { ReplyResponseDto } from '../dto/reply-response.dto';
import { CreateReplyUseCase } from '../use-cases/create-reply.use-case';
import { UpdateReplyUseCase } from '../use-cases/update-reply.use-case';
import { DeleteReplyUseCase } from '../use-cases/delete-reply.use-case';
import { GetRepliesByReviewUseCase } from '../use-cases/get-replies-by-review.use-case';
import { GetRepliesByParentUseCase } from '../use-cases/get-replies-by-parent.use-case';

@Controller('replies')
export class ReplyController {
  constructor(
    private readonly createReplyUseCase: CreateReplyUseCase,
    private readonly updateReplyUseCase: UpdateReplyUseCase,
    private readonly deleteReplyUseCase: DeleteReplyUseCase,
    private readonly getRepliesByReviewUseCase: GetRepliesByReviewUseCase,
    private readonly getRepliesByParentUseCase: GetRepliesByParentUseCase,
  ) {}

  @Post()
  // @UseGuards(AuthGuard) // TODO: 인증 가드 추가 필요
  async createReply(
    @Request() req: any, // TODO: Request 타입 정의 필요
    @Body() dto: CreateReplyDto,
  ): Promise<ReplyResponseDto> {
    const userId = req.user?.id; // TODO: AuthGuard에서 user 정보 설정
    return this.createReplyUseCase.execute(userId, dto);
  }

  @Get('review/:reviewId')
  async getRepliesByReview(
    @Param('reviewId') reviewId: string,
  ): Promise<ReplyResponseDto[]> {
    return this.getRepliesByReviewUseCase.execute(reviewId);
  }

  @Get('parent/:parentReplyId')
  async getRepliesByParent(
    @Param('parentReplyId') parentReplyId: string,
  ): Promise<ReplyResponseDto[]> {
    return this.getRepliesByParentUseCase.execute(parentReplyId);
  }

  @Put(':id')
  // @UseGuards(AuthGuard) // TODO: 인증 가드 추가 필요
  async updateReply(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateReplyDto,
  ): Promise<ReplyResponseDto> {
    const userId = req.user?.id;
    return this.updateReplyUseCase.execute(id, userId, dto);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard) // TODO: 인증 가드 추가 필요
  async deleteReply(
    @Request() req: any,
    @Param('id') id: string,
  ): Promise<void> {
    const userId = req.user?.id;
    return this.deleteReplyUseCase.execute(id, userId);
  }
}
