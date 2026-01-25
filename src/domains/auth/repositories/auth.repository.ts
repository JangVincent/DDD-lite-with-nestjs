import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/persistence/prisma/prisma.service';
import { AuthEntity } from '../entities/auth.entity';
import { AuthStatus } from '../vo/auth-status.vo';
import { IAuthRepository } from './auth-repository.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findByUserId(userId: string): Promise<AuthEntity | null> {
    const row = await this.prisma.auth.findUnique({
      where: { userId },
    });

    if (!row) {
      return null;
    }

    return this.toDomain(row);
  }

  public async save(entity: AuthEntity): Promise<void> {
    await this.prisma.auth.upsert({
      where: {
        userId: entity.getUserId(),
      },
      create: this.toPersistence(entity),
      update: this.toPersistence(entity),
    });
  }

  private toDomain(row: any): AuthEntity {
    return new AuthEntity({
      userId: row.userId,
      hashedPassword: row.hashedPassword,
      status: AuthStatus.create(row.status),
      loginFailedCount: row.loginFailedCount,
    });
  }

  private toPersistence(entity: AuthEntity) {
    return {
      userId: entity.getUserId(),
      hashedPassword: entity.getHashedPassword(),
      status: entity.getStatus().getValue(),
      loginFailedCount: entity.getLoginFailedCount(),
    };
  }
}
