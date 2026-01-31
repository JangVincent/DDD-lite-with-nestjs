import { Inject, Injectable } from '@nestjs/common';
import type { IReplyRepository } from '../repositories/reply-repository.interface';
import { ReplyResponseDto } from '../dto/reply-response.dto';
import { ReplyEntity } from '../entities/reply.entity';

@Injectable()
export class GetRepliesByParentUseCase {
  constructor(
    @Inject('IReplyRepository')
    private readonly replyRepository: IReplyRepository,
  ) {}

  async execute(parentReplyId: string): Promise<ReplyResponseDto[]> {
    // 특정 댓글의 대댓글들 조회
    const replies =
      await this.replyRepository.findByParentReplyId(parentReplyId);

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
