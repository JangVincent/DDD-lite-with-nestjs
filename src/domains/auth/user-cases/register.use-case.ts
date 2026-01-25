import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ConflictException } from 'src/commons/exceptions/conflict.exception';
import { ValidationException } from 'src/commons/exceptions/validation.exception';
import { ProfileEntity } from 'src/domains/user/entities/profile.entity';
import { UserEntity } from 'src/domains/user/entities/user.entity';
import type { IProfileRepository } from 'src/domains/user/repositories/profile-repository.interface';
import type { IUserRepository } from 'src/domains/user/repositories/user-repository.interface';
import { RegisterDto } from '../dto/register.dto';
import { AuthEntity } from '../entities/auth.entity';
import type { IAuthRepository } from '../repositories/auth-repository.interface';
import { AuthStatus, AuthStatusEnum } from '../vo/auth-status.vo';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IProfileRepository')
    private readonly profileRepository: IProfileRepository,
  ) {}

  public async execute(dto: RegisterDto) {
    // 도메인 레벨 검증 (여러 필드를 한번에 검증)
    const errors: Record<string, string[]> = {};

    // 이메일 도메인 검증
    const duplicatedUser = await this.userRepository.findByEmail(dto.email);
    if (duplicatedUser) {
      throw new ConflictException('User with this email already exists');
    }
    if (dto.email.endsWith('@test.com')) {
      errors.email = ['Test domain is not allowed'];
    }

    // 닉네임 도메인 검증
    const forbiddenNicknames = ['admin', 'root', 'system', 'moderator'];
    if (forbiddenNicknames.includes(dto.nickname.toLowerCase())) {
      errors.nickname = errors.nickname || [];
      errors.nickname.push('This nickname is reserved');
    }

    // 비밀번호 도메인 검증
    if (dto.password.includes(dto.email.split('@')[0])) {
      errors.password = errors.password || [];
      errors.password.push('Password cannot contain email username');
    }
    if (dto.password.includes(dto.nickname)) {
      errors.password = errors.password || [];
      errors.password.push('Password cannot contain nickname');
    }

    // 에러가 있으면 한번에 던지기
    if (Object.keys(errors).length > 0) {
      throw new ValidationException('Validation failed', errors);
    }

    const now = new Date();
    const user = new UserEntity({
      id: randomUUID(),
      email: dto.email,
      createdAt: now,
      updatedAt: now,
    });

    const profile = new ProfileEntity({
      id: randomUUID(),
      userId: user.getId(),
      nickname: dto.nickname,
      bio: null,
      createdAt: now,
      updatedAt: now,
    });

    const hashedPassword = await AuthEntity.hashPassword(dto.password);
    const auth = new AuthEntity({
      userId: user.getId(),
      hashedPassword,
      status: AuthStatus.create(AuthStatusEnum.ACTIVE),
      loginFailedCount: 0,
    });

    await this.userRepository.save(user);
    await this.profileRepository.save(profile);
    await this.authRepository.save(auth);

    return {
      message: `Register success with email : ${dto.email}/nickname : ${dto.nickname}`,
    };
  }
}
