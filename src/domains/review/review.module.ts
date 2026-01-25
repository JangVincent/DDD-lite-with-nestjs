import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/persistence/prisma/prisma.module';
import { ReviewRepository } from './repositories/review.repository';
import { ReplyRepository } from './repositories/reply.repository';
import { ReviewController } from './controllers/review.controller';
import { ReplyController } from './controllers/reply.controller';
import { CreateReviewUseCase } from './use-cases/create-review.use-case';
import { UpdateReviewUseCase } from './use-cases/update-review.use-case';
import { DeleteReviewUseCase } from './use-cases/delete-review.use-case';
import { GetReviewUseCase } from './use-cases/get-review.use-case';
import { GetReviewsByUserUseCase } from './use-cases/get-reviews-by-user.use-case';
import { GetReviewsByAlbumUseCase } from './use-cases/get-reviews-by-album.use-case';
import { CreateReplyUseCase } from './use-cases/create-reply.use-case';
import { UpdateReplyUseCase } from './use-cases/update-reply.use-case';
import { DeleteReplyUseCase } from './use-cases/delete-reply.use-case';
import { GetRepliesByReviewUseCase } from './use-cases/get-replies-by-review.use-case';
import { GetRepliesByParentUseCase } from './use-cases/get-replies-by-parent.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewController, ReplyController],
  providers: [
    // Repository implementations
    {
      provide: 'IReviewRepository',
      useClass: ReviewRepository,
    },
    {
      provide: 'IReplyRepository',
      useClass: ReplyRepository,
    },
    // TODO: Album Repository 추가 필요
    {
      provide: 'IAlbumRepository',
      useValue: null, // 임시로 null, 나중에 AlbumRepository 구현 후 교체
    },
    // Review UseCases
    CreateReviewUseCase,
    UpdateReviewUseCase,
    DeleteReviewUseCase,
    GetReviewUseCase,
    GetReviewsByUserUseCase,
    GetReviewsByAlbumUseCase,
    // Reply UseCases
    CreateReplyUseCase,
    UpdateReplyUseCase,
    DeleteReplyUseCase,
    GetRepliesByReviewUseCase,
    GetRepliesByParentUseCase,
  ],
  exports: [
    'IReviewRepository',
    'IReplyRepository',
    CreateReviewUseCase,
    UpdateReviewUseCase,
    DeleteReviewUseCase,
    GetReviewUseCase,
    GetReviewsByUserUseCase,
    GetReviewsByAlbumUseCase,
    CreateReplyUseCase,
    UpdateReplyUseCase,
    DeleteReplyUseCase,
    GetRepliesByReviewUseCase,
    GetRepliesByParentUseCase,
  ],
})
export class ReviewModule {}
