import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { ChangePasswordUseCase } from './user-cases/change-password.use-case';
import { LoginUseCase } from './user-cases/login.use-case';
import { RegisterUseCase } from './user-cases/register.use-case';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IAuthRepository',
      useClass: AuthRepository,
    },
    // use cases
    RegisterUseCase,
    LoginUseCase,
    ChangePasswordUseCase,
  ],
  exports: [
    'IAuthRepository',
    RegisterUseCase,
    LoginUseCase,
    ChangePasswordUseCase,
  ],
})
export class AuthModule {}
