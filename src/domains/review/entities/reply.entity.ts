export class ReplyEntity {
  private id: string;
  private reviewId: string;
  private parentReplyId: string | null;
  private userId: string;
  private text: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor({
    id,
    reviewId,
    parentReplyId,
    userId,
    text,
    createdAt,
    updatedAt,
    deletedAt,
  }: {
    id: string;
    reviewId: string;
    parentReplyId: string | null;
    userId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }) {
    this.id = id;
    this.reviewId = reviewId;
    this.parentReplyId = parentReplyId;
    this.userId = userId;
    this.text = text;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getReviewId(): string {
    return this.reviewId;
  }

  public getParentReplyId(): string | null {
    return this.parentReplyId;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getText(): string {
    return this.text;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getDeletedAt(): Date | null {
    return this.deletedAt;
  }

  isDeleted(): boolean {
    return this.deletedAt !== null;
  }
}
