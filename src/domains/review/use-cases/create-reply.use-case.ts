import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EntityNotFoundException } from 'src/commons/exceptions/not-found.exception';
import { ValidationException } from 'src/commons/exceptions/validation.exception';
import { ReplyEntity } from '../entities/reply.entity';
import type { IReplyRepository } from '../repositories/reply-repository.interface';
import type { IReviewRepository } from '../repositories/review-repository.interface';
import { CreateReplyDto } from '../dto/create-reply.dto';
import { ReplyResponseDto } from '../dto/reply-response.dto';

@Injectable()
export class CreateReplyUseCase {
  constructor(
    @Inject('IReplyRepository')
    private readonly replyRepository: IReplyRepository,
    @Inject('IReviewRepository')
    private readonly reviewRepository: IReviewRepository,
  ) {}

  async execute(
    userId: string,
    dto: CreateReplyDto,
  ): Promise<ReplyResponseDto> {
    // 리뷰 존재 확인
    const review = await this.reviewRepository.findById(dto.reviewId);
    if (!review) {
      throw new EntityNotFoundException('Review', dto.reviewId);
    }

    // 삭제된 리뷰에는 댓글 작성 불가
    if (review.isDeleted()) {
      throw new ValidationException('Cannot reply to deleted review');
    }

    // 부모 댓글이 있는 경우 확인 (2-level 댓글 시스템)
    if (dto.parentReplyId) {
      const parentReply = await this.replyRepository.findById(dto.parentReplyId);
      if (!parentReply) {
        throw new EntityNotFoundException('Parent reply', dto.parentReplyId);
      }

      // 삭제된 댓글에는 대댓글 작성 불가
      if (parentReply.isDeleted()) {
        throw new ValidationException('Cannot reply to deleted reply');
      }

      // 2-level 제한: 부모 댓글이 이미 대댓글이면 안됨
      if (parentReply.getParentReplyId() !== null) {
        throw new ValidationException('Only 2-level replies are allowed');
      }
    }

    // 댓글 엔티티 생성
    const reply = new ReplyEntity({
      id: randomUUID(),
      reviewId: dto.reviewId,
      parentReplyId: dto.parentReplyId || null,
      userId,
      text: dto.text,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    // 저장
    await this.replyRepository.save(reply);

    return this.toResponseDto(reply);
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
