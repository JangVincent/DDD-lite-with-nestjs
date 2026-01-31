import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundException } from 'src/commons/exceptions/not-found.exception';
import { UnauthorizedException } from 'src/commons/exceptions/unauthorized.exception';
import { ValidationException } from 'src/commons/exceptions/validation.exception';
import type { IReplyRepository } from '../repositories/reply-repository.interface';
import { ReplyEntity } from '../entities/reply.entity';

@Injectable()
export class DeleteReplyUseCase {
  constructor(
    @Inject('IReplyRepository')
    private readonly replyRepository: IReplyRepository,
  ) {}

  async execute(replyId: string, userId: string): Promise<void> {
    // 댓글 조회
    const reply: ReplyEntity | null =
      await this.replyRepository.findById(replyId);
    if (!reply) {
      throw new EntityNotFoundException('Reply', replyId);
    }

    // 권한 확인
    if (reply.getUserId() !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this reply',
      );
    }

    // 이미 삭제된 댓글 확인
    if (reply.isDeleted()) {
      throw new ValidationException('Reply is already deleted');
    }

    // Soft Delete
    await this.replyRepository.softDelete(replyId);
  }
}
