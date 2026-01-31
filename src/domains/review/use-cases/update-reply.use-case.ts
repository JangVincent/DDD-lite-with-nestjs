import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundException } from 'src/commons/exceptions/not-found.exception';
import { UnauthorizedException } from 'src/commons/exceptions/unauthorized.exception';
import { ValidationException } from 'src/commons/exceptions/validation.exception';
import type { IReplyRepository } from '../repositories/reply-repository.interface';
import { UpdateReplyDto } from '../dto/update-reply.dto';
import { ReplyResponseDto } from '../dto/reply-response.dto';
import { ReplyEntity } from '../entities/reply.entity';

@Injectable()
export class UpdateReplyUseCase {
  constructor(
    @Inject('IReplyRepository')
    private readonly replyRepository: IReplyRepository,
  ) {}

  async execute(
    replyId: string,
    userId: string,
    dto: UpdateReplyDto,
  ): Promise<ReplyResponseDto> {
    // 댓글 조회
    const reply = await this.replyRepository.findById(replyId);
    if (!reply) {
      throw new EntityNotFoundException('Reply', replyId);
    }

    // 권한 확인
    if (reply.getUserId() !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this reply',
      );
    }

    // 삭제된 댓글 확인
    if (reply.isDeleted()) {
      throw new ValidationException('Reply is deleted');
    }

    // 댓글 내용 업데이트 (ReplyEntity에 setter가 없으므로 새 엔티티 생성)
    const updatedReply = new ReplyEntity({
      id: reply.getId(),
      reviewId: reply.getReviewId(),
      parentReplyId: reply.getParentReplyId(),
      userId: reply.getUserId(),
      text: dto.text,
      createdAt: reply.getCreatedAt(),
      updatedAt: new Date(),
      deletedAt: reply.getDeletedAt(),
    });

    // 저장
    await this.replyRepository.save(updatedReply);

    return this.toResponseDto(updatedReply);
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
