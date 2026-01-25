import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/persistence/prisma/prisma.service';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from './user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  async save(user: UserEntity): Promise<void> {
    const data = this.toPersistence(user);

    await this.prisma.user.upsert({
      where: { id: user.getId() },
      create: data,
      update: data,
    });
  }

  private toDomain(prismaUser: any): UserEntity {
    return new UserEntity({
      id: prismaUser.id,
      email: prismaUser.email,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    });
  }

  private toPersistence(entity: UserEntity) {
    return {
      id: entity.getId(),
      email: entity.getEmail(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    };
  }
}
