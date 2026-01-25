import { ReplyEntity } from '../entities/reply.entity';

export interface IReplyRepository {
  findById(id: string): Promise<ReplyEntity | null>;
  findByReviewId(reviewId: string): Promise<ReplyEntity[]>;
  findByParentReplyId(parentReplyId: string): Promise<ReplyEntity[]>;
  save(reply: ReplyEntity): Promise<void>;
  softDelete(id: string): Promise<void>;
}
