export class ReplyResponseDto {
  id: string;
  reviewId: string;
  parentReplyId: string | null;
  userId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
