import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundException } from 'src/commons/exceptions/not-found.exception';
import { InvalidCredentialsException } from 'src/commons/exceptions/invalid-credentials.exception';
import { ValidationException } from 'src/commons/exceptions/validation.exception';
import { ChangePasswordDto } from '../dto/change-password.dto';
import type { IAuthRepository } from '../repositories/auth-repository.interface';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
  ) {}

  public async execute(userId: string, dto: ChangePasswordDto) {
    if (dto.oldPassword === dto.newPassword) {
      throw new ValidationException('New password must be different');
    }

    const auth = await this.authRepository.findByUserId(userId);
    if (!auth) {
      throw new EntityNotFoundException('User');
    }

    const oldPasswordIsValid = await auth.verifyPassword(dto.oldPassword);
    if (!oldPasswordIsValid) {
      throw new InvalidCredentialsException('Old password is invalid');
    }

    await auth.changePassword(dto.newPassword);
    auth.initLoginFailCount();

    await this.authRepository.save(auth);

    return {
      message: 'Password change successfully',
    };
  }
}
