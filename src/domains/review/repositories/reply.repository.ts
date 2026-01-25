import { Injectable } from '@nestjs/common';
import { ReplyEntity } from '../entities/reply.entity';
import { IReplyRepository } from './reply-repository.interface';
import { PrismaService } from 'src/infra/persistence/prisma/prisma.service';

@Injectable()
export class ReplyRepository implements IReplyRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: string): Promise<ReplyEntity | null> {
    const reply = await this.prisma.reply.findUnique({
      where: { id },
    });

    if (!reply) {
      return null;
    }

    return this.toDomain(reply);
  }

  public async findByReviewId(reviewId: string): Promise<ReplyEntity[]> {
    const replies = await this.prisma.reply.findMany({
      where: {
        reviewId,
        parentReplyId: null,
      },
    });

    return replies.map((r) => this.toDomain(r));
  }

  public async findByParentReplyId(
    parentReplyId: string,
  ): Promise<ReplyEntity[]> {
    const replies = await this.prisma.reply.findMany({
      where: { parentReplyId },
    });

    return replies.map((r) => this.toDomain(r));
  }

  public async save(reply: ReplyEntity): Promise<void> {
    const data = this.toPersistence(reply);

    await this.prisma.reply.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  }

  public async softDelete(id: string): Promise<void> {
    await this.prisma.reply.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private toDomain(prismaReply: any): ReplyEntity {
    return new ReplyEntity({
      id: prismaReply.id,
      reviewId: prismaReply.reviewId,
      parentReplyId: prismaReply.parentReplyId,
      userId: prismaReply.userId,
      text: prismaReply.text,
      createdAt: prismaReply.createdAt,
      updatedAt: prismaReply.updatedAt,
      deletedAt: prismaReply.deletedAt,
    });
  }

  private toPersistence(entity: ReplyEntity) {
    return {
      id: entity.getId(),
      reviewId: entity.getReviewId(),
      userId: entity.getUserId(),
      parentReplyId: entity.getParentReplyId(),
      text: entity.getText(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
      deletedAt: entity.getDeletedAt(),
    };
  }
}
