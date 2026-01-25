import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/persistence/prisma/prisma.service';
import { ProfileEntity } from '../entities/profile.entity';
import { IProfileRepository } from './profile-repository.interface';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ProfileEntity | null> {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
    });

    if (!profile) {
      return null;
    }

    return this.toDomain(profile);
  }

  async findByUserId(userId: string): Promise<ProfileEntity | null> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return null;
    }

    return this.toDomain(profile);
  }

  async save(profile: ProfileEntity): Promise<void> {
    const data = this.toPersistence(profile);

    await this.prisma.profile.upsert({
      where: { id: profile.getId() },
      create: data,
      update: data,
    });
  }

  private toDomain(prismaProfile: any): ProfileEntity {
    return new ProfileEntity({
      id: prismaProfile.id,
      userId: prismaProfile.userId,
      nickname: prismaProfile.nickname,
      bio: prismaProfile.bio,
      createdAt: prismaProfile.createdAt,
      updatedAt: prismaProfile.updatedAt,
    });
  }

  private toPersistence(entity: ProfileEntity) {
    return {
      id: entity.getId(),
      userId: entity.getUserId(),
      nickname: entity.getNickname(),
      bio: entity.getBio(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    };
  }
}
