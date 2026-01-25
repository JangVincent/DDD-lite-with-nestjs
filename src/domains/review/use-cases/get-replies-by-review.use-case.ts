import { Inject, Injectable } from '@nestjs/common';
import type { IReplyRepository } from '../repositories/reply-repository.interface';
import { ReplyResponseDto } from '../dto/reply-response.dto';
import { ReplyEntity } from '../entities/reply.entity';

@Injectable()
export class GetRepliesByReviewUseCase {
  constructor(
    @Inject('IReplyRepository')
    private readonly replyRepository: IReplyRepository,
  ) {}

  async execute(reviewId: string): Promise<ReplyResponseDto[]> {
    // 리뷰의 최상위 댓글만 조회 (parentReplyId가 null인 것들)
    const replies = await this.replyRepository.findByReviewId(reviewId);

    // 삭제되지 않은 댓글만 반환
    return replies
      .filter((reply) => !reply.isDeleted())
      .map((reply) => this.toResponseDto(reply));
  }

  private toResponseDto(reply: ReplyEntity): ReplyResponseDto {
    return {
      id: reply.getId(),
      reviewId: reply.getReviewId(),
      parentReplyId: reply.getParentReplyId(),
      userId: reply.getUserId(),
      text: reply.getText(),
      createdAt: reply.getCreatedAt(),
      updatedAt: reply.getUpdatedAt(),
      deletedAt: reply.getDeletedAt(),
    };
  }
}
