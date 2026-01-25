import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EntityNotFoundException } from 'src/commons/exceptions/not-found.exception';
import { InvalidCredentialsException } from 'src/commons/exceptions/invalid-credentials.exception';
import { ValidationException } from 'src/commons/exceptions/validation.exception';
import type { IUserRepository } from 'src/domains/user/repositories/user-repository.interface';
import { LoginDto } from '../dto/login.dto';
import type { IAuthRepository } from '../repositories/auth-repository.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async execute(dto: LoginDto) {
    const existUser = await this.userRepository.findByEmail(dto.email);
    if (!existUser) {
      throw new InvalidCredentialsException('Email or password is not valid');
    }

    const existAuth = await this.authRepository.findByUserId(existUser.getId());
    if (!existAuth) {
      throw new InvalidCredentialsException('Email or password is not valid');
    }

    if (!existAuth.isActive()) {
      throw new ValidationException('In-active user. please contact to admin');
    }

    if (!(await existAuth.verifyPassword(dto.password))) {
      existAuth.increaseLoginFailCount();

      const canInactive = existAuth.canInactive();
      if (canInactive) {
        existAuth.inactive();
      }

      await this.authRepository.save(existAuth);
      throw new InvalidCredentialsException('Email or password is not valid');
    }

    const payload = {
      id: existUser.getId(),
    };
    const token = this.jwtService.sign(payload);

    return {
      token,
    };
  }
}
